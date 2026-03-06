import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useTranslation from '@/hooks/use-translation';
import { buildSettingsMenu } from '@/features/settings/application/menus';
import { usePageIndicatorPort } from '@/features/settings/infrastructure/adapters/use-page-indicator-port';
import { useCircularMenuController } from '@/features/settings/infrastructure/controllers/use-circular-menu-controller';

export const useSettingsMenuController = () => {
  const { t } = useTranslation(['settings']);
  const navigate = useNavigate();
  const { setSecond } = usePageIndicatorPort();

  const menuItems = useMemo(() => buildSettingsMenu(t), [t]);

  return useCircularMenuController({
    menuItems,
    setLevel: setSecond,
    goTo: navigate,
  });
};
