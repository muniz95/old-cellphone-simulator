import defaults from '@/shared/config/defaults';
import { Profile } from '@/features/profiles/domain/profile';
import useLocalStorage from '@/shared/hooks/use-local-storage';

const PROFILES_STORAGE_KEY = 'profiles';
const CURRENT_PROFILE_STORAGE_KEY = 'currentProfile';

const useProfiles = () =>
  useLocalStorage<Profile[]>(
    PROFILES_STORAGE_KEY,
    defaults.profiles.profiles as Profile[]
  );

export const useCurrentProfile = () =>
  useLocalStorage<Profile>(
    CURRENT_PROFILE_STORAGE_KEY,
    defaults.profiles.currentProfile as Profile
  );

export default useProfiles;
