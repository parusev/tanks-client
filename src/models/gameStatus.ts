import { ValuesOfObject } from '../utils/valuesOfObject';

export const GameStatuses = {
  Created: 0,
  Ready: 1,
  Active: 2,
} as const;

export type GameStatus = ValuesOfObject<typeof GameStatuses>;
