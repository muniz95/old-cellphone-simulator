import { useEffect, useRef, useState } from 'react';

export const useTimerController = () => {
  const [date, setDate] = useState(new Date());
  const timerId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerId.current = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, []);

  return date;
};
