import Victor from 'victor';
import { Point } from './vector.ts';

export class Grid<
  T extends Record<PropertyKey, unknown>,
  Tag extends string = string,
> {
  cells: Map<string, T> = new Map();

  tags: Set<Tag> = new Set();
  tagsByPoint: Map<string, Set<Tag>> = new Map();
  pointsByTag: Map<Tag, Set<Victor>> = new Map();

  static fromLines<T extends Record<PropertyKey, unknown>>(
    lines: string[],
    initial: T,
    setCell: (char: string, point: Victor, grid: Grid<T>) => Partial<T>,
  ): Grid<T> {
    const grid = new Grid(
      new Victor(lines[0]?.length || 0, lines.length),
      initial,
    );

    for (const [y, line] of lines.entries()) {
      for (const [x, char] of line.split('').entries()) {
        grid.set({ x, y }, setCell(char, new Victor(x, y), grid));
      }
    }

    return grid;
  }

  constructor(
    public size: Victor,
    initial: T,
  ) {
    for (let x = 0; x < size.x; x++) {
      for (let y = 0; y < size.y; y++) {
        this.set({ x, y }, { ...initial });
      }
    }
  }

  get(point: Point): T {
    return this.cells.get(toKey(point));
  }

  set(point: Point, cell: Partial<T>): void {
    if (!this.has(point)) return;
    this.cells.set(toKey(point), {
      ...this.get(point),
      ...cell,
    });
  }

  has(point: Point): boolean {
    return (
      point.x >= 0 &&
      point.x < this.size.x &&
      point.y >= 0 &&
      point.y < this.size.y
    );
  }

  forEach(fn: (cell: T, point: Victor) => void): void {
    for (let y = 0; y < this.size.y; y++) {
      for (let x = 0; x < this.size.x; x++) {
        const point = new Victor(x, y);
        fn(this.get(point), point);
      }
    }
  }

  tagPoint(point: Victor, tag: Tag): Grid<T, Tag> {
    if (!this.has(point)) return this;
    this.tags.add(tag);

    const key = toKey(point);
    if (!this.tagsByPoint.get(key)) this.tagsByPoint.set(key, new Set());
    this.tagsByPoint.get(key).add(tag);

    if (!this.pointsByTag.get(tag)) this.pointsByTag.set(tag, new Set());
    this.pointsByTag.get(tag).add(point);
    return this;
  }

  getTags(point: Point): Set<Tag> {
    return this.tagsByPoint.get(toKey(point)) || new Set();
  }

  //removeTag(point: Victor, tag: Tag): gaarid<t, tag> {
  //  this.tagsByPoint.get(toKey(point), )
  //}

  print(getCell: (cell: T, point: Victor) => string | number): void {
    let out = '';
    for (let y = 0; y < this.size.y; y++) {
      for (let x = 0; x < this.size.x; x++) {
        const point = new Victor(x, y);
        out += getCell(this.get(point), point);
      }
      out += '\n';
    }
    console.log(out);
  }
}

export function toKey({ x, y }: Point): string {
  return `${x},${y}`;
}
