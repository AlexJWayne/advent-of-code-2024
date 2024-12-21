import { runInThisContext } from 'vm';
import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day2b(dataPath?: string) {
  const lines = await readData(dataPath);

  const safeLevelCount = lines.reduce((acc, line, i) => {
    if (!line) return acc;

    let values = line.split(' ').map((n) => parseInt(n));

    if (check(values)) return acc + 1;

    for (let i = 0; i < values.length; i++) {
      const shortValues = [...values];
      shortValues.splice(i, 1);
      if (check(shortValues)) return acc + 1;
    }

    return acc;
  }, 0);

  return safeLevelCount;
}

function check([current, ...values]: number[]) {
  const direction = values[0] > current ? 1 : -1;

  for (const value of values) {
    if ((value - current) * direction < 0) return false;

    const diff = Math.abs(current - value);
    if (diff < 1 || diff > 3) return false;

    current = value;
  }

  return true;
}

const answer = await day2b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
