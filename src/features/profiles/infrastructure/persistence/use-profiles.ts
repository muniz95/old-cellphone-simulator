import defaults from '@/shared/config/defaults';
import { Profile } from '@/features/profiles/domain/profile';
import useIndexedDb from '@/shared/hooks/use-indexed-db';

const PROFILES_STORAGE_KEY = 'profiles';
const CURRENT_PROFILE_STORAGE_KEY = 'currentProfile';

const useProfiles = () =>
  useIndexedDb<Profile[]>(
    PROFILES_STORAGE_KEY,
    defaults.profiles.profiles as Profile[]
  );

export const useCurrentProfile = () =>
  useIndexedDb<Profile>(
    CURRENT_PROFILE_STORAGE_KEY,
    defaults.profiles.currentProfile as Profile
  );

export default useProfiles;
