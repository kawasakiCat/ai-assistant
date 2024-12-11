// ChatScenarioManager.js
import { scenarios } from "../../chat/config/ChatScenarioConfig";

// シナリオ管理のユーティリティ
const ChatScenarioManager = {
  /**
   * 現在のシナリオを取得する
   * @param {string} id - シナリオのID
   * @returns {object|null} - 該当するシナリオオブジェクト
   */
  getScenarioById: (id) => {
    return scenarios.find((scenario) => scenario.id === id) || null;
  },

  /**
   * 次のシナリオを取得する
   * @param {string} currentId - 現在のシナリオID
   * @param {string} nextId - 次に進むシナリオID
   * @returns {object|null} - 次のシナリオオブジェクト
   */
  getNextScenario: (currentId, nextId) => {
    const nextScenario = scenarios.find((scenario) => scenario.id === nextId);
    if (!nextScenario) {
      console.warn(`シナリオID "${nextId}" は存在しません`);
      return null;
    }
    return nextScenario;
  },

  /**
   * 初期シナリオを取得する
   * @returns {object} - 初期シナリオオブジェクト
   */
  getInitialScenario: () => {
    return scenarios.find((scenario) => scenario.id === "welcome") || null;
  },
};

export default ChatScenarioManager;
