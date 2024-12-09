// AddNoteForm.js
import React, { useState } from 'react';
import Button from '../common/Button/Button';
import TextArea from '../common/TextArea/TextArea';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronLeft, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "./AddNoteForm.css";

const AddNoteForm = ({ isOpen, onToggle, onAdd }) => {
	const [inputValue, setInputValue] = useState("");

	const handleAdd = () => {
		if (inputValue.trim()) {
			onAdd(inputValue);
			setInputValue(""); // 入力フィールドをリセット
		}
	};

	return (
		<div className={`noteform-container ${isOpen ? "open" : ""}`}>
			<Button
				className={`noteform-toggle-button ${isOpen ? "open" : "''"}`}
				onClick={onToggle}
				variant="primary"
			>
				<FontAwesomeIcon icon={faPenToSquare} />
			</Button>

			{isOpen && (
				<div className="add-note-form">
					<TextArea
						className="noteform-textarea"
						type="text"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						placeholder="メモを入力..."
					/>
					<div className="noteform-button-container">
						<span
							className="close-noteform-button"
							onClick={onToggle}
						>
							<FontAwesomeIcon icon={faChevronLeft} />
						</span>
						<Button
							className="add-note-button"
							onClick={handleAdd}
							variant="primary"
						>
							<FontAwesomeIcon icon={faCheck} />
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default AddNoteForm;
