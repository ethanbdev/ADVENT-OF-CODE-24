import { getLines } from "./utils.ts";

const input = (await getLines(__dirname + "/assets/day11.txt")).map(_ => _.split(" "))[0];
const cache = new Map<string, number>();

function memo(n: string, blinks: number) {
  const k = `${n},${blinks}`;
  if (cache.has(k)) return cache.get(k)!;

  if (blinks === 0) {
    return 1;
  } else {
    let total = 0;
    if (n === "0") {
        total = +memo("1", blinks - 1);
    } else if (n.length % 2 === 0) {
      const splitIndex = Math.floor((n.length - 1) / 2);
      const l = n.substring(0, splitIndex + 1).replace(/^0+/, "") || "0";
      const r = n.substring(splitIndex + 1).replace(/^0+/, "") || "0";
        total = +memo(l, blinks - 1) + +memo(r, blinks - 1);
    } else {
        total = +memo((BigInt(n) * 2024n).toString(), blinks - 1);
    }

    cache.set(k, total);
    return total;
  }
}

const doBlinks = (stones: string[], n: number) => {
  let sum = 0;
  for (const stone of stones) {
      const currSum = memo(stone, n);
      sum += currSum;
  }

  return sum;
}

console.time();
console.log("Part 1 answer:", doBlinks(input, 25));
console.timeEnd();

console.time();
console.log("Part 2 answer:", doBlinks(input, 75));
console.timeEnd();
