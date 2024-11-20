import React, { useState } from 'react';

const FormComponent = () => {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');

  // APIにデータを送信する関数
  const handleSubmit = async (e) => {
    e.preventDefault(); // デフォルトのフォーム送信を防止

    try {
      // fetchを使う場合
      const response = await fetch('http://localhost/AIChat/api-test.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText }), // APIに送信するデータ
      });

      if (!response.ok) {
        throw new Error('APIリクエストに失敗しました');
      }

      const data = await response.json(); // レスポンスデータをJSONで取得
      setResponseText(data.reply); // レスポンスのテキストを保存
    } catch (error) {
      console.error('エラー:', error);
      setResponseText('エラーが発生しました');
    }
  };

  return (
    <div>
      <h1>フォーム送信とAPI通信</h1>
      <form onSubmit={handleSubmit}>
        <label>
          テキストを入力:
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </label>
        <button type="submit">送信</button>
      </form>
      <div>
        <h2>APIからのレスポンス:</h2>
        <p>{responseText}</p>
      </div>
    </div>
  );
};

export default FormComponent;
