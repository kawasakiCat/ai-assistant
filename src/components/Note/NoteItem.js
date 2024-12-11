// // NoteItem.js
// import React from 'react';
// import Button from '../common/Button/Button';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash, faExpand, faClipboard } from "@fortawesome/free-solid-svg-icons";

// const NoteItem = ({ note, onDelete, onOpen }) => {

// 	const handleCopy = () => {
// 		navigator.clipboard.writeText(note.text)
// 			.then(() => {
// 				alert("ノート内容をコピーしました！");
// 			})
// 			.catch(() => {
// 				alert("コピーに失敗しました……");
// 			});
// 	};

// 	return (
// 		<div className="note-item">
// 			<p>{note.text.length > 24 ? `${note.text.slice(0, 24)}...` : note.text}</p>
// 			<div className="note-button-container">
// 				<Button
// 					className="note-delete-button"
// 					onClick={onDelete}
// 				>
// 					<FontAwesomeIcon icon={faTrash} />
// 				</Button>
// 				<Button
// 					className="note-open-button"
// 					onClick={onOpen}
// 				>
// 					<FontAwesomeIcon icon={faExpand} />
// 				</Button>
// 				<Button
// 					className="note-clip-button"
// 					onClick={handleCopy}
// 				>
// 					<FontAwesomeIcon icon={faClipboard} />
// 				</Button>
// 			</div>
// 		</div>
// 	);
// };

// export default NoteItem;