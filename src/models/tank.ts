import { Direction } from './direction';

export interface Tank {
  x: number;
  y: number;
  userId: string;
  shotDirection: Direction;
  isMoving: boolean;
}
