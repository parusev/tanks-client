import { InMessage, InMessageTypes } from '../../models/inMessage';

export const ActionTypes = {
  ...InMessageTypes,
  CreateGameInitiated: 'CREATE_GAME_INITIATED',
  JoinGameInitiated: 'JOIN_GAME_INITIATED',
} as const;

interface CreateGameInitiatedAction {
  type: typeof ActionTypes.CreateGameInitiated;
}

interface JoinGameInitiatedAction {
  type: typeof ActionTypes.JoinGameInitiated;
}

export type Action =
  | InMessage
  | CreateGameInitiatedAction
  | JoinGameInitiatedAction;
