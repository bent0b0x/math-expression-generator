import randomNumberInRange from "./randomNumberInRange";

const randomNumberInRangeExcept = (
  min: number,
  max: number,
  except: number
): number => {
  let result: number | null = null;
  let i = 0;

  while ((result === null || result === except) && i < 10) {
    result = randomNumberInRange(min, max);
    i++;
  }

  return result || max;
};

export default randomNumberInRangeExcept;
