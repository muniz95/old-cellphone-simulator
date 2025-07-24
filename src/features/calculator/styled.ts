import styled from 'styled-components';

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

const Key = styled.button`
  // Change to button
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none; // Remove default button background
  border: none; // Remove default button border
  cursor: pointer; // Add a pointer cursor for better UX
  padding: 0; // Remove default button padding
  box-sizing: border-box; // Important for consistent sizing

  &:not(:last-child) {
    // Add dotted borders to all but the last child
    border-bottom-style: dotted;
    border-right-style: dotted;
  }

  &::after {
    // add psuedo element to replace the inner div
    content: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 75%;
    height: 75%;
  }

  & > * {
    // hide the direct children
    display: none;
  }
`;

const S = {
  PageContainer,
  KeyboardContainer,
  Key,
};

export default S;
