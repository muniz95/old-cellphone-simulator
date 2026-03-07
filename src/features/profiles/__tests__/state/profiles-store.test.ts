import { beforeEach, describe, expect, it } from 'vitest';
import { Profile } from '@/features/profiles/domain/profile';
import {
  CURRENT_PROFILE_STORAGE_KEY,
  PROFILES_STORAGE_KEY,
  resetProfilesStore,
  useProfilesStore,
} from '@/features/profiles/state/profiles-store';

const firstProfile: Profile = {
  id: 'profile-1',
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

const secondProfile: Profile = {
  ...firstProfile,
  id: 'profile-2',
  name: 'custom',
  isFactoryProfile: false,
};

describe('profiles store', () => {
  beforeEach(() => {
    const storage = globalThis.localStorage as Partial<Storage>;

    if (typeof storage?.removeItem === 'function') {
      storage.removeItem(PROFILES_STORAGE_KEY);
      storage.removeItem(CURRENT_PROFILE_STORAGE_KEY);
    }

    resetProfilesStore();
  });

  it('stores and retrieves profiles list', () => {
    useProfilesStore.getState().setProfiles([firstProfile, secondProfile]);

    expect(useProfilesStore.getState().profiles).toEqual([
      firstProfile,
      secondProfile,
    ]);
  });

  it('stores and retrieves current profile', () => {
    useProfilesStore.getState().setCurrentProfile(secondProfile);

    expect(useProfilesStore.getState().currentProfile).toEqual(secondProfile);
  });

  it('hydrates state from legacy storage keys', () => {
    const storage = globalThis.localStorage as Partial<Storage>;
    const canWrite =
      typeof storage?.setItem === 'function' &&
      typeof storage?.getItem === 'function';

    if (!canWrite) {
      expect(useProfilesStore.getState().profiles).toBeDefined();
      expect(useProfilesStore.getState().currentProfile).toBeDefined();
      return;
    }

    storage.setItem!(PROFILES_STORAGE_KEY, JSON.stringify([firstProfile]));
    storage.setItem!(CURRENT_PROFILE_STORAGE_KEY, JSON.stringify(firstProfile));

    resetProfilesStore();

    expect(useProfilesStore.getState().profiles).toEqual([firstProfile]);
    expect(useProfilesStore.getState().currentProfile).toEqual(firstProfile);
  });
});
