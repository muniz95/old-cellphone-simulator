import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@/i18n';
import { Profile } from '@/entities/profile/model/profile';
import { profilesModule } from '@/features/profiles/module';
import ProfilesPage from '@/features/profiles/ui/pages/profiles-page';
import { resetUiStore, useUiStore } from '@/stores/ui-store';
import {
  resetProfilesStore,
  useProfilesStore,
} from '@/features/profiles/state/profiles-store';

const factoryProfile: Profile = {
  id: 'factory-profile',
  name: 'normal',
  isFactoryProfile: true,
  ringtone: 'default',
  ringLevel: 50,
  notificationTone: 'default',
  notificationLevel: 50,
  alarmTone: 'default',
  soundEffectsLevel: 50,
  soundEffectsEnabled: true,
  vibrationEnabled: true,
  blinkingLightsEnabled: true,
};

const customProfile: Profile = {
  ...factoryProfile,
  id: 'custom-profile',
  name: 'Custom',
  isFactoryProfile: false,
};

describe('profiles module integration', () => {
  beforeEach(() => {
    resetUiStore();
    resetProfilesStore();
    useProfilesStore.setState({
      profiles: [factoryProfile, customProfile],
      currentProfile: factoryProfile,
    });
  });

  it('exposes expected route path', () => {
    const routePaths = profilesModule.routes
      .map((route) => route.path)
      .filter((path): path is string => Boolean(path));

    expect(routePaths).toEqual(['/profiles']);
  });

  it('applies selected profile using store + modal flow', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/profiles']}>
        <ProfilesPage />
      </MemoryRouter>
    );

    fireEvent.click(getByText('Custom'));
    fireEvent.click(getByText(/Save|save|Salvar/i));

    expect(useProfilesStore.getState().currentProfile.name).toBe('Custom');
    expect(useUiStore.getState().showModal).toBe(true);
  });
});
