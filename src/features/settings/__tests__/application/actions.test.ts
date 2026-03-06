import { describe, expect, it, vi } from 'vitest';
import {
  resetSettingsToDefaults,
  saveColorSelection,
  saveLanguageSelection,
  saveLightPreferences,
  saveSoundPreferences,
} from '@/features/settings/application/actions';
import {
  FeedbackPort,
  SettingsStorePort,
} from '@/features/settings/application/ports';
import { DEFAULT_SETTINGS } from '@/features/settings/domain/constants';

const createStore = (): SettingsStorePort & {
  writeSpy: ReturnType<typeof vi.fn>;
} => {
  const writeSpy = vi.fn();

  return {
    read: () => ({ ...DEFAULT_SETTINGS }),
    write: writeSpy,
    writeSpy,
  };
};

const createFeedback = (): FeedbackPort & {
  successSpy: ReturnType<typeof vi.fn>;
  resetSpy: ReturnType<typeof vi.fn>;
} => {
  const successSpy = vi.fn();
  const resetSpy = vi.fn();

  return {
    success: successSpy,
    reset: resetSpy,
    successSpy,
    resetSpy,
  };
};

describe('settings application actions', () => {
  it('saves selected color and emits success feedback once', () => {
    const store = createStore();
    const feedback = createFeedback();

    const next = saveColorSelection(store, feedback, '#0d48eb');

    expect(next.color).toBe('#0d48eb');
    expect(store.writeSpy).toHaveBeenCalledTimes(1);
    expect(feedback.successSpy).toHaveBeenCalledTimes(1);
  });

  it('saves selected language and emits success feedback once', () => {
    const store = createStore();
    const feedback = createFeedback();

    const next = saveLanguageSelection(store, feedback, 'pt');

    expect(next.language).toBe('pt');
    expect(store.writeSpy).toHaveBeenCalledTimes(1);
    expect(feedback.successSpy).toHaveBeenCalledTimes(1);
  });

  it('saves sound settings using normalized values', () => {
    const store = createStore();
    const feedback = createFeedback();

    const next = saveSoundPreferences(store, feedback, {
      notificationLevel: 200,
      alarmLevel: -10,
      ringLevel: 30,
    });

    expect(next.notificationLevel).toBe(100);
    expect(next.alarmLevel).toBe(0);
    expect(next.ringLevel).toBe(30);
    expect(store.writeSpy).toHaveBeenCalledTimes(1);
    expect(feedback.successSpy).toHaveBeenCalledTimes(1);
  });

  it('saves light settings using normalized values', () => {
    const store = createStore();
    const feedback = createFeedback();

    const next = saveLightPreferences(store, feedback, {
      backlightLevel: 5,
      inactivityTime: 999,
    });

    expect(next.backlightLevel).toBe(20);
    expect(next.inactivityTime).toBe(600);
    expect(store.writeSpy).toHaveBeenCalledTimes(1);
    expect(feedback.successSpy).toHaveBeenCalledTimes(1);
  });

  it('resets settings to defaults and emits reset feedback once', () => {
    const store = createStore();
    const feedback = createFeedback();

    const next = resetSettingsToDefaults(store, feedback);

    expect(next).toEqual(DEFAULT_SETTINGS);
    expect(store.writeSpy).toHaveBeenCalledTimes(1);
    expect(feedback.resetSpy).toHaveBeenCalledTimes(1);
  });
});
