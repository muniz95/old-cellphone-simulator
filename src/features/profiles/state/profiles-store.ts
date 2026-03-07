import { create } from 'zustand';
import defaults from '@/shared/config/defaults';
import { Profile } from '@/entities/profile/model/profile';

const PROFILES_STORAGE_KEY = 'profiles';
const CURRENT_PROFILE_STORAGE_KEY = 'currentProfile';

const inMemoryStore: Record<string, string> = {};

interface SyncStorage {
  getItem: (name: string) => string | null;
  setItem: (name: string, value: string) => void;
  removeItem: (name: string) => void;
}

const fallbackStorage: SyncStorage = {
  getItem: (name) => inMemoryStore[name] ?? null,
  setItem: (name, value) => {
    inMemoryStore[name] = value;
  },
  removeItem: (name) => {
    delete inMemoryStore[name];
  },
};

const resolveStorage = (): SyncStorage => {
  if (typeof window === 'undefined') return fallbackStorage;

  const storage = window.localStorage as Partial<SyncStorage>;
  const hasStorageInterface =
    typeof storage?.getItem === 'function' &&
    typeof storage?.setItem === 'function' &&
    typeof storage?.removeItem === 'function';

  if (!hasStorageInterface) {
    return fallbackStorage;
  }

  return storage as SyncStorage;
};

const readJson = <T>(storage: SyncStorage, key: string, fallback: T): T => {
  const value = storage.getItem(key);
  if (!value) return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const baseProfiles = defaults.profiles.profiles;
const baseCurrentProfile = defaults.profiles.currentProfile;

const buildInitialState = () => {
  const storage = resolveStorage();

  return {
    profiles: readJson<Profile[]>(storage, PROFILES_STORAGE_KEY, baseProfiles),
    currentProfile: readJson<Profile>(
      storage,
      CURRENT_PROFILE_STORAGE_KEY,
      baseCurrentProfile
    ),
  };
};

interface ProfilesState {
  profiles: Profile[];
  currentProfile: Profile;
  setProfiles: (profiles: Profile[]) => void;
  setCurrentProfile: (profile: Profile) => void;
}

const persistState = (
  state: Pick<ProfilesState, 'profiles' | 'currentProfile'>
) => {
  const storage = resolveStorage();
  storage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(state.profiles));
  storage.setItem(CURRENT_PROFILE_STORAGE_KEY, JSON.stringify(state.currentProfile));
};

export const useProfilesStore = create<ProfilesState>()((set) => ({
  ...buildInitialState(),
  setProfiles: (profiles) =>
    set((state) => {
      persistState({
        profiles,
        currentProfile: state.currentProfile,
      });

      return { profiles };
    }),
  setCurrentProfile: (currentProfile) =>
    set((state) => {
      persistState({
        profiles: state.profiles,
        currentProfile,
      });

      return { currentProfile };
    }),
}));

export const resetProfilesStore = () => {
  const initialState = buildInitialState();
  useProfilesStore.setState(initialState);
};

export { CURRENT_PROFILE_STORAGE_KEY, PROFILES_STORAGE_KEY };
