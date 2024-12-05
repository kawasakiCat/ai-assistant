import React from "react";
import Button from "../../../components/common/Button/Button";

const ChatWindow = ({ messages, options, onOptionClick }) => {
  return (
    <div className="chat-window">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className="chat-message">
            {message}
          </div>
        ))}
      </div>
      <div className="chat-options">
        {options.map((option, index) => (
          <Button
            variant="primary"
            key={index}
            onClick={() => onOptionClick(option.next)}
          >
            {option.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
