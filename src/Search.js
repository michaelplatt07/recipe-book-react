import React, { Component } from 'react';
import { Form, Text } from 'informed';
import SearchResults from './SearchResults';

const axios = require('axios');

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: []
        };
        
        this.handleClick = this.handleClick.bind(this);
        this.setFormApi = this.setFormApi.bind(this);
    }

    async handleClick() {
        const recipesResult = await queryApi();
        this.setState({ recipes: recipesResult.data.recipes });
    }

    setFormApi(formApi) {
        this.formApi = formApi;
    }
        
    render() {
        return (
            <div>
              <Form id="search-form" getApi={this.setFormApi}>
                <label htmlFor="searchParams">Search for recipes that include:</label>
                <Text field="searchParams" id="searchParams" />
                <button onClick={this.handleClick}>SEARCH</button>
              </Form>
              <SearchResults recipes={this.state.recipes} />
            </div>
        );
    }
}

const queryApi = () => {
    return axios.get('http://localhost:3000/recipes'); 
};
