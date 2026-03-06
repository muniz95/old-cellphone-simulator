import { useRoutes } from 'react-router-dom';
import './App.css';
import BatteryStatus from '@/components/battery-status';
import BottomBar from '@/components/bottom-bar';
import Modal from '@/components/modal';
import SignalStatus from '@/components/signal-status';
import TopBar from '@/components/top-bar';

import routes from '@/routes';
import Startup from '@/components/startup';
import { useEffect, useState } from 'react';
import { useSettingsStore } from '@/features/settings/state/settings-store';

const App = () => {
  const routing = useRoutes([...routes]);

  const backlightLevel = useSettingsStore((state) => state.backlightLevel);
  const color = useSettingsStore((state) => state.color);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFirstRender(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

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
