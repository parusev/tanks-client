import { Dispatch } from 'react';
import { Action, ActionTypes } from '../state/models/action';
import { Command } from './command';

export class CreateGameCommand extends Command {
  constructor(
    private readonly dispatch: Dispatch<Action>,
    private readonly gameId: string
  ) {
    super();
  }
  public execute(): void {
    this.dispatch({
      type: ActionTypes.GameCreated,
      gameId: this.gameId,
    });
  }
}
