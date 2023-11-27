import React from "react";
import Hammer from "react-hammerjs-18";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setThirdLevel } from "redux/actions";

const menus = [
  { path: "/settings/general/color", title: "Color Settings" },
  { path: "/settings/general/language", title: "Language Settings" },
  { path: "/settings/general/light", title: "Light Settings" },
  { path: "/settings/general/sound", title: "Sound Settings" },
];

const GeneralSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [position, setPosition] = React.useState(0)
  const dispatchSetThirdLevel = React.useCallback(
    (position: number) => dispatch(setThirdLevel(position+1)),
    [dispatch]
  );
  
  React.useEffect(() => {
    dispatchSetThirdLevel(position);
    
  }, [dispatchSetThirdLevel, position]);

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
    dispatchSetThirdLevel(0);
  });
  
  const label = menus[position];
  return (
    <Hammer onTap={handleTap}
      onSwipeLeft={swipeLeft}
      onSwipeRight={swipeRight}>
      <div className="home">
        {label.title}
      </div>
    </Hammer>
  );
};

export default GeneralSettings;
