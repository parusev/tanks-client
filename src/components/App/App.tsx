import React from 'react';
import WithBffContext from '../../contexts/BffContext/WithBffContext';
import WithStateContext from '../../contexts/StateContext/WithStateContext';
import WithWebSocketContext from '../../contexts/WebSocketContextProvider/WithWebSocketContext';
import Main from '../Main';

// TODO set relative URL
function App() {
  return (
    <WithStateContext>
      <WithWebSocketContext url="ws://localhost:3000/ws">
        <WithBffContext>
          <Main />
        </WithBffContext>
      </WithWebSocketContext>
    </WithStateContext>
  );
}

export default App;
