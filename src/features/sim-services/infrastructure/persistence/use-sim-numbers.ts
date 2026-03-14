import { SimNumber } from '@/features/sim-services/domain/sim-number';
import useIndexedDb from '@/shared/hooks/use-indexed-db';

const useSimNumbers = () => useIndexedDb<SimNumber[]>('simNumbers', []);

export default useSimNumbers;
