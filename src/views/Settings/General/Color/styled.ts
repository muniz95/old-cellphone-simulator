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
  align-items: center;
  justify-content: center;
  display: flex;
`;

const S = {
  MainContainer,
  ResultsBox,
}

export default S;
