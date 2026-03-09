import styled from 'styled-components';
import { borders } from '@/shared/styles/tokens';
import { UiButton } from '@/shared/ui/controls';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 4px 8px;
  border-bottom-style: ${borders.dotted};
  border-bottom-width: 1px;
  font-size: 11px;
`;

const Message = styled.span`
  text-align: left;
`;

const ActionButton = styled(UiButton)`
  min-width: 64px;
  padding: 2px 6px;
  font-size: 11px;
`;

const S = {
  Container,
  Message,
  ActionButton,
};

export default S;
