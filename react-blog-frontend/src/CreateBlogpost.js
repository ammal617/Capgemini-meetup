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


  //maps blogposts into format to display in component
  render() {
    return (
      <div className="home container-fluid">
        <div className="">
          <div className="blogpost-info">
            <h1> Create a blogpost </h1>
            <h4> When you press the button, a recording will start, and you can speak out your blogpost! once you are done, press the done-button. Your blogpost will then be displayed in text and you can review it before submitting it. </h4>
            <h2> Happy blogging!</h2>
          </div>
        </div>
        <div className="">
          <div className="Audio-recorder">
            <AudioRecorder />
          </div>
          <div className="Blogpost-text-input">
            <div className="forms-container col-lg-6 col-md-6">
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
          </div>
          </div>
      </div>
    );
  }
}

export default CreateBlogpost;
