import useLocalStorage from '@/hooks/use-local-storage';
import { Tone } from '@/interfaces/tone';

export const useTones = () => {
  const [tones, setTones] = useLocalStorage<Tone[]>('tones', []);
  return { tones, setTones };
};
