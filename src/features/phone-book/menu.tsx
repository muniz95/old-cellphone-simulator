import React from 'react';
import CurrentPageContainer from '@/components/current-page-container';

interface MenuProps {
  menus: { path: string; title: string }[];
  position: number;
  onTap: () => void;
  onSwipedLeft: () => void;
  onSwipedRight: () => void;
}

const Menu: React.FC<MenuProps> = ({
  menus,
  position,
  onTap,
  onSwipedLeft,
  onSwipedRight,
}) => {
  const label = menus[position];

  return (
    <CurrentPageContainer
      onTap={onTap}
      onSwipedLeft={onSwipedLeft}
      onSwipedRight={onSwipedRight}
    >
      {label.title}
    </CurrentPageContainer>
  );
};

export default Menu;
