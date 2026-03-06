import { useState, useEffect, useContext } from 'react';
import { Profile } from '@/interfaces/profile';
import vibration from '@/utils/vibration';
import { ProfileContext } from '@/context/profile/context';
import { useUiStore } from '@/stores/ui-store';

export const useProfiles = () => {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const setSecondLevel = useUiStore((state) => state.setSecondLevel);
  const openModal = useUiStore((state) => state.openModal);
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
