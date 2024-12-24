import chalk from 'chalk';
import { Grid } from '../lib/grid.ts';

type Cell = {
  antenna: string | null;
  antinode: boolean;
};

export function day8b(data: string[]): number {
  const grid = parse(data);

  console.log('antennas');
  grid.print((cell) => cell.antenna || '.');

  findAntinodes(grid);
  grid.print((cell) => {
    let fmt = (s: string) => s;
    if (cell.antinode) fmt = chalk.yellow;
    return fmt(cell.antenna || (cell.antinode ? '#' : chalk.gray('.')));
  });

  return countAntinodes(grid);
}

function parse(data: string[]): Grid<Cell> {
  return Grid.fromLines<Cell>(
    data,
    { antenna: null, antinode: false },
    (cell, point, grid) => {
      const channel = cell !== '.' ? cell : null;
      if (channel) {
        grid.tagPoint(point, channel);
        return { antenna: channel };
      }
      return {};
    },
  );
}

function findAntinodes(grid: Grid<Cell>): Grid<Cell> {
  for (const channel of grid.tags) {
    const pointsWithChannel = grid.pointsByTag.get(channel);
    for (const a of pointsWithChannel) {
      for (const b of pointsWithChannel) {
        if (a.isEqualTo(b)) {
          grid.set(a, { antinode: true });
          continue;
        }

        const diff = b.clone().subtract(a);

        const pointA = a.clone();
        while (grid.has(pointA)) {
          pointA.subtract(diff);
          grid.set(pointA, { antinode: true });
        }

        const pointB = b.clone();
        while (grid.has(pointB)) {
          pointB.add(diff);
          grid.set(pointB, { antinode: true });
        }
      }
    }
  }

  return grid;
}

function countAntinodes(grid: Grid<Cell>): number {
  let count = 0;

  grid.forEach((cell) => {
    if (cell.antinode) count++;
  });

  return count;
}
