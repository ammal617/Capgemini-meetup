import React from 'react';
import { Switch, Route } from 'react-router-dom';

/**
 * Import all page components here
 */
import App from './App';
import Home from './Home';
import CreateBlogpost from './CreateBlogpost';
import ChatBot from './ChatBot';



const Main = () => (
  <main>
    <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/createpost" component={CreateBlogpost} />
    </Switch>
  </main>
)

export default Main
