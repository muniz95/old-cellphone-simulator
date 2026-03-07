import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { resetUiStore, useUiStore } from '@/app/state/ui-store';
import { useBottomBarNavigation } from '@/shared/ui/bottom-bar/hooks/use-bottom-bar-navigation';

const mocks = vi.hoisted(() => ({
  navigate: vi.fn(),
}));

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();

  return {
    ...actual,
    useNavigate: () => mocks.navigate,
  };
});

describe('useBottomBarNavigation', () => {
  beforeEach(() => {
    resetUiStore();
    mocks.navigate.mockReset();
  });

  it('resets indicator levels and navigates home when goHome is called', () => {
    useUiStore.setState({
      firstLevel: 6,
      secondLevel: 2,
      thirdLevel: 2,
      fourthLevel: 2,
      fifthLevel: 2,
    });

    const { result } = renderHook(() => useBottomBarNavigation());

    act(() => {
      result.current.goHome();
    });

    expect(mocks.navigate).toHaveBeenCalledWith('/', { replace: true });
    expect(useUiStore.getState().firstLevel).toBe(1);
    expect(useUiStore.getState().secondLevel).toBe(0);
    expect(useUiStore.getState().thirdLevel).toBe(0);
    expect(useUiStore.getState().fourthLevel).toBe(0);
    expect(useUiStore.getState().fifthLevel).toBe(0);
  });
});
