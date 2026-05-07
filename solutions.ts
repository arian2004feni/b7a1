function filterEvenNumbers(arry: number[]): number[] {
  const evenNumbers: number[] = arry.filter(n => n%2 ===0);
  return evenNumbers;
}

function reverseString(str: string): string {
  const ans = str.split('').reverse().join('');
  return ans;
}


type StringOrNumber= string | number;

function checkType(value: StringOrNumber): string {
  if (typeof value === 'string') {
    return 'String';
  } else {
    return 'Number';
  }
}


function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}


