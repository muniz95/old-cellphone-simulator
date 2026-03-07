import { useEffect } from 'react';
import useLocalStorage from '@/shared/hooks/use-local-storage';
import { Tone } from '@/entities/tone/model/tone';
import useRingtone from '@/features/tones/infrastructure/audio/use-ringtone';
import { getTonePlaybackInput } from '@/features/tones/domain/use-cases';
import { useUiStore } from '@/stores/ui-store';

export const useTonesController = () => {
  const [tones] = useLocalStorage<Tone[]>('tones', []);
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
