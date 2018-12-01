import randomNumberInRange from "../randomNumberInRange";

describe("randomNumberInRange", () => {
  it("should return a random number in a range of two positive numbers", () => {
    for (let i = 0; i < 50; i++) {
      const randomNumber: number = randomNumberInRange(1, 2000);

      expect(randomNumber <= 2000).toEqual(true);
      expect(randomNumber >= 1).toEqual(true);
    }
  });

  it("should return a random number in a range of two negative numbers", () => {
    for (let i = 0; i < 50; i++) {
      const randomNumber: number = randomNumberInRange(-2000, -1);

      expect(randomNumber <= -1).toEqual(true);
      expect(randomNumber >= -2000).toEqual(true);
    }
  });

  it("should return a random number in a range of one negative and one positive number", () => {
    for (let i = 0; i < 50; i++) {
      const randomNumber: number = randomNumberInRange(-2000, 2000);

      expect(randomNumber <= 2000).toEqual(true);
      expect(randomNumber >= -2000).toEqual(true);
    }
  });
});
