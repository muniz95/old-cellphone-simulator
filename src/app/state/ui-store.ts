import { create } from 'zustand';

interface UiState {
  firstLevel: number;
  secondLevel: number;
  thirdLevel: number;
  fourthLevel: number;
  fifthLevel: number;
  showModal: boolean;
  showStartupScreen: boolean;
  setFirstLevel: (value: number) => void;
  setSecondLevel: (value: number) => void;
  setThirdLevel: (value: number) => void;
  setFourthLevel: (value: number) => void;
  setFifthLevel: (value: number) => void;
  openModal: () => void;
  closeModal: () => void;
  openStartupScreen: () => void;
  closeStartupScreen: () => void;
  resetLevels: () => void;
}

const initialUiState = {
  firstLevel: 0,
  secondLevel: 0,
  thirdLevel: 0,
  fourthLevel: 0,
  fifthLevel: 0,
  showModal: false,
  showStartupScreen: false,
};

export const useUiStore = create<UiState>((set) => ({
  ...initialUiState,
  setFirstLevel: (value) => set({ firstLevel: value }),
  setSecondLevel: (value) => set({ secondLevel: value }),
  setThirdLevel: (value) => set({ thirdLevel: value }),
  setFourthLevel: (value) => set({ fourthLevel: value }),
  setFifthLevel: (value) => set({ fifthLevel: value }),
  openModal: () => set({ showModal: true }),
  closeModal: () => set({ showModal: false }),
  openStartupScreen: () => set({ showStartupScreen: true }),
  closeStartupScreen: () => set({ showStartupScreen: false }),
  resetLevels: () =>
    set({
      secondLevel: 0,
      thirdLevel: 0,
      fourthLevel: 0,
      fifthLevel: 0,
    }),
}));

export const resetUiStore = () => {
  useUiStore.setState(initialUiState);
};
