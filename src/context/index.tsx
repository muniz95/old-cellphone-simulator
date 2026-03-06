import { ReactNode } from 'react';
import { ProfileContextProvider } from './profile/provider';

const AppContextProvider = ({ children }: { children: ReactNode }) => (
  <ProfileContextProvider>{children}</ProfileContextProvider>
);

export default AppContextProvider;
