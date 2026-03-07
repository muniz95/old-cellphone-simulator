const clamp = (value: number, min: number, max: number) => {
  return value < min ? min : value > max ? max : value;
};

const getAudioContextConstructor = () => {
  return window.AudioContext || window.webkitAudioContext;
};

export interface RingtonePlayer {
  dispose: () => void;
  play: (notes: string, bpm: number) => void;
  stop: () => void;
}

export const createRingtonePlayer = (): RingtonePlayer => {
  let audioContext: AudioContext | null = null;

  const createContext = () => {
    const AudioContextConstructor = getAudioContextConstructor();
    if (!AudioContextConstructor) return null;
    return new AudioContextConstructor();
  };

  const ensureContext = () => {
    if (!audioContext) {
      audioContext = createContext();
    }

    return audioContext;
  };

  const closeContext = () => {
    if (!audioContext) return;
    void audioContext.close();
    audioContext = null;
  };

  const stop = () => {
    closeContext();
    audioContext = createContext();
  };

  const play = (notes: string, bpm: number) => {
    const context = ensureContext();
    if (!context) return;

    let gainNode: GainNode;
    let startTime = 0;

    const oscillator = context.createOscillator();
    oscillator
      .connect((gainNode = context.createGain()))
      .connect(context.destination);
    oscillator.type = 'sine';
    oscillator.start();

    const setAudioParamValue = (audioParam: AudioParam, value: number) => {
      audioParam.setValueAtTime(value, startTime);
    };

    for (const command of notes.matchAll(/(\d*)?(\.?)(#?)([a-g-])(\d*)/g)) {
      const asciiNote = command[4].charCodeAt(0);
      const calculatedNote =
        0 |
        ((((asciiNote & 7) * 1.6 + 8) % 12) +
          +!!command[3] +
          12 * clamp(Number(command[5]), 1, 3));
      const clampedValue = clamp(Number(command[1]) || 4, 1, 64);
      const duration = (24 / bpm / clampedValue) * (1 + +!!command[2] / 2);

      setAudioParamValue(
        oscillator.frequency,
        261.63 * 2 ** (calculatedNote / 12)
      );
      setAudioParamValue(gainNode.gain, (~asciiNote & 8) / 8);
      startTime += duration * 7;
      setAudioParamValue(gainNode.gain, 0);
      startTime += duration * 3;
    }
  };

  return {
    play,
    stop,
    dispose: closeContext,
  };
};
