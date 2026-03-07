import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTranslation from '@/shared/hooks/use-translation';
import { buildPhoneBookMenu } from '@/features/phone-book/application/menus';
import { useUiStore } from '@/app/state/ui-store';

const clampPosition = (position: number, length: number) => {
  if (length <= 0) return 0;
  if (position < 0) return 0;
  if (position > length - 1) return length - 1;
  return position;
};

export const usePhoneBookMenuController = () => {
  const { t } = useTranslation(['phonebook']);
  const navigate = useNavigate();
  const secondLevel = useUiStore((state) => state.secondLevel);
  const setSecondLevel = useUiStore((state) => state.setSecondLevel);
  const setThirdLevel = useUiStore((state) => state.setThirdLevel);
  const menuItems = useMemo(() => buildPhoneBookMenu(t), [t]);
  const [position, setPosition] = useState(() =>
    clampPosition(secondLevel > 0 ? secondLevel - 1 : 0, menuItems.length)
  );

  useEffect(() => {
    const nextPosition = clampPosition(
      secondLevel > 0 ? secondLevel - 1 : 0,
      menuItems.length
    );
    setPosition((current) =>
      current === nextPosition ? current : nextPosition
    );
  }, [menuItems.length, secondLevel]);

  useEffect(() => {
    setSecondLevel(position + 1);
    setThirdLevel(0);
  }, [position, setSecondLevel, setThirdLevel]);

  const onTap = useCallback(() => {
    const selected = menuItems[position];
    if (!selected) return;
    navigate(selected.path);
  }, [menuItems, navigate, position]);

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

  return {
    label: menuItems[position]?.title ?? '',
    onTap,
    onSwipedLeft,
    onSwipedRight,
  };
};
