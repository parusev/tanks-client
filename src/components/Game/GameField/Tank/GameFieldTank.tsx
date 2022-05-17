import { FC, memo, useMemo, useRef } from 'react';
import { Tank } from '../../../../models/tank';
import { tankRotateDegreesByDirection } from './constants/tankRotateDegreesByDirection';
import './GameFieldTank.scss';
import { calculateRotatePosition } from './utils/calculateRotatePosition';

const GameFieldTank: FC<GameFieldTankProps> = function ({
  tank,
  userId,
  tankSizeInBlocks,
  blockSideSizeStyle,
  eventInterval,
}) {
  const { x, y, userId: tankUserId, shotDirection } = tank;

  const rotatePosition = useRef<number>();

  if (rotatePosition.current === undefined) {
    rotatePosition.current = tankRotateDegreesByDirection[shotDirection];
  }

  const currentRotatePosition = rotatePosition.current ?? 0;

  const calculatedRotatePosition = useMemo(() => {
    return calculateRotatePosition(currentRotatePosition, shotDirection);
  }, [currentRotatePosition, shotDirection]);

  rotatePosition.current = calculatedRotatePosition;

  const tankSideStyle = useMemo(() => {
    return `calc(${blockSideSizeStyle} * ${tankSizeInBlocks})`;
  }, [blockSideSizeStyle, tankSizeInBlocks]);

  const tankStyle = {
    width: tankSideStyle,
    height: tankSideStyle,
    top: `calc(${y} * ${blockSideSizeStyle})`,
    left: `calc(${x} * ${blockSideSizeStyle})`,
    transition: `top ${eventInterval}ms, left ${eventInterval}ms, transform ${eventInterval}ms`,
    transform: `rotate(${calculatedRotatePosition}deg)`,
  };

  return (
    <div
      className={`game-field__tank ${
        tankUserId === userId
          ? 'game-field__tank_user'
          : 'game-field__tank_enemy'
      }`}
      style={tankStyle}
    ></div>
  );
};

export default memo(GameFieldTank);

interface GameFieldTankProps {
  tank: Tank;
  userId: string;
  tankSizeInBlocks: number;
  blockSideSizeStyle: string;
  eventInterval: number;
}
