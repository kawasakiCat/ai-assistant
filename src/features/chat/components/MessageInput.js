import { useState } from "react";

const MessageInput = ({ onSubmit }) => {
	const [input, setInput] = useState('');
  
	const handleSubmit = (e) => {
	  e.preventDefault();
	  onSubmit(input);
	  setInput('');
	};
  
	return (
	  <form onSubmit={handleSubmit}>
		<input 
		  type="text" 
		  value={input} 
		  onChange={(e) => setInput(e.target.value)} 
		  placeholder="メッセージを入力..." 
		/>
		<button type="submit">送信</button>
	  </form>
	);
  };
  
  export default MessageInput;
  