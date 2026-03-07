import { ReactNode } from 'react';
import S from './styled';

interface HomeScreenProps {
  children: ReactNode;
}

const HomeScreen = ({ children }: HomeScreenProps) => {
  return <S.HomeScreenContainer>{children}</S.HomeScreenContainer>;
};

export default HomeScreen;
