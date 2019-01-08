import React, { Component } from 'react';
import { Form, Text } from 'informed';
import { Route, Redirect } from 'react-router';

export default class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            prep_time: "",
            cook_time: "",
            ingredients: ["Ingredient1","Ingredient2"],
            instructions: []
        };

        this.handleClick = this.handleClick.bind(this);
        this.setFormApi = this.setFormApi.bind(this);
    }

    setFormApi = (formApi) => {
        this.formApi = formApi;
    }

    handleClick = async () => {
        console.log("INGREDIENT LIST AS IT STANDS: ");
        console.log(this.formApi.getState().values.ingredients);
        this.setState({ ingredients: this.formApi.getState().values.ingredients });
        console.log(this.state.ingredients);
    };
    
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
                <label htmlFor="name">Name: </label><Text type="text" id="name" field="name" /><br />
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
                <button onClick={this.handleClick}>ADD</button>
              </Form>
            </div>
        );
    }
}
