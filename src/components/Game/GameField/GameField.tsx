import { FC, memo, useCallback, useMemo, useRef } from 'react';
import { useBff } from '../../../contexts/BffContext/BffContext';
import { useEventListener } from '../../../hooks/useEventListener';
import { GameConfig } from '../../../models/gameConfig';
import { GameStatuses } from '../../../models/gameStatus';
import { GameWithState } from '../../../models/gameWithState';
import GameFieldBullet from './Bullet';
import { fieldBorderWidthStyle } from './constants/fieldBorderWidthStyle';
import { minLandBlockSideSize } from './constants/minLandBlockSideSize';
import { moveDirectionsByKeyCode } from './constants/moveDirectionsByKeyCode';
import { shotKeyCodes } from './constants/shotKeyCodes';
import './GameField.scss';
import GameFieldLand from './Land';
import GameFieldOverlay from './Overlay';
import GameFieldTank from './Tank';
import GameFieldWall from './Wall';

const GameField: FC<GameFieldProps> = function ({
  gameConfig,
  currentGame,
  userId,
}) {
  const bff = useBff();

  const lastShootTime = useRef<number>(0);
  const lastPressedDirectionKeyCode = useRef<string>();

  const { eventInterval, tankSizeInBlocks } = gameConfig;

  const {
    id: gameId,
    state: {
      height: fieldHeight,
      width: fieldWidth,
      walls,
      tanksByUserId,
      bullets,
      secondsLeft,
      status: gameStatus,
    },
  } = currentGame;

  const isGameNotActive = gameStatus !== GameStatuses.Active;

  const onKeyDown = useCallback(
    (event: Event) => {
      const { code } = event as KeyboardEvent;

      const direction = moveDirectionsByKeyCode.get(code);

      const isTankMove = direction !== undefined;

      const isShot = shotKeyCodes.has(code);

      if (!isTankMove && !isShot) {
        return;
      }

      event.preventDefault();

      if (isGameNotActive) {
        return;
      }

      const { isMoving, shotDirection } = tanksByUserId[userId];

      const now = Date.now();

      if (isTankMove && (!isMoving || direction !== shotDirection)) {
        bff.startMoveTank(gameId, userId, direction);

        lastPressedDirectionKeyCode.current = code;
      } else if (isShot && now - lastShootTime.current > eventInterval) {
        bff.shoot(gameId, userId);

        lastShootTime.current = now;
      }
    },

    [bff, eventInterval, gameId, isGameNotActive, tanksByUserId, userId]
  );

  const onKeyUp = useCallback(
    (event: Event) => {
      const { code } = event as KeyboardEvent;

      if (lastPressedDirectionKeyCode.current !== code) {
        return;
      }

      event.preventDefault();

      if (gameStatus !== GameStatuses.Active) {
        return;
      }

      bff.stopMoveTank(gameId, userId);
    },
    [bff, gameId, gameStatus, userId]
  );

  useEventListener<KeyboardEvent>('keydown', onKeyDown);
  useEventListener<KeyboardEvent>('keyup', onKeyUp);

  const { fieldStyle, blockSideSizeStyle } = useMemo(() => {
    const blockSideSizeWithoutBorder = `min(100vw / ${fieldWidth}, 100vh / ${fieldHeight})`;

    const minWidthStyle = `${fieldWidth * minLandBlockSideSize}px`;
    const minHeightStyle = `${fieldHeight * minLandBlockSideSize}px`;

    const widthStyle = `max(calc(${blockSideSizeWithoutBorder} * ${fieldWidth} - ${fieldBorderWidthStyle} * 2), ${minWidthStyle})`;
    const heightStyle = `max(calc(${blockSideSizeWithoutBorder} * ${fieldHeight} - ${fieldBorderWidthStyle} * 2), ${minHeightStyle})`;

    const blockSideSizeStyle = `calc(${widthStyle} / ${fieldWidth})`;

    return {
      fieldStyle: {
        borderWidth: fieldBorderWidthStyle,
        width: widthStyle,
        height: heightStyle,
      },
      blockSideSizeStyle,
    };
  }, [fieldHeight, fieldWidth]);

  const countdownMessage = secondsLeft > 0 ? `Get ready! ${secondsLeft}` : null;

  return (
    <div className="game-field" style={fieldStyle}>
      <GameFieldLand />
      {walls.map((wall) => {
        return (
          <GameFieldWall
            key={`${wall.x}-${wall.y}`}
            wall={wall}
            blockSideSizeStyle={blockSideSizeStyle}
          />
        );
      })}

      {Object.values(tanksByUserId).map((tank) => {
        return (
          <GameFieldTank
            key={tank.userId}
            tank={tank}
            userId={userId}
            tankSizeInBlocks={tankSizeInBlocks}
            blockSideSizeStyle={blockSideSizeStyle}
            eventInterval={eventInterval}
          />
        );
      })}
      {Object.values(bullets).map((bullet) => {
        return (
          <GameFieldBullet
            key={bullet.id}
            bullet={bullet}
            userId={userId}
            tankSizeInBlocks={tankSizeInBlocks}
            blockSideSizeStyle={blockSideSizeStyle}
            eventInterval={eventInterval}
          />
        );
      })}
      {isGameNotActive && (
        <GameFieldOverlay>{countdownMessage}</GameFieldOverlay>
      )}
    </div>
  );
};

export default memo(GameField);

interface GameFieldProps {
  gameConfig: GameConfig;
  currentGame: GameWithState;
  userId: string;
}
