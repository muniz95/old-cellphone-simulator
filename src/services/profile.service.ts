import { Profile } from "interfaces/profile";
import db from "utils/db";

export const applyProfile = (profile: Profile) => {
  db.set("currentProfile", profile);
}

export const getProfiles = (): Profile[] => {
  return db.get<Profile[]>("profiles");
}

export const insertProfile = (profile: Profile) => {
  db.insert("profiles", profile);
}

export const updateProfile = (profile: Profile) => {
  db.update("profiles", profile);
}

export const removeProfile = (profile: Profile) => {
  db.remove("profiles", profile);
}

const service = {
  getProfiles,
  insertProfile,
  updateProfile,
  removeProfile,
  applyProfile,
}

export default service;