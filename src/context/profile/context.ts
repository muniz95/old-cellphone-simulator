import defaults from '@/shared/config/defaults';
import { Profile } from '@/entities/profile/model/profile';
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
