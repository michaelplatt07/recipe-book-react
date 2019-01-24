import React, { Component } from 'react';
import SingleError from './SingleError';

export default class Errors extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: this.props.errors,
        };
    }

    // This is how we should be updateing if the properties are changed.  
    componentDidUpdate(prevProps) {
        if (this.props.errors !== prevProps.errors) {
            this.setState({ errors: this.props.errors });
        }
    }

    
    render() {
        if (this.state.errors.length > 0) {
            return (
                <ul>
                  {
                      this.state.errors.map((error, i) => <SingleError  key={i} errorStatus={error.status} errorMessage={error.message} />)
                  }
                </ul>
            );
        }
        else {
            return (
                ""
            );
        }
    }
    
}
