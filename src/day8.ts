import { getLines } from "./utils.ts";

const grid = (await getLines(__dirname + "/assets/day8.txt"));

const maxX = grid.length;
const maxY = grid[0].length;

const antennaLocations: Record<string, number[][]> = {};
const antinodeLocations = new Set<string>();
const antinodeLocations2 = new Set<string>();

const validCoordinate = (x: number, y: number) =>
  x >= 0 && y >= 0 && x < maxX && y < maxY;

for (let x = 0; x < maxX; x++) {
  for (let y = 0; y < maxY; y++) {
    const char = grid[x].charAt(y);
    if (char !== ".") {
      if (Array.isArray(antennaLocations[char])) {
        antennaLocations[char].push([x, y]);
      } else {
        antennaLocations[char] = [[x, y]];
      }
    }
  }
}

// Pt 1
for (const [key, ] of Object.entries(antennaLocations)) {
  const locations = antennaLocations[key];
  for (let i = 0; i < locations.length; i++) {
    const currentLoc = locations[i];
    const rest = locations.toSpliced(i, 1);
    for (const compareLoc of rest) {
      const [x1, y1] = currentLoc;
      const [x2, y2] = compareLoc;
      const deltaX = x1 - x2;
      const deltaY = y1 - y2;
      const antinodeX = x1 + deltaX;
      const antinodeY = y1 + deltaY;
      if (validCoordinate(antinodeX, antinodeY)) antinodeLocations.add(`${antinodeX},${antinodeY}`);
    }
  }
}

// Pt 2
for (const [key, ] of Object.entries(antennaLocations)) {
  const locations = antennaLocations[key];
  for (let i = 0; i < locations.length; i++) {
    const currentLoc = locations[i];
    const rest = locations.toSpliced(i, 1);
    for (const compareLoc of rest) {
      const [x1, y1] = currentLoc;
      const [x2, y2] = compareLoc;
      const deltaX = x1 - x2;
      const deltaY = y1 - y2;

      let antinodeX = x1 + deltaX;
      let antinodeY = y1 + deltaY;

      antinodeLocations2.add(currentLoc.join(","));
      antinodeLocations2.add(compareLoc.join(","));
      while (validCoordinate(antinodeX, antinodeY)) {
        antinodeLocations2.add(`${antinodeX},${antinodeY}`);

        antinodeX = antinodeX + deltaX;
        antinodeY = antinodeY + deltaY;
      };
    }
  }
}

console.log("Part 1 answer:", antinodeLocations.size);
console.log("Part 2 answer:", antinodeLocations2.size)
