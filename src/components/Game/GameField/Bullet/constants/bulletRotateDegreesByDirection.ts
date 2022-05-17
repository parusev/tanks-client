import { Direction, Directions } from '../../../../../models/direction';

export const bulletRotateDegreesByDirection: Record<Direction, number> = {
  [Directions.top]: 0,
  [Directions.right]: 90,
  [Directions.bottom]: 180,
  [Directions.left]: -90,
};
