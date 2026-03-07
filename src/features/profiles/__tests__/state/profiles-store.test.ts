import { beforeEach, describe, expect, it } from 'vitest';
import { Profile } from '@/features/profiles/domain/profile';
import {
  resetProfilesStore,
  useProfilesStore,
} from '@/features/profiles/state/profiles-store';

const firstProfile = useProfilesStore.getState().currentProfile as Profile;

const secondProfile: Profile = {
  ...firstProfile,
  id: 'profile-2',
  name: 'custom',
  isFactoryProfile: false,
};

describe('profiles store', () => {
  beforeEach(() => {
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

  it('hydrates state via explicit hydrate action', () => {
    useProfilesStore.getState().hydrate({
      profiles: [firstProfile],
      currentProfile: firstProfile,
    });

    expect(useProfilesStore.getState().hydrated).toBe(true);
    expect(useProfilesStore.getState().profiles).toEqual([firstProfile]);
    expect(useProfilesStore.getState().currentProfile).toEqual(firstProfile);
  });
});
