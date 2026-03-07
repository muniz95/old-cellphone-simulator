import styled from 'styled-components';

const BlinkContainer = styled.div<{ isVisible: boolean }>`
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`;

const S = {
  BlinkContainer,
};

export default S;
