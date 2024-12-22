export function day3b(data: string[]): number {
  const matches = data
    .join()
    .replace(/don't\(\).*?(do\(\)|$)/gm, '')
    .match(/mul\(\d{1,3},\d{1,3}\)/g);

  return matches.reduce((acc, command) => {
    const [_, op, x, y] = command.match(/(\w+)\((\d{1,3}),(\d{1,3})\)/);
    return acc + parseInt(x) * parseInt(y);
  }, 0);
}
