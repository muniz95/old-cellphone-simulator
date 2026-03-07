import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@/app/providers/i18n';
import { phoneBookModule } from '@/features/phone-book/module';
import PhoneBookPage from '@/features/phone-book/ui/pages/phone-book-page';
import { resetUiStore } from '@/app/state/ui-store';

describe('phone-book module integration', () => {
  beforeEach(() => {
    resetUiStore();
  });

  it('exposes all expected routes', () => {
    const routePaths = phoneBookModule.routes
      .map((route) => route.path)
      .filter((path): path is string => Boolean(path));

    expect(routePaths).toEqual([
      '/phonebook/addname',
      '/phonebook/edit',
      '/phonebook/erase',
      '/phonebook/search',
      '/phonebook/servicenos',
      '/phonebook',
    ]);
  });

  it('navigates from phone-book menu on tap', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/phonebook']}>
        <Routes>
          <Route path="/phonebook" element={<PhoneBookPage />} />
          <Route path="/phonebook/search" element={<div>SEARCH</div>} />
        </Routes>
      </MemoryRouter>
    );

    const label = getByText(/Search|searchTitle/i);
    fireEvent.touchStart(label, {
      targetTouches: [{ clientX: 10, clientY: 10 }],
    });
    fireEvent.touchEnd(label);

    expect(getByText('SEARCH')).toBeTruthy();
  });
});
