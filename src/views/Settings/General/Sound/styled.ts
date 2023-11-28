import styled from "styled-components";

export const MainContainer = styled.div`
  height: 80%;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  overflow: auto;
`;

export const ButtonContainer = styled.div`
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ResultsBox = styled.div`
  min-height: 30%;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const SliderInput = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  width: 50vw;

  &::-webkit-slider-runnable-track, &::-moz-range-track {
    background: #053a5f;
    height: 0.5rem;
  }
`;

const S = {
  ButtonContainer,
  MainContainer,
  SliderInput,
  ResultsBox,
}

export default S;
