import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useTranslation from '@/hooks/use-translation';
import { buildGeneralSettingsMenu } from '@/features/settings/application/menus';
import { useCircularMenuController } from '@/features/settings/infrastructure/controllers/use-circular-menu-controller';
import { useUiStore } from '@/stores/ui-store';

export const useGeneralSettingsMenuController = () => {
  const { t } = useTranslation(['settings']);
  const navigate = useNavigate();
  const setThirdLevel = useUiStore((state) => state.setThirdLevel);

  const menuItems = useMemo(() => buildGeneralSettingsMenu(t), [t]);

  return useCircularMenuController({
    menuItems,
    setLevel: (position) => setThirdLevel(position + 1),
    goTo: navigate,
  });
};
