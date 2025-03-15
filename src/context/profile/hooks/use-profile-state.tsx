import { profileContext } from '../context';
import useLocalStorage from '@/hooks/use-local-storage';

type ProfileStateType = typeof profileContext;

export const useProfileState = () => {
  const [profiles, setProfiles] = useLocalStorage(
    'profiles',
    profileContext.profiles
  );
  const [currentProfile, setCurrentProfile] = useLocalStorage(
    'currentProfile',
    profileContext.currentProfile
  );

  const hook: ProfileStateType = {
    profiles,
    setProfiles,
    currentProfile,
    setCurrentProfile,
  };

  return hook;
};
