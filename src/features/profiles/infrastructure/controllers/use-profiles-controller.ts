import { useEffect, useState } from 'react';
import { Profile } from '@/features/profiles/domain/profile';
import vibration from '@/shared/lib/vibration';
import { useUiStore } from '@/app/state/ui-store';
import useProfilesData from '@/features/profiles/infrastructure/hooks/use-profiles-data';

export const useProfilesController = () => {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const setSecondLevel = useUiStore((state) => state.setSecondLevel);
  const openModal = useUiStore((state) => state.openModal);
  const { profiles, setCurrentProfile } = useProfilesData();

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
