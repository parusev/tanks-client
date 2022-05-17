import { Game } from '../../models/game';
import { GameConfig } from '../../models/gameConfig';
import { GameWithState } from '../../models/gameWithState';

export interface State {
  gameConfig: GameConfig | null;
  games: Game[] | null;
  isGamesLoading: boolean;
  currentGame: GameWithState | null;
  userId: string | null;
}
