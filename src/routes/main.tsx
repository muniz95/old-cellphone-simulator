import Home from "../views/Home";
import Messages from "../views/Messages";
import Chat from "../views/Chat";
import CallRegister from "../views/CallRegister";
import Tones from "../views/Tones";
import CallDivert from "../views/CallDivert";
import Games from "../views/Games";
import Calculator from "../views/Calculator";
import Reminders from "../views/Reminders";
import Clock from "../views/Clock";
import Profiles from "../views/Profiles";
import SimServices from "../views/SimServices";
import { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/messages", element: <Messages /> },
  { path: "/chat", element: <Chat /> },
  { path: "/callregister", element: <CallRegister /> },
  { path: "/tones", element: <Tones /> },
  { path: "/calldivert", element: <CallDivert /> },
  { path: "/games", element: <Games /> },
  { path: "/calculator", element: <Calculator /> },
  { path: "/reminders", element: <Reminders /> },
  { path: "/clock", element: <Clock /> },
  { path: "/profiles", element: <Profiles /> },
  { path: "/simservices", element: <SimServices /> },
];

export default routes;
