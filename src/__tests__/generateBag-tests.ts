// tslint:disable-next-line no-implicit-dependencies
import * as generatorics from "generatorics";
import * as math from "mathjs";

import generateBag from "../generateBag";

import Expression from "../types/Expression";
import Operator from "../types/Operator";

const bagCanEvaluateToValue = (bag, value) => {
  if (bag.length === 1 && bag[0] === value) {
    return true;
  }

  const allBags = Array.from(generatorics.clone.permutation(bag));

  const isValid = allBags.some((orderedBag: Array<number | Operator>) => {
    let copiedBag = [...orderedBag];

    const [firstItem, secondItem, thirdItem, ...rest] = copiedBag;

    if (
      typeof firstItem !== "number" ||
      typeof secondItem === "number" ||
      typeof thirdItem !== "number"
    ) {
      return false;
    }

    copiedBag = [
      math.evaluate(`${firstItem} ${secondItem} ${thirdItem}`),
      ...rest
    ];

    return bagCanEvaluateToValue(copiedBag, value);
  });

  return isValid;
};

describe("generateBag", () => {
  it("should generate a valid expression of the specified length for any number between 0 to 1000", () => {
    for (let k = 2; k < 4; k++) {
      for (let i = 1; i < 1001; i += 1) {
        for (let j = 0; j < 10; j++) {
          const bag = generateBag(i, k);

          const { numberCount, operatorCount, otherCount } = bag.reduce(
            (acc, item) => {
              if (typeof item === "number") {
                acc.numberCount++;
              } else if (
                Object.keys(Operator)
                  .map(key => Operator[key])
                  .indexOf(item) >= 0
              ) {
                acc.operatorCount++;
              } else {
                acc.otherCount++;
              }
              return acc;
            },
            { numberCount: 0, operatorCount: 0, otherCount: 0 }
          );

          expect(numberCount).toEqual(k);
          expect(operatorCount).toEqual(k - 1);
          expect(otherCount).toEqual(0);

          const isValid = bagCanEvaluateToValue(bag, i);

          expect(isValid).toEqual(true);
        }
      }
    }
  });

  it("should generate a valid expression of the specified length for any number between -1000 to -1", () => {
    for (let k = 2; k < 4; k++) {
      for (let i = -1000; i < -999; i += 1) {
        for (let j = 0; j < 10; j++) {
          const bag = generateBag(i, k);

          const { numberCount, operatorCount, otherCount } = bag.reduce(
            (acc, item) => {
              if (typeof item === "number") {
                acc.numberCount++;
              } else if (
                Object.keys(Operator)
                  .map(key => Operator[key])
                  .indexOf(item) >= 0
              ) {
                acc.operatorCount++;
              } else {
                acc.otherCount++;
              }
              return acc;
            },
            { numberCount: 0, operatorCount: 0, otherCount: 0 }
          );

          expect(numberCount).toEqual(k);
          expect(operatorCount).toEqual(k - 1);
          expect(otherCount).toEqual(0);

          const isValid = bagCanEvaluateToValue(bag, i);

          expect(isValid).toEqual(true);
        }
      }
    }
  });

  it("should never choose multiplication for prime numbers (or 1) in a two-number expression", () => {
    const primes: number[] = [1, 2, 13, 17, 19, 103, 199, 131];
    primes.forEach((prime: number) => {
      for (let i = 0; i < 5; i++) {
        const expression: Expression = generateBag(prime, 2);
        expect(expression.length).toEqual(3);
        expect(expression[1]).not.toEqual(Operator.MULTIPLICATION);
      }
    });
  });
});
