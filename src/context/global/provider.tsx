import { FC } from 'react';
import { GlobalContext } from './context';
import { useGlobalState } from './hooks/use-global-state';

interface GlobalStateProviderProps {
  children: React.ReactNode;
}

export const GlobalStateProvider: FC<GlobalStateProviderProps> = ({
  children,
}) => {
  const globalState = useGlobalState();

  return (
    <GlobalContext.Provider value={{ ...globalState }}>
      {children}
    </GlobalContext.Provider>
  );
};
