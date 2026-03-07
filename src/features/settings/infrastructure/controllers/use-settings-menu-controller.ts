import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useTranslation from '@/shared/hooks/use-translation';
import { buildSettingsMenu } from '@/features/settings/application/menus';
import { useCircularMenuController } from '@/features/settings/infrastructure/controllers/use-circular-menu-controller';
import { useUiStore } from '@/app/state/ui-store';

export const useSettingsMenuController = () => {
  const { t } = useTranslation(['settings']);
  const navigate = useNavigate();
  const secondLevel = useUiStore((state) => state.secondLevel);
  const setSecondLevel = useUiStore((state) => state.setSecondLevel);

  const menuItems = useMemo(() => buildSettingsMenu(t), [t]);

  return useCircularMenuController({
    menuItems,
    initialPosition: secondLevel > 0 ? secondLevel - 1 : 0,
    setLevel: (position) => setSecondLevel(position + 1),
    goTo: navigate,
  });
};
