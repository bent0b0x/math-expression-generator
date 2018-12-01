import isPrime from "quick-is-prime";
import shuffle from "shuffle-array";

import Operator from "./operators/types/Operator";

interface IOperatorTruthTable {
  [Operator.DIVISION]: boolean;
  [Operator.MULTIPLICATION]: boolean;
  [Operator.ADDITION]: boolean;
  [Operator.SUBTRACTION]: boolean;
}

export const randomNumberInRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const randomNumberInRangeExcept = (
  min: number,
  max: number,
  except: number
): number => {
  let result: number | null = null;
  let i = 0;

  while ((result === null || result === except) && i < 10) {
    result = randomNumberInRange(min, max);
    i++;
  }

  return result || max;
};

export const findAllPositiveDivisors = (n: number): number[] => {
  const largeDivisors: number[] = [];
  const smallDivisors: number[] = [];

  const sqrt: number = Math.sqrt(n);

  for (let i = 1; i < sqrt + 1; i++) {
    if (i === smallDivisors[smallDivisors.length - 1]) {
      break;
    }
    if (n % i === 0 && (n === 1 || isPrime(n) || i !== 1)) {
      largeDivisors.push(i);

      if (n / i !== i && (n === 1 || isPrime(n) || n !== i)) {
        smallDivisors.push(n / i);
      }
    }
  }

  return largeDivisors.concat(smallDivisors);
};

export const randomDivisorPair = (n: number): [number, number] => {
  if (n === 0) {
    return [0, 0];
  }

  if (n > 0) {
    const divisorsForPositiveN: number[] = findAllPositiveDivisors(n);

    if (!divisorsForPositiveN.length) {
      return [0, 0];
    }

    const randomDivisorForPositiveN: number =
      divisorsForPositiveN[
        Math.floor(Math.random() * divisorsForPositiveN.length)
      ];

    return [randomDivisorForPositiveN, n / randomDivisorForPositiveN];
  }

  const divisorsForNonPositiveN: number[] = findAllPositiveDivisors(-n);

  if (!divisorsForNonPositiveN.length) {
    return [0, 0];
  }

  const randomDivisorForNonPositiveN: number =
    divisorsForNonPositiveN[
      Math.floor(Math.random() * divisorsForNonPositiveN.length)
    ] * (randomNumberInRange(1, 2) === 1 ? 1 : -1);

  return [randomDivisorForNonPositiveN, n / randomDivisorForNonPositiveN];
};

export const randomMultiplePair = (n: number): [number, number] => {
  if (n === 0) {
    return [0, 0];
  }

  if (n > 0) {
    const maxMultipleForPositiveN: number = Math.floor(Math.sqrt(n));
    const randomMultipleForPositiveN: number = randomNumberInRange(
      2,
      maxMultipleForPositiveN
    );

    const secondMultipleForPositiveN: number = n * randomMultipleForPositiveN;

    return randomMultipleForPositiveN / secondMultipleForPositiveN === n
      ? [randomMultipleForPositiveN, secondMultipleForPositiveN]
      : [secondMultipleForPositiveN, randomMultipleForPositiveN];
  }

  const maxMultipleForNonPositiveN: number = Math.floor(Math.sqrt(-n));
  const randomMultipleForNonPositiveN: number =
    randomNumberInRange(2, maxMultipleForNonPositiveN) *
    (randomNumberInRange(1, 2) === 1 ? -1 : 1);

  const secondMultipleForNonPositiveN: number =
    n * randomMultipleForNonPositiveN;

  return randomMultipleForNonPositiveN / secondMultipleForNonPositiveN === n
    ? [randomMultipleForNonPositiveN, secondMultipleForNonPositiveN]
    : [secondMultipleForNonPositiveN, randomMultipleForNonPositiveN];
};

export const randomAdditivePair = (n: number): [number, number] => {
  if (n === 0) {
    return [0, 0];
  }

  if (n > 0) {
    const randomNumberForPositiveN: number = randomNumberInRange(1, n - 1);
    return [randomNumberForPositiveN, n - randomNumberForPositiveN];
  }

  const randomNumberForNonPoitiveN: number = randomNumberInRange(
    n + Math.floor(n / 2),
    -1
  );

  return [randomNumberForNonPoitiveN, n - randomNumberForNonPoitiveN];
};

