import randomNumberInRange from "./randomNumberInRange";

const randomMultiplePair = (n: number): [number, number] => {
  if (n === 0) {
    return [0, 0];
  }

  if (n > 0) {
    const maxMultipleForPositiveN: number = Math.floor(Math.sqrt(n));
    const randomMultipleForPositiveN: number = randomNumberInRange(
      2,
      maxMultipleForPositiveN
    );

    const secondMultipleForPositiveN: number = n * randomMultipleForPositiveN;

    return randomMultipleForPositiveN / secondMultipleForPositiveN === n
      ? [randomMultipleForPositiveN, secondMultipleForPositiveN]
      : [secondMultipleForPositiveN, randomMultipleForPositiveN];
  }

  const maxMultipleForNonPositiveN: number = Math.floor(Math.sqrt(-n));
  const randomMultipleForNonPositiveN: number =
    randomNumberInRange(2, maxMultipleForNonPositiveN) *
    (randomNumberInRange(1, 2) === 1 ? -1 : 1);

  const secondMultipleForNonPositiveN: number =
    n * randomMultipleForNonPositiveN;

  return randomMultipleForNonPositiveN / secondMultipleForNonPositiveN === n
    ? [randomMultipleForNonPositiveN, secondMultipleForNonPositiveN]
    : [secondMultipleForNonPositiveN, randomMultipleForNonPositiveN];
};

export default randomMultiplePair;
