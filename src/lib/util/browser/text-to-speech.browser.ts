export const utterance = new SpeechSynthesisUtterance();

export function browserPlayTextToSpeech(
	text: string,
	speed?: number,
	actionAfterSpeech?: () => void
): void {
	if (!window.speechSynthesis) {
		return;
	}
	utterance.addEventListener('end', () => {
		if (actionAfterSpeech) {
			actionAfterSpeech();
		}
	});
	utterance.text = text;
	utterance.rate = speed || 1;
	speechSynthesis.speak(utterance);
}

export function browserStopTextToSpeech(): void {
	if (!window.speechSynthesis) {
		return;
	}
	speechSynthesis.pause();
}

export function browserResumeTextToSpeech(): void {
	if (!window.speechSynthesis) {
		return;
	}
	speechSynthesis.resume();
}

export function browserCancelTextToSpeech(): void {
	if (!window.speechSynthesis) {
		return;
	}
	speechSynthesis.cancel();
}
