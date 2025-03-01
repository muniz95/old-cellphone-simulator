import React from 'react';
import Calculator from '../../../../src/views/Calculator';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import reducer from '../../../../src/redux/reducers/index';
import { render } from '@testing-library/react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProvider } from '../../../utils';

describe('Calculator', () => {
  it('renders correctly', () => {
    const { container } = renderWithProvider(<Calculator />);
    expect(container).toBeTruthy();
  });

  it('displays numbers when keys are clicked', () => {
    renderWithProvider(<Calculator />);
    const key1 = screen.getByText('1');
    const key2 = screen.getByText('2');
    const key3 = screen.getByText('3');
    fireEvent.click(key1);
    fireEvent.click(key2);
    fireEvent.click(key3);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.value).toBe('123');
  });

  it('clears the expression when CC is clicked', () => {
    renderWithProvider(<Calculator />);
    const key1 = screen.getByText('1');
    const clearKey = screen.getByText('CC');
    fireEvent.click(key1);
    fireEvent.click(clearKey);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.value).toBe('');
  });

  it('removes the last character when c is clicked', () => {
    renderWithProvider(<Calculator />);
    const key1 = screen.getByText('1');
    const key2 = screen.getByText('2');
    const backKey = screen.getByText('c');
    fireEvent.click(key1);
    fireEvent.click(key2);
    fireEvent.click(backKey);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.value).toBe('1');
  });

  it('evaluates the expression when = is clicked', () => {
    renderWithProvider(<Calculator />);
    const key1 = screen.getByText('1');
    const keyPlus = screen.getByText('+');
    const key2 = screen.getByText('2');
    const equalKey = screen.getByText('=');
    fireEvent.click(key1);
    fireEvent.click(keyPlus);
    fireEvent.click(key2);
    fireEvent.click(equalKey);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.value).toBe('3'); // Assuming the evaluate function is implemented correctly
  });

  it('handles edge cases for evaluation', () => {
    renderWithProvider(<Calculator />);

    // Test division by zero
    const key1 = screen.getByText('1');
    const keyDivide = screen.getByText('/');
    const key0 = screen.getByText('0');
    const equalKey = screen.getByText('=');
    fireEvent.click(key1);
    fireEvent.click(keyDivide);
    fireEvent.click(key0);
    fireEvent.click(equalKey);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.value).toBe(''); // Assuming the evaluate function handles division by zero

    // Test invalid expression
    fireEvent.click(screen.getByText('CC')); // Clear the expression
    fireEvent.click(key1);
    fireEvent.click(keyDivide);
    fireEvent.click(equalKey);
    expect(textarea.value).toBe(''); // Assuming the evaluate function handles invalid expressions

    // Test multiple operators
    fireEvent.click(screen.getByText('CC')); // Clear the expression
    fireEvent.click(key1);
    fireEvent.click(keyDivide);
    fireEvent.click(keyDivide);
    fireEvent.click(key0);
    fireEvent.click(equalKey);
    expect(textarea.value).toBe(''); // Assuming the evaluate function handles multiple operators
  });
});
