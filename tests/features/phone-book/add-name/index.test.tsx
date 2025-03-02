import { render, fireEvent } from '@testing-library/react';
import PhoneBookAddName from '../../../../src/features/phone-book/add-name';
import { describe, expect, it } from 'vitest';
import { renderWithProvider } from '../../../utils';
import React from 'react';

describe('PhoneBookAddName Component', () => {
  it('should render the input and button', () => {
    const { getByText, getByLabelText } = renderWithProvider(<PhoneBookAddName />);
    expect(getByLabelText('name')).toBeTruthy();
    expect(getByText('save')).toBeTruthy();
  });

  it('should update the input value on change', () => {
    const { getByLabelText } = renderWithProvider(<PhoneBookAddName />);
    const input = getByLabelText('name');
    fireEvent.change(input, { target: { value: 'John Doe' } });
    expect(input.value).toBe('John Doe');
  });

  it('should call saveContact on button click', () => {
    const { getByText } = renderWithProvider(<PhoneBookAddName />);
    const button = getByText('save');
    fireEvent.click(button);
    // Add your assertions here
  });
});
