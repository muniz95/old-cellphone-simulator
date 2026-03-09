import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '@/app/providers/i18n';
import { resetUiStore } from '@/app/state/ui-store';
import {
  resetSettingsStore,
  SETTINGS_STORAGE_KEY,
} from '@/features/settings/state/settings-store';

describe('App route error boundary integration', () => {
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
    vi.restoreAllMocks();
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('keeps shell visible and shows route fallback when a page crashes', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    vi.doMock('@/app/pages/messages', () => ({
      default: () => {
        throw new Error('route crash');
      },
    }));

    const { default: App } = await import('@/app/app');

    render(
      <MemoryRouter initialEntries={['/messages']}>
        <App />
      </MemoryRouter>
    );

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    await act(async () => {
      await vi.dynamicImportSettled();
      await Promise.resolve();
    });

    expect(screen.getByRole('alert').textContent).toBe(
      'Unexpected route error.'
    );
    expect(screen.getByText('<')).toBeTruthy();
    expect(screen.getByText('O')).toBeTruthy();
  });
});
