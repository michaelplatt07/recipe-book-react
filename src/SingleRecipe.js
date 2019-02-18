import React, { Component } from 'react';
import './SingleRecipe.css';

export default class SingleRecipe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipe: this.props.recipe
        };
    }

    render() {
        const courseList = this.state.recipe.courses.map((course, i) => {
            if (i < this.state.recipe.courses.length - 1)
                return course + ', ';
            else
                return course;
        },"");

        const cuisineList = this.state.recipe.cuisines.map((cuisine, i) => {
            if (i < this.state.recipe.cuisines.length - 1)
                return cuisine + ', ';
            else
                return cuisine;
        },"");
        
        const ratingList = [this.state.recipe.rating > 0 ? true : false,
                            this.state.recipe.rating > 1 ? true : false,
                            this.state.recipe.rating > 2 ? true : false,
                            this.state.recipe.rating > 3 ? true : false,
                            this.state.recipe.rating > 4 ? true : false];
        const imageStyle = {
            width: "15px",
            height: "15px",
        };

        return (
            <div className="single_recipe_block">
              <p className="recipe_title">
                { this.state.recipe.text_friendly_name }
              </p>

              <div className="ingredients">
                <ul>
                  { this.state.recipe.ingredients.map((ingredient, i) => {
                      const ingredientKey = "ingredient" + i;
                      return (
                          <li key={ingredientKey}>
                            {ingredient.quantity} {ingredient.measurement} {ingredient.text_friendly_name}
                          </li>
                      );
                  })}
                </ul>
              </div>

              <p className="steps_title">Directions</p>
              <div className="steps">
                { this.state.recipe.steps.map((step, i) => {
                    const stepKey = "step" + i;
                    return (
                        <p key={stepKey}>
                          {i + 1}. {step}
                        </p>
                    );
                })}
              </div>

              <p className="course_and_cuisine_title">
                Courses and Cuisines
              </p>
              <p className="courses">
                Serve this during: {courseList}
              </p>
              <p className="cuisines">
                Origins: {cuisineList}
              </p>

              <p className="cook_time_title">
                Cooking Times
              </p>
              <p className="prep_time">
                Prep Time: { parseInt(this.state.recipe.prep_time / 60) } hours { parseInt(this.state.recipe.prep_time % 60) } minutes 
              </p>
              <p className="cook_time">
                Cook Time: { parseInt(this.state.recipe.cook_time / 60) } hours { parseInt(this.state.recipe.cook_time % 60) } minutes
              </p>

              <p className="submitted_by">
                Submitted by: { this.state.recipe.submitted_by }
              </p>

              <p className="rating">
                Rating:
                { ratingList.map((rating, i) => {
                    const ratingKey = "rating" + i;
                    return (
                        <img style={imageStyle} key={ratingKey} src={require(rating ? "./filled_star.png" : "./empty_star.png")} alt="rating" />
                    );
                })}
              </p>
            </div>
        );
    }
}
