import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

/**
 * Import all page components here
 */
import App from './App';
import Home from './Home';
import CreateBlogpost from './CreateBlogpost';


class Main extends Component {

  render() {
    return (
      <main>
        <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/createpost" component={CreateBlogpost} />
        </Switch>
      </main>
    );
  }
}


export default Main
