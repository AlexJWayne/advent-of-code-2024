import Victor from 'victor';

export type Point = { x: number; y: number };

export class Grid<T extends Record<PropertyKey, unknown>> {
  cells: Map<string, T> = new Map();

  static fromLines<T extends Record<PropertyKey, unknown>>(
    lines: string[],
    initial: T,
    setCell: (char: string, point: Victor) => Partial<NoInfer<T>>,
  ): Grid<T> {
    const grid = new Grid(
      new Victor(lines[0]?.length || 0, lines.length),
      initial,
    );

    for (const [y, line] of lines.entries()) {
      for (const [x, char] of line.split('').entries()) {
        grid.set({ x, y }, setCell(char, new Victor(x, y)));
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

  print(getCell: (cell: T, point: Victor) => string | number): void {
    let out = '';
    this.forEach((cell, point) => {
      out += getCell(cell, point);
    });
    console.log(out);
  }
}

function toKey({ x, y }: Point): string {
  return `${x},${y}`;
}
