import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import '@/app/providers/i18n';
import { phoneBookModule } from '@/features/phone-book/module';
import PhoneBookPage from '@/features/phone-book/ui/pages/phone-book-page';
import { resetUiStore, useUiStore } from '@/app/state/ui-store';
import { resetContactsStore } from '@/features/phone-book/state/contacts-store';

const BackPage = () => {
  const navigate = useNavigate();
  return <button onClick={() => navigate(-1)}>BACK</button>;
};

describe('phone-book module integration', () => {
  beforeEach(() => {
    resetUiStore();
    resetContactsStore();
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

  it('keeps second-level index when returning from a third-level page', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/phonebook']}>
        <Routes>
          <Route path="/phonebook" element={<PhoneBookPage />} />
          <Route path="/phonebook/addname" element={<BackPage />} />
        </Routes>
      </MemoryRouter>
    );

    const searchLabel = getByText(/Search|searchTitle/i);
    fireEvent.touchStart(searchLabel, {
      targetTouches: [{ clientX: 120, clientY: 10 }],
    });
    fireEvent.touchMove(searchLabel, {
      targetTouches: [{ clientX: 20, clientY: 10 }],
    });
    fireEvent.touchEnd(searchLabel);

    const serviceNosLabel = getByText(/Service|servicenosTitle/i);
    fireEvent.touchStart(serviceNosLabel, {
      targetTouches: [{ clientX: 120, clientY: 10 }],
    });
    fireEvent.touchMove(serviceNosLabel, {
      targetTouches: [{ clientX: 20, clientY: 10 }],
    });
    fireEvent.touchEnd(serviceNosLabel);

    const addNameLabel = getByText(/Add Name|addnameTitle/i);
    fireEvent.touchStart(addNameLabel, {
      targetTouches: [{ clientX: 10, clientY: 10 }],
    });
    fireEvent.touchEnd(addNameLabel);

    fireEvent.click(getByText('BACK'));

    expect(getByText(/Add Name|addnameTitle/i)).toBeTruthy();
    expect(useUiStore.getState().secondLevel).toBe(3);
  });
});
