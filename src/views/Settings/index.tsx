import React from "react";
import Hammer from "react-hammerjs";
import { RouteComponentProps } from "react-router";

const Settings = ({history}: RouteComponentProps) => {
  const [menus,] = React.useState([
    { path: "/settings/call", title: "Call Settings" },
    { path: "/settings/general", title: "General settings" },
    { path: "/settings/security", title: "Security settings" },
    { path: "/settings/restore", title: "Restore factory settings" },
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

export default Settings;
