import React from "react";
import Hammer from "react-hammerjs-18";
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import { setSecondLevel, setThirdLevel } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

const PhoneBook = () => {
  const { t } = useTranslation(['phonebook']);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatchSetSecondLevel = React.useCallback(
    (position: number) => dispatch(setSecondLevel(position + 1)),
    [dispatch]
  );
  const dispatchClearThirdLevel = React.useCallback(
    () => dispatch(setThirdLevel(0)),
    [dispatch]
  );
  const [menus,] = React.useState([
    { path: "/phonebook/search", title: t("searchTitle")},
    { path: "/phonebook/servicenos", title: t("servicenosTitle")},
    { path: "/phonebook/addname", title: t("addnameTitle")},
    { path: "/phonebook/erase", title: t("eraseTitle")},
    { path: "/phonebook/edit", title: t("editTitle")},
    { path: "/phonebook/assigntone", title: t("assigntoneTitle")},
    { path: "/phonebook/sendbcard", title: t("sendbcardTitle")},
    { path: "/phonebook/options", title: t("optionsTitle")},
    { path: "/phonebook/speeddials", title: t("speeddialsTitle")},
    { path: "/phonebook/voicetags", title: t("voicetagsTitle")}
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
    dispatchSetSecondLevel(position);
    dispatchClearThirdLevel();
  }, [dispatchSetSecondLevel, dispatchClearThirdLevel, position]);

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

export default PhoneBook;
