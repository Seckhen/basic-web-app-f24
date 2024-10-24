export default function QueryProcessor(query: string): string {
  // Existing code for other queries remains unchanged...

  function computeExpression(): string {
    // Extract the mathematical expression from the query
    const expressionMatch = query.match(/what is (.+)/i);
    if (expressionMatch && expressionMatch[1]) {
      let expression = expressionMatch[1];

      // Replace words with mathematical operators
      expression = expression
        .replace(/plus/gi, '+')
        .replace(/minus/gi, '-')
        .replace(/multiplied by|times/gi, '*')
        .replace(/divided by/gi, '/')
        .replace(/to the power of/gi, '**');

      // Remove any invalid characters (keep numbers, operators, parentheses, and spaces)
      expression = expression.replace(/[^0-9+\-*/() .**]/g, '');

      try {
        // Evaluate the expression using custom evaluator
        const result = evaluateExpression(expression);
        return result.toString();
      } catch (error) {
        return 'Error evaluating the expression.';
      }
    } else {
      return 'No valid expression found.';
    }
  }

  if (query.toLowerCase().startsWith('what is')) {
    return computeExpression();
  }

  // Existing code for other queries remains unchanged...

  // Custom expression evaluator
  function evaluateExpression(expr: string): bigint {
    // Tokenize the expression
    const tokens = tokenize(expr);

    // Parse the tokens into an AST
    const ast = parseTokens(tokens);

    // Evaluate the AST
    const result = evaluateAST(ast);

    return result;
  }

  function tokenize(expr: string): string[] {
    const regex = /\s*([()+\-*/]|\*\*|[0-9]+)\s*/g;
    const tokens: string[] = [];
    let match;
    while ((match = regex.exec(expr)) !== null) {
      tokens.push(match[1]);
    }
    return tokens;
  }

  // Parsing functions
  function parseTokens(tokens: string[]): any {
    let position = 0;

    function parseExpression(): any {
      let node = parseTerm();
      while (position < tokens.length && (tokens[position] === '+' || tokens[position] === '-')) {
        const operator = tokens[position++];
        const right = parseTerm();
        node = { type: 'BinaryExpression', operator, left: node, right };
      }
      return node;
    }

    function parseTerm(): any {
      let node = parseFactor();
      while (position < tokens.length && (tokens[position] === '*' || tokens[position] === '/')) {
        const operator = tokens[position++];
        const right = parseFactor();
        node = { type: 'BinaryExpression', operator, left: node, right };
      }
      return node;
    }

    function parseFactor(): any {
      let node = parsePower();
      return node;
    }

    function parsePower(): any {
      let node = parsePrimary();
      while (position < tokens.length && tokens[position] === '**') {
        const operator = tokens[position++];
        const right = parsePrimary();
        node = { type: 'BinaryExpression', operator, left: node, right };
      }
      return node;
    }

    function parsePrimary(): any {
      const token = tokens[position++];
      if (token === '(') {
        const node = parseExpression();
        if (tokens[position++] !== ')') {
          throw new Error('Expected closing parenthesis');
        }
        return node;
      } else if (/^\d+$/.test(token)) {
        return { type: 'Literal', value: BigInt(token) };
      } else if (token === '-' || token === '+') {
        // Handle unary operators
        const right = parsePrimary();
        return { type: 'UnaryExpression', operator: token, argument: right };
      } else {
        throw new Error(`Unexpected token: ${token}`);
      }
    }

    const ast = parseExpression();
    if (position < tokens.length) {
      throw new Error('Unexpected tokens at the end');
    }
    return ast;
  }

  // Evaluation functions
  function evaluateAST(node: any): bigint {
    switch (node.type) {
      case 'Literal':
        return node.value;
      case 'UnaryExpression':
        const arg = evaluateAST(node.argument);
        if (node.operator === '-') {
          return -arg;
        } else if (node.operator === '+') {
          return arg;
        } else {
          throw new Error(`Unknown unary operator: ${node.operator}`);
        }
      case 'BinaryExpression':
        const left = evaluateAST(node.left);
        const right = evaluateAST(node.right);
        switch (node.operator) {
          case '+':
            return left + right;
          case '-':
            return left - right;
          case '*':
            return left * right;
          case '/':
            if (right === BigInt(0)) {
              throw new Error('Division by zero');
            }
            return left / right;
          case '**':
            return left ** right;
          default:
            throw new Error(`Unknown operator: ${node.operator}`);
        }
      default:
        throw new Error(`Unknown AST node type: ${node.type}`);
    }
  }

  return '';
}
