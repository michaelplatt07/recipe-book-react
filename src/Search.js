import React from 'react';
import { Form, Text } from 'informed';
import { Redirect } from 'react-router';
import FormComponent from './FormComponent';
import './Search.css';

export default class Search extends FormComponent {
    constructor(props) {
        super(props);

        this.state = {
            recipes: [],
            executingSearch: false,
            searchExecuted: false
        };
        
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick = async () => {
        this.setState({ executingSearch: true });

        var queryParams = null;
        if (this.formApi.getState().values.searchParams) {
            const formattedSearchParams = this.formApi.getState().values.searchParams.split(" ").join("+");
            queryParams = `?searchParams=${formattedSearchParams}`;
        }
        
        const recipeResults = await this.runQuery('GET','/recipes/search', queryParams);
        this.setState({ recipes: recipeResults.data.recipes });
        this.setState({ searchExecuted: true });
        this.setState({ executingSearch: false });
    }
    
    render() {
        return (
            <div className="search_div">
              <Form id="search-form" getApi={this.setFormApi}>
                <label htmlFor="searchParams">Search for recipes that include:</label>
                <br />
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
