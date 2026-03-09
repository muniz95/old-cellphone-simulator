import styled from 'styled-components';
import { UiButton, UiTextArea } from '@/shared/ui/controls';

const PageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  align-items: center;
`;

const KeyboardContainer = styled.div`
  display: flex;
  height: 50%;
  flex-flow: wrap;
  justify-content: space-around;
  width: 100%;
  gap: 8px;
`;

const Key = styled(UiButton)`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  box-sizing: border-box;

  &:not(:last-child) {
    border-bottom-style: dotted;
    border-right-style: dotted;
  }

  &::after {
    content: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 75%;
    height: 75%;
  }

  & > * {
    display: none;
  }
`;

const Display = styled(UiTextArea)`
  width: 100%;
  height: 80%;
`;

const S = {
  PageContainer,
  KeyboardContainer,
  Key,
  Display,
};

export default S;
