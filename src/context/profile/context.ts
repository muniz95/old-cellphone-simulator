import defaults from '@/defaults';
import { Profile } from '@/interfaces/profile';
import { createContext, Dispatch, SetStateAction } from 'react';

type ProfileContextType = {
  profiles: Profile[];
  setProfiles: Dispatch<SetStateAction<Profile[]>>;
  currentProfile: Profile;
  setCurrentProfile: Dispatch<SetStateAction<Profile>>;
};

export const profileContext: ProfileContextType = {
  profiles: defaults.profiles.profiles,
  setProfiles: () => {},
  currentProfile: defaults.profiles.currentProfile,
  setCurrentProfile: () => {},
};

export const ProfileContext = createContext<ProfileContextType>(profileContext);
