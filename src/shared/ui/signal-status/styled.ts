import styled from 'styled-components';
import { colors } from '@/shared/styles/tokens';
import { noSelect } from '@/shared/styles/mixins';

const SignalStatus = styled.div`
  ${noSelect}
  text-align: left;
  width: 15%;
  padding: 5px;
`;

const StatusBar = styled.div`
  background-color: ${colors.textPrimary};
  /* color: #B9C38E; */
  display: inline-block;
  margin: 1px;
`;

const S = {
  SignalStatus,
  StatusBar,
};

export default S;
