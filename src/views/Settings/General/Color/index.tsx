import React from "react";
import { useDispatch } from "react-redux";
import { openModal, setFourthLevel } from "redux/actions";
import { setColor } from "redux/actions/settings";
import settingsService from 'services/setting.service';
import S from "./styled";
import vibration from "utils/vibration";

const ColorSettings = () => {
  const dispatch = useDispatch();
  const [appColor, setAppColor] = React.useState("");
  
  React.useEffect(() => {
    dispatch(setFourthLevel(1));
  });

  const save = () => {
    settingsService.setColor(appColor);
    dispatch(setColor(appColor));
    vibration.success();
    dispatch(openModal());  
  }
  
  return (
    <>
      <S.MainContainer>
        <S.ResultsBox onClick={() => setAppColor('#c0b400')}>Default</S.ResultsBox>
        <S.ResultsBox onClick={() => setAppColor('#0d48eb')}>Blue</S.ResultsBox>
        <S.ResultsBox onClick={() => setAppColor('#c7c7c7')}>Gray</S.ResultsBox>
        <S.ResultsBox onClick={() => setAppColor('#46c000')}>Green</S.ResultsBox>
        <S.ResultsBox onClick={() => setAppColor('#f3a34c')}>Orange</S.ResultsBox>
        <S.ResultsBox onClick={() => setAppColor('#f74bda')}>Purple</S.ResultsBox>
        <S.ResultsBox onClick={() => setAppColor('#f53737')}>Red</S.ResultsBox>
        <S.ResultsBox onClick={() => setAppColor('#3785eb')}>Teal</S.ResultsBox>
        <S.ResultsBox onClick={() => setAppColor('#f5e93e')}>Yellow</S.ResultsBox>
      </S.MainContainer>
      <div>
        <button disabled={appColor === ""} onClick={save}>Save</button>
      </div>
    </>
  );
};

export default ColorSettings;
