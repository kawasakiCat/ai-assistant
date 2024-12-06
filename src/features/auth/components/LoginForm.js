import React, { useState } from "react";
import Input from '../../../components/common/Input/Input';
import Button from "../../../components/common/Button/Button";
import { validatePassword } from "../services/validation";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginForm = () => {

    //ログイン用のメールアドレス、パスワードの状態管理
    const [ loginData, setloginData ] = useState({
        email : "",
        password : "",
    });
    
    //パスワード表示の状態管理
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    //エラーメッセージ
	const [passwordError, setPasswordError] = useState("");

    //ログイン情報更新
    const handleLoginData = (e) => {
        setloginData({ ...loginData, [e.target.name]: e.target.value });
        //エラー情報更新
        if( e.target.name === "password" ){
            const result = validatePassword(e.target.value);
            if( !result.isValid ){
                setPasswordError(result.message);
            }else{
                setPasswordError("");
            }
        }
    };

    //パスワード表示情報更新
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    //送信用
    const handleLoginSubmit = async () => {

        //ログイン用の情報に空白がないかチェック（空白があればtrueを返す）
        const formDataCheck = Object.values(loginData).some(value => value === "" || value === null );
        console.log(formDataCheck);

        if( passwordError || formDataCheck ){
            console.log("入力エラーがあります");
            return;
        }else{
            //問題がなければコンソールに表示（仮）
            console.log(loginData);
        }
    
    };

    return (
        <div>
            <div>
                <Input type='text' label="メールアドレス" name="email" onChange={handleLoginData} required helperText="" />
            </div>
            <div className="pw-group">
                <Input type={isPasswordVisible ? "text" : "password" } label="パスワード" name="password" onChange={handleLoginData} required error={passwordError} helperText="大文字・小文字・数字を含む8文字以上" />
				<span onClick={togglePasswordVisibility} className="password-toggle-icon">
					<FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
				</span>
            </div>
            <Button onClick={handleLoginSubmit}>ログイン</Button>
            <Link to="">パスワードをお忘れの方</Link>
            <Link to="/signup">アカウントをお持ちでない方</Link>
        </div>
    );
}

export default LoginForm;