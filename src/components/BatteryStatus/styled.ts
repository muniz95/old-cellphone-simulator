import styled from "styled-components";

const BatteryStatus = styled.div`
  text-align: right;
  width: 15%;
  padding: 5px;
`;

const StatusBar = styled.div<{ isVisible: boolean }>`
  background-color: ${({isVisible}) => isVisible ? '#000000d6' : '00000000'};
  display: inline-block;
  margin: 1px;
`;

const S = {
  BatteryStatus,
  StatusBar,
}

export default S;
