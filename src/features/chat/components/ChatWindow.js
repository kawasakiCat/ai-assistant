import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useChat } from '../../hooks/useChat';

const ChatWindow = ({ currentUser, chatId }) => {
  const { 
    messages, 
    sendMessage, 
    isLoading 
  } = useChat(chatId);

  return (
    <div className="chat-window">
      <MessageList 
        messages={messages} 
        currentUser={currentUser}
      />
      <MessageInput 
        onSendMessage={sendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChatWindow;