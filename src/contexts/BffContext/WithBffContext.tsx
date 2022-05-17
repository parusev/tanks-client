import { FC, memo, ReactNode } from 'react';
import BffContextProvider from './BffContextProvider';

const WithBffContext: FC<WithBffContextProps> = function ({ children }) {
  return <BffContextProvider>{children}</BffContextProvider>;
};

export default memo(WithBffContext);

interface WithBffContextProps {
  children: ReactNode;
}
