import React, { useState } from "react";
// import Navigation from "../components/Navigation/Navigation";
import NotePanel from "../components/Note/NotePanel";

const MemoPage = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const handleAddNote = (text) => {
    const newNote = { id: Date.now(), text };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };
  
  const handleEditNote = (id, updatedText) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, text: updatedText } : note
  );
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <div>
      {/* <Navigation /> */}
      <h1>メモ</h1>
      <p>
        モーダルウィンドウっぽく全面に表示するならこのページはいらないのかもしれない
      </p>
      <NotePanel notes={notes} onAddNote={handleAddNote} onDeleteNote={handleDeleteNote} onUpdateNotes={handleEditNote} />
    </div>
  );
};

export default MemoPage;
