import { Dispatch } from 'react';
import { GameIsNotFoundError } from '../errors/gameIsNotFound.error';
import { Bullet } from '../models/bullet';
import { Action, ActionTypes } from '../state/models/action';
import { State } from '../state/models/state';
import { Command } from './command';

export class CreateBulletCommand extends Command {
  constructor(
    private readonly bullet: Bullet,
    private readonly dispatch: Dispatch<Action>,
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
      type: ActionTypes.BulletCreated,
      bullet: this.bullet,
    });
  }
}
