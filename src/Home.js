import React, { Component } from 'react';
import cookie from 'react-cookies';

export default class Home extends Component {
    constructor(props) {
        super(props);

        console.log("IN THE HOME : ", cookie.load('Authorization'));
    }

    render() {
        
        return (
            <p>Welcome to the Recipe Book!</p>
        );
    }
}
