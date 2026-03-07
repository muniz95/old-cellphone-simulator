import { create } from 'zustand';
import defaults from '@/shared/config/defaults';
import { Profile } from '@/features/profiles/domain/profile';

const baseProfiles = defaults.profiles.profiles;
const baseCurrentProfile = defaults.profiles.currentProfile;

const initialProfilesState = {
  profiles: baseProfiles as Profile[],
  currentProfile: baseCurrentProfile as Profile,
  hydrated: false,
};

interface ProfilesState {
  profiles: Profile[];
  currentProfile: Profile;
  hydrated: boolean;
  hydrate: (state: Pick<ProfilesState, 'profiles' | 'currentProfile'>) => void;
  setProfiles: (profiles: Profile[]) => void;
  setCurrentProfile: (profile: Profile) => void;
}

export const useProfilesStore = create<ProfilesState>()((set) => ({
  ...initialProfilesState,
  hydrate: ({ profiles, currentProfile }) =>
    set({ profiles, currentProfile, hydrated: true }),
  setProfiles: (profiles) => set({ profiles }),
  setCurrentProfile: (currentProfile) => set({ currentProfile }),
}));

export const resetProfilesStore = () => {
  useProfilesStore.setState(initialProfilesState);
};
