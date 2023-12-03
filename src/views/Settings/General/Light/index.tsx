import React from "react";
import { useDispatch } from "react-redux";
import { openModal, setFourthLevel } from "redux/actions";
import { setBacklightLevel, setInactivityTime } from "redux/actions/settings";
import settingsService from 'services/setting.service';
import S from "./styled";
import vibration from "utils/vibration";
import { useTranslation } from "react-i18next";

const LightSettings = () => {
  const { t } = useTranslation(['settings']);
  const dispatch = useDispatch();
  const [backlightLevel, setAppBacklightLevel] = React.useState(0);
  const [inactivityTime, setAppInactivityTime] = React.useState(0);
  
  React.useEffect(() => {
    dispatch(setFourthLevel(3));
  });

  const save = () => {
    settingsService.setBacklightLevel(backlightLevel);
    settingsService.setInactivityTime(inactivityTime);
    dispatch(setBacklightLevel(backlightLevel));
    dispatch(setInactivityTime(inactivityTime));
    vibration.success();
    dispatch(openModal());  
  }
  
  return (
    <>
      <S.MainContainer>
        <S.ControllerSection>
          <label htmlFor="backlight">{t("general.light.backlightLevel")}</label>
          <S.SliderInput step={10} min={20} max={100} id="backlight"
            onChange={({target}) => setAppBacklightLevel(target.valueAsNumber)} />
        </S.ControllerSection>
        <S.ControllerSection>
          <label htmlFor="inactivity">{t("general.light.inactiveAfter")}</label>
          <S.SliderInput step={30} min={0} max={600} id="inactivity"
            onChange={({target}) => setAppInactivityTime(target.valueAsNumber)} />
        </S.ControllerSection>
      </S.MainContainer>
      <S.ButtonContainer>
        <button onClick={save}>{t("save", { ns: 'global' })}</button>
      </S.ButtonContainer>
    </>
  );
};

export default LightSettings;
