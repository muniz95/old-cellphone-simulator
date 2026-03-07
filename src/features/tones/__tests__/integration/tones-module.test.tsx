import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Tone } from '@/features/tones/domain/tone';
import { tonesModule } from '@/features/tones/module';
import TonesPage from '@/features/tones/ui/pages/tones-page';
import { resetUiStore, useUiStore } from '@/app/state/ui-store';
import { resetTonesStore } from '@/features/tones/state/tones-store';

const mocks = vi.hoisted(() => ({
  useTonesData: vi.fn(),
  play: vi.fn(),
  stop: vi.fn(),
}));

vi.mock('@/features/tones/infrastructure/hooks/use-tones-data', () => ({
  default: mocks.useTonesData,
}));

vi.mock('@/features/tones/infrastructure/audio/use-ringtone', () => ({
  default: () => ({
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
});
