import React from 'react';
import SingleRecipe from './SingleRecipe';
import CustomComponent from './CustomComponent';
import './Home.css';

export default class Home extends CustomComponent {
    constructor(props) {
        super(props);

        this.state = {
            recipe: null,
        };
    }

    async componentDidMount() {        
        const recipeResult = await this.runQuery('GET','/recipes/random');
        console.log("IN THE HOME PAGE");
        console.log(recipeResult);
        this.setState({ recipe: recipeResult.data.recipe });
    }
    
    render() {
        
        return (
            <div className="home_div">
              <p className="title">Welcome To N.A.R.A.</p>
              <p className="additional_info">N.A.R.A.(Not Another Recipe App) is a lightweight Recipe Application that allows the user to keep an online catalog of their own recipes, as well as favorite other recipes for a later date.</p>
              {this.state.recipe &&
               <div className="sample_recipe">
                 <p className="sample_recipe_notes">
                   Curious about how the application works?  Here's a sample recipe to get you going.
                 </p>
                 <SingleRecipe key="singleRecipe" recipe = {this.state.recipe} />
               </div>
              }
            </div>
        );
    }
}
