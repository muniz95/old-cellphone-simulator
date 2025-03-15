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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [firstLevel, setFirstLevel] = useState(1);
  const [secondLevel, setSecondLevel] = useState(0);
  const [thirdLevel, setThirdLevel] = useState(0);
  const [fourthLevel, setFourthLevel] = useState(0);
  const [fifthLevel, setFifthLevel] = useState(0);

  const toggleDarkMode = () => {
    setIsDarkMode((state) => !state);
  };

  return (
    <GlobalContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
