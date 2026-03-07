import Home from '@/pages/Home';
import Messages from '@/pages/Messages';
import Chat from '@/pages/Chat';
import CallRegister from '@/pages/CallRegister';
import CallDivert from '@/pages/CallDivert';
import Games from '@/pages/Games';
import Reminders from '@/pages/Reminders';
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
