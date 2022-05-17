import { FC, memo, ReactNode } from 'react';
import './GameFieldOverlay.scss';

const GameFieldOverlay: FC<GameFieldOverlayProps> = function ({ children }) {
  return <div className="game-field__overlay">{children}</div>;
};

export default memo(GameFieldOverlay);

interface GameFieldOverlayProps {
  children?: ReactNode;
}
