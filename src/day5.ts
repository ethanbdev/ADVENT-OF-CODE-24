import { getLines } from "./utils.ts";

const lines = await getLines(__dirname + "/assets/day5.txt");
const orderingRulesLookup: Record<string, string[]> = {};
const updates: string[][] = [];
// for pt 2
const invalidUpdates: string[][] = [];

lines.forEach(line => {
  if (line.includes(("|"))) {
    const [l, r] = line.split("|");
    if (Array.isArray(orderingRulesLookup[r])) {
      orderingRulesLookup[r].push(l)
    } else {
      orderingRulesLookup[r] = [l]
    }
  } else if (line.includes(",")) {
    updates.push(line.split(","));
  }
});

const validUpdate = (pages: string[]) => {
  let valid = true;
  for (let i = 0; i < pages.length; i++) {
    const rightRules = orderingRulesLookup[pages[i]];
    if (rightRules !== undefined) {
      const violatesRule = rightRules.some((rule) => pages.slice(i + 1).includes(rule));
      valid = !violatesRule;
      if (!valid) {
        return false;
      }
    }
  }
  return true;
}

let sum = 0;
for (const pages of updates) {
  const valid = validUpdate(pages);
  if (valid) {
    sum = sum + Number(pages[Math.floor(pages.length / 2)]);
  } else {
    // for pt 2
    invalidUpdates.push(pages);
  }
}

console.log("Part 1 answer:", sum);

function comparator(a: string, b: string) {
  const shouldComeBefore = orderingRulesLookup[a];
  if (shouldComeBefore !== undefined) {
    return shouldComeBefore.includes(b) ? 1 : -1
  }
  return 0;
};

let secondSum = 0;
for (const pages of invalidUpdates) {
  const sorted = pages.toSorted((a, b) => comparator(a, b));
  secondSum = secondSum + Number(sorted[Math.floor(sorted.length / 2)]);
}

console.log("Part 2 answer:", secondSum);
