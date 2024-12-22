export function day2b(data: string[]): number {
  const safeLevelCount = data.reduce((acc, line) => {
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
