import React from "react";
import Hammer from 'react-hammerjs-18';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFifthLevel, setFirstLevel, setFourthLevel, setSecondLevel, setThirdLevel } from "../redux/actions";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatchSetFirstLevel = React.useCallback(
    (position: number) => dispatch(setFirstLevel(position+1)),
    [dispatch]
  );
  const dispatchResetPageIndicator = React.useCallback(
    () => {
      dispatch(setSecondLevel(0));
      dispatch(setThirdLevel(0));
      dispatch(setFourthLevel(0));
      dispatch(setFifthLevel(0));
    },
    [dispatch]
  );
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
    navigate(menus[position].path);
  }

  const swipeLeft = () => {
    setPosition(position === menus.length - 1 ? 0 : position + 1);
  }
  
  const swipeRight = () => {
    setPosition(position === 0 ? menus.length - 1 : position - 1);
  }
  
  React.useEffect(() => {
    dispatchSetFirstLevel(position);
  }, [dispatchSetFirstLevel, position])
  
  React.useEffect(dispatchResetPageIndicator);

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
