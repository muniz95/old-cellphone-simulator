import { useEffect } from 'react';
import useTones from '@/features/tones/infrastructure/persistence/use-tones';
import { useTonesStore } from '@/features/tones/state/tones-store';

const useTonesData = () => {
  const [storedTones] = useTones();
  const tones = useTonesStore((state) => state.tones);
  const hydrated = useTonesStore((state) => state.hydrated);
  const hydrate = useTonesStore((state) => state.hydrate);

  useEffect(() => {
    if (!hydrated) {
      hydrate(storedTones);
    }
  }, [hydrate, hydrated, storedTones]);

  return hydrated ? tones : storedTones;
};

export default useTonesData;
