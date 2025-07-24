import { SettingsContext } from '@/context/settings/context';
import S from './styled';
import { useContext } from 'react';

const Startup = () => {
  const { color } = useContext(SettingsContext);

  return <S.StartupContainer color={color}>Startup</S.StartupContainer>;
};

export default Startup;
