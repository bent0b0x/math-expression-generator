import randomSubtractivePair from "../randomSubtractivePair";

describe("randomSubtractivePair", () => {
  it("should handle any number between 1 to 100", () => {
    for (let i = 1; i < 101; i++) {
      for (let j = 0; j < 10; j++) {
        const [largerNumber, smallerNumber]: [
          number,
          number
        ] = randomSubtractivePair(i);
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
        ] = randomSubtractivePair(i);
        expect(firstNumber - secondNumber).toEqual(i);
      }
    }
  });
  it("should handle zero correctly", () => {
    expect(randomSubtractivePair(0)).toEqual([0, 0]);
  });
  it("should handle 1 correctly", () => {
    for (let i = 0; i < 20; i++) {
      const [numberA, numberB]: [number, number] = randomSubtractivePair(1);
      expect(numberA > 0).toEqual(true);
      expect(numberB > 0).toEqual(true);
      expect(numberA - numberB).toEqual(1);
    }
  });
});
