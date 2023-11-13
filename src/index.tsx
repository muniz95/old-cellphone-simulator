import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './App';
import './index.scss';
import { store } from "./redux/store";
import registerServiceWorker from './registerServiceWorker';
import { checkDb, initDb } from "./utils/db";
import { BrowserRouter } from 'react-router-dom';

if (!checkDb()) {
  initDb();
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
