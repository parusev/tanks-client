import { createContext, useContext } from 'react';
import { BffService } from '../../services/bff/bff.service';
import { contextStub } from '../../utils/contextStub/contextStub';

export const BffContext = createContext<BffService>(
  new BffService(contextStub)
);

export function useBff() {
  return useContext(BffContext);
}
