import { useState, useEffect, useRef } from 'react';

const useTimer = () => {
  const [date, setDate] = useState(new Date());
  const timerID = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const tick = () => {
      setDate(new Date());
    };

    timerID.current = setInterval(tick, 1000);
    return () => {
      if (timerID.current) {
        clearInterval(timerID.current);
      }
    };
  }, []);

  useEffect(() => {
    return () => clearInterval(timerID.current as NodeJS.Timeout);
  }, []);

  return date;
};

export default useTimer;
