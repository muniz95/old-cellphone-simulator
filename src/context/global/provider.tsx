import { FC } from 'react';
import { GlobalContext } from './context';
import { useGlobalState } from './hooks/use-global-state';

interface GlobalContextProviderProps {
  children: React.ReactNode;
}

export const GlobalContextProvider: FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const globalState = useGlobalState();

  return (
    <GlobalContext.Provider value={{ ...globalState }}>
      {children}
    </GlobalContext.Provider>
  );
};
