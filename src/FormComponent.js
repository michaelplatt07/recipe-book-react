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
        this.setState({ [e.target.name]: [...e.target.selectedOptions].map(option => option.value) }); 
    }
    
    runQuery = (method, route, additionalInfo) => {
        switch(method) {
        case "GET":
            if (additionalInfo) {
                return custom_axios.get(route + additionalInfo);
            }
            else {
                return custom_axios.get(route);
            }
        case "POST":
            if (additionalInfo) {
                return custom_axios.post(route, additionalInfo.body, {headers: additionalInfo.headers});
            }
            else {
                console.log("In the FormComponent, there was no body added");
            }
            break;
        case "DELETE":
            break;
        default:
            break;
        }

    }

}
