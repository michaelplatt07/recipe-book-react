import React, { Component } from 'react';
import './LoginSuccess.css';

export default class LoginSuccess extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

    }

    render() {
        return (
            <div className="login_success_div">
              <p>Successfully logged in.</p>
            </div>
        );
    }
    
}
