import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button/Button';
import Navigation from '../components/Navigation/Navigation';

const HomePage = () => {
  return (
		<div>
      <Navigation />
	    <h1>モード選択</h1>
      <div className="mode-item">
        <Link to="/chat">
          <Button className="mode-item-button" variant="primary">
            文章生成モード
            <br />
            志望動機や自己PRの文章をAIが生成します。
          </Button>
        </Link>
      </div>
      <div className="mode-item">
        <Link to="/resume">
          <Button className="mode-item-button" variant="primary">
            履歴書作成モード
            <br />
            必要項目を入力すると履歴書を自動で作成できます。
          </Button>
        </Link>
      </div>
		</div>
	);
};

export default HomePage;
