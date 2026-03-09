import { describe, expect, it } from 'vitest';
import { DEFAULT_SETTINGS } from '@/features/settings/domain/constants';
import {
  clampBacklightLevel,
  clampInactivityTime,
  clampSoundLevel,
  isSupportedLanguage,
  restoreDefaults,
  selectColor,
  setLanguage,
  updateLightSettings,
  updateSoundLevels,
} from '@/features/settings/domain/use-cases';

const basePreferences = {
  ...DEFAULT_SETTINGS,
};

describe('settings domain use-cases', () => {
  it('clamps numeric values to supported ranges', () => {
    expect(clampSoundLevel(-1)).toBe(0);
    expect(clampSoundLevel(500)).toBe(100);
    expect(clampBacklightLevel(0)).toBe(20);
    expect(clampBacklightLevel(200)).toBe(100);
    expect(clampInactivityTime(-5)).toBe(30);
    expect(clampInactivityTime(900)).toBe(300);
  });

  it('applies a valid color and ignores an unsupported one', () => {
    const withValidColor = selectColor(basePreferences, '#0d48eb');
    expect(withValidColor.color).toBe('#0d48eb');

    const withInvalidColor = selectColor(basePreferences, '#123456');
    expect(withInvalidColor).toEqual(basePreferences);
  });

  it('supports configured languages and ignores unsupported ones', () => {
    expect(isSupportedLanguage('en')).toBe(true);
    expect(isSupportedLanguage('jp')).toBe(false);

    const withValidLanguage = setLanguage(basePreferences, 'pt');
    expect(withValidLanguage.language).toBe('pt');

    const withInvalidLanguage = setLanguage(basePreferences, 'jp');
    expect(withInvalidLanguage).toEqual(basePreferences);
  });

  it('updates sound settings with normalization', () => {
    const next = updateSoundLevels(basePreferences, {
      notificationLevel: 101,
      alarmLevel: -10,
      ringLevel: 40,
    });

    expect(next.notificationLevel).toBe(100);
    expect(next.alarmLevel).toBe(0);
    expect(next.ringLevel).toBe(40);
  });

  it('updates light settings with normalization', () => {
    const next = updateLightSettings(basePreferences, {
      backlightLevel: 5,
      inactivityTime: 1200,
    });

    expect(next.backlightLevel).toBe(20);
    expect(next.inactivityTime).toBe(300);
  });

  it('restores default settings values', () => {
    const restored = restoreDefaults();

    expect(restored).toEqual(DEFAULT_SETTINGS);
    expect(restored).not.toBe(DEFAULT_SETTINGS);
  });
});
