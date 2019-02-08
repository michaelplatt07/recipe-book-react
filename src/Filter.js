import React, { Component } from 'react';
import { Form, Select, Option } from 'informed';
import { Redirect } from 'react-router';
import ReactTooltip from 'react-tooltip';

const custom_axios = require('./custom_axios');

export default class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: [],
            executingFilter: false,
            filterExecuted: false,
            
            courses: [],
            cuisines: [],
            ingredients: [],
            
            baseCourses: [],
            baseCuisines: [],
            baseIngredients: [],
        };
        
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {        
        const courseResults = await custom_axios.get('/courses');
        const cuisineResults = await custom_axios.get('/cuisines');
        const ingredientResults = await custom_axios.get('/ingredients');
        this.setState({ baseCourses: courseResults.data.courses, baseCuisines: cuisineResults.data.cuisines, baseIngredients: ingredientResults.data.ingredients });
    }

    handleClick = async () => {
        this.setState({ executingFilter: true });

        var formattedParams = "?";
        if (this.state.courses.length > 0) {
            formattedParams += "courses=" + this.state.courses.join('+');
        }
        if (this.state.cuisines.length > 0) {
            formattedParams += formattedParams.length > 1 ?
                "&cuisines=" + this.state.cuisines.join('+') : "cuisines=" + this.state.cuisines.join('+');
        }
        if (this.state.ingredients.length > 0) {
            formattedParams += formattedParams.length > 1 ?
                "&ingredients=" + this.state.ingredients.join('+') : "ingredients=" + this.state.ingredients.join('+');
        }

        const requestUrl = '/recipes/filter' + formattedParams;
        const recipeList = await custom_axios.get(requestUrl);

        this.setState({ recipes: recipeList.data.recipes });
        this.setState({ fitlerExecuted: true });
        this.setState({ executingFilter: false });

    }
    
    render() {
        return (
            <div>
              <Form id="upload-form" getApi={this.setFormApi}>
                <p>
                  Select options below to filter by.
                </p>
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
                <label htmlFor="cuisines" data-tip="Select as many cuisines as desired using CTRL and click">Cuisine: </label>
                <Select field="cuisines" id="cuisines" multiple onChange={this.multiPropertyChange}>
                  {
                      this.state.baseCuisines.map((cuisine, index) => {
                          const cuisineKey = `cuisine-${index}`;
                          return (
                              <Option key={cuisineKey} value={cuisine.search_name}>{cuisine.name}</Option>
                          );
                      })
                  }
                </Select><br />                
                <label htmlFor="ingredients" data-tip="Select as many ingredients as desired using CTRL and click">Ingredient: </label>
                <Select field="ingredients" id="ingredients" multiple onChange={this.multiPropertyChange}>
                  {
                      this.state.baseIngredients.map((ingredient, index) => {
                          const ingredientKey = `ingredient-${index}`;
                          return (
                              <Option key={ingredientKey} value={ingredient.name}>{ingredient.text_friendly_name}</Option>
                          );
                      })
                  }
                </Select><br />                
                <button onClick={this.handleClick}>FILTER</button>
                <ReactTooltip />
              </Form>              
              {this.state.recipes.length > 0 && !this.state.executingFilter &&
               <Redirect to={{
                   pathname: '/FilterResults',
                   state: { recipes: this.state.recipes }
               }}/>
              }
            </div>
        );
    }
}
