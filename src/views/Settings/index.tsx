import React from "react";
import Hammer from "react-hammerjs-18";
import { useDispatch } from "react-redux";
import { setSecondLevel } from "../../redux/actions";
import { useNavigate } from "react-router";

const Settings = () => {
  const navigate = useNavigate();
  const [menus,] = React.useState([
    { path: "/settings/call", title: "Call Settings" },
    { path: "/settings/general", title: "General settings" },
    { path: "/settings/security", title: "Security settings" },
    { path: "/settings/restore", title: "Restore factory settings" },
  ]);
  const [position, setPosition] = React.useState(0)
  
  const dispatch = useDispatch();
  const dispatchSetSecondLevel = React.useCallback(
    (position: number) => dispatch(setSecondLevel(position+1)),
    [dispatch]
  );
  
  React.useEffect(() => {
    dispatchSetSecondLevel(position);
    
  }, [dispatchSetSecondLevel, position]);

  const handleTap = () => {
    navigate(menus[position].path);
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
