import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/home.css';
import './style/blogpostform.css';

class BlogpostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      title: ''
   };

    this.handleChange = this.handleChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleSubmit(event) {
    console.log('A blogpost was submitted, title: '+ this.state.title +' and post: '+ this.state.value);
    var title = this.state.title;
    var post = this.state.value;
    this.props.handleBlogSubmit(title, post);
    event.preventDefault();
  }


  render() {
    return (
      <div className="forms-container container-fluid">
      <h1> Write your blogpost here: </h1>
      <form onSubmit={this.handleSubmit}>
      <h2>Title: </h2>
      <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
      <h2>Blogpost: </h2>
          <textarea className="blogpost-textarea" rows="10" cols="50" value={this.state.value} onChange={this.handleChange} />
        <div className="submit-button-wrapper">
            <input className="submit-button" type="submit" value="Submit" />
        </div>
      </form>
      </div>
    );
  }
}

export default BlogpostForm;
