import * as React from 'react';
import { useRoutes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import BatteryStatus from '@/components/battery-status';
import BottomBar from '@/components/BottomBar';
import Modal from '@/components/Modal';
import SignalStatus from '@/components/SignalStatus';
import TopBar from '@/components/TopBar';
import settingsService from '@/services/setting.service';
import defaultValues from '@/defaults';

import routes from '@/routes';
import { RootState } from '@/redux/reducers';
import * as settingsActions from '@/redux/actions/settings';
import Startup from '@/components/Startup';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from './context/global/context';

const App = () => {
  const dispatch = useDispatch();

  const { backlightLevel, setBacklightLevel } = useContext(GlobalContext);

  const routing = useRoutes([...routes]);
  const [firstRender, setFirstRender] = useState(true);
  const state = useSelector((state: RootState) => state);

  const [color, setColor] = useState('');

  useEffect(() => {
    const defaultColor = settingsService.getColor() || defaultValues.color;
    setColor(defaultColor);
    dispatch(settingsActions.setColor(defaultColor));

    const defaultBacklightLevel =
      settingsService.getBacklightLevel() || defaultValues.backlightLevel;
    setBacklightLevel(defaultBacklightLevel);
  }, [dispatch, setBacklightLevel]);
  useEffect(() => {
    setColor(state.color);
  }, [state.color]);

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
