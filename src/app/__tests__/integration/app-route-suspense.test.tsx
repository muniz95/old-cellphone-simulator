import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '@/app/providers/i18n';
import { resetUiStore } from '@/app/state/ui-store';
import {
  resetSettingsStore,
  SETTINGS_STORAGE_KEY,
} from '@/features/settings/state/settings-store';

describe('App route suspense', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.useFakeTimers();

    const storage = globalThis.localStorage as Partial<Storage>;
    if (typeof storage?.removeItem === 'function') {
      storage.removeItem(SETTINGS_STORAGE_KEY);
    }

    resetSettingsStore();
    resetUiStore();
  });

  afterEach(() => {
    vi.doUnmock('@/app/pages/messages');
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('shows startup-style loading fallback while waiting for lazy route chunk', async () => {
    vi.doMock('@/app/pages/messages', async () => {
      await new Promise((resolve) => setTimeout(resolve, 150));

      return {
        default: () => <div>DELAYED_MESSAGES_PAGE</div>,
      };
    });

    const { default: App } = await import('@/app/app');

    render(
      <MemoryRouter initialEntries={['/messages']}>
        <App />
      </MemoryRouter>
    );

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByText('Loading...')).toBeTruthy();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(150);
      await Promise.resolve();
    });

    expect(screen.getByText('DELAYED_MESSAGES_PAGE')).toBeTruthy();
  });
});
