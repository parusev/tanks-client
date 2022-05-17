import { Direction } from '../../models/direction';
import { OutMessageTypes } from '../../models/outMessage';
import { SendMessage } from './models/sendMessage';

export class BffService {
  constructor(private readonly sendMessage: SendMessage) {}

  public createGame(): void {
    this.sendMessage({
      type: OutMessageTypes.CreateGame,
    });
  }

  public joinGame(gameId: string): void {
    this.sendMessage({
      type: OutMessageTypes.JoinGame,
      gameId,
    });
  }

  public deleteGame(): void {
    this.sendMessage({
      type: OutMessageTypes.DeleteGame,
    });
  }

  public startMoveTank(
    gameId: string,
    userId: string,
    direction: Direction
  ): void {
    this.sendMessage({
      type: OutMessageTypes.StartMoveTank,
      gameId,
      userId,
      direction,
    });
  }

  public stopMoveTank(gameId: string, userId: string): void {
    this.sendMessage({
      type: OutMessageTypes.StopMoveTank,
      gameId,
      userId,
    });
  }

  public shoot(gameId: string, userId: string): void {
    this.sendMessage({
      type: OutMessageTypes.Shoot,
      gameId,
      userId,
    });
  }
}
