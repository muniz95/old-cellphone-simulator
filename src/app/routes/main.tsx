import Home from '@/app/pages/Home';
import Messages from '@/app/pages/Messages';
import Chat from '@/app/pages/Chat';
import CallRegister from '@/app/pages/CallRegister';
import CallDivert from '@/app/pages/CallDivert';
import Games from '@/app/pages/Games';
import Reminders from '@/app/pages/Reminders';
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
