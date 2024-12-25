import chalk from 'chalk';

const debug = false;

type Block = { start: number; length: number };
type File = { id: number } & Block;

export function day9b([input]: string[]): number {
  const files: File[] = [];
  const free: Block[] = [];

  let currentIndex = 0;
  let currentFileId = 0;

  let mode: 'file' | 'free' = 'file';
  for (const value of input.split('').map((n) => parseInt(n))) {
    switch (mode) {
      case 'file':
        files.push({ id: currentFileId, start: currentIndex, length: value });
        currentFileId++;
        mode = 'free';
        break;

      case 'free':
        free.push({ start: currentIndex, length: value });
        mode = 'file';
        break;
    }
    currentIndex += value;
  }

  debugData(files);

  for (const file of files.reverse()) {
    const freeSpot = free.find((spot) => spot.length >= file.length);
    if (!freeSpot) continue;

    file.start = freeSpot.start;
    freeSpot.start += file.length;
    freeSpot.length -= file.length;

    debugData(files);
  }

  console.log(filesToArray(files));
  return getChecksum(filesToArray(files));
}

function filesToArray(files: File[]): number[] {
  const array: number[] = [];

  for (const file of files) {
    for (let i = 0; i < file.length; i++) {
      array[file.start + i] = file.id;
    }
  }

  for (let i = 0; i < array.length; i++) {
    if (array[i] === undefined) array[i] = null;
  }

  return array;
}

function getChecksum(data: number[]): number {
  return [...data.entries()]
    .map(([i, fileId]) => i * fileId)
    .reduce((acc, value) => acc + value);
}

function debugData(data: File[]) {
  if (!debug) return;

  console.log(
    filesToArray(data)
      .map((value) => (value === null ? chalk.gray('.') : value))
      .join(''),
  );
}
