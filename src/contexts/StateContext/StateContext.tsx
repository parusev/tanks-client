import { createContext, Dispatch, useContext } from 'react';
import { Action } from '../../state/models/action';
import { State } from '../../state/models/state';
import { initialState } from '../../state/reducer';
import { contextStub } from '../../utils/contextStub/contextStub';

export const TanksStateContext = createContext<State>(initialState);

export const TanksDispatchContext =
  createContext<Dispatch<Action>>(contextStub);

export function useTanksState() {
  return useContext(TanksStateContext);
}

export function useTanksDispatch() {
  return useContext(TanksDispatchContext);
}
