import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import BatteryStatus from './components/BatteryStatus';
import Modal from './components/Modal';
import SignalStatus from './components/SignalStatus';
import TopBar from './components/TopBar';
import Calculator from './views/Calculator';
import CallDivert from './views/CallDivert';
import CallRegister from './views/CallRegister';
import Chat from './views/Chat';
import Clock from './views/Clock';
import Games from './views/Games';
import Home from './views/Home';
import Messages from './views/Messages';
import PhoneBook from './views/PhoneBook/Index';
import PhoneBookAddName from './views/PhoneBook/PhoneBookAddName';
import PhoneBookSearch from './views/PhoneBook/PhoneBookSearch';
import Profiles from './views/Profiles';
import Reminders from './views/Reminders';
import Settings from './views/Settings';
import SimServices from './views/SimServices';
import Tones from './views/Tones';

const App = () => {
  return (
    <Router>
      <div className="App">
        <SignalStatus />
        <div className="container">
          <div className="page-container">
            <TopBar />
            <Switch>
              <Route exact={true} path='/' component={Home} />
              <Route path="/phonebook/addname" component={PhoneBookAddName} />
              <Route path="/phonebook/search" component={PhoneBookSearch} />
              <Route path="/phonebook" component={PhoneBook} />
              <Route path="/messages" component={Messages} />
              <Route path="/chat" component={Chat} />
              <Route path="/callregister" component={CallRegister} />
              <Route path="/tones" component={Tones} />
              <Route path="/settings" component={Settings} />
              <Route path="/calldivert" component={CallDivert} />
              <Route path="/games" component={Games} />
              <Route path="/calculator" component={Calculator} />
              <Route path="/reminders" component={Reminders} />
              <Route path="/clock" component={Clock} />
              <Route path="/profiles" component={Profiles} />
              <Route path="/simservices" component={SimServices} />
            </Switch>
          </div>
        </div>
        <BatteryStatus />
        <Modal />
      </div>
    </Router>
  );
};

export default App;
