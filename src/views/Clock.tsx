import React from "react";
import '../styles/Home.scss';

const Clock = () => {
  const tick = () => {
    setDate(new Date());
  }
  const timerID: NodeJS.Timer = setInterval(tick, 1000);
  const [date, setDate] = React.useState(new Date());

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
