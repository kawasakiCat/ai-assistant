import React from 'react';
import { formatMessageTime } from '../../utils/formatting';

const MessageList = ({ messages, currentUser }) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <div 
          key={message.id}
          className={`message ${message.userId === currentUser.id ? 'sent' : 'received'}`}
        >
          <div className="message-content">
            {message.text}
          </div>
          <div className="message-time">
            {formatMessageTime(message.timestamp)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;