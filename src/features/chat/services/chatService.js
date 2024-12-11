// chatSesrvice.js

const API_BASE_URL = "https://ai-assistant.core-akita.ac.jp/api"; // 例: 本番用URL

// 志望動機を生成するAPI
export async function submitMotivationForm(data) {
  try {
    console.log("send : motivation");
    const response = await fetch(`${API_BASE_URL}/motivation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTPエラー! ステータス: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    console.log(result.reply);
    return result.reply;
    // const result = `送信されたデータ:, ${data}`;
    // return result;
  } catch (error) {
    console.error("API呼び出し中にエラーが発生しました:", error);
    throw error;
  }
}

// 自己PRを生成するAPI
export async function submitSelfPromotionForm(data) {
  try {
    console.log("send : selfPR");
    const response = await fetch(`${API_BASE_URL}/selfpr`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTPエラー! ステータス: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    console.log(result.reply);
    return result.reply;
    // const result = "APIをよびだしました";
    // return result;
  } catch (error) {
    console.error("API呼び出し中にエラーが発生しました:", error);
    throw error;
  }
}
