/**
 * Calculator engine for expression evaluation without using eval()
 */

type Operator = '+' | '-' | '*' | '/' | '^' | '%';

const PRECEDENCE: Record<string, number> = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '^': 3,
};

const isOperator = (token: string): boolean => {
  return ['+', '-', '*', '/', '^'].includes(token);
};

const isFunction = (token: string): boolean => {
  return ['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'cbrt'].includes(token);
};

const factorial = (n: number): number => {
  if (n < 0) return NaN;
  if (n === 0) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
};

/**
 * Evaluates a mathematical expression
 * Uses a basic Shunting-Yard algorithm to convert to RPN and then evaluate
 */
export const evaluateExpression = (expression: string): number => {
  try {
    // 1. Tokenize the expression
    const tokens = tokenize(expression);
    
    // 2. Convert to RPN (Reverse Polish Notation)
    const rpn = shuntingYard(tokens);
    
    // 3. Evaluate RPN
    return evaluateRPN(rpn);
  } catch (error) {
    console.error('Evaluation error:', error);
    throw new Error('Invalid Expression');
  }
};

const tokenize = (expression: string): string[] => {
  // Replace Math constants
  let expr = expression.replace(/Math\.PI/g, Math.PI.toString())
                     .replace(/Math\.E/g, Math.E.toString());

  // Add implicit multiplication for cases like 5(2) or (2)(3)
  expr = expr.replace(/(\d)\(/g, '$1*(');
  expr = expr.replace(/\)(\d)/g, ')*$1');
  expr = expr.replace(/\)\(/g, ')*(');

  const tokens: string[] = [];
  let numberBuffer = '';

  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];

    if (/\d|\./.test(char)) {
      numberBuffer += char;
    } else {
      if (numberBuffer) {
        tokens.push(numberBuffer);
        numberBuffer = '';
      }

      if (/\s/.test(char)) continue;

      if (isOperator(char) || char === '(' || char === ')' || char === '!') {
        // Handle unary minus
        if (char === '-' && (tokens.length === 0 || tokens[tokens.length - 1] === '(' || isOperator(tokens[tokens.length - 1]))) {
          numberBuffer = '-';
        } else {
          tokens.push(char);
        }
      } else if (/[a-z]/.test(char)) {
        let funcName = '';
        while (i < expr.length && /[a-z]/.test(expr[i])) {
          funcName += expr[i];
          i++;
        }
        i--; // Adjust for loop increment
        tokens.push(funcName);
      }
    }
  }

  if (numberBuffer) {
    tokens.push(numberBuffer);
  }

  return tokens;
};

const shuntingYard = (tokens: string[]): string[] => {
  const outputQueue: string[] = [];
  const operatorStack: string[] = [];

  tokens.forEach((token) => {
    if (!isNaN(parseFloat(token))) {
      outputQueue.push(token);
    } else if (isFunction(token)) {
      operatorStack.push(token);
    } else if (token === '!' || token === '%') {
      outputQueue.push(token); // Factorial and Percent are unary postfix
    } else if (isOperator(token)) {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] !== '(' &&
        ((PRECEDENCE[operatorStack[operatorStack.length - 1]] > PRECEDENCE[token]) ||
          (PRECEDENCE[operatorStack[operatorStack.length - 1]] === PRECEDENCE[token] && token !== '^'))
      ) {
        outputQueue.push(operatorStack.pop()!);
      }
      operatorStack.push(token);
    } else if (token === '(') {
      operatorStack.push(token);
    } else if (token === ')') {
      while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
        outputQueue.push(operatorStack.pop()!);
      }
      operatorStack.pop(); // Remove '('
      if (operatorStack.length > 0 && isFunction(operatorStack[operatorStack.length - 1])) {
        outputQueue.push(operatorStack.pop()!);
      }
    }
  });

  while (operatorStack.length > 0) {
    outputQueue.push(operatorStack.pop()!);
  }

  return outputQueue;
};

const evaluateRPN = (rpn: string[]): number => {
  const stack: number[] = [];

  rpn.forEach((token) => {
    if (!isNaN(parseFloat(token))) {
      stack.push(parseFloat(token));
    } else if (token === '!') {
      const a = stack.pop()!;
      stack.push(factorial(a));
    } else if (token === '%') {
      const a = stack.pop()!;
      stack.push(a / 100);
    } else if (isOperator(token)) {
      const b = stack.pop()!;
      const a = stack.pop()!;
      switch (token) {
        case '+': stack.push(a + b); break;
        case '-': stack.push(a - b); break;
        case '*': stack.push(a * b); break;
        case '/': 
          if (b === 0) throw new Error('Division by Zero');
          stack.push(a / b); 
          break;
        case '^': stack.push(Math.pow(a, b)); break;
      }
    } else if (isFunction(token)) {
      const a = stack.pop()!;
      switch (token) {
        case 'sin': stack.push(Math.sin(a)); break;
        case 'cos': stack.push(Math.cos(a)); break;
        case 'tan': stack.push(Math.tan(a)); break;
        case 'log': stack.push(Math.log10(a)); break;
        case 'ln': stack.push(Math.log(a)); break;
        case 'sqrt': stack.push(Math.sqrt(a)); break;
        case 'cbrt': stack.push(Math.cbrt(a)); break;
      }
    }
  });

  return stack[0];
};
