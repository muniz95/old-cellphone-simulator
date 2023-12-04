import React from "react";
import { useDispatch } from "react-redux";
import { openModal, setFourthLevel } from "redux/actions";
import { setAlarmLevel, setNotificationLevel, setRingLevel } from "redux/actions/settings";
import settingsService from 'services/setting.service';
import S from "./styled";
import vibration from "utils/vibration";
import { useTranslation } from "react-i18next";

const SoundSettings = () => {
  const { t } = useTranslation(['settings']);
  const dispatch = useDispatch();
  const [notificationLevel, setAppNotificationLevel] = React.useState(0);
  const [alarmLevel, setAppAlarmLevel] = React.useState(0);
  const [ringLevel, setAppRingLevel] = React.useState(0);
  
  React.useEffect(() => {
    dispatch(setFourthLevel(3));
  });

  const save = () => {
    settingsService.setNotificationLevel(notificationLevel);
    settingsService.setAlarmLevel(alarmLevel);
    settingsService.setRingLevel(ringLevel);
    dispatch(setNotificationLevel(notificationLevel));
    dispatch(setAlarmLevel(alarmLevel));
    dispatch(setRingLevel(ringLevel));
    vibration.success();
    dispatch(openModal());  
  }
  
  return (
    <>
      <S.MainContainer>
        <S.ControllerSection>
          <label htmlFor="notification">{t("general.sound.notification")}</label>
          <S.SliderInput step={10} min={0} max={100} id="notification"
            onChange={({target}) => setAppNotificationLevel(target.valueAsNumber)} />
        </S.ControllerSection>
        <S.ControllerSection>
          <label htmlFor="alarm">{t("general.sound.alarm")}</label>
          <S.SliderInput step={10} min={0} max={100} id="alarm"
            onChange={({target}) => setAppAlarmLevel(target.valueAsNumber)} />
        </S.ControllerSection>
        <S.ControllerSection>
          <label htmlFor="ring">{t("general.sound.ring")}</label>
          <S.SliderInput step={10} min={0} max={100} id="ring"
            onChange={({target}) => setAppRingLevel(target.valueAsNumber)} />
        </S.ControllerSection>
      </S.MainContainer>
      <S.ButtonContainer>
        <button onClick={save}>{t("save", { ns: 'global' })}</button>
      </S.ButtonContainer>
    </>
  );
};

export default SoundSettings;
