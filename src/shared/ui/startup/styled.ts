import styled from 'styled-components';

const StartupContainer = styled.div<{ color: string }>`
  position: fixed;
  display: flex;
  inset: 0;
  background-color: ${({ color }) => color};
  place-content: center;
  place-items: center;
`;

const StartupLabel = styled.div`
  color: rgb(0 0 0 / 75%);
  font-size: 28px;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const S = {
  StartupLabel,
  StartupContainer,
};

export default S;
