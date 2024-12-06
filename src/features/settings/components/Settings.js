// Settings.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../hooks/useTheme";
import { useAuth } from "../../../hooks/useAuth";
import Modal from "../../../components/common/Modal/Modal";
import Button from "../../../components/common/Button/Button";
import PasswordChangeForm from "../../auth/components/PasswordChangeForm";
import Terms from "../../../components/Terms/Terms";

const Settings = () => {
  const { isLoggedIn, user, loading } = useAuth(); // ログイン状態のチェック
  const { theme, setTheme } = useTheme();
  const [currentView, setCurrentView] = useState("settings");
  const [activeModal, setactiveModal] = useState(null);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  if (currentView === "passwordChange") {
    return (
      <PasswordChangeForm
        onCancel={() => setCurrentView("settings")} // 戻るボタン用のハンドラー
      />
    );
  }

  // ラジオボタン
  const radioButtons = [
    {
      label: "システムのテーマ",
      value: "system",
    },
    {
      label: "ライトモード",
      value: "light",
    },
    {
      label: "ダークモード",
      value: "dark",
    },
  ];

  const openModal = (modalType) => {
    setactiveModal(modalType);
  };

  const closeModal = () => {
    setactiveModal(null);
  };

  return (
    <div className="settings">
      <div className="settings-account">
      <div>アカウント管理</div>
      {loading && <div>認証状態を確認中...</div>}
      {!isLoggedIn && (
        <Link to="/login">
          <Button variant="secondary" size="small">
            ログイン
          </Button>
        </Link>
      )}
      {isLoggedIn && (
        <div>
          <div className="account-email">登録メールアドレス: {user.email}</div>
          <Button
            className="change-password"
            variant="secondary"
            size="small"
            onClick={() => setCurrentView("passwordChange")}
          >
            パスワード変更
          </Button>
          <Button
            variant="secondary"
            size="small"
            onClick={() => openModal("logout")}
          >
            ログアウト
          </Button>
          <Button
            variant="danger"
            size="small"
            onClick={() => openModal("deleteAccount")}
          >
            アカウント削除
          </Button>
        </div>
      )}
      </div>
      <div className="settings-interface">
        <div>インターフェース</div>
        <div className="radio">
          {radioButtons.map((radio) => {
            return (
              <div key={radio.value}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="interface"
                  value={radio.value}
                  checked={radio.value === theme}
                  onChange={handleThemeChange}
                />
                <label className="form-check-label">
                  <span>{radio.label}</span>
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="settings-data">
        <div>データの管理</div>
        <div>
          <span>履歴書データ</span>
          <Button
            variant="danger"
            size="small"
            onClick={() => openModal("deleteResume")}
          >
            削除
          </Button>
        </div>
        <div>
          <span>チャットデータ</span>
          <Button
            variant="danger"
            size="small"
            onClick={() => openModal("deleteChat")}
          >
            削除
          </Button>
        </div>
      </div>
      <div className="settings-term">
        <div>利用規約</div>
        <div>最終更新日:yyyy-MM-DD</div>
        <Button
          className="open-modal-button"
          onClick={() => openModal("terms")}
          variant="primary"
          size="small"
        >
          閲覧
        </Button>
        <Modal
          isOpen={!!activeModal}
          onClose={closeModal}
          title={activeModal === "terms" ? "利用規約" : "削除確認"}
          size="medium"
        >
          {activeModal === "terms" && (
            <div className="modal-content-term">
              <Terms />
              <Button
                className="close-modal-button"
                onClick={closeModal}
                size="small"
              >
                閉じる
              </Button>
            </div>
          )}
          {activeModal === "logout" && (
            <div className="modal-content-confirm">
              <p>本当にログアウトしますか？</p>
              <Button
                variant="danger"
                onClick={() => {
                  console.log("ログアウトボタンを押した");
                  closeModal();
                }}
              >
                ログアウトする
              </Button>
              <Button variant="secondary" onClick={closeModal}>
                キャンセル
              </Button>
            </div>
          )}
          {(activeModal === "deleteResume" || activeModal === "deleteChat") && (
            <div className="modal-content-confirm">
              <p>
                {activeModal === "deleteResume" ? "履歴書データ" : "チャットデータ"}
                を本当に削除しますか？　この操作は元に戻せません。
              </p>
              <Button
                variant="danger"
                onClick={() => {
                  console.log(
                    activeModal === "deleteResume"
                      ? "履歴書削除"
                      : "チャット削除"
                  );
                  closeModal();
                }}
              >
                削除する
              </Button>
              <Button variant="secondary" onClick={closeModal}>
                キャンセル
              </Button>
            </div>
          )}
          {activeModal === "deleteAccount" && (
            <div className="modal-content-confirm">
              <p>
                本当にアカウントを削除しますか？　この操作は元に戻せません。
              </p>
              <Button
                variant="danger"
                onClick={() => {
                  console.log("アカウント削除");
                  closeModal();
                }}
              >
                削除する
              </Button>
              <Button variant="secondary" onClick={closeModal}>
                キャンセル
              </Button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Settings;
