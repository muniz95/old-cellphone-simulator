import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSecondLevel } from '@/redux/actions';

const Clock = () => {
  const tick = () => {
    setDate(new Date());
  };
  const timerID = setInterval(tick, 1000);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const dispatchSetSecondLevel = useCallback(
    (position: number) => dispatch(setSecondLevel(position + 1)),
    [dispatch]
  );

  useEffect(() => {
    dispatchSetSecondLevel(0);
  }, [dispatchSetSecondLevel]);

  useEffect(() => {
    return () => clearInterval(timerID);
  });

  return (
    <div className="home">
      <h1>{`${date.toLocaleTimeString('pt-br')}`}</h1>
    </div>
  );
};

export default Clock;
