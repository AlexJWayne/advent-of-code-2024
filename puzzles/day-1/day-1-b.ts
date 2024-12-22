export function day1b(data: string[]): number {
  const [aValues, bValues] = data.reduce<[number[], number[]]>(
    (acc, val) => {
      const [a, b] = val.split(/\D+/).map(Number);
      acc[0].push(a);
      acc[1].push(b);
      return acc;
    },
    [[], []],
  );

  const bCounts = bValues.reduce((acc, bValue) => {
    acc.set(bValue, (acc.get(bValue) ?? 0) + 1);
    return acc;
  }, new Map<number, number>());

  return aValues.reduce((acc, aValue) => {
    return acc + aValue * (bCounts.get(aValue) ?? 0);
  }, 0);
}
