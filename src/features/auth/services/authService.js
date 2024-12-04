// authService.js

// APIのベースURL
const BASE_URL = "https://ai-assistant.core-akita.ac.jp/api"; // ← 自分のバックエンドURLに変更！

/**
 * パスワード変更リクエストを送信する関数
 * @param {string} currentPassword - 現在のパスワード
 * @param {string} newPassword - 新しいパスワード
 * @returns {Promise} APIのレスポンス
 */
export async function changePassword(currentPassword, newPassword) {
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
