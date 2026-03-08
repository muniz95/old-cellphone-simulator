import App from '@/app/app';
import { initPwa } from '@/app/lib/pwa';
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
initPwa();
