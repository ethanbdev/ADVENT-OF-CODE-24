/* Helper used to read a file based on a path and parse it into an array of lines */
export async function getLines(path: string): Promise<string[]> {
  const inputFile = Bun.file(path);
  const input = await inputFile.text();
  return input.split("\n");
}

/* Helper used to read a file based on a path and parse it into an array of lines */
export async function getText(path: string): Promise<string> {
  const inputFile = Bun.file(path);
  return await inputFile.text();
}
