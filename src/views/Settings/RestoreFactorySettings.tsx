import React from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";
import { openModal } from "../../redux/actions";
import service from "../../services/setting.service";
import vibration from "../../utils/vibration";

const RestoreFactorySettings = ({history}: RouteComponentProps) => {
  const dispatch = useDispatch();
  const dispatchOpenModal = React.useCallback(
    () => dispatch(openModal()),
    [dispatch]
  );
  const resetData = () => {
    service.resetData();
    vibration.reset();
    dispatchOpenModal();
  };

  return (
    <div className="home">
      Reset factory settings?
      <div>
        <button onClick={resetData}>Yes</button>
        <button onClick={history.goBack}>No</button>
      </div>
    </div>
  );
};

export default RestoreFactorySettings;
