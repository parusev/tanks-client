import { Direction } from './direction';

export const OutMessageTypes = {
  CreateGame: 'CREATE_GAME',
  JoinGame: 'JOIN_GAME',
  DeleteGame: 'DELETE_GAME',
  StartMoveTank: 'START_MOVE_TANK',
  StopMoveTank: 'STOP_MOVE_TANK',
  Shoot: 'SHOOT',
} as const;

interface CreateGameOutMessage {
  type: typeof OutMessageTypes.CreateGame;
}

interface JoinGameOutMessage {
  type: typeof OutMessageTypes.JoinGame;
  gameId: string;
}

interface DeleteGameOutMessage {
  type: typeof OutMessageTypes.DeleteGame;
}

interface StartMoveTankOutMessage {
  type: typeof OutMessageTypes.StartMoveTank;
  gameId: string;
  userId: string;
  direction: Direction;
}

interface StopMoveTankOutMessage {
  type: typeof OutMessageTypes.StopMoveTank;
  gameId: string;
  userId: string;
}

interface ShootOutMessage {
  type: typeof OutMessageTypes.Shoot;
  gameId: string;
  userId: string;
}

export type OutMessage =
  | CreateGameOutMessage
  | JoinGameOutMessage
  | DeleteGameOutMessage
  | StartMoveTankOutMessage
  | StopMoveTankOutMessage
  | ShootOutMessage;
