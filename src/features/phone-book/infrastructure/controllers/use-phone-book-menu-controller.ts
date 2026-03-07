import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTranslation from '@/shared/hooks/use-translation';
import { buildPhoneBookMenu } from '@/features/phone-book/application/menus';
import { useUiStore } from '@/app/state/ui-store';

export const usePhoneBookMenuController = () => {
  const { t } = useTranslation(['phonebook']);
  const navigate = useNavigate();
  const setSecondLevel = useUiStore((state) => state.setSecondLevel);
  const setThirdLevel = useUiStore((state) => state.setThirdLevel);
  const menuItems = useMemo(() => buildPhoneBookMenu(t), [t]);
  const [position, setPosition] = useState(0);

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
