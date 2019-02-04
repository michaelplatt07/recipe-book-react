import React, { Component } from 'react';
import { Form, Text } from 'informed';
import { Route, Redirect } from 'react-router';
import SearchResults from './SearchResults';

const custom_axios = require('./custom_axios');

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
    
    handleClick = async () => {
        this.setState({ executingSearch: true });
        const recipeResults = await this.queryApi(this.formApi.getState().values.searchParams);
        this.setState({ recipes: recipeResults.data.recipes });
        this.setState({ searchExecuted: true });
        this.setState({ executingSearch: false });
    }

    queryApi = (searchParams) => {
        if (searchParams) {
            const formattedSearchParams = searchParams.split(" ").join("+");
            const queryParams = `?ingredients=${formattedSearchParams}&course=${formattedSearchParams}&submitted_by=${formattedSearchParams}&cuisine=${formattedSearchParams}`;
            return custom_axios.get('/recipes/search' + queryParams);
        }
        else {
            return custom_axios.get('/recipes/search');
        }
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