export const randomSubtractivePair = (n: number): [number, number] => {
  if (n === 0) {
    return [0, 0];
  }

  if (n > 0) {
    const randomSubtractiveNumberForPositiveN: number = randomNumberInRange(
      1,
      Math.floor(Math.sqrt(n))
    );

    const secondSubtractiveNumberForPositiveN: number =
      randomSubtractiveNumberForPositiveN + n;

    return randomSubtractiveNumberForPositiveN -
      secondSubtractiveNumberForPositiveN ===
      n
      ? [
          randomSubtractiveNumberForPositiveN,
          secondSubtractiveNumberForPositiveN
        ]
      : [
          secondSubtractiveNumberForPositiveN,
          randomSubtractiveNumberForPositiveN
        ];
  }

  const randomSubtractiveNumberForNonPositiveN: number = randomNumberInRange(
    n,
    -n
  );

  const secondSubtractiveNumberForNonPositiveN: number =
    randomSubtractiveNumberForNonPositiveN + n;

  return randomSubtractiveNumberForNonPositiveN -
    secondSubtractiveNumberForNonPositiveN ===
    n
    ? [
        randomSubtractiveNumberForNonPositiveN,
        secondSubtractiveNumberForNonPositiveN
      ]
    : [
        secondSubtractiveNumberForNonPositiveN,
        randomSubtractiveNumberForNonPositiveN
      ];
};

export const randomOperator = (
  validOperators?: IOperatorTruthTable
): Operator => {
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

const generateNoiseNumbers = (n: number, numPairs: number): number[] => {
  const noise: number[] = [];
  for (let i = 0; i < numPairs * 2; i += 1) {
    const zeroOrOne: number = Math.floor(Math.random() * 2);

    const noiseOperator: Operator = randomOperator();
    const noiseNumber: number = randomPairForNumberAndOperator(
      n,
      noiseOperator
    )[zeroOrOne];

    noise.push(noiseNumber === 0 ? 1 : noiseNumber);
  }

  return noise;
};

const generateNoiseOperators = (numOperators: number): Operator[] => {
  const noise: Operator[] = [];
  for (let i = 0; i < numOperators; i++) {
    noise.push(randomOperator());
  }

  return noise;
};

const generatePairExpression = (
  n: number,
  validOperators: IOperatorTruthTable
) => {
  const operators: ReadonlyArray<Operator> = [randomOperator(validOperators)];
  const numbers: Readonlynumber[] = randomPairForNumberAndOperator(
    n,
    operators[0]
  );

  return {
    numbers,
    operators
  };
};

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

const generateExpression = (
  n: number,
  length: number,
  leftOperator?: Operator,
  rightOperator?: Operator,
  onLeft?: boolean
) => {
  const validOperators: { [operator in Operator]: boolean } = getValidOperators(
    n,
    onLeft,
    leftOperator,
    rightOperator
  );

  const pairExpression = generatePairExpression(n, validOperators);

  const finalExpression = {
    ...pairExpression
  };

  if (length > 2) {
    const zeroOrOne: number =
      pairExpression.operators[0] === Operator.DIVISION ||
      rightOperator === Operator.DIVISION
        ? 0
        : randomNumberInRange(0, 1);
    const left: boolean = zeroOrOne === 0;

    const additionalExpression = generateExpression(
      pairExpression.numbers[zeroOrOne],
      --length,
      left ? leftOperator : pairExpression.operators[0],
      left ? pairExpression.operators[0] : rightOperator,
      left
    );

    if (left) {
      finalExpression.numbers = additionalExpression.numbers.concat(
        finalExpression.numbers.slice(1)
      );
      finalExpression.operators = additionalExpression.operators.concat(
        finalExpression.operators
      );
    } else {
      finalExpression.numbers = finalExpression.numbers
        .slice(0, finalExpression.numbers.length - 1)
        .concat(additionalExpression.numbers);
      finalExpression.operators = finalExpression.operators.concat(
        additionalExpression.operators
      );
    }
  }
  return finalExpression;
};

export const generateExpressionAndNoise = (
  n: number,
  length: number,
  noiseCount: number
) => {
  const expression = generateExpression(n, length);

  const noiseNumbers: number[] = generateNoiseNumbers(n, noiseCount);
  const noiseOperators: Operator[] = generateNoiseOperators(noiseCount);

  return {
    numbers: shuffle(noiseNumbers.concat(expression.numbers)),
    operators: shuffle(noiseOperators.concat(expression.operators))
  };
};
