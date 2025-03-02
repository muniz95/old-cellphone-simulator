import { render, screen, fireEvent } from '@testing-library/react';
import ColorSettings from '@/views/Settings/General/Color';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { openModal, setFourthLevel, setColor } from '@/redux/actions';
import settingsService from '@/services/setting.service';
import vibration from '@/utils/vibration';
import { useTranslation } from 'react-i18next';
import { renderWithProvider } from '../../../../utils';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('@/redux/actions', () => ({
  openModal: jest.fn(),
  setFourthLevel: jest.fn(),
  setColor: jest.fn(),
}));

jest.mock('@/services/setting.service', () => ({
  setColor: jest.fn(),
}));

jest.mock('@/utils/vibration', () => ({
  success: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: (key) => key,
  }),
}));

describe('ColorSettings', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    renderWithProvider(<ColorSettings />);
  });

  it('renders correctly', () => {
    expect(screen.getByText('general.color.default')).toBeTruthy();
  });

  it('displays color options', () => {
    const colorOptions = screen.getAllByRole('button');
    expect(colorOptions).toHaveLength(9);
  });

  it('updates appColor state on color option click', () => {
    const colorOption = screen.getByText('general.color.blue');
    fireEvent.click(colorOption);
    expect(screen.getByRole('button', { name: 'save' })).not.toBeDisabled();
  });

  it('save button is disabled when no color is selected', () => {
    expect(screen.getByRole('button', { name: 'save' })).toBeDisabled();
  });

  it('save button is enabled when a color is selected', () => {
    const colorOption = screen.getByText('general.color.blue');
    fireEvent.click(colorOption);
    expect(screen.getByRole('button', { name: 'save' })).not.toBeDisabled();
  });

  it('clicking save button triggers appropriate actions', () => {
    const colorOption = screen.getByText('general.color.blue');
    fireEvent.click(colorOption);
    const saveButton = screen.getByRole('button', { name: 'save' });
    fireEvent.click(saveButton);

    expect(settingsService.setColor).toHaveBeenCalledWith('#0d48eb');
    expect(store.getActions()).toContainEqual(setColor('#0d48eb'));
    expect(vibration.success).toHaveBeenCalled();
    expect(store.getActions()).toContainEqual(openModal());
  });
});
