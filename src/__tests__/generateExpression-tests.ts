// tslint:disable-next-line no-implicit-dependencies
import * as math from "mathjs";

import generateExpression from "../generateExpression";

import Expression from "../types/Expression";
import Operator from "../types/Operator";

describe("generateExpression", () => {
  it("should generate a valid expression of the specified length for any number between 0 to 1000", () => {
    for (let k = 2; k < 4; k++) {
      for (let i = 1; i < 1001; i += 1) {
        for (let j = 0; j < 10; j++) {
          const expression: Expression = generateExpression(i, k);

          expect(expression.length).toEqual(k + (k - 1));

          for (let m = 0; m < expression.length; m++) {
            if (m % 2 === 0) {
              expect(typeof expression[m]).toEqual("number");
            } else {
              expect(expression[m] in Operator);
            }
          }

          expect(math.eval(expression.join(""))).toEqual(i);
        }
      }
    }
  });
  it("should generate a valid expression of the specified length for any number between -1000 to -1", () => {
    for (let k = 2; k < 4; k++) {
      for (let i = -1000; i < -999; i += 1) {
        for (let j = 0; j < 10; j++) {
          const expression: Expression = generateExpression(i, k);

          expect(expression.length).toEqual(k + (k - 1));

          for (let m = 0; m < expression.length; m++) {
            if (m % 2 === 0) {
              expect(typeof expression[m]).toEqual("number");
            } else {
              expect(expression[m] in Operator);
            }
          }

          expect(math.eval(expression.join(""))).toEqual(i);
        }
      }
    }
  });
  it("should never choose multiplication for prime numbers (or 1) in a two-number expression", () => {
    const primes: number[] = [1, 2, 13, 17, 19, 103, 199, 131];
    primes.forEach((prime: number) => {
      for (let i = 0; i < 5; i++) {
        const expression: Expression = generateExpression(prime, 2);
        expect(expression.length).toEqual(3);
        expect(expression[1]).not.toEqual(Operator.MULTIPLICATION);
      }
    });
  });
});
