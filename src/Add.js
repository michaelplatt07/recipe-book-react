import React, { Component } from 'react';
import { Form, Text } from 'informed';
import { Route, Redirect } from 'react-router';

export default class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ingredients: ["Ingredient1","Ingredient2"]
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
    
    handleChange = (e) => {
    }
    
    addIngredient = (e) => {
        this.setState((prevState) => ({
            ingredients: [...prevState.ingredients, ""],
        }));
    }

    removeIngredient = (e) => {
        console.log(`In the remove ingredient with value ${e.target.value}`);
        let newList = this.state.ingredients.filter((ingredient) => {
            return ingredient !== e.target.value;
        });
        
        this.setState({ ingredients: newList });
    }
    
    render() {
        return (
            <div>
              <Form id="upload-form" getApi={this.setFormApi} onChange={this.handleChange}>
                <p>
                  Please include the following information about the recipe:
                </p>
                <label htmlFor="name">Name: </label><Text type="text" id="name" field="name" /><br />
                <label htmlFor="ingredients">Ingredients: </label><button onClick={this.addIngredient}>+</button>
                <div id="ingredients">
                  {
                      this.state.ingredients.map((ingredient, index) => {
                          console.log(ingredient);
                          let ingredientIndex = `ingredient-${index}`;
                          return (
                              <div key={index}>
                                <input type="text" id={ingredientIndex} field={ingredient} value={ingredient} onChange={this.handleChange} /><button value={ingredient} onClick={this.removeIngredient}>-</button>
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
