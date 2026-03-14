import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

const DATABASE_NAME = 'old-cellphone-simulator';
const DATABASE_VERSION = 1;
const STORE_NAME = 'key-value-store';

const memoryStorage: Record<string, string> = {};
const cache = new Map<string, string | null>();

const fallbackStorage: Pick<Storage, 'getItem' | 'setItem'> = {
  getItem: (key: string) => memoryStorage[key] ?? null,
  setItem: (key: string, value: string) => {
    memoryStorage[key] = value;
  },
};

let databasePromise: Promise<IDBDatabase> | null = null;

const hasIndexedDbSupport = () =>
  typeof globalThis !== 'undefined' && 'indexedDB' in globalThis;

const resolveLegacyStorage = (): Pick<Storage, 'getItem' | 'setItem'> => {
  const storage = globalThis?.localStorage as Partial<Storage> | undefined;
  const hasStorageInterface =
    typeof storage?.getItem === 'function' &&
    typeof storage?.setItem === 'function';

  if (hasStorageInterface) {
    return storage as Pick<Storage, 'getItem' | 'setItem'>;
  }

  return fallbackStorage;
};

const openDatabase = () => {
  if (!hasIndexedDbSupport()) {
    return Promise.reject(new Error('IndexedDB is not supported.'));
  }

  if (databasePromise) {
    return databasePromise;
  }

  databasePromise = new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      const database = request.result;

      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME);
      }
    };
  });

  return databasePromise;
};

const runTransaction = async <T>(
  mode: IDBTransactionMode,
  operation: (store: IDBObjectStore, resolve: (value: T) => void) => IDBRequest
) => {
  const database = await openDatabase();

  return new Promise<T>((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, mode);
    const store = transaction.objectStore(STORE_NAME);
    const request = operation(store, resolve);

    request.onerror = () => reject(request.error);
    transaction.onerror = () => reject(transaction.error);
  });
};

const readFromIndexedDb = (key: string) =>
  runTransaction<string | null>('readonly', (store, resolve) => {
    const request = store.get(key);
    request.onsuccess = () =>
      resolve((request.result as string | undefined) ?? null);
    return request;
  });

const writeToIndexedDb = (key: string, value: string) =>
  runTransaction<void>('readwrite', (store, resolve) => {
    const request = store.put(value, key);
    request.onsuccess = () => resolve();
    return request;
  });

const handleStoredValue = <T>(value: T) => {
  try {
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    return `${value}`;
  } catch (error) {
    console.error(error);
    return `${value}`;
  }
};

const parseStoredValue = <T>(item: string | null, fallbackValue: T) => {
  if (item === null) {
    return fallbackValue;
  }

  try {
    return JSON.parse(item) as T;
  } catch {
    if (item.toLowerCase() === 'true') {
      return true as T;
    }

    if (item.toLowerCase() === 'false') {
      return false as T;
    }

    if (item === '') {
      return item as T;
    }

    const number = Number(item);
    if (!Number.isNaN(number)) {
      return number as T;
    }

    return item as T;
  }
};

const resolveStateValue = <T>(value: SetStateAction<T>, currentValue: T) =>
  typeof value === 'function'
    ? (value as (previousValue: T) => T)(currentValue)
    : value;

const resolveInitialStoredItem = <T>(key: string, fallbackValue: T) => {
  if (cache.has(key)) {
    return cache.get(key) ?? null;
  }

  if (!hasIndexedDbSupport()) {
    const storage = resolveLegacyStorage();
    const item = storage.getItem(key);

    if (item === null) {
      const serializedFallbackValue = handleStoredValue(fallbackValue);
      storage.setItem(key, serializedFallbackValue);
      cache.set(key, serializedFallbackValue);
      return serializedFallbackValue;
    }

    cache.set(key, item);
    return item;
  }

  return null;
};

const persistValue = async (key: string, value: string) => {
  cache.set(key, value);

  if (hasIndexedDbSupport()) {
    try {
      await writeToIndexedDb(key, value);
      return;
    } catch (error) {
      console.error(error);
    }
  }

  resolveLegacyStorage().setItem(key, value);
};

const readPersistedValue = async (key: string) => {
  if (cache.has(key)) {
    return cache.get(key) ?? null;
  }

  if (hasIndexedDbSupport()) {
    try {
      const indexedDbValue = await readFromIndexedDb(key);

      if (indexedDbValue !== null) {
        cache.set(key, indexedDbValue);
        return indexedDbValue;
      }
    } catch (error) {
      console.error(error);
    }
  }

  const legacyValue = resolveLegacyStorage().getItem(key);
  cache.set(key, legacyValue);

  if (legacyValue !== null && hasIndexedDbSupport()) {
    try {
      await writeToIndexedDb(key, legacyValue);
    } catch (error) {
      console.error(error);
    }
  }

  return legacyValue;
};

export const initializeIndexedDbValues = async (
  defaults: Record<string, unknown>
) => {
  await Promise.all(
    Object.entries(defaults).map(async ([key, defaultValue]) => {
      const persistedValue = await readPersistedValue(key);

      if (persistedValue === null) {
        await persistValue(key, handleStoredValue(defaultValue));
      }
    })
  );
};

export const resetIndexedDbCache = () => {
  cache.clear();
  databasePromise = null;
  Object.keys(memoryStorage).forEach((key) => delete memoryStorage[key]);
};

const useIndexedDb = <T>(
  key: string,
  value: T
): [T, Dispatch<SetStateAction<T>>] => {
  const initialItem = resolveInitialStoredItem(key, value);
  const hasHydratedValue = initialItem !== null || cache.has(key);
  const [storedValue, setStoredValue] = useState<T>(() =>
    parseStoredValue(initialItem, value)
  );
  const [isReady, setIsReady] = useState(hasHydratedValue);
  const hasLocalOverride = useRef(false);

  useEffect(() => {
    let active = true;

    if (!isReady) {
      readPersistedValue(key)
        .then(async (persistedValue) => {
          if (persistedValue === null) {
            const serializedDefaultValue = handleStoredValue(value);
            await persistValue(key, serializedDefaultValue);

            if (active && !hasLocalOverride.current) {
              setStoredValue(value);
            }

            if (active) {
              setIsReady(true);
            }

            return;
          }

          if (active && !hasLocalOverride.current) {
            setStoredValue(parseStoredValue(persistedValue, value));
          }

          if (active) {
            setIsReady(true);
          }
        })
        .catch((error) => console.error(error));
    }

    return () => {
      active = false;
    };
  }, [isReady, key, value]);

  useEffect(() => {
    if (!isReady || storedValue === undefined) {
      return;
    }

    persistValue(key, handleStoredValue(storedValue)).catch((error) =>
      console.error(error)
    );
  }, [isReady, key, storedValue]);

  const setIndexedDbValue: Dispatch<SetStateAction<T>> = (nextValue) => {
    hasLocalOverride.current = true;
    setIsReady(true);
    setStoredValue((currentValue) =>
      resolveStateValue(nextValue, currentValue)
    );
  };

  return [storedValue, setIndexedDbValue];
};

export default useIndexedDb;
