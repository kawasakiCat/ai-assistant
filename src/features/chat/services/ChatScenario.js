export const scenarios = [
	{
	  "id": "welcome",
	  "message": "こんにちは！何をお手伝いしましょうか？",
	  "options": [
		{ "text": "志望動機の作成", "next": "motivation" },
		{ "text": "自己PRの作成", "next": "self_pr" },
		{ "text": "ガクチカの作成", "next": "gakuchika" },
		{ "text": "ヘルプ・使い方", "next": "help" }
	  ]
	},
	{
	  "id": "motivation",
	  "message": "志望動機について詳しく教えてください。簡単なキーワードでもOKです！",
	  "type": "form",
	  "next": "result"
	},
	{
	  "id": "result",
	  "message": "素晴らしい志望動機ですね！次はどうしますか？",
	  "options": [
		{ "text": "続けて作成する", "next": "welcome" },
		{ "text": "終了する", "next": "goodbye" }
	  ]
	},
	{
	  "id": "goodbye",
	  "message": "お疲れ様でした！またいつでもお手伝いします！",
	  "type": "end"
	}
]