import SwipeMenu from '@/features/settings/ui/components/swipe-menu';
import { useGeneralSettingsMenuController } from '@/features/settings/infrastructure/controllers/use-general-settings-menu-controller';

const GeneralSettingsPage = () => {
  const { currentLabel, onTap, onSwipedLeft, onSwipedRight } =
    useGeneralSettingsMenuController();

  return (
    <SwipeMenu
      label={currentLabel}
      onTap={onTap}
      onSwipedLeft={onSwipedLeft}
      onSwipedRight={onSwipedRight}
    />
  );
};

export default GeneralSettingsPage;
