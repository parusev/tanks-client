import { Dispatch } from 'react';
import { GameWithState } from '../models/gameWithState';
import { Action, ActionTypes } from '../state/models/action';
import { Command } from './command';

export class PrestartGameCommand extends Command {
  constructor(
    private readonly dispatch: Dispatch<Action>,
    private readonly game: GameWithState,
    private readonly userId: string
  ) {
    super();
  }
  public execute(): void {
    this.dispatch({
      type: ActionTypes.GamePrestarted,
      game: this.game,
      userId: this.userId,
    });
  }
}
