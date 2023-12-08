const tts = () => {
  if ('speechSynthesis' in window) {
    return window.speechSynthesis;
  } else {
    alert('speech unsupported')
  }
}

export const say = (sentence: string) => {
  tts()?.speak(new SpeechSynthesisUtterance(sentence));
}

const voice = {
  say,
}

export default voice;
