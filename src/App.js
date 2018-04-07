import React, { Component } from 'react';
import './App.css';

import Home from "./component/home";
import Login from "./component/login";


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLogin: true
    }
  }

  isLogin = ()=>{
    this.setState({isLogin:true})
  }



  render() {
    
    return (
      <div>
        {(this.state.isLogin)
          ? <Home isLogin={this.isLogin}/>
          : <Login isLogin={this.isLogin} />
        }
      </div> 
    );
  }
}

export default App;
