import { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Profile } from '@/interfaces/profile';
import service from '@/services/profile.service';
import vibration from '@/utils/vibration';
import { openModal } from '@/redux/actions';
import { GlobalContext } from '@/context/global/context';
import { ProfileContext } from '@/context/profile/context';

export const useProfiles = () => {
  const dispatch = useDispatch();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const { setSecondLevel } = useContext(GlobalContext);
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
    dispatch(openModal());
  };

  return {
    profiles,
    selectedProfile,
    setSelectedProfile,
    applyProfile,
  };
};
