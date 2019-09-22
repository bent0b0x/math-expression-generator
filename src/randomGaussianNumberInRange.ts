const randonGaussianNumberInRange = (min: number, max: number) => {
  let u: number = 0;
  let v: number = 0;

  // Converting [0,1) to (0,1)
  while (u === 0) {
    u = Math.random();
  }
  while (v === 0) {
    v = Math.random();
  }

  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  num = num / 10.0 + 0.5; // Translate to 0 -> 1

  // resample between 0 and 1 if out of range
  if (num > 1 || num < 0) {
    num = randonGaussianNumberInRange(min, max);
  }
  num *= max - min; // Stretch to fill range
  num += min; // offset to min

  return Math.round(num);
};

export default randonGaussianNumberInRange;
