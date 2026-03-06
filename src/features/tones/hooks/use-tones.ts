import useLocalStorage from '@/shared/hooks/use-local-storage';
import { Tone } from '@/entities/tone/model/tone';

export const useTones = () => {
  const [tones, setTones] = useLocalStorage<Tone[]>('tones', []);
  return { tones, setTones };
};
