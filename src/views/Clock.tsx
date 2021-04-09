import React from "react";
import { useDispatch } from "react-redux";
import { setSecondLevel } from "../redux/actions";

const Clock = () => {
  const tick = () => {
    setDate(new Date());
  }
  const timerID: NodeJS.Timer = setInterval(tick, 1000);
  const [date, setDate] = React.useState(new Date());
  const dispatch = useDispatch();
  const dispatchSetSecondLevel = React.useCallback(
    (position) => dispatch(setSecondLevel(position+1)),
    [dispatch]
  );
  
  React.useEffect(() => {
    dispatchSetSecondLevel(0);
    
  }, [dispatchSetSecondLevel]);

  React.useEffect(() => {
    return () => clearInterval(timerID);
  });

  return (
    <div className="home">
      <h1>{`${date.toLocaleTimeString("pt-br")}`}</h1>
    </div>
  )
};

export default Clock;
