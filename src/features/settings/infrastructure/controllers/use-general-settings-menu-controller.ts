import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useTranslation from '@/shared/hooks/use-translation';
import { buildGeneralSettingsMenu } from '@/features/settings/application/menus';
import { useCircularMenuController } from '@/features/settings/infrastructure/controllers/use-circular-menu-controller';
import { useUiStore } from '@/app/state/ui-store';

export const useGeneralSettingsMenuController = () => {
  const { t } = useTranslation(['settings']);
  const navigate = useNavigate();
  const thirdLevel = useUiStore((state) => state.thirdLevel);
  const setThirdLevel = useUiStore((state) => state.setThirdLevel);

  const menuItems = useMemo(() => buildGeneralSettingsMenu(t), [t]);

  return useCircularMenuController({
    menuItems,
    initialPosition: thirdLevel > 0 ? thirdLevel - 1 : 0,
    setLevel: (position) => setThirdLevel(position + 1),
    goTo: navigate,
  });
};
