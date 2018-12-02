import Expression from "./types/Expression";
import IOperatorTruthTable from "./types/IOperatorTruthTable";
import Operator from "./types/Operator";
import PairExpression from "./types/PairExpression";

import generatePairExpression from "./generatePairExpression";
import getValidOperators from "./getValidOperators";
import randomNumberInRange from "./randomNumberInRange";

const generateExpression = (
  n: number,
  length: number,
  leftOperator?: Operator,
  rightOperator?: Operator,
  onLeft?: boolean
): Expression => {
  const validOperators: IOperatorTruthTable = getValidOperators(
    n,
    onLeft,
    leftOperator,
    rightOperator
  );

  const pairExpression: PairExpression = generatePairExpression(
    n,
    validOperators
  );

  const finalExpression = [...pairExpression];

  if (length > 2) {
    const zeroOrOne: number =
      pairExpression[1] === Operator.DIVISION ||
      pairExpression[1] === Operator.SUBTRACTION ||
      rightOperator === Operator.DIVISION
        ? 0
        : randomNumberInRange(0, 1);
    const left: boolean = zeroOrOne === 0;

    const additionalExpression = generateExpression(
      pairExpression[left ? 0 : 2],
      --length,
      left ? leftOperator : pairExpression[1],
      left ? pairExpression[1] : rightOperator,
      left
    );

    if (left) {
      return additionalExpression.concat(finalExpression.slice(1));
    } else {
      return finalExpression
        .slice(0, finalExpression.length - 1)
        .concat(additionalExpression);
    }
  }

  return finalExpression;
};

export default generateExpression;
