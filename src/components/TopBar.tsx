import React from 'react';
import '../styles/TopBar.scss';
import PageIndicator from './PageIndicator';

const TopBar = () => {
  const tick = () => {
    setDate(new Date());
  }
  const timerID: NodeJS.Timer = setInterval(tick, 1000);

  const [date, setDate] = React.useState(new Date());

  React.useEffect(() => {
    return () => clearInterval(timerID);
  });

  return (
    <div className="top-bar noselect">
      <div>Lock</div>
      <PageIndicator />
      <div>{`${date.toLocaleTimeString().slice(0, 5)}`}</div>
    </div>
  );
}

export default TopBar;
