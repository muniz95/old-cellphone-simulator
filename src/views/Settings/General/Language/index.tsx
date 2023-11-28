import React from "react";
import { useDispatch } from "react-redux";
import { openModal, setFourthLevel } from "redux/actions";
import { setLanguage } from "redux/actions/settings";
import settingsService from 'services/setting.service';
import S from "./styled";
import vibration from "utils/vibration";

const LANGUAGES = [
  { title: 'Deustch', iso639: 'de' },
  { title: 'English', iso639: 'en' },
  { title: 'Español', iso639: 'es' },
  { title: 'Esperanto', iso639: 'eo' },
  { title: 'Français', iso639: 'fr' },
  { title: 'Italiano', iso639: 'it' },
  { title: 'Polski', iso639: 'pl' },
  { title: 'Português', iso639: 'pt' },
  { title: 'русский', iso639: 'ru' },
];

const LanguageSettings = () => {
  const dispatch = useDispatch();
  const [language, setAppLanguage] = React.useState("");
  
  React.useEffect(() => {
    dispatch(setFourthLevel(3));
  });

  const save = () => {
    settingsService.setLanguage(language);
    dispatch(setLanguage(language));
    vibration.success();
    dispatch(openModal());  
  }
  
  return (
    <>
      <S.MainContainer>
        { LANGUAGES.map(x =>
          <S.ResultsBox onClick={() => setAppLanguage(x.iso639)}>
            <S.Item>{ x.title }</S.Item>
          </S.ResultsBox>
        ) }
      </S.MainContainer>
      <S.ButtonContainer>
        <button disabled={language === ""} onClick={save}>Save</button>
      </S.ButtonContainer>
    </>
  );
};

export default LanguageSettings;
