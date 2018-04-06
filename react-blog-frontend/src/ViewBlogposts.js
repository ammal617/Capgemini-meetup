import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/home.css';
import CreateBlogpost from './CreateBlogpost';

class ViewBlogposts extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }


  //maps blogposts into format to display in component
  render() {

    return (
        <div className="blog-container">
            <div className="all-blogpost-container">
              {this.props.blogPosts}
            </div>
          </div>
    );
  }
}

export default ViewBlogposts;
