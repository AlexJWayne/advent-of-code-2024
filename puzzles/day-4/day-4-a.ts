import { readData } from '../../shared.ts';
import chalk from 'chalk';

const word = 'XMAS';

const directions = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
];

export async function day4a(dataPath?: string) {
  const data = await readData(dataPath);
  let count = 0;

  for (const [x, row] of data.entries()) {
    for (const [y, value] of row.split('').entries()) {
      if (value === word[0]) {
        const allWordCoords = wordCoordsAtX(x, y);
        for (const wordCoords of allWordCoords) {
          let maybeWord = true;

          for (const [i, [wordX, wordY]] of wordCoords.entries()) {
            if (maybeWord && data[wordX]?.[wordY] !== word[i]) {
              maybeWord = false;
            }
            if (maybeWord) console.log(wordX, wordY, data[wordX]?.[wordY]);
          }

          if (maybeWord) count++;
        }
      }
    }
  }

  return count;
}

function countWordsAtX(data: string[], x: number, y: number) {}

function wordCoordsAtX(x: number, y: number): [number, number][][] {
  return directions.map(([xOffset, yOffset]) => {
    const points: [number, number][] = [];
    for (let i = 0; i < word.length; i++) {
      points.push([x + xOffset * i, y + yOffset * i]);
    }
    return points;
  });
}

const answer = await day4a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
