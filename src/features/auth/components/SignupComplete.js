import React from "react";
import LoginForm from "./LoginForm";

const SignupComplete = () => {
    
    return (
        <div>
            <p>登録完了</p>
            <p>新規アカウント登録が完了しました。
            <br />ログインして続行してください。</p>
            <LoginForm />
        </div>
    );
}

export default SignupComplete;