// const API_BASE_URL = "https://ai-assistant.core-akita.ac.jp/api"; // 例: 本番用URL

// 志望動機を生成するAPI
export async function submitMotivationForm(data) {
  try {
    // const response = await fetch(`${API_BASE_URL}/motivation`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data)
    // });

    // if (!response.ok) {
    //   throw new Error(`HTTPエラー! ステータス: ${response.status}`);
    // }

    // const result = await response.json();
	  const result = "APIに送信する関数を呼び出しました";
    return result;
	} catch (error) {
		console.error("API呼び出し中にエラーが発生しました:", error);
    throw error;
  }
}

// 自己PRを生成するAPI
export async function submitSelfPromotionForm(data) {
  try {
    // const response = await fetch(`${API_BASE_URL}/selfPR`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });

    // if (!response.ok) {
    //   throw new Error(`HTTPエラー! ステータス: ${response.status}`);
    // }

    // const result = await response.json();
    const result = "APIに送信する関数を呼び出しました";
    return result;
  } catch (error) {
    console.error("API呼び出し中にエラーが発生しました:", error);
    throw error;
  }
}
