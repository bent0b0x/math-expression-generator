import * as shuffle from "lodash.shuffle";
import getValidOperators from "./getValidOperators";
import randomNumberInRange from "./randomNumberInRange";
import randomOperator from "./randomOperator";
import randomPairForNumberAndOperator from "./randomPairForNumberAndOperator";
import Expression from "./types/Expression";

const generateBag = (target: number, length: number): Expression => {
  let expression: Expression = [target];

  while (expression.length < length * 2 - 1) {
    const numberIndexToSplit = randomNumberInRange(
      0,
      (expression.length + 1) / 2 - 1
    );
    const indexToSplit = numberIndexToSplit * 2;
    const numberToSplit = expression[indexToSplit] as number;
    const operator = randomOperator(getValidOperators(numberToSplit));

    const [firstNumber, secondNumber] = randomPairForNumberAndOperator(
      numberToSplit,
      operator
    );

    expression = [
      ...expression.slice(0, indexToSplit),
      firstNumber,
      operator,
      secondNumber,
      ...expression.slice(indexToSplit + 1)
    ];
  }

  return shuffle(expression);
};

export default generateBag;
