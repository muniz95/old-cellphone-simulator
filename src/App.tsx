import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import BatteryStatus from './components/BatteryStatus';
import BottomBar from './components/BottomBar';
import Modal from './components/Modal';
import SignalStatus from './components/SignalStatus';
import TopBar from './components/TopBar';

import routes from "./routes";

const App = () => {
  return (
    <Router>
      <div className="App">
        <SignalStatus />
        <div className="container">
          <div className="page-container">
            <TopBar />
            <Switch>
              { routes.map(route => <Route {...route} /> ) }
            </Switch>
          </div>
        </div>
        <BatteryStatus />
        <BottomBar />
        <Modal />
      </div>
    </Router>
  );
};

export default App;
