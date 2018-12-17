import React, { Component } from 'react';
import { Form, Text } from 'informed';
import { Route, Redirect } from 'react-router';
import SearchResults from './SearchResults';

const axios = require('axios');

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: [],
            executingSearch: false,
            searchExecuted: false
        };
        
        this.handleClick = this.handleClick.bind(this);
        this.setFormApi = this.setFormApi.bind(this);
    }
    
    handleClick = () => {
        this.setState({ executingSearch: true });
        this.queryApi(this.formApi.getState().values.searchParams).then((res) => {
            this.setState({ recipes: res.data.recipes });
            this.setState({ searchExecuted: true });
            this.setState({ executingSearch: false });
        });
    }

    queryApi = (searchParams) => {
        const formattedSearchParams = searchParams.split(" ").join("+");
        const queryParams = `?ingredients=${formattedSearchParams}&course=${formattedSearchParams}&submitted_by=${formattedSearchParams}&cuisine=${formattedSearchParams}`;
        return axios.get('http://localhost:3000/recipes/search' + queryParams); 
    };

    setFormApi = (formApi) => {
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
              {this.state.recipes.length > 0 && !this.state.executingSearch &&
               <Redirect to={{
                   pathname: '/SearchResults',
                   state: { recipes: this.state.recipes }
               }}/>
              }
              { this.state.searchExecuted &&
                "No results were found with the search terms you've used."
              }
            </div>
        );
    }

}
