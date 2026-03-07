import { fireEvent, render } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import AddNamePage from '@/features/phone-book/ui/pages/add-name-page';
import { resetContactsStore } from '@/features/phone-book/state/contacts-store';

describe('PhoneBookAddName Component', () => {
  beforeEach(() => {
    resetContactsStore();
  });

  it('should render the input and button', () => {
    const { getByText, getByRole } = render(<AddNamePage />);
    expect(getByRole('textbox')).toBeTruthy();
    expect(getByText('save')).toBeTruthy();
  });

  it('should update the input value on change', () => {
    const { getByRole } = render(<AddNamePage />);
    const input = getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'John Doe' } });
    expect(input.value).toBe('John Doe');
  });

  it('should call saveContact on button click', () => {
    const { getByText } = render(<AddNamePage />);
    const button = getByText('save');
    fireEvent.click(button);
    // Add your assertions here
  });
});
