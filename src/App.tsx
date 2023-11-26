import * as React from 'react';
import { useRoutes } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import BatteryStatus from './components/BatteryStatus';
import BottomBar from './components/BottomBar';
import Modal from './components/Modal';
import SignalStatus from './components/SignalStatus';
import TopBar from './components/TopBar';

import routes from "./routes";
import { charging, decrease, increase, uncharging } from './redux/actions/battery';
import { RootState } from './redux/reducers';

const App = () => {
  const dispatch = useDispatch();
  const routing = useRoutes([...routes])
  const [timeSpentOnPage, setTimeSpentOnPage] = React.useState(0);
  const { isRecharging, batteryLevel } = useSelector((state: RootState) => state);
  
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeSpentOnPage(state => state + 1000);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  React.useEffect(() => {
    if (timeSpentOnPage % 60000 === 0) {
      isRecharging
       ? dispatch(increase())
       : dispatch(decrease())
    }
  }, [timeSpentOnPage, isRecharging, dispatch]);
  React.useEffect(() => {
    if (batteryLevel <= 15) dispatch(charging())
    if (batteryLevel === 100) dispatch(uncharging())
  }, [batteryLevel, dispatch]);

  return (
    <div className="App">
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
