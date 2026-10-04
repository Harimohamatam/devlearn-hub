import { Lesson } from '../types';
import { SUBJECT_LESSONS } from './subjectLessonsData';

const BASE_LESSONS: Lesson[] = [
  // ===== JAVASCRIPT LESSONS =====
  {
    id: 'js-lesson-1',
    languageId: 'javascript',
    title: '1. Introduction to JavaScript',
    description: 'Learn what JavaScript is, its history, and its role in web development.',
    content: `JavaScript is a versatile, dynamically-typed programming language that powers interactive experiences on the web. Created in 1995 by Brendan Eich at Netscape, JavaScript has evolved to become one of the most widely-used programming languages globally.

Key Facts:
- Runs in all web browsers without any plugins
- Can be used for both client-side (frontend) and server-side (backend) development
- Supports multiple programming paradigms: functional, object-oriented, and event-driven
- Asynchronous by nature, perfect for handling I/O operations

JavaScript Powers:
- Interactive websites and web applications (React, Vue, Angular)
- Server-side applications (Node.js, Express)
- Mobile apps (React Native)
- Desktop applications (Electron)
- Game development (Three.js, Babylon.js)

Why Learn JavaScript?
- Universal language for web development
- High job demand and great career opportunities
- Active, supportive community with tons of resources
- Quick to learn and immediate visual feedback`,
    codeExamples: [
      "console.log('Hello, JavaScript!');",
      "const greeting = name => `Hello, ${name}!`;"
    ],
    order: 1,
    difficulty: 'Beginner'
  },
  {
    id: 'js-lesson-2',
    languageId: 'javascript',
    title: '2. Setting Up Your Environment',
    description: 'Set up JavaScript development tools and write your first program.',
    content: `Getting Started with JavaScript:

1. Browser Console
The fastest way to try JavaScript is using your browser's developer console:
- Right-click any webpage → Inspect → Console tab
- Type JavaScript code directly and press Enter
- Great for quick experimentation

2. Text Editor
Popular choices:
- Visual Studio Code (recommended)
- Sublime Text
- Atom
- WebStorm (paid)

3. Node.js
For server-side development:
- Download from nodejs.org
- Allows running JavaScript outside the browser
- Comes with npm (Node Package Manager)

4. Your First Program
Create a file called hello.js:
console.log('Hello, World!');

Run it:
node hello.js

Environment Setup Checklist:
□ Install a code editor
□ Download Node.js
□ Open terminal/command prompt
□ Navigate to your project folder
□ Create JavaScript files with .js extension`,
    codeExamples: [
      "// In browser console\nconst name = 'Alice';\nconsole.log(name);",
      "// hello.js\nconst greeting = 'Welcome to JavaScript!';\nconsole.log(greeting);"
    ],
    order: 2,
    difficulty: 'Beginner'
  },
  {
    id: 'js-lesson-3',
    languageId: 'javascript',
    title: '3. Variables and Data Types',
    description: 'Master variables and the fundamental data types in JavaScript.',
    content: `Variables are containers for storing data. JavaScript has three ways to declare variables:

1. var (old, avoid in modern code)
var x = 10; // function-scoped

2. let (modern, recommended)
let y = 20; // block-scoped, reassignable

3. const (modern, recommended)
const z = 30; // block-scoped, cannot be reassigned

Best Practice: Use const by default, let when you need to reassign.

Primitive Data Types:

1. Number
const age = 25;
const price = 19.99;
const infinite = Infinity;
const notANumber = NaN;

2. String
const name = 'Alice';
const message = "Hello, World!";
const template = \`Name: \${name}\`; // Template literal

3. Boolean
const isStudent = true;
const isRaining = false;

4. Null and Undefined
const empty = null; // intentionally empty
let uninitialized; // undefined by default

5. Symbol (advanced)
const uniqueId = Symbol('id');

Type Checking:
typeof 42 // 'number'
typeof 'hello' // 'string'
typeof true // 'boolean'
typeof undefined // 'undefined'`,
    codeExamples: [
      "const name = 'Alice';\nlet age = 25;\nconst isStudent = true;\nconsole.log(typeof name); // 'string'",
      "const greeting = \`Hello, \${name}! You are \${age} years old.\`;\nconsole.log(greeting);"
    ],
    order: 3,
    difficulty: 'Beginner'
  },
  {
    id: 'js-lesson-4',
    languageId: 'javascript',
    title: '4. Operators and Expressions',
    description: 'Learn arithmetic, logical, and comparison operators in JavaScript.',
    content: `Operators allow you to perform operations on values.

Arithmetic Operators:
const a = 10;
const b = 3;
console.log(a + b); // 13 (addition)
console.log(a - b); // 7 (subtraction)
console.log(a * b); // 30 (multiplication)
console.log(a / b); // 3.333... (division)
console.log(a % b); // 1 (modulo - remainder)
console.log(a ** 2); // 100 (exponentiation)

Comparison Operators:
console.log(5 == '5'); // true (loose equality)
console.log(5 === '5'); // false (strict equality)
console.log(5 != '5'); // false
console.log(5 !== '5'); // true (strict inequality)
console.log(10 > 5); // true
console.log(10 < 5); // false
console.log(10 >= 5); // true
console.log(10 <= 5); // false

Logical Operators:
const isStudent = true;
const hasLicense = false;
console.log(isStudent && hasLicense); // false (AND)
console.log(isStudent || hasLicense); // true (OR)
console.log(!isStudent); // false (NOT)

Assignment Operators:
let x = 10;
x += 5; // x = x + 5 = 15
x -= 3; // x = x - 3 = 12
x *= 2; // x = x * 2 = 24
x /= 4; // x = x / 4 = 6

String Concatenation:
const first = 'Hello';
const second = 'World';
const result = first + ' ' + second; // 'Hello World'
const result2 = \`\${first} \${second}\`; // Template literal (better)

Operator Precedence:
1. Parentheses ()
2. Exponentiation **
3. Multiplication, Division, Modulo *, /, %
4. Addition, Subtraction +, -
5. Comparison <, >, <=, >=
6. Equality ==, ===, !=, !==
7. Logical AND &&
8. Logical OR ||`,
    codeExamples: [
      "const x = 10, y = 5;\nconsole.log(x + y); // 15\nconsole.log(x > y); // true\nconsole.log(x === y); // false",
      "let score = 85;\nscore += 10; // score = 95\nconst isPassed = score >= 60;\nconsole.log(isPassed); // true"
    ],
    order: 4,
    difficulty: 'Beginner'
  },
  {
    id: 'js-lesson-5',
    languageId: 'javascript',
    title: '5. Conditional Statements',
    description: 'Control program flow with if, else if, else, and switch statements.',
    content: `Conditional statements allow you to execute different code based on conditions.

If Statement:
const age = 18;
if (age >= 18) {
  console.log('You are an adult');
}

If-Else Statement:
if (age >= 18) {
  console.log('You are an adult');
} else {
  console.log('You are a minor');
}

If-Else If-Else Chain:
const score = 85;
if (score >= 90) {
  console.log('Grade: A');
} else if (score >= 80) {
  console.log('Grade: B');
} else if (score >= 70) {
  console.log('Grade: C');
} else {
  console.log('Grade: F');
}

Switch Statement:
const day = 3;
switch (day) {
  case 1:
    console.log('Monday');
    break;
  case 2:
    console.log('Tuesday');
    break;
  case 3:
    console.log('Wednesday');
    break;
  default:
    console.log('Unknown day');
}

Ternary Operator:
const age = 20;
const status = age >= 18 ? 'Adult' : 'Minor';
console.log(status); // 'Adult'

Nested Conditions:
const age = 25;
const hasLicense = true;
if (age >= 18) {
  if (hasLicense) {
    console.log('You can drive');
  } else {
    console.log('Get a driving license');
  }
} else {
  console.log('You are too young to drive');
}

Truthiness and Falsiness:
Falsy values: false, 0, '', null, undefined, NaN
Truthy values: everything else

if (0) console.log('Never runs');
if (1) console.log('Always runs');
if ('') console.log('Never runs');
if ('hello') console.log('Always runs');`,
    codeExamples: [
      "const score = 75;\nif (score >= 90) {\n  console.log('A');\n} else if (score >= 80) {\n  console.log('B');\n} else {\n  console.log('C');\n}",
      "const hasParent = true;\nconst message = hasParent ? 'Permission granted' : 'Permission denied';\nconsole.log(message);"
    ],
    order: 5,
    difficulty: 'Beginner'
  },
  {
    id: 'js-lesson-6',
    languageId: 'javascript',
    title: '6. Loops',
    description: 'Repeat code using for, while, do-while, and for-in loops.',
    content: `Loops allow you to repeat code multiple times.

For Loop:
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

While Loop:
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}

Do-While Loop:
let j = 0;
do {
  console.log(j);
  j++;
} while (j < 5);
// Executes at least once

For-In Loop (for objects):
const person = { name: 'Alice', age: 25, city: 'NYC' };
for (let key in person) {
  console.log(\`\${key}: \${person[key]}\`);
}

For-Of Loop (for arrays):
const numbers = [10, 20, 30];
for (let num of numbers) {
  console.log(num);
}

Break and Continue:
// Break exits the loop
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
  console.log(i); // 0, 1, 2, 3, 4
}

// Continue skips to next iteration
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log(i); // 0, 1, 3, 4
}

Nested Loops:
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(\`\${i} x \${j} = \${i * j}\`);
  }
}

Array forEach Method:
const colors = ['red', 'green', 'blue'];
colors.forEach((color, index) => {
  console.log(\`\${index}: \${color}\`);
});

Tip: Use forEach for arrays, for-in for objects, for-of for iterables.`,
    codeExamples: [
      "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}",
      "const fruits = ['apple', 'banana', 'orange'];\nfruits.forEach(fruit => console.log(fruit));"
    ],
    order: 6,
    difficulty: 'Beginner'
  },
  {
    id: 'js-lesson-7',
    languageId: 'javascript',
    title: '7. Functions',
    description: 'Create reusable code blocks with functions and understand scope.',
    content: `Functions are reusable blocks of code that perform specific tasks.

Function Declaration:
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet('Alice')); // 'Hello, Alice!'

Function Expression:
const add = function(a, b) {
  return a + b;
};
console.log(add(5, 3)); // 8

Arrow Function (modern):
const multiply = (a, b) => a * b;
console.log(multiply(4, 5)); // 20

// Multi-line arrow function
const calculateGrade = (score) => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  return 'C';
};

Default Parameters:
function welcome(name = 'Guest') {
  console.log(\`Welcome, \${name}!\`);
}
welcome(); // 'Welcome, Guest!'
welcome('Alice'); // 'Welcome, Alice!'

Rest Parameters:
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

Scope:
Global Scope:
const global = 'I am global';

Function Scope:
function test() {
  const local = 'I am local';
  console.log(global); // Can access global
}
// console.log(local); // Error: local not defined

Block Scope (let, const):
if (true) {
  const blockVar = 'I am block-scoped';
}
// console.log(blockVar); // Error

Hoisting:
console.log(x); // undefined (hoisted but not initialized)
var x = 10;

console.log(y); // Error: Cannot access 'y' before initialization
let y = 20;

Closures:
function outer() {
  const message = 'Hello';
  return function inner() {
    return \`\${message}, World!\`;
  };
}
const myClosure = outer();
console.log(myClosure()); // 'Hello, World!'

Higher-Order Functions:
// Functions that take or return functions
function repeat(fn, times) {
  for (let i = 0; i < times; i++) {
    fn();
  }
}
repeat(() => console.log('Hi'), 3);`,
    codeExamples: [
      "const square = (x) => x * x;\nconsole.log(square(5)); // 25",
      "function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\nconsole.log(factorial(5)); // 120"
    ],
    order: 7,
    difficulty: 'Beginner'
  },
  {
    id: 'js-lesson-8',
    languageId: 'javascript',
    title: '8. Arrays',
    description: 'Work with arrays and essential array methods.',
    content: `Arrays store multiple values in a single variable.

Creating Arrays:
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, 'hello', true, null];
const empty = [];
const newArray = new Array(5); // Creates array with 5 empty slots

Accessing Elements:
const fruits = ['apple', 'banana', 'orange'];
console.log(fruits[0]); // 'apple'
console.log(fruits.length); // 3

Modifying Arrays:
fruits[1] = 'mango';
fruits.push('grape'); // Add to end
fruits.unshift('pear'); // Add to beginning
fruits.pop(); // Remove from end
fruits.shift(); // Remove from beginning

Array Methods:

Map (transform each element):
const numbers = [1, 2, 3];
const doubled = numbers.map(x => x * 2);
console.log(doubled); // [2, 4, 6]

Filter (keep elements that match condition):
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(x => x % 2 === 0);
console.log(evens); // [2, 4]

Reduce (combine elements into single value):
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, x) => acc + x, 0);
console.log(sum); // 10

Find (get first element matching condition):
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 }
];
const adult = users.find(u => u.age >= 25);
console.log(adult); // { name: 'Alice', age: 25 }

Some and Every:
const numbers = [2, 4, 6, 8];
console.log(numbers.some(x => x > 7)); // true
console.log(numbers.every(x => x > 0)); // true

Join and Split:
const arr = ['apple', 'banana', 'orange'];
console.log(arr.join(', ')); // 'apple, banana, orange'

const text = 'hello,world,javascript';
console.log(text.split(',')); // ['hello', 'world', 'javascript']

Sorting:
const numbers = [5, 2, 8, 1];
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 2, 5, 8]

Spread Operator:
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4]

Destructuring:
const [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3`,
    codeExamples: [
      "const numbers = [1, 2, 3, 4, 5];\nconst sum = numbers.reduce((acc, n) => acc + n, 0);\nconsole.log(sum); // 15",
      "const words = ['hello', 'world'];\nconst uppercased = words.map(w => w.toUpperCase());\nconsole.log(uppercased); // ['HELLO', 'WORLD']"
    ],
    order: 8,
    difficulty: 'Beginner'
  },
  {
    id: 'js-lesson-9',
    languageId: 'javascript',
    title: '9. Objects',
    description: 'Create and work with objects in JavaScript.',
    content: `Objects store data as key-value pairs.

Creating Objects:
const person = {
  name: 'Alice',
  age: 25,
  city: 'NYC',
  greet: function() {
    return \`Hello, I'm \${this.name}\`;
  }
};

Accessing Properties:
console.log(person.name); // 'Alice'
console.log(person['age']); // 25

Adding and Modifying:
person.job = 'Engineer'; // Add new property
person.age = 26; // Modify existing
delete person.city; // Delete property

Object Methods:
Object.keys(person); // ['name', 'age', 'job', 'greet']
Object.values(person); // ['Alice', 26, 'Engineer', Function]
Object.entries(person); // [['name', 'Alice'], ['age', 26], ...]

for (let key in person) {
  console.log(\`\${key}: \${person[key]}\`);
}

Destructuring Objects:
const { name, age } = person;
console.log(name, age); // 'Alice' 26

const { name: personName, age: personAge } = person;

Spread Operator with Objects:
const defaults = { theme: 'dark', language: 'en' };
const user = { ...defaults, language: 'fr' };
console.log(user); // { theme: 'dark', language: 'fr' }

This Keyword:
const person = {
  name: 'Alice',
  greet() {
    console.log(\`Hello, I'm \${this.name}\`);
  }
};
person.greet(); // 'Hello, I'm Alice'

Nested Objects:
const company = {
  name: 'Tech Corp',
  address: {
    street: '123 Main St',
    city: 'NYC'
  }
};
console.log(company.address.city); // 'NYC'

Object Immutability:
const frozen = Object.freeze({ x: 10 });
frozen.x = 20; // No effect
console.log(frozen.x); // 10

const sealed = Object.seal({ x: 10 });
sealed.x = 20; // Allowed
sealed.y = 30; // Not allowed`,
    codeExamples: [
      "const user = { name: 'Alice', age: 25, email: 'alice@example.com' };\nconst { name, email } = user;\nconsole.log(name, email); // 'Alice' 'alice@example.com'",
      "const student = { name: 'Bob', scores: [85, 90, 88] };\nconst avgScore = student.scores.reduce((a, b) => a + b) / student.scores.length;\nconsole.log(avgScore); // 87.67"
    ],
    order: 9,
    difficulty: 'Beginner'
  },
  {
    id: 'js-lesson-10',
    languageId: 'javascript',
    title: '10. Error Handling and Debugging',
    description: 'Handle errors gracefully and debug your JavaScript code.',
    content: `Handling errors is crucial for robust applications.

Try-Catch Block:
try {
  const result = risky Function();
  console.log(result);
} catch (error) {
  console.error('An error occurred:', error.message);
}

Try-Catch-Finally:
try {
  // Some code
  JSON.parse('invalid JSON');
} catch (error) {
  console.error('JSON parse error:', error);
} finally {
  console.log('This always runs');
}

Throwing Errors:
function checkAge(age) {
  if (age < 0) {
    throw new Error('Age cannot be negative');
  }
  return age;
}

try {
  checkAge(-5);
} catch (error) {
  console.error(error.message); // 'Age cannot be negative'
}

Error Types:
- TypeError: typeof x.nonexistent.property
- ReferenceError: undefinedVariable
- SyntaxError: Caught at parse time
- RangeError: Invalid array length
- SyntaxError: Invalid regular expression

Validation:
function validateEmail(email) {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!regex.test(email)) {
    throw new Error('Invalid email format');
  }
  return email;
}

Debugging:
1. Console methods:
console.log('Info:', data);
console.warn('Warning:', data);
console.error('Error:', data);
console.table([{id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}]);
console.assert(condition, 'Error message if false');

2. Browser DevTools:
- Set breakpoints
- Step through code
- Inspect variables
- Watch expressions

3. Debugger statement:
function problematicFunction() {
  debugger; // Pauses here if DevTools open
  // Code continues...
}

4. Stack Trace:
console.trace(); // Shows call stack

Custom Error Class:
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

throw new ValidationError('Invalid input');`,
    codeExamples: [
      "try {\n  JSON.parse('not valid json');\n} catch (error) {\n  console.error('Parse failed:', error.message);\n}",
      "function divide(a, b) {\n  if (b === 0) throw new Error('Cannot divide by zero');\n  return a / b;\n}"
    ],
    order: 10,
    difficulty: 'Intermediate'
  },

  // ===== PYTHON LESSONS =====
  {
    id: 'py-lesson-1',
    languageId: 'python',
    title: '1. Introduction to Python',
    description: 'Discover Python and why it\'s popular for beginners and professionals.',
    content: `Python is a high-level, interpreted programming language known for its clean, readable syntax.

Created in 1991 by Guido van Rossum, Python emphasizes code readability and simplicity.

Why Python?
- Clean, English-like syntax
- Easy for beginners to learn
- Powerful enough for professionals
- Massive ecosystem of libraries
- Widely used in AI, Data Science, and Web Development
- Excellent community support

Applications:
- Data Science & Machine Learning (NumPy, Pandas, TensorFlow)
- Web Development (Django, Flask)
- Automation & Scripts
- Artificial Intelligence
- Scientific Computing
- Game Development (Pygame)

Installing Python:
1. Download from python.org
2. Run the installer
3. Check 'Add Python to PATH' (Windows)
4. Verify installation: python --version

Python Philosophy:
- Beautiful is better than ugly
- Explicit is better than implicit
- Simple is better than complex
- Readability counts

Career Opportunities:
- Data Scientist
- Machine Learning Engineer
- Backend Developer
- Full-Stack Developer
- Python Developer`,
    codeExamples: [
      "print('Hello, Python!')\nprint('Welcome to programming')",
      "name = 'Alice'\nage = 25\nprint(f'My name is {name} and I am {age} years old')"
    ],
    order: 1,
    difficulty: 'Beginner'
  },
  {
    id: 'py-lesson-2',
    languageId: 'python',
    title: '2. Setting Up Your Environment',
    description: 'Install Python and set up your development environment.',
    content: `Setting up Python for Development:

1. Install Python
- Download from https://www.python.org/downloads/
- Select Python 3.9 or higher
- Windows: Run installer, check 'Add Python to PATH'
- macOS: Use Homebrew: brew install python3
- Linux: apt-get install python3

2. Verify Installation
Open terminal/command prompt:
python --version
pip --version

3. Code Editors
- Visual Studio Code (Free, recommended)
- PyCharm (Professional IDE)
- Sublime Text
- Jupyter Notebook (for data science)

4. First Python Program
Create file: hello.py
print('Hello, World!')

Run it:
python hello.py

5. Interactive Shell
python
>>> print('Hello')
>>> 2 + 2
4
>>> exit()

6. Install Packages
pip install numpy
pip install pandas
pip install django

7. Virtual Environments (Best Practice)
python -m venv myenv

Activate:
- Windows: myenv\\Scripts\\activate
- macOS/Linux: source myenv/bin/activate

8. Useful Terminal Commands
cd folder_name        # Change directory
ls                    # List files (macOS/Linux)
dir                   # List files (Windows)
mkdir folder_name     # Create folder
python file.py        # Run Python file`,
    codeExamples: [
      "# hello.py\nprint('Welcome to Python')",
      "# Simple calculation\nx = 10\ny = 20\nprint(f'Sum: {x + y}')"
    ],
    order: 2,
    difficulty: 'Beginner'
  },
  {
    id: 'py-lesson-3',
    languageId: 'python',
    title: '3. Variables and Data Types',
    description: 'Learn Python variables and the fundamental data types.',
    content: `Variables store data in Python.

Variable Assignment:
name = 'Alice'        # String
age = 25              # Integer
height = 5.6          # Float
is_student = True     # Boolean

Python Data Types:

1. Strings
name = 'Alice'
message = "Hello, World!"
multiline = '''This is
a multiline
string'''

String Methods:
name.upper()          # 'ALICE'
name.lower()          # 'alice'
name.capitalize()     # 'Alice'
name.replace('A', 'B')  # 'Blice'
'hello world'.split()  # ['hello', 'world']

2. Numbers
Integer:
age = 25
result = 10 + 5       # 15

Float:
price = 19.99
height = 5.6

3. Booleans
is_active = True
is_empty = False

4. None (absence of value)
value = None

5. Lists (mutable ordered collection)
fruits = ['apple', 'banana', 'orange']
numbers = [1, 2, 3, 4, 5]

6. Tuples (immutable ordered collection)
coordinates = (10, 20)
colors = ('red', 'green', 'blue')

7. Dictionaries (key-value pairs)
person = {'name': 'Alice', 'age': 25, 'city': 'NYC'}

8. Sets (unordered unique values)
unique_nums = {1, 2, 3, 4, 5}

Type Checking:
type(25)              # <class 'int'>
type('hello')         # <class 'str'>
type([1, 2, 3])       # <class 'list'>

Type Conversion:
str(25)               # '25'
int('25')             # 25
float('3.14')         # 3.14
list('hello')         # ['h', 'e', 'l', 'l', 'o']

Variable Naming Rules:
- Must start with letter or underscore
- Can contain letters, numbers, underscores
- Case-sensitive
- Avoid Python keywords (if, for, while, etc.)

Good Names:
student_age, firstName, _privateVar

Avoid:
2name (starts with number), my-var (has dash)`,
    codeExamples: [
      "name = 'Bob'\nage = 30\nprint(f'Name: {name}, Age: {age}')",
      "fruits = ['apple', 'banana', 'orange']\nprint(fruits[0])\nfruits.append('mango')\nprint(fruits)"
    ],
    order: 3,
    difficulty: 'Beginner'
  },
  {
    id: 'py-lesson-4',
    languageId: 'python',
    title: '4. Operators',
    description: 'Master Python operators and mathematical expressions.',
    content: `Python Operators:

Arithmetic Operators:
a = 10
b = 3
print(a + b)          # 13
print(a - b)          # 7
print(a * b)          # 30
print(a / b)          # 3.333...
print(a // b)         # 3 (floor division)
print(a % b)          # 1 (modulo)
print(a ** b)         # 1000 (exponentiation)

Comparison Operators:
print(10 == 10)       # True
print(10 != 5)        # True
print(10 > 5)         # True
print(10 < 5)         # False
print(10 >= 5)        # True
print(10 <= 5)        # False

Logical Operators:
is_student = True
has_license = False
print(is_student and has_license)  # False
print(is_student or has_license)   # True
print(not is_student)              # False

Assignment Operators:
x = 10
x += 5                # x = 15
x -= 3                # x = 12
x *= 2                # x = 24
x /= 4                # x = 6

Identity Operators:
a = [1, 2, 3]
b = [1, 2, 3]
print(a == b)         # True (same content)
print(a is b)         # False (different objects)

c = a
print(a is c)         # True (same object)

Membership Operators:
fruits = ['apple', 'banana', 'orange']
print('apple' in fruits)       # True
print('grape' not in fruits)   # True

Operator Precedence (PEMDAS):
1. Parentheses ()
2. Exponentiation **
3. Multiplication, Division, Modulo *, /, //, %
4. Addition, Subtraction +, -
5. Comparisons <, >, <=, >=, ==, !=
6. Logical NOT not
7. Logical AND and
8. Logical OR or

String Operators:
greeting = 'Hello'
name = 'Alice'
print(greeting + ' ' + name)   # Concatenation

print('Ha' * 3)                # 'HaHaHa'

print('H' in 'Hello')          # True

String Formatting:
name = 'Alice'
age = 25
# f-string (modern)
print(f'{name} is {age} years old')

# format method
print('{} is {} years old'.format(name, age))

# % operator (old)
print('%s is %d years old' % (name, age))`,
    codeExamples: [
      "a = 15\nb = 4\nprint(f'{a} // {b} = {a // b}')\nprint(f'{a} % {b} = {a % b}')",
      "age = 18\nhas_license = True\ncan_drive = age >= 16 and has_license\nprint(f'Can drive: {can_drive}')"
    ],
    order: 4,
    difficulty: 'Beginner'
  },
  {
    id: 'py-lesson-5',
    languageId: 'python',
    title: '5. Conditional Statements',
    description: 'Control program flow with if, elif, and else statements.',
    content: `Conditional statements execute different code based on conditions.

If Statement:
age = 18
if age >= 18:
    print('You are an adult')

If-Else:
if age >= 18:
    print('Adult')
else:
    print('Minor')

If-Elif-Else:
score = 85
if score >= 90:
    print('Grade A')
elif score >= 80:
    print('Grade B')
elif score >= 70:
    print('Grade C')
else:
    print('Grade F')

Nested Conditions:
age = 25
has_license = True
if age >= 18:
    if has_license:
        print('You can drive')
    else:
        print('Get a license')
else:
    print('Too young')

Ternary Operator:
status = 'Adult' if age >= 18 else 'Minor'
print(status)

Logical Operators in Conditions:
if age >= 18 and has_license:
    print('Can drive')

if age < 18 or parent_permission:
    print('Approved')

Multiple Conditions:
if 0 < age < 120:
    print('Valid age')

Truthiness:
Falsy values: False, 0, 0.0, '', [], {}, None
Truthy values: everything else

if []:           # False (empty list)
    print('Never runs')

if [1, 2, 3]:    # True (non-empty list)
    print('Always runs')

Checking for None:
value = None
if value is None:
    print('Value is None')

if value is not None:
    print('Value exists')

Match Statement (Python 3.10+):
day = 'Monday'
match day:
    case 'Monday':
        print('Start of week')
    case 'Friday':
        print('End of week')
    case _:
        print('Midweek')`,
    codeExamples: [
      "score = 78\nif score >= 90:\n    grade = 'A'\nelif score >= 80:\n    grade = 'B'\nelif score >= 70:\n    grade = 'C'\nelse:\n    grade = 'F'\nprint(f'Grade: {grade}')",
      "age = 25\nstatus = 'Can vote' if age >= 18 else 'Too young'\nprint(status)"
    ],
    order: 5,
    difficulty: 'Beginner'
  },
  {
    id: 'py-lesson-6',
    languageId: 'python',
    title: '6. Loops',
    description: 'Repeat code with for and while loops.',
    content: `Loops repeat code multiple times.

For Loop:
for i in range(5):
    print(i)          # 0, 1, 2, 3, 4

Looping Over Lists:
fruits = ['apple', 'banana', 'orange']
for fruit in fruits:
    print(fruit)

With Index:
for index, fruit in enumerate(fruits):
    print(f'{index}: {fruit}')

While Loop:
count = 0
while count < 5:
    print(count)
    count += 1

Break Statement:
for i in range(10):
    if i == 5:
        break
    print(i)          # 0, 1, 2, 3, 4

Continue Statement:
for i in range(5):
    if i == 2:
        continue
    print(i)          # 0, 1, 3, 4

Else with Loops:
for i in range(5):
    print(i)
else:
    print('Loop completed')  # Runs after loop

for i in range(5):
    if i == 0:
        break
else:
    print('Not printed if broken')

Nested Loops:
for i in range(3):
    for j in range(3):
        print(f'({i}, {j})')

Range Function:
range(5)              # 0, 1, 2, 3, 4
range(1, 6)           # 1, 2, 3, 4, 5
range(0, 10, 2)       # 0, 2, 4, 6, 8

Looping Over Dictionaries:
person = {'name': 'Alice', 'age': 25, 'city': 'NYC'}
for key in person:
    print(f'{key}: {person[key]}')

for key, value in person.items():
    print(f'{key}: {value}')

List Comprehension:
squares = [x**2 for x in range(5)]
print(squares)        # [0, 1, 4, 9, 16]

evens = [x for x in range(10) if x % 2 == 0]
print(evens)          # [0, 2, 4, 6, 8]

Dictionary Comprehension:
squares_dict = {x: x**2 for x in range(5)}
print(squares_dict)   # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

Set Comprehension:
unique = {x % 3 for x in range(10)}
print(unique)         # {0, 1, 2}

Generator Expression:
gen = (x**2 for x in range(5))
for val in gen:
    print(val)        # 0, 1, 4, 9, 16`,
    codeExamples: [
      "numbers = [1, 2, 3, 4, 5]\nfor num in numbers:\n    print(num * 2)",
      "for i in range(1, 6):\n    print(f'{i} * 2 = {i * 2}')"
    ],
    order: 6,
    difficulty: 'Beginner'
  },
  {
    id: 'py-lesson-7',
    languageId: 'python',
    title: '7. Functions',
    description: 'Create reusable functions and understand Python scope.',
    content: `Functions are reusable blocks of code.

Basic Function:
def greet():
    print('Hello!')

greet()

Function with Parameters:
def greet(name):
    print(f'Hello, {name}!')

greet('Alice')

Function with Return Value:
def add(a, b):
    return a + b

result = add(5, 3)
print(result)         # 8

Default Parameters:
def welcome(name='Guest'):
    print(f'Welcome, {name}!')

welcome()             # Welcome, Guest!
welcome('Alice')      # Welcome, Alice!

Multiple Return Values:
def get_name_and_age():
    return 'Alice', 25

name, age = get_name_and_age()

Variable-Length Arguments (*args):
def sum_all(*numbers):
    total = 0
    for num in numbers:
        total += num
    return total

print(sum_all(1, 2, 3, 4, 5))  # 15

Keyword Arguments (**kwargs):
def print_info(**info):
    for key, value in info.items():
        print(f'{key}: {value}')

print_info(name='Alice', age=25, city='NYC')

Combining Arguments:
def function(a, b, *args, **kwargs):
    print(a, b)
    print(args)
    print(kwargs)

Type Hints (Python 3.5+):
def add(a: int, b: int) -> int:
    return a + b

Docstrings:
def calculate_area(radius):
    '''Calculate circle area given radius'''
    import math
    return math.pi * radius**2

print(calculate_area.__doc__)

Scope:
x = 'global'

def test():
    y = 'local'
    print(x)          # Can access global
    print(y)

# print(y)           # Error: y not defined

Global Keyword:
x = 10

def change_global():
    global x
    x = 20

change_global()
print(x)              # 20

Nonlocal Keyword:
def outer():
    x = 10
    def inner():
        nonlocal x
        x = 20
    inner()
    print(x)          # 20

outer()

Lambda Functions:
square = lambda x: x**2
print(square(5))      # 25

multiply = lambda x, y: x * y
print(multiply(3, 4))  # 12

Higher-Order Functions:
def repeat_function(func, times):
    for _ in range(times):
        func()

def say_hello():
    print('Hello!')

repeat_function(say_hello, 3)

Decorators:
def my_decorator(func):
    def wrapper():
        print('Before')
        func()
        print('After')
    return wrapper

@my_decorator
def say_something():
    print('Something')

say_something()`,
    codeExamples: [
      "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))  # 120",
      "def average(*scores):\n    return sum(scores) / len(scores) if scores else 0\n\nprint(average(85, 90, 88, 92))  # 88.75"
    ],
    order: 7,
    difficulty: 'Beginner'
  },
  {
    id: 'py-lesson-8',
    languageId: 'python',
    title: '8. Lists and Collections',
    description: 'Master Python lists, tuples, sets, and dictionaries.',
    content: `Python collections store multiple values efficiently.

Lists (Mutable):
numbers = [1, 2, 3, 4, 5]
mixed = [1, 'hello', 3.14, True, None]
empty = []
nested = [[1, 2], [3, 4], [5, 6]]

List Operations:
fruits = ['apple', 'banana', 'orange']
print(fruits[0])       # 'apple'
print(fruits[-1])      # 'orange'
print(len(fruits))     # 3

List Methods:
fruits.append('mango')
fruits.extend(['grape', 'pear'])
fruits.insert(1, 'blueberry')
fruits.remove('apple')
fruits.pop()           # Remove last
fruits.pop(0)          # Remove first
fruits.sort()
fruits.reverse()
fruits.clear()

List Slicing:
numbers = [0, 1, 2, 3, 4, 5]
print(numbers[2:4])    # [2, 3]
print(numbers[:3])     # [0, 1, 2]
print(numbers[3:])     # [3, 4, 5]
print(numbers[::2])    # [0, 2, 4]
print(numbers[::-1])   # [5, 4, 3, 2, 1, 0]

Tuples (Immutable):
coordinates = (10, 20)
colors = ('red', 'green', 'blue')
single = (42,)         # Note the comma

# Cannot modify
# coordinates[0] = 15  # Error

Unpacking:
x, y = (10, 20)
a, b, c = [1, 2, 3]

Sets (Unique values):
unique = {1, 2, 3, 4, 5}
letters = {'a', 'b', 'c'}
empty_set = set()      # Note: {} creates dict

Set Operations:
s1 = {1, 2, 3}
s2 = {3, 4, 5}
print(s1 | s2)         # Union: {1, 2, 3, 4, 5}
print(s1 & s2)         # Intersection: {3}
print(s1 - s2)         # Difference: {1, 2}

Dictionaries (Key-value pairs):
person = {
    'name': 'Alice',
    'age': 25,
    'city': 'NYC'
}

person['job'] = 'Engineer'
print(person['name'])

del person['city']

Dictionary Methods:
person.keys()          # dict_keys(['name', 'age', 'job'])
person.values()        # dict_values(['Alice', 25, 'Engineer'])
person.items()         # dict_items([...])
person.get('age')      # 25
person.get('phone', 'N/A')  # 'N/A' (default)

Nested Collections:
students = [
    {'name': 'Alice', 'scores': [85, 90, 88]},
    {'name': 'Bob', 'scores': [92, 88, 95]}
]

print(students[0]['scores'][1])  # 90

List Comprehensions:
squares = [x**2 for x in range(5)]
evens = [x for x in range(10) if x % 2 == 0]
pairs = [(x, y) for x in range(3) for y in range(3)]`,
    codeExamples: [
      "fruits = ['apple', 'banana', 'orange']\nfruits.sort()\nprint(fruits)  # ['apple', 'banana', 'orange']",
      "person = {'name': 'Bob', 'age': 30, 'city': 'LA'}\nfor key, value in person.items():\n    print(f'{key}: {value}')"
    ],
    order: 8,
    difficulty: 'Beginner'
  },
  {
    id: 'py-lesson-9',
    languageId: 'python',
    title: '9. Object-Oriented Programming',
    description: 'Create classes and work with objects in Python.',
    content: `OOP allows organizing code into reusable objects.

Classes and Objects:
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f'Hello, I am {self.name}'

alice = Person('Alice', 25)
print(alice.greet())

Class Variables:
class Car:
    wheels = 4  # Class variable
    
    def __init__(self, brand):
        self.brand = brand  # Instance variable

Inheritance:
class Animal:
    def speak(self):
        return 'Some sound'

class Dog(Animal):
    def speak(self):
        return 'Woof!'

dog = Dog()
print(dog.speak())  # 'Woof!'

Polymorphism:
animals = [Dog(), Cat(), Bird()]
for animal in animals:
    print(animal.speak())

Encapsulation:
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance  # Private
    
    def deposit(self, amount):
        self.__balance += amount
    
    def get_balance(self):
        return self.__balance

Special Methods:
class Person:
    def __init__(self, name):
        self.name = name
    
    def __str__(self):
        return f'Person: {self.name}'
    
    def __repr__(self):
        return f'Person({self.name!r})'
    
    def __len__(self):
        return len(self.name)

Static and Class Methods:
class MathHelper:
    @staticmethod
    def add(a, b):
        return a + b
    
    @classmethod
    def from_string(cls, string):
        # Alternative constructor
        return cls(int(string))

Properties:
class Circle:
    def __init__(self, radius):
        self._radius = radius
    
    @property
    def area(self):
        import math
        return math.pi * self._radius**2
    
    @radius.setter
    def radius(self, value):
        if value <= 0:
            raise ValueError('Radius must be positive')
        self._radius = value

Dunder Methods:
__init__: Constructor
__str__: String representation
__repr__: Developer representation
__len__: len() function
__getitem__: Indexing
__setitem__: Assignment
__delitem__: Deletion
__add__: + operator
__eq__: == operator

Abstract Base Classes:
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Square(Shape):
    def __init__(self, side):
        self.side = side
    
    def area(self):
        return self.side ** 2`,
    codeExamples: [
      "class Student:\n    def __init__(self, name, grade):\n        self.name = name\n        self.grade = grade\n\nstudent = Student('Alice', 'A')\nprint(f'{student.name} got {student.grade}')",
      "class Calculator:\n    @staticmethod\n    def multiply(a, b):\n        return a * b\n\nresult = Calculator.multiply(5, 3)\nprint(result)  # 15"
    ],
    order: 9,
    difficulty: 'Intermediate'
  },
  {
    id: 'py-lesson-10',
    languageId: 'python',
    title: '10. Error Handling',
    description: 'Handle exceptions and create robust Python programs.',
    content: `Exception handling makes programs more robust.

Try-Except:
try:
    result = 10 / 0
except ZeroDivisionError:
    print('Cannot divide by zero')

Multiple Except Blocks:
try:
    value = int('abc')
except ValueError:
    print('Invalid number')
except TypeError:
    print('Type error')

Try-Except-Else:
try:
    result = 10 / 2
except ZeroDivisionError:
    print('Error')
else:
    print(f'Result: {result}')

Try-Except-Finally:
try:
    file = open('data.txt')
    data = file.read()
except FileNotFoundError:
    print('File not found')
finally:
    file.close()  # Always runs

Raising Exceptions:
def check_age(age):
    if age < 0:
        raise ValueError('Age cannot be negative')
    return age

try:
    check_age(-5)
except ValueError as e:
    print(e)  # 'Age cannot be negative'

Custom Exceptions:
class InvalidEmailError(Exception):
    pass

def validate_email(email):
    if '@' not in email:
        raise InvalidEmailError('Invalid email')
    return email

Common Exceptions:
- ValueError: Wrong value
- TypeError: Wrong type
- KeyError: Missing dictionary key
- IndexError: Out of range index
- FileNotFoundError: File doesn't exist
- ZeroDivisionError: Division by zero
- AttributeError: Attribute doesn't exist

Catching All Exceptions (use carefully):
try:
    # code
except Exception as e:
    print(f'Error: {e}')

Else and Finally Together:
try:
    value = int(input('Enter a number: '))
except ValueError:
    print('Invalid input')
else:
    print(f'Square: {value**2}')
finally:
    print('Program finished')

Assertions:
def divide(a, b):
    assert b != 0, 'Divisor cannot be zero'
    return a / b

With Statement (Context Manager):
with open('file.txt', 'r') as file:
    content = file.read()
# File automatically closed

Traceback:
import traceback

try:
    risky_function()
except Exception as e:
    traceback.print_exc()
    # Shows full error path`,
    codeExamples: [
      "try:\n    age = int(input('Age: '))\nexcept ValueError:\n    print('Please enter a valid number')",
      "try:\n    result = 20 / 4\nexcept ZeroDivisionError:\n    print('Cannot divide by zero')\nelse:\n    print(f'Result: {result}')"
    ],
    order: 10,
    difficulty: 'Intermediate'
  },

  // ===== RUST LESSONS =====
  {
    id: 'rust-lesson-1',
    languageId: 'rust',
    title: '1. Introduction to Rust',
    description: 'Learn why Rust is the future of systems programming.',
    content: `Rust is a modern systems programming language focused on three goals:
- Safety: Memory safety without garbage collection
- Speed: Performance comparable to C and C++
- Concurrency: Safe concurrent programming

Created in 2010 by Graydon Hoare and maintained by Mozilla.

Why Rust?
- Memory safe: Eliminates entire classes of bugs
- Fast: Zero-cost abstractions
- Prevents data races at compile time
- Excellent error messages
- Growing ecosystem

Use Cases:
- Operating systems
- Embedded systems
- WebAssembly
- Blockchain
- Game engines
- Command-line tools
- Microservices

Key Features:
1. Ownership system: Unique control over memory
2. Borrowing: Temporary access without ownership
3. Pattern matching: Powerful control flow
4. Traits: Interface definitions
5. Lifetimes: Explicit reference validity

Cargo: Rust Package Manager
- Create projects: cargo new project_name
- Build: cargo build
- Run: cargo run
- Test: cargo test

Installation:
Visit https://rustup.rs/
Copy and run the installation script
Verify: rustc --version

Why the Name?
Rust is a fungus that slowly consumes iron, perfect for a safe
programming language that prevents common errors.`,
    codeExamples: [
      "fn main() {\n    println!(\"Hello, Rust!\");\n}",
      "fn main() {\n    let name = \"Alice\";\n    println!(\"Hello, {}!\", name);\n}"
    ],
    order: 1,
    difficulty: 'Beginner'
  },
  {
    id: 'rust-lesson-2',
    languageId: 'rust',
    title: '2. Variables and Immutability',
    description: 'Understand Rust\'s approach to variables and mutability.',
    content: `In Rust, variables are immutable by default.

Immutable Variables:
let x = 5;
// x = 10;  // Error: cannot assign to immutable variable

Mutable Variables:
let mut x = 5;
x = 10;  // OK
println!("{}", x);  // 10

Constants:
const MAX_POINTS: u32 = 100_000;
// Constants are always immutable
// Must have explicit type
// Evaluated at compile time

Shadowing:
let x = 5;
let x = x + 1;  // Different variable, same name
let x = x * 2;
println!("{}", x);  // 12

Data Types:

Integers:
let x: i8 = -128;      // 8-bit signed
let x: u8 = 255;       // 8-bit unsigned
let x: i32 = -2147483648;
let x: u32 = 4294967295;
let x: i64 = -9223372036854775808;
let x: u64 = 18446744073709551615;
let x: isize = -1000;  // Architecture-dependent
let x: usize = 1000;   // Architecture-dependent

Floats:
let x: f32 = 3.14;
let y: f64 = 3.14159;  // Default float type

Booleans:
let flag: bool = true;
let result = 5 > 3;    // true

Characters:
let ch: char = 'A';
let emoji: char = '😊';

Numeric Operations:
let sum = 5 + 6;
let difference = 95.5 - 4.3;
let product = 4 * 30;
let quotient = 56.7 / 32.2;
let modulo = 43 % 5;

Type Inference:
let x = 5;           // i32 by default
let y = 5.0;         // f64 by default
let z = 5u8;         // u8 explicitly

Parsing Strings:
let num_string = "42";
let num: i32 = num_string.parse().unwrap();

Overflow in Debug/Release:
// Debug: panics on overflow
// Release: wraps around (undefined behavior)
// Use checked_add for safety:
let result = 5u8.checked_add(250);

Variable Scope:
{
    let x = 5;
    println!("{}", x);  // 5
}
// println!("{}", x);  // Error: x not in scope`,
    codeExamples: [
      "let mut count = 0;\ncount += 1;\ncount += 1;\nprintln!(\"Count: {}\", count);  // 2",
      "let x = 5;\nlet x = x + 1;\nlet x = x * 2;\nprintln!(\"x = {}\", x);  // 12"
    ],
    order: 2,
    difficulty: 'Beginner'
  },
  {
    id: 'rust-lesson-3',
    languageId: 'rust',
    title: '3. Ownership and Borrowing',
    description: 'Master Rust\'s unique ownership system.',
    content: `Ownership is Rust's most distinctive feature.

Ownership Rules:
1. Each value has one owner
2. When owner is dropped, value is freed
3. Owner can transfer ownership (move)

Example:
let s1 = String::from("hello");
let s2 = s1;          // s1 moved to s2
// println!("{}", s1);  // Error: s1 no longer owns value

Copy Trait:
let x = 5;
let y = x;            // x is copied (Copy trait)
println!("{}", x);    // OK: x still valid

Borrowing (References):
let s1 = String::from("hello");
let s2 = &s1;         // Borrow s1
let s3 = &s1;         // Borrow again (multiple immutable borrows)
println!("{}", s1);   // OK: s1 still valid

Immutable Borrow:
fn print_string(s: &String) {
    println!("{}", s);
}

let s1 = String::from("hello");
print_string(&s1);
print_string(&s1);
println!("{}", s1);  // OK

Mutable Borrow:
fn append_string(s: &mut String) {
    s.push_str(" world");
}

let mut s = String::from("hello");
append_string(&mut s);
println!("{}", s);  // hello world

Borrow Rules:
- Either multiple immutable borrows OR
- Exactly one mutable borrow

This Rust compiler check prevents:
let mut s = String::from("hello");
let r1 = &s;         // Immutable borrow
let r2 = &s;         // Immutable borrow
// let r3 = &mut s;   // Error: can't mutably borrow while immutable borrows exist
println!("{}, {}", r1, r2);

Slices:
let s = String::from("hello world");
let hello = &s[0..5];    // "hello"
let world = &s[6..11];   // "world"
let all = &s[..];        // Whole string

Dangling References (Compiler Error):
fn dangle() -> &String {
    let s = String::from("hello");
    &s  // Error: s is freed after function returns
}

Correct:
fn no_dangle() -> String {
    let s = String::from("hello");
    s    // Return ownership
}

String Slices:
fn first_word(s: &String) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[..i];
        }
    }
    &s[..]
}`,
    codeExamples: [
      "let mut s = String::from(\"hello\");\nlet r = &mut s;\nr.push_str(\" world\");\nprintln!(\"{}\", s);  // hello world",
      "fn borrow(s: &String) {\n    println!(\"borrowed: {}\", s);\n}\n\nlet s = String::from(\"Rust\");\nborrow(&s);\nborrow(&s);  // Multiple borrows OK"
    ],
    order: 3,
    difficulty: 'Beginner'
  },
  {
    id: 'rust-lesson-4',
    languageId: 'rust',
    title: '4. Structs and Enums',
    description: 'Create custom data types with structs and enums.',
    content: `Structs and Enums allow creating custom data types.

Struct Definition:
struct User {
    username: String,
    email: String,
    age: u32,
    active: bool,
}

Creating Instances:
let user1 = User {
    username: String::from("alice"),
    email: String::from("alice@example.com"),
    age: 25,
    active: true,
};

Accessing Fields:
println!("{}", user1.email);
println!("{}", user1.age);

Struct Methods:
impl User {
    fn new(username: String, email: String) -> User {
        User {
            username,
            email,
            age: 0,
            active: true,
        }
    }
    
    fn is_adult(&self) -> bool {
        self.age >= 18
    }
}

Tuple Structs:
struct Point(i32, i32, i32);
let origin = Point(0, 0, 0);
println!("{}", origin.0);  // 0

Unit Structs:
struct Marker;

Enums:
enum IpAddrKind {
    V4,
    V6,
}

let ipv4 = IpAddrKind::V4;
let ipv6 = IpAddrKind::V6;

Enums with Data:
enum IpAddr {
    V4(u8, u8, u8, u8),
    V6(String),
}

let home = IpAddr::V4(127, 0, 0, 1);
let loopback = IpAddr::V6(String::from("::1"));

Option Enum (built-in):
enum Option<T> {
    Some(T),
    None,
}

let some_number = Some(5);
let some_string = Some("hello");
let absent_number: Option<i32> = None;

Result Enum (built-in):
enum Result<T, E> {
    Ok(T),
    Err(E),
}

fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("Division by zero"))
    } else {
        Ok(a / b)
    }
}

Pattern Matching:
let result = divide(10.0, 2.0);
match result {
    Ok(value) => println!("Result: {}", value),
    Err(error) => println!("Error: {}", error),
}

Generic Structs:
struct Point<T> {
    x: T,
    y: T,
}

let int_point = Point { x: 5, y: 10 };
let float_point = Point { x: 1.0, y: 4.0 };`,
    codeExamples: [
      "struct Person {\n    name: String,\n    age: u32,\n}\n\nlet person = Person {\n    name: String::from(\"Alice\"),\n    age: 25,\n};",
      "enum Message {\n    Quit,\n    Move { x: i32, y: i32 },\n    Write(String),\n    ChangeColor(i32, i32, i32),\n}"
    ],
    order: 4,
    difficulty: 'Beginner'
  }
];

