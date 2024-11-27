import axios from 'axios';
import { wsConnect } from './websocket';

class ChatService {
  constructor() {
    this.socket = null;
  }

  async fetchMessages(chatId) {
    try {
      const response = await axios.get(`/api/chats/${chatId}/messages`);
      return response.data;
    } catch (error) {
      console.error('メッセージ取得エラー:', error);
      return [];
    }
  }

  async sendMessage(chatId, message) {
    try {
      await axios.post(`/api/chats/${chatId}/messages`, { message });
      return true;
    } catch (error) {
      console.error('メッセージ送信エラー:', error);
      return false;
    }
  }

  connectWebSocket(chatId, onMessageReceived) {
    this.socket = wsConnect(chatId);
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      onMessageReceived(message);
    };
  }

  disconnectWebSocket() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

export default new ChatService();