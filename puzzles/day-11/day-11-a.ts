// 0 -> 1
// even digits -> split
// *= 2024

const blinks = 75;

let stones: number[];
let count = 0;
const memo: Record<number, Record<number, number>> = {};

export function day11a([line]: string[]): number {
  stones = line.split(' ').map((n) => parseInt(n));

  for (const [i, stone] of stones.entries()) {
    console.log('---', i, count);
    count += blink(stone, blinks);
  }

  return count;
}

function blink(value: number, iterations: number): number {
  const cached = memo[value]?.[iterations];
  if (cached !== undefined) return cached;

  if (!memo[value]) memo[value] = {};

  if (iterations === 0) return 1;

  if (value === 0) {
    return cache(value, iterations, blink(1, iterations - 1));
  }

  const digits = Math.floor(Math.log10(value)) + 1;
  if (digits % 2 === 0) {
    const halfPower = Math.pow(10, digits / 2);
    const right = value % halfPower;
    const left = Math.floor(value / halfPower);

    return cache(
      value,
      iterations,
      blink(left, iterations - 1) + blink(right, iterations - 1),
    );
  }

  return cache(value, iterations, blink(value * 2024, iterations - 1));
}

function cache(value: number, iterations: number, result: number): number {
  memo[value][iterations] = result;
  return result;
}
