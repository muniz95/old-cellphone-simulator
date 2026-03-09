import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import RouteErrorBoundary from '@/app/ui/route-error-boundary';

interface CrashRouteProps {
  shouldCrash: boolean;
}

const CrashRoute = ({ shouldCrash }: CrashRouteProps) => {
  if (shouldCrash) {
    throw new Error('Route crashed');
  }

  return <div>ROUTE_OK</div>;
};

describe('RouteErrorBoundary', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders routed content when there is no error', () => {
    render(
      <RouteErrorBoundary resetKey="/">
        <CrashRoute shouldCrash={false} />
      </RouteErrorBoundary>
    );

    expect(screen.getByText('ROUTE_OK')).toBeTruthy();
  });

  it('shows fallback when a route throws', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <RouteErrorBoundary resetKey="/">
        <CrashRoute shouldCrash />
      </RouteErrorBoundary>
    );

    expect(screen.getByRole('alert').textContent).toBe(
      'Unexpected route error.'
    );
  });

  it('resets after route path changes', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const { rerender } = render(
      <RouteErrorBoundary resetKey="/messages">
        <CrashRoute shouldCrash />
      </RouteErrorBoundary>
    );

    expect(screen.getByRole('alert').textContent).toBe(
      'Unexpected route error.'
    );

    rerender(
      <RouteErrorBoundary resetKey="/chat">
        <CrashRoute shouldCrash={false} />
      </RouteErrorBoundary>
    );

    expect(screen.getByText('ROUTE_OK')).toBeTruthy();
  });
});
