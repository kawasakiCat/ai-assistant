// scenario.js
export const scenarios = [
  {
    id: "welcome",
    message:
      "こんにちは！私はあなたの就活アシスタントです。就職活動は挑戦の連続ですが、私が全力でサポートしますので、一緒に前進しましょう！何をお手伝いしましょうか？",
    options: [
      { text: "志望動機の作成", next: "motivation" },
      { text: "自己PRの作成", next: "self_promotion" },
      { text: "ヘルプ・使い方", next: "help" },
    ],
  },
  {
    id: "menu",
    message: "何をお手伝いしましょうか？",
    options: [
      { text: "志望動機の作成", next: "motivation" },
      { text: "自己PRの作成", next: "self_promotion" },
      { text: "ヘルプ・使い方", next: "help" },
    ],
  },
  {
    id: "motivation",
    message:
      "志望動機の作成に必要な情報を教えてください！簡単なキーワードでもOKです！",
    type: "form",
    next: "motivation_generate",
  },
  {
    id: "motivation_generate",
    message: "入力内容をもとに志望動機を生成しています...",
    type: "api_call",
    api: "generateMotivation",
    next: "motivation_result",
  },
  {
    id: "motivation_result",
    message:
      "この志望動機の文章を保存する場合はコピーしてください。次はどうしますか？",
    options: [
      { text: "続けて作成する", next: "menu" },
      { text: "終了する", next: "goodbye" },
    ],
  },
  {
    id: "self_promotion",
    message:
      "自己PRに作成に必要な情報を教えてください！簡単なキーワードでもOKです！",
    type: "form",
    next: "self_promotion_generate",
  },
  {
    id: "self_promotion_generate",
    message: "入力内容をもとに自己PRを生成しています...",
    type: "api_call",
    api: "generateSelfPromotion",
    next: "self_promption_result",
  },
  {
    id: "self_promotion_result",
    message:
      "この自己PRの文章を保存する場合はコピーしてください。次はどうしますか？",
    options: [
      { text: "続けて作成する", next: "menu" },
      { text: "終了する", next: "goodbye" },
    ],
  },
  {
    id: "help",
    message: "何についてお聞きしたいですか？",
    options: [
      { text: "このアプリは何？", next: "app_overview" },
      { text: "使い方を教えて", next: "app_usage_guide" },
      { text: "あなたは誰ですか", next: "assistant_introduction" },
      { text: "聞きたいことはない", next: "help_end" },
    ],
  },
  {
    id: "app_overview",
    message:
      "本アプリケーションは主な利用者たる就活生をサポートすることを目的としています。具体的には、履歴書やエントリーシート用に書く志望動機や自己PRをチャット形式で生成できる機能とフォームに入力したデータを基に履歴書ファイルを出力できる機能を提供します。",
    options: [
      { text: "使い方を教えて", next: "app_usage_guide" },
      { text: "あなたは誰ですか", next: "assistant_introduction" },
      { text: "聞きたいことはない", next: "help_end" },
    ],
  },
  {
    id: "assistant_introduction",
    message: "就活アシスタントです。",
    options: [
      { text: "このアプリは何？", next: "app_overview" },
      { text: "使い方を教えて", next: "app_usage_guide" },
      { text: "聞きたいことはない", next: "help_end" },
    ],
  },
  {
    id: "app_usage_guide",
    message: "雰囲気で分かってください",
    options: [
      { text: "このアプリは何？", next: "app_overview" },
      { text: "あなたは誰ですか", next: "assistant_introduction" },
      { text: "聞きたいことはない", next: "help_end" },
    ],
  },
  {
    id: "help_end",
    message: "何をお手伝いしましょうか？",
    options: [
      { text: "志望動機の作成", next: "motivation" },
      { text: "自己PRの作成", next: "selfPromotion" },
      { text: "ヘルプ・使い方", next: "help" },
    ],
  },
  {
    id: "goodbye",
    message: "お疲れ様でした！またいつでもお手伝いします！",
    type: "end",
  },
];
