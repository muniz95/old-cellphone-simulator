import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './App';
import './index.scss';
import { store } from "./redux/store";
import registerServiceWorker from './registerServiceWorker';
import { checkDb, initDb } from "./utils/db";

if (!checkDb()) {
  initDb();
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
