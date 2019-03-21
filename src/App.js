import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";
import Home from "./containers/Home";
import Todolist from "./containers/Todolist";
import Project from "./containers/Project";
import "./App.css";

class App extends Component {
  state = {
    userName: Cookies.get("username") || null,
    userId: null,
    token: Cookies.get("token") || null
  };
  render() {
    return (
      <Router>
        <>
          <Switch>
            <Route
              exact={true}
              path="/"
              render={props => <Home {...props} />}
            />
            <Route
              exact={true}
              path="/todolist"
              render={props => (
                <Todolist
                  picture={Cookies.get("picture")}
                  userName={this.state.userName}
                  token={this.state.token}
                  {...props}
                />
              )}
            />
            <Route
              exact={true}
              path="/project"
              render={props => <Project {...props} />}
            />
          </Switch>
        </>
      </Router>
    );
  }
}

export default App;
