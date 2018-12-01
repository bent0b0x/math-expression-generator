import randomNumberInRange from "./randomNumberInRange";

const randomAdditivePair = (n: number): [number, number] => {
  if (n === 0) {
    return [0, 0];
  }

  if (n > 0) {
    const randomNumberForPositiveN: number = randomNumberInRange(1, n - 1);
    return [randomNumberForPositiveN, n - randomNumberForPositiveN];
  }

  const randomNumberForNonPoitiveN: number = randomNumberInRange(
    n + Math.floor(n / 2),
    -1
  );

  return [randomNumberForNonPoitiveN, n - randomNumberForNonPoitiveN];
};

export default randomAdditivePair;
