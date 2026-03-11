const clamp = (value: number, min: number, max: number) => {
  return value < min ? min : value > max ? max : value;
};

const getAudioContextConstructor = () => {
  return window.AudioContext || window.webkitAudioContext;
};

export interface RingtonePlayer {
  dispose: () => void;
  isPlaying: () => boolean;
  play: (notes: string, bpm: number) => void;
  stop: () => void;
}

interface CreateRingtonePlayerOptions {
  onPlaybackStateChange?: (isPlaying: boolean) => void;
}

export const createRingtonePlayer = (
  options: CreateRingtonePlayerOptions = {}
): RingtonePlayer => {
  let audioContext: AudioContext | null = null;
  let activeOscillator: OscillatorNode | null = null;
  let playbackToken = 0;
  let currentlyPlaying = false;

  const setPlaying = (isPlaying: boolean) => {
    if (currentlyPlaying === isPlaying) return;
    currentlyPlaying = isPlaying;
    options.onPlaybackStateChange?.(isPlaying);
  };

  const clearActiveOscillator = () => {
    if (!activeOscillator) return;
    activeOscillator.onended = null;

    try {
      activeOscillator.stop();
    } catch {
      // Oscillator was already stopped.
    }

    activeOscillator.disconnect();
    activeOscillator = null;
  };

  const cancelPlayback = (notify: boolean) => {
    playbackToken += 1;
    clearActiveOscillator();
    if (notify) {
      setPlaying(false);
    }
  };

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
    cancelPlayback(true);
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
    if (bpm <= 0) return;

    const commands = [...notes.matchAll(/(\d*)?(\.?)(#?)([a-g-])(\d*)/g)];
    if (!commands.length) return;

    cancelPlayback(false);

    if (context.state === 'suspended') {
      void context.resume();
    }

    const playbackId = playbackToken;
    const startTime = context.currentTime;
    let cursorTime = startTime;

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    oscillator.connect(gainNode).connect(context.destination);
    oscillator.type = 'sine';
    activeOscillator = oscillator;
    oscillator.onended = () => {
      if (playbackToken !== playbackId || activeOscillator !== oscillator)
        return;
      activeOscillator = null;
      setPlaying(false);
    };
    oscillator.start(startTime);
    setPlaying(true);

    for (const command of commands) {
      const asciiNote = command[4].charCodeAt(0);
      const calculatedNote =
        0 |
        ((((asciiNote & 7) * 1.6 + 8) % 12) +
          +!!command[3] +
          12 * clamp(Number(command[5]), 1, 3));
      const clampedValue = clamp(Number(command[1]) || 4, 1, 64);
      const duration = (24 / bpm / clampedValue) * (1 + +!!command[2] / 2);

      oscillator.frequency.setValueAtTime(
        261.63 * 2 ** (calculatedNote / 12),
        cursorTime
      );
      gainNode.gain.setValueAtTime((~asciiNote & 8) / 8, cursorTime);
      cursorTime += duration * 7;
      gainNode.gain.setValueAtTime(0, cursorTime);
      cursorTime += duration * 3;
    }

    oscillator.stop(cursorTime);
  };

  return {
    isPlaying: () => currentlyPlaying,
    play,
    stop,
    dispose: closeContext,
  };
};
