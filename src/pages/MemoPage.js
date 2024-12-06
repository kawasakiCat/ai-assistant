import React from "react";
import Navigation from "../components/Navigation/Navigation";
import NotePanel from "../components/Note/NotePanel";

const MemoPage = () => {
  return (
    <div>
      {/* <Navigation /> */}
      <h1>メモ</h1>
      <p>
        モーダルウィンドウっぽく全面に表示するならこのページはいらないのかもしれない
      </p>
      <NotePanel />
    </div>
  );
};

export default MemoPage;
