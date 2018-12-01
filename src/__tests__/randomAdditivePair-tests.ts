import randomAdditivePair from "../randomAdditivePair";

describe("randomAdditivePair", () => {
  it("should handle any number between 2 to 100", () => {
    for (let i = 2; i < 101; i++) {
      for (let j = 0; j < 10; j++) {
        const [numberA, numberB]: [number, number] = randomAdditivePair(i);
        expect(numberA > 0).toEqual(true);
        expect(numberB > 0).toEqual(true);
        expect(numberA + numberB).toEqual(i);
      }
    }
  });
  it("should handle any number between -100 to -2", () => {
    for (let i = -100; i < -1; i++) {
      for (let j = 0; j < 10; j++) {
        const [numberA, numberB]: [number, number] = randomAdditivePair(i);
        expect(numberA + numberB).toEqual(i);
      }
    }
  });
  it("should handle zero correctly", () => {
    expect(randomAdditivePair(0)).toEqual([0, 0]);
  });
});
