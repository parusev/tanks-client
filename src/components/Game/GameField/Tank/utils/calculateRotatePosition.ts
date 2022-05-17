import { Direction } from '../../../../../models/direction';
import { tankRotateDegreesByDirection } from '../constants/tankRotateDegreesByDirection';

export function calculateRotatePosition(
  currentRotatePosition: number,
  direction: Direction
): number {
  let rotatePositionAddendum =
    tankRotateDegreesByDirection[direction] - (currentRotatePosition % 360);

  if (rotatePositionAddendum > 180) {
    rotatePositionAddendum = (360 - rotatePositionAddendum) * -1;
  }

  return currentRotatePosition + rotatePositionAddendum;
}
