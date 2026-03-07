import { describe, expect, it } from 'vitest';
import { canPlayTone, getTonePlaybackInput } from '@/features/tones/domain/use-cases';

describe('tones domain use-cases', () => {
  it('validates if a tone can be played', () => {
    expect(canPlayTone(undefined)).toBe(false);
    expect(canPlayTone(null)).toBe(false);
    expect(canPlayTone({ name: 'Invalid', composition: '', bpm: 0 })).toBe(
      false
    );
    expect(
      canPlayTone({
        name: 'Valid',
        composition: '2#a1 2f1',
        bpm: 200,
      })
    ).toBe(true);
  });

  it('returns playback input for valid tones only', () => {
    expect(
      getTonePlaybackInput({
        name: 'Valid',
        composition: '2#a1 2f1',
        bpm: 200,
      })
    ).toEqual({
      composition: '2#a1 2f1',
      bpm: 200,
    });

    expect(
      getTonePlaybackInput({
        name: 'Invalid',
        composition: '',
        bpm: 0,
      })
    ).toBeNull();
  });
});
