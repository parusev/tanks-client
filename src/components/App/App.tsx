import React from 'react';
import WithBffContext from '../../contexts/BffContext/WithBffContext';
import WithStateContext from '../../contexts/StateContext/WithStateContext';
import WithWebSocketContext from '../../contexts/WebSocketContextProvider/WithWebSocketContext';
import Main from '../Main';

function App() {
  return (
    <WithStateContext>
      <WithWebSocketContext url={process.env.REACT_APP_SERVER_URL as string}>
        <WithBffContext>
          <Main />
        </WithBffContext>
      </WithWebSocketContext>
    </WithStateContext>
  );
}

export default App;
