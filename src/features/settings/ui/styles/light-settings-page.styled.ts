import styled from 'styled-components';
import { colors } from '@/shared/styles/tokens';

const Controls = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.div`
  width: min(50vw, 280px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

const Value = styled.output`
  min-width: 52px;
  text-align: right;
  color: ${colors.textPrimary};
  font-weight: bold;
`;

const L = {
  Controls,
  Header,
  Value,
};

export default L;
