import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import PwaBanner from '@/shared/ui/pwa-banner';

const hookMock = vi.hoisted(() => ({
  canInstall: false,
  updateAvailable: false,
  offlineReady: false,
  install: vi.fn().mockResolvedValue(undefined),
  applyUpdate: vi.fn(),
}));

vi.mock('@/app/hooks/use-pwa', () => ({
  usePwa: () => ({
    canInstall: hookMock.canInstall,
    updateAvailable: hookMock.updateAvailable,
    offlineReady: hookMock.offlineReady,
    install: hookMock.install,
    applyUpdate: hookMock.applyUpdate,
  }),
}));

describe('PwaBanner', () => {
  beforeEach(() => {
    hookMock.canInstall = false;
    hookMock.updateAvailable = false;
    hookMock.install.mockClear();
    hookMock.applyUpdate.mockClear();
  });

  it('does not render when no install or update action is available', () => {
    const { container } = render(<PwaBanner />);

    expect(container.textContent).toBe('');
  });

  it('renders install action and triggers install flow', () => {
    hookMock.canInstall = true;
    const { getByRole } = render(<PwaBanner />);
    const button = getByRole('button', { name: /Install/i });

    fireEvent.click(button);

    expect(hookMock.install).toHaveBeenCalledTimes(1);
  });

  it('renders update action and applies update', () => {
    hookMock.updateAvailable = true;
    const { getByRole } = render(<PwaBanner />);
    const button = getByRole('button', { name: /Update/i });

    fireEvent.click(button);

    expect(hookMock.applyUpdate).toHaveBeenCalledTimes(1);
  });
});
