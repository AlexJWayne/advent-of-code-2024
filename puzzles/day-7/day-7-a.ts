import { readData } from '../../shared.ts';
import chalk from 'chalk';

type Equation = { result: number; terms: number[] };

export async function day7a(dataPath?: string) {
  const data = await readData(dataPath);
  const vaildEquations = parse(data).filter(isValid);
  const sum = vaildEquations.reduce((acc, { result }) => acc + result, 0);
  return sum;
}

function parse(data: string[]): Equation[] {
  return data.map((line) => {
    const [result, ...terms] = line.split(' ').map((v) => parseInt(v));
    return { result, terms };
  });
}

function isValid({ result, terms }: Equation) {
  const maxBin = 1 << terms.length;

  for (let i = 0; i < maxBin; i++) {
    const maybeResult = terms.slice(1).reduce((acc, term, termIndex) => {
      if (i & (1 << termIndex)) return acc + term;
      return acc * term;
    }, terms[0]);

    if (maybeResult === result) return true;
  }

  return false;
}

const answer = await day7a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
