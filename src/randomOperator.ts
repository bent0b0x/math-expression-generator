import IOperatorTruthTable from "./types/IOperatorTruthTable";
import Operator from "./types/Operator";

const randomOperator = (validOperators?: IOperatorTruthTable): Operator => {
  let operators: Operator[] = [];
  if (validOperators) {
    Object.keys(validOperators).forEach(
      (operator: Operator): void => {
        if (validOperators[operator]) {
          operators.push(operator);
        }
      }
    );
  } else {
    operators = [
      Operator.ADDITION,
      Operator.SUBTRACTION,
      Operator.MULTIPLICATION,
      Operator.DIVISION
    ];
  }

  if (!operators.length) {
    return Operator.ADDITION;
  }

  return operators[Math.floor(Math.random() * operators.length)];
};

export default randomOperator;
