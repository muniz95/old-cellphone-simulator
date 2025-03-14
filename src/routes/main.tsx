import Home from '@/views/Home';
import Messages from '@/views/Messages';
import Chat from '@/views/Chat';
import CallRegister from '@/views/CallRegister';
import Tones from '@/features/tones';
import CallDivert from '@/views/CallDivert';
import Games from '@/views/Games';
import Reminders from '@/views/Reminders';
import Clock from '@/features/clock';
import Profiles from '@/features/profiles';
import SimServices from '@/features/sim-services';
import { RouteObject } from 'react-router-dom';
import { Calculator } from '@/features/calculator';

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/messages', element: <Messages /> },
  { path: '/chat', element: <Chat /> },
  { path: '/callregister', element: <CallRegister /> },
  { path: '/tones', element: <Tones /> },
  { path: '/calldivert', element: <CallDivert /> },
  { path: '/games', element: <Games /> },
  { path: '/calculator', element: <Calculator /> },
  { path: '/reminders', element: <Reminders /> },
  { path: '/clock', element: <Clock /> },
  { path: '/profiles', element: <Profiles /> },
  { path: '/simservices', element: <SimServices /> },
];

export default routes;
