import React, { Component } from 'react';
import { Form, Text, Select, Option, Checkbox } from 'informed';
import { Route, Redirect } from 'react-router';

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
            baseCuisines: []
        };

        this.handleClick = this.handleClick.bind(this);
        this.setFormApi = this.setFormApi.bind(this);
    }

    async componentDidMount() {
        /*
          this.setState({ baseCuisines: ["African",
          "American",
          "British",
          "Carribean",
          "Chinese",
          "East European",
          "French",
          "Greek",
          "Indian",
          "Irish",
          "Italian",
          "Japanese",
          "Korean",
          "Mexican",
          "Nordic",
          "North African",
          "Pakistani",
          "Portuguese",
          "South American",
          "Spanish",
          "Thai and Southeat-Asian",
          "Middle Eastern and Persian",
          "Other"
          ] });

          this.setState({ baseCourses: ["Breakfast",
          "Brunch",
          "Lunch",
          "Dinner",
          "Snack",
          "Dessert"
          ] });
        */
        
        // TODO(map) : Switch to an API call to populate cuisines and courses once I implement it
        const courseResults = await axios.get('http://localhost:3000/courses');
        const cuisineResults = await axios.get('http://localhost:3000/cuisines');
        console.log(courseResults.data.courses);
        this.setState({ baseCourses: courseResults.data.courses, baseCuisines: cuisineResults.data.cuisines });
    }
    
    setFormApi = (formApi) => {
        this.formApi = formApi;
    }

    handleClick = async () => {
        console.log("TODO(map) : RECIPE AS IT STANDS: ");
        console.log(this.state);
    };

    textPropertyChange = (e) => {
        this.setState({ [e.target.name]: e.target.value }); 
    }

    checkboxPropertyChange = (e) => {
        console.log(e.target.checked);
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
              <Form id="upload-form" getApi={this.setFormApi}>
                <p>
                  Please include the following information about the recipe:
                </p>
                <label htmlFor="name">Name: </label><Text type="text" id="name" field="name" onChange={this.textPropertyChange} /><br />
                <label htmlFor="prep_time">Prep Time: </label><Text type="text" id="prep_time" field="prep_time" onChange={this.textPropertyChange} />
                <label htmlFor="cook_time">Cook Time: </label><Text type="text" id="cook_time" field="cook_time" onChange={this.textPropertyChange} /><br />
                <label htmlFor="courses">Course: </label>
                <Select field="courses" id="courses" multiple onChange={this.multiPropertyChange}>
                  {
                      this.state.baseCourses.map((course, index) => {
                          const courseKey = `course-${index}`;
                          return (
                              <Option key={courseKey} value={course.search_name}>{course.name}</Option>
                          );
                      })
                  }                </Select><br />
                <label htmlFor="cuisines">Cuisine: </label>
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
                <label htmlFor="ingredients">Ingredients: </label><button onClick={this.addIngredient}>+</button>
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
                <label htmlFor="description">Description: </label><Text type="text" id="description" field="descriptiont" onChange={this.textPropertyChange} /><br />
                <label htmlFor="status">Public: </label>
                <Checkbox field="status" id="status" onChange={this.checkboxPropertyChange} />
                <br />
                <button onClick={this.handleClick}>ADD</button>
              </Form>
            </div>
        );
    }
}
