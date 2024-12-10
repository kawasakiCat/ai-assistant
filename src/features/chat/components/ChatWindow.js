// ChatWindow.js
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { scenarios } from "../services/ChatScenario";
import { MotivationForm, SelfPromotionForm } from "./ChatForm";
import Button from "../../../components/common/Button/Button";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import "../../../styles/chat.css";

const ChatWindow = () => {
  const [currentScenarioId, setCurrentScenarioId] = useState("welcome");
  const [apiResult, setApiResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);
  const chatHistoryRef = useRef(null);

  const currentScenario = scenarios.find(
    (scenario) => scenario.id === currentScenarioId
  );

  // メッセージを履歴に追加する関数
  const addMessageToHistory = (message, type = "bot") => {
    setMessageHistory((prev) => [...prev, { type, message }]);
  };

  // welcome以外、シナリオ変更時にメッセージを履歴に追加
  useEffect(() => {
    if (currentScenario.id !== "welcome") {
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
          setApiResult(result);
          console.log(result);
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
      return (
        <MotivationForm
          onFormSubmit={(result) => {
            addMessageToHistory(result, "bot");
            setApiResult(result);
            setCurrentScenarioId("motivation_result");
          }}
        />
      );
    } else if (currentScenarioId === "self_promotion") {
      return (
        <SelfPromotionForm
          onFormSubmit={(result) => {
            addMessageToHistory(result, "bot");
            setApiResult(result);
            setCurrentScenarioId("self_promotion_result");
          }}
        />
      );
    }
    return null;
  };

  // ユーザーオプションのクリック処理
  const handleOptionClick = (nextScenarioId, selectedOptionText) => {
    addMessageToHistory(selectedOptionText , "user");
    setCurrentScenarioId(nextScenarioId);
  };

  return (
    <div className="chat-window">
      {/* メッセージ履歴を表示 */}
      <div className="chat-history" ref={chatHistoryRef}>
        <div class="chat-message bot">
          こんにちは！私はあなたの就活アシスタントです。就職活動は挑戦の連続ですが、私が全力でサポートしますので、一緒に前進しましょう！何をお手伝いしましょうか？
        </div>
        {messageHistory.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.type}`}>
            {msg.message}
            {/* API呼んで生成したメッセージはコピーボタンを作る */}
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
              onClick={() => handleOptionClick(option.next, option.text)}
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
