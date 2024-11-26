import React, { useState } from 'react';
import Modal from '../../../components/common/Modal/Modal';
import Button from '../../../components/common/Button/Button';
import './ModalExample.css';

const ModalExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="modal-example-container">
      <Button 
        className="open-modal-button" 
        onClick={openModal}
      >
        モーダルを開く
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="サンプルモーダル"
        size="medium"
      >
        <div className="modal-content-example">
          <p>こんにちは！これはモーダルの内容です。</p>
          {/* 基本的な使用 */}
          <Button onClick={() => console.log('ボタンを押された')}>
            クリック
          </Button>

          {/* ボタンのスタイル */}
          <Button
            variant="primary"
          >
            variant="primary"
          </Button>

          <Button
            variant="secondary"
          >
            variant="secondary"
          </Button>

          <Button
            variant="danger"
          >
            variant="danger"
          </Button>

          <Button
            size="normal"
          >
            size="normal"
          </Button>

          <Button
            variant="success"
          >
            variant="success"
          </Button>

          <Button disabled>無効</Button>

          <Button
            size="small"
          >
            size="small"
          </Button>

          <Button
            className="close-modal-button" 
            onClick={closeModal}
          >
            閉じる
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ModalExample;