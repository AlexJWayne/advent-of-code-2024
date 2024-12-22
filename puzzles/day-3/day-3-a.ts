export function day3a(data: string[]): number {
  const matches = data.join().match(/mul\(\d{1,3},\d{1,3}\)/g);

  return matches.reduce((acc, command) => {
    const [_, op, x, y] = command.match(/(\w+)\((\d{1,3}),(\d{1,3})\)/);
    console.log(_, x, '*', y);

    return acc + parseInt(x) * parseInt(y);
  }, 0);
}
