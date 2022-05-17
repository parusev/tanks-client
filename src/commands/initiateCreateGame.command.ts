import { Dispatch } from 'react';
import { Action, ActionTypes } from '../state/models/action';
import { Command } from './command';

export class InitiateCreateGameCommand extends Command {
  constructor(private readonly dispatch: Dispatch<Action>) {
    super();
  }
  public execute(): void {
    this.dispatch({
      type: ActionTypes.CreateGameInitiated,
    });
  }
}
