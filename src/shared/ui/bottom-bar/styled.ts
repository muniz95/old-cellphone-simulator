import styled from 'styled-components';
import { noSelect } from '@/shared/styles/mixins';

const BottomBarContainer = styled.div`
  ${noSelect}
  display: flex;
  justify-content: space-evenly;
  -moz-box-align: center;
  align-items: center;
  width: 100%;
  height: 50px;
`;

const S = {
  BottomBarContainer,
};

export default S;
