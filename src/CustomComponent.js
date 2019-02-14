import { Component } from 'react';

const custom_axios = require('./custom_axios');

export default class CustomComponent extends Component {
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
