import React from 'react';
import { Link } from 'react-router-dom';
import './style/header.css';

const Header = () => (
  <div className="Header">
      <nav className="navbar-header navbar-fixed-top">
      <div className="container-fluid">
        <ul className="list-element-header ">
          <p className="navbar-text"> Alexa, write my blogpost </p>
          <li className=""> <Link to='/' ><button className="btn-header">New post</button> </Link> </li>
        </ul>
      </div>
    </nav>
  </div>
)

export default Header
