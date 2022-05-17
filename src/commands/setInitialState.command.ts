import { Dispatch } from 'react';
import { Game } from '../models/game';
import { GameConfig } from '../models/gameConfig';
import { Action, ActionTypes } from '../state/models/action';
import { Command } from './command';

export class SetInitialStateCommand extends Command {
  constructor(
    private readonly dispatch: Dispatch<Action>,
    private readonly gameConfig: GameConfig,
    private readonly games: Game[]
  ) {
    super();
  }
  public execute(): void {
    this.dispatch({
      type: ActionTypes.InitialStateSet,
      gameConfig: this.gameConfig,
      games: this.games,
    });
  }
}
