import React, { Component } from 'react';
import { Form, Text, TextArea, Select, Option, Checkbox } from 'informed';
import { Route, Redirect } from 'react-router';
import ReactTooltip from 'react-tooltip';
import cookie from 'react-cookies';
import UploadSucces from './UploadSuccess';

const _ = require('lodash');
const axios = require('axios');

export default class Add extends Component {
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
            
            baseCourses: [],
            baseCuisines: [],
            measurementTypes: [],

            attemptedUpload: false,
            successfulUpload: false,
            errors: [],
        };

        this.handleClick = this.handleClick.bind(this);
        this.setFormApi = this.setFormApi.bind(this);
    }

    async componentDidMount() {        
        const courseResults = await axios.get('http://localhost:3000/courses');
        const cuisineResults = await axios.get('http://localhost:3000/cuisines');
        const measurementResults = await axios.get('http://localhost:3000/measurements');
        this.setState({ baseCourses: courseResults.data.courses, baseCuisines: cuisineResults.data.cuisines, measurementTypes: measurementResults.data.measurements });
    }
    
    setFormApi = (formApi) => {
        this.formApi = formApi;
    }

    handleClick = async () => {
        this.setState({attemptedUpload: true});
        const headers = {'Authorization': cookie.load('Authorization')};
        const recipe = this.formatRecipe();
        try {
            const res = await axios.post('http://localhost:3000/recipes/add', recipe, {headers: headers});
            this.setState({successfulUpload: true});
        }
        catch (error) {
            const errors = [];
            _.forOwn(error.response.data.msg, (value, key) => {
                errors.push(value);
            });
            this.setState({errors: errors});
        }
    };

    formatRecipe = () => {
        // NOTE(map) : Formatting the ingredients here
        const formattedIngredientList = [];
        this.state.ingredients.forEach((ingredient) => {
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
            cuisine: this.state.cuisines,
            description: this.state.description,
            searchable: this.state.status,
            course: this.state.courses,
            ingredients: formattedIngredientList,
            steps: this.state.instructions
        };

        return formattedRecipe;
    }
    
    textPropertyChange = (e) => {
        this.setState({ [e.target.name]: e.target.value }); 
    }

    checkboxPropertyChange = (e) => {
        this.setState({ [e.target.name]: e.target.checked }); 
    }
    
    multiPropertyChange = (e) => {
        // NOTE(map) : This supposedly does not work in IE8, not sure I care though.        
        this.setState({ [e.target.name]: [...e.target.selectedOptions].map(option => option.value) }); 
    }
    
    ingredientChange = (e) => {
        const index = e.target.id.split("-").pop();
        const updatedList = this.state.ingredients;
        updatedList[index] = e.target.value;
        this.setState({ ingredients: updatedList });
    }
    
    addIngredient = (e) => {
        this.setState((prevState) => ({
            ingredients: [...prevState.ingredients, ""],
        }));
    }

    removeIngredient = (e) => {
        let newList = this.state.ingredients.filter((ingredient) => {
            return ingredient !== e.target.value;
        });
        
        this.setState({ ingredients: newList });
    }

    instructionChange = (e) => {
        const index = e.target.id.split("-").pop();
        const updatedList = this.state.instructions;
        updatedList[index] = e.target.value;
        this.setState({ instructions: updatedList });
    }

    addInstruction = (e) => {
        this.setState((prevState) => ({
            instructions: [...prevState.instructions, ""],
        }));
    }

    removeInstruction = (e) => {
        let newList = this.state.instructions.filter((instruction) => {
            return instruction !== e.target.value;
        });
        
        this.setState({ instructions: newList });
    }
    
    render() {
        return (
            <div>
              <ul>
                {this.state.errors.map((error, index) => {
                    const errorKey = `error-${index}`;
                    return (
                        <li key={errorKey}>{error}</li>
                    );
                })
                }
              </ul>
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
                  }                </Select><br />
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
                <label htmlFor="ingredients">Ingredients: </label><button data-tip="Ingredients should follow the format of NUMBER UNITS INGREDIENT.  If no units are needed (ie a whole carrot), simply exclude the units."onClick={this.addIngredient}>+</button>
                <div id="ingredients">
                  {
                      this.state.ingredients.map((ingredient, index) => {
                          let ingredientIndex = `ingredient-${index}`;
                          return (
                              <div key={index}>
                                <input type="text" id={ingredientIndex} field={ingredient} value={ingredient} index={index} onChange={this.ingredientChange} /><button value={ingredient} onClick={this.removeIngredient}>-</button>
                              </div>
                          );
                      })
                  }
                </div>
                <label htmlFor="instructions">Instructions: </label><button onClick={this.addInstruction}>+</button>
                <div id="instructions">
                  {
                      this.state.instructions.map((instruction, index) => {
                          let instructionIndex = `instruction-${index}`;
                          return (
                              <div key={index}>
                                <input type="text" id={instructionIndex} field={instruction} value={instruction} index={index} onChange={this.instructionChange} /><button value={instruction} onClick={this.removeInstruction}>-</button>
                              </div>
                          );
                      })
                  }
                </div>
                <br />
                <label htmlFor="description">Description: </label><TextArea type="text" id="description" field="description" onChange={this.textPropertyChange} /><br />
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
