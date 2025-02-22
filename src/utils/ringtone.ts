// window.AudioContext = window.AudioContext || (window as any).webkitAudioContext;
class Ringtone {
  private audioContext: AudioContext;

  constructor() {
    this.audioContext = new AudioContext();
  }

  public stop() {
    if (!this.audioContext) return;
    this.audioContext.close(); // interrupt the playback, if any
  }

  public clamp(x = 0, a: number, b: number) {
    return x < a && (x = a), x > b ? b : x; // clamping function (a<=x<=b)
  }

  public play(notes: string, bpm: number) {
    let g, startTime: number;
    const oscillator = this.audioContext.createOscillator();
    oscillator
      .connect((g = this.audioContext.createGain()))
      .connect(this.audioContext.destination);
    oscillator.type = 'sine';
    oscillator.start();

    startTime = 0; // current time counter, in seconds
    const setAudioParamValue = (audioParam: AudioParam, value: number) => {
      audioParam.setValueAtTime(value, startTime); // setValueAtTime shorter alias
    };
    for (const command of notes.matchAll(/(\d*)?(\.?)(#?)([a-g-])(\d*)/g)) {
      const asciiNote = command[4].charCodeAt(0);
      const calculatedNote =
        0 |
        ((((asciiNote & 7) * 1.6 + 8) % 12) +
          +!!command[3] +
          12 * this.clamp(Number(command[5]), 1, 3));
      const clampedValue = this.clamp(Number(command[1]) || 4, 1, 64);
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
  }
}

export default Ringtone;
