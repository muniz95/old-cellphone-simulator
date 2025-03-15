import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux/store';
import registerServiceWorker from './registerServiceWorker';
import { checkDb, initDb } from './utils/db';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.scss';
import './i18n';
import { GlobalStateProvider } from './context/global/provider';

const container = document.getElementById('root');
const root = createRoot(container!);

if (!checkDb()) {
  initDb();
}

root.render(
  <BrowserRouter>
    <GlobalStateProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </GlobalStateProvider>
  </BrowserRouter>
);
registerServiceWorker();
