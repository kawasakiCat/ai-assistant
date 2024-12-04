// validation.js
const commonPasswords = [
  "password",
  "passw0rd",
  "123456",
  "123456789",
  "12345678",
  "qwerty",
  "abc123",
  "welcome",
  "hello",
  "admin",
  "000000",
  "111111",
  "222222",
];

// パスワードバリデーション関数
export const validatePassword = (password) => {
  // 長さチェック
  if (password.length < 8) {
    return {
      isValid: false,
      message: "パスワードは最低8文字必要です",
    };
  }

  if (password.length > 24) {
    return {
      isValid: false,
      message: "パスワードは24文字以内にしてください",
    };
  }

  // 大文字チェック
  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: "大文字を最低1文字含めてください",
    };
  }

  // 小文字チェック
  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      message: "小文字を最低1文字含めてください",
    };
  }

  // 数字チェック
  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      message: "数字を最低1文字含めてください",
    };
  }

  // 連続した同じ文字のチェック（3文字以上の連続は禁止）
  if (/(.)\1{2,}/.test(password)) {
    return {
      isValid: false,
      message: "同じ文字を3回以上連続して使用することはできません",
    };
  }

  // 辞書単語のチェック（大文字小文字を区別しない）
  const lowercasePassword = password.toLowerCase();
  if (
    commonPasswords.some((commonPw) =>
      lowercasePassword.includes(commonPw.toLowerCase())
    )
  ) {
    return {
      isValid: false,
      message: "推測されやすいパスワードは使用できません",
    };
  }

  return { isValid: true };
};

export const validationRules = {
  customer_lastname: {
    required: false,
    message: "姓を入力する場合は、1文字以上入力してください。",
  },
  customer_firstname: {
    required: false,
    message: "名を入力する場合は、1文字以上入力してください。",
  },
  customer_lastname_kana: {
    required: true,
    pattern: /^[ァ-ヶー]+$/,
    message: "姓のフリガナは全角カタカナで入力してください。",
  },
  customer_firstname_kana: {
    required: true,
    pattern: /^[ァ-ヶー]+$/,
    message: "名のフリガナは全角カタカナで入力してください。",
  },
  customer_lastname_roman: {
    required: true,
    pattern: /^[a-zA-Z]+$/,
    message: "姓のローマ字は半角英字で入力してください。",
  },
  customer_firstname_roman: {
    required: true,
    pattern: /^[a-zA-Z]+$/,
    message: "名のローマ字は半角英字で入力してください。",
  },
  postal_code: {
    required: true,
    pattern: /^\d{7}$/,
    message: "郵便番号はハイフンなしで7桁の数字で入力してください。",
  },
  customer_address_1: {
    required: true,
    minLength: 5,
    message: "住所は5文字以上で入力してください。",
  },
  customer_address_2: {
    required: true,
    minLength: 1,
    maxLength: 50,
    pattern: /^[0-9０-９一-龯ぁ-んァ-ヶー\s\-]+$/,
    message:
      "番地は1〜50文字で、数字、漢字、かな、カナ、ハイフン、スペースのみを使用してください。",
  },
  customer_telno: {
    required: true,
    pattern: /^0\d{9,10}$/,
    message:
      "電話番号はハイフンなしで0から始まる10桁または11桁の数字で入力してください。",
  },
  customer_mail_address: {
    required: true,
    pattern:
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    message: "有効なメールアドレスを入力してください。",
  },
  password: {
    required: true,
    validate: validatePassword,
    message: "パスワードが無効です",
  },
};
