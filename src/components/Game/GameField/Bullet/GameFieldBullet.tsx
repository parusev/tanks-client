import { FC, memo, useMemo } from 'react';
import { Bullet } from '../../../../models/bullet';
import { bulletRotateDegreesByDirection } from './constants/bulletRotateDegreesByDirection';
import { bulletToTankSize } from './constants/bulletToTankSize';
import './GameFieldBullet.scss';

const GameFieldBullet: FC<GameFieldBulletProps> = function ({
  bullet,
  userId,
  tankSizeInBlocks,
  blockSideSizeStyle,
  eventInterval,
}) {
  const { bulletCoordinatesAddendum, bulletSideStyle } = useMemo(() => {
    const bulletCoordinatesAddendum =
      ((1 - bulletToTankSize) * tankSizeInBlocks) / 2;

    const bulletSideStyle = `calc(${blockSideSizeStyle} * ${tankSizeInBlocks} * ${bulletToTankSize})`;

    return {
      bulletCoordinatesAddendum,
      bulletSideStyle,
    };
  }, [blockSideSizeStyle, tankSizeInBlocks]);

  const { x, y, userId: bulletUserId, direction } = bullet;

  const bulletStyle = {
    width: bulletSideStyle,
    height: bulletSideStyle,
    top: `calc(${y + bulletCoordinatesAddendum} * ${blockSideSizeStyle})`,
    left: `calc(${x + bulletCoordinatesAddendum} * ${blockSideSizeStyle})`,
    transform: `rotate(${bulletRotateDegreesByDirection[direction]}deg)`,
    transition: `top ${eventInterval}ms, left ${eventInterval}ms`,
  };

  return (
    <div
      className={`game-field__bullet ${
        bulletUserId === userId
          ? 'game-field__bullet_user'
          : 'game-field__bullet_enemy'
      }`}
      style={bulletStyle}
    ></div>
  );
};

export default memo(GameFieldBullet);

interface GameFieldBulletProps {
  bullet: Bullet;
  userId: string;
  tankSizeInBlocks: number;
  blockSideSizeStyle: string;
  eventInterval: number;
}
