import * as React from 'react';
import { useRoutes } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import BatteryStatus from './components/BatteryStatus';
import BottomBar from './components/BottomBar';
import Modal from './components/Modal';
import SignalStatus from './components/SignalStatus';
import TopBar from './components/TopBar';
import settingsService from 'services/setting.service';
import defaultValues from 'defaults';

import routes from "./routes";
import { charging, decrease, increase, uncharging } from './redux/actions/battery';
import { RootState } from './redux/reducers';
import * as settingsActions from 'redux/actions/settings';

const App = () => {
  const dispatch = useDispatch();

  const routing = useRoutes([...routes]);
  const state = useSelector((state: RootState) => state);

  const [color, setColor] = React.useState("");
  const [backlightLevel, setBacklightLevel] = React.useState(0);
  const [timeSpentOnPage, setTimeSpentOnPage] = React.useState(0);
  
  React.useEffect(() => {
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
  React.useEffect(() => {
    if (timeSpentOnPage % 1000 === 0) {
      state.isRecharging
       ? dispatch(increase())
       : dispatch(decrease())
    }
  }, [timeSpentOnPage, state.isRecharging, dispatch]);
  React.useEffect(() => {
    if (state.batteryLevel <= 15) dispatch(charging())
    if (state.batteryLevel === 100) dispatch(uncharging())
  }, [state.batteryLevel, dispatch]);
  React.useEffect(() => {
    setColor(state.color);
  }, [state.color]);
  React.useEffect(() => {
    setBacklightLevel(state.backlightLevel);
  }, [state.backlightLevel]);

  const style = {
    backgroundColor: color,
    backgroundImage: `linear-gradient(rgb(0 0 0/${100 - backlightLevel}%) 0 0)`,
  };

  return (
    <div className="App" style={style}>
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
    </div>
  );
};

export default App;
