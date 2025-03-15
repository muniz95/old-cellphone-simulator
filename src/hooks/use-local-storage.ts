import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const handleStoredValue = <T>(value: T) => {
  try {
    if (typeof value === 'object') return JSON.stringify(value);
    return `${value}`;
  } catch (error) {
    console.error(error);
    return `${value}`;
  }
};

const useLocalStorage = <T>(
  key: string,
  value: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        try {
          return JSON.parse(item);
        } catch {
          if (item.toLowerCase() === 'true') {
            return true;
          } else if (item.toLowerCase() === 'false') {
            return false;
          }

          const number = Number(item);
          if (!isNaN(number)) {
            return number;
          }

          return item;
        }
      } else {
        window.localStorage.setItem(key, handleStoredValue(value));
      }
    } catch (error) {
      console.error(error);
      return value;
    }
  });

  useEffect(() => {
    try {
      if (!storedValue) return;
      window.localStorage.setItem(key, handleStoredValue(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
