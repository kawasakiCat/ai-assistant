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
        email : "",
        password : "",
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
        if( e.target.name === "password" ){
            // setSignupData({ ...signupData, [e.target.name]: e.target.value });
            const result = validatePassword(e.target.value);
            if( !result.isValid ){
                setPasswordError(result.message);
            }
        }else if( e.target.name === "confirmPassword" ){
            // setSignupData({ ...signupData, [e.target.name]: e.target.value });
            if( signupData.confirmPassword !== signupData.password ){
                setPasswordConfirmError("パスワードが一致していません");
            }
        }else{
            // setSignupData({ ...signupData, [e.target.name]: e.target.value });
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };
    
    return (
        <div>
            <div>
                <Input type='text' label="メールアドレス" name="email" onChange={handleSignupData} required helperText="" />
            </div>
            <div className="pw-group">
                <Input type={isPasswordVisible ? "text" : "password" } label="パスワード" name="password" onChange={handleSignupData} required error={passwordError} helperText="大文字・小文字・数字を含む8文字以上" />
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
            <Button>新規登録</Button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="お知らせ" size="">
                <div>
                    <p>ご入力のメールアドレス宛に登録確認のURLを送信しました。
                        この画面を閉じて、受信したメールに記載されているURLからログインをしてください。
                        ※10秒経過後この画面は自動的に閉じます。
                    </p>
                    <Button className="close-modal-button" onClick={() => setIsModalOpen(false)}>
                        閉じる
                    </Button>
                </div>
            </Modal>
            <Link to="/login">アカウントをお持ちの方</Link>
        </div>
    );
};

export default SignupForm;