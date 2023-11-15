/**
 * @jest-environment jsdom
 */

import { fireEvent, screen } from "@testing-library/react";
import PageIndicator from '../../src/components/PageIndicator';
import React from 'react';
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { renderWithProviders } from '../testUtils'
import { setupStore } from "../../src/redux/store";
import { setFirstLevel, setSecondLevel, setThirdLevel } from "../../src/redux/actions";

it('renders PageIndicator component', () => {
  const store = setupStore();
  
  store.dispatch(setFirstLevel(1));
  store.dispatch(setSecondLevel(2));
  store.dispatch(setThirdLevel(3));
  
  const { getByText } = renderWithProviders(<PageIndicator />, { store });
  
  expect(getByText('1-2-3')).toBeInTheDocument()
});
