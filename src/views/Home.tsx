import React from "react";
import Hammer from 'react-hammerjs';
import { RouteComponentProps } from "react-router";
import '../styles/Home.scss';

const Home = ({ history }: RouteComponentProps) => {
  const [menus,] = React.useState([
    { path: "/phonebook", title: "Phone Book" },
    { path: "/messages", title: "Messages" },
    { path: "/chat", title: "Chat" },
    { path: "/callregister", title: "Call Register" },
    { path: "/tones", title: "Tones" },
    { path: "/settings", title: "Settings" },
    { path: "/calldivert", title: "Call Divert" },
    { path: "/games", title: "Games" },
    { path: "/calculator", title: "Calculator" },
    { path: "/reminders", title: "Reminders" },
    { path: "/clock", title: "Clock" },
    { path: "/profiles", title: "Profiles" },
    { path: "/simservices", title: "SIM Services" }
  ]);
  const [position, setPosition] = React.useState(0)

  const handleTap = () => {
    history.push({
      pathname: menus[position].path
    });
  }

  const swipeLeft = () => {
    setPosition(position === menus.length - 1 ? 0 : position + 1);

  }

  const swipeRight = () => {
    setPosition(position === 0 ? menus.length - 1 : position - 1);
  }

  const label = menus[position];
  return (
    <Hammer onTap={handleTap}
      onSwipeLeft={swipeLeft}
      onSwipeRight={swipeRight}>
      <div className="home">
        {label.title}
      </div>
    </Hammer>
  )
}

export default Home;
