import { FC } from 'react';
import { ProfileContext } from './context';
import { useProfileState } from './hooks/use-profile-state';

export const ProfileContextProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const profileState = useProfileState();

  return (
    <ProfileContext.Provider value={{ ...profileState }}>
      {children}
    </ProfileContext.Provider>
  );
};
