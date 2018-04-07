import React, { Component } from 'react';
import './App.css';

import Home from "./component/home";
import Login from "./component/login";


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLogin: false
    }
  }

  componentWillMount(){
    const cachedHits = localStorage.getItem('loginKey');
    if(cachedHits){
      this.setState({isLogin:true})
    }
  }

  isLogin = ()=>{
    this.setState({isLogin:true})
  }
  isLogout= () =>{
    this.setState({isLogin:false})
  }



  render() {
    
    return (
      <div>
        {(this.state.isLogin)
          ? <Home isLogout={this.isLogout}/>
          : <Login isLogin={this.isLogin} />
        }
      </div> 
    );
  }
}

export default App;
