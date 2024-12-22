export function day2a(data: string[]): number {
  const safeLevelCount = data.reduce((acc, line) => {
    if (!line) return acc;

    let [current, ...values] = line.split(' ').map((n) => parseInt(n));
    const direction = values[0] > current ? 1 : -1;

    let found = 1;

    for (const value of values) {
      if ((value - current) * direction < 0) found = 0;

      const diff = Math.abs(current - value);
      if (diff < 1 || diff > 3) found = 0;

      current = value;
    }

    // console.log(line, ' :: ', found);

    return acc + found;
  }, 0);

  return safeLevelCount;
}
