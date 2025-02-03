import { useState } from 'react';
import './App.css';
import InputContainer from './inputContainer/inputContainer';
import MessageContainer from './messageContainer/messageContainer';

function App() {
	const [messages, setMessages] = useState<string[]>([]);

	const handleSend = (message: string) => {
		setMessages([...messages, message]);
	};

	const handleClear = () => {
		setMessages([]);
	};

	const renderClearChat = () => {
		const dynamicClassName = messages.length == 0 ? 'clearChat' : 'clearChat error';
		return (
			<button
				disabled={messages.length == 0}
				className={dynamicClassName}
				onClick={handleClear}>
				Clear chat
			</button>
		);
	};

	const renderPage = () => {
		return (
			<div className='app'>
				{renderClearChat()}
				<MessageContainer messages={messages} />
				<InputContainer globalSendMessage={handleSend} />
			</div>
		);
	};
	return renderPage();
}

export default App;
