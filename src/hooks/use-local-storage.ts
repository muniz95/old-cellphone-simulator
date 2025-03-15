import { useEffect, useState } from 'react';

const handleStoredValue = (value: string | number | boolean | object) => {
  try {
    if (typeof value === 'object') return JSON.stringify(value);
    return value.toString();
  } catch (error) {
    console.error(error);
    return value.toString();
  }
};

const useLocalStorage = (
  key: string,
  value: string | number | boolean | object
) => {
  const [storedValue, setStoredValue] = useState(() => {
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
