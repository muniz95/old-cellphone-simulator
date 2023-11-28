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
        <S.ResultsBox onClick={() => setAppColor('#c0b400')}>
          <S.Item>Default</S.Item>
        </S.ResultsBox>
        <S.ResultsBox onClick={() => setAppColor('#0d48eb')}>
          <S.Item>Blue</S.Item>
        </S.ResultsBox>
        <S.ResultsBox onClick={() => setAppColor('#c7c7c7')}>
          <S.Item>Gray</S.Item>
        </S.ResultsBox>
        <S.ResultsBox onClick={() => setAppColor('#46c000')}>
          <S.Item>Green</S.Item>
        </S.ResultsBox>
        <S.ResultsBox onClick={() => setAppColor('#f3a34c')}>
          <S.Item>Orange</S.Item>
        </S.ResultsBox>
        <S.ResultsBox onClick={() => setAppColor('#f74bda')}>
          <S.Item>Purple</S.Item>
        </S.ResultsBox>
        <S.ResultsBox onClick={() => setAppColor('#f53737')}>
          <S.Item>Red</S.Item>
        </S.ResultsBox>
        <S.ResultsBox onClick={() => setAppColor('#3785eb')}>
          <S.Item>Teal</S.Item>
        </S.ResultsBox>
        <S.ResultsBox onClick={() => setAppColor('#f5e93e')}>
          <S.Item>Yellow</S.Item>
        </S.ResultsBox>
      </S.MainContainer>
      <S.ButtonContainer>
        <button disabled={appColor === ""} onClick={save}>Save</button>
      </S.ButtonContainer>
    </>
  );
};

export default ColorSettings;
