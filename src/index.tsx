import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { checkDb, initDb } from './utils/db';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.scss';
import './i18n';
import AppContextProvider from './context';

const container = document.getElementById('root');
const root = createRoot(container!);

if (!checkDb()) {
  initDb();
}

root.render(
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
);
registerServiceWorker();
