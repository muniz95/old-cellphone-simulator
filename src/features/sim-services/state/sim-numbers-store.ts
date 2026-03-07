import { create } from 'zustand';
import { SimNumber } from '@/features/sim-services/domain/sim-number';

interface SimNumbersState {
  simNumbers: SimNumber[];
  hydrated: boolean;
  hydrate: (simNumbers: SimNumber[]) => void;
}

const initialSimNumbersState = {
  simNumbers: [] as SimNumber[],
  hydrated: false,
};

export const useSimNumbersStore = create<SimNumbersState>((set) => ({
  ...initialSimNumbersState,
  hydrate: (simNumbers) => set({ simNumbers, hydrated: true }),
}));

export const resetSimNumbersStore = () => {
  useSimNumbersStore.setState(initialSimNumbersState);
};
