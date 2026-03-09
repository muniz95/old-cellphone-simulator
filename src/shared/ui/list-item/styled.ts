import styled, { css } from 'styled-components';
import { colors } from '@/shared/styles/tokens';
import { UiButton } from '@/shared/ui/controls';

const listItemLayout = css`
  min-height: 10%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4px;
`;

const Interactive = styled(UiButton)`
  ${listItemLayout}
  border: none;

  &:active,
  &:focus,
  &:focus-visible {
    font-weight: bold;
    background-color: ${colors.focusBackground};
    color: ${colors.textInverse};
  }
`;

const Static = styled.div`
  ${listItemLayout}
`;

const S = {
  Interactive,
  Static,
};

export default S;
