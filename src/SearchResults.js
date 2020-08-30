import React, { Component } from 'react';
import SingleRecipePreview from './SingleRecipePreview';
import './SearchResults.css';

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
                <div className="search_results_div">
                  {
                      this.props.location.state.recipes.map((recipe, i) => <SingleRecipePreview key={i} recipe = {recipe} />)
                  }
                </div>
            );
        }
        else {
            return (
                ""
            );
        }
    }
}
