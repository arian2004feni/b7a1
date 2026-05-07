function filterEvenNumbers(arry: number[]): number[] {
  const evenNumbers: number[] = arry.filter(n => n%2 ===0);
  return evenNumbers;
}

function reverseString(str: string): string {
  const ans = str.split('').reverse().join('');
  return ans;
}


