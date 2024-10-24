export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("andrew id")) {
    //TODO add your Andrew ID below
    //TODO update the corresponding test case in __tests__
    return "saandrad";
  }

  if (query.toLowerCase().includes("name")) {
    return "saandrad";
  }

  function getLargestNumber(): string {
    const matches: string[] | null = query.match(/\d+/g);
    if (matches && matches.length > 0) {
      const numbers = matches.map(Number);
      const maxNumber = Math.max(...numbers);
      return maxNumber.toString();
    } else {
      return "No numbers found in the query.";
    }
  }

  if (query.toLowerCase().includes("which of the following numbers is the largest")) {
    return getLargestNumber();
  }

  function computeExpression(): string {
    // Extract the mathematical expression from the query
    const expressionMatch = query.match(/what is (.+)/i);
    if (expressionMatch && expressionMatch[1]) {
      let expression = expressionMatch[1];

      // Replace words with mathematical operators
      expression = expression
        .replace(/plus/gi, "+")
        .replace(/minus/gi, "-")
        .replace(/multiplied by|times/gi, "*")
        .replace(/divided by/gi, "/")
        .replace(/to the power of/gi, "**");

      // Remove any non-mathematical characters
      expression = expression.replace(/[^0-9+\-*/().\s**]/g, "");

      try {
        // Use Function constructor to evaluate the expression safely
        // Note: In a controlled environment; avoid in production code
        const result = new Function(`return (${expression});`)();
        return result.toString();
      } catch (error) {
        return "Error evaluating the expression.";
      }
    } else {
      return "No valid expression found.";
    }
  }

  if (query.toLowerCase().startsWith("what is")) {
    return computeExpression();
  }

  function findSquareAndCubeNumbers(): string {
    const matches: string[] | null = query.match(/\d+/g);
    if (matches && matches.length > 0) {
      const numbers = matches.map(Number);
      const result = numbers.filter((n) => {
        const sqrt = Math.sqrt(n);
        const cbrt = Math.cbrt(n);
        return Number.isInteger(sqrt) && Number.isInteger(cbrt);
      });
      if (result.length > 0) {
        return result.join(", ");
      } else {
        return "No numbers are both a square and a cube.";
      }
    } else {
      return "No numbers found in the query.";
    }
  }

  if (
    query
      .toLowerCase()
      .includes("which of the following numbers is both a square and a cube")
  ) {
    return findSquareAndCubeNumbers();
  }

  function findPrimeNumbers(): string {
    const matches: string[] | null = query.match(/\d+/g);
    if (matches && matches.length > 0) {
      const numbers = matches.map(Number);
      const primes = numbers.filter(isPrime);
      if (primes.length > 0) {
        return primes.join(", ");
      } else {
        return "No prime numbers found.";
      }
    } else {
      return "No numbers found in the query.";
    }
  }

  function isPrime(n: number): boolean {
    if (n <= 1) return false;
    if (n <= 3) return true;

    if (n % 2 === 0 || n % 3 === 0) return false;

    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  }

  if (query.toLowerCase().includes("which of the following numbers are primes")) {
    return findPrimeNumbers();
  }

  return "";
}
