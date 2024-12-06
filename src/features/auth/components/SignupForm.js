import React, { useState } from "react";
import Input from '../../../components/common/Input/Input';
import Button from "../../../components/common/Button/Button";
import Modal from "../../../components/common/Modal/Modal";
import { validatePassword } from "../services/validation";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import '../../../styles/signup.css';

const SignupForm = () => {
    
    //新規登録用のメールアドレス、パスワードの状態管理
    const [ signupData, setSignupData ] = useState({
        signupEmail : "",
        signupPassword : "",
        confirmPassword: "",
    });
    //パスワード表示の状態管理
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    //エラーメッセージ
	const [passwordError, setPasswordError] = useState("");
	const [passwordConfirmError, setPasswordConfirmError] = useState("");

    //モーダルウィンドウ用
	const [isModalOpen, setIsModalOpen] = useState(false);

    //新規登録用の情報更新
    const handleSignupData = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
        if( e.target.name === "signupPassword" ){
            // setSignupData({ ...signupData, [e.target.name]: e.target.value });
            const result = validatePassword(e.target.value);
            if( !result.isValid ){
                setPasswordError(result.message);
            }else{
                setPasswordError("");
            }
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };
    
    //送信用
    const handleSignupSubmit = async () => {

        //新規登録用の情報に空白がないかチェック（空白があればtrueを返す）
        const formDataCheck = Object.values(signupData).some(value => value === "" || value === null );
        // console.log(formDataCheck);

        if( signupData.confirmPassword !== signupData.signupPassword ){
            // console.log(signupData.confirmPassword);
            // console.log(signupData.signupPassword);
            setPasswordConfirmError("パスワードが一致していません");
        }else if( passwordError || passwordConfirmError || formDataCheck ){
            console.log("入力エラーがあります");
            return;
        }else{
            //問題がなければコンソールに表示（仮）
            console.log(signupData);
            setIsModalOpen(true);
            startTimeOut();         
        }

    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

    //10秒後にモーダルが閉じる
    const startTimeOut = () => {
        setTimeout(closeModal, 10000);
    }
    
    
    return (
        <form>
            <div>
                <Input type='text' label="メールアドレス" name="signupEmail" onChange={handleSignupData} required helperText="" />
            </div>
            <div className="pw-group">
                <Input type={isPasswordVisible ? "text" : "password" } label="パスワード" name="signupPassword" onChange={handleSignupData} required error={passwordError} helperText="大文字・小文字・数字を含む8文字以上" />
				<span onClick={togglePasswordVisibility} className="password-toggle-icon">
					<FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
				</span>
            </div>
            <div className="pw-group">
                <Input type={isConfirmPasswordVisible ? "text" : "password" } label="パスワード（確認）" name="confirmPassword" onChange={handleSignupData} required error={passwordConfirmError} helperText="再度、パスワードを入力してください" />
				<span onClick={toggleConfirmPasswordVisibility} className="password-toggle-icon">
					<FontAwesomeIcon icon={isConfirmPasswordVisible ? faEyeSlash : faEye} />
				</span>
            </div>
            <Button onClick={handleSignupSubmit}>新規登録</Button>
            <Modal isOpen={isModalOpen} onClose={closeModal} title="お知らせ" size="small">
                <div>
                    <p>ご入力のメールアドレス宛に登録確認のURLを送信しました。
                        この画面を閉じて、受信したメールに記載されているURLからログインをしてください。
                        ※10秒経過後この画面は自動的に閉じます。
                    </p>
                    <Button className="close-modal-button" onClick={closeModal}>
                        閉じる
                    </Button>
                </div>
            </Modal>
            <Link to="/login">アカウントをお持ちの方</Link>
        </form>
    );
};

export default SignupForm;