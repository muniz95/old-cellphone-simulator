import { render } from '@testing-library/react';
import { ReactNode } from 'react';

export const renderWithProvider = (ui: ReactNode) => {
  const Wrapper = ({ children }: { children: ReactNode }) => <>{children}</>;
  return render(ui, { wrapper: Wrapper });
};
