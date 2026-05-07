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


interface Book {
  title: string;
  author: string;
  publishedYear: number;
}

function toggleReadStatus(book: Book) {
  return {
    ...book,
    isRead: true
  }
}


class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

class Student extends Person {
  grade: string;

  constructor(name: string, age: number,grade: string){
    super(name, age);
    this.grade = grade;
  }

  getDetails(): string {
    return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
  }
}


function getIntersection(arr1: number[], arr2: number[]): number[] {
  const result: number[] = [];

  for(let n of arr1) {
    if(arr2.includes(n) && !result.includes(n)) {
      result.push(n);
    }
  }

  return result;
}


