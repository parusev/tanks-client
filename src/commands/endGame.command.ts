import { Dispatch } from 'react';
import { Action, ActionTypes } from '../state/models/action';
import { Command } from './command';

export class EndGameCommand extends Command {
  constructor(
    private readonly dispatch: Dispatch<Action>,
    private readonly gameId: string,
    private readonly winnerId: string
  ) {
    super();
  }
  public execute(): void {
    this.dispatch({
      type: ActionTypes.GameEnded,
      gameId: this.gameId,
      winnerId: this.winnerId,
    });
  }
}
