// api.js
// OpenAI APIのやつ
export async function generateMotivation(userInput) {
	const apiKey = "YOUR_API_KEY";
	const response = await fetch("https://ai-assistant.core-akita.ac.jp/api/api-test-resume.php", {
	  method: "POST",
	  headers: {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${apiKey}`
	  },
	  body: JSON.stringify({
		model: "gpt-4",
		messages: [
		  { role: "system", content: "あなたは就職活動のアドバイザーです。以下の情報を基に志望動機を作成してください。" },
		  { role: "user", content: userInput }
		],
		max_tokens: 300
	  }),
	});
  
	if (!response.ok) {
	  throw new Error("API呼び出しに失敗しました");
	}
  
	const data = await response.json();
	return data.choices[0].message.content.trim();
}
  