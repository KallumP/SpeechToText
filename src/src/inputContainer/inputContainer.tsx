import { FC, useState } from 'react';
import './inputContainer.css';
import SpeechRecognizer from '../speechRecognizer/speechRecognizer';

interface InputContainerProps {
	globalSendMessage: (message: string) => void;
}

const InputContainer: FC<InputContainerProps> = ({ globalSendMessage }) => {
	const [typedMessage, setTypedMessage] = useState<string>('');

	const handleMessageSend = (message: string) => {
		globalSendMessage(message);
		setTypedMessage('');
	};

	const renderComponent = () => {
		return (
			<div className='inputContainer'>
				<SpeechRecognizer setText={setTypedMessage}/>
				<input
					type='text'
					value={typedMessage}
					onChange={(e) => {
						setTypedMessage(e.target.value);
					}}
					onKeyDown={(e) => {
						if (e.key === 'Enter') handleMessageSend(typedMessage);
					}}
				/>
				<button onClick={() => handleMessageSend(typedMessage)}>
					Submit
				</button>
			</div>
		);
	};
	return renderComponent();
};

export default InputContainer;
