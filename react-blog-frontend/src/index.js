import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//router
import { Router, BrowserRouter } from 'react-router-dom';
// routes located in Main file
import Main from './Main';


render((
  <BrowserRouter>
    <App />
  </ BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
