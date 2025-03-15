import { ReactNode } from 'react';
import { GlobalContextProvider } from './global/provider';
import { SettingsContextProvider } from './settings/provider';
import { ProfileContextProvider } from './profile/provider';

const AppContextProvider = ({ children }: { children: ReactNode }) => (
  <GlobalContextProvider>
    <SettingsContextProvider>
      <ProfileContextProvider>{children}</ProfileContextProvider>
    </SettingsContextProvider>
  </GlobalContextProvider>
);

export default AppContextProvider;
