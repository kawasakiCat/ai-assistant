import React, { useState, useEffect } from "react";
import Modal from "../../../components/common/Modal/Modal"
import Button from "../../../components/common/Button/Button";
// import Input from "../../../components/common/Input/Input";

const Settings = () => {
	// 選択中のラジオボタン
	const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");
	
	const getSystemTheme = () => {
		return window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
	};

	useEffect(() => {
		const currentTheme = theme === "system" ? getSystemTheme() : theme;
		document.documentElement.setAttribute('data-theme', currentTheme);
		localStorage.setItem('theme', theme);
	}, [theme]);

	useEffect(() => {
		if (theme === "system") {
			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			const handleChange = () => {
        const newSystemTheme = mediaQuery.matches ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newSystemTheme);
      };
			mediaQuery.addEventListener("change", handleChange);

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
		}
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

	// モーダルの状態管理
	const [activeModal, setactiveModal] = useState(null);

  const openModal = (modalType) => {
    setactiveModal(modalType);
  };

  const closeModal = () => {
    setactiveModal(null);
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
					title={
						activeModal === "terms"
							? "利用規約"
							: "削除確認"
					}
					size="medium"
				>
					{activeModal === "terms" && (
						<div className="modal-content-term">
							<p>利用規約の内容</p>
							<Button
								className="close-modal-button"
								onClick={closeModal}
								size="small"
							>
								閉じる
							</Button>
						</div>
					)}
					{(activeModal === "deleteResume" || activeModal === "deleteChat") && (
						<div className="modal-content-confirm">
							<p>{activeModal === "deleteResume" ? "履歴書データ" : "チャットデータ"}を本当に削除しますか？</p>
							<Button
								variant="danger"
								onClick={() => {
									console.log(activeModal === "deleteResume" ? "履歴書削除" : "チャット削除");
									closeModal();
								}}>
									削除する
							</Button>
							<Button
								variant="secondary"
								onClick={closeModal}
							>
								キャンセル
							</Button>
						</div>
					)}
				</Modal>
			</div>
		</div>
	);
}

export default Settings;