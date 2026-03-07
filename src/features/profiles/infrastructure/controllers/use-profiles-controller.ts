import { useEffect, useState } from 'react';
import { Profile } from '@/entities/profile/model/profile';
import vibration from '@/shared/lib/vibration';
import { useUiStore } from '@/stores/ui-store';
import { useProfilesStore } from '@/features/profiles/state/profiles-store';

export const useProfilesController = () => {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const setSecondLevel = useUiStore((state) => state.setSecondLevel);
  const openModal = useUiStore((state) => state.openModal);
  const profiles = useProfilesStore((state) => state.profiles);
  const setCurrentProfile = useProfilesStore((state) => state.setCurrentProfile);

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
