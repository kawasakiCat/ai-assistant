import React, { useState } from "react";
import Modal from "../components/common/Modal/Modal";
import Button from "../components/common/Button/Button";
import { Link } from "react-router-dom";
import Terms from "../components/Terms/Terms";
import "../styles/title.css";

const TitlePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckTerm, setIsCheckTerm] = useState(false);

  const handleCheckTerm = (e) => {
    setIsCheckTerm(e.target.checked);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="title-page">
      <div className="title-text"></div>
      <img
        src="../../images/TitleImage.png"
        alt="タイトルページのロゴ画像"
        className="title-image"
      />
      <div className="team-modal-container title-buttons">
        <div>
          <Button
            className="open-modal-button title-button"
            onClick={openModal}
            variant="secondary"
          >
            利用規約
          </Button>
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            title="利用規約"
            size="medium"
          >
            <div className="term-content">
              <Terms />

              <div className="Term-buttons">
                <input
                  type="checkbox"
                  checked={isCheckTerm}
                  onChange={handleCheckTerm}
                />
                <label className="">利用規約に同意する</label>
                <Button
                  className="close-modal-button"
                  onClick={closeModal}
                  size="small"
                  variant="secondary"
                >
                  閉じる
                </Button>
              </div>
            </div>
          </Modal>
        </div>
        <Link to="/login" className="">
          <Button disabled={!isCheckTerm} className="title-button">
            ログイン
          </Button>
        </Link>
        <Link to="/signup">
          <Button disabled={!isCheckTerm} className="title-button">
            新規登録
          </Button>
        </Link>
        <Link to="/">
          <Button disabled={!isCheckTerm} className="title-button" to="/">
            ログインせずに利用開始
          </Button>
        </Link>
        <div className="login-msg"></div>
      </div>
    </div>
  );
};

export default TitlePage;
