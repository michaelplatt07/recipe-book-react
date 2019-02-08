import { Component } from 'react';

const custom_axios = require('./custom_axios');

export default class FormComponent extends Component {
    constructor(props) {
        super(props);

        this.setFormApi = this.setFormApi.bind(this);
    }

    setFormApi = (formApi) => {
        this.formApi = formApi;
    }
    
    textPropertyChange = (e) => {
        this.setState({ [e.target.name]: e.target.value }); 
    }

    checkboxPropertyChange = (e) => {
        this.setState({ [e.target.name]: e.target.checked }); 
    }
    
    multiPropertyChange = (e) => {
        // NOTE(map) : This supposedly does not work in IE8, not sure I care though.        
        console.log([...e.target.selectedOptions].map(option => option.value));
        this.setState({ [e.target.name]: [...e.target.selectedOptions].map(option => option.value) }); 
    }
    
    runQuery = (method, route, parameters) => {
        // TODO(map) : Implement me.
    }

}
