import React from "react";
import { useDispatch } from "react-redux";
import { setSecondLevel } from "../redux/actions";

const CallRegister = () => {
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
      Call Register View
    </div>
  )
};

export default CallRegister;
