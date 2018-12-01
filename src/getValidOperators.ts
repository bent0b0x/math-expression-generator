import * as isPrime from "quick-is-prime";

import IOperatorTruthTable from "./types/IOperatorTruthTable";
import Operator from "./types/Operator";

const getValidOperators = (
  n: number,
  onLeft?: boolean,
  leftOperator?: Operator,
  rightOperator?: Operator
): IOperatorTruthTable => ({
  [Operator.DIVISION]:
    n !== 1 &&
    n !== -1 &&
    ((!leftOperator && !rightOperator) ||
      (leftOperator !== Operator.DIVISION && (onLeft && !rightOperator)) ||
      (!leftOperator && !rightOperator)),
  [Operator.MULTIPLICATION]:
    n !== 1 &&
    n !== -1 &&
    (leftOperator !== Operator.DIVISION &&
      (!!leftOperator ||
        !!rightOperator ||
        (!isPrime(n) && n !== 1 && n !== -1))),
  [Operator.ADDITION]:
    n !== 1 &&
    n !== -1 &&
    ((!leftOperator && !rightOperator) ||
      (leftOperator !== Operator.DIVISION &&
        leftOperator !== Operator.SUBTRACTION &&
        leftOperator !== Operator.MULTIPLICATION &&
        rightOperator !== Operator.DIVISION &&
        rightOperator !== Operator.MULTIPLICATION)),
  [Operator.SUBTRACTION]:
    (!leftOperator && !rightOperator) ||
    (leftOperator !== Operator.DIVISION &&
      leftOperator !== Operator.MULTIPLICATION &&
      rightOperator !== Operator.DIVISION &&
      rightOperator !== Operator.MULTIPLICATION &&
      leftOperator !== Operator.SUBTRACTION)
});

export default getValidOperators;
