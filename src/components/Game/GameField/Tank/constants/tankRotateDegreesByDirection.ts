import { Direction, Directions } from '../../../../../models/direction';

export const tankRotateDegreesByDirection: Record<Direction, number> = {
  [Directions.top]: 360,
  [Directions.right]: 90,
  [Directions.bottom]: 180,
  [Directions.left]: 270,
};
