import { getLines } from "./utils.ts";

const input = (await getLines(__dirname + "/assets/day12.txt")).map(_ => _.split(""));

const used = new Set<string>();
const regions: number[][][] = [];
const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const diags = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
const maxX = input.length;
const maxY = input[0].length;

const validCoordinate = (x: number, y: number) =>
  x >= 0 && y >= 0 && x < maxX && y < maxY;

const findRegion = (plant: string, x: number, y: number) => {
  const n = [[x, y]];
  const r = [];
  while (n.length > 0) {
    const [cx, cy] = n.pop()!;
    if (!validCoordinate(cx, cy)) continue;
    if (used.has(`${cx},${cy}`)) continue;
    if (input[cx][cy] !== plant) continue;

    used.add(`${cx},${cy}`);
    r.push([cx, cy]);

    for (const [dx, dy] of dirs) {
      n.push([cx + dx, cy + dy])
    }
  }
  
  return r;
}

for (let x = 0; x < maxX; x++) {
  for (let y = 0; y < maxY; y++) {
    const region = findRegion(input[x][y], x, y);
    if (region.length > 0) {
      regions.push(region);
    }
  }
}

let s = 0;
for (const region of regions) {
  let sideCount = 0;
  let area = 0;
  for (const [rx, ry] of region) {
    area++;
    for (const [dx, dy] of dirs) {
      if (!validCoordinate(rx + dx, ry + dy) || input[rx][ry] !== input[rx + dx][ry + dy]) {
        sideCount++;
      }
    }
  }

  s = s + (sideCount*area);
}

console.log("Part 1 answer", s);

let s2 = 0;
for (const region of regions) {
  let area = 0;
  let corners = 0;
  for (const [rx, ry] of region) {
    area++;
    const plant = input[rx][ry];
    for (const [dx, dy] of diags) {
      const neighborX = validCoordinate(rx + dx, ry) ? input[rx + dx][ry] : undefined;
      const neighborY = validCoordinate(rx, ry + dy) ? input[rx][ry + dy] : undefined;
      const neighborDiag = validCoordinate(rx + dx, ry + dy) ? input[rx + dx][ry + dy] : undefined;

      if (neighborX !== plant && neighborY !== plant) corners++;
      if (neighborX === plant && neighborY === plant && neighborDiag !== plant) corners++;
    }
  }
  s2 = s2 + (area*corners);
}

console.log("Part 2 answer", s2);
