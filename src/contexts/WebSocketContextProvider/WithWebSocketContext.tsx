import { FC, memo, ReactNode, useCallback } from 'react';
import { CountdownGameStartCommand } from '../../commands/countdownGameStart.command';
import { CreateBulletCommand } from '../../commands/createBullet.command';
import { CreateGameCommand } from '../../commands/createGame.command';
import { DeleteGameCommand } from '../../commands/deleteGame.command';
import { DestroyBulletCommand } from '../../commands/destroyBullet.command';
import { EndGameCommand } from '../../commands/endGame.command';
import { OccupyGameCommand } from '../../commands/occupyGame.command';
import { OpenGameCommand } from '../../commands/openGame.command';
import { PrestartGameCommand } from '../../commands/prestartGame.command';
import { SetInitialStateCommand } from '../../commands/setInitialState.command';
import { StartGameCommand } from '../../commands/startGame.command';
import { UpdateBulletCommand } from '../../commands/updateBullet.command';
import { UpdateTankCommand } from '../../commands/updateTank.command';
import { unknownErrorMessage } from '../../errors/unknownErrorMessage';
import { InMessage, InMessageTypes } from '../../models/inMessage';
import { useTanksDispatch, useTanksState } from '../StateContext/StateContext';
import WebSocketContextProvider from './WebSocketContextProvider';

const WithWebSocketContext: FC<WithWebSocketContextProps> = function ({
  url,
  children,
}) {
  const state = useTanksState();
  const dispatch = useTanksDispatch();

  const onMessage = useCallback(
    (message: InMessage) => {
      const { type } = message;

      try {
        switch (type) {
          case InMessageTypes.InitialStateSet: {
            const { gameConfig, games } = message;

            new SetInitialStateCommand(dispatch, gameConfig, games).execute();

            return;
          }
          case InMessageTypes.GameCreated: {
            const { gameId } = message;

            new CreateGameCommand(dispatch, gameId).execute();

            return;
          }
          case InMessageTypes.GameOpened: {
            const { game, userId } = message;

            new OpenGameCommand(dispatch, game, userId).execute();

            return;
          }
          case InMessageTypes.GameOccupied: {
            const { gameId } = message;

            new OccupyGameCommand(dispatch, gameId).execute();

            return;
          }
          case InMessageTypes.GamePrestarted: {
            const { game, userId } = message;

            new PrestartGameCommand(dispatch, game, userId).execute();

            return;
          }
          case InMessageTypes.GameStartCountdown: {
            const { secondsLeft } = message;

            new CountdownGameStartCommand(
              dispatch,
              secondsLeft,
              state
            ).execute();

            return;
          }
          case InMessageTypes.GameStarted: {
            new StartGameCommand(dispatch, state).execute();

            return;
          }
          case InMessageTypes.GameDeleted: {
            const { gameId } = message;

            const { currentGame } = state;

            const currentGameId = currentGame?.id;

            if (gameId === currentGameId) {
              alert('The game was deleted');
            }

            new DeleteGameCommand(dispatch, gameId).execute();

            return;
          }
          case InMessageTypes.GameEnded: {
            const { gameId, winnerId } = message;

            const { userId } = state;

            alert(
              message.winnerId === userId ? 'Victory!' : 'Sorry, you lose :('
            );

            new EndGameCommand(dispatch, gameId, winnerId).execute();

            return;
          }
          case InMessageTypes.TankUpdated: {
            const { tank } = message;

            new UpdateTankCommand(dispatch, state, tank).execute();

            return;
          }
          case InMessageTypes.BulletCreated: {
            const { bullet } = message;

            new CreateBulletCommand(bullet, dispatch, state).execute();

            return;
          }
          case InMessageTypes.BulletUpdated: {
            const { bullet } = message;

            new UpdateBulletCommand(bullet, dispatch, state).execute();

            return;
          }
          case InMessageTypes.BulletDestroyed: {
            const { bulletId } = message;

            new DestroyBulletCommand(bulletId, dispatch, state).execute();

            return;
          }
          case InMessageTypes.Error: {
            const { message: errorMessage } = message;

            alert(errorMessage ?? unknownErrorMessage);

            return;
          }
          default: {
            return;
          }
        }
      } catch (e) {
        alert(unknownErrorMessage);
      }
    },
    [dispatch, state]
  );

  const onError = useCallback((error: any) => {
    console.error(typeof error === 'string' ? error : unknownErrorMessage);
  }, []);

  return (
    <WebSocketContextProvider url={url} onMessage={onMessage} onError={onError}>
      {children}
    </WebSocketContextProvider>
  );
};

export default memo(WithWebSocketContext);

interface WithWebSocketContextProps {
  url: string;
  children: ReactNode;
}
