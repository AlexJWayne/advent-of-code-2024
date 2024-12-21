import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day3b(dataPath?: string) {
  const data = (await readData(dataPath)).join('');
  const matches = data
    .replace(/don't\(\).*?(do\(\)|$)/gm, '')
    .match(/mul\(\d{1,3},\d{1,3}\)/g);

  return matches.reduce((acc, command) => {
    const [_, op, x, y] = command.match(/(\w+)\((\d{1,3}),(\d{1,3})\)/);
    return acc + parseInt(x) * parseInt(y);
  }, 0);
}

const answer = await day3b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
