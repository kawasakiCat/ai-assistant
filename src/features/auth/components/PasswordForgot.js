import React, { useState } from "react";
import Input from '../../../components/common/Input/Input';
import Button from "../../../components/common/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PasswordForgot = () => {
    return (
        <>
            <p>パスワードをお忘れですか？</p>
            <Input label="登録済みのメールアドレスを入力"></Input>
            <Button>送信</Button>
        </>
    );
}

export default PasswordForgot;