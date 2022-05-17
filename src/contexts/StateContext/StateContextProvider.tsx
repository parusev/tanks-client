import { FC, memo, ReactNode, useReducer } from 'react';
import { initialState, reducer } from '../../state/reducer';
import { TanksDispatchContext, TanksStateContext } from './StateContext';

const StateContextProvider: FC<StateProviderProps> = function ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TanksStateContext.Provider value={state}>
      <TanksDispatchContext.Provider value={dispatch}>
        {children}
      </TanksDispatchContext.Provider>
    </TanksStateContext.Provider>
  );
};

export default memo(StateContextProvider);

interface StateProviderProps {
  children: ReactNode;
}
