import * as React from 'react';
import { useRoutes } from 'react-router-dom';
import './App.css';
import BatteryStatus from './components/BatteryStatus';
import BottomBar from './components/BottomBar';
import Modal from './components/Modal';
import SignalStatus from './components/SignalStatus';
import TopBar from './components/TopBar';

import routes from "./routes";

const App = () => {
  const routing = useRoutes([...routes])
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
