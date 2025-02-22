import styled from 'styled-components';

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

export const Item = styled.button`
  min-height: 30%;
  width: 100%;
  border: none;

  &:active,
  &:focus {
    font-weight: bold;
    background-color: #000000c6;
    color: #ffffffc6;
  }
`;

const S = {
  ButtonContainer,
  MainContainer,
  Item,
  ResultsBox,
};

export default S;
