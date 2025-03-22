import { useEffect, useRef } from 'react';

const useRingtone = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const AudioContextConstructor =
      window.AudioContext || window.webkitAudioContext;
    if (AudioContextConstructor) {
      audioContextRef.current = new AudioContextConstructor();
    }
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, []);

  const stop = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;

      const AudioContextConstructor =
        window.AudioContext || window.webkitAudioContext;
      if (AudioContextConstructor) {
        audioContextRef.current = new AudioContextConstructor();
      }
    }
  };

  const clamp = (x = 0, a: number, b: number) => {
    return x < a ? a : x > b ? b : x;
  };

  const play = (notes: string, bpm: number) => {
    if (!audioContextRef.current) return;

    let g: GainNode;
    let startTime: number;
    const oscillator = audioContextRef.current.createOscillator();
    oscillator
      .connect((g = audioContextRef.current.createGain()))
      .connect(audioContextRef.current.destination);
    oscillator.type = 'sine';
    oscillator.start();

    startTime = 0;
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
      const d = (24 / bpm / clampedValue) * (1 + +!!command[2] / 2);
      setAudioParamValue(
        oscillator.frequency,
        261.63 * 2 ** (calculatedNote / 12)
      );
      setAudioParamValue(g.gain, (~asciiNote & 8) / 8);
      startTime = startTime + d * 7;
      setAudioParamValue(g.gain, 0);
      startTime = startTime + d * 3;
    }
  };

  return { play, stop };
};

export default useRingtone;
