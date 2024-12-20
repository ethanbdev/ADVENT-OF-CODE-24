import { getLines } from "./utils.ts";

const reports = await getLines(__dirname + "/assets/day2.txt");

const lessThan = (x: number, y: number) => x < y;
const greaterThan = (x: number, y: number) => x > y;
const safeRange = (x: number, y: number) => Math.abs(x - y) <= 3;

function isSafe1(levels: number[], comparator: (x: number, y: number) => boolean) {
  let previousLevel = levels[0];
  for (let i = 1; i < levels.length; i++) {
    if (comparator(previousLevel, levels[i]) && safeRange(previousLevel, levels[i])) {
      previousLevel = levels[i];
    } else {
      return false;
    }
  };
  return true;
}

function isSafe2(levels: number[]) {
  const positiveSet = new Set([1, 2, 3]);
  const negativeSet = new Set([-1, -2, -3]);

  for (let i = 1; i < levels.length; i++) {
    positiveSet.add(levels[i] - levels[i-1]);
    negativeSet.add(levels[i] - levels[i-1]);
  };

  return (positiveSet.size === 3 || negativeSet.size === 3) ? true : false;
}

const safeReports1 = reports.filter((report: string) => {
  const levels = report.split(" ").map(Number);
  // Guard for first step being an unsafe range
  if (!safeRange(levels[0], levels[1]) || levels[0] === levels[1]) return false;
  return levels[0] > levels[1] ? isSafe1(levels, greaterThan) : isSafe1(levels, lessThan)
});

const safeReports2 = reports.filter((report: string) => {
  const levels = report.split(" ").map(Number);
  if (isSafe2(levels)) {
    return true;
  } else {
    for (let i = 0; i < levels.length; i++) {
      console.log(levels);
      console.log(levels.toSpliced(i, 1));
      if (isSafe2(levels.toSpliced(i, 1))) {
        return true;
      }
    }
    return false;
  }
});

console.log("Part 1 answer:", safeReports1.length);
console.log("Part 2 answer:", safeReports2.length);
