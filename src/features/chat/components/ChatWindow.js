// ChatWindow.js
import React, { useState, useEffect, useRef } from 'react';
import { scenarios } from '../services/ChatScenario';
import { MotivationForm, SelfPromotionForm } from './ChatForm';
import { submitMotivationForm, submitSelfPromotionForm } from '../services/chatService';
import Button from '../../../components/common/Button/Button';

const ChatWindow = () => {
  const [currentScenarioId, setCurrentScenarioId] = useState("welcome");
  const [apiResult, setApiResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);
  const chatHistortRef = useRef(null);

  const currentScenario = scenarios.find(scenario => scenario.id === currentScenarioId);
  
  const addMessageToHistory = (message, type = "bot") => {
    setMessageHistory((prev) => [...prev, {type, message}]);
  }

  useEffect(() => {
    if (currentScenario) {
      addMessageToHistory(currentScenario.message);
    }
  }, [currentScenario]);

  useEffect(() => {
    if (chatHistortRef.current) {
      chatHistortRef.current.scrollTop = chatHistortRef.current.scrollHeight;
    }
  }, [messageHistory]);

  useEffect(() => {
    const handleApiCall = async () => {
      if (currentScenario.type === "api_call") {
        try {
          let result;
  
          if (currentScenario.api === "generateMotivation") {
            result = await submitMotivationForm(apiResult);
          } else if (currentScenario.api === "generateSelfPromotion") {
            result = await submitSelfPromotionForm(apiResult);
          }
  
          setApiResult(result);
          addMessageToHistory(result, "bot")
          setCurrentScenarioId(currentScenario.next);
        } catch (error) {
          console.error("APIエラー:", error);
          setErrorMessage("データ生成に失敗しました。もう一度試してください。")
        }
      }
    };
  
    handleApiCall();
  }, [currentScenario, apiResult]);
  
  // シナリオに応じてフォームを表示
  const renderForm = () => {
    if (currentScenarioId === "motivation") {
      return <MotivationForm onFormSubmit={(result) => {
        addMessageToHistory(result, "user");
        setApiResult(result);
        setCurrentScenarioId("motivation_result");
      }} />;
    } else if (currentScenarioId === "self_promotion") {
      return <SelfPromotionForm onFormSubmit={(result) => {
        addMessageToHistory(result, "user");
        setApiResult(result);
        setCurrentScenarioId("self_promotion_result");
      }} />;
    }
    return null;
  };

  return (
    <div className="chat-window">
      {/* メッセージ履歴を表示 */}
      <div className="chat-history" ref={chatHistortRef}>
        {messageHistory.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.type}`}>
            {msg.message}
          </div>
        ))}
      </div>
      <p>{currentScenario.message}</p>

      {/* エラーメッセージ */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* APIの結果を表示 */}
      {apiResult && currentScenarioId === "motivation_result" && (
        <div>
          <p>生成された志望動機:</p>
          <div className="api-result">
            {apiResult}
          </div>
        </div>
      )}
      {apiResult && currentScenarioId === "self_promotion_result" && (
        <div>
          <p>生成された自己PR:</p>
          <div className="api-result">
            {apiResult}
          </div>
        </div>
      )}

      {/* フォームの表示 */}
      {currentScenario.type === "form" ? (
        renderForm()
      ) : (
        // 選択肢
        currentScenario.options?.map(option => (
          <Button key={option.next} onClick={() => setCurrentScenarioId(option.next)}>
            {option.text}
          </Button>
        ))
      )}
    </div>
  );
};

export default ChatWindow;
