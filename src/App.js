import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/login.js';
import Blog from './components/blog.js';
import Signup from './components/signup.js';
import Allblogs from './components/allblogs.js';
import Adminlogin from './components/adminlogin.js';

class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
        <Route path="/blog">
            <Blog />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/allblogs">
            <Allblogs />
          </Route>
          <Route path="/adminlogin">
            <Adminlogin />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
export default Main;







