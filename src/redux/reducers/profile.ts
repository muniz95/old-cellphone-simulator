import { Profile } from "interfaces/profile";

export const currentProfile = (state = null, action: any): Profile | null => {
  switch(action.type) {
    case "SET_CURRENT_PROFILE":
      return action.payload;
    default:
      return state;
  }
}

const ProfileReducer = {
  currentProfile,
};

export default ProfileReducer;
