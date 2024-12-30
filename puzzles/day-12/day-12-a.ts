import Victor from 'victor'
import { Grid } from '../lib/grid.ts'
import { Point } from '../lib/vector.ts'

export const adjacent = [
  new Victor(1, 0),
  new Victor(0, 1),
  new Victor(-1, 0),
  new Victor(0, -1),
]

export type Ctx = {
  grid: Grid<{ v: string; id: number }>
  nextRegionId: number
  regions: Map<number, string>
  regionsToPoints: Map<number, Set<Point>>
}

export function day12a(data: string[]): number {
  const ctx: Ctx = createContext(data)

  // grid.print(({ v, id }) => v);
  parseRegions(ctx)
  // grid.print(({ v, id }) => `${id}\t` || '\t');

  return getPrice(ctx)
}

export function createContext(data: string[]): Ctx {
  return {
    grid: Grid.fromLines(data, { v: '.', id: 0 }, (char) => ({ v: char })),
    nextRegionId: 1,
    regions: new Map(),
    regionsToPoints: new Map(),
  }
}

export function parseRegions(ctx: Ctx) {
  ctx.grid.forEach((cell, point) => {
    const adjRegions = findAdjacentRegions(ctx, point)

    if (adjRegions.size === 0) {
      const id = createRegion(ctx, cell.v)
      addToRegion(ctx, point, id)
    } else {
      const id = adjRegions.values().next().value
      addToRegion(ctx, point, id)

      if (adjRegions.size > 1) mergeRegions(ctx, adjRegions)
    }
  })
}

function findAdjacentRegions({ grid }: Ctx, point: Point): Set<number> {
  const { v } = grid.get(point)
  const ids = new Set<number>()
  for (const adj of adjacent) {
    const adjCell = grid.get({ x: point.x + adj.x, y: point.y + adj.y })
    if (adjCell?.id && v === adjCell.v) ids.add(adjCell.id)
  }
  return ids
}

function createRegion(ctx: Ctx, v: string): number {
  const id = ctx.nextRegionId++
  ctx.regions.set(id, v)
  return id
}

function addToRegion({ grid, regionsToPoints }: Ctx, point: Point, id: number) {
  grid.set(point, { id })

  if (!regionsToPoints.get(id)) regionsToPoints.set(id, new Set())
  regionsToPoints.get(id).add(point)
}

function mergeRegions(ctx: Ctx, ids: Iterable<number>) {
  const id = ctx.nextRegionId++

  for (const prevId of ids) {
    const v = ctx.regions.get(prevId)
    ctx.regions.set(id, v)
    ctx.regions.delete(prevId)

    const points = ctx.regionsToPoints.get(prevId)
    ctx.regionsToPoints.set(
      id,
      (ctx.regionsToPoints.get(id) ?? new Set()).union(points),
    )
    ctx.regionsToPoints.delete(prevId)

    for (const point of points) {
      ctx.grid.set(point, { id })
    }
  }
}

function findPerimeterAtPoint({ grid }: Ctx, point: Point): number {
  const { v } = grid.get(point)
  const connectedSides = adjacent.filter((adjPoint) => {
    return (
      v ===
      grid.get({
        x: point.x + adjPoint.x,
        y: point.y + adjPoint.y,
      })?.v
    )
  }).length
  return 4 - connectedSides
}

function getPrice(ctx: Ctx): number {
  return [...ctx.regions.keys()]
    .map((id) => {
      const v = ctx.regions.get(id)
      const points = [...ctx.regionsToPoints.get(id)]

      const perimeter = points
        .map((point) => findPerimeterAtPoint(ctx, point))
        .reduce((acc, v) => acc + v, 0)

      return perimeter * points.length
    })
    .reduce((acc, v) => acc + v, 0)
}
