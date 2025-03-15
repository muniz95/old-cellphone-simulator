import { useState, useEffect, useContext } from 'react';
import { Profile } from '@/interfaces/profile';
import service from '@/services/profile.service';
import vibration from '@/utils/vibration';
import { GlobalContext } from '@/context/global/context';
import { ProfileContext } from '@/context/profile/context';

export const useProfiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const { setSecondLevel, openModal } = useContext(GlobalContext);
  const { setCurrentProfile } = useContext(ProfileContext);

  useEffect(() => {
    fetchProfiles();
    setSecondLevel(0);
  }, [setSecondLevel]);

  const fetchProfiles = () => {
    setProfiles(service.getProfiles());
  };

  const applyProfile = (profile: Profile) => {
    service.applyProfile(profile);
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
