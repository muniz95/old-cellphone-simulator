import { ReactElement } from 'react';
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { resetUiStore, useUiStore } from '@/app/state/ui-store';
import { resetSettingsStore } from '@/features/settings/state/settings-store';
import { getPathDepth, useApp } from '@/app/hooks/use-app';

const mocks = vi.hoisted(() => ({
  navigate: vi.fn(),
  pathname: '/',
  routing: null as ReactElement | null,
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();

  return {
    ...actual,
    useNavigate: () => mocks.navigate,
    useLocation: () => ({ pathname: mocks.pathname }),
    useRoutes: () => mocks.routing,
  };
});

describe('useApp', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    resetUiStore();
    resetSettingsStore();
    mocks.navigate.mockReset();
    mocks.pathname = '/';
    mocks.routing = null;
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('computes path depth from pathname', () => {
    expect(getPathDepth('/')).toBe(0);
    expect(getPathDepth('/settings')).toBe(1);
    expect(getPathDepth('/settings/general/language')).toBe(3);
  });

  it('shows levels only up to current route depth', () => {
    useUiStore.setState({
      firstLevel: 6,
      secondLevel: 2,
      thirdLevel: 2,
      fourthLevel: 2,
      fifthLevel: 2,
    });

    mocks.pathname = '/settings/general/language';
    const { result } = renderHook(() => useApp());

    expect(result.current.indicatorLevels).toEqual({
      firstLevel: 6,
      secondLevel: 2,
      thirdLevel: 2,
      fourthLevel: 2,
      fifthLevel: 0,
    });
  });

  it('hides third and deeper levels when route depth is second level', () => {
    useUiStore.setState({
      firstLevel: 6,
      secondLevel: 2,
      thirdLevel: 2,
      fourthLevel: 2,
      fifthLevel: 2,
    });

    mocks.pathname = '/settings';
    const { result } = renderHook(() => useApp());

    expect(result.current.indicatorLevels).toEqual({
      firstLevel: 6,
      secondLevel: 2,
      thirdLevel: 0,
      fourthLevel: 0,
      fifthLevel: 0,
    });
  });

  it('disables startup screen after timeout', () => {
    const { result } = renderHook(() => useApp());

    expect(result.current.firstRender).toBe(true);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.firstRender).toBe(false);
  });

  it('closes modal and navigates home on modal auto close', () => {
    useUiStore.getState().openModal();
    const { result } = renderHook(() => useApp());

    act(() => {
      result.current.handleModalAutoClose();
    });

    expect(mocks.navigate).toHaveBeenCalledWith('/');
    expect(useUiStore.getState().showModal).toBe(false);
  });
});
