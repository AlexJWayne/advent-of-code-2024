import Victor from 'victor';
import { Grid } from '../lib/grid.ts';

const word = 'XMAS';

const directions = [
  new Victor(1, 0),
  new Victor(1, 1),
  new Victor(0, 1),
  new Victor(-1, 1),
  new Victor(-1, 0),
  new Victor(-1, -1),
  new Victor(0, -1),
  new Victor(1, -1),
];

export function day4a(data: string[]): number {
  let count = 0;

  const grid = Grid.fromLines(data, { letter: '.' }, (letter) => ({ letter }));

  grid.forEach((cell, point) => {
    if (cell.letter !== word[0]) return;

    const allWordCoords = wordCoordsAtX(point);

    for (const wordCoords of allWordCoords) {
      let maybeWord = true;

      for (const [i, point] of wordCoords.entries()) {
        if (maybeWord && grid.get(point)?.letter !== word[i]) {
          maybeWord = false;
        }
      }

      if (maybeWord) count++;
    }
  });

  return count;
}

function wordCoordsAtX(point: Victor): Victor[][] {
  return directions.map((offset) => {
    const points: Victor[] = [];
    for (let i = 0; i < word.length; i++) {
      points.push(point.clone().add(offset.clone().multiplyScalar(i)));
    }
    return points;
  });
}
