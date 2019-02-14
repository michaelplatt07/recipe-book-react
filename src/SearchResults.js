import React, { Component } from 'react';
import SingleRecipePreview from './SingleRecipePreview';

export default class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: []
        };
    }

    render() {
        if (this.props.location.state.recipes.length > 0){
            return (
                this.props.location.state.recipes.map((recipe, i) => <SingleRecipePreview key={i} recipe = {recipe} />)
            );
        }
        else {
            return (
                ""
            );
        }
    }
}
