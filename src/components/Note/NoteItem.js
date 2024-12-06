// NoteItem.js
import React , { useState } from 'react';
import Button from '../common/Button/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faExpand, faClipboard } from "@fortawesome/free-solid-svg-icons";

const NoteItem = ({ note, onDelete }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleExpand = () => setIsExpanded(!isExpanded);

	const handleCopy = () => {
		navigator.clipboard.writeText(note.text)
			.then(() => {
				alert("ノート内容をコピーしました！");
			})
			.catch(() => {
				alert("コピーに失敗しました……");
			});
	};

	return (
		<div className="note-item">
			<p>{isExpanded ? note.text : (note.text.length > 24 ? `${note.text.slice(0, 24)}...` : note.text)}</p>
			<div className="note-button-container">
				<Button
					className="note-delete-button"
					onClick={() => onDelete(note.id)} // 親コンポーネントにIDを渡す
					>
						<FontAwesomeIcon icon={faTrash} />
				</Button>
				<Button
					className="note-open-button"
					onClick={handleExpand}
					>
					<FontAwesomeIcon icon={faExpand} />
				</Button>
				<Button
					className="note-clip-button"
					onClick={handleCopy}
					>
					<FontAwesomeIcon icon={faClipboard} />
				</Button>
			</div>
		</div>
	);
};

export default NoteItem;