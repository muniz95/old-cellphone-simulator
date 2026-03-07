import { useCallback, useEffect, useState } from 'react';
import { SettingsMenuItem } from '@/features/settings/domain/types';

interface CircularMenuControllerInput {
  menuItems: SettingsMenuItem[];
  setLevel: (position: number) => void;
  goTo: (path: string) => void;
}

export const useCircularMenuController = ({
  menuItems,
  setLevel,
  goTo,
}: CircularMenuControllerInput) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (position > menuItems.length - 1) {
      setPosition(0);
    }
  }, [menuItems.length, position]);

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
