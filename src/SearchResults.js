import React, { Component } from 'react';
import SingleRecipe from './SingleRecipe';

export default class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: []
        };
    }

    componentDidUpdate(newProps) {
        // TODO(map) : This is still having some weird behavior being called several times.
        if (newProps.recipes !== this.state.recipes) {
            this.setState({ recipes: newProps.recipes});
        }
    }
    
    render() {
        if (this.state.recipes.length > 0){
            return (
                this.state.recipes.map((recipe, i) => <SingleRecipe key={i} recipe = {recipe} />)
            );
        }
        else {
            return (
                ""
            );
        }
    }
}
