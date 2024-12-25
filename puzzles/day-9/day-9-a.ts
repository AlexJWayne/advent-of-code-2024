import chalk from 'chalk';

const debug = false;

export function day9a([input]: string[]): number {
  const data: number[] = [];
  const free: number[] = [];

  let currentIndex = 0;
  let currentFileId = 0;

  let mode: 'file' | 'free' = 'file';
  for (const value of input.split('').map((n) => parseInt(n))) {
    switch (mode) {
      case 'file':
        times(value, (i) => (data[currentIndex + i] = currentFileId));
        currentFileId++;
        mode = 'free';
        break;

      case 'free':
        times(value, (i) => {
          free.push(currentIndex + i);
        });
        mode = 'file';
        break;
    }
    currentIndex += value;
  }

  debugData(data);

  let gaps = free.length;
  for (const i of free) {
    data[i] = data.pop();
    gaps--;
    while (data[data.length - 1] === undefined) {
      data.pop();
      gaps--;
    }
    debugData(data);
    if (gaps === 0) break;
  }

  debugData(data);

  return getChecksum(data);
}

function times(n: number, fn: (i: number) => void) {
  for (let i = 0; i < n; i++) fn(i);
}

function getChecksum(data: number[]): number {
  return [...data.entries()]
    .map(([i, fileId]) => i * fileId)
    .reduce((acc, value) => acc + value);
}

function debugData(data: number[]) {
  if (!debug) return;
  let out = '';
  for (let i = 0; i < data.length; i++) {
    out += data[i] ?? chalk.gray('.');
  }
  console.log(out);
}
