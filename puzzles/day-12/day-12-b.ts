import { Point } from '../lib/vector.ts'
import { adjacent, createContext, Ctx, parseRegions } from './day-12-a.ts'

export function day12b(data: string[]): number {
  const ctx = createContext(data)
  parseRegions(ctx)

  return 0
}

function getPerimeterSegments(
  { grid, regionsToPoints, regions }: Ctx,
  id: number,
): [Point, Point][] {
  const v = regions.get(id)
  const points = regionsToPoints.get(id)
  const segments: [Point, Point][] = []

  for (const point of points) {
    for (const [i, direction] of adjacent.entries()) {
      const leftDirection = adjacent[i === 0 ? 3 : i - 1]
      const rightDirection = adjacent[i === 3 ? 0 : i + 1]

      const cell = grid.get({
        x: point.x + direction.x,
        y: point.y + direction.y,
      })
      const isEdge = v !== cell?.v

      if (isEdge) {
        segments.push([
          {
            x: point.x + Math.max(leftDirection.x, 0),
            y: point.y + Math.max(leftDirection.y, 0),
          },
          {
            x: point.x + Math.max(rightDirection.x, 0),
            y: point.y + Math.max(rightDirection.y, 0),
          },
        ])
      }
    }
  }

  return segments
}
