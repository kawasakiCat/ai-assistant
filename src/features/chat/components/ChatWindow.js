// ChatWindow.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { scenarios } from '../services/ChatScenario';
import { MotivationForm, SelfPromotionForm } from './ChatForm';
import { submitMotivationForm, submitSelfPromotionForm } from '../services/chatService';
import Button from '../../../components/common/Button/Button';
import '../../../styles/chat.css';

// function CopyToClipboard() {
//   const [resultText, setResultText] = useState();
//   const copyToClipboard = async () => {
//     try {
//       await global.navigator.clipboard.writeText(resultText);
//       setResultText('コピーしました');
//     } catch (err) {
//       setResultText('コピーに失敗しました');
//     }
//   }
// }

const ChatWindow = () => {
  const [currentScenarioId, setCurrentScenarioId] = useState("welcome");
  const [apiResult, setApiResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);
  const chatHistoryRef = useRef(null);

  const currentScenario = scenarios.find(scenario => scenario.id === currentScenarioId);

  // メッセージを履歴に追加する関数
  const addMessageToHistory = (message, type = "bot") => {
    setMessageHistory((prev) => [...prev, { type, message }]);
  };

  // シナリオ変更時にメッセージを履歴に追加
  useEffect(() => {
    if (currentScenario) {
      addMessageToHistory(currentScenario.message);
    }
  }, [currentScenario]);

  // メッセージ履歴が更新されたら自動スクロール
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messageHistory]);

  // API呼び出し処理
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
          addMessageToHistory(result, "bot"); // API結果を履歴に追加
          setCurrentScenarioId(currentScenario.next); // 次のシナリオへ
        } catch (error) {
          console.error("APIエラー:", error);
          setErrorMessage("データ生成に失敗しました。もう一度試してください。");
        }
      }
    };

    handleApiCall();
  }, [currentScenario, apiResult]);

  // シナリオに応じてフォームを表示
  const renderForm = () => {
    if (currentScenarioId === "motivation") {
      return <MotivationForm onFormSubmit={(result) => {
        addMessageToHistory(result, "user"); // ユーザー入力を履歴に追加
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

  // ユーザーオプションのクリック処理
  const handleOptionClick = (nextScenarioId) => {
    setCurrentScenarioId(nextScenarioId);
  };

  return (
    <div className="chat-window">
      {/* メッセージ履歴を表示 */}
      <div className="chat-history" ref={chatHistoryRef}>
        {messageHistory.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.type}`}>
            {msg.message}
            {/* <Button
              variant="secondary"
              onClick={CopyToClipboard}
              size="small"
            >
              コピー
            </Button> */}
          </div>
        ))}
      </div>

      {/* エラーメッセージ */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* 現在のシナリオに応じたUI */}
      {currentScenario.type === "form" ? (
        renderForm()
      ) : (
        currentScenario.options?.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleOptionClick(option.next)}
            className="chat-option-button"
          >
            {option.text}
          </Button>
        ))
      )}

      {/* GoodByeシナリオ */}
      {currentScenarioId === "goodbye" && (
          <>
            <Link to="/" onClick={() => console.log('メニューに戻る')}>
              <Button className="chat-option-button" variant="primary">
                モード選択
              </Button>
            </Link>
            <Link to="/resume" onClick={() => console.log('履歴書作成へ移動')}>
              <Button className="chat-option-button" variant="primary">
                履歴書作成
              </Button>
            </Link>
          </>
        )}
    </div>
  );
};

export default ChatWindow;
