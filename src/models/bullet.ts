import { Direction } from './direction';

export interface Bullet {
  x: number;
  y: number;
  id: string;
  userId: string;
  direction: Direction;
}
