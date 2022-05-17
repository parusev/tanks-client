import { createContext, useContext } from 'react';
import { SendMessage } from '../../services/bff/models/sendMessage';
import { contextStub } from '../../utils/contextStub/contextStub';

export const WebSocketStateContext = createContext<number | null>(null);

export const WebSocketSendMessageContext =
  createContext<SendMessage>(contextStub);

export function useWebSocketState() {
  return useContext(WebSocketStateContext);
}

export function useWebSocketSendMessage() {
  return useContext(WebSocketSendMessageContext);
}
