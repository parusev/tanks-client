import { ValuesOfObject } from '../utils/valuesOfObject';

export const Directions = {
  left: 'LEFT',
  right: 'RIGHT',
  top: 'TOP',
  bottom: 'BOTTOM',
} as const;

export type Direction = ValuesOfObject<typeof Directions>;
