import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  type Mock,
  vi,
} from 'vitest';
import { createRingtonePlayer } from '@/shared/lib/ringtone-player';

class MockOscillatorNode {
  frequency = { setValueAtTime: vi.fn() } as unknown as AudioParam;
  type: OscillatorType = 'sine';
  onended: ((event: Event) => void) | null = null;
  connect = vi.fn((node: AudioNode) => node);
  disconnect = vi.fn();
  start = vi.fn();
  stop = vi.fn();
}

class MockGainNode {
  gain = { setValueAtTime: vi.fn() } as unknown as AudioParam;
  connect = vi.fn((node: AudioNode) => node);
}

class MockAudioContext {
  static instances: MockAudioContext[] = [];

  currentTime = 0;
  state: AudioContextState = 'running';
  destination = {} as AudioDestinationNode;
  oscillators: MockOscillatorNode[] = [];

  constructor() {
    MockAudioContext.instances.push(this);
  }

  createOscillator = vi.fn(() => {
    const oscillator = new MockOscillatorNode();
    this.oscillators.push(oscillator);
    return oscillator as unknown as OscillatorNode;
  });

  createGain = vi.fn(() => {
    return new MockGainNode() as unknown as GainNode;
  });

  resume = vi.fn(async () => undefined);
  close = vi.fn(async () => undefined);
}

describe('ringtone player', () => {
  const originalAudioContext = window.AudioContext;
  const originalWebkitAudioContext = window.webkitAudioContext;

  beforeEach(() => {
    MockAudioContext.instances = [];
    Object.defineProperty(window, 'AudioContext', {
      configurable: true,
      writable: true,
      value: MockAudioContext,
    });
    Object.defineProperty(window, 'webkitAudioContext', {
      configurable: true,
      writable: true,
      value: undefined,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'AudioContext', {
      configurable: true,
      writable: true,
      value: originalAudioContext,
    });
    Object.defineProperty(window, 'webkitAudioContext', {
      configurable: true,
      writable: true,
      value: originalWebkitAudioContext,
    });
  });

  it('schedules each play from current context time on repeated calls', () => {
    const player = createRingtonePlayer();

    player.play('a1', 120);

    const context = MockAudioContext.instances[0];
    expect(context).toBeDefined();
    expect(context.oscillators).toHaveLength(1);

    const firstOscillator = context.oscillators[0];
    const firstFrequencyMock = firstOscillator.frequency.setValueAtTime as Mock;

    expect(firstFrequencyMock.mock.calls[0]?.[1]).toBe(0);
    expect(firstOscillator.stop).toHaveBeenCalledWith(0.5);

    context.currentTime = 15;
    player.play('a1', 120);

    expect(context.oscillators).toHaveLength(2);

    const secondOscillator = context.oscillators[1];
    const secondFrequencyMock = secondOscillator.frequency
      .setValueAtTime as Mock;

    expect(secondFrequencyMock.mock.calls[0]?.[1]).toBe(15);
    expect(secondOscillator.stop).toHaveBeenCalledWith(15.5);
  });

  it('tracks playback activity while oscillator is active', () => {
    const onPlaybackStateChange = vi.fn();
    const player = createRingtonePlayer({ onPlaybackStateChange });

    player.play('a1', 120);

    const context = MockAudioContext.instances[0];
    const oscillator = context.oscillators[0];

    expect(player.isPlaying()).toBe(true);
    expect(onPlaybackStateChange).toHaveBeenCalledWith(true);

    oscillator.onended?.(new Event('ended'));

    expect(player.isPlaying()).toBe(false);
    expect(onPlaybackStateChange).toHaveBeenLastCalledWith(false);
  });

  it('marks playback as inactive when stop is called', () => {
    const onPlaybackStateChange = vi.fn();
    const player = createRingtonePlayer({ onPlaybackStateChange });

    player.play('a1', 120);
    player.stop();

    expect(player.isPlaying()).toBe(false);
    expect(onPlaybackStateChange).toHaveBeenCalledWith(true);
    expect(onPlaybackStateChange).toHaveBeenLastCalledWith(false);
  });
});
