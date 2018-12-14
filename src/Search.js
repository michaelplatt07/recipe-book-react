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
    
    handleClick() {
        this.setState({ executingSearch: true });
        this.queryApi(this.formApi.getState().values.searchParams).then((res) => {
            this.setState({ recipes: recipesResult.data.recipes });
        ));
    }

/*
    handleClick = async() => {
        this.setState({ executingSearch: true });
        try {
            const recipesResult = await queryApi(this.formApi.getState().values.searchParams);
            this.setState({ recipes: recipesResult.data.recipes });
        }
        catch (err) {
            console.log("TODO(map) : Add error catching here for no results coming back.");
        }
        console.log("TODO(map) : REMOVE ME : Executing Search => ", this.state.executingSearch);
        console.log("TODO(map) : REMOVE ME : Search Executed => ", this.state.searchExecuted);
        this.setState({ executingSearch: false });
        this.setState({ searchExecuted: true });
    }
*/

    setFormApi = (formApi) => {
        this.formApi = formApi;
    }

    componentWillUnmount = () => {
        console.log("TODO(map) : REMOVE ME : We are unmounting.");
        this.setState({ executingSearch: false });
        // TODO(map) : Need to figure out how to cancel request here to fix memory leak.
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

const queryApi = (searchParams) => {
    const formattedSearchParams = searchParams.split(" ").join("+");
    const queryParams = `?ingredients=${formattedSearchParams}&course=${formattedSearchParams}&submitted_by=${formattedSearchParams}&cuisine=${formattedSearchParams}`;
    return axios.get('http://localhost:3000/recipes/search' + queryParams); 
};
