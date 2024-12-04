import React, { useState } from "react";
import Input from '../../../components/common/Input/Input';
import Button from "../../../components/common/Button/Button";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import '../../../styles/signup.css';

export default function SignupForm(){
    
    const [ signupData, setSignupData ] = useState({
        email : "",
        password : "",
    });
    const [ isVisible, setIsVisible ] = useState(false);

    const handleSignupData = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
    };

    const handleVisible = (prev) => {
        setIsVisible( (prev) => !prev )
    };

    return (
        <div>
            <div>
                <Input type='text' label="メールアドレス" name="email" value={signupData.email} onChange={handleSignupData} required helperText="" />
            </div>
            <div className="pw-group">
                <Input type={isVisible ? "text" : "password" } label="パスワード" name="password" value={signupData.password} onChange={handleSignupData} required helperText="" />
                <div onClick={handleVisible} className="eye-icon"><FontAwesomeIcon icon={isVisible ? faEye : faEyeSlash } /></div>
            </div>
            <div className="pw-group">
                <Input type='text' label="パスワード（確認）" name="password" required helperText="" />
                <div onClick={handleVisible} className="eye-icon"><FontAwesomeIcon icon={isVisible ? faEye : faEyeSlash } /></div>
            </div>
            <Button>新規登録</Button>
            <Link to="/login">アカウントをお持ちの方</Link>
        </div>
    );
};