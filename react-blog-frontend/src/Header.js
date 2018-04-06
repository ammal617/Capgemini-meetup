import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './style/header.css';

class Header extends Component {

  scrollToNewPost() {
    var elem = document.getElementById('create-new-post');
    window.scrollTo(0, elem.offsetTop);
  }

  render() {
    return (
    <div className="Header">
        <nav className="navbar-header navbar-fixed-top">
        <div className="container-fluid">
          <ul className="list-element-header ">
            <Link className="header-text" to='/' ><p className="navbar-text"> Lex, write my blogpost </p> </Link>
            <li className=""> <button onClick={this.scrollToNewPost} className="btn-header">New post</button> </li>
          </ul>
        </div>
      </nav>
    </div>
    )
  }
}

export default Header
