import { readData } from '../../shared.ts';
import chalk from 'chalk';
import { Point } from '../lib/grid.ts';

export async function day8a(dataPath?: string) {
  const data = await readData(dataPath);
  const { map, size } = parse(data);
  const antinodes = findAntinodes(map, size);

  for (let x = 0; x < size; x++) {
    let row = '';
    for (let y = 0; y < size; y++) {
      row += antinodes.get(y).get(x) ? '#' : '.';
    }
    console.log(row);
  }

  return countAntinodes(antinodes);
}

function parse(data: string[]) {
  const map = new Map<string, Set<Point>>();

  for (const [y, line] of data.entries()) {
    for (const [x, char] of line.split('').entries()) {
      if (char !== '.') {
        if (!map.has(char)) map.set(char, new Set());
        map.get(char).add({ x, y });
      }
    }
  }

  return {
    map,
    size: data.length,
  };
}

function findAntinodes(map: Map<string, Set<Point>>, size: number) {
  const antinodes = new Map<number, Map<number, boolean>>();
  for (let i = 0; i < size; i++) {
    antinodes.set(i, new Map());
  }

  for (const channel of map.keys()) {
    for (const a of map.get(channel)) {
      for (const b of map.get(channel)) {
        if (vecEql(a, b)) continue;
        const distance = vecSub(b, a);

        const antipodeA = vecSub(a, distance);
        if (inBounds(size, antipodeA))
          antinodes.get(antipodeA.y).set(antipodeA.x, true);

        const antipodeB = vecAdd(b, distance);
        if (inBounds(size, antipodeB))
          antinodes.get(antipodeB.y).set(antipodeB.x, true);
      }
    }
  }

  return antinodes;
}

function countAntinodes(antinodes: Map<number, Map<number, boolean>>) {
  return [...antinodes.values()].reduce((acc, row) => {
    return acc + row.size;
  }, 0);
}

function inBounds(size: number, { x, y }: Point) {
  return 0 <= x && x < size && 0 <= y && y < size;
}

function vecEql(a: Point, b: Point): boolean {
  return a.x === b.x && a.y === b.y;
}

function vecAdd(a: Point, b: Point): Point {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  };
}

function vecSub(a: Point, b: Point): Point {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
  };
}

const answer = await day8a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
