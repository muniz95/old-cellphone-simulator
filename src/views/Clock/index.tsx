import { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setSecondLevel } from '@/redux/actions';

const Clock = () => {
  const [date, setDate] = useState(new Date());
  const timerID = useRef<NodeJS.Timeout | null>(null);
  const tick = () => {
    setDate(new Date());
  };
  useEffect(() => {
    timerID.current = setInterval(tick, 1000);
    return () => {
      if (timerID.current) {
        clearInterval(timerID.current);
      }
    };
  }, []);
  const dispatch = useDispatch();
  const dispatchSetSecondLevel = useCallback(
    (position: number) => dispatch(setSecondLevel(position + 1)),
    [dispatch]
  );

  useEffect(() => {
    dispatchSetSecondLevel(0);
  }, [dispatchSetSecondLevel]);

  useEffect(() => {
    return () => clearInterval(timerID.current as NodeJS.Timeout);
  });

  return (
    <div className="home">
      <h1 id="time">{`${date.toLocaleTimeString('pt-br')}`}</h1>
    </div>
  );
};

export default Clock;
