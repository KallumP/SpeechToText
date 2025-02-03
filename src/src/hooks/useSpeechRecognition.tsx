import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let recognition: any = null;
if ('webkitSpeechRecognition' in window) {
	recognition = new window.webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.lang = 'en-US';
	recognition.interimResults = true;
}

const useSpeechRecognition = () => {
	const [transcript, setTranscript] = useState('');
	const [listening, setListening] = useState(false);

	useEffect(() => {
		if (!recognition) return;

		recognition.onresult = (event: SpeechRecognitionEvent) => {
			let combinedTranscript = '';
			for (let i = 0; i < event.results.length; i++)
				combinedTranscript += event.results[i][0].transcript;
			setTranscript(combinedTranscript);
		};
	}, []);

	const startListening = () => {
		setTranscript('');
		setListening(true);
		recognition.start();
	};

	const stopListening = () => {
		setListening(false);
		recognition.stop();
	};

	return {
		transcript,
		listening,
		startListening,
		stopListening,
		supported: !!recognition,
	};
};

export default useSpeechRecognition;
