import React, { useState } from 'react';
import Input from './components/common/Input/Input';

function InputExample() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // バリデーション例
    if (!value.includes('@')) {
      setEmailError('有効なメールアドレスを入力してください');
    } else {
      setEmailError('');
    }
  };

  return (
    <Input
      type="email"
      label="メールアドレス"
      name="email"
      value={email}
      onChange={handleEmailChange}
      required
      error={emailError}
      helperText="例: example@email.com"
    />
  );
}

export default InputExample;