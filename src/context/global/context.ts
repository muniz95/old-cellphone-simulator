import { createContext, Dispatch, SetStateAction } from 'react';

export type GlobalContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
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
};

const defaultContext = {
  isDarkMode: false,
  toggleDarkMode: () => {},
  firstLevel: 1,
  setFirstLevel: () => {},
  secondLevel: 0,
  setSecondLevel: () => {},
  thirdLevel: 0,
  setThirdLevel: () => {},
  fourthLevel: 0,
  setFourthLevel: () => {},
  fifthLevel: 0,
  setFifthLevel: () => {},
};

export const GlobalContext = createContext<GlobalContextType | null>(
  defaultContext
);
