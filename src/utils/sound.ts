const tts = () => {
  if ('speechSynthesis' in window) {
    return window.speechSynthesis;
  } else {
    alert('speech unsupported')
  }
}

const defaultVoice = (sentence: string, speech: SpeechSynthesis) => {
  const utter = new SpeechSynthesisUtterance(sentence);
  utter.voice = speech?.getVoices()[0]!;
  return utter;
}

export const say = (sentence: string) => {
  const speech = tts();
  const utter = defaultVoice(sentence, speech!);
  speech?.speak(utter);
}

const voice = {
  say,
}

export default voice;
