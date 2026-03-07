import Home from '@/pages/Home';
import Messages from '@/pages/Messages';
import Chat from '@/pages/Chat';
import CallRegister from '@/pages/CallRegister';
import Tones from '@/features/tones';
import CallDivert from '@/pages/CallDivert';
import Games from '@/pages/Games';
import Reminders from '@/pages/Reminders';
import SimServices from '@/features/sim-services';
import { RouteObject } from 'react-router-dom';
import { profilesModule } from '@/features/profiles/module';
import { calculatorModule } from '@/features/calculator/module';
import { clockModule } from '@/features/clock/module';

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/messages', element: <Messages /> },
  { path: '/chat', element: <Chat /> },
  { path: '/callregister', element: <CallRegister /> },
  { path: '/tones', element: <Tones /> },
  { path: '/calldivert', element: <CallDivert /> },
  { path: '/games', element: <Games /> },
  ...calculatorModule.routes,
  { path: '/reminders', element: <Reminders /> },
  ...clockModule.routes,
  ...profilesModule.routes,
  { path: '/simservices', element: <SimServices /> },
];

export default routes;
