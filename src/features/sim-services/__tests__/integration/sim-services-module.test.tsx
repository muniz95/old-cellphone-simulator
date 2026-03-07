import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@/i18n';
import { SimNumber } from '@/entities/sim-number/model/sim-number';
import { simServicesModule } from '@/features/sim-services/module';
import SimServicesPage from '@/features/sim-services/ui/pages/sim-services-page';
import { resetUiStore } from '@/stores/ui-store';

const mocks = vi.hoisted(() => ({
  say: vi.fn(),
  useLocalStorage: vi.fn(),
}));

vi.mock('@/shared/lib/sound', () => ({
  say: mocks.say,
}));

vi.mock('@/shared/hooks/use-local-storage', () => ({
  default: mocks.useLocalStorage,
}));

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
    mocks.say.mockReset();
    mocks.useLocalStorage.mockReturnValue([mockSimNumbers, vi.fn()]);
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
