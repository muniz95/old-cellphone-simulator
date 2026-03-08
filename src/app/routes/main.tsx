import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('@/app/pages/home'));
const MessagesPage = lazy(() => import('@/app/pages/messages'));
const ChatPage = lazy(() => import('@/app/pages/chat'));
const CallRegisterPage = lazy(() => import('@/app/pages/call-register'));
const CallDivertPage = lazy(() => import('@/app/pages/call-divert'));
const GamesPage = lazy(() => import('@/app/pages/games'));
const RemindersPage = lazy(() => import('@/app/pages/reminders'));

const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/messages', element: <MessagesPage /> },
  { path: '/chat', element: <ChatPage /> },
  { path: '/callregister', element: <CallRegisterPage /> },
  { path: '/calldivert', element: <CallDivertPage /> },
  { path: '/games', element: <GamesPage /> },
  { path: '/reminders', element: <RemindersPage /> },
];

export default routes;
