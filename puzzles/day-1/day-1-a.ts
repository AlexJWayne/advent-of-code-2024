export function day1a(data: string[]): number {
  const [aValues, bValues] = data.reduce<[number[], number[]]>(
    (acc, val) => {
      const [a, b] = val.split(/\D+/).map(Number);
      acc[0].push(a);
      acc[1].push(b);
      return acc;
    },
    [[], []],
  );

  aValues.sort();
  bValues.sort();

  return aValues.reduce(
    (acc, aValue, i) => acc + Math.abs(aValue - bValues[i]),
    0,
  );
}
