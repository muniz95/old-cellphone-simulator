import { useCallback, useEffect, useState } from 'react';
import { SettingsMenuItem } from '@/features/settings/domain/types';

interface CircularMenuControllerInput {
  menuItems: SettingsMenuItem[];
  setLevel: (position: number) => void;
  goTo: (path: string) => void;
  initialPosition?: number;
}

const clampPosition = (position: number, length: number) => {
  if (length <= 0) return 0;
  if (position < 0) return 0;
  if (position > length - 1) return length - 1;
  return position;
};

export const useCircularMenuController = ({
  menuItems,
  setLevel,
  goTo,
  initialPosition = 0,
}: CircularMenuControllerInput) => {
  const [position, setPosition] = useState(() =>
    clampPosition(initialPosition, menuItems.length)
  );

  useEffect(() => {
    const nextPosition = clampPosition(initialPosition, menuItems.length);
    setPosition((current) =>
      current === nextPosition ? current : nextPosition
    );
  }, [initialPosition, menuItems.length]);

  useEffect(() => {
    setLevel(position);
  }, [position, setLevel]);

  const onTap = useCallback(() => {
    const selected = menuItems[position];
    if (!selected) return;
    goTo(selected.path);
  }, [goTo, menuItems, position]);

  const onSwipedLeft = useCallback(() => {
    setPosition((current) =>
      current === menuItems.length - 1 ? 0 : current + 1
    );
  }, [menuItems.length]);

  const onSwipedRight = useCallback(() => {
    setPosition((current) =>
      current === 0 ? menuItems.length - 1 : current - 1
    );
  }, [menuItems.length]);

  const currentLabel = menuItems[position]?.title ?? '';

  return {
    currentLabel,
    onTap,
    onSwipedLeft,
    onSwipedRight,
  };
};
