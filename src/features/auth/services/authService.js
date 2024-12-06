// authService.js
let changePassword;

if (process.env.NODE_ENV === "development") {
  // 開発環境ではフェイクサービスを使用
  const { changePassword: fakeChangePassword } = require("./authServiceFake");
  changePassword = fakeChangePassword;
} else {
  // 本番用の関数を使用
  // APIのベースURL
  const BASE_URL = "https://ai-assistant.core-akita.ac.jp/api";

  /**
   * @param {string} currentPassword - 現在のパスワード
   * @param {string} newPassword - 新しいパスワード
   * @returns {Promise} APIのレスポンス
   */
  changePassword = async function (currentPassword, newPassword) {
    try {
      const response = await fetch(`${BASE_URL}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 必要なら認証トークンもヘッダーに追加
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "パスワード変更に失敗しました");
      }

      return await response.json(); // 成功レスポンス
    } catch (error) {
      console.error("パスワード変更エラー:", error.message);
      throw error; // UIにエラー表示したい場合にそのまま投げる
    }
  }
}

export { changePassword };