import { FC, memo, useCallback } from 'react';
import { InitiateCreateGameCommand } from '../../commands/initiateCreateGame.command';
import { InitiateJoinGameCommand } from '../../commands/initiateJoinGame.command';
import { useBff } from '../../contexts/BffContext/BffContext';
import {
  useTanksDispatch,
  useTanksState,
} from '../../contexts/StateContext/StateContext';
import Instruction from '../Instruction';
import './MainMenu.scss';

const MainMenu: FC = function () {
  const state = useTanksState();
  const dispatch = useTanksDispatch();
  const bff = useBff();

  const { games, isGamesLoading } = state;

  const createGame = useCallback(() => {
    new InitiateCreateGameCommand(dispatch).execute();

    bff.createGame();
  }, [bff, dispatch]);

  const joinGame = useCallback(
    (gameId: string) => {
      new InitiateJoinGameCommand(dispatch).execute();

      bff.joinGame(gameId);
    },
    [bff, dispatch]
  );

  const openedGames =
    games && games.length > 0 ? (
      <section className="opened-games">
        <h2 className="opened-games__header">Opened games</h2>
        <ul className="opened-games__list">
          {games.map(({ id }) => (
            <li key={id}>
              {id}{' '}
              <button
                onClick={joinGame.bind(null, id)}
                disabled={isGamesLoading}
              >
                Join
              </button>
            </li>
          ))}
        </ul>
      </section>
    ) : null;

  return (
    <article className="main-menu">
      <header>
        <h1>Tanks</h1>
      </header>
      <Instruction />
      <nav>
        <button onClick={createGame} disabled={isGamesLoading}>
          Create game
        </button>
        {openedGames}
      </nav>
    </article>
  );
};

export default memo(MainMenu);
