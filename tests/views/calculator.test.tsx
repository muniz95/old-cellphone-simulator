/**
 * @jest-environment jsdom
 */

import { fireEvent, screen } from "@testing-library/react";
import Calculator from '../../src/views/Calculator';
import React from 'react';
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { renderWithProviders } from '../testUtils'

it('renders Calculator screen', () => {
  renderWithProviders(
    <BrowserRouter>
      <Calculator />
    </BrowserRouter>
  );
  
  expect(screen.getByText("CC")).toBeInTheDocument()
  expect(screen.getByText("+")).toBeInTheDocument()
  expect(screen.getByText("-")).toBeInTheDocument()
  expect(screen.getByText(/x/i)).toBeInTheDocument()
});
