export function day3a(data: string[]): number {
  const matches = data.join().match(/mul\(\d{1,3},\d{1,3}\)/g);

  return matches.reduce((acc, command) => {
    const [_, x, y] = command.match(/mul\((\d{1,3}),(\d{1,3})\)/);
    return acc + parseInt(x) * parseInt(y);
  }, 0);
}
