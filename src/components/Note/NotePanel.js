// // NotePanel.js
// import React, { useState } from 'react';
// import Button from '../common/Button/Button';
// import Modal from '../common/Modal/Modal';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFileLines, faClipboard, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
// import "./Note.css";
// import NoteItem from './NoteItem';
// import AddNoteForm from './AddNoteForm';
// import TextArea from '../common/TextArea/TextArea';

// const NotePanel = ({ notes, onAddNote, onDeleteNote, onUpdateNotes }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   // const [selectedNoteId, setSelectedNoteId] = useState(null);
//   const [selectedNote, setSelectedNote] = useState(null);

//   const toggleNote = () => setIsOpen(!isOpen);
//   const toggleForm = () => setIsFormOpen(!isFormOpen);

//   const handleEditNote = (id, updatedText) => {
//     const updatedNotes = notes.map((note) =>
//       note.id === id ? { ...note, text: updatedText } : note
//     );
//     onUpdateNotes(updatedNotes);
//   };

//   const handleCloseEditModal = () => setSelectedNote(null);

//   const handleDeleteClick = (noteId) => {
//     setSelectedNote(noteId);
//     setIsModalOpen(true);
//   }

//   const handleConfirmDelete = () => {
//     if (selectedNote !== null) {
//       onDeleteNote(selectedNote);
//     }
//     setIsModalOpen(false);
//     setSelectedNote(null);
//   }

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedNote(null);
//     setSelectedNote(null);
//   };

//   return (
//     <div className="sliding-note-container">
//       <div className={`note-panel ${isOpen ? "open" : ""}`}>
//         {/* メモが保存されていたら<NoteItem />をこの中にタイルっぽく表示、なかったら「保存済みのメモはありませんと表示」 */}
//         {notes.length > 0 ? (
//           notes.map((note) => (
//             <NoteItem
//               key={note.id}
//               note={note}
//               onDelete={() => handleDeleteClick(note.id)}
//               onOpen={() => setSelectedNote(note)}
//             />
//           ))
//         ) : (
//           <p>保存済みのメモはありません</p>
//         )}
//         <AddNoteForm isOpen={isFormOpen} onToggle={toggleForm} onAdd={onAddNote} />
//       </div>

//       <Button
//         className="note-toggle-button"
//         aria-label="Toggle notes panel"
//         onClick={toggleNote}
//         variant="primary"
//       >
//         <div className={`note-icon ${isOpen ? "open" : ""}`}>
//             <FontAwesomeIcon icon={isOpen ? faFileLines : faXmark} />
//           {/* {isOpen &&
//             <div className={`note-icon ${isOpen}`}>
//               <span className="icon-bar"></span>
//               <span className="icon-bar"></span>
//               <span className="icon-bar"></span>
//             </div>
//           } */}
//         </div>
//       </Button>

//       {selectedNote && (
//         <Modal
//           isOpen={!!selectedNote}
//           onClose={handleCloseEditModal}
//           title="ノートの編集"
//         >
//           <TextArea
//             value={selectedNote?.text || ""}
//             onChange={(e) =>
//               setSelectedNote({ ...selectedNote, text: e.target.value })
//             }
//           />

//           <Button
//             className="note-delete-button"
//           >
//             <FontAwesomeIcon icon={faTrash} />
//           </Button>
//           <Button
//             className="note-clip-button"
//           // onClick={}
//           >
//             <FontAwesomeIcon icon={faClipboard} />
//           </Button>

//           <Button
//             variant="primary"
//             onClick={() => {
//               handleEditNote(selectedNote.id, selectedNote.text);
//               handleCloseModal();
//             }}
//           >
//             保存
//           </Button>
//         </Modal>
//       )}

//       <Modal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         title="削除の確認"
//         size="small"
//       >
//         <p>本当にこのノートを削除しますか？</p>
//         <div className="modal-actions">
//           <Button
//             variant="danger"
//             size="small"
//             onClick={handleConfirmDelete}
//             className="confirm-button"
//           >
//             削除する
//           </Button>
//           <Button
//             variant="secondary"
//             size="small"
//             onClick={handleCloseModal}
//             className="cancel-button"
//           >
//             キャンセル
//           </Button>
//         </div>
//       </Modal>
//     </div >
//   );
// };

// export default NotePanel;