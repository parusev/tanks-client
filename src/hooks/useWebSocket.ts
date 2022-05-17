import { useCallback, useEffect, useRef, useState } from 'react';
import { InMessage } from '../models/inMessage';
import { OutMessage } from '../models/outMessage';
import { SendMessage } from '../services/bff/models/sendMessage';

export function useWebSocket({
  url,
  onOpen,
  onMessage,
  onClose,
  onError,
}: UseWebSocketParams): [number | null, SendMessage] {
  const [webSocketState, setWebSocketState] = useState<number | null>(null);
  const webSocket = useRef<WebSocket>();

  useEffect(() => {
    if (webSocket.current === undefined) {
      webSocket.current = new WebSocket(url);
    }

    return () => {
      webSocket.current?.close();
      webSocket.current = undefined;
    };
  }, [url]);

  useEffect(() => {
    if (webSocket.current === undefined) {
      return;
    }

    webSocket.current.onopen = function () {
      setWebSocketState(this.readyState);
      onOpen?.();
    };
  }, [onOpen]);

  useEffect(() => {
    if (webSocket.current === undefined) {
      return;
    }

    webSocket.current.onmessage = function ({ data }) {
      try {
        const message = JSON.parse(data);

        onMessage(message);
      } catch (e) {
        onError?.('Wrong message format');
      }
    };
  }, [onError, onMessage]);

  useEffect(() => {
    if (webSocket.current === undefined) {
      return;
    }

    webSocket.current.onclose = function () {
      setWebSocketState(this.readyState);
      onClose?.();
    };
  }, [onClose]);

  useEffect(() => {
    if (webSocket.current === undefined) {
      return;
    }

    webSocket.current.onerror = function (event) {
      onError?.(event);
    };
  }, [onError]);

  const sendMessage = useCallback(
    function (message: OutMessage): void {
      if (webSocket.current && webSocketState === WebSocket.OPEN) {
        webSocket.current.send(JSON.stringify(message));
      }
    },
    [webSocketState]
  );

  return [webSocketState, sendMessage];
}

export interface UseWebSocketParams {
  url: string;
  onOpen?: () => void;
  onMessage: (message: InMessage) => void;
  onClose?: () => void;
  onError?: (error: any) => void;
}
