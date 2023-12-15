import { Profile } from "@interfaces/profile";

export const setCurrentProfile = (payload: Profile) =>
  ({ type: "SET_CURRENT_PROFILE", payload });