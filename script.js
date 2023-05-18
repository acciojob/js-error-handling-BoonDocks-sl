class OutOfRangeError extends Error {
  constructor(arg) {
    super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
    this.name = "OutOfRangeError";
  }
}

class InvalidExprError extends Error {
  constructor() {
    super("Expression should not have an invalid combination of expression");
    this.name = "InvalidExprError";
  }
}

function evalString(expr) {
  try {
    if (/(\+\+|\-\-|\*\*|\/\/|\+\*|\-\*|\*\+|\/\+)/.test(expr)) {
      throw new InvalidExprError();
    }
    if (/^[\/\*\+]/.test(expr)) {
      throw new SyntaxError("Expression should not start with an invalid operator");
    }
    if (/[\*\/\+\-]$/.test(expr)) {
      throw new SyntaxError("Expression should not end with an invalid operator");
    }
    return eval(expr);
  } catch (error) {
    if (error instanceof SyntaxError || error instanceof InvalidExprError) {
      throw error;
    } else {
      throw new OutOfRangeError(expr);
    }
  }
}

// test cases
try {
  console.log(evalString("1 + 2 - 3 * 4 / 5")); // should log -0.6
  console.log(evalString("1 + 2 - 3 * 4 / 0")); // should throw OutOfRangeError
  console.log(evalString("1++2")); // should throw InvalidExprError
  console.log(evalString("+1+2")); // should throw SyntaxError
  console.log(evalString("1+2-3*4/")); // should throw SyntaxError
} catch (error) {
  console.error(error);
}
