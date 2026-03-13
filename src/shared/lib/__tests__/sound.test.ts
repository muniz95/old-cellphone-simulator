import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { say } from '@/shared/lib/sound';

type VoicesChangedHandler = () => void;

const createVoice = (
  name: string,
  { isDefault = false, localService = true } = {}
) =>
  ({
    default: isDefault,
    localService,
    lang: 'en-US',
    name,
    voiceURI: name,
  }) as SpeechSynthesisVoice;

const createSpeechMock = () => {
  let voices: SpeechSynthesisVoice[] = [];
  const listeners: VoicesChangedHandler[] = [];

  return {
    setVoices: (nextVoices: SpeechSynthesisVoice[]) => {
      voices = nextVoices;
    },
    emitVoicesChanged: () => {
      listeners.forEach((handler) => handler());
    },
    api: {
      getVoices: vi.fn(() => voices),
      speak: vi.fn(),
      cancel: vi.fn(),
      resume: vi.fn(),
      addEventListener: vi.fn((event: string, handler: EventListener) => {
        if (event === 'voiceschanged') {
          listeners.push(handler as VoicesChangedHandler);
        }
      }),
    } as unknown as SpeechSynthesis,
  };
};

describe('sound.say', () => {
  const originalSpeechSynthesis = globalThis.window?.speechSynthesis as
    | SpeechSynthesis
    | undefined;
  const originalUtterance = globalThis.SpeechSynthesisUtterance;

  beforeEach(() => {
    vi.useFakeTimers();

    class MockUtterance {
      text: string;
      voice: SpeechSynthesisVoice | null = null;

      constructor(text: string) {
        this.text = text;
      }
    }

    Object.defineProperty(globalThis, 'SpeechSynthesisUtterance', {
      configurable: true,
      writable: true,
      value: MockUtterance,
    });
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();

    Object.defineProperty(globalThis, 'SpeechSynthesisUtterance', {
      configurable: true,
      writable: true,
      value: originalUtterance,
    });

    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      writable: true,
      value: originalSpeechSynthesis,
    });
  });

  it('uses an available voice immediately and speaks once', () => {
    const speechMock = createSpeechMock();
    const fallbackVoice = createVoice('fallback', {
      isDefault: false,
      localService: false,
    });
    const defaultVoice = createVoice('default-voice', {
      isDefault: true,
      localService: true,
    });
    speechMock.setVoices([fallbackVoice, defaultVoice]);

    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      writable: true,
      value: speechMock.api,
    });

    say('Hello world');

    expect(speechMock.api.cancel).toHaveBeenCalledTimes(1);
    expect(speechMock.api.resume).toHaveBeenCalledTimes(1);
    expect(speechMock.api.speak).toHaveBeenCalledTimes(1);

    const utterance = speechMock.api.speak.mock.calls[0]?.[0] as {
      voice: SpeechSynthesisVoice | null;
    };
    expect(utterance.voice).toBe(defaultVoice);
  });

  it('waits for voiceschanged when voices are initially unavailable', () => {
    const speechMock = createSpeechMock();

    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      writable: true,
      value: speechMock.api,
    });

    say('Delayed voices');
    expect(speechMock.api.speak).not.toHaveBeenCalled();

    const loadedVoice = createVoice('loaded', { isDefault: true });
    speechMock.setVoices([loadedVoice]);
    speechMock.emitVoicesChanged();

    expect(speechMock.api.speak).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(300);
    expect(speechMock.api.speak).toHaveBeenCalledTimes(1);
  });

  it('falls back to timeout-based speaking when voiceschanged does not fire', () => {
    const speechMock = createSpeechMock();

    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      writable: true,
      value: speechMock.api,
    });

    say('Timeout fallback');
    expect(speechMock.api.speak).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);
    expect(speechMock.api.speak).toHaveBeenCalledTimes(1);
  });

  it('no-ops when speech synthesis is unavailable', () => {
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      writable: true,
      value: undefined,
    });

    expect(() => say('No support')).not.toThrow();
  });
});
