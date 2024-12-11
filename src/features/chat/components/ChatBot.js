// // ChatBot.js
// import { useChatState } from "../../../hooks/useChatState";
// import { scenarios } from "../config/ChatScenarioConfig";

// function ChatBot() {
// 	const [chatState, setChatState] = useChatState();
  
// 	const handleUserInput = (option) => {
// 	  const nextScenario = scenarios.find((s) => s.id === option.next);
// 	  setChatState((prevState) => ({
// 		...prevState,
// 		currentScenario: nextScenario.id,
// 		history: [...prevState.history, { ...nextScenario }],
// 	  }));
// 	};
  
// 	const currentScenario = scenarios.find(
// 	  (s) => s.id === chatState.currentScenario
// 	);
  
// 	return (
// 	  <div>
// 		<ChatHistory history={chatState.history} />
// 		<ChatScenario
// 		  scenario={currentScenario}
// 		  onOptionSelected={handleUserInput}
// 		/>
// 	  </div>
// 	);
//   }
  