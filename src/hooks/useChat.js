// シナリオのサンプルデータ
export const SAMPLE_SCENARIOS = [
  {
    id: 'job-interview',
    title: '就職面接シナリオ',
    initialMessage: '面接官：こんにちは。今日は弊社での面接です。',
    choices: [
      {
        id: 'greet-politely',
        playerMessage: 'こんにちは。よろしくお願いします。',
        response: '面接官：それでは、自己紹介をお願いします。',
        nextChoices: [
          {
            id: 'introduce-confident',
            text: '自信を持って自己紹介する',
            response: '面接官：素晴らしい自己紹介でした。'
          },
          {
            id: 'introduce-nervous',
            text: '緊張気味に自己紹介する',
            response: '面接官：落ち着いて話してください。'
          }
        ]
      }
    ]
  }
];