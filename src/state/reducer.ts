import { GameStatuses } from '../models/gameStatus';
import { GameWithState } from '../models/gameWithState';
import { Action, ActionTypes } from './models/action';
import { State } from './models/state';

export const initialState: State = {
  gameConfig: null,
  games: null,
  isGamesLoading: false,
  currentGame: null,
  userId: null,
};

export function reducer(state: State, action: Action): State {
  const { type } = action;

  switch (type) {
    case ActionTypes.InitialStateSet: {
      const { gameConfig, games } = action;

      return {
        ...state,
        gameConfig,
        games,
      };
    }
    case ActionTypes.CreateGameInitiated: {
      return {
        ...state,
        isGamesLoading: true,
      };
    }
    case ActionTypes.JoinGameInitiated: {
      return {
        ...state,
        isGamesLoading: true,
      };
    }
    case ActionTypes.GameCreated: {
      const { gameId } = action;

      return {
        ...state,
        games: [...(state.games ?? []), { id: gameId }],
      };
    }
    case ActionTypes.GameOpened: {
      const { game, userId } = action;

      return {
        ...state,
        isGamesLoading: false,
        currentGame: game,
        userId,
      };
    }
    case ActionTypes.GameOccupied: {
      const { gameId } = action;

      return {
        ...state,
        games: state.games?.filter((game) => game.id !== gameId) ?? [],
      };
    }
    case ActionTypes.GamePrestarted: {
      const { game, userId } = action;

      return {
        ...state,
        isGamesLoading: false,
        currentGame: game,
        userId,
      };
    }
    case ActionTypes.GameStartCountdown: {
      const { secondsLeft } = action;

      const currentGame = state.currentGame as GameWithState;

      const { state: currentGameState } = currentGame;

      return {
        ...state,
        currentGame: {
          ...currentGame,
          state: {
            ...currentGameState,
            secondsLeft,
          },
        },
      };
    }
    case ActionTypes.GameStarted: {
      const currentGame = state.currentGame as GameWithState;

      return {
        ...state,
        currentGame: {
          ...currentGame,
          state: {
            ...currentGame.state,
            status: GameStatuses.Active,
            secondsLeft: 0,
          },
        },
      };
    }
    case ActionTypes.GameDeleted: {
      const { gameId } = action;

      let { currentGame } = state;

      if (currentGame?.id === gameId) {
        currentGame = null;
      }

      return {
        ...state,
        games: state.games?.filter((game) => game.id !== gameId) ?? [],
        currentGame,
      };
    }
    case ActionTypes.GameEnded: {
      return {
        ...state,
        currentGame: null,
      };
    }
    case ActionTypes.TankUpdated: {
      const {
        tank,
        tank: { userId },
      } = action;

      const currentGame = state.currentGame as GameWithState;

      const {
        state: { tanksByUserId: currentTanksByUserId },
      } = currentGame;

      const tanksByUserId = { ...currentTanksByUserId, [userId]: tank };

      return {
        ...state,
        currentGame: {
          ...currentGame,
          state: {
            ...currentGame.state,
            tanksByUserId,
          },
        },
      };
    }
    case ActionTypes.BulletCreated:
    case ActionTypes.BulletUpdated: {
      const {
        bullet,
        bullet: { id: bulletId },
      } = action;

      const currentGame = state.currentGame as GameWithState;

      const {
        state: { bullets: currentBullets },
      } = currentGame;

      const bullets = { ...currentBullets, [bulletId]: bullet };

      return {
        ...state,
        currentGame: {
          ...currentGame,
          state: {
            ...currentGame.state,
            bullets,
          },
        },
      };
    }
    case ActionTypes.BulletDestroyed: {
      const { bulletId } = action;

      const currentGame = state.currentGame as GameWithState;

      const {
        state: { bullets: currentBullets },
      } = currentGame;

      const bullets = { ...currentBullets };
      delete bullets[bulletId];

      return {
        ...state,
        currentGame: {
          ...currentGame,
          state: {
            ...currentGame.state,
            bullets,
          },
        },
      };
    }
    default:
      return state;
  }
}
