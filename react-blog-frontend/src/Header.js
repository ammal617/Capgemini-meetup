import React from 'react';
import { Link } from 'react-router-dom';
import './style/header.css';

const Header = () => (
  <div className="Header">
      <nav className="navbar-header navbar-fixed-top">
      <div className="container-fluid">
        <ul className="list-element-header ">
          <Link className="header-text" to='/' ><p className="navbar-text"> Lex, write my blogpost </p> </Link>
          <li className=""> <Link to='/createpost' ><button className="btn-header">New post</button> </Link> </li>
        </ul>
      </div>
    </nav>
  </div>
)

export default Header
