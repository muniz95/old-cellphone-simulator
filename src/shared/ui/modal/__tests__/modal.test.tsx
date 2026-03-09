import { act, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Modal from '@/shared/ui/modal';

describe('Modal', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('applies backlight overlay while open', () => {
    const { container } = render(
      <Modal color="#c0b400" backlightLevel={35} isOpen />
    );

    const modalContainer = container.firstElementChild as HTMLElement;
    const styles = window.getComputedStyle(modalContainer);

    expect(styles.display).toBe('flex');
    expect(document.head.textContent).toMatch(
      /linear-gradient\(rgb\(0 0 0 \/ 65%\) 0 0\)/
    );
  });

  it('auto closes after the configured timeout', () => {
    const onAutoClose = vi.fn();

    render(
      <Modal
        color="#c0b400"
        backlightLevel={100}
        isOpen
        onAutoClose={onAutoClose}
        autoCloseMs={600}
      />
    );

    act(() => {
      vi.advanceTimersByTime(599);
    });

    expect(onAutoClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(onAutoClose).toHaveBeenCalledTimes(1);
  });
});
