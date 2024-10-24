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

  function computeAddition(): string {
    const matches: string[] | null = query.match(/\d+/g);
    if (matches && matches.length > 0) {
      const numbers = matches.map(Number);
      const sum = numbers.reduce((a, b) => a + b, 0);
      return sum.toString();
    } else {
      return "No numbers found to add.";
    }
  }

  if (query.toLowerCase().includes("what is") && query.toLowerCase().includes("plus")) {
    return computeAddition();
  }

  function computeMultiplication(): string {
    const matches: string[] | null = query.match(/\d+/g);
    if (matches && matches.length > 0) {
      const numbers = matches.map(Number);
      const product = numbers.reduce((a, b) => a * b, 1);
      return product.toString();
    } else {
      return "No numbers found to multiply.";
    }
  }

  if (
    query.toLowerCase().includes("what is") &&
    (query.toLowerCase().includes("multiplied by") || query.toLowerCase().includes("times"))
  ) {
    return computeMultiplication();
  }

  function computeSubtraction(): string {
    const matches: string[] | null = query.match(/\d+/g);
    if (matches && matches.length === 2) {
      const numbers = matches.map(Number);
      const difference = numbers[0] - numbers[1];
      return difference.toString();
    } else {
      return "Please provide exactly two numbers to subtract.";
    }
  }

  if (query.toLowerCase().includes("what is") && query.toLowerCase().includes("minus")) {
    return computeSubtraction();
  }

  function computePower(): string {
    const matches: string[] | null = query.match(/\d+/g);
    if (matches && matches.length === 2) {
      const base = Number(matches[0]);
      const exponent = Number(matches[1]);
      const result = Math.pow(base, exponent);
      return result.toString();
    } else {
      return "Please provide a base and an exponent.";
    }
  }

  if (
    query.toLowerCase().includes("what is") &&
    (query.toLowerCase().includes("to the power of") || query.toLowerCase().includes("^"))
  ) {
    return computePower();
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
