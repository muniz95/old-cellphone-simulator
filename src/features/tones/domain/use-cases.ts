import { Tone } from '@/entities/tone/model/tone';

export const canPlayTone = (tone: Tone | null | undefined) => {
  if (!tone) return false;
  return Boolean(tone.composition) && tone.bpm > 0;
};

export const getTonePlaybackInput = (tone: Tone | null | undefined) => {
  if (!tone || !canPlayTone(tone)) return null;

  return {
    composition: tone.composition,
    bpm: tone.bpm,
  };
};
