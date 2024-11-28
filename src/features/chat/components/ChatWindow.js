// ChatWindow.js
import React, { useState } from 'react';
import { scenarios } from '../services/ChatScenario';
// import MessageList from './MessageList';
// import MessageInput from './MessageInput';
import Button from '../../../components/common/Button/Button';

const ChatWindow = () => {
  const [currentScenarioId, setCurrentScenarioId] = useState("welcome");
  const currentScenario = scenarios.find(scenario => scenario.id === currentScenarioId);

  return (
    <div>
      <p>{currentScenario.message}</p>
      {currentScenario.options?.map(option => (
        <Button key={option.next} onClick={() => setCurrentScenarioId(option.next)}>
          {option.text}
        </Button>
      ))}
    </div>
  );
};

export default ChatWindow;
