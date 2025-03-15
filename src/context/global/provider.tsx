import { Dispatch, FC, SetStateAction, useState } from 'react';
import { GlobalContext } from './context';

interface GlobalStateProviderProps {
  children: React.ReactNode;
}

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

export const GlobalStateProvider: FC<GlobalStateProviderProps> = ({
  children,
}) => {
  const [firstLevel, setFirstLevel] = useState(1);
  const [secondLevel, setSecondLevel] = useState(0);
  const [thirdLevel, setThirdLevel] = useState(0);
  const [fourthLevel, setFourthLevel] = useState(0);
  const [fifthLevel, setFifthLevel] = useState(0);
  const [backlightLevel, setBacklightLevel] = useState(80);

  return (
    <GlobalContext.Provider
      value={{
        firstLevel,
        setFirstLevel,
        secondLevel,
        setSecondLevel,
        thirdLevel,
        setThirdLevel,
        fourthLevel,
        setFourthLevel,
        fifthLevel,
        setFifthLevel,
        backlightLevel,
        setBacklightLevel,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
