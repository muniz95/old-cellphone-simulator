import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@/app/providers/i18n';
import { SimNumber } from '@/features/sim-services/domain/sim-number';
import { simServicesModule } from '@/features/sim-services/module';
import SimServicesPage from '@/features/sim-services/ui/pages/sim-services-page';
import { resetUiStore } from '@/app/state/ui-store';
import { resetSimNumbersStore } from '@/features/sim-services/state/sim-numbers-store';

const mocks = vi.hoisted(() => ({
  say: vi.fn(),
  useSimNumbersData: vi.fn(),
}));

vi.mock('@/shared/lib/sound', () => ({
  say: mocks.say,
}));

vi.mock(
  '@/features/sim-services/infrastructure/hooks/use-sim-numbers-data',
  () => ({
    default: mocks.useSimNumbersData,
  })
);

const mockSimNumbers: SimNumber[] = [
  {
    id: 'provider-id',
    name: 'Provider',
    number: 100,
    message: 'This is your provider.',
  },
  {
    id: 'pobox-id',
    name: 'P.O. Box',
    number: 222,
    message: 'You have a voice message.',
  },
];

describe('sim-services module integration', () => {
  beforeEach(() => {
    resetUiStore();
    resetSimNumbersStore();
    mocks.say.mockReset();
    mocks.useSimNumbersData.mockReturnValue(mockSimNumbers);
  });

  it('exposes expected route path', () => {
    const routePaths = simServicesModule.routes
      .map((route) => route.path)
      .filter((path): path is string => Boolean(path));

    expect(routePaths).toEqual(['/simservices']);
  });

  it('enables play after selecting a service and speaks selected message', () => {
    const { getByRole, getByText } = render(
      <MemoryRouter initialEntries={['/simservices']}>
        <SimServicesPage />
      </MemoryRouter>
    );

    const playButton = getByRole('button', { name: /play|reproduzir/i });
    expect(playButton.hasAttribute('disabled')).toBe(true);

    fireEvent.click(getByText('Provider'));
    expect(playButton.hasAttribute('disabled')).toBe(false);

    fireEvent.click(playButton);
    expect(mocks.say).toHaveBeenCalledWith('This is your provider.');
  });
});
