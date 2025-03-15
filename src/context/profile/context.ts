import { Profile } from '@/interfaces/profile';
import { createContext, Dispatch, SetStateAction } from 'react';

export type ProfileContextType = {
  profiles: Profile[];
  setProfiles: Dispatch<SetStateAction<Profile[]>>;
  currentProfile: Profile;
  setCurrentProfile: Dispatch<SetStateAction<Profile>>;
};

export const profileContext: ProfileContextType = {
  profiles: [],
  setProfiles: () => {},
  currentProfile: {
    isFactoryProfile: true,
    ringtone: '',
    ringLevel: 50,
    notificationTone: '',
    notificationLevel: 50,
    alarmTone: '',
    soundEffectsLevel: 50,
    soundEffectsEnabled: true,
    vibrationEnabled: true,
    blinkingLightsEnabled: true,
    name: 'Default',
  },
  setCurrentProfile: () => {},
};

export const ProfileContext = createContext<ProfileContextType>(profileContext);
