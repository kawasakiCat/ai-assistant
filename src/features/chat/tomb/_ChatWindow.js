// ChatWindow.js
import React, { useState, useEffect, useRef } from "react";
import { useChatContext } from "../services/ChatContext";
import { Link } from "react-router-dom";
import { scenarios } from "./ChatScenarioConfig";
import { MotivationForm, SelfPromotionForm } from "./ChatForm";
import {
  submitMotivationForm,
  submitSelfPromotionForm,
} from "../services/chatService";
import Button from "../../../components/common/Button/Button";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import "../../../styles/chat.css";

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
  const {
    messageHistory,
    setMessageHistory,
    currentScenarioId,
    setCurrentScenarioId,
  } = useChatContext();
  // const [currentScenarioId, setCurrentScenarioId] = useState("welcome");
  const [apiResult, setApiResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const chatHistoryRef = useRef(null);

  const currentScenario = scenarios.find(
    (scenario) => scenario.id === currentScenarioId
  );

  const addMessageToHistory = (message, type = "bot") => {
    setMessageHistory((prev) => [...prev, { type, message }]);
  };

  // シナリオ変更時にメッセージを履歴に追加
  useEffect(() => {
    if (currentScenario && !messageHistory.some((msg) => msg.message === currentScenario.message)) {
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
          setMessageHistory(result, "bot"); // API結果を履歴に追加
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
      return (
        <MotivationForm
          onFormSubmit={(result) => {
            setMessageHistory(result, "user"); // ユーザー入力を履歴に追加
            setApiResult(result);
            setCurrentScenarioId("motivation_result");
          }}
        />
      );
    } else if (currentScenarioId === "self_promotion") {
      return (
        <SelfPromotionForm
          onFormSubmit={(result) => {
            setMessageHistory(result, "user");
            setApiResult(result);
            setCurrentScenarioId("self_promotion_result");
          }}
        />
      );
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
            {/*<span
              onClick={CopyToClipboard}
            >
              <FontAwesomeIcon icon={faClipboard} />
            </span>*/}
          </div>
        ))}
      </div>

      {/* エラーメッセージ */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* 現在のシナリオに応じたUI */}
      {currentScenario.type === "form"
        ? renderForm()
        : currentScenario.options?.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleOptionClick(option.next)}
              className="chat-option-button"
            >
              {option.text}
            </Button>
          ))}

      {/* GoodByeシナリオ */}
      {currentScenarioId === "goodbye" && (
        <>
          <Link to="/" onClick={() => console.log("メニューに戻る")}>
            <Button className="chat-option-button" variant="primary">
              モード選択
            </Button>
          </Link>
          <Link to="/resume" onClick={() => console.log("履歴書作成へ移動")}>
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
