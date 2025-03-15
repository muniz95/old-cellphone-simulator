import { FC } from 'react';
import { GlobalContext } from './context';
import { useGlobalState } from './hooks/use-global-state';

export const GlobalContextProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const globalState = useGlobalState();

  return (
    <GlobalContext.Provider value={{ ...globalState }}>
      {children}
    </GlobalContext.Provider>
  );
};
