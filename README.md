# Math Expression Generator

[![CircleCI](https://circleci.com/gh/bent0b0x/math-expression-generator.svg?style=svg)](https://circleci.com/gh/bent0b0x/math-expression-generator)

Computes random arithmetic expressions (of configurable length) that evalute to a given number.

## Usage

```javascript
import { generateExpression } from 'math-expression-generator';

const expression = generateExpression({
  target: 20,
  length: 2
});

console.log(expression); // [15, '+', 5]

const longExpression = generateExpression({
  target: 4828,
  length: 5
});

console.log(longExpression); // [ 2, '*', 13, '*', 10, '*', 1207, '/', 65 ]
```

### Evaluate the expression

If you want to evaluate the returned expression (to verify it is correct, for example), you can use [mathjs](http://mathjs.org/) (but there are plenty of other library solutions out there):

```javascript
import { generateExpression } from 'math-expression-generator';
import math from 'mathjs';

const expression = generateExpression({
  target: 20,
  length: 2
});

const result = math.eval(expression);

console.log(result); // 20
```
