// useAuth.js
// 認証情報を取得してくるフック
import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ログイン状態
  const [user, setUser] = useState(null); // ユーザー情報
	const [loading, setLoading] = useState(true); // データ取得中フラグ

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await fakeAuthAPI(); // 認証状態をチェックする（ここはAPIやライブラリと連携）
        setIsLoggedIn(!!userData); // userDataがある＝ログイン済み
        setUser(userData);         // ユーザーデータをセット
      } catch (err) {
        console.error("認証エラー:", err);
        setIsLoggedIn(false);      // 認証エラーの場合はログイン状態をリセット
        setUser(null);
      } finally {
        setLoading(false);         // ローディングを終了
      }
    };
		checkAuth();
  }, []);

  return { isLoggedIn, user, loading };
};

// ダミーAPI関数
const fakeAuthAPI = async () => {
	// 仮の認証API。1秒後にログイン済みのユーザー情報を返す。
	return new Promise((resolve) => {
		setTimeout(() => resolve({ id: 1, email: "user@example.com", name: "テストユーザー" }), 1000);
	});
};