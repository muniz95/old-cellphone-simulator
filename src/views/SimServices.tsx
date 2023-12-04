import React from "react";
import { useDispatch } from "react-redux";
import { setSecondLevel } from "../redux/actions";
import '../styles/Home.scss';
import { useTranslation } from "react-i18next";

const SimServices = () => {
  const { t } = useTranslation(['simservices']);
  const dispatch = useDispatch();
  const dispatchSetSecondLevel = React.useCallback(
    (position: number) => dispatch(setSecondLevel(position+1)),
    [dispatch]
  );
  
  React.useEffect(() => {
    dispatchSetSecondLevel(0);
    
  }, [dispatchSetSecondLevel]);
  return (
    <div className="home">
      {t("title")}
    </div>
  )
}

export default SimServices;
