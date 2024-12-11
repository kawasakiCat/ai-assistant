import React, { useState, useEffect } from "react";
import ChatWindow from "./ChatWindow";
import ChatScenarioManager from "../components/ChatScenaioManager";
import { getChatState, saveChatState } from "../../../utils/chatStorage";

const Chat = () => {
  const [currentScenario, setCurrentScenario] = useState(
    getChatState() || ChatScenarioManager.getInitialScenario()
  );
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    if (currentScenario) {
      setChatHistory((prev) => [...prev, currentScenario.message]);
    }
  }, [currentScenario]);

  const handleOptionClick = (nextId) => {
    const nextScenario = ChatScenarioManager.getNextScenario(
      currentScenario.id,
      nextId
    );
    if (nextScenario) {
      setCurrentScenario(nextScenario);
      saveChatState(nextScenario);
    }
  };

  return (
    <div className="chat-container">
      <ChatWindow
        messages={chatHistory}
        options={currentScenario?.options || []}
        onOptionClick={handleOptionClick}
      />
    </div>
  );
};

export default Chat;
