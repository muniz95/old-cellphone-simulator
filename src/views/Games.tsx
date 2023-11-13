import React from "react";
import { useDispatch } from "react-redux";
import { setSecondLevel } from "../redux/actions";

const Games = () => {
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
      Games
    </div>
  )
};

export default Games;
