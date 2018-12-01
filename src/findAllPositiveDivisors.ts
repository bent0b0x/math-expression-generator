import * as isPrime from "quick-is-prime";

const findAllPositiveDivisors = (n: number): number[] => {
  const largeDivisors: number[] = [];
  const smallDivisors: number[] = [];

  const sqrt: number = Math.sqrt(n);

  for (let i = 1; i < sqrt + 1; i++) {
    if (i === smallDivisors[smallDivisors.length - 1]) {
      break;
    }
    if (n % i === 0 && (n === 1 || isPrime(n) || i !== 1)) {
      largeDivisors.push(i);

      if (n / i !== i && (n === 1 || isPrime(n) || n !== i)) {
        smallDivisors.push(n / i);
      }
    }
  }

  return largeDivisors.concat(smallDivisors);
};

export default findAllPositiveDivisors;
