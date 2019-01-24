import React, { Component } from 'react';

export default class SingelError extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorStatus: this.props.errorStatus,
            errorMessage: this.props.errorMessage
        };
    }

    render() {
        if (this.state.errorStatus) {
            return (
                <li>`Error ${this.state.errorStatus}: ${this.state.errorMessage}`</li>
            );            
        }
        else {
            return (
                <li>{ this.state.errorMessage }</li>
            );
        }
    }
}
