import { FC, memo } from 'react';
import './GameFieldLand.scss';

const GameFieldLand: FC = function () {
  return <div className="game-field__land"></div>;
};

export default memo(GameFieldLand);
