import React from "react";
import { useDispatch } from "react-redux";
import { setSecondLevel } from "../redux/actions";

const Chat = () => {
  const dispatch = useDispatch();
  const dispatchSetSecondLevel = React.useCallback(
    (position) => dispatch(setSecondLevel(position+1)),
    [dispatch]
  );
  
  React.useEffect(() => {
    dispatchSetSecondLevel(0);
    
  }, [dispatchSetSecondLevel]);
  return (
    <div className="home">
      Chat View
    </div>
  )
};

export default Chat;
