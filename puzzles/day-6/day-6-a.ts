import { Grid } from '../lib/grid.ts';
import Victor from 'victor';

type Cell = {
  obstacle: boolean;
  traversed: boolean;
};

export function day6a(data: string[]): number {
  const { grid, guardPosition } = parseGrid(data);
  return walk(grid, guardPosition);
}

function parseGrid(data: string[]) {
  let guardPosition = new Victor(0, 0);
  const grid = Grid.fromLines<Cell>(
    data,
    { obstacle: false, traversed: false },
    (char, point) => {
      if (char === '#') return { obstacle: true };
      if (char === '^') {
        guardPosition = point;
        return { traversed: true };
      }
    },
  );

  return {
    guardPosition,
    grid,
  };
}

function walk(grid: Grid<Cell>, initialPosition: Victor) {
  let position = initialPosition;
  let direction = new Victor(0, -1);

  while (true) {
    const nextPosition = position.clone().add(direction);

    if (!grid.has(nextPosition)) {
      grid.set(position, { traversed: true });
      break;
    }

    if (grid.get(nextPosition).obstacle) {
      turnRight(direction);
      continue;
    }

    grid.set(position, { traversed: true });
    position = nextPosition;
  }

  debug(grid);

  return [...grid.cells.values()].reduce(
    (acc, cell) => acc + (cell.traversed ? 1 : 0),
    0,
  );
}

function turnRight(vec: Victor): Victor {
  const { x, y } = vec;
  vec.x = -y;
  vec.y = x;
  return vec;
}

function debug(grid: Grid<Cell>): void {
  grid.print((cell) => {
    if (cell.obstacle) return '#';
    if (cell.traversed) return 'X';
    return '.';
  });
}
