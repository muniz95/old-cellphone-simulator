import S from './styled';

export interface DotMatrixProps {
  className?: string;
  dotGap?: number;
  dotSize?: number;
  inactiveOpacity?: number;
  matrix: number[][];
  xAxisLength: number;
  yAxisLength: number;
}

const DotMatrix = ({
  className,
  dotGap = 1,
  dotSize = 1,
  inactiveOpacity = 0.25,
  matrix,
  xAxisLength,
  yAxisLength,
}: DotMatrixProps) => {
  return (
    <S.DotMatrixRoot className={className}>
      <S.Content
        columns={xAxisLength}
        dotGap={dotGap}
        dotSize={dotSize}
        rows={yAxisLength}
      >
        {Array.from({ length: yAxisLength }, (_, y) =>
          Array.from({ length: xAxisLength }, (_, x) => {
            const isActive = matrix[y]?.[x] === 1;

            return (
              <S.Dot
                key={`${y}-${x}`}
                className="pixel"
                data-active={isActive}
                data-x={x}
                data-y={y}
                dotSize={dotSize}
                inactiveOpacity={inactiveOpacity}
                isActive={isActive}
              />
            );
          })
        )}
      </S.Content>
    </S.DotMatrixRoot>
  );
};

export default DotMatrix;
