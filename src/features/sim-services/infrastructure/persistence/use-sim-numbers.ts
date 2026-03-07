import { SimNumber } from '@/features/sim-services/domain/sim-number';
import useLocalStorage from '@/shared/hooks/use-local-storage';

const useSimNumbers = () => useLocalStorage<SimNumber[]>('simNumbers', []);

export default useSimNumbers;
