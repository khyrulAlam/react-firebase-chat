import React, { Component } from 'react';
// import './App.css';
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import CustomTheme from "./theme";

// import Home from "./component/home";
// import Login from "./component/login";
import Home2 from "./component/Home2";


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false
    }
  }

  UNSAFE_componentWillMount() {
    const cachedHits = localStorage.getItem('loginKey');
    if (cachedHits) {
      this.setState({ isLogin: true })
    }
  }

  isLogin = () => {
    this.setState({ isLogin: true })
  }
  isLogout = () => {
    this.setState({ isLogin: false })
  }



  render() {

    return (
      <div>
        {/* {(this.state.isLogin)
          ? <Home2 isLogout={this.isLogout} />
          : <Login isLogin={this.isLogin} />
        } */}
        <ThemeProvider theme={CustomTheme}>
          <CSSReset />
          <Home2 />
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
