// PasswordChangeForm.js
import React, { useState } from "react";
import { validatePassword } from "../services/validation";
import { changePassword } from "../services/authService";
import Input from "../../../components/common/Input/Input";
import Button from "../../../components/common/Button/Button";
import Modal from "../../../components/common/Modal/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const PasswordChangeForm = () => {
	// パスワード表示トグル状態管理
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
	const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

	// パスワードの状態管理
	const [currentPassword, setCurremtPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [passwordConfirmError, setPasswordConfirmError] = useState("");

	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleNewPasswordChange = (e) => {
    const value = e.target.value;
		setNewPassword(value);

    const result = validatePassword(value);
		if (!result.isValid) {
			setPasswordError(result.message);
		} else {
			setPasswordError("");
		}
  };

	const handlePasswordcConfirmChange = (e) => {
    const value = e.target.value;
		setPasswordConfirm(value);

		if (value !== newPassword) {
			setPasswordConfirmError("パスワードが一致していません");
		} else {
			setPasswordConfirmError("");
		}
  };

	const handlePasswordSubmit = async () => {
		if (passwordError || passwordConfirmError || !currentPassword) {
      console.error("入力エラーがあります。");
      return;
    }

		try {
			const result = await changePassword(currentPassword, newPassword);
			console.log(result);
			setIsModalOpen(true);
		} catch (error) {
			console.error("パスワード変更に失敗しました", error);
		}
	}

	return (
		<div className="password-change-form">
			<div className="password-input-wrapper">
				<Input
					type="password"
					label="現在のパスワード"
					name="currentPassword"
					onChange={(e) => setCurremtPassword(e.target.value)}
					required
				/>
			</div>
			<div className="password-input-wrapper">
				<Input
					type={isPasswordVisible ? "text" : "password"}
					label="新しいパスワード"
					name="newPassword"
					onChange={handleNewPasswordChange}
					required
					error={passwordError}
					helperText="大文字・小文字・数字を含む8文字以上"
				/>
				<span
					onClick={togglePasswordVisibility}
          className="password-toggle-icon"
				>
					<FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
				</span>
			</div>
			<div className="password-input-wrapper">
				<Input
					type={isConfirmPasswordVisible ? "text" : "password"}
					label="新しいパスワード（確認用）"
					name="passwordConfirm"
					onChange={handlePasswordcConfirmChange}
					required
					error={passwordConfirmError}
					helperText="再度、新しいパスワードを入力してください"
				/>
				<span
					onClick={toggleConfirmPasswordVisibility}
          className="password-toggle-icon"
				>
					<FontAwesomeIcon icon={isConfirmPasswordVisible ? faEyeSlash : faEye} />
				</span>
			</div>
			<Button
				className="password-change-button"
				onClick={handlePasswordSubmit}
			>
				送信
			</Button>
			<Modal
				isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="成功"
        size="small"
			>
				<div className="modal-content-example">
					<p>パスワードが正常に変更されました。</p>
					<Button
            className="close-modal-button" 
            onClick={() => setIsModalOpen(false)}
          >
            閉じる
          </Button>
				</div>
			</Modal>
		</div>
	)
}

export default PasswordChangeForm;