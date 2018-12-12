import React, { Component } from 'react';

export default class SingleRecipe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipe: this.props.recipe
        };
    }

    render() {
        return (
            <p>{ this.state.recipe.text_friendly_name }</p> 
        );
    }
}
