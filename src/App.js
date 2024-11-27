import './App.css';
// import { ResumeForm } from './ResumeForm';
import React from 'react';
import Button from './components/common/Button/Button';
import Input from './components/common/Input/Input';
import ModalExample from './features/chat/components/ModalExample';
import Navigation from './components/common/Navigation/Navigation';
import ChatWindow from './features/chat/components/ChatWindow';

function App() {

  return (
    <div className="App">
      <Button onClick={() => console.log('ボタンを押された')}>
        クリック
      </Button>

      <ModalExample />
      
      <Navigation />
    </div>
  );
}

export default App;
