import { FC, memo } from 'react';
import { useTanksState } from '../../contexts/StateContext/StateContext';
import { useWebSocketState } from '../../contexts/WebSocketContextProvider/WebSocketContext';
import Game from '../Game';
import MainMenu from '../MainMenu';
import NoConnection from '../NoConnection';

const Main: FC = function () {
  const { currentGame } = useTanksState();

  const webSocketState = useWebSocketState();

  const notConnected = webSocketState !== WebSocket.OPEN;

  return (
    <main className="main">
      {notConnected ? (
        <NoConnection />
      ) : currentGame !== null ? (
        <Game />
      ) : (
        <MainMenu />
      )}
    </main>
  );
};

export default memo(Main);
