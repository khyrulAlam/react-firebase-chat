import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Home from "./component/home";
import Login from "./component/login";
//import Single from "./component/single";
import Nav from "./component/nav";


class App extends Component {
  
  render() {
    return (
      <div>
        <Router>
          <div>
            <Nav />
            <Route exact path="/" component={ Login }/>
            <Route exact path="/home" component={ Home }/>
            
            {/*<Route exact path="/user/:name" component={ Home }/>
            <Route exact path="/single/:name" component={ Single }/>*/}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
