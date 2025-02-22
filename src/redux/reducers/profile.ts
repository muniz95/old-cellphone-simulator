import { Profile } from '@/interfaces/profile';

type ProfileActionTypes = 'SET_CURRENT_PROFILE' | 'CLEAR_CURRENT_PROFILE';

interface ProfileAction {
  type: ProfileActionTypes;
  payload: Profile;
}

export const currentProfile = (
  state: Profile | null = null,
  action: ProfileAction
): Profile | null => {
  switch (action.type) {
    case 'SET_CURRENT_PROFILE':
      return action.payload; // No type assertion needed!
    case 'CLEAR_CURRENT_PROFILE':
      return null;
    default:
      return state;
  }
};

const ProfileReducer = {
  currentProfile,
};

export default ProfileReducer;