/* =========================================================
   DEVLEARN LEARNING SYSTEM

   Every lesson is placed into one of three volumes and receives
   structured, ChatGPT-style teaching metadata while preserving
   the original lesson content and code examples.
   ========================================================= */

const getLessonVolume = (order: number): Lesson['volume'] => {
  if (order <= 4) return 'basic';
  if (order <= 7) return 'in-depth';
  return 'core';
};

function buildTeachingContent(lesson: Lesson): Lesson {
  const title = lesson.title.replace(/^\d+\.\s*/, '');
  const lower = title.toLowerCase();
  const language = lesson.languageId;
  const example = lesson.codeExamples?.[0] || '';

  let whyItMatters = `This topic is important because it helps you understand how ${language} programs are built and how developers use ${title.toLowerCase()} in real applications.`;
  let whenToUse = `Use ${title.toLowerCase()} when your program needs the behavior described in this lesson. Start with the simplest approach and add complexity only when the problem requires it.`;
  let realWorldExample = `Imagine a real application where a developer needs to solve the kind of problem covered by ${title.toLowerCase()}. The same idea appears in websites, mobile apps, backend services, automation tools, and other software.`;
  let commonMistakes = [
    'Writing the code without first understanding what problem the feature solves.',
    'Changing several parts of the example at once, making errors difficult to locate.',
    'Ignoring the values and output produced by each step.'
  ];

  if (lower.includes('variable') || lower.includes('data type')) {
    whyItMatters = `Programs need a way to remember information. Variables give your ${language} program named values that can be read, changed, and passed to other parts of the program.`;
    whenToUse = 'Use variables whenever a value needs a meaningful name or needs to be reused later, such as a username, score, price, counter, or API response.';
    realWorldExample = 'A shopping app can store the product price in one variable, the quantity in another, and calculate the total from those values. If the quantity changes, the program can calculate the new total again.';
  } else if (lower.includes('loop')) {
    whyItMatters = 'A loop prevents you from writing the same instructions again and again. Instead, you describe the repeated action once and let the program perform it for each required item.';
    whenToUse = 'Use loops when the same operation must happen for many values, such as displaying products, processing marks, reading records, or repeating a task until a condition changes.';
    realWorldExample = 'An online store may have 100 products. Instead of writing 100 separate display instructions, a loop can visit each product and create its card on the screen.';
  } else if (lower.includes('function')) {
    whyItMatters = 'Functions turn a repeated task into a reusable unit. They make programs easier to read, test, debug, and maintain.';
    whenToUse = 'Use a function when a task has a clear purpose, is repeated, or should be separated from the rest of the program.';
    realWorldExample = 'A login system may have a validatePassword function. The same function can be called from different parts of an application instead of rewriting the validation rules each time.';
  } else if (lower.includes('array') || lower.includes('list') || lower.includes('collection')) {
    whyItMatters = 'Real applications rarely work with only one value. Collections let a program keep related values together and process them efficiently.';
    whenToUse = 'Use a collection when you have multiple related values, such as students, products, messages, scores, or search results.';
    realWorldExample = 'A learning app can keep a list of completed lessons. The program can then display that list, count it, search it, or filter it to show only completed lessons.';
  } else if (lower.includes('object') || lower.includes('class') || lower.includes('oop')) {
    whyItMatters = 'Objects and classes help model real entities and keep related data and behavior together.';
    whenToUse = 'Use objects or classes when a program contains entities with multiple properties and actions, especially in larger applications.';
    realWorldExample = 'A banking application can represent an account with an account number and balance, while methods can deposit money, withdraw money, and check the balance.';
  } else if (lower.includes('condition') || lower.includes('operator')) {
    whyItMatters = 'Programs need to make decisions. Conditions and operators let code compare values and choose what should happen next.';
    whenToUse = 'Use conditions when different inputs should produce different behavior, such as checking login status, age, marks, permissions, or available stock.';
    realWorldExample = 'A website can check whether a user is logged in. If they are authenticated, it shows the dashboard; otherwise, it shows the login screen.';
  } else if (lower.includes('error') || lower.includes('debug')) {
    whyItMatters = 'Errors are normal during development. Proper error handling and debugging help an application fail safely and make problems easier to find.';
    whenToUse = 'Use error handling around operations that can fail, and use debugging tools when the actual program behavior differs from what you expected.';
    realWorldExample = 'If an application cannot reach a server, it can show a useful message instead of crashing or leaving the user staring at a broken screen.';
  } else if (lower.includes('ownership') || lower.includes('borrow')) {
    whyItMatters = 'Rust uses ownership and borrowing to control memory safely at compile time without relying on a garbage collector.';
    whenToUse = 'Use borrowing when you need temporary access to data without taking ownership of it. Use ownership transfer when another part of the program should become responsible for the value.';
    realWorldExample = 'A systems application can pass large data structures between functions without unnecessarily copying them, while Rust checks that references remain valid.';
  } else if (lower.includes('struct') || lower.includes('enum')) {
    whyItMatters = 'Custom data types let you represent the information your application actually works with instead of forcing everything into primitive values.';
    whenToUse = 'Use structs for entities with named fields and enums when a value can represent one of several meaningful states or variants.';
    realWorldExample = 'A network application can represent an IP address as a structured value and represent different message types as enum variants.';
  } else if (lower.includes('introduction')) {
    whyItMatters = `Before writing code, it helps to understand what ${language} is designed to solve, where it runs, and why developers choose it.`;
    whenToUse = `Use this foundation to decide when ${language} is a good fit and to understand the terminology used in later lessons.`;
    realWorldExample = `Think of ${language} as a tool in a developer's toolbox. Different languages are chosen for different jobs, and this lesson explains the kind of work ${language} is commonly used for.`;
  }

  const sections = lesson.sections?.length
    ? lesson.sections
    : [
        {
          id: `${lesson.id}-understand`,
          title: 'Understand the idea',
          content: lesson.content
        },
        {
          id: `${lesson.id}-example`,
          title: 'See it in code',
          content: 'Read the example slowly. Identify the input, the operation being performed, and the result.',
          code: example || undefined
        }
      ];

  return {
    ...lesson,
    volume: lesson.volume ?? getLessonVolume(lesson.order),
    sections,
    whyItMatters: lesson.whyItMatters ?? whyItMatters,
    howItWorks: lesson.howItWorks ?? `Start with the concept explained above, then trace the example from top to bottom. Ask yourself what each important line receives, what it changes, and what value it produces.`,
    whenToUse: lesson.whenToUse ?? whenToUse,
    whatHappens: lesson.whatHappens ?? `When this feature is used, ${language} follows the rules described in the lesson. The exact result depends on the values supplied to the code. Run the example and compare the output with your expectation.`,
    realWorldExample: lesson.realWorldExample ?? realWorldExample,
    commonMistakes: lesson.commonMistakes ?? commonMistakes,
    keyTakeaways: lesson.keyTakeaways ?? [
      `Understand what ${title.toLowerCase()} is before memorizing syntax.`,
      'Trace a small example by hand before trying a larger program.',
      'Practice changing one value at a time and observe the result.'
    ]
  };
}

// Add subject-focused lessons for languages that previously had fewer than 10 lessons.
// Existing lesson content is preserved; the new teaching fields are added automatically.
export const LESSONS: Lesson[] = [
  ...BASE_LESSONS,
  ...SUBJECT_LESSONS.filter(
    (lesson) => !BASE_LESSONS.some((existing) => existing.id === lesson.id)
  )
].map(buildTeachingContent);