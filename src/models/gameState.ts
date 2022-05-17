import { Bullet } from './bullet';
import { GameStatus } from './gameStatus';
import { Tank } from './tank';
import { Wall } from './wall';

export interface GameState {
  status: GameStatus;
  width: number;
  height: number;
  walls: Wall[];
  tanksByUserId: Record<string, Tank>;
  bullets: Record<string, Bullet>;
  secondsLeft: number;
}
