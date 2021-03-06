import React from 'react';
import { Form, Text } from 'informed';
import { Redirect } from 'react-router';
import Errors from './Errors';
import FormComponent from './FormComponent';
import cookie from 'react-cookies';
import './Login.css';

const crypto = require('crypto');

export default class Login extends FormComponent {
    constructor(props) {
        super(props);

        this.state = {
            errors: this.props.location.state ?
                this.props.location.state.errors : [],

            successfulLogin: false,
        };
        
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick = async () => {
        const cipher = crypto.createCipher('aes-128-cbc', 'baseSecret');
        var encryptedPass = cipher.update(this.formApi.getState().values.password, 'utf8', 'hex');
        encryptedPass += cipher.final('hex');

	    // TODO(map) Remove this logging dtatement at some point
        console.log(encryptedPass);
        
        const res = await this.runQuery('POST','/users/login',{body: {username: this.formApi.getState().values.username , password: encryptedPass}});
        
        // This is for if i ever want to expire the cookie based on a time.  For now I'm leaving it at session.
        // Adding 1 day before expiring.
        const expires =  new Date(Date.now() + (60 * 60 * 24 * 1000));
        cookie.save('Authorization', `JWT ${res.data.token}`, { path: '/', expires });
        //cookie.save('Authorization', `JWT ${res.data.token}`, { path: '/' });

        this.setState({ successfulLogin: true });
    };

    render() {
        if (this.state.successfulLogin) {
            return (
                <Redirect to={{
                    pathname: '/LoginSuccess',                   
                }}/>
            );
        }

        else if (cookie.load('Authorization')) {
            return "You are already logged in.";
        }

        else {
            return (
                <div className="login_div">

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
}

