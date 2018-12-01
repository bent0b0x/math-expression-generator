import findAllPositiveDivisors from "../findAllPositiveDivisors";

describe("findAllPositiveDivisors", () => {
  const numberCompare = (a: number, b: number) => a - b;
  it("should return nothing for 0", () => {
    expect(findAllPositiveDivisors(0).sort(numberCompare)).toEqual([]);
  });
  it("should return the correct divisors for the number 1", () => {
    expect(findAllPositiveDivisors(1).sort(numberCompare)).toEqual([1]);
  });
  it("should return the correct divisors for a number with a few divisors", () => {
    expect(findAllPositiveDivisors(10).sort(numberCompare)).toEqual([2, 5]);
  });
  it("should return the correct divisors for a number with a few more divisors", () => {
    expect(findAllPositiveDivisors(320).sort(numberCompare)).toEqual([
      2,
      4,
      5,
      8,
      10,
      16,
      20,
      32,
      40,
      64,
      80,
      160
    ]);
  });
  it("should not duplicate a square root", () => {
    expect(findAllPositiveDivisors(144).sort(numberCompare)).toEqual([
      2,
      3,
      4,
      6,
      8,
      9,
      12,
      16,
      18,
      24,
      36,
      48,
      72
    ]);
  });
  it("should handle prime numbers correctly", () => {
    expect(findAllPositiveDivisors(13).sort(numberCompare)).toEqual([1, 13]);
  });
  it("should return the correct divisors for a large number", () => {
    expect(findAllPositiveDivisors(1560).sort(numberCompare)).toEqual([
      2,
      3,
      4,
      5,
      6,
      8,
      10,
      12,
      13,
      15,
      20,
      24,
      26,
      30,
      39,
      40,
      52,
      60,
      65,
      78,
      104,
      120,
      130,
      156,
      195,
      260,
      312,
      390,
      520,
      780
    ]);
  });
});
