export const getChatState = () => {
	const savedState = localStorage.getItem("chatState");
	return savedState ? JSON.parse(savedState) : null;
};

export const saveChatState = (state) => {
	localStorage.setItem("chatState", JSON.stringify(state));
};
