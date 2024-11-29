import React, { useState } from 'react';
import Modal from '../components/common/Modal/Modal';
import Button from '../components/common/Button/Button';
import '../styles/title.css';

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
		<div className='title-page'>
			<h1>就活アシスタントアプリ</h1>
			<img src='../../images/TitleImage.png' alt='タイトルページのロゴ画像' className='title-image' />
			<div className="team-modal-container">
				<Button
					className="open-modal-button" 
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
						<p>利用規約です。</p>
						<div>
							<input type='checkbox' checked={isCheckTerm} onChange={handleCheckTerm} />
							<label className="">利用規約に同意する</label>
							<Button
								className="close-modal-button" 
								onClick={closeModal}
								>
								閉じる
							</Button>
						</div>
					</div>
				</Modal>
				<Button disabled={!isCheckTerm}>ログイン</Button>
				<Button disabled={!isCheckTerm}>新規登録</Button>
				<Button disabled={!isCheckTerm}>利用開始</Button>
				<div>ログインせずに使用するとチャット履歴が保存されません。</div>
			</div>
		</div>
	);
};

export default TitlePage;