import { getText } from "./utils.ts";

const memory = await getText(__dirname + "/assets/day3.txt");

function getGroupTotal(group: string) {
  const matches = group.match(/mul\([0-9]+,[0-9]+\)/g);
  return matches?.reduce((acc: number, match: string) => {
    const [x , y] = match.substring(4, match.length - 1).split(",");
    return acc + (Number(x) * Number(y));
  }, 0);
}

console.log("Part 1 answer:", getGroupTotal(memory));

const groupings = memory.split(/(do\(\)|don't\(\))/);

// Default to true so the first group is treated as "do()"
let processNextGroup = true;
const secondTotal = groupings.reduce((acc: number, group: string) => {
  if (group === "do()") {
    processNextGroup = true;
    return acc;
  } else if (group === "don't()") {
    processNextGroup = false;
    return acc;
  }
  if (processNextGroup) {
    const tot = getGroupTotal(group) ?? 0;
    return acc + tot;
  } else {
    return acc;
  }
}, 0);

console.log("Part 2 answer:", secondTotal)

