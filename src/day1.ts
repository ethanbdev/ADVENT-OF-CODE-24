import { getLines } from "./utils.ts";

const lines = await getLines(__dirname + "/assets/day1.txt");

const left: number[] = [];
const right: number[] = [];
// pt 2
const rightCountLookup: Record<string, number> = {};

function insert(arr: number[], value: number) {
  let index = 0;
  while (index < arr.length && arr[index] < value) {
    index++;
  }
  arr.splice(index, 0, value);
}

lines.forEach((line) => {
  const [l, r] = line.split("   ").map(Number);
  insert(left, l);
  insert(right, r);

  // pt 2
  if (rightCountLookup[r] === undefined) {
    rightCountLookup[r] = 1;
  } else {
    rightCountLookup[r] += 1;
  }
});

const sumOfDiffs = left.reduce((acc: number, value: number, i: number) => acc + Math.abs(value - right[i]), 0)
console.log("Part 1 answer:", sumOfDiffs);

// pt 2
const similarity = left.reduce((acc: number, value: number) => acc + (value * (rightCountLookup[value] ?? 0)), 0);
console.log("Part 2 answer:", similarity);
