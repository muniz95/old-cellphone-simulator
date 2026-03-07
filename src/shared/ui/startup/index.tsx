import S from './styled';
import { ReactNode } from 'react';

interface StartupProps {
  color: string;
  label?: ReactNode;
}

const Startup = ({ color, label = 'Startup' }: StartupProps) => {
  return <S.StartupContainer color={color}>{label}</S.StartupContainer>;
};

export default Startup;
