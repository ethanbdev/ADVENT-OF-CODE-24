
import { getLines } from "./utils.ts";

const lines = await getLines(__dirname + "/assets/day6.txt");
const input = lines.map((line) => [...line]);

type GuardChar = "^" | ">" | "v" | "<";

const maxX = input.length;
const maxY = input[0].length;

const getStartingCoord = (grid: string[][]) => {
  for (let x = 0; x < maxX; x++) {
    for (let y = 0; y < maxY; y++) {
      if (grid[x][y] === "^") {
        return { x, y };
      }
    }
  }
}

const getChar = (x: number, y: number, grid: string[][]) => {
  if (x >= maxY || y >= maxY || x < 0 || y < 0) return null;

  return grid[x][y];
}

const rotateGuard: Record<GuardChar, GuardChar> = {
  "^": ">",
  ">": "v",
  "v": "<",
  "<": "^"
};

const getNextCoord = (guard: string, currentX: number, currentY: number) => {
  let newCoord;
  switch(guard) {
    case "^":
      newCoord = { x: currentX - 1, y: currentY };
      break;
    case ">":
      newCoord = { x: currentX, y: currentY + 1 };
      break;
    case "<":
      newCoord = { x: currentX, y: currentY - 1 };
      break;
    case "v":
      newCoord = { x: currentX + 1, y: currentY };
      break;
  }
  return newCoord;
}


const p1 = (grid: string[][]) => {
  let currentCoord = getStartingCoord(grid)!;
  const visited = new Set<string>();
  visited.add(`${currentCoord.x},${currentCoord.y}`);
  while (true) {
    const currentGuardChar = getChar(currentCoord.x, currentCoord.y, grid)!;
    const nextCoord = getNextCoord(currentGuardChar, currentCoord.x, currentCoord.y)!;
    const nextChar = getChar(nextCoord.x, nextCoord.y, grid);
    if (nextChar === "#") {
      const newGuardChar = rotateGuard[currentGuardChar as GuardChar];
      const newNextCoord = getNextCoord(newGuardChar, currentCoord.x, currentCoord.y)!;
      const newNextChar = getChar(newNextCoord.x, newNextCoord.y, grid);
      if (newNextChar) {
        grid[currentCoord.x][currentCoord.y] = ".";
        grid[newNextCoord.x][newNextCoord.y] = newGuardChar;
        currentCoord = newNextCoord;
      } else {
        break;
      }
    } else if (nextChar === ".") {
      grid[currentCoord.x][currentCoord.y] = ".";
      grid[nextCoord.x][nextCoord.y] = currentGuardChar;
      currentCoord = nextCoord;
    } else {
      break;
    }
    if (!visited.has(`${currentCoord.x},${currentCoord.y}`)) {
      visited.add(`${currentCoord.x},${currentCoord.y}`);
    }
  }

  return visited;
}

const p2 = (grid: string[][], p1Path: Set<string>) => {
  const checkForLoop = (newGrid: string[][]) => {
    let currentCoord = getStartingCoord(newGrid)!;
    const visited = new Set();
    visited.add(`${currentCoord.x},${currentCoord.y},${getChar(currentCoord.x, currentCoord.y, newGrid)}`);
    while (true) {
      const currentGuardChar = getChar(currentCoord.x, currentCoord.y, newGrid)!;
      const nextCoord = getNextCoord(currentGuardChar, currentCoord.x, currentCoord.y)!;
      const nextChar = getChar(nextCoord.x, nextCoord.y, newGrid);
      if (nextChar === "#") {
        const newGuardChar = rotateGuard[currentGuardChar as GuardChar];
        const newNextCoord = getNextCoord(newGuardChar, currentCoord.x, currentCoord.y)!;
        const newNextChar = getChar(newNextCoord.x, newNextCoord.y, newGrid);
        if (newNextChar === "#") {
          const newNewGuardChar = rotateGuard[newGuardChar as GuardChar];
          const newNewNextCoord = getNextCoord(newNewGuardChar, currentCoord.x, currentCoord.y)!;
          const newNewNextChar = getChar(newNewNextCoord.x, newNewNextCoord.y, newGrid);
          if (newNewNextChar) {
            newGrid[currentCoord.x][currentCoord.y] = ".";
            newGrid[newNewNextCoord.x][newNewNextCoord.y] = newNewGuardChar;
            currentCoord = newNewNextCoord;
          } else {
            break;
          }
        } else if (newNextChar) {
          newGrid[currentCoord.x][currentCoord.y] = ".";
          newGrid[newNextCoord.x][newNextCoord.y] = newGuardChar;
          currentCoord = newNextCoord;
        } else {
          break;
        }
      } else if (nextChar === ".") {
        newGrid[currentCoord.x][currentCoord.y] = ".";
        newGrid[nextCoord.x][nextCoord.y] = currentGuardChar;
        currentCoord = nextCoord;
      } else {
        break;
      }
      const t = `${currentCoord.x},${currentCoord.y},${getChar(currentCoord.x, currentCoord.y, newGrid)}`;
      if (visited.has(t)) {
        return true;
      } else {
        visited.add(t);
      }
    }
  
    return false;
  };

  let newObsCount = 0;
  for (const coord of Array.from(p1Path)) {
    const [x, y] = coord.split(",").map(Number);
    if (grid[x][y] !== ".") continue;
    grid[x][y] = "#";
    if (checkForLoop(structuredClone(grid))) {
      newObsCount++;
    }
    grid[x][y] = ".";
  }
  return newObsCount;
}

console.time();
const path = p1(structuredClone(input))
console.log("Part 1 answer:", path.size);
console.timeEnd();
console.time();
console.log("Part 2 answer:", p2(structuredClone(input), path));
console.timeEnd();


