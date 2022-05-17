import { FC, memo } from 'react';
import { Wall } from '../../../../models/wall';
import './GameFieldWall.scss';

const GameFieldWall: FC<GameFieldWallProps> = function ({
  wall,
  blockSideSizeStyle,
}) {
  const { x, y } = wall;

  const wallStyle = {
    width: blockSideSizeStyle,
    height: blockSideSizeStyle,
    top: `calc(${y} * ${blockSideSizeStyle})`,
    left: `calc(${x} * ${blockSideSizeStyle})`,
  };

  return <div className="game-field__wall" style={wallStyle}></div>;
};

export default memo(GameFieldWall);

interface GameFieldWallProps {
  wall: Wall;
  blockSideSizeStyle: string;
}
