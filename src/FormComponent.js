import CustomComponent from './CustomComponent';

export default class FormComponent extends CustomComponent {
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
    
}
