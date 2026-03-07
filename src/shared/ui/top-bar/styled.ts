import styled from 'styled-components';
import { noSelect } from '@/shared/styles/mixins';

const TopBarContainer = styled.div`
  ${noSelect}
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  padding-top: 5px;
`;

const S = {
  TopBarContainer,
};

export default S;
