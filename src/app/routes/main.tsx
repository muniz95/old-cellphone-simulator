import Home from '@/app/pages/home';
import Messages from '@/app/pages/messages';
import Chat from '@/app/pages/chat';
import CallRegister from '@/app/pages/call-register';
import CallDivert from '@/app/pages/call-divert';
import Games from '@/app/pages/games';
import Reminders from '@/app/pages/reminders';
import { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/messages', element: <Messages /> },
  { path: '/chat', element: <Chat /> },
  { path: '/callregister', element: <CallRegister /> },
  { path: '/calldivert', element: <CallDivert /> },
  { path: '/games', element: <Games /> },
  { path: '/reminders', element: <Reminders /> },
];

export default routes;
