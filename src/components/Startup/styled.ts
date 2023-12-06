import styled from "styled-components";

const StartupContainer = styled.div<{ color: string }>`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: ${({color}) => color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const S = {
  StartupContainer,
};

export default S;