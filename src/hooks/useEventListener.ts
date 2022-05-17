import { useEffect, useRef } from 'react';

export function useEventListener<TEvent extends Event = Event>(
  eventName: string,
  listener: EventListener,
  element: EventTarget = window
) {
  const savedListener = useRef<EventListener>();

  useEffect(() => {
    savedListener.current = listener;
  }, [listener]);

  useEffect(() => {
    const eventListener = (event: Event) =>
      savedListener.current?.(event as TEvent);

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}
