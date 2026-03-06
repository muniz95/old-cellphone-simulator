import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { ProfileContextProvider } from '@/context/profile/provider';

export const renderWithProvider = (ui: ReactNode) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <ProfileContextProvider>{children}</ProfileContextProvider>
  );
  return render(ui, { wrapper: Wrapper });
};
