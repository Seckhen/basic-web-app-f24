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

  function getLargestNumber(query: string): string {
    // Extract numbers using regex
    const numbers = query.match(/\d+/g)?.map(Number);
    if (numbers && numbers.length > 0) {
      // Find the maximum number
      const maxNumber = Math.max(...numbers);
      return maxNumber.toString();
    } else {
      return "No numbers found in the query.";
    }
  }

  if (query.toLowerCase().includes("which of the following numbers is the largest")) {
    return getLargestNumber(query);
  }

  function computeAddition(query: string): string {
    // Extract numbers using regex
    const numbers = query.match(/\d+/g)?.map(Number);
    if (numbers && numbers.length > 0) {
      const sum = numbers.reduce((a, b) => a + b, 0);
      return sum.toString();
    } else {
      return "No numbers found to add.";
    }
  }

  if (query.toLowerCase().includes("what is") && query.toLowerCase().includes("plus")) {
    return computeAddition(query);
  }

  return "";
}
