import Victor from 'victor';

export type Point = { x: number; y: number };

export function turnRight(point: Point): Victor {
  return new Victor(-point.y, point.x);
}
