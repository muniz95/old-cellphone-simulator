import { Tone } from '@/features/tones/domain/tone';
import useLocalStorage from '@/shared/hooks/use-local-storage';

const useTones = () => useLocalStorage<Tone[]>('tones', []);

export default useTones;
