import App from '@/app/app';
import registerServiceWorker from '@/app/service-worker/register-service-worker';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import '@/app/providers/i18n';
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
