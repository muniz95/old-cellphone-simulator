import { create } from 'zustand';
import { Tone } from '@/features/tones/domain/tone';

interface TonesState {
  tones: Tone[];
  hydrated: boolean;
  hydrate: (tones: Tone[]) => void;
}

const initialTonesState = {
  tones: [] as Tone[],
  hydrated: false,
};

export const useTonesStore = create<TonesState>((set) => ({
  ...initialTonesState,
  hydrate: (tones) => set({ tones, hydrated: true }),
}));

export const resetTonesStore = () => {
  useTonesStore.setState(initialTonesState);
};
