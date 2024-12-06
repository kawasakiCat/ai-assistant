/**
 * フェイクのパスワード変更関数
 * @param {string} currentPassword - 現在のパスワード
 * @param {string} newPassword - 新しいパスワード
 * @returns {Promise} フェイクのAPIレスポンス
 */
export async function changePassword(currentPassword, newPassword) {
    return new Promise((resolve, reject) => {
      // フェイクの遅延を追加
      setTimeout(() => {
        if (currentPassword === "validPassword") {
          // 成功ケース
          resolve({
            message: "APIの応答: パスワードが正常に変更されました。これはフェイクの応答です。",
          });
        } else {
          // エラーレスポンス
          reject(new Error("APIの応答: 現在のパスワードが間違っています。これはフェイクの応答です。"));
        }
      }, 1000); // 1秒の遅延
    });
  }
  