const resolveSpeech = () => {
  if (typeof window === 'undefined') return null;
  if (!('speechSynthesis' in window)) return null;

  return window.speechSynthesis;
};

const selectVoice = (speech: SpeechSynthesis) => {
  const voices = speech.getVoices();
  if (voices.length === 0) return null;

  return (
    voices.find((voice) => voice.default) ??
    voices.find((voice) => voice.localService) ??
    voices[0] ??
    null
  );
};

const speakNow = (
  speech: SpeechSynthesis,
  utterance: SpeechSynthesisUtterance
) => {
  speech.cancel();
  speech.resume();
  speech.speak(utterance);
};

export const say = (sentence: string) => {
  if (!sentence.trim()) return;

  const speech = resolveSpeech();
  if (!speech) return;

  const utterance = new SpeechSynthesisUtterance(sentence);
  const initialVoice = selectVoice(speech);

  if (initialVoice) {
    utterance.voice = initialVoice;
    speakNow(speech, utterance);
    return;
  }

  let spoken = false;
  const speakOnce = () => {
    if (spoken) return;
    spoken = true;

    const loadedVoice = selectVoice(speech);
    if (loadedVoice) {
      utterance.voice = loadedVoice;
    }

    speakNow(speech, utterance);
  };

  const fallbackTimeout = setTimeout(speakOnce, 300);
  const onVoicesChanged = () => {
    clearTimeout(fallbackTimeout);
    speakOnce();
  };

  speech.addEventListener('voiceschanged', onVoicesChanged, { once: true });
};
