import { FC, memo } from 'react';
import { useTanksState } from '../../contexts/StateContext/StateContext';
import { GameStatuses } from '../../models/gameStatus';
import './Game.scss';
import GameField from './GameField';
import PendingGame from './PendingGame';

const Game: FC = function () {
  const { gameConfig, currentGame, userId } = useTanksState();

  if (currentGame === null || gameConfig === null || userId === null) {
    return null;
  }

  const {
    state: { status: gameStatus },
    id: gameId,
  } = currentGame;

  return (
    <section className="game">
      {gameStatus === GameStatuses.Created ? (
        <PendingGame gameId={gameId} />
      ) : (
        <GameField
          gameConfig={gameConfig}
          currentGame={currentGame}
          userId={userId}
        />
      )}
    </section>
  );
};

export default memo(Game);
