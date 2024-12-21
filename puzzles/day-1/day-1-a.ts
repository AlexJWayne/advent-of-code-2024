import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day1a(dataPath?: string) {
  const data = await readData(dataPath);
  const [aValues, bValues] = data.reduce<[number[], number[]]>(
    (acc, val) => {
      const [a, b] = val.split(/\D+/).map(Number);
      acc[0].push(a);
      acc[1].push(b);
      return acc;
    },
    [[], []]
  );

  aValues.sort();
  bValues.sort();

  return aValues.reduce((acc, aValue, i) => {
    const bValue = bValues[i];
    return acc + Math.abs(aValue - bValue);
  }, 0);
}

const answer = await day1a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
