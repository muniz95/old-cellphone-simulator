import S from './styled';
import { useSettingsStore } from '@/features/settings/state/settings-store';

const Startup = () => {
  const color = useSettingsStore((state) => state.color);

  return <S.StartupContainer color={color}>Startup</S.StartupContainer>;
};

export default Startup;
