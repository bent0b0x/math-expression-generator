import Expression from "./types/Expression";

import generateExpressionInternal from "./generateExpressionInternal";

const generateExpression = ({
  length,
  target
}: {
  length: number;
  target: number;
}): Expression => {
  return generateExpressionInternal(target, length);
};

export default generateExpression;
