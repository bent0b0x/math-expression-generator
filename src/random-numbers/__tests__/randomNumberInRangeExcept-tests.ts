import randomNumberInRangeExcept from "../randomNumberInRangeExcept";

describe("randomNumberInRangeExcept", () => {
  it("should return a random number in a range of two positive numbers, never including the excepted number", () => {
    for (let i = 0; i < 50; i++) {
      const except = Math.floor(Math.random() * 100);
      const randomNumber: number = randomNumberInRangeExcept(1, 2000, except);

      expect(randomNumber <= 2000).toEqual(true);
      expect(randomNumber >= 1).toEqual(true);
      expect(randomNumber).not.toEqual(except);
    }
  });

  it("should return a random number in a range of two negative numbers, never including the excepted number", () => {
    for (let i = 0; i < 50; i++) {
      const except = Math.floor(Math.random() * 100) * -1;
      const randomNumber: number = randomNumberInRangeExcept(-2000, -1, except);

      expect(randomNumber <= -1).toEqual(true);
      expect(randomNumber >= -2000).toEqual(true);
      expect(randomNumber).not.toEqual(except);
    }
  });

  it("should return a random number in a range of one negative and one positive number", () => {
    for (let i = 0; i < 50; i++) {
      const except = Math.floor(Math.random() * 100) * (i % 2 === 0 ? -1 : 1);
      const randomNumber: number = randomNumberInRangeExcept(
        -2000,
        2000,
        except
      );

      expect(randomNumber <= 2000).toEqual(true);
      expect(randomNumber >= -2000).toEqual(true);
      expect(randomNumber).not.toEqual(except);
    }
  });
});
