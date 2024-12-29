import Victor from 'victor';
import { Grid, toKey } from '../lib/grid.ts';
import { Point } from '../lib/vector.ts';
import chalk from 'chalk/index.js';

const adjacent = [
  new Victor(1, 0),
  new Victor(0, 1),
  new Victor(-1, 0),
  new Victor(0, -1),
];

let grid: Grid<{ v: string; id: number }>;

let nextRegionId = 1;
const regions: Map<number, string> = new Map();
const regionsToPoints: Map<number, Set<Point>> = new Map();

export function day12a(data: string[]): number {
  grid = Grid.fromLines(data, { v: '.', id: 0 }, (char) => ({ v: char }));

  grid.print(({ v, id }) => v);

  grid.forEach((cell, point) => {
    const adjRegions = findAdjacentRegions(point);

    if (adjRegions.size === 0) {
      const id = createRegion(cell.v);
      addToRegion(point, id);
    } else {
      const id = adjRegions.values().next().value;
      addToRegion(point, id);

      if (adjRegions.size > 1) mergeRegions(adjRegions);
    }
  });

  grid.print(({ v, id }) => `${id}\t` || '\t');

  //const price = [...regions.keys()].map()

  return 0;
}

function findAdjacentRegions(point: Point): Set<number> {
  const { v } = grid.get(point);
  const ids = new Set<number>();
  for (const adj of adjacent) {
    const adjCell = grid.get({ x: point.x + adj.x, y: point.y + adj.y });
    if (adjCell?.id && v === adjCell.v) ids.add(adjCell.id);
  }
  return ids;
}

function createRegion(v: string): number {
  const id = nextRegionId++;
  regions.set(id, v);
  return id;
}

function addToRegion(point: Point, id: number) {
  grid.set(point, { id });

  if (!regionsToPoints.get(id)) regionsToPoints.set(id, new Set());
  regionsToPoints.get(id).add(point);
}

function mergeRegions(ids: Iterable<number>) {
  const id = nextRegionId++;

  for (const prevId of ids) {
    const v = regions.get(prevId);
    regions.set(id, v);
    regions.delete(prevId);

    const points = regionsToPoints.get(prevId);
    regionsToPoints.set(id, points);
    regionsToPoints.delete(prevId);

    for (const point of points) {
      grid.set(point, { id });
    }
  }
}
