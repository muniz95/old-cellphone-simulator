import { useRoutes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './App.css';
import BatteryStatus from '@/components/battery-status';
import BottomBar from '@/components/BottomBar';
import Modal from '@/components/Modal';
import SignalStatus from '@/components/SignalStatus';
import TopBar from '@/components/TopBar';
import settingsService from '@/services/setting.service';
import defaultValues from '@/defaults';

import routes from '@/routes';
import Startup from '@/components/Startup';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from './context/global/context';

const App = () => {
  const dispatch = useDispatch();
  const routing = useRoutes([...routes]);

  const { backlightLevel, setBacklightLevel, color, setColor } =
    useContext(GlobalContext);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    const defaultColor = settingsService.getColor() || defaultValues.color;
    setColor(defaultColor);

    const defaultBacklightLevel =
      settingsService.getBacklightLevel() || defaultValues.backlightLevel;
    setBacklightLevel(defaultBacklightLevel);
  }, [dispatch, setBacklightLevel, setColor]);

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
        <Startup color={color} />
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
