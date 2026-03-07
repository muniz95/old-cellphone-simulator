import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { clockModule } from '@/features/clock/module';
import ClockPage from '@/features/clock/ui/pages/clock-page';

describe('clock module integration', () => {
  it('exposes expected route path', () => {
    const routePaths = clockModule.routes
      .map((route) => route.path)
      .filter((path): path is string => Boolean(path));

    expect(routePaths).toEqual(['/clock']);
  });

  it('renders clock page through module UI', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={['/clock']}>
        <ClockPage />
      </MemoryRouter>
    );

    expect(getByRole('heading')).toBeTruthy();
  });
});
