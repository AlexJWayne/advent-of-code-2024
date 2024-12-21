import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day3a(dataPath?: string) {
  const data = (await readData(dataPath)).join('');
  const matches = data.match(/mul\(\d{1,3},\d{1,3}\)/g);

  return matches.reduce((acc, command) => {
    const [_, op, x, y] = command.match(/(\w+)\((\d{1,3}),(\d{1,3})\)/);
    console.log(_, x, '*', y);

    return acc + parseInt(x) * parseInt(y);
  }, 0);
}

const answer = await day3a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
