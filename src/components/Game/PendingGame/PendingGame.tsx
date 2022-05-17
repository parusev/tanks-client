import { FC, memo, useCallback } from 'react';
import { useBff } from '../../../contexts/BffContext/BffContext';
import './PendingGame.scss';

const PendingGame: FC<PendingGameProps> = function ({ gameId }) {
  const bff = useBff();

  const deleteGame = useCallback(() => {
    bff.deleteGame();
  }, [bff]);

  return (
    <section className="pending-game">
      Waiting for user to join. Game id: <b>{gameId}</b>
      <br />
      <button onClick={deleteGame}>Delete game</button>
    </section>
  );
};

export default memo(PendingGame);

interface PendingGameProps {
  gameId: string;
}
