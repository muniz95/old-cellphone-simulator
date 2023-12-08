import React from "react";
import { useDispatch } from "react-redux";
import { setSecondLevel } from "../redux/actions";
import { useTranslation } from "react-i18next";
import { say } from "utils/sound";

const SimServices = () => {
  const { t } = useTranslation(['simservices']);
  const dispatch = useDispatch();
  const dispatchSetSecondLevel = React.useCallback(
    (position: number) => dispatch(setSecondLevel(position+1)),
    [dispatch]
  );
  
  React.useEffect(() => {
    dispatchSetSecondLevel(0);
    say("Hello");
  }, [dispatchSetSecondLevel]);
  return (
    <div className="home">
      {t("title")}
    </div>
  )
}

export default SimServices;
