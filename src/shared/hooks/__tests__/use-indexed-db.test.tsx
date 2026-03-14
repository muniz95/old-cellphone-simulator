import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import useIndexedDb, {
  resetIndexedDbCache,
} from '@/shared/hooks/use-indexed-db';

type StorageRecord = Record<string, string>;

const createStorageMock = (seed: StorageRecord = {}) => {
  const store: StorageRecord = { ...seed };

  return {
    getItem: (key: string) => (key in store ? store[key] : null),
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      Object.keys(store).forEach((key) => delete store[key]);
    },
    key: (index: number) => Object.keys(store)[index] ?? null,
    get length() {
      return Object.keys(store).length;
    },
  } as Storage;
};

describe('useIndexedDb', () => {
  const originalLocalStorage = globalThis.localStorage;
  let storageMock: Storage;

  beforeEach(() => {
    resetIndexedDbCache();
    storageMock = createStorageMock();
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      writable: true,
      value: storageMock,
    });
  });

  afterEach(() => {
    resetIndexedDbCache();
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      writable: true,
      value: originalLocalStorage,
    });
  });

  it('returns persisted object value when key exists', () => {
    localStorage.setItem('profile', JSON.stringify({ name: 'Alice' }));

    const { result } = renderHook(() =>
      useIndexedDb('profile', { name: 'Default' })
    );

    expect(result.current[0]).toEqual({ name: 'Alice' });
  });

  it('writes and returns default value when key does not exist', () => {
    const { result } = renderHook(() => useIndexedDb('language', 'en'));

    expect(result.current[0]).toBe('en');
    expect(localStorage.getItem('language')).toBe('en');
  });

  it('parses primitive values from storage payload', () => {
    localStorage.setItem('boolean', 'true');
    localStorage.setItem('number', '42');
    localStorage.setItem('text', 'legacy-value');

    const boolHook = renderHook(() => useIndexedDb('boolean', false));
    const numberHook = renderHook(() => useIndexedDb('number', 0));
    const textHook = renderHook(() => useIndexedDb('text', ''));

    expect(boolHook.result.current[0]).toBe(true);
    expect(numberHook.result.current[0]).toBe(42);
    expect(textHook.result.current[0]).toBe('legacy-value');
  });

  it('keeps persisted empty-string values instead of replacing them with defaults', () => {
    localStorage.setItem('nickname', '');

    const { result } = renderHook(() => useIndexedDb('nickname', 'Guest'));

    expect(result.current[0]).toBe('');
    expect(localStorage.getItem('nickname')).toBe('');
  });

  it('persists falsy updates (0, false, empty string)', async () => {
    const numberHook = renderHook(() => useIndexedDb('n', 1));
    const boolHook = renderHook(() => useIndexedDb('b', true));
    const textHook = renderHook(() => useIndexedDb('s', 'hello'));

    act(() => {
      numberHook.result.current[1](0);
      boolHook.result.current[1](false);
      textHook.result.current[1]('');
    });

    await waitFor(() => {
      expect(localStorage.getItem('n')).toBe('0');
      expect(localStorage.getItem('b')).toBe('false');
      expect(localStorage.getItem('s')).toBe('');
    });
  });
});
