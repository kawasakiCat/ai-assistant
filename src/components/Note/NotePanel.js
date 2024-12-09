// NotePanel.js
import React, { useState } from 'react';
import Button from '../common/Button/Button';
import Modal from '../common/Modal/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, } from "@fortawesome/free-solid-svg-icons";
import "./Note.css";
import NoteItem from './NoteItem';
import AddNoteForm from './AddNoteForm';

const NotePanel = ({ notes, onAddNote, onDeleteNote }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const toggleNote = () => setIsOpen(!isOpen);
  const toggleForm = () => setIsFormOpen(!isFormOpen);

  const handleDeleteClick = (noteId) => {
    setSelectedNoteId(noteId);
    setIsModalOpen(true);
  }

  const handleConfirmDelete = () => {
    if (selectedNoteId !== null) {
      onDeleteNote(selectedNoteId);
    }
    setIsModalOpen(false);
    setSelectedNoteId(null);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNoteId(null);
  };

  return (
    <div className="sliding-note-container">
      <Button
        className="note-toggle-button"
        aria-label="Toggle notes panel"
        onClick={toggleNote}
        variant="primary"
      >
        <div className={`note-icon ${isOpen ? "open" : ''}`}>
          {!isOpen &&
            <FontAwesomeIcon icon={faFileLines} />
          }
          {isOpen &&
            <div className={`note-icon ${isOpen}`}>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </div>
          }
        </div>
      </Button>

      <div className={`note-panel ${isOpen ? "open" : ""}`}>
        {/* メモが保存されていたら<NoteItem />をこの中にタイルっぽく表示、なかったら「保存済みのメモはありませんと表示」 */}
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onDelete={() => handleDeleteClick(note.id)}
            />
          ))
        ) : (
          <p>保存済みのメモはありません</p>
        )}
        <AddNoteForm isOpen={isFormOpen} onToggle={toggleForm} onAdd={onAddNote} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="削除の確認"
        size="small"
      >
        <p>本当にこのノートを削除しますか？</p>
        <div className="modal-actions">
          <Button
            variant="danger"
            size="small"
            onClick={handleConfirmDelete}
            className="confirm-button"
          >
            削除する
          </Button>
          <Button
            variant="secondary"
            size="small"
            onClick={handleCloseModal}
            className="cancel-button"
          >
            キャンセル
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default NotePanel;