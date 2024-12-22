import chalk from 'chalk';
import { readFile } from 'fs/promises';

export async function run() {
  const [_1, _2, day, part, sample] = process.argv;
  const pathPrefix = `./puzzles/day-${day}/day-${day}-${part}`;

  const data = (
    await readFile(`${pathPrefix}.${sample === 's' ? 'sample-' : ''}data.txt`)
  )
    .toString()
    .split('\n');

  const dayModule = await import(`${pathPrefix}.ts`);

  const calculation: (data: string[]) => number = dayModule[`day${day}${part}`];
  const answer = calculation(data);
  console.log(chalk.green('Answer:'), answer);
}

run();
