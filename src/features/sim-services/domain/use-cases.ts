import { SimNumber } from '@/features/sim-services/domain/sim-number';

export const hasSelectedSimService = (
  selected: SimNumber | null | undefined
) => {
  return Boolean(selected);
};

export const getSelectedSimServiceMessage = (
  selected: SimNumber | null | undefined
) => {
  return selected?.message ?? null;
};
