// PasswordChangeForm.js
// ユーザーがログイン状態のとき、現在のパスワードの入力を求めます。
import React, { useState } from "react";
import { validatePassword } from "../services/validation";
import { changePassword } from "../services/authService";
import { useAuth } from "../../../hooks/useAuth";
import Input from "../../../components/common/Input/Input";
import Button from "../../../components/common/Button/Button";
import Modal from "../../../components/common/Modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const PasswordChangeForm = ({ onCancel }) => {
  // ログイン状態のチェック
  const { isLoggedIn, loading } = useAuth();

  // パスワード表示トグル状態管理
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  // パスワードの状態管理
  const [currentPassword, setCurremtPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const isFormValid =
    currentPassword &&
    newPassword &&
    passwordConfirm &&
    !passwordError &&
    !passwordConfirmError;
  
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
      setModalMessage(result.message);
    } catch (error) {
      setModalMessage(error.message);
    } finally {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="password-change-form">
      {loading && <div>認証状態を確認中...</div>}
      {isLoggedIn && (
        <div className="password-input-wrapper">
          <Input
            type="password"
            label="現在のパスワード"
            name="currentPassword"
            onChange={(e) => setCurremtPassword(e.target.value)}
            required
          />
        </div>
      )}
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
          //helperText="再度、新しいパスワードを入力してください"
        />
        <span
          onClick={toggleConfirmPasswordVisibility}
          className="password-toggle-icon"
        >
          <FontAwesomeIcon
            icon={isConfirmPasswordVisible ? faEyeSlash : faEye}
          />
        </span>
      </div>
      {isLoggedIn && (
        <Button
          className="password-change-button"
          onClick={onCancel}
          size="small"
        >
          戻る
        </Button>
      )}
      <Button
        className="password-change-button"
        onClick={handlePasswordSubmit}
        size="small"
        disabled={!isFormValid}
      >
        送信
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="パスワード変更処理の結果"
        size="small"
      >
        <div className="modal-content-example">
          <p>{modalMessage}</p>
          <Button
            className="close-modal-button"
            onClick={() => setIsModalOpen(false)}
          >
            閉じる
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default PasswordChangeForm;
