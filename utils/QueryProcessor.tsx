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
    // Extract numbers using regex
    const matches: string[] | null = query.match(/\d+/g);
    if (matches && matches.length > 0) {
      const numbers = matches.map(Number);
      // Find the maximum number
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
    // Extract numbers using regex
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
    // Extract numbers using regex
    const matches: string[] | null = query.match(/\d+/g);
    if (matches && matches.length > 0) {
      const numbers = matches.map(Number);
      const product = numbers.reduce((a, b) => a * b, 1);
      return product.toString();
    } else {
      return "No numbers found to multiply.";
    }
  }

  if (query.toLowerCase().includes("what is") && query.toLowerCase().includes("multiplied by")) {
    return computeMultiplication();
  }

  function findSquareAndCubeNumbers(): string {
    // Extract numbers using regex
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

  if (query.toLowerCase().includes("which of the following numbers is both a square and a cube")) {
    return findSquareAndCubeNumbers();
  }

  return "";
}
