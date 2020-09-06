import React, { Component } from 'react';
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import CustomTheme from "./theme";
import Login from "./component/login";
import Home from "./component/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

class App extends Component {
  constructor() {
    super()
    this.state = {
      authenticated: false,
      user: null
    }
  }
  UNSAFE_componentWillMount() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.setState({ authenticated: true, user })
    }
  }
  isLogin = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    this.setState({ authenticated: true, user })
  }
  isLogout = () => {
    localStorage.removeItem("user")
    this.setState({ authenticated: false, user: null })
  }

  render() {
    return (
      <ThemeProvider theme={CustomTheme}>
        <CSSReset />
        <Router>
          <Switch>
            <Route exact path="/">
              {this.state.authenticated === true
                ? <Redirect to='/chat' />
                : <Login isLogin={this.isLogin} />
              }
            </Route>
            <PrivateRoute
              path="/chat"
              authenticated={this.state.authenticated}
              component={() => <Home user={this.state.user} logout={this.isLogout} />}
            />
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
    />
  )
}
export default App;
