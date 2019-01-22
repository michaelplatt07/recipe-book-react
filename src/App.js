import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Filter from './Filter';
import FilterResults from './FilterResults';
import Search from './Search';
import SearchResults from './SearchResults';
import Add from './Add';
import Login from './Login';
import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
              <div>
                <Header />
                
                <Route exact path="/" component={Home} />
                <Route path="/filter" component={Filter} />
                <Route path="/filterResults" component={FilterResults} />
                <Route path="/search" component={Search} />
                <Route path="/searchResults" component={SearchResults} />
                <Route path="/add" component={Add} />
                <Route path="/login" component={Login} />
              </div>
            </Router>
        );
    }
}

export default App;
