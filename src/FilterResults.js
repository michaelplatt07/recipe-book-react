import React, { Component } from 'react';
import SingleRecipe from './SingleRecipe';

export default class FilterResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: []
        };
    }

    render() {
        console.log("In the render");
        if (this.props.location.state.recipes.length > 0){
            return (
                this.props.location.state.recipes.map((recipe, i) => <SingleRecipe key={i} recipe = {recipe} />)
            );
        }
        else {
            return (
                ""
            );
        }
    }
}