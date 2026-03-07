import { useEffect } from 'react';
import { Tone } from '@/features/tones/domain/tone';
import useRingtone from '@/features/tones/infrastructure/audio/use-ringtone';
import useTonesData from '@/features/tones/infrastructure/hooks/use-tones-data';
import { getTonePlaybackInput } from '@/features/tones/domain/use-cases';
import { useUiStore } from '@/app/state/ui-store';

export const useTonesController = () => {
  const tones = useTonesData();
  const { play } = useRingtone();
  const setSecondLevel = useUiStore((state) => state.setSecondLevel);

  useEffect(() => {
    setSecondLevel(1);
  }, [setSecondLevel]);

  const playTone = (tone: Tone) => {
    const input = getTonePlaybackInput(tone);
    if (!input) return;

    play(input.composition, input.bpm);
  };

  return {
    tones,
    playTone,
  };
};
