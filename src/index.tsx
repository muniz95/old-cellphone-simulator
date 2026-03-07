import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.scss';
import './i18n';
import { ensureInitialData } from '@/shared/lib/db';

ensureInitialData();

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
registerServiceWorker();
