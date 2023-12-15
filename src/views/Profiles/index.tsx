import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { openModal, setSecondLevel } from "redux/actions";
import service from "services/profile.service"
import { Profile } from "interfaces/profile";
import S from "./styled";
import vibration from "utils/vibration";
import { setCurrentProfile } from "redux/actions/profile";

const Profiles = () => {
  const { t } = useTranslation(['profiles']);
  const dispatch = useDispatch();
  
  const [profiles, setProfiles] = React.useState<Profile[]>([]);
  const [profile, setProfile] = React.useState<Profile | null>(null);

  const save = () => {
    service.applyProfile(profile!);
    dispatch(setCurrentProfile(profile!));
    vibration.success();
    dispatch(openModal());  
  }

  React.useEffect(() => {
    setProfiles(service.getProfiles());
    dispatch(setSecondLevel(0));    
  }, [dispatch]);
  return (
    <>
      <S.MainContainer>
      { profiles.map(x =>
          <S.ResultsBox onClick={() => setProfile(x)}>
            <S.Item>{ x.isFactoryProfile ? t(x.name as any) : x.name }</S.Item>
          </S.ResultsBox>
        ) }
      </S.MainContainer>
      <S.ButtonContainer>
        <button disabled={profile === null} onClick={save}>
          {t("save", { ns: 'global' })}
        </button>
      </S.ButtonContainer>
    </>
  )
}

export default Profiles;
