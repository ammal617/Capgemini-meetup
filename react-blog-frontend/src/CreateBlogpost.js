import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/home.css';
import './style/createblogpost.css';
import AudioRecorder from 'react-audio-recorder';

//moch data representing the existing blog posts
var allBlogposts = [
  {id: "1", date:"March 27, 2018", author: "Sarah Perez", title: "Medium is now paying partners cash bonuses for quality work", body:"A year ago, publishing platform Medium debuted a new business model where readers could pay a monthly fee to access exclusive, curated content, and would reward participating partners by offering a revenue share based on a metrics like time spent reading and the more explicit claps - Mediums form of the Like. Now, Medium will reward select partners with direct cash bonuses as well, doled out at the companys discretion."},
  {id: "2", date:"March 25, 2018", author:"Natasha Lomas", title: "Tumblr also lousy with Russia-backed US election trolls: Report", body:"The meme-laden Tumblr platform is the latest social media and blogging outlet to be unmasked as a distribution channel for Russian agents to rip at Americas societal fault lines and seek to influence citizens voting habits, according to a report by BuzzFeed News. Facebook and Twitter have been firmly in the spotlight on this issue since the shock result of the 2016 US presidential election. Google has also self-reported on Russian disinformation on its platforms. But the role of other social platforms in spreading Kremlin propaganda has faced less scrutiny thus far."}
];

class CreateBlogpost extends Component {
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
      </div>
    );
  }
}

export default CreateBlogpost;
