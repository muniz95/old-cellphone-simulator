import React from "react";
import { useDispatch } from "react-redux";
import { openModal, setFourthLevel } from "redux/actions";
import { setNotificationLevel } from "redux/actions/settings";
import settingsService from 'services/setting.service';
import S from "./styled";
import vibration from "utils/vibration";

const SoundSettings = () => {
  const dispatch = useDispatch();
  const [notificationLevel, setAppNotificationLevel] = React.useState(0);
  
  React.useEffect(() => {
    dispatch(setFourthLevel(3));
  });

  const save = () => {
    settingsService.setNotificationLevel(notificationLevel);
    dispatch(setNotificationLevel(notificationLevel));
    vibration.success();
    dispatch(openModal());  
  }
  
  return (
    <>
      <S.MainContainer>
        <S.SliderInput step={10} min={0} max={100}
          onChange={({target}) => setAppNotificationLevel(target.valueAsNumber)} />
      </S.MainContainer>
      <S.ButtonContainer>
        <button onClick={save}>Save</button>
      </S.ButtonContainer>
    </>
  );
};

export default SoundSettings;
