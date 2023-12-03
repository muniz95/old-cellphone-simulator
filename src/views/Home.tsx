import React from "react";
import Hammer from 'react-hammerjs-18';
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFifthLevel, setFirstLevel, setFourthLevel, setSecondLevel, setThirdLevel } from "../redux/actions";

const Home = () => {
  const { t } = useTranslation();
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
    { path: "/phonebook", title: t('home.phonebookTitle') },
    { path: "/messages", title: t("home.messagesTitle") },
    { path: "/chat", title: t("home.chatTitle") },
    { path: "/callregister", title: t("home.callregisterTitle") },
    { path: "/tones", title: t("home.tonesTitle") },
    { path: "/settings", title: t("home.settingsTitle") },
    { path: "/calldivert", title: t("home.calldivertTitle") },
    { path: "/games", title: t("home.gamesTitle") },
    { path: "/calculator", title: t("home.calculatorTitle") },
    { path: "/reminders", title: t("home.remindersTitle") },
    { path: "/clock", title: t("home.clockTitle") },
    { path: "/profiles", title: t("home.profilesTitle") },
    { path: "/simservices", title: t("home.simservicesTitle") }
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
