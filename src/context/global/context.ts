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
  backlightLevel: number;
  setBacklightLevel: Dispatch<SetStateAction<number>>;
};

const defaultContext = {
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
  backlightLevel: 80,
  setBacklightLevel: () => {},
};

export const GlobalContext = createContext<GlobalContextType>(defaultContext);
