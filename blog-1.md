# `any` vs `unknown`: TypeScript-এ Type-Safety নিশ্চিত করার সেরা উপায়

TypeScript ডেভেলপার হিসেবে আমরা সবাই কোডের Quality এবং নির্ভুলতা নিয়ে চিন্তিত থাকি। কিন্তু প্রায়শই আমরা অজান্তেই TypeScript-এর মূল উদ্দেশ্য—টাইপ সেফটি—কে নষ্ট করে ফেলি। এর প্রধান কারণ হলো `any` টাইপের অতিরিক্ত ব্যবহার। 

এই ব্লগে আমরা জানবো… 

- কেন `any` একটি "Type Safety Hole" বা ফাঁক,
- কেন `unknown` ব্যবহার করা নিরাপদ,
- এবং কিভাবে টাইপ ন্যারোয়িং (Type Narrowing) এর মাধ্যমে unpredictable data হ্যান্ডেল করা যায়।

---

## **1. Why `any` is a “Type Safety Hole”**

TypeScript-এ `any` টাইপ হলো এমন একটি টাইপ, যা টাইপ চেকারকে বলে, "এই variable টি যে কোনো কিছু হতে পারে, দয়া করে এটি পরীক্ষা করবেন না"।

### **The Danger: False Sense of Security**

- **কোনো চেকিং নেই:** `any` ব্যবহার করলে আপনি যে কোনো মেথড বা প্রপার্টি অ্যাক্সেস করতে পারবেন, এমনকি যদি তা রানটাইমে (runtime) না থাকে, তবুও কম্পাইলার কোনো এরর (error) দেখাবে না।
- **রানটাইম এরর:** এটি ডেভেলপমেন্টের সময় তো নয়ই, এমনকি রানটাইমেও অ্যাপ্লিকেশন ক্র্যাশ করাতে পারে।
- **ডকুমেন্টেশনের অভাব:** কোড রিডাবিলিটি কমিয়ে দেয়, কারণ ভেরিয়েবলের আসল ডাটা টাইপ বোঝা যায় না।

```tsx
let userInput: any = "Hello World";
console.log(userInput.toFixed(2)); 

// কম্পাইল-টাইমে কোনো এরর নেই, কিন্তু রানটাইমে "TypeError: ... is not a function" আসবে।
```

---

## **2. Why `unknown` is the Safer Choice**

`unknown` হলো `any` এর একটি নিরাপদ ভার্সন। `any` এর মতোই, যে কোনো ভ্যালু `unknown` এ এসাইন করা যায়। কিন্তু মূল পার্থক্য হলো, `unknown` টাইপের কোনো ভেরিয়েবলের ওপর **সরাসরি কোনো মেথড বা প্রপার্টি কল করা যায় না**।

### **The Benefits:**

- **FORCE করে টাইপ চেক করতে:** যতক্ষণ না আপনি টাইপ ন্যারোয়িং করছেন, ততক্ষণ এটি ব্যবহার করতে পারবেন না।
- **নিরাপদ:** এটি আপনাকে কম্পাইল-টাইমেই এরর ধরিয়ে দেয়।

```tsx
let userInput: unknown = "Hello World";
// console.log(userInput.toFixed(2)); 
// ❌ Error: Object is of type 'unknown'.

// সমাধান: টাইপ চেক বা ন্যারোয়িং
if (typeof userInput === "number") {
  console.log(userInput.toFixed(2)); // ✅ safe
} else if (typeof userInput === "string") {
  console.log(userInput.toUpperCase()); // ✅ safe
}
```

### **কখন `unknown` ব্যবহার করবেন?**

যখন কোনো API রেসপন্স, থার্ড-পার্টি লাইব্রেরি বা ইউজারের ইনপুট থেকে ডাটা আসবে যার টাইপ আপনি নিশ্চিত নন, তখন `unknown` টাইপ ব্যবহার করুন।

## **3. টাইপ ন্যারোয়িং (Type Narrowing) কী?**

টাইপ ন্যারোয়িং হলো TypeScript-এর একটি ক্ষমতা, যার মাধ্যমে একটি ব্রড টাইপ (যেমন: `string | number` বা `unknown`) থেকে একটি সুনির্দিষ্ট টাইপ (যেমন: শুধুমাত্র `string`) বের করে আনা হয়। এটি `if` স্টেটমেন্ট বা `typeof` চেকের মাধ্যমে করা হয়।

**কমন ন্যারোয়িং টেকনিক:**

## **A. `typeof` Guard**

প্রিমটিভ টাইপ (string, number, boolean) চেক করতে এটি সবচেয়ে বেশি ব্যবহৃত হয়।

```tsx
function printId(id: number | string) {
  if (typeof id === "string") {
    console.log(id.toUpperCase()); // এখানে id শুধুমাত্র string
  } else {
    console.log(id); // এখানে id শুধুমাত্র number
  }
}
```

## **B. `instanceof` Guard**

অবজেক্ট বা ক্লাসের ইনস্ট্যান্স চেক করতে এটি ব্যবহৃত হয়।

```tsx
if (input instanceof Date) {
  console.log(input.getFullYear()); // input এখন একটি Date অবজেক্ট
}
```

## **C. Property Existence Check (`in` operator)**

অবজেক্টে নির্দিষ্ট প্রপার্টি আছে কিনা তা চেক করতে।

```tsx
if ("name" in user) {
  console.log(user.name); // user অবজেক্টে name প্রপার্টি আছে
}
```

---

## **Conclusion: Make the Switch**

- **`any`** ব্যবহার করা মানে টাইপ সেফটি ত্যাগ করা।
- **`unknown`** ব্যবহার করা মানে টাইপ সেফটি বজায় রেখে unpredictable ডাটা হ্যান্ডেল করা।
- **Type Narrowing** হলো আপনার কোডকে নিরাপদ এবং সুনির্দিষ্ট করার চাবিকাঠি।

আজই `any` ব্যবহার বন্ধ করুন এবং `unknown` ও টাইপ ন্যারোয়িং গ্রহণ করে আপনার TypeScript কোডকে আরও শক্তিশালী করুন।
