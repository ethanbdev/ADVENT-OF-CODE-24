import { getText } from "./utils.ts";

const diskMap = await getText(__dirname + "/assets/day9.txt");

let id = 0;
const compactedDisk: string[] = [];
for (let i = 0; i < diskMap.length; i++) {
  let j = 0;
  const d = parseInt(diskMap[i]);
  if (i % 2 === 0) {
    while (j < d) {
      compactedDisk.push(id.toString());
      j++
    }
    id++;
  } else {
    while (j < d) {
      compactedDisk.push(".");
      j++
    }
  }
}

const part1 = (disk: string[]) => {
  let i = 0;
  let j = disk.length - 1;

  while (i < j) {
    if (disk[i] !== ".") {
      i++;
      continue;
    }
    if (disk[j] === ".") {
      j--;
      continue;
    }

    disk[i] = disk[j];
    disk[j] = ".";
    i++;
    j--;
  }

  return disk.reduce((acc, val, i) => {
    return val === "." ? acc : acc + (i * parseInt(val));
  }, 0);
}

const part2 = (disk: string[]) => {
  let currentId = id - 1;
  while (currentId > 0) {
    const startingIdx = disk.indexOf(currentId.toString());
    const currentFile = [];
    let i = startingIdx;
    while (i < disk.length) {
      if (disk[i] !== currentId.toString()) break;
      currentFile.push(disk[i]);
      i++;
    }
    for (let j = 0; j < startingIdx; j++) {
      if (disk[j] === ".") {
        let freeSpace = 1;
        let k = j + 1;
        while (true) {
          if (disk[k] === ".") {
            freeSpace++;
            k++;
          } else {
            break;
          }
        }
        if (freeSpace >= currentFile.length) {
          const n = currentFile.length;
          disk.splice(j, n, ...currentFile);
          disk.splice(startingIdx, n, ...new Array(n).fill("."));
          break;
        }
      }
    }
    currentId--;
  }

  return disk.reduce((acc, val, i) => {
    return val === "." ? acc : acc + (i * parseInt(val));
  }, 0);
}

console.time("1");
console.log("Part 1 answer:", part1([...compactedDisk]));
console.timeEnd("1");

console.time("2");
console.log("Part 2 answer:", part2([...compactedDisk]));
console.timeEnd("2");
