import { FC, memo, ReactNode } from 'react';
import { useWebSocket, UseWebSocketParams } from '../../hooks/useWebSocket';
import {
  WebSocketSendMessageContext,
  WebSocketStateContext,
} from './WebSocketContext';

const WebSocketContextProvider: FC<StateProviderProps> = function ({
  url,
  onOpen,
  onMessage,
  onClose,
  onError,
  children,
}) {
  const [webSocketState, sendMessage] = useWebSocket({
    url,
    onOpen,
    onMessage,
    onClose,
    onError,
  });

  return (
    <WebSocketStateContext.Provider value={webSocketState}>
      <WebSocketSendMessageContext.Provider value={sendMessage}>
        {children}
      </WebSocketSendMessageContext.Provider>
    </WebSocketStateContext.Provider>
  );
};

export default memo(WebSocketContextProvider);

interface StateProviderProps extends UseWebSocketParams {
  children: ReactNode;
}
