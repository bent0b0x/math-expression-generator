import IOperatorTruthTable from "./types/IOperatorTruthTable";
import Operator from "./types/Operator";
import PairExpression from "./types/PairExpression";

import randomOperator from "./randomOperator";
import randomPairForNumberAndOperator from "./randomPairForNumberAndOperator";

const generatePairExpression = (
  n: number,
  validOperators: IOperatorTruthTable
): PairExpression => {
  const operator: Operator = randomOperator(validOperators);
  const numbers: [number, number] = randomPairForNumberAndOperator(n, operator);

  return [numbers[0], operator, numbers[1]];
};

export default generatePairExpression;
