import React, { useState } from "react";
import Input from '../../../components/common/Input/Input';
import Button from "../../../components/common/Button/Button";
import Modal from "../../../components/common/Modal/Modal";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PasswordForgot = () => {

    //パスワード変更用のメールアドレスの状態管理
    const [email, setEmail] = useState(null);

    //エラーメッセージ
	const [emailError, setEmailError] = useState("");

    //モーダルウィンドウ用
	const [isModalOpen, setIsModalOpen] = useState(false);

    //メールアドレス情報更新
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    };

    //10秒後にモーダルが閉じる
    const startTimeOut = () => {
        setTimeout(closeModal, 10000);
    }

    //送信用
    const handleEmailSubmit = async () => {
        if(email === null){
            console.log("入力してください");
            setEmailError("メールアドレスを入力してください");
        }else{
            console.log(email);
            setIsModalOpen(true);
            startTimeOut();         
        }
    }

    return (
        <form>
            <Input type="text" label="登録済みのメールアドレスを入力" name="email" onChange={handleEmail} required helperText={emailError} />
            <Button onClick={handleEmailSubmit}>送信</Button>
            <Modal isOpen={isModalOpen} onClose={closeModal} title="お知らせ" size="small">
                <div>
                    <p>登録済みのメールアドレス宛にパスワード再設定用のURLを送信しました。
                    この画面を閉じてください。※10秒後に自動的にこの画面を閉じます。</p>
                    <Button className="close-modal-button" onClick={closeModal}>
                        閉じる
                    </Button>
                </div>
            </Modal>
        </form>
    );
}

export default PasswordForgot;