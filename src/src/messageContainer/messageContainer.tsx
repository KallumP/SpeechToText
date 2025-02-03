import { FC } from 'react';
import './messageContainer.css';

interface MessageContainerProps {
	messages: string[];
}
const MessageContainer: FC<MessageContainerProps> = ({ messages }) => {
	const renderComponent = () => {
		return (
			<div className='messageContainer'>
				{messages.map((message, index) => (
					<div
						key={index}
						className='message'>
						{message}
					</div>
				))}
			</div>
		);
	};
	return renderComponent();
};

export default MessageContainer;
