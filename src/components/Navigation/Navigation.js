import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button/Button';
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
          <Link to="/chat" onClick={toggleMenu}>
            <Button className="menu-item-button" variant="primary">
              文章
              <br />
              生成
            </Button>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/resume" onClick={toggleMenu}>
            <Button className="menu-item-button" variant="primary">
              履歴書作成
            </Button>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/memo" onClick={toggleMenu}>
            <Button className="menu-item-button" variant="primary">
              メモ
            </Button>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/settings" onClick={toggleMenu}>
            <Button className="menu-item-button" variant="primary">
              設定
            </Button>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/login" onClick={toggleMenu}>
            <Button className="menu-item-button" variant="primary">
              ログ
              <br />
              イン
            </Button>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/" onClick={toggleMenu}>
            <Button className="menu-item-button" variant="primary">
              モード選択
            </Button>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/title" onClick={toggleMenu}>
            <Button className="menu-item-button" variant="primary">
              タイトル
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;