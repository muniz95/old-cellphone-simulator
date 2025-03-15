import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMenuItems from './menu-items';
import Menu from './menu';
import { GlobalContext } from '@/context/global/context';

const PhoneBook = () => {
  const navigate = useNavigate();

  const { setSecondLevel, setThirdLevel } = useContext(GlobalContext);
  const dispatchSetSecondLevel = useCallback(
    (position: number) => setSecondLevel(position + 1),
    [setSecondLevel]
  );
  const dispatchClearThirdLevel = useCallback(
    () => setThirdLevel(0),
    [setThirdLevel]
  );
  const menus = useMenuItems();
  const [position, setPosition] = useState(0);

  const handleTap = () => {
    navigate(menus[position].path);
  };

  const swipeLeft = () => {
    setPosition(position === menus.length - 1 ? 0 : position + 1);
  };

  const swipeRight = () => {
    setPosition(position === 0 ? menus.length - 1 : position - 1);
  };

  useEffect(() => {
    dispatchSetSecondLevel(position);
    dispatchClearThirdLevel();
  }, [dispatchSetSecondLevel, dispatchClearThirdLevel, position]);

  return (
    <Menu
      menus={menus}
      position={position}
      onTap={handleTap}
      onSwipedLeft={swipeLeft}
      onSwipedRight={swipeRight}
    />
  );
};

export default PhoneBook;
