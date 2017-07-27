import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: 1
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: 2
        }
      ]
    };
    this.onEnter =this.onEnter.bind(this);
    this.onEnterUser =this.onEnterUser.bind(this);
  }


componentDidMount() {
  console.log("componentDidMount <App />");

  const ws = new WebSocket("ws://0.0.0.0:3001/");

  ws.onopen = function(evt) {
  console.log('Established connection!', evt);
  }


  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 1000);
}

onEnter(event) {
  if(event.key === 'Enter'){
    const message = {
      content: event.target.value,
      id: Math.random(),
      username: this.state.currentUser.name,
    }
    let messages = this.state.messages;
    messages = [...messages, message];
    event.target.value = '';
    return this.setState({messages});
  }
}

onEnterUser(event) {
  if(event.key === 'Enter'){
    const currentUser = {
      name: event.target.value
    }
    return this.setState({currentUser});
  }
}

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name} onEnter={this.onEnter} onEnterUser={this.onEnterUser}/>
      </div>
    );
  }
}


export default App;


