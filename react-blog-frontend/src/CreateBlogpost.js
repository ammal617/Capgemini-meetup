import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/home.css';
import './style/createblogpost.css';
import AudioRecorder from 'react-audio-recorder';
import BlogpostForm from './BlogpostForm';

class CreateBlogpost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      title: ''
    };
  };

  handlePassData(title, post) {
    this.props.blogData(title, post);
  }

  //getting the form data from the forms component
  handleBlogpost (title, post) {
    console.log(title);
    console.log(post);
  }


  //maps blogposts into format to display in component
  render() {
    return (
      <div className="home">
        <div className="container-fluid">
          <div className="blogpost-info">
            <h1> Create a blogpost </h1>
            <h4> When you press the button, a recording will start, and you can speak out your blogpost! once you are done, press the done-button. Your blogpost will then be displayed in text and you can review it before submitting it. </h4>
            <h2> Happy blogging!</h2>
          </div>
        </div>
        <div className="Audio-recorder">
        <AudioRecorder />
        </ div>
        <div className="Blogpost-text-input">
        <BlogpostForm handleBlogSubmit={this.handleBlogpost}/>
        </div>
      </div>
    );
  }
}

export default CreateBlogpost;
