import styled from 'styled-components';
import { layout } from '@/shared/styles/tokens';

interface AppShellProps {
  backgroundColor: string;
  backlightLevel: number;
}

const AppShell = styled.div<AppShellProps>`
  text-align: center;
  display: flex;
  justify-content: space-between;
  height: ${layout.appHeight};
  background-color: ${({ backgroundColor }) => backgroundColor};
  background-image: ${({ backlightLevel }) =>
    `linear-gradient(rgb(0 0 0 / ${100 - backlightLevel}%) 0 0)`};
  transition: background-image 3000ms ease-in-out;
`;

const AppMainContainer = styled.div`
  width: ${layout.contentWidth};
  display: flex;
  flex-flow: column;
`;

const AppPageContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-flow: column;
`;

const S = {
  AppShell,
  AppMainContainer,
  AppPageContainer,
};

export default S;
