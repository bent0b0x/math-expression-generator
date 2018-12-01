import Operator from "./Operator";

interface IOperatorTruthTable {
  [Operator.DIVISION]: boolean;
  [Operator.MULTIPLICATION]: boolean;
  [Operator.ADDITION]: boolean;
  [Operator.SUBTRACTION]: boolean;
}

export default IOperatorTruthTable;
