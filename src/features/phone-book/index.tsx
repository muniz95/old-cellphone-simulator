import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSecondLevel, setThirdLevel } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import useMenuItems from './menu-items';
import Menu from './menu';

const PhoneBook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatchSetSecondLevel = useCallback(
    (position: number) => dispatch(setSecondLevel(position + 1)),
    [dispatch]
  );
  const dispatchClearThirdLevel = useCallback(
    () => dispatch(setThirdLevel(0)),
    [dispatch]
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
