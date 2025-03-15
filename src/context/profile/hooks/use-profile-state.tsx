import { useState } from 'react';
import { profileContext } from '../context';

type ProfileStateType = typeof profileContext;

export const useProfileState = () => {
  const [currentProfile, setCurrentProfile] = useState(
    profileContext.currentProfile
  );

  const hook: ProfileStateType = {
    currentProfile,
    setCurrentProfile,
  };

  return hook;
};
