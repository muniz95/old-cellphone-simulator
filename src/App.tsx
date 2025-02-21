import * as React from 'react';
import { useRoutes } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import BatteryStatus from '@/components/BatteryStatus';
import BottomBar from '@/components/BottomBar';
import Modal from '@/components/Modal';
import SignalStatus from '@/components/SignalStatus';
import TopBar from '@/components/TopBar';
import settingsService from '@/services/setting.service';
import defaultValues from '@/defaults';

import routes from "@/routes";
import { charging, decrease, increase, uncharging } from '@/redux/actions/battery';
import { RootState } from '@/redux/reducers';
import * as settingsActions from '@/redux/actions/settings';
import Startup from '@/components/Startup';
import { useEffect, useState } from 'react';

const App = () => {
  const dispatch = useDispatch();

  const routing = useRoutes([...routes]);
  const [firstRender, setFirstRender] = useState(true);
  const state = useSelector((state: RootState) => state);

  const [color, setColor] = useState("");
  const [backlightLevel, setBacklightLevel] = useState(0);
  const [timeSpentOnPage, setTimeSpentOnPage] = useState(0);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeSpentOnPage(state => state + 1000);
    }, 1000);

    const defaultColor = settingsService.getColor() || defaultValues.color;
    setColor(defaultColor);
    dispatch(settingsActions.setColor(defaultColor));

    const defaultBacklightLevel =
      settingsService.getBacklightLevel() || defaultValues.backlightLevel;
    setBacklightLevel(defaultBacklightLevel);
    dispatch(settingsActions.setBacklightLevel(defaultBacklightLevel));

    return () => clearInterval(intervalId);
  }, [dispatch]);  
  useEffect(() => {
    if (timeSpentOnPage % 1000 === 0) {
      state.isRecharging
       ? dispatch(increase())
       : dispatch(decrease())
    }
  }, [timeSpentOnPage, state.isRecharging, dispatch]);
  useEffect(() => {
    if (state.batteryLevel <= 15) dispatch(charging())
    if (state.batteryLevel === 100) dispatch(uncharging())
  }, [state.batteryLevel, dispatch]);
  useEffect(() => {
    setColor(state.color);
  }, [state.color]);
  useEffect(() => {
    setBacklightLevel(100 - state.backlightLevel);
  }, [state.backlightLevel]);

  useEffect(() => {
    if (firstRender) {
      setTimeout(() => {
        setFirstRender(false);        
      }, 3000);
    }
  });

  const style = {
    backgroundColor: color,
    backgroundImage: `linear-gradient(rgb(0 0 0/${backlightLevel}%) 0 0)`,
  };

  return (
    <div className="App" style={style}>
      { 
        firstRender
        ? <Startup /> 
        : <>
            <SignalStatus />
            <div className="container">
              <TopBar />
              <div className="page-container">
                { routing }
              </div>
              <BottomBar />
            </div>
            <BatteryStatus />
            <Modal />
          </>
      }
    </div>
  );
};

export default App;
