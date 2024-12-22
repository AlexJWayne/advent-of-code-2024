export function day5a(data: string[]): number {
  const { dependencies, pages } = parse(data);

  const correctPageSequences = pages.filter((sequence) =>
    isCorrect(dependencies, sequence),
  );

  return getAnswer(correctPageSequences);
}

function parse(data: string[]) {
  const dependencies = new Map<number, Set<number>>();
  const pages: number[][] = [];

  for (const line of data) {
    if (line === '') continue;

    if (line.includes('|')) {
      const [a, b] = line.split('|').map((n) => parseInt(n));
      if (!dependencies.get(b)) dependencies.set(b, new Set());
      dependencies.get(b).add(a);
    }

    if (line.includes(',')) {
      pages.push(line.split(',').map((n) => parseInt(n)));
    }
  }

  return { dependencies, pages };
}

function isCorrect(
  dependencies: Map<number, Set<number>>,
  pages: number[],
): boolean {
  const pagesSet = new Set(pages);
  const satisfied = new Set<number>();

  for (const page of pages) {
    const needs = dependencies.get(page);
    satisfied.add(page);
    if (!needs) continue;

    for (const need of needs) {
      const needSatisfied = satisfied.has(need);
      const needInSet = pagesSet.has(need);
      if (needInSet && !needSatisfied) return false;
    }
  }

  return true;
}

function getAnswer(sequences: number[][]) {
  return sequences.reduce((acc, sequence) => {
    const middleIndex = Math.floor(sequence.length / 2);
    return acc + sequence[middleIndex];
  }, 0);
}
