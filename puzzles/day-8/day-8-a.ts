import { Grid, Point } from '../lib/grid.ts';

type Cell = {
  antenna: string | null;
  antinode: boolean;
};

export function day8a(data: string[]): number {
  const grid = parse(data);

  console.log('antennas');
  grid.print((cell) => cell.antenna || '.');

  findAntinodes(grid);
  grid.print((cell) => (cell.antinode ? '#' : '.'));

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
        if (a.isEqualTo(b)) continue;
        const diff = b.clone().subtract(a);
        grid.set(a.clone().subtract(diff), { antinode: true });
        grid.set(b.clone().add(diff), { antinode: true });
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
