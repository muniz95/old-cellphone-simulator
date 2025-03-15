import { useState } from 'react';
import { defaultContext } from '../context';

type GlobalStateType = typeof defaultContext;

export const useGlobalState = () => {
  const [firstLevel, setFirstLevel] = useState(defaultContext.firstLevel);
  const [secondLevel, setSecondLevel] = useState(defaultContext.secondLevel);
  const [thirdLevel, setThirdLevel] = useState(defaultContext.thirdLevel);
  const [fourthLevel, setFourthLevel] = useState(defaultContext.fourthLevel);
  const [fifthLevel, setFifthLevel] = useState(defaultContext.fifthLevel);
  const [showModal, setShowModal] = useState(defaultContext.showModal);
  const [showStartupScreen, setShowStartupScreen] = useState(
    defaultContext.showStartupScreen
  );

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const openStartupScreen = () => {
    setShowStartupScreen(true);
  };
  const closeStartupScreen = () => {
    setShowStartupScreen(false);
  };

  const hook: GlobalStateType = {
    firstLevel,
    setFirstLevel,
    secondLevel,
    setSecondLevel,
    thirdLevel,
    setThirdLevel,
    fourthLevel,
    setFourthLevel,
    fifthLevel,
    setFifthLevel,
    showModal,
    openModal,
    closeModal,
    showStartupScreen,
    openStartupScreen,
    closeStartupScreen,
  };

  return hook;
};
