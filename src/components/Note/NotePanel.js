// NotePanel.js
import React, { useState } from 'react';
import Button from '../common/Button/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, } from "@fortawesome/free-solid-svg-icons";
import "./Note.css";
import NoteItem from './NoteItem';
import AddNoteForm from './AddNoteForm';

const NotePanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const toggleNote = () => setIsOpen(!isOpen);

  const toggleForm = () => setIsFormOpen(!isFormOpen);

  const addNote = (newNote) => {
    const updateNotes = [...notes, { id: Date.now(), text: newNote }];
    setNotes(updateNotes);
    localStorage.setItem("notes", JSON.stringify(updateNotes));
    setIsFormOpen(false);
  };

  const deleteNote = (id) => {
    // 削除対象のidと一致しないノートだけ残す
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <div className="sliding-note-container">
      <Button
        className="note-toggle-button"
        aria-label="Toggle notes panel"
        onClick={toggleNote}
        variant="primary"
      >
        <div className={`note-icon ${isOpen ? 'open' : ''}`}>
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

      <div className={`note-panel ${isOpen ? 'open' : ''}`}>
        <AddNoteForm isOpen={isFormOpen} onToggle={toggleForm} onAdd={addNote} />
        {/* メモが保存されていたら<NoteItem />をこの中にタイルっぽく表示、なかったら「保存済みのメモはありませんと表示」 */}
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onDelete={() => deleteNote(note.id)}
            />
          ))
        ) : (
          <p>保存済みのメモはありません</p>
        )}
      </div>
    </div>
  );
};

export default NotePanel;