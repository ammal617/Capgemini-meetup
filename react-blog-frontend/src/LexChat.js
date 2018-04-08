import React, { Component} from 'react';
import PropTypes from 'prop-types';
import AWS from 'aws-sdk';
import "./style/chatbot.css";

var sendToLex = true;
var gotTitle = false;
var title = "Placeholder";
var action = null;
var editId = null;

class LexChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '', 
      lexUserId: 'chatbot-demo' + Date.now(), 
      sessionAttributes: {}, visible: 'closed'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.getElementById("inputField").focus();
    AWS.config.region = 'eu-west-1';
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: this.props.IdentityPoolId,
    });
    var lexruntime = new AWS.LexRuntime();
    this.lexruntime = lexruntime;

  }

  handleClick() {
    this.setState({ visible: this.state.visible == 'open'? 'closed' : 'open' });
    console.log(this.state);
  }

  pushChat(event) {
    event.preventDefault();

    var inputFieldText = document.getElementById('inputField');
    console.log('sendToLex:', sendToLex);
    if (inputFieldText && inputFieldText.value && inputFieldText.value.trim().length > 0) {

      // disable input to show we're sending it
      var inputField = inputFieldText.value.trim();
      inputFieldText.value = '...';
      inputFieldText.locked = true;
      

      if(!sendToLex) {
        console.log('do not send to lex');
        
        if(action === "createPost") {
          action = null;
          this.props.blogData(title, inputField);
        }else if(action === "editPost") {
          console.log('action was edit post');
          action = null;
          this.props.editPost(editId, inputField);
        }
        
        
        this.showRequest(inputField);  
        sendToLex = true;
        
        if (gotTitle) {
          title = 'Placeholder'; //reset title 
          this.setState({sessionAttributes: this.state.sessionAttributes})
          var fakeRes = {
            message: 'Ok, I will remembder your title'
          };
          this.showResponse(fakeRes);
        } else {
          this.setState({sessionAttributes: this.state.sessionAttributes})
          var fakeRes = {
            message: 'Ok, I have created your post'
          };
          this.showResponse(fakeRes);
        }
        inputFieldText.value = '';
        inputFieldText.locked = false;
      } else {
        console.log('send to lex');
      // send it to the Lex runtime
        var params = {
          botAlias: '$LATEST',
          botName: this.props.botName,
          inputText: inputField,
          userId: this.state.lexUserId,
          sessionAttributes: this.state.sessionAttributes
        };
        this.showRequest(inputField);
        var a = function(err, data) {
          if (err) {
            console.log(err, err.stack);
            this.showError('Error:  ' + err.message + ' (see console for details)')
          }
          if (data) {
            // capture the sessionAttributes for the next cycle
            this.setState({sessionAttributes: data.sessionAttributes})
            //sessionAttributes = data.sessionAttributes;
            // show response and/or error/dialog status
            this.showResponse(data);
          }
          // re-enable input
          inputFieldText.value = '';
          inputFieldText.locked = false;
        };

        this.lexruntime.postText(params, a.bind(this));
      }
    }
    // we always cancel form submission
    return false;
  }

  showRequest(daText) {
    var conversationDiv = document.getElementById('conversation');
    var requestPara = document.createElement("P");
    requestPara.className = 'userRequest';
    requestPara.appendChild(document.createTextNode(daText));
    conversationDiv.appendChild(requestPara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
  }

  showError(daText) {

    var conversationDiv = document.getElementById('conversation');
    var errorPara = document.createElement("P");
    errorPara.className = 'lexError';
    errorPara.appendChild(document.createTextNode(daText));
    conversationDiv.appendChild(errorPara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
  }

  handleLexResponse(lexRequest) {
    console.log(`Got intent ${lexRequest.intentName}`);
    const intent = lexRequest.intentName;
    const sessionAttributes = lexRequest.sessionAttributes;
    const slots = lexRequest.slots;
    const slotToElicit = lexRequest.slotToElicit;
    console.log('lexRequest: ', JSON.stringify(lexRequest, null, 2));
    if (intent === 'CreatePost') {
      console.log('registered create');
      if(slots.Title) {
        console.log('got title');
        title = slots.Title;
        gotTitle = true;
        sendToLex = true;
        action = 'createPost';
      } else if (!slotToElicit) {
        console.log('Create post without title')
        sendToLex = false;
        action = 'createPost';
      } else {
        console.log('no action');
      }
    }
    if (intent === 'DeletePost') {
      console.log('registered delete');
      if(slots.Id) {
        console.log('got id: ', slots.Id);
        this.props.deletePost(slots.Id);
      } else if (!slotToElicit) {
        console.log('deleting lastest post');
        this.props.deletePost();
      } else {
        console.log('no action');
      }
    }
    if (intent === 'EditPost') {
      console.log('registered edit');
      if(slots.Id) {
        console.log('edit post with id: ', slots.Id);
        sendToLex = false;
        editId  = slots.Id;
        action = 'editPost';
      } else if (!slotToElicit) {
        console.log('edit lastest post')
        sendToLex = false;
        action = 'editPost';
      } else {
        console.log('no action');
      }
    }
  }

  showResponse(lexResponse) {

    var conversationDiv = document.getElementById('conversation');
    var responsePara = document.createElement("P");
    responsePara.className = 'lexResponse';
    if (lexResponse.intentName) {
      this.handleLexResponse(lexResponse);
    }
    if (lexResponse.message) {
      responsePara.appendChild(document.createTextNode(lexResponse.message));
      responsePara.appendChild(document.createElement('br'));
    }
    if (lexResponse.dialogState === 'ReadyForFulfillment') {
      responsePara.appendChild(document.createTextNode(
        'Ready for fulfillment'));
      // TODO:  show slot values
    } else {
      responsePara.appendChild(document.createTextNode(
        ''));
    }
    conversationDiv.appendChild(responsePara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({data: event.target.value});
  }

  render() {

    const inputStyle = {
      padding: '4px',
      fontSize: 24,
      width: '388px',
      height: '40px',
      borderRadius: '1px',
      border: '10px'
    }

    const conversationStyle = {
      width: '400px',
      height: this.props.height,
      border: 'px solid #ccc',
      backgroundColor: this.props.backgroundColor,
      padding: '4px',
      overflow: 'scroll',
      borderBottom: 'thin ridge #bfbfbf'
    }

    const headerRectStyle = {
      backgroundColor: '#000000', 
      width: '408px', 
      height: '40px',
      textAlign: 'center',
      paddingTop: 12,
      paddingBottom: -12,
      color: '#FFFFFF',
      fontSize: '24px'
    }

    const chatcontainerStyle = {
      backgroundColor: '#FFFFFF',
      width: 408
    }

    const chatFormStyle = {
      margin: '1px', 
      padding: '2px'
    }


    return (
      <div id="chatwrapper">
        <div id="chat-header-rect" style={headerRectStyle} onClick={this.handleClick} >{this.props.headerText}
              {(this.state.visible === 'open') ? <span className='chevron top'></span> : <span className='chevron bottom'></span>}
        </div>
        <div id="chatcontainer" className={this.state.visible} style={chatcontainerStyle}>
          <div id="conversation" style={conversationStyle} ></div>
            <form id="chatform" style={chatFormStyle} onSubmit={this.pushChat.bind(this)}>
                <input type="text"
                       id="inputField"
                       size="40"
                       value={this.state.data}
                       placeholder={this.props.placeholder}
                       onChange={this.handleChange.bind(this)}
                       style={inputStyle}
                      />
            </form>
        </div>
      </div>
    )
  }
}

LexChat.propTypes = {
  botName: PropTypes.string,
  IdentityPoolId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  height: PropTypes.number,
  headerText: PropTypes.string
}

export default LexChat;

