/* @flow */

// tslint:disable-next-line no-implicit-dependencies
import * as Generatorics from "generatorics";
// tslint:disable-next-line no-implicit-dependencies
import * as math from "mathjs";
import * as mathUtils from "../index";
import operatorMapper from "../operatorMapper";
import randomNumberInRange from "../randomNumberInRange";

import Operator from "../types/Operator";

describe("randomAdditivePair", () => {
  it("should handle any number between 2 to 100", () => {
    for (let i = 2; i < 101; i++) {
      for (let j = 0; j < 10; j++) {
        const [numberA, numberB]: [
          number,
          number
        ] = mathUtils.randomAdditivePair(i);
        expect(numberA > 0).toEqual(true);
        expect(numberB > 0).toEqual(true);
        expect(numberA + numberB).toEqual(i);
      }
    }
  });
  it("should handle any number between -100 to -2", () => {
    for (let i = -100; i < -1; i++) {
      for (let j = 0; j < 10; j++) {
        const [numberA, numberB]: [
          number,
          number
        ] = mathUtils.randomAdditivePair(i);
        expect(numberA + numberB).toEqual(i);
      }
    }
  });
  it("should handle zero correctly", () => {
    expect(mathUtils.randomAdditivePair(0)).toEqual([0, 0]);
  });
});
describe("randomSubtractivePair", () => {
  it("should handle any number between 1 to 100", () => {
    for (let i = 1; i < 101; i++) {
      for (let j = 0; j < 10; j++) {
        const [largerNumber, smallerNumber]: [
          number,
          number
        ] = mathUtils.randomSubtractivePair(i);
        expect(largerNumber >= smallerNumber).toEqual(true);
        expect(
          largerNumber <= Math.sqrt(i) || smallerNumber <= Math.sqrt(i)
        ).toEqual(true);
        expect(largerNumber >= 0).toEqual(true);
        expect(smallerNumber >= 0).toEqual(true);
        expect(largerNumber - smallerNumber).toEqual(i);
      }
    }
  });
  it("should handle any number between -100 to -1", () => {
    for (let i = -100; i < 0; i++) {
      for (let j = 0; j < 10; j++) {
        const [firstNumber, secondNumber]: [
          number,
          number
        ] = mathUtils.randomSubtractivePair(i);
        expect(firstNumber - secondNumber).toEqual(i);
      }
    }
  });
  it("should handle zero correctly", () => {
    expect(mathUtils.randomSubtractivePair(0)).toEqual([0, 0]);
  });
  it("should handle 1 correctly", () => {
    for (let i = 0; i < 20; i++) {
      const [numberA, numberB]: [
        number,
        number
      ] = mathUtils.randomSubtractivePair(1);
      expect(numberA > 0).toEqual(true);
      expect(numberB > 0).toEqual(true);
      expect(numberA - numberB).toEqual(1);
    }
  });
});
describe("generateExpressionAndNoise", () => {
  it("should generate some valid expression of the specified length for any number between 0 to 1000", () => {
    for (let k = 2; k < 4; k++) {
      for (let i = 1; i < 1001; i += randomNumberInRange(0, 1) + 100) {
        for (let j = 0; j < 10; j++) {
          const expressionAndNoise: {
            numbers: number[];
            operators: Operator[];
          } = mathUtils.generateExpressionAndNoise(i, k, 3);
          const allNumberExpressions: number[][] = Array.from(
            Generatorics.clone.permutation(expressionAndNoise.numbers, k)
          );
          const allOperatorExpressions: Operator[][] = Array.from(
            Generatorics.clone.permutation(expressionAndNoise.operators, k - 1)
          );
          expect(expressionAndNoise.numbers.length).toEqual(k + 6);
          expect(expressionAndNoise.operators.length).toEqual(k - 1 + 3);
          expect(
            allNumberExpressions.some((numbers: number[]) =>
              allOperatorExpressions.some((operators: Operator[]) => {
                const expressionString: string = numbers.reduce(
                  (reduction: string, n: number, index: number) => {
                    let expression: string = `${reduction}${n}`;
                    if (index !== numbers.length - 1) {
                      expression = `${expression}${operatorMapper(
                        operators[index]
                      )}`;
                    }
                    return expression;
                  },
                  ""
                );
                return math.eval(expressionString) === i;
              })
            )
          ).toEqual(true);
        }
      }
    }
  });
  it("should generate some valid expression of the specified length for any number from -1000 to -1", () => {
    for (let k = 2; k < 4; k++) {
      for (let i = -1000; i < 0; i += randomNumberInRange(0, 1) + 100) {
        for (let j = 0; j < 10; j++) {
          const expressionAndNoise: {
            numbers: number[];
            operators: Operator[];
          } = mathUtils.generateExpressionAndNoise(i, k, 3);
          const allNumberExpressions: number[][] = Array.from(
            Generatorics.clone.permutation(expressionAndNoise.numbers, k)
          );
          const allOperatorExpressions: Operator[][] = Array.from(
            Generatorics.clone.permutation(expressionAndNoise.operators, k - 1)
          );
          expect(expressionAndNoise.numbers.length).toEqual(k + 6);
          expect(expressionAndNoise.operators.length).toEqual(k - 1 + 3);
          expect(
            allNumberExpressions.some((numbers: number[]) =>
              allOperatorExpressions.some((operators: Operator[]) => {
                const expressionString: string = numbers.reduce(
                  (reduction: string, n: number, index: number) => {
                    let expression: string = `${reduction}${n}`;
                    if (index !== numbers.length - 1) {
                      expression = `${expression}${operatorMapper(
                        operators[index]
                      )}`;
                    }
                    return expression;
                  },
                  ""
                );
                return math.eval(expressionString) === i;
              })
            )
          ).toEqual(true);
        }
      }
    }
  });
  it("should never choose multiplication for prime numbers (or 1) in a two-number expression", () => {
    const primes: number[] = [1, 2, 13, 17, 19, 103, 199, 131];
    primes.forEach((prime: number) => {
      for (let i = 0; i < 5; i++) {
        const expressionAndNoise: {
          numbers: number[];
          operators: Operator[];
        } = mathUtils.generateExpressionAndNoise(prime, 2, 0);
        expect(expressionAndNoise.operators.length).toEqual(1);
        expect(expressionAndNoise.operators[0]).not.toEqual(
          Operator.MULTIPLICATION
        );
      }
    });
  });
});
