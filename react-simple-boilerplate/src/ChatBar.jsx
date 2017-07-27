import React, {Component} from 'react';
// TODO Grab the value from the input (event.target.value)
//read the uncontrolled component docs
class ChatBar extends Component {

  render() {
    return (
    <footer className="chatbar">
      <input type="text" className="chatbar-username" onKeyPress={this.props.onEnterUser} placeholder="Type your username and hit ENTER" />
      <input type="text" className="chatbar-message"  onKeyPress={this.props.onEnter} placeholder="Type a message and hit ENTER" />
    </footer>
    );
  }
}

export default ChatBar;
