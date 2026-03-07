import { useCallback, useEffect } from 'react';
import { Profile } from '@/features/profiles/domain/profile';
import useProfiles, {
  useCurrentProfile,
} from '@/features/profiles/infrastructure/persistence/use-profiles';
import { useProfilesStore } from '@/features/profiles/state/profiles-store';

const useProfilesData = () => {
  const [storedProfiles, setStoredProfiles] = useProfiles();
  const [storedCurrentProfile, setStoredCurrentProfile] = useCurrentProfile();

  const profiles = useProfilesStore((state) => state.profiles);
  const currentProfile = useProfilesStore((state) => state.currentProfile);
  const hydrated = useProfilesStore((state) => state.hydrated);
  const hydrate = useProfilesStore((state) => state.hydrate);
  const setProfilesStore = useProfilesStore((state) => state.setProfiles);
  const setCurrentProfileStore = useProfilesStore(
    (state) => state.setCurrentProfile
  );

  useEffect(() => {
    if (!hydrated) {
      hydrate({
        profiles: storedProfiles,
        currentProfile: storedCurrentProfile,
      });
    }
  }, [hydrate, hydrated, storedCurrentProfile, storedProfiles]);

  const activeProfiles = hydrated ? profiles : storedProfiles;
  const activeCurrentProfile = hydrated ? currentProfile : storedCurrentProfile;

  const setProfiles = useCallback(
    (nextProfiles: Profile[]) => {
      setProfilesStore(nextProfiles);
      setStoredProfiles(nextProfiles);
    },
    [setProfilesStore, setStoredProfiles]
  );

  const setCurrentProfile = useCallback(
    (nextCurrentProfile: Profile) => {
      setCurrentProfileStore(nextCurrentProfile);
      setStoredCurrentProfile(nextCurrentProfile);
    },
    [setCurrentProfileStore, setStoredCurrentProfile]
  );

  return {
    profiles: activeProfiles,
    currentProfile: activeCurrentProfile,
    setProfiles,
    setCurrentProfile,
  };
};

export default useProfilesData;
