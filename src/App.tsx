import { useRoutes } from 'react-router-dom';
import './App.css';
import BatteryStatus from '@/components/battery-status';
import BottomBar from '@/components/bottom-bar';
import Modal from '@/components/modal';
import SignalStatus from '@/components/signal-status';
import TopBar from '@/components/top-bar';

import routes from '@/routes';
import Startup from '@/components/startup';
import { useContext, useEffect, useState } from 'react';
import { SettingsContext } from './context/settings/context';

const App = () => {
  const routing = useRoutes([...routes]);

  const { backlightLevel, color } = useContext(SettingsContext);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (firstRender) {
      setTimeout(() => {
        setFirstRender(false);
      }, 3000);
    }
  });

  const style = {
    backgroundColor: color,
    backgroundImage: `linear-gradient(rgb(0 0 0/${100 - backlightLevel}%) 0 0)`,
  };

  return (
    <div className="App" style={style}>
      {firstRender ? (
        <Startup />
      ) : (
        <>
          <SignalStatus />
          <div className="container">
            <TopBar />
            <div className="page-container">{routing}</div>
            <BottomBar />
          </div>
          <BatteryStatus />
          <Modal />
        </>
      )}
    </div>
  );
};

export default App;
