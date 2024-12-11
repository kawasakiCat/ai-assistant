// useChatState.js
import { useEffect, useState } from "react";

export function useChatState() {
  const [chatState, setChatState] = useState(() => {
    const savedState = localStorage.getItem("chatState");
    return savedState ? JSON.parse(savedState) : { currentScenario: "welcome", history: [] };
  });

  useEffect(() => {
    localStorage.setItem("chatState", JSON.stringify(chatState));
  }, [chatState]);

  return [chatState, setChatState];
}
