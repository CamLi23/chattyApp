import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const messageItems = this.props.messages.map((item) =>
      <Message userName={item.username} content={item.content} key={item.id} type={item.type} notiContent={item.notiContent}  />
    );
    return (
      <div>
        <main className="messages">
          {messageItems}

        </main>
      </div>
    );
  }
}

export default MessageList;
