import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import './Header.css';

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        if (cookie.load('Authorization')) {
            this.setState({ loggedIn: true });
        }
    }

    handleClick = async () => {
        const userCookie = cookie.load('Authorization');
        const expires = new Date(Date.now());
        console.log("IN LOGOUT");
        console.log(userCookie);
        cookie.save('Authorization', `JWT ${userCookie}`, { path: '/', expires });
    }
    
    render() {
        return (
            <div className="header-container">
              <div className="home-container">
                <Link to="/">Home</Link>
              </div>
              <div className="filter-container">
                <Link to="/filter">Filter</Link>
              </div>
              <div className="search-container">
                <Link to="/search">Search | </Link>
              </div>
              <div className="add-container">
                <Link to="/add">Add | </Link>
              </div>
              {!this.state.loggedIn &&
               <div className="login-container">
                 <Link to="/login">Login | </Link>
               </div>
              }
              {this.state.loggedIn &&
               <div className="logout-container">
                 <Link to="/" onClick={this.handleClick}>Logout | </Link>
               </div>
              }
            </div>
        );
    }
}
