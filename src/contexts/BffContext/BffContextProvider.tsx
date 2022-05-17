import { FC, memo, ReactNode, useMemo } from 'react';
import { BffService } from '../../services/bff/bff.service';
import { useWebSocketSendMessage } from '../WebSocketContextProvider/WebSocketContext';
import { BffContext } from './BffContext';

const BffContextProvider: FC<BffProviderProps> = function ({ children }) {
  const sendMessage = useWebSocketSendMessage();

  const bff = useMemo(() => {
    return new BffService(sendMessage);
  }, [sendMessage]);

  return <BffContext.Provider value={bff}>{children}</BffContext.Provider>;
};

export default memo(BffContextProvider);

interface BffProviderProps {
  children: ReactNode;
}
