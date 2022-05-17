import { Dispatch } from 'react';
import { GameWithState } from '../models/gameWithState';
import { Action, ActionTypes } from '../state/models/action';
import { Command } from './command';

export class OpenGameCommand extends Command {
  constructor(
    private readonly dispatch: Dispatch<Action>,
    private readonly game: GameWithState,
    private readonly userId: string
  ) {
    super();
  }
  public execute(): void {
    this.dispatch({
      type: ActionTypes.GameOpened,
      game: this.game,
      userId: this.userId,
    });
  }
}
