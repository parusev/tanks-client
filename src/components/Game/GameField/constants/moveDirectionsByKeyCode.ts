import { Direction, Directions } from '../../../../models/direction';

export const moveDirectionsByKeyCode = new Map<string, Direction>([
  ['KeyA', Directions.left],
  ['KeyD', Directions.right],
  ['KeyW', Directions.top],
  ['KeyS', Directions.bottom],
  ['ArrowLeft', Directions.left],
  ['ArrowRight', Directions.right],
  ['ArrowUp', Directions.top],
  ['ArrowDown', Directions.bottom],
]);
