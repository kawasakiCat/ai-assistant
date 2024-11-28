import React, { useState } from 'react';
import Button from '../Button/Button';
import './Navigation.css';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sliding-menu-container">
      <Button
        className="menu-toggle-button"
        onClick={toggleMenu}
        variant="primary"
      >
        <div className={`menu-icon ${isOpen ? 'open' : ''}`}>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </div>
      </Button>

      <div className={`menu-panel ${isOpen ? 'open' : ''}`}>
		<h1 className="menu-title">Menu</h1>
        <div className="menu-item">
          <Button className="menu-item-button" variant="primary">
            文章生成
          </Button>
        </div>
        <div className="menu-item">
          <Button className="menu-item-button" variant="primary">
            履歴書作成
          </Button>
        </div>
        <div className="menu-item">
          <Button className="menu-item-button" variant="primary">
            メモ
          </Button>
        </div>
        <div className="menu-item">
          <Button className="menu-item-button" variant="primary">
            設定
          </Button>
        </div>
        <div className="menu-item">
          <Button className="menu-item-button" variant="primary">
            ログアウト
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;