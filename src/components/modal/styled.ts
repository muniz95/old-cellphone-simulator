import styled from 'styled-components';

const ModalContainer = styled.div<{ showModal: boolean; color: string }>`
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  text-align: center;
  background-color: ${({ color }) => color};
  display: ${({ showModal }) => (showModal ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;

  & input[type='checkbox'] {
    height: 0;
    width: 0;
  }

  & input[type='checkbox'] + label {
    position: relative;
    display: flex;
    margin: 0.6em 0;
    align-items: center;
    color: #9e9e9e;
    transition: color 250ms cubic-bezier(0.4, 0, 0.23, 1);
  }

  & input[type='checkbox'] + label > ins {
    position: absolute;
    display: block;
    bottom: 0;
    left: 2em;
    height: 0;
    width: 100%;
    // overflow: hidden;
    text-decoration: none;
    transition: height 300ms cubic-bezier(0.4, 0, 0.23, 1);
  }

  & input[type='checkbox'] + label > ins > i {
    position: absolute;
    bottom: 0;
    font-style: normal;
    color: #000000d6;
  }

  & input[type='checkbox'] + label > span {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1em;
    width: 1em;
    height: 1em;
    background: transparent;
    border: 2px solid #9e9e9e;
    border-radius: 2px;
    cursor: pointer;
    transition: all 250ms cubic-bezier(0.4, 0, 0.23, 1);
  }

  & input[type='checkbox'] + label:hover,
  & input[type='checkbox']:focus + label {
    color: #fff;
  }

  & input[type='checkbox'] + label:hover > span,
  & input[type='checkbox']:focus + label > span {
    background: rgba(255, 255, 255, 0.1);
  }

  & input[type='checkbox']:checked + label > ins {
    height: 100%;
  }

  & input[type='checkbox']:checked + label > span {
    border: 2px dotted #34352d;
    animation: shrink-bounce 3000ms cubic-bezier(0.4, 0, 0.23, 1);
    background-color: ${({ color }) => color};
  }

  & input[type='checkbox']:checked + label > span:before {
    content: '';
    position: absolute;
    top: 0.6em;
    left: 0.2em;
    border-right: 7px solid transparent;
    border-bottom: 7px solid transparent;
    transform: rotate(14deg);
    transform-origin: 0% 100%;
    animation: checkbox-check 125ms 2500ms cubic-bezier(0.4, 0, 0.23, 1)
      forwards;
  }

  @keyframes shrink-bounce {
    0% {
      transform: scale(1);
    }
    33% {
      transform: scale(0.85);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes checkbox-check {
    0% {
      width: 0;
      height: 0;
      border-color: #212121;
      transform: translate3d(0, 0, 0) rotate(45deg);
    }
    33% {
      width: 0.2em;
      height: 0;
      transform: translate3d(0, 0, 0) rotate(45deg);
    }
    100% {
      width: 0.2em;
      height: 0.5em;
      border-color: #212121;
      transform: translate3d(0, -0.5em, 0) rotate(45deg);
    }
  }
`;

const S = {
  ModalContainer,
};

export default S;
