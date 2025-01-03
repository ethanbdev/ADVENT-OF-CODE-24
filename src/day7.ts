import { getLines } from "./utils.ts";

const lines = await getLines(__dirname + "/assets/day7.txt");

const buildExpression = (operands: string[], operators: string[]) => {
  const newOperands = [...operands];
  const newOperators = [...operators];
  const expression: string[] = [newOperands[0]];
  let i = 0;
  while (i < newOperators.length) {
    expression.push(newOperators[i]);
    expression.push(newOperands[i + 1]);
    i++;
  }
  return expression;
}

const getAnswer = (useConcatOperator: boolean) => {
  const operators = useConcatOperator ? ["||", "*", "+"] : ["+", "*"];
  let result = 0;
  lines.forEach(line => {
    const [goal, rawElements] = line.split(": ");
    const operands = rawElements.split(" ");
    const numOperators = operands.length - 1;
    const stack: { current: string[], depth: number }[] = [{ current: [], depth: 0 }];
    let goalAdded = false;
  
    while (stack.length > 0) {
      const { current, depth } = stack.pop()!;
  
      if (depth === numOperators) {
        const exp = buildExpression(operands, current);
        let t = Number(exp[0]);
        for (let i = 1; i < exp.length; i+=2) {
          if (exp[i] === "||") {
            t = parseInt(t.toString().concat(exp[i + 1]));
          } else {
            t = exp[i] === "+" ? t + Number(exp[i + 1]) : t * Number(exp[i + 1]);
          }
        }
        if (t === Number(goal) && !goalAdded) {
          result += Number(goal);
          goalAdded = true;
        }
        continue;
      }
  
      for (const operator of operators) {
        stack.push({ current: [...current, operator], depth: depth + 1 });
      }
    }
  });

  return result;
}

console.log("Part 1 answer:", getAnswer(false));
console.log("Part 2 answer:", getAnswer(true));

