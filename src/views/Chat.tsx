import React from "react";
import { useDispatch } from "react-redux";
import { setSecondLevel } from "../redux/actions";
import { useTranslation } from "react-i18next";
import VoiceCall from "components/VoiceCall";

const Chat = () => {
  const { t } = useTranslation(['chat']);
  const dispatch = useDispatch();
  const dispatchSetSecondLevel = React.useCallback(
    (position: number) => dispatch(setSecondLevel(position+1)),
    [dispatch]
  );
  
  React.useEffect(() => {
    dispatchSetSecondLevel(0);
    
  }, [dispatchSetSecondLevel]);
  return (
    // <div className="home">
    //   {t("title")}
    // </div>
    <VoiceCall contactName="Teste" type="received" />
  )
};

export default Chat;
