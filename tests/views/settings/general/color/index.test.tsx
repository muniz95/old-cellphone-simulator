import { screen, fireEvent } from '@testing-library/react';
import ColorSettings from '../../../../../src/views/Settings/General/Color';
import { beforeEach, describe, vi, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../../../../src/redux/reducers';
import { renderWithProvider } from '../../../../utils';
import React from 'react';

const store = configureStore({ reducer: rootReducer });

vi.mock('@/redux/actions', () => ({
  openModal: vi.fn(),
  setFourthLevel: vi.fn(),
  setColor: vi.fn(),
}));
vi.mock('@/services/setting.service', () => ({
  setColor: vi.fn(),
}));
vi.mock('@/utils/vibration', () => ({
  success: vi.fn(),
}));
vi.mock('react-i18next', () => ({
  useTranslation: vi.fn().mockReturnValue({
    t: (key) => key,
  }),
}));

describe('ColorSettings', () => {
  beforeEach(() => {
    renderWithProvider(<ColorSettings />);
  });

  it('renders correctly', () => {
    expect(screen.getByText('general.color.default')).toBeDefined();
  });

  it('displays color options', () => {
    const colorOptions = screen.getAllByRole('button');
    expect(colorOptions).toHaveLength(9);
  });

  it('updates appColor state on color option click', () => {
    const colorOption = screen.getByText('general.color.blue');
    fireEvent.click(colorOption);
    expect(screen.getByRole('button', { name: 'save' })).not.have('disabled');
  });

  it('save button is disabled when no color is selected', () => {
    expect(screen.getByRole('button', { name: 'save' })).have('disabled');
  });

  it('save button is enabled when a color is selected', () => {
    const colorOption = screen.getByText('general.color.blue');
    fireEvent.click(colorOption);
    expect(screen.getByRole('button', { name: 'save' })).not.have('disabled');
  });

  it('clicking save button triggers appropriate actions', () => {
    const colorOption = screen.getByText('general.color.blue');
    fireEvent.click(colorOption);
    const saveButton = screen.getByRole('button', { name: 'save' });
    fireEvent.click(saveButton);

    expect(settingsService.setColor).toHaveBeenCalledWith('#0d48eb');
    expect(store.getActions()).toContainEqual({
      type: 'SET_COLOR',
      payload: '#0d48eb',
    });
    expect(vibration.success).toHaveBeenCalled();
    expect(store.getActions()).toContainEqual({ type: 'OPEN_MODAL' });
  });
});
