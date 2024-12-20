import { getLines } from "./utils.ts";

const lines = await getLines(__dirname + "/assets/day4.txt");

const maxX = lines.length;
const maxY = lines[0].length;
let total = 0;

const validCoordinate = (x: number, y: number) =>
  x >= 0 && y >= 0 && x < maxX && y < maxY;

const checkTop = (x: number, y: number) => {
  if (
    validCoordinate(x + 1, y) &&
    lines[x + 1][y] === "M" &&
    validCoordinate(x + 2, y) &&
    lines[x + 2][y] === "A" &&
    validCoordinate(x + 3, y) &&
    lines[x + 3][y] === "S"
  ) {
    total++;;
  }
};

const checkTopRight = (x: number, y: number) => {
  if (
    validCoordinate(x + 1, y + 1) &&
    lines[x + 1][y + 1] === "M" &&
    validCoordinate(x + 2, y + 2) &&
    lines[x + 2][y + 2] === "A" &&
    validCoordinate(x + 3, y + 3) &&
    lines[x + 3][y + 3] === "S"
  ) {
    total++;;
  }
};

const checkRight = (x: number, y: number) => {
  if (
    validCoordinate(x, y + 1) &&
    lines[x][y + 1] === "M" &&
    validCoordinate(x, y + 2) &&
    lines[x][y + 2] === "A" &&
    validCoordinate(x, y + 3) &&
    lines[x][y + 3] === "S"
  ) {
    total++;;
  }
};

const checkBottomRight = (x: number, y: number) => {
  if (
    validCoordinate(x - 1, y + 1) &&
    lines[x - 1][y + 1] === "M" &&
    validCoordinate(x - 2, y + 2) &&
    lines[x - 2][y + 2] === "A" &&
    validCoordinate(x - 3, y + 3) &&
    lines[x - 3][y + 3] === "S"
  ) {
    total++;;
  }
};

const checkBottom = (x: number, y: number) => {
  if (
    validCoordinate(x - 1, y) &&
    lines[x - 1][y] === "M" &&
    validCoordinate(x - 2, y) &&
    lines[x - 2][y] === "A" &&
    validCoordinate(x - 3, y) &&
    lines[x - 3][y] === "S"
  ) {
    total++;;
  }
};

const checkBottomLeft = (x: number, y: number) => {
  if (
    validCoordinate(x - 1, y - 1) &&
    lines[x - 1][y - 1] === "M" &&
    validCoordinate(x - 2, y - 2) &&
    lines[x - 2][y - 2] === "A" &&
    validCoordinate(x - 3, y - 3) &&
    lines[x - 3][y - 3] === "S"
  ) {
    total++;;
  }
};

const checkLeft = (x: number, y: number) => {
  if (
    validCoordinate(x, y - 1) &&
    lines[x][y - 1] === "M" &&
    validCoordinate(x, y - 2) &&
    lines[x][y - 2] === "A" &&
    validCoordinate(x, y - 3) &&
    lines[x][y - 3] === "S"
  ) {
    total++;;
  }
};

const checkTopLeft = (x: number, y: number) => {
  if (
    validCoordinate(x + 1, y - 1) &&
    lines[x + 1][y - 1] === "M" &&
    validCoordinate(x + 2, y - 2) &&
    lines[x + 2][y - 2] === "A" &&
    validCoordinate(x + 3, y - 3) &&
    lines[x + 3][y - 3] === "S"
  ) {
    total++;;
  }
};

for (let x = 0; x < maxX; x++) {
  for (let y = 0; y < maxY; y++) {
    if (lines[x][y] === "X") {
      checkTop(x, y);
      checkTopRight(x, y);
      checkRight(x, y);
      checkBottomRight(x, y);
      checkBottom(x, y);
      checkBottomLeft(x, y);
      checkLeft(x, y);
      checkTopLeft(x, y);
    }
  }
}

console.log("Part 1 answer:", total);

let secondTotal = 0;
for (let x = 0; x < maxX; x++) {
  for (let y = 0; y < maxY; y++) {
    if (lines[x][y] === "A") {
      if (
        !validCoordinate(x + 1, y - 1) ||
        !validCoordinate(x + 1, y + 1) ||
        !validCoordinate(x - 1, y + 1) ||
        !validCoordinate(x - 1, y - 1)
      ) {
        continue;
      }
      const cornerChars = [
        lines[x + 1][y - 1],
        lines[x + 1][y + 1],
        lines[x - 1][y + 1],
        lines[x - 1][y - 1]
      ];
      if (
        cornerChars.filter((char) => char === "M").length === 2 &&
        cornerChars.filter((char) => char === "S").length === 2 &&
        cornerChars[0] !== cornerChars[2] &&
        cornerChars[1] !== cornerChars[3]
      ) { secondTotal++ };
    }
  }
}

console.log("Part 2 answer:", secondTotal);
