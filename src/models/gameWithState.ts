import { Game } from './game';
import { GameState } from './gameState';

export interface GameWithState extends Game {
  state: GameState;
}
