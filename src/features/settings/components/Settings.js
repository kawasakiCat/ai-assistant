import React, { useState, useEffect } from "react";
import Modal from "../../../components/common/Modal/Modal"
import Button from "../../../components/common/Button/Button";
// import Input from "../../../components/common/Input/Input";

const Settings = () => {
	// 選択中のラジオボタン
	const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
	
	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}, [theme]);

	const handleThemeChange = (e) => {
		setTheme(e.target.value);
	};

	// ラジオボタン
	const radioButtons = [
		{
			label: "システムのテーマ",
			value: "system"
		},
		{
			label: "ライトモード",
			value: "light"
		},
		{
			label: "ダークモード",
			value: "dark"
		}
	];

	// モーダルウィンドウ開閉
	const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

	return (
		<div className="settings">
			<div className="settings-interface">
				<div>インターフェース</div>
				<div className="radio">
					{radioButtons.map(radio => {
						return (
							<div>
								<input className="form-check-input" type="radio" name="interface"
									value={radio.value} checked={radio.value === theme} onChange={handleThemeChange} />
								<label className="form-check-label">
									<span>{radio.label}</span>
								</label>
							</div>
						)
					})}
				</div>
				<div>{theme}が選択中</div>
			</div>
			<div className="settings-data">
				<div>データの管理</div>
				<div>
					<span>履歴書データ</span>
					<Button
						variant="danger"
						size="small"
					>
						削除
					</Button>
				</div>
				<div>
					<span>チャットデータ</span>
					<Button
						variant="danger"
						size="small"
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
					onClick={openModal}
					variant="primary"
					size="small"
				>
					閲覧
				</Button>
				<Modal
					isOpen={isModalOpen}
					onClose={closeModal}
					title="利用規約"
					size="medium"
				>
					<div className="modal-content-term">
						<p>利用規約の内容</p>
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
}

export default Settings;