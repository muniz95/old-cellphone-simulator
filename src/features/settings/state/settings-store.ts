import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
import { DEFAULT_SETTINGS } from '@/features/settings/domain/constants';
import {
  restoreDefaults,
  selectColor,
  setLanguage,
  updateLightSettings,
  updateSoundLevels,
} from '@/features/settings/domain/use-cases';
import { SettingsPreferences } from '@/features/settings/domain/types';

const SETTINGS_STORAGE_KEY = 'settings-store';
const inMemoryStore: Record<string, string> = {};

const fallbackStorage: StateStorage = {
  getItem: (name) => inMemoryStore[name] ?? null,
  setItem: (name, value) => {
    inMemoryStore[name] = value;
  },
  removeItem: (name) => {
    delete inMemoryStore[name];
  },
};

const resolveStorage = (): StateStorage => {
  if (typeof window === 'undefined') return fallbackStorage;

  const storage = window.localStorage as Partial<StateStorage>;
  const hasStorageInterface =
    typeof storage?.getItem === 'function' &&
    typeof storage?.setItem === 'function' &&
    typeof storage?.removeItem === 'function';

  if (!hasStorageInterface) {
    return fallbackStorage;
  }

  return storage as StateStorage;
};

interface SettingsState extends SettingsPreferences {
  setColor: (value: string) => void;
  setLanguage: (value: string) => void;
  setNotificationLevel: (value: number) => void;
  setAlarmLevel: (value: number) => void;
  setRingLevel: (value: number) => void;
  setBacklightLevel: (value: number) => void;
  setInactivityTime: (value: number) => void;
  setSoundLevels: (value: {
    notificationLevel: number;
    alarmLevel: number;
    ringLevel: number;
  }) => void;
  setLightSettings: (value: {
    backlightLevel: number;
    inactivityTime: number;
  }) => void;
  resetDefaults: () => void;
}

const mapPreferencesToState = (
  preferences: SettingsPreferences
): Pick<
  SettingsState,
  | 'color'
  | 'language'
  | 'notificationLevel'
  | 'alarmLevel'
  | 'ringLevel'
  | 'backlightLevel'
  | 'inactivityTime'
> => ({
  color: preferences.color,
  language: preferences.language,
  notificationLevel: preferences.notificationLevel,
  alarmLevel: preferences.alarmLevel,
  ringLevel: preferences.ringLevel,
  backlightLevel: preferences.backlightLevel,
  inactivityTime: preferences.inactivityTime,
});

const mapStateToPreferences = (state: SettingsState): SettingsPreferences => ({
  color: state.color,
  language: state.language,
  notificationLevel: state.notificationLevel,
  alarmLevel: state.alarmLevel,
  ringLevel: state.ringLevel,
  backlightLevel: state.backlightLevel,
  inactivityTime: state.inactivityTime,
});

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...mapPreferencesToState(DEFAULT_SETTINGS),
      setColor: (value) =>
        set((state) =>
          mapPreferencesToState(
            selectColor(mapStateToPreferences(state), value)
          )
        ),
      setLanguage: (value) =>
        set((state) =>
          mapPreferencesToState(
            setLanguage(mapStateToPreferences(state), value)
          )
        ),
      setNotificationLevel: (value) =>
        set((state) =>
          mapPreferencesToState(
            updateSoundLevels(mapStateToPreferences(state), {
              notificationLevel: value,
              alarmLevel: state.alarmLevel,
              ringLevel: state.ringLevel,
            })
          )
        ),
      setAlarmLevel: (value) =>
        set((state) =>
          mapPreferencesToState(
            updateSoundLevels(mapStateToPreferences(state), {
              notificationLevel: state.notificationLevel,
              alarmLevel: value,
              ringLevel: state.ringLevel,
            })
          )
        ),
      setRingLevel: (value) =>
        set((state) =>
          mapPreferencesToState(
            updateSoundLevels(mapStateToPreferences(state), {
              notificationLevel: state.notificationLevel,
              alarmLevel: state.alarmLevel,
              ringLevel: value,
            })
          )
        ),
      setBacklightLevel: (value) =>
        set((state) =>
          mapPreferencesToState(
            updateLightSettings(mapStateToPreferences(state), {
              backlightLevel: value,
              inactivityTime: state.inactivityTime,
            })
          )
        ),
      setInactivityTime: (value) =>
        set((state) =>
          mapPreferencesToState(
            updateLightSettings(mapStateToPreferences(state), {
              backlightLevel: state.backlightLevel,
              inactivityTime: value,
            })
          )
        ),
      setSoundLevels: (value) =>
        set((state) =>
          mapPreferencesToState(
            updateSoundLevels(mapStateToPreferences(state), value)
          )
        ),
      setLightSettings: (value) =>
        set((state) =>
          mapPreferencesToState(
            updateLightSettings(mapStateToPreferences(state), value)
          )
        ),
      resetDefaults: () => set(mapPreferencesToState(restoreDefaults())),
    }),
    {
      name: SETTINGS_STORAGE_KEY,
      storage: createJSONStorage(resolveStorage),
      partialize: (state) => ({
        color: state.color,
        language: state.language,
        notificationLevel: state.notificationLevel,
        alarmLevel: state.alarmLevel,
        ringLevel: state.ringLevel,
        backlightLevel: state.backlightLevel,
        inactivityTime: state.inactivityTime,
      }),
    }
  )
);

export const resetSettingsStore = () => {
  useSettingsStore.setState(mapPreferencesToState(DEFAULT_SETTINGS));
};

export { SETTINGS_STORAGE_KEY };
