import { ReactNode } from 'react';
import { GlobalContextProvider } from './global/provider';
import { SettingsContextProvider } from './settings/provider';

const AppContextProvider = ({ children }: { children: ReactNode }) => (
  <GlobalContextProvider>
    <SettingsContextProvider>{children}</SettingsContextProvider>
  </GlobalContextProvider>
);

export default AppContextProvider;
