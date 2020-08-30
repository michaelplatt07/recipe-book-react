import React, { Component } from 'react';
import SingleRecipePreview from './SingleRecipePreview';
import './FilterResults.css';

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
                <div className="filter_results_div">
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
