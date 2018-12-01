import Operator from "./types/Operator";

export default (operator: Operator): string => {
  switch (operator) {
    case Operator.DIVISION:
      return "/";
    case Operator.MULTIPLICATION:
      return "*";
    case Operator.ADDITION:
      return "+";
    case Operator.SUBTRACTION:
      return "-";
    default:
      return "+";
  }
};
