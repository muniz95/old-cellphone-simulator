import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PhoneBookAddName from '@/features/phone-book/add-name';

describe('PhoneBookAddName Component', () => {
  it('should render the input and button', () => {
    const { getByText, getByRole } = render(<PhoneBookAddName />);
    expect(getByRole('textbox')).toBeTruthy();
    expect(getByText('save')).toBeTruthy();
  });

  it('should update the input value on change', () => {
    const { getByRole } = render(<PhoneBookAddName />);
    const input = getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'John Doe' } });
    expect(input.value).toBe('John Doe');
  });

  it('should call saveContact on button click', () => {
    const { getByText } = render(<PhoneBookAddName />);
    const button = getByText('save');
    fireEvent.click(button);
    // Add your assertions here
  });
});
