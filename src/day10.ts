import { getLines } from "./utils.ts";

const points = (await getLines(__dirname + "/assets/day10.txt"))
  .map((line, i) => line.split("")
  .map((pt, j) => new Point(i, j, Number(pt))));

const xMax = points.length;
const yMax = points[0].length;
const startingPts: Point[] = []

class Point {
  x: number;
  y: number;
  m: number;
  coord: string;
  neighbors?: Record<string, Point>;

  constructor(x: number, y: number, m: number) {
    this.x = x;
    this.y = y;
    this.m = m;
    this.coord = `${x},${y}`;
    this.neighbors = undefined;
  }
}

const validCoordinate = (x: number, y: number) =>
  x >= 0 && y >= 0 && x < xMax && y < yMax;

const getNeighbors = (pt: Point) => {
  const { x, y } = pt;
  // 11 is sufficiently large to represent an edge that cannot be continued on
  return {
    left: validCoordinate(x, y - 1) ? points[x][y - 1] : new Point(NaN, NaN, 11),
    up: validCoordinate(x - 1, y) ? points[x - 1][y] : new Point(NaN, NaN, 11),
    right: validCoordinate(x, y + 1) ? points[x][y + 1]: new Point(NaN, NaN, 11),
    down: validCoordinate(x + 1, y) ? points[x + 1][y] : new Point(NaN, NaN, 11),
  }
}

const followTrail = (pt: Point, visited: Set<string>, reachable: Set<string>) => {
  const { left, up, right, down } = pt.neighbors ?? {};
  if (pt.m === 9) {
    reachable.add(pt.coord);
    return;
  }

  visited.add(pt.coord);

  if (left && left.m - pt.m === 1 && !visited.has(left.coord)) followTrail(left, visited, reachable);
  if (up && up.m - pt.m === 1 && !visited.has(up.coord)) followTrail(up, visited, reachable);
  if (right && right.m - pt.m === 1 && !visited.has(right.coord)) followTrail(right, visited, reachable);
  if (down && down.m - pt.m === 1 && !visited.has(down.coord)) followTrail(down, visited, reachable);

  visited.delete(pt.coord);
}

const countTrails = (pt: Point, visited: Set<string>) => {
  const { left, up, right, down } = pt.neighbors ?? {};
  if (pt.m === 9) {
    return 1;
  }

  visited.add(pt.coord);

  let pathCount = 0;

  if (left && left.m - pt.m === 1 && !visited.has(left.coord)) pathCount += countTrails(left, visited);
  if (up && up.m - pt.m === 1 && !visited.has(up.coord)) pathCount += countTrails(up, visited);
  if (right && right.m - pt.m === 1 && !visited.has(right.coord)) pathCount += countTrails(right, visited);
  if (down && down.m - pt.m === 1 && !visited.has(down.coord)) pathCount += countTrails(down, visited);

  visited.delete(pt.coord);

  return pathCount;
}

// Get all the neighbors up front & simplify starting points
for (const row of points) {
  for (const p of row) {
    p.neighbors = getNeighbors(p);
    if (p.m === 0) startingPts.push(p);
  }
}

let sum = 0;
for (const p of startingPts) {
  const reachable = new Set<string>();
  followTrail(p, new Set(), reachable);
  sum = sum + reachable.size;
}

let sum2 = 0;
for (const p of startingPts) {
  const pathCount = countTrails(p, new Set<string>());
  sum2 = sum2 + pathCount;
}

console.log("Part 1 answer:", sum);
console.log("Part 2 answer:", sum2);
