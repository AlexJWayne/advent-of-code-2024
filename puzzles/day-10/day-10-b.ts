import Victor from 'victor';
import { Grid, toKey } from '../lib/grid.ts';
import { turnRight } from '../lib/vector.ts';
import chalk from 'chalk';

export function day10b(data: string[]): number {
  const grid = Grid.fromLines(data, { height: 0, visited: false }, (cell) => ({
    height: cell === '.' ? -1 : parseInt(cell),
  }));

  let count = 0;
  grid.forEach(({ height }, point) => {
    if (height === 0) {
      count += walk(grid, point);
      //console.log('score:', ends.size);
    }
  });

  return count;
}

function walk(
  grid: Grid<{ height: number; visited: boolean }>,
  point: Victor,
): number {
  grid.set(point, { visited: true });
  const { height } = grid.get(point);

  //console.log('walk');
  //debug(grid);
  if (height === 9) {
    //console.log('9');
    //debug(grid);
    //grid.forEach((cell, point) => grid.set(point, { visited: false }));
    return 1;
  }

  return getNext(grid, point).reduce((acc, next) => {
    return acc + walk(grid, next);
  }, 0);
}

function getNext(
  grid: Grid<{ height: number; visited: boolean }>,
  point: Victor,
): Victor[] {
  const valid: Victor[] = [];
  const { height } = grid.get(point);

  //debug(grid);

  let nextPointOffset = new Victor(0, 1);
  times(4, () => {
    const nextPoint = point.clone().add(nextPointOffset);
    const nextCell = grid.get(nextPoint);
    if (nextCell && nextCell.height === height + 1) valid.push(nextPoint);
    nextPointOffset = turnRight(nextPointOffset);
  });

  //console.log('n', height, valid);
  return valid;
}

function times(n: number, fn: (i: number) => void) {
  for (let i = 0; i < n; i++) fn(i);
}

function debug(grid: Grid<{ height: number; visited: boolean }>) {
  grid.print((cell) => {
    if (!cell.visited) return chalk.gray('.');
    if (cell.height === 0) return chalk.blue('0');
    if (cell.height === 9) return chalk.green('9');
    return cell.height.toString();
  });
}
