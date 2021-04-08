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

const routes = [
  { path: "/", exact: true, component: Home },
  { path: "/messages", exact: true, component: Messages },
  { path: "/chat", exact: true, component: Chat },
  { path: "/callregister", exact: true, component: CallRegister },
  { path: "/tones", exact: true, component: Tones },
  { path: "/calldivert", exact: true, component: CallDivert },
  { path: "/games", exact: true, component: Games },
  { path: "/calculator", exact: true, component: Calculator },
  { path: "/reminders", exact: true, component: Reminders },
  { path: "/clock", exact: true, component: Clock },
  { path: "/profiles", exact: true, component: Profiles },
  { path: "/simservices", exact: true, component: SimServices },
];

export default routes;
