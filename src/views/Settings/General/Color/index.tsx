import React from "react";
import { useDispatch } from "react-redux";
import { openModal, setFourthLevel } from "redux/actions";
import { setColor } from "redux/actions/settings";
import settingsService from 'services/setting.service';
import S from "./styled";
import vibration from "utils/vibration";

const COLORS = [
  { title: 'Default', rgb: '#c0b400' },
  { title: 'Blue', rgb: '#0d48eb' },
  { title: 'Gray', rgb: '#c7c7c7' },
  { title: 'Green', rgb: '#46c000' },
  { title: 'Orange', rgb: '#f3a34c' },
  { title: 'Purple', rgb: '#f74bda' },
  { title: 'Red', rgb: '#f53737' },
  { title: 'Teal', rgb: '#3785eb' },
  { title: 'Yellow', rgb: '#f5e93e' },
];

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
      { COLORS.map(x =>
          <S.ResultsBox onClick={() => setAppColor(x.rgb)}>
            <S.Item>{ x.title }</S.Item>
          </S.ResultsBox>
        ) }
      </S.MainContainer>
      <S.ButtonContainer>
        <button disabled={appColor === ""} onClick={save}>Save</button>
      </S.ButtonContainer>
    </>
  );
};

export default ColorSettings;
