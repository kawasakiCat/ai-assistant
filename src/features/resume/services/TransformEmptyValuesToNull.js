// 空白を null に変換する
function transformEmptyValuesToNull(data) {
    if (typeof data === "string" && data === "") {
      return null; // 空文字列を null に変換
    }
    
    if (Array.isArray(data)) {
      return data.map(transformEmptyValuesToNull); // 配列の場合再帰処理
    }
  
    if (typeof data === "object" && data !== null) {
      return Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, transformEmptyValuesToNull(value)])
      );
    }
  
    // if()

    return data; // そのまま返す

}

export default transformEmptyValuesToNull;
  