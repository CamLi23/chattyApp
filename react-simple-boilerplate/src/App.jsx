import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends React.Component {
  ws;

  constructor(props) {
    super(props);
    this.state ={
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      clientCount: 0
    };
    this.onEnter =this.onEnter.bind(this);
    this.onEnterUser =this.onEnterUser.bind(this);
  }


componentDidMount() {
  console.log("componentDidMount <App />");

  this.ws = new WebSocket("ws://0.0.0.0:3001/");

  this.ws.onopen = function(evt) {
    console.log('Established connection!', evt);
  }

  this.ws.onmessage = (event) => {
    console.log(event);
    const newMessage = JSON.parse(event.data);
    switch(newMessage.type) {
      case "incomingMessage":
        // handle incoming message
         const newMessages = this.state.messages.concat(newMessage);
         this.setState({messages: newMessages});
        break;
      case "incomingNotification":
        // handle incoming notification
        const newNotification = this.state.messages.concat(newMessage);
        this.setState({messages: newNotification});
        break;
      case "clientCount":
        this.setState({clientCount: newMessage.clients});
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + newMessage.type);
    }

  }
}

onEnter(event) {
  if(event.key === 'Enter'){
    const message = {
      type: 'postMessage',
      content: event.target.value,
      username: this.state.currentUser.name,
    }
    // const messages = [...this.state.messages, message];
    event.target.value = '';
    this.ws.send(JSON.stringify(message));
  }
}

onEnterUser(event) {
if(event.key === 'Enter'){

    const message = {
      type: 'postNotification',
      notiContent: `${this.state.currentUser.name} has set their name to ${event.target.value}`
    }
    console.log(message.noti)
    const currentUser = {
      name: event.target.value
    }
   this.setState({currentUser});
   this.ws.send(JSON.stringify(message));
  }
}

  render() {
    return (
      <div>
        <nav className="navbar">
          <span className="navbar-clients">{this.state.clientCount} user(s) online</span>
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} onEnter={this.onEnter} onEnterUser={this.onEnterUser}/>
      </div>
    );
  }
}


export default App;


