import './App.css';
import { ResumeForm } from './ResumeForm';
import ModalExample from './ModalExample';
import InputExample from './InputExample';

function App() {

  return (
    <div className="App">
      {/* <h1 className='title-text'>就活<br></br>アシスタント<br></br>アプリ</h1> */}
      <ResumeForm />
      <ModalExample />
      <InputExample />
    </div>
  );
}

export default App;
