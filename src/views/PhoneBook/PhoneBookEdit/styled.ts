import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  align-items: center;
`

export const ResultsBox = styled.div`
  min-height: 30%;
`;

const S = {
  Container,
  ResultsBox
}

export default S;