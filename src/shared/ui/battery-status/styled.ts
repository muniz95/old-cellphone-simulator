import styled from 'styled-components';
import { colors } from '@/shared/styles/tokens';
import { noSelect } from '@/shared/styles/mixins';

const BatteryStatus = styled.div`
  ${noSelect}
  text-align: right;
  width: 15%;
  padding: 5px;
`;

const StatusBar = styled.div<{ isVisible: boolean }>`
  background-color: ${({ isVisible }) =>
    isVisible ? colors.textPrimary : colors.transparent};
  display: inline-block;
  margin: 1px;
`;

const S = {
  BatteryStatus,
  StatusBar,
};

export default S;
