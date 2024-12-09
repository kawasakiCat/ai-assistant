import React, { useState } from "react";
import Input from '../../../components/common/Input/Input';
import Button from "../../../components/common/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { validatePassword } from "../services/validation";
import LoginForm from "./LoginForm";

const PasswordForgotChange = () => {

    const [currentForm, setCurrentForm] = useState(0);

    const NextForm = () => {
        setCurrentForm(currentForm + 1);
    };

    return (
        <div>
            {currentForm === 0 && <PasswordForgotChangeForm onNext={NextForm} />}
            {currentForm === 1 && <PasswordChangeLoginForm />}
        </div>
    );

}

const PasswordForgotChangeForm = ({ onNext }) => {
    //新しく変更用のパスワードの状態管理
    const [ newPasswordData, setNewPasswordData ] = useState({
        newPassword : "",
        confirmNewPassword: "",
    });

    //パスワード表示の状態管理
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    //エラーメッセージ
	const [passwordError, setPasswordError] = useState("");
	const [passwordConfirmError, setPasswordConfirmError] = useState("");

    //パスワード情報更新
    const handleNewPasswordData = (e) => {
        setNewPasswordData({ ...newPasswordData, [e.target.name]: e.target.value });
        if( e.target.name === "newPassword" ){
            const result = validatePassword(e.target.value);
            if( !result.isValid ){
                setPasswordError(result.message);
            }else{
                setPasswordError("");
            }
        }
    
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

    const handleNewPasswordSubmit = async () => {
        //新規登録用の情報に空白がないかチェック（空白があればtrueを返す）
        const formDataCheck = Object.values(newPasswordData).some(value => value === "" || value === null );
        console.log(formDataCheck);

        if( newPasswordData.newPassword !== newPasswordData.confirmNewPassword ){
            setPasswordConfirmError("パスワードが一致していません");
        }else if( passwordError || passwordConfirmError || formDataCheck ){
            console.log("入力エラーがあります");
        }else{
            console.log(newPasswordData);
            //ログイン画面へ
            onNext();
        }

    }

    return (
        <div>
            <div className="pw-group">
                <Input type={isPasswordVisible ? "text" : "password" } label="新しいパスワード" name="newPassword" onChange={handleNewPasswordData} required error={passwordError} helperText="大文字・小文字・数字を含む8文字以上" />
				<span onClick={togglePasswordVisibility} className="password-toggle-icon">
					<FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
				</span>
            </div>
            <div className="pw-group">
                <Input type={isConfirmPasswordVisible ? "text" : "password" } label="新しいパスワード（確認）" name="confirmNewPassword" onChange={handleNewPasswordData} required error={passwordConfirmError} helperText="再度、新しいパスワードを入力してください" />
				<span onClick={toggleConfirmPasswordVisibility} className="password-toggle-icon">
					<FontAwesomeIcon icon={isConfirmPasswordVisible ? faEyeSlash : faEye} />
				</span>
            </div>
            <Button onClick={handleNewPasswordSubmit}>送信</Button>
        </div>
    );
}

const PasswordChangeLoginForm = () => {
    return (
        <div>
            <h1>パスワード変更完了</h1>
            <p>パスワード変更が完了しました。
                <br />ログインして続行してください。
            </p>
            <LoginForm />
        </div>
    );
}

export default PasswordForgotChange;