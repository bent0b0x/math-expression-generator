import findAllPositiveDivisors from "./findAllPositiveDivisors";
import randomNumberInRange from "./randomNumberInRange";

const randomDivisorPair = (n: number): [number, number] => {
  if (n === 0) {
    return [0, 0];
  }

  if (n > 0) {
    const divisorsForPositiveN: number[] = findAllPositiveDivisors(n);

    if (!divisorsForPositiveN.length) {
      return [0, 0];
    }

    const randomDivisorForPositiveN: number =
      divisorsForPositiveN[
        Math.floor(Math.random() * divisorsForPositiveN.length)
      ];

    return [randomDivisorForPositiveN, n / randomDivisorForPositiveN];
  }

  const divisorsForNonPositiveN: number[] = findAllPositiveDivisors(-n);

  if (!divisorsForNonPositiveN.length) {
    return [0, 0];
  }

  const randomDivisorForNonPositiveN: number =
    divisorsForNonPositiveN[
      Math.floor(Math.random() * divisorsForNonPositiveN.length)
    ] * (randomNumberInRange(1, 2) === 1 ? 1 : -1);

  return [randomDivisorForNonPositiveN, n / randomDivisorForNonPositiveN];
};

export default randomDivisorPair;
