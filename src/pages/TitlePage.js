import React, { useState } from 'react';
import Modal from '../components/common/Modal/Modal';
import Button from '../components/common/Button/Button';

const TitlePage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
		<div>
			<h1>タイトルページ</h1>
			<div className="team-modal-container">
				<Button
					className="open-modal-button" 
					onClick={openModal}
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
						<Button
							className="close-modal-button" 
							onClick={closeModal}
							>
							閉じる
						</Button>
					</div>
				</Modal>
			</div>
		</div>
	);
};

export default TitlePage;