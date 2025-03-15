import { useState, useEffect, useContext } from 'react';
import { Profile } from '@/interfaces/profile';
import vibration from '@/utils/vibration';
import { GlobalContext } from '@/context/global/context';
import { ProfileContext } from '@/context/profile/context';

export const useProfiles = () => {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const { setSecondLevel, openModal } = useContext(GlobalContext);
  const { profiles, setCurrentProfile } = useContext(ProfileContext);

  useEffect(() => {
    setSecondLevel(0);
  }, [setSecondLevel]);

  const applyProfile = (profile: Profile) => {
    setCurrentProfile(profile);
    vibration.success();
    openModal();
  };

  return {
    profiles,
    selectedProfile,
    setSelectedProfile,
    applyProfile,
  };
};
