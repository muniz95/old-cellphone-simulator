import { FC } from 'react';
import { SettingsContext } from './context';
import { useSettingsState } from './hooks/use-settings-state';

interface GlobalContextProviderProps {
  children: React.ReactNode;
}

export const SettingsContextProvider: FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const settingsState = useSettingsState();

  return (
    <SettingsContext.Provider value={{ ...settingsState }}>
      {children}
    </SettingsContext.Provider>
  );
};
