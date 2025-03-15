import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { GlobalContextProvider } from '@/context/global/provider';
import { SettingsContextProvider } from '@/context/settings/provider';
import { ProfileContextProvider } from '@/context/profile/provider';

export const renderWithProvider = (ui: ReactNode) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <GlobalContextProvider>
      <SettingsContextProvider>
        <ProfileContextProvider>{children}</ProfileContextProvider>
      </SettingsContextProvider>
    </GlobalContextProvider>
  );
  return render(ui, { wrapper: Wrapper });
};
