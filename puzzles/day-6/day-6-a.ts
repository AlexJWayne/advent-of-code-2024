import { readData } from '../../shared.ts';
import chalk from 'chalk';
import { Grid } from '../lib/grid.ts';
import Victor from 'victor';
import { dir } from 'console';

type Cell = { obstacle: boolean; traversed: boolean };

export async function day6a(dataPath?: string) {
  const data = await readData(dataPath);

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

  walk(grid, guardPosition);

  debug(grid);

  return {
    guardPosition,
    grid,
  };
}

function walk(grid: Grid<Cell>, initialPosition: Victor) {
  let position = initialPosition;
  let direction = new Victor(0, -1);

  while (true) {
    //console.log('---', position, direction);
    //debug(grid);
    const nextPosition = position.clone().add(direction);
    if (!grid.has(nextPosition)) {
      grid.set(position, { traversed: true });
      break;
    }

    const nextCell = grid.get(nextPosition);

    if (nextCell.obstacle) {
      turnRight(direction);
      continue;
    }

    grid.set(position, { traversed: true });
    position = nextPosition;
  }

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

const answer = await day6a();
console.log('Your Answer:', answer);
