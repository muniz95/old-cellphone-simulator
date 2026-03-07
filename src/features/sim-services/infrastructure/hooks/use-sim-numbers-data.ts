import { useEffect } from 'react';
import useSimNumbers from '@/features/sim-services/infrastructure/persistence/use-sim-numbers';
import { useSimNumbersStore } from '@/features/sim-services/state/sim-numbers-store';

const useSimNumbersData = () => {
  const [storedSimNumbers] = useSimNumbers();
  const simNumbers = useSimNumbersStore((state) => state.simNumbers);
  const hydrated = useSimNumbersStore((state) => state.hydrated);
  const hydrate = useSimNumbersStore((state) => state.hydrate);

  useEffect(() => {
    if (!hydrated) {
      hydrate(storedSimNumbers);
    }
  }, [hydrate, hydrated, storedSimNumbers]);

  return hydrated ? simNumbers : storedSimNumbers;
};

export default useSimNumbersData;
