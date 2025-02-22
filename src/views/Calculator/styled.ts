import styled from 'styled-components';

export const KeyboardContainer = styled.div`
  display: flex;
  height: 50%;
  flex-flow: wrap;
`;

export const Key = styled.div`
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    border-bottom-style: dotted;
    border-right-style: dotted;
    border-top-style: none;
    border-left-style: none;
    padding: 5px;
    height: 75%;
    width: 75%;
    align-items: center;
    justify-content: center;
  }
`;

const S = {
  KeyboardContainer,
  Key,
};

export default S;
