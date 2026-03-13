import styled from 'styled-components';

interface ContentProps {
  columns: number;
  dotGap: number;
  dotSize: number;
  rows: number;
}

interface DotProps {
  dotSize: number;
  isActive: boolean;
  inactiveOpacity: number;
}

const DotMatrixRoot = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  overflow: hidden;
`;

const Content = styled.div<ContentProps>`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: ${({ columns, dotSize }) =>
    `repeat(${columns}, ${dotSize}px)`};
  grid-template-rows: ${({ rows, dotSize }) => `repeat(${rows}, ${dotSize}px)`};
  gap: ${({ dotGap }) => `${dotGap}px`};
`;

const Dot = styled.div<DotProps>`
  width: ${({ dotSize }) => `${dotSize}px`};
  height: ${({ dotSize }) => `${dotSize}px`};
  background-color: rgb(
    0 0 0 /
      ${({ isActive, inactiveOpacity }) => (isActive ? 0.75 : inactiveOpacity)}
  );
  border-radius: 1px;
`;

const S = {
  Content,
  Dot,
  DotMatrixRoot,
};

export default S;
