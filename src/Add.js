import React from 'react';
import { Form, Text, TextArea, Select, Option, Checkbox } from 'informed';
import { Redirect } from 'react-router';
import ReactTooltip from 'react-tooltip';
import FormComponent from './FormComponent';
import Errors from './Errors';
import cookie from 'react-cookies';

const _ = require('lodash');

export default class Add extends FormComponent {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            prep_time: "",
            cook_time: "",
            cuisines: [],
            description: "",
            status: false,
            courses: [],
            ingredients: [],
            instructions: [],
		categories: [],
		chef_notes: "",
		serving_sizes: "",
            
            baseCourses: [],
            baseCuisines: [],
            measurementTypes: [],
            baseCategories: [],
            baseServingSizes: [],
            
            attemptedUpload: false,
            successfulUpload: false,
            errors: [],

            redirect: false,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {        
        if (!cookie.load('Authorization')) {
            this.setState({ redirect: true });
        }
        else {
            const courseResults = await this.runQuery('GET','/courses');
            const cuisineResults = await this.runQuery('GET','/cuisines');
            const measurementResults = await this.runQuery('GET','/measurements');
            const categoryResults = await this.runQuery('GET','/categories');
            const servingSizeResults = await this.runQuery('GET','/servingSizes');
            this.setState({ baseCourses: courseResults.data.courses,
                            baseCuisines: cuisineResults.data.cuisines,
                            measurementTypes:
                            measurementResults.data.measurements,
                            baseCategories: categoryResults.data.categories,
                            baseServingSizes: servingSizeResults.data.servingSizes});
        }
    }
    
    handleClick = async () => {
        this.setState({attemptedUpload: true});
        const headers = {'Authorization': cookie.load('Authorization')};
        const recipe = this.formatRecipe();
        try {
            await this.runQuery('POST','/recipes/add', {body: recipe, headers: headers});
            this.setState({successfulUpload: true});
        }
        catch (error) {
            const errors = [];
            _.forOwn(error.response.data.msg, (value, key) => {
                errors.push({status: 422, message: value});
            });
            this.setState({errors: errors});
        }
    };

    formatRecipe = () => {
        // NOTE(map) : Formatting the ingredients here
        const formattedIngredientList = [];
        this.state.ingredients.split('\n').forEach((ingredient) => {
            const splitIngredients = ingredient.split(" ");
            if (this.state.measurementTypes.some(measurement => splitIngredients[1] === measurement.name)) {
                formattedIngredientList.push({
                    quantity: ingredient.split(" ")[0],
                    measurement: ingredient.split(" ")[1],
                    text_friendly_name: ingredient.split(" ").slice(2).join(" "),
                });  
            }
            else {
                formattedIngredientList.push({
                    quantity: splitIngredients[0],
                    measurement: "",
                    text_friendly_name: splitIngredients.slice(1).join(" "),
                });
            }
        });
        
        const formattedRecipe = {
            text_friendly_name: this.state.name,
            prep_time: this.state.prep_time,
            cook_time: this.state.cook_time,
            cuisines: this.state.cuisines,
            description: this.state.description,
            searchable: this.state.status,
            courses: this.state.courses,
		categories: this.state.categories,
            ingredients: formattedIngredientList,
            steps: this.state.instructions.split('\n'),
		chef_notes: this.state.chef_notes,
		serving_sizes: this.state.serving_sizes
        };
        console.log(formattedRecipe);

        return formattedRecipe;
    }
   
    render() {
        if (this.state.redirect) {
            return (
                <Redirect to={{
                    pathname: '/Login',                   
                    state: { errors: [{status: null, message:'You must be logged in to add a new Recipe.  Please log in or create a new account.'}]}
                }}/>
            );
        }
        else {
            return (
                <div>

                  <Errors errors={this.state.errors} />
                  
                  <Form id="upload-form" getApi={this.setFormApi}>
                    <p>
                      Please include the following information about the recipe:
                    </p>
                    <label htmlFor="name">Name: </label><Text type="text" id="name" field="name" onChange={this.textPropertyChange} /><br />
                    <label htmlFor="prep_time">Prep Time: </label><Text data-tip="Enter time in minutes" type="text" id="prep_time" field="prep_time" onChange={this.textPropertyChange} />
                    <label htmlFor="cook_time">Cook Time: </label><Text data-tip="Enter time in minutes" type="text" id="cook_time" field="cook_time" onChange={this.textPropertyChange} /><br />
                    <label htmlFor="courses" data-tip="Select as many courses as desired using CTRL and click">Course: </label>
                    <Select field="courses" id="courses" multiple onChange={this.multiPropertyChange}>
                      {
                          this.state.baseCourses.map((course, index) => {
                              const courseKey = `course-${index}`;
                              return (
                                  <Option key={courseKey} value={course.search_name}>{course.name}</Option>
                              );
                          })
                      }
                    </Select><br />
                    <label htmlFor="categories" data-tip="Select as many categories as desired using CTRL and click">Category: </label>
                    <Select field="categories" id="categories" multiple onChange={this.multiPropertyChange}>
                      {
                          this.state.baseCategories.map((category, index) => {
                              const categoryKey = `category-${index}`;
                              return (
                                  <Option key={categoryKey} value={category.search_name}>{category.name}</Option>
                              );
                          })
                      }
                    </Select><br />
                    <label htmlFor="serving_sizes" data-tip="Select as many ServingSizes as desired using CTRL and click">Serving Sizes: </label>
                    <Select field="serving_sizes" id="serving_sizes" multiple onChange={this.multiPropertyChange}>
                      {
                          this.state.baseServingSizes.map((servingSize, index) => {
                              const servingSizeKey = `serving-size-${index}`;
                              return (
                                  <Option key={servingSizeKey} value={servingSize.search_range}>{servingSize.display_range}</Option>
                              );
                          })
                      }
                    </Select><br />
                    <label htmlFor="cuisines" data-tip="Select as many cuisines as desired using CTRL and click">Cuisine: </label>
                    <Select field="cuisines" id="cuisines" multiple onChange={this.multiPropertyChange}>
                      {
                          this.state.baseCuisines.map((cuisine, index) => {
                              let cuisineKey = `cuisine-${index}`;
                              return (
                                  <Option key={cuisineKey} value={cuisine.search_name}>{cuisine.name}</Option>
                              );
                          })
                      }
                    </Select><br />
                    <label htmlFor="ingredients">Ingredients: </label>
		    <TextArea type="text" id="ingredients" field="ingredients" onChange={this.textPropertyChange} /><br />
                    <label htmlFor="instructions">Instructions: </label>
		   <TextArea type="text" id="instructions" field="instructions" onChange={this.textPropertyChange} /><br />
                    <label htmlFor="description">Description: </label><TextArea type="text" id="description" field="description" onChange={this.textPropertyChange} /><br />
                    <label htmlFor="chef_notes">Chef Notes: </label><TextArea type="text" id="chef_notes" field="chef_notes" onChange={this.textPropertyChange} /><br />
<label htmlFor="status" data-tip="For determining if you want to make the recipe searchable by others.">Public: </label>
                    <Checkbox field="status" id="status" onChange={this.checkboxPropertyChange} />
                    <br />
                    <button onClick={this.handleClick}>ADD</button>
                    <ReactTooltip />
                  </Form>
                  {this.state.successfulUpload &&
                   <Redirect to={{
                       pathname: '/UploadSucces'                   
                   }}/>
                  }
                </div>
            );
        }
    }
}
