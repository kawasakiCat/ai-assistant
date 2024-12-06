// fakeAuthAPI.js
// ダミーの認証API関数

/**
 * ダミーの認証API。ログイン状態を再現。
 * @param {boolean} loggedIn - ログイン状態を再現するフラグ (trueでログイン済み、falseで未ログイン)
 * @returns {Promise<object|null>} ログイン済みの場合はユーザー情報を返す。未ログインならnull。
 */
const fakeAuthAPI = async (loggedIn = true) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (loggedIn) {
        resolve({ id: 1, email: "user@example.com", name: "テストユーザー" });
      } else {
        resolve(null); // 未ログイン状態
      }
    }, 1000); // 1秒後にレスポンス
  });
};

export default fakeAuthAPI;
