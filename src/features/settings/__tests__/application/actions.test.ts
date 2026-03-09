import { beforeEach, describe, expect, it } from 'vitest';
import {
  resetSettingsStore,
  SETTINGS_STORAGE_KEY,
  useSettingsStore,
} from '@/features/settings/state/settings-store';
import { DEFAULT_SETTINGS } from '@/features/settings/domain/constants';

describe('settings store actions', () => {
  beforeEach(() => {
    const storage = globalThis.localStorage as Partial<Storage>;
    if (typeof storage?.removeItem === 'function') {
      storage.removeItem(SETTINGS_STORAGE_KEY);
    }
    resetSettingsStore();
  });

  it('saves selected color and ignores unsupported colors', () => {
    useSettingsStore.getState().setColor('#0d48eb');
    expect(useSettingsStore.getState().color).toBe('#0d48eb');

    useSettingsStore.getState().setColor('#123456');
    expect(useSettingsStore.getState().color).toBe('#0d48eb');
  });

  it('saves selected language and ignores unsupported languages', () => {
    useSettingsStore.getState().setLanguage('pt');
    expect(useSettingsStore.getState().language).toBe('pt');

    useSettingsStore.getState().setLanguage('jp');
    expect(useSettingsStore.getState().language).toBe('pt');
  });

  it('saves sound settings with normalization', () => {
    useSettingsStore.getState().setSoundLevels({
      notificationLevel: 200,
      alarmLevel: -10,
      ringLevel: 30,
    });

    const state = useSettingsStore.getState();
    expect(state.notificationLevel).toBe(100);
    expect(state.alarmLevel).toBe(0);
    expect(state.ringLevel).toBe(30);
  });

  it('saves light settings with normalization', () => {
    useSettingsStore.getState().setLightSettings({
      backlightLevel: 5,
      inactivityTime: 999,
    });

    const state = useSettingsStore.getState();
    expect(state.backlightLevel).toBe(20);
    expect(state.inactivityTime).toBe(300);
  });

  it('resets settings to defaults', () => {
    useSettingsStore.getState().setLanguage('pt');
    useSettingsStore.getState().resetDefaults();

    const state = useSettingsStore.getState();
    expect(state.color).toBe(DEFAULT_SETTINGS.color);
    expect(state.language).toBe(DEFAULT_SETTINGS.language);
    expect(state.notificationLevel).toBe(DEFAULT_SETTINGS.notificationLevel);
    expect(state.alarmLevel).toBe(DEFAULT_SETTINGS.alarmLevel);
    expect(state.ringLevel).toBe(DEFAULT_SETTINGS.ringLevel);
    expect(state.backlightLevel).toBe(DEFAULT_SETTINGS.backlightLevel);
    expect(state.inactivityTime).toBe(DEFAULT_SETTINGS.inactivityTime);
  });
});
