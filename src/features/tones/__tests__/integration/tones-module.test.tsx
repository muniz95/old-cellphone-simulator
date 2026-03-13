import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Tone } from '@/features/tones/domain/tone';
import { tonesModule } from '@/features/tones/module';
import TonesPage from '@/features/tones/ui/pages/tones-page';
import { resetUiStore, useUiStore } from '@/app/state/ui-store';
import { resetTonesStore } from '@/features/tones/state/tones-store';

const mocks = vi.hoisted(() => ({
  isPlaying: false,
  useTonesData: vi.fn(),
  play: vi.fn(),
  stop: vi.fn(),
}));

vi.mock('@/features/tones/infrastructure/hooks/use-tones-data', () => ({
  default: mocks.useTonesData,
}));

vi.mock('@/shared/hooks/use-ringtone', () => ({
  default: () => ({
    isPlaying: mocks.isPlaying,
    play: mocks.play,
    stop: mocks.stop,
  }),
}));

const toneMock: Tone = {
  name: 'The Legend of Zelda',
  composition: '2#a1 2f1',
  bpm: 200,
};

describe('tones module integration', () => {
  beforeEach(() => {
    resetUiStore();
    resetTonesStore();
    mocks.play.mockReset();
    mocks.stop.mockReset();
    mocks.isPlaying = false;
    mocks.useTonesData.mockReturnValue([toneMock]);
  });

  it('exposes expected route path', () => {
    const routePaths = tonesModule.routes
      .map((route) => route.path)
      .filter((path): path is string => Boolean(path));

    expect(routePaths).toEqual(['/tones']);
  });

  it('plays selected tone and updates second level indicator', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={['/tones']}>
        <TonesPage />
      </MemoryRouter>
    );

    fireEvent.click(getByRole('button', { name: toneMock.name }));
    expect(mocks.play).toHaveBeenCalledWith('2#a1 2f1', 200);
    expect(useUiStore.getState().secondLevel).toBe(1);
  });

  it('locks tone controls while playback is active', () => {
    mocks.isPlaying = true;
    const { getByRole } = render(
      <MemoryRouter initialEntries={['/tones']}>
        <TonesPage />
      </MemoryRouter>
    );

    const toneButton = getByRole('button', { name: toneMock.name });
    expect((toneButton as HTMLButtonElement).disabled).toBe(true);

    fireEvent.click(toneButton);
    expect(mocks.play).not.toHaveBeenCalled();
  });
});
