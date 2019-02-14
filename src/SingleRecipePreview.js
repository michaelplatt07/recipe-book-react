import React, { Component } from 'react';
import './SingleRecipePreview.css';

export default class SingleRecipePreview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipe: this.props.recipe
        };
    }

    render() {
        return (
            <div className="recipe_preview_block">
              <p className="recipe_title">
                {this.state.recipe.text_friendly_name}
              </p>
              <p className="cook_time">
                Cook Time: { parseInt(this.state.recipe.cook_time / 60) } hours { parseInt(this.state.recipe.cook_time % 60) } minutes
              </p>
              <p className="prep_time">
                Prep Time: { parseInt(this.state.recipe.prep_time / 60) } hours { parseInt(this.state.recipe.prep_time % 60) } minutes
              </p>
            </div>
        );
    }

}
