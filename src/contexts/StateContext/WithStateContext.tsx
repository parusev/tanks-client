import { FC, memo, ReactNode } from 'react';
import StateContextProvider from './StateContextProvider';

const WithStateContext: FC<WithStateContextProps> = function ({ children }) {
  return <StateContextProvider>{children}</StateContextProvider>;
};

export default memo(WithStateContext);

interface WithStateContextProps {
  children: ReactNode;
}
