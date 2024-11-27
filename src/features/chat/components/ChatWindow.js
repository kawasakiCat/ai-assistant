import React, { useState } from 'react';
import { getScenarioById } from '../services/ScenarioManager';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatWindow = () => {
  const [currentScenarioId, setCurrentScenarioId] = useState('welcome');
  const [messages, setMessages] = useState([]);

  const handleUserInput = (input) => {
    const currentScenario = getScenarioById(currentScenarioId);
    const nextScenarioId = currentScenario?.options?.find(option => option.text === input)?.next;

    if (nextScenarioId) {
      const nextScenario = getScenarioById(nextScenarioId);
      setMessages([...messages, { type: 'user', text: input }, { type: 'bot', text: nextScenario.message }]);
      setCurrentScenarioId(nextScenarioId);
    }
  };

  return (
    <div>
      <MessageList messages={messages} />
      <MessageInput onSubmit={handleUserInput} />
    </div>
  );
};

export default ChatWindow;
