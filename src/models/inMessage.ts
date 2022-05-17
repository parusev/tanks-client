import { Bullet } from './bullet';
import { Game } from './game';
import { GameConfig } from './gameConfig';
import { GameWithState } from './gameWithState';
import { Tank } from './tank';

export const InMessageTypes = {
  InitialStateSet: 'INITIAL_STATE_SET',
  GameCreated: 'GAME_CREATED',
  GameOpened: 'GAME_OPENED',
  GameOccupied: 'GAME_OCCUPIED',
  GamePrestarted: 'GAME_PRESTARTED',
  GameStartCountdown: 'GAME_START_COUNTDOWN',
  GameStarted: 'GAME_STARTED',
  GameDeleted: 'GAME_DELETED',
  GameEnded: 'GAME_ENDED',
  TankUpdated: 'TANK_UPDATED',
  BulletCreated: 'BULLET_CREATED',
  BulletUpdated: 'BULLET_UPDATED',
  BulletDestroyed: 'BULLET_DESTROYED',
  Error: 'ERROR',
} as const;

interface InitialStateSetInMessage {
  type: typeof InMessageTypes.InitialStateSet;
  gameConfig: GameConfig;
  games: Game[];
}

interface GameCreatedInMessage {
  type: typeof InMessageTypes.GameCreated;
  gameId: string;
}

interface GameOpenedInMessage {
  type: typeof InMessageTypes.GameOpened;
  game: GameWithState;
  userId: string;
}

interface GameOccupiedInMessage {
  type: typeof InMessageTypes.GameOccupied;
  gameId: string;
}

interface GamePrestartedInMessage {
  type: typeof InMessageTypes.GamePrestarted;
  game: GameWithState;
  userId: string;
}

interface GameStartCountdownInMessage {
  type: typeof InMessageTypes.GameStartCountdown;
  secondsLeft: number;
}

interface GameStartedInMessage {
  type: typeof InMessageTypes.GameStarted;
}

interface GameDeletedInMessage {
  type: typeof InMessageTypes.GameDeleted;
  gameId: string;
}

interface GameEndedInMessage {
  type: typeof InMessageTypes.GameEnded;
  gameId: string;
  winnerId: string;
}

interface TankUpdatedInMessage {
  type: typeof InMessageTypes.TankUpdated;
  tank: Tank;
}

interface BulletCreatedInMessage {
  type: typeof InMessageTypes.BulletCreated;
  bullet: Bullet;
}

interface BulletUpdatedInMessage {
  type: typeof InMessageTypes.BulletUpdated;
  bullet: Bullet;
}

interface BulletDestroyedInMessage {
  type: typeof InMessageTypes.BulletDestroyed;
  bulletId: string;
}

interface ErrorInMessage {
  type: typeof InMessageTypes.Error;
  message?: string;
}

export type InMessage =
  | InitialStateSetInMessage
  | GameCreatedInMessage
  | GameOpenedInMessage
  | GameOccupiedInMessage
  | GamePrestartedInMessage
  | GameStartCountdownInMessage
  | GameStartedInMessage
  | GameDeletedInMessage
  | GameEndedInMessage
  | TankUpdatedInMessage
  | BulletCreatedInMessage
  | BulletUpdatedInMessage
  | BulletDestroyedInMessage
  | ErrorInMessage;
