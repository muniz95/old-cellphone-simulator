import styled from 'styled-components';
import { colors } from '@/shared/styles/tokens';
import { UiButton, UiSlider } from '@/shared/ui/controls';

const MainContainer = styled.div`
  height: 80%;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  overflow: auto;
`;

const ButtonContainer = styled.div`
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ResultsBox = styled.div`
  min-height: 30%;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Item = styled(UiButton)`
  min-height: 10%;
  width: 100%;
  border: none;

  &:active,
  &:focus {
    font-weight: bold;
    background-color: ${colors.focusBackground};
    color: ${colors.textInverse};
  }
`;

const ControllerSection = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const SliderInput = styled(UiSlider)`
  width: 50vw;
`;

const S = {
  ButtonContainer,
  MainContainer,
  Item,
  ResultsBox,
  ControllerSection,
  SliderInput,
};

export default S;
