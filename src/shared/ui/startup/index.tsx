import S from './styled';
import { ReactNode } from 'react';
import DotMatrix from '@/shared/ui/dot-matrix';
import { useStartup } from './hooks/use-startup';

interface StartupProps {
  color: string;
  label?: ReactNode;
}

const Startup = ({ color }: StartupProps) => {
  const { matrix } = useStartup();
  return (
    <S.StartupContainer color={color}>
      <DotMatrix
        dotGap={0}
        dotSize={2}
        matrix={matrix}
        xAxisLength={95}
        yAxisLength={45}
        inactiveOpacity={0}
      />
    </S.StartupContainer>
  );
};

export default Startup;
