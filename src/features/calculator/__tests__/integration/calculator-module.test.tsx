import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { calculatorModule } from '@/features/calculator/module';
import CalculatorPage from '@/features/calculator/ui/pages/calculator-page';

describe('calculator module integration', () => {
  it('exposes expected route path', () => {
    const routePaths = calculatorModule.routes
      .map((route) => route.path)
      .filter((path): path is string => Boolean(path));

    expect(routePaths).toEqual(['/calculator']);
  });

  it('renders calculator page through module UI', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={['/calculator']}>
        <CalculatorPage />
      </MemoryRouter>
    );

    expect(getByRole('textbox')).toBeTruthy();
  });
});
