import { ContextIsNotProvidedError } from './errors/contextIsNotProvided.error';

export function contextStub(): void {
  throw new ContextIsNotProvidedError();
}
