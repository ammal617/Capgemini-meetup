import LexChat from "react-lex";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/home.css';

class ChatBot extends Component {
 render() {
   return(
       <LexChat botName="ManageBlog"
                IdentityPoolId="eu-west-1:9d05d183-ea5f-41d3-b281-c4befa2fdb80"
                placeholder="Placeholder text"
                style={{position: 'absolute'}}
                backgroundColor="#FFFFFF"
                height="430px"
                headerText="Chat with our awesome bot" />
   );
 }
}
export default ChatBot;