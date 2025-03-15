import { createContext, Dispatch, SetStateAction } from 'react';

export type GlobalContextType = {
  firstLevel: number;
  setFirstLevel: Dispatch<SetStateAction<number>>;
  secondLevel: number;
  setSecondLevel: Dispatch<SetStateAction<number>>;
  thirdLevel: number;
  setThirdLevel: Dispatch<SetStateAction<number>>;
  fourthLevel: number;
  setFourthLevel: Dispatch<SetStateAction<number>>;
  fifthLevel: number;
  setFifthLevel: Dispatch<SetStateAction<number>>;
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  showStartupScreen: boolean;
  openStartupScreen: () => void;
  closeStartupScreen: () => void;
};

export const defaultContext: GlobalContextType = {
  firstLevel: 0,
  setFirstLevel: () => {},
  secondLevel: 0,
  setSecondLevel: () => {},
  thirdLevel: 0,
  setThirdLevel: () => {},
  fourthLevel: 0,
  setFourthLevel: () => {},
  fifthLevel: 0,
  setFifthLevel: () => {},
  showModal: false,
  openModal: () => {},
  closeModal: () => {},
  showStartupScreen: false,
  openStartupScreen: () => {},
  closeStartupScreen: () => {},
};

export const GlobalContext = createContext<GlobalContextType>(defaultContext);
