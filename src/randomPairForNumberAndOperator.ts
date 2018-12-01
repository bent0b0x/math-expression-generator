import Operator from "./types/Operator";

import randomAdditivePair from "./randomAdditivePair";
import randomDivisorPair from "./randomDivisorPair";
import randomMultiplePair from "./randomMultiplePair";
import randomSubtractivePair from "./randomSubtractivePair";

const randomPairForNumberAndOperator = (
  n: number,
  operator: Operator
): [number, number] => {
  return operator === Operator.ADDITION
    ? randomAdditivePair(n)
    : operator === Operator.SUBTRACTION
    ? randomSubtractivePair(n)
    : operator === Operator.MULTIPLICATION
    ? randomDivisorPair(n)
    : randomMultiplePair(n);
};

export default randomPairForNumberAndOperator;
