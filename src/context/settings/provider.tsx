import { FC } from 'react';
import { SettingsContext } from './context';
import { useSettingsState } from './hooks/use-settings-state';

export const SettingsContextProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const settingsState = useSettingsState();

  return (
    <SettingsContext.Provider value={{ ...settingsState }}>
      {children}
    </SettingsContext.Provider>
  );
};
