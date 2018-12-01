import randomNumberInRange from "./randomNumberInRange";

const randomSubtractivePair = (n: number): [number, number] => {
  if (n === 0) {
    return [0, 0];
  }

  if (n > 0) {
    const randomSubtractiveNumberForPositiveN: number = randomNumberInRange(
      1,
      Math.floor(Math.sqrt(n))
    );

    const secondSubtractiveNumberForPositiveN: number =
      randomSubtractiveNumberForPositiveN + n;

    return randomSubtractiveNumberForPositiveN -
      secondSubtractiveNumberForPositiveN ===
      n
      ? [
          randomSubtractiveNumberForPositiveN,
          secondSubtractiveNumberForPositiveN
        ]
      : [
          secondSubtractiveNumberForPositiveN,
          randomSubtractiveNumberForPositiveN
        ];
  }

  const randomSubtractiveNumberForNonPositiveN: number = randomNumberInRange(
    n,
    -n
  );

  const secondSubtractiveNumberForNonPositiveN: number =
    randomSubtractiveNumberForNonPositiveN + n;

  return randomSubtractiveNumberForNonPositiveN -
    secondSubtractiveNumberForNonPositiveN ===
    n
    ? [
        randomSubtractiveNumberForNonPositiveN,
        secondSubtractiveNumberForNonPositiveN
      ]
    : [
        secondSubtractiveNumberForNonPositiveN,
        randomSubtractiveNumberForNonPositiveN
      ];
};

export default randomSubtractivePair;
