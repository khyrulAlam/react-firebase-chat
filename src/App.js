import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';


import Home from "./component/home";
import Login from "./component/login";


class App extends Component {
  
  render() {
    return (
      <div>
        <Router>
          <div>

            <Route exact path="/" component={ Login }/>
            <Route exact path="/home" component={ Home }/>
            
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
