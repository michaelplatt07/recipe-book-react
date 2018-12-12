import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default class Header extends Component {
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
              <div className="login-container">
                <Link to="/login">Login | </Link>
              </div>
            </div>
        );
    }
}
