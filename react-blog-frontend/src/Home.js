import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/home.css';
import CreateBlogpost from './CreateBlogpost';
import ViewBlogposts from './ViewBlogposts';
import LexChat from "./LexChat";

//moch data representing the existing blog posts
var allBlogposts = [
  {id: "1", date:"March 27, 2018", author: "Sarah Perez", title: "Medium is now paying partners cash bonuses for quality work", body:"A year ago, publishing platform Medium debuted a new business model where readers could pay a monthly fee to access exclusive, curated content, and would reward participating partners by offering a revenue share based on a metrics like time spent reading and the more explicit claps - Mediums form of the Like. Now, Medium will reward select partners with direct cash bonuses as well, doled out at the companys discretion."},
  {id: "2", date:"March 25, 2018", author:"Natasha Lomas", title: "Tumblr also lousy with Russia-backed US election trolls: Report", body:"The meme-laden Tumblr platform is the latest social media and blogging outlet to be unmasked as a distribution channel for Russian agents to rip at Americas societal fault lines and seek to influence citizens voting habits, according to a report by BuzzFeed News. Facebook and Twitter have been firmly in the spotlight on this issue since the shock result of the 2016 US presidential election. Google has also self-reported on Russian disinformation on its platforms. But the role of other social platforms in spreading Kremlin propaganda has faced less scrutiny thus far."}
];
var postId = 3;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: allBlogposts
    };
    this.blogData = this.blogData.bind(this);
  }

  //updates the state with the new blogpost. Updates state so that new blogpost is added to blogposts
  blogData(postTitle, postBody) {
    var newPost = {id: postId, date: "April 6", author: "Filippa", title: postTitle, body: postBody};
    allBlogposts.push(newPost);
    postId ++;
    var str = JSON.stringify(allBlogposts);
    console.log("Stored in var: " + str);
    this.setState({data: allBlogposts});
    console.log("stored in state: " + this.state.data);

   }
  //maps blogposts into format to display in component
  render() {
    var blogposts = this.state.data.map(function(item, index) {
      return (
        <div key={item.id} className="post-container">
          <h1> {item.title} </h1>
          <p className="date"> {item.date} </p>
          <h4> {item.body} </h4>
          <p className="author"> - {item.author} </p>
        </div>
      )
    });
    return (
      <div className="home">
        <div className="container-fluid">
        <div className="header-image-container">
          <img className="header-image" src={require('./media/sound_wave.svg')} />
        </div>
        <ViewBlogposts blogPosts={blogposts}/>
          <div className="createblogpost-container">
          <CreateBlogpost handleBlogSubmit={this.blogData} />
          </div>
        </div>
        <LexChat botName="ManageBlog"
                IdentityPoolId="eu-west-1:9d05d183-ea5f-41d3-b281-c4befa2fdb80"
                placeholder="Placeholder text"
                style={{position: 'absolute'}}
                backgroundColor="#FFFFFF"
                height="430px"
                headerText="Chat with our awesome bot" />
      </div>
    );
  }
}

export default Home;
