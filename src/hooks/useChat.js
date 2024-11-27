import { useState, useEffect, useCallback } from 'react';
import chatService from '../services/chatService';

export const useChat = (chatId) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadInitialMessages = async () => {
      const initialMessages = await chatService.fetchMessages(chatId);
      setMessages(initialMessages);
    };

    loadInitialMessages();
    chatService.connectWebSocket(chatId, handleNewMessage);

    return () => {
      chatService.disconnectWebSocket();
    };
  }, [chatId]);

  const handleNewMessage = useCallback((newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }, []);

  const sendMessage = async (messageText) => {
    setIsLoading(true);
    try {
      const success = await chatService.sendMessage(chatId, messageText);
      if (success) {
        // メッセージは WebSocket で自動的に追加されるため、特に何もしない
      }
    } catch (error) {
      console.error('メッセージ送信エラー:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    sendMessage,
    isLoading
  };
};