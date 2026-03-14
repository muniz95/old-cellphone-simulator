import { Tone } from '@/features/tones/domain/tone';
import useIndexedDb from '@/shared/hooks/use-indexed-db';

const useTones = () => useIndexedDb<Tone[]>('tones', []);

export default useTones;
