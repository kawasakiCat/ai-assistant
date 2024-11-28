import './App.css';
// import { ResumeForm } from './ResumeForm';
import React, { useState } from 'react';
import Button from './components/common/Button/Button';
import Navigation from './components/common/Navigation/Navigation';
import ModalExample from './ModalExample';
import InputExample from './InputExample';
// import ChatWindow from './features/chat/components/ChatWindow';


function App() {
  return (
    <div className="App">
      <Button onClick={() => console.log('ボタンを押された')}>
        クリック
      </Button>

      <ModalExample />
      <InputExample />

      <Navigation />
    </div>
  );
}

export default App;
