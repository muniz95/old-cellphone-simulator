import Home from '@/pages/Home';
import Messages from '@/pages/Messages';
import Chat from '@/pages/Chat';
import CallRegister from '@/pages/CallRegister';
import Tones from '@/features/tones';
import CallDivert from '@/pages/CallDivert';
import Games from '@/pages/Games';
import Reminders from '@/pages/Reminders';
import Clock from '@/features/clock';
import SimServices from '@/features/sim-services';
import { RouteObject } from 'react-router-dom';
import { Calculator } from '@/features/calculator';
import { profilesModule } from '@/features/profiles/module';

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
  ...profilesModule.routes,
  { path: '/simservices', element: <SimServices /> },
];

export default routes;
