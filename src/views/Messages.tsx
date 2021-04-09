import React from "react";
import { useDispatch } from "react-redux";
import { setSecondLevel } from "../redux/actions";

const Messages = () => {
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
      Messages View
    </div>
  )
}

export default Messages;
