import React from "react";
import { useDispatch } from "react-redux";
import { setSecondLevel } from "../../redux/actions";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import CurrentPageContainer from "components/CurrentPageContainer";

const Settings = () => {
  const { t } = useTranslation(['settings']);
  const navigate = useNavigate();
  const [menus,] = React.useState([
    { path: "/settings/call", title: t("callTitle")},
    { path: "/settings/general", title: t("general.title")},
    { path: "/settings/security", title: t("securityTitle")},
    { path: "/settings/restore", title: t("restore.title")},
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
    <CurrentPageContainer
      handleTap={handleTap}
      swipeLeft={swipeLeft}
      swipeRight={swipeRight}>
        {label.title}
    </CurrentPageContainer>
  )
}

export default Settings;
