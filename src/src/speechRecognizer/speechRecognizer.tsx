import { FC } from 'react';
import './speechRecognizer.css';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import { Modal } from '@mui/material';

interface SpeechRecognizerProps {
	setText: (text: string) => void;
}
const SpeechRecognizer: FC<SpeechRecognizerProps> = ({ setText }) => {
	const { startListening, stopListening, transcript, listening, supported } =
		useSpeechRecognition();

	const handleStart = () => {
		startListening();
	};
	const handlePopupClose = () => {
		handleStop();
	};
	const handleStop = () => {
		setText(transcript);
		stopListening();
	};

	const renderNoSupport = () => {
		// return <></>
		return <button disabled={true}>Not supported</button>;
	};

	const renderListeningPopup = () => {
		return (
			<Modal
				open={listening}
				onClose={handlePopupClose}>
				<div className='popup'>
					<div className='detectedText'>
						<p>{transcript == '' ? 'Recording started. Say what you want to ask' : transcript}</p>
					</div>
					<button
						className='error'
						disabled={!supported || !listening}
						onClick={handleStop}>
						Stop recording
					</button>
				</div>
			</Modal>
		);
	};
	const renderComponent = () => {
		if (!supported) return renderNoSupport();

		return (
			<div>
				<button
					disabled={!supported || listening}
					onClick={handleStart}>
					Record
				</button>

				{renderListeningPopup()}
			</div>
		);
	};
	return renderComponent();
};

export default SpeechRecognizer;
