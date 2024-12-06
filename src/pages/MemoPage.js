import React, { useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import NotePanel from "../components/Note/NotePanel";

const MemoPage = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const handleDeleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };
  
  return (
    <div>
      {/* <Navigation /> */}
      <h1>メモ</h1>
      <p>
        モーダルウィンドウっぽく全面に表示するならこのページはいらないのかもしれない
      </p>
      <NotePanel notes={notes} onDeleteNote={handleDeleteNote} />
    </div>
  );
};

export default MemoPage;
