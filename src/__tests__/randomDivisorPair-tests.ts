import * as isPrime from "quick-is-prime";

import randomDivisorPair from "../randomDivisorPair";

describe("randomDivisorPair", () => {
  it("should handle any number between 2 and 100, and only include 1 if the target number is prime", () => {
    for (let i = 2; i < 101; i++) {
      for (let j = 0; j < 10; j++) {
        const [divisorA, divisorB]: [number, number] = randomDivisorPair(i);
        expect(divisorA * divisorB).toEqual(i);
        if (!isPrime(i)) {
          expect(divisorA).not.toEqual(1);
          expect(divisorB).not.toEqual(1);
        }
      }
    }
  });
  it("should handle any number between -100 and -2, and only include 1 if the target number is prime", () => {
    for (let i = -100; i < -1; i++) {
      for (let j = 0; j < 10; j++) {
        const [divisorA, divisorB]: [number, number] = randomDivisorPair(i);
        expect(divisorA * divisorB).toEqual(i);
        if (!isPrime(-i)) {
          expect(divisorA).not.toEqual(1);
          expect(divisorB).not.toEqual(1);
        }
      }
    }
  });
  it("should handle 0 correctly", () => {
    expect(randomDivisorPair(0)).toEqual([0, 0]);
  });
});
