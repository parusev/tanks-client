import { Dispatch } from 'react';
import { GameIsNotFoundError } from '../errors/gameIsNotFound.error';
import { Action, ActionTypes } from '../state/models/action';
import { State } from '../state/models/state';
import { Command } from './command';

export class CountdownGameStartCommand extends Command {
  constructor(
    private readonly dispatch: Dispatch<Action>,
    private readonly secondsLeft: number,
    private readonly state: State
  ) {
    super();
  }
  public execute(): void {
    const { currentGame } = this.state;

    if (currentGame === null) {
      throw new GameIsNotFoundError();
    }

    this.dispatch({
      type: ActionTypes.GameStartCountdown,
      secondsLeft: this.secondsLeft,
    });
  }
}
