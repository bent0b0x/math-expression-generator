import randomMultiplePair from "../randomMultiplePair";

describe("randomMultiplePair", () => {
  it("should handle any number between 2 to 100", () => {
    for (let i = 2; i < 101; i++) {
      for (let j = 0; j < 10; j++) {
        const [largeMultiple, smallMultiple]: [
          number,
          number
        ] = randomMultiplePair(i);
        expect(i / largeMultiple <= Math.floor(Math.sqrt(i))).toEqual(true);
        expect(largeMultiple / smallMultiple).toEqual(i);
        expect(largeMultiple).not.toEqual(1);
        expect(smallMultiple).not.toEqual(1);
      }
    }
  });
  it("should handle 0 correctly", () => {
    expect(randomMultiplePair(0)).toEqual([0, 0]);
  });
  it("should handle any number between -100 and -2", () => {
    for (let i = -100; i < -1; i++) {
      for (let j = 0; j < 10; j++) {
        const [firstNumber, secondNumber]: [
          number,
          number
        ] = randomMultiplePair(i);
        expect(
          -i / Math.abs(firstNumber) <= Math.floor(Math.sqrt(-i)) ||
            -i / Math.abs(secondNumber) <= Math.floor(Math.sqrt(-i))
        ).toEqual(true);
        expect(firstNumber / secondNumber === i).toEqual(true);
        expect(firstNumber).not.toEqual(1);
        expect(secondNumber).not.toEqual(1);
      }
    }
  });
});
