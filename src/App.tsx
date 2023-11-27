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

  const [color, setColor] = React.useState("");
  const state = useSelector((state: RootState) => state);
  const [timeSpentOnPage, setTimeSpentOnPage] = React.useState(0);
  const { isRecharging, batteryLevel } = useSelector((state: RootState) => state);
  
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeSpentOnPage(state => state + 1000);
    }, 1000);

    const defaultColor = settingsService.getColor() || defaultValues.defaultColor;
    setColor(defaultColor);
    dispatch(settingsActions.setColor(defaultColor));

    return () => clearInterval(intervalId);
  }, [dispatch]);  
  React.useEffect(() => {
    if (timeSpentOnPage % 1000 === 0) {
      isRecharging
       ? dispatch(increase())
       : dispatch(decrease())
    }
  }, [timeSpentOnPage, isRecharging, dispatch]);
  React.useEffect(() => {
    if (batteryLevel <= 15) dispatch(charging())
    if (batteryLevel === 100) dispatch(uncharging())
  }, [batteryLevel, dispatch]);
  React.useEffect(() => {
    setColor(state.color);
  }, [state.color]);

  return (
    <div className="App" style={{backgroundColor: color}}>
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
