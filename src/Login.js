import React, { Component } from 'react';
import { Form, Text } from 'informed';
import { Route, Redirect } from 'react-router';
import Errors from './Errors';
import LoginSuccess from './LoginSuccess';
import cookie from 'react-cookies';

const crypto = require('crypto');
const custom_axios = require('./custom_axios');

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: this.props.location.state ?
                this.props.location.state.errors : [],

            successfulLogin: false,
        };
        
        this.handleClick = this.handleClick.bind(this);
        this.setFormApi = this.setFormApi.bind(this);
    }
    
    handleClick = async () => {
        const cipher = crypto.createCipher('aes-128-cbc', 'baseSecret');
        var encryptedPass = cipher.update(this.formApi.getState().values.password, 'utf8', 'hex');
        encryptedPass += cipher.final('hex');

        const res = await custom_axios.post('/users/login', { username: this.formApi.getState().values.username , password: encryptedPass });
        
        // This is for if i ever want to expire the cookie based on a time.  For now I'm leaving it at session.
        //const expires =  new Date(Date.now() + 30000);
        //cookie.save('Authorization', `JWT ${res.data.token}`, { path: '/', expires });
        cookie.save('Authorization', `JWT ${res.data.token}`, { path: '/' });

        this.setState({ successfulLogin: true });
    };

    setFormApi = (formApi) => {
        this.formApi = formApi;
    }

    render() {
        if (this.state.successfulLogin) {
            return (
                <Redirect to={{
                    pathname: '/LoginSuccess',                   
                }}/>
            );
        }

        if (cookie.load('Authorization')) {
            return "You are already logged in.";
        }

        return (
            <div>

              <Errors errors={this.state.errors} />

              <Form id="login-form" getApi={this.setFormApi}>
                <label htmlFor="username">Username: </label><Text type="text" id="username" field="username" /><br />
                <label htmlFor="password">Password: </label><Text type="password" id="password" field="password" /><br />
              </Form>
              <button onClick={this.handleClick}>LOGIN</button>
            </div>
        );
    }
}

