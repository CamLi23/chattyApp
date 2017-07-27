import React, {Component} from 'react';

class Message extends Component {
  render() {
    if (this.props.userName) {
      return(
        <div>
          <div className="message">
            <span className="message-username">{this.props.userName}</span>
            <span className="message-content">{this.props.content}</span>
          </div>
        </div>
      );
    } else {
      return(
      <div>
        <div className="message system">
              <span>{this.props.notiContent}</span>
        </div>
      </div>
      );
    }

  }
}


export default Message;