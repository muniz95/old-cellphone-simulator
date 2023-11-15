/**
 * @jest-environment jsdom
 */

import { fireEvent, screen } from "@testing-library/react";
import Home from '../../src/views/Home';
import React from 'react';
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { renderWithProviders } from '../testUtils'

it('renders Home screen', () => {
  renderWithProviders(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  
  expect(screen.getByText(/Phone Book/i)).toBeInTheDocument()
});
