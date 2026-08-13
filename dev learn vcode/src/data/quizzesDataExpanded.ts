import { Quiz } from '../types';
import { SUBJECT_QUIZZES } from './subjectQuizzesData';

// COMPREHENSIVE 3-TIER QUIZ SYSTEM
// Each language has Beginner (5q), Intermediate (10q), Advanced (15+q)

const BASE_COMPREHENSIVE_QUIZZES: Quiz[] = [
  // ===== JAVASCRIPT - 3 TIERS =====

  // JavaScript Beginner (5 questions)
  {
    id: 'js-beginner-1',
    languageId: 'javascript',
    languageName: 'JavaScript',
    title: 'JavaScript Basics & Variables',
    difficulty: 'beginner',
    timeLimitMinutes: 5,
    questions: [
      {
        id: 'js-b-1',
        question: 'Which keyword declares a variable that CANNOT be reassigned?',
        codeSnippet: `const x = 10;\nx = 20; // Error?`,
        options: ['var', 'let', 'const', 'static'],
        correctAnswerIndex: 2,
        explanation: '`const` cannot be reassigned and throws a TypeError.',
        hint: 'It stands for "constant".'
      },
      {
        id: 'js-b-2',
        question: 'What is the output of `typeof NaN`?',
        codeSnippet: `console.log(typeof NaN);`,
        options: ['"undefined"', '"number"', '"nan"', '"object"'],
        correctAnswerIndex: 1,
        explanation: 'NaN is of type "number" despite meaning "Not-a-Number".',
        hint: 'Check the IEEE 754 standard type.'
      },
      {
        id: 'js-b-3',
        question: 'Which method adds elements to the END of an array?',
        codeSnippet: `const arr = [1, 2];\narr._____(3);`,
        options: ['pop()', 'unshift()', 'push()', 'concat()'],
        correctAnswerIndex: 2,
        explanation: '`push()` appends to the end.',
        hint: 'Think "pushing" onto a queue.'
      },
      {
        id: 'js-b-4',
        question: 'What does `console.log(5 + "5")` output?',
        codeSnippet: `console.log(5 + "5");`,
        options: ['10', '"55"', 'Error', 'NaN'],
        correctAnswerIndex: 1,
        explanation: 'JavaScript concatenates: number + string = string.',
        hint: 'Type coercion in JavaScript.'
      },
      {
        id: 'js-b-5',
        question: 'Which comparison operator checks both value AND type?',
        codeSnippet: `console.log(5 == "5");   // true or false?\nconsole.log(5 === "5");  // true or false?`,
        options: ['==', '===', '!=', '!=='],
        correctAnswerIndex: 1,
        explanation: '`===` (strict equality) checks both value and type.',
        hint: 'Strict equality requires same type.'
      }
    ]
  },

  // JavaScript Intermediate (10 questions)
  {
    id: 'js-intermediate-1',
    languageId: 'javascript',
    languageName: 'JavaScript',
    title: 'Closures, Promises & Async',
    difficulty: 'intermediate',
    timeLimitMinutes: 8,
    questions: [
      {
        id: 'js-i-1',
        question: 'What will be printed to console?',
        codeSnippet: `console.log('1');\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => console.log('3'));\nconsole.log('4');`,
        options: ['1 2 3 4', '1 4 3 2', '1 4 2 3', '1 3 2 4'],
        correctAnswerIndex: 1,
        explanation: 'Microtasks (Promises) run before macrotasks (setTimeout).',
        hint: 'Consider the event loop and task queues.'
      },
      {
        id: 'js-i-2',
        question: 'What is a closure?',
        codeSnippet: `function outer() {\n  let x = 10;\n  return function inner() {\n    return x;\n  };\n}`,
        options: [
          'A function called only once',
          'A function with access to outer scope variables',
          'An immediately invoked function',
          'A function that prevents memory leaks'
        ],
        correctAnswerIndex: 1,
        explanation: 'A closure is a function that retains access to its outer scope.',
        hint: 'It accesses parent function variables.'
      },
      {
        id: 'js-i-3',
        question: 'What does `this` refer to in a regular function?',
        codeSnippet: `function greet() {\n  console.log(this);\n}\ngreet();`,
        options: ['The function object', 'The global object (window/global)', 'undefined', 'The nearest parent object'],
        correctAnswerIndex: 1,
        explanation: 'In non-strict mode, `this` refers to global object.',
        hint: 'Consider global context vs method context.'
      },
      {
        id: 'js-i-4',
        question: 'What is the difference between `let` and `var`?',
        codeSnippet: `for (var i = 0; i < 3; i++) {}\nconsole.log(i); // What is i?\n\nfor (let j = 0; j < 3; j++) {}\nconsole.log(j); // Error?`,
        options: [
          'No difference',
          'var is block-scoped, let is function-scoped',
          'let is block-scoped, var is function-scoped',
          'let prevents re-declaration, var does not'
        ],
        correctAnswerIndex: 2,
        explanation: '`let` is block-scoped; `var` is function-scoped.',
        hint: 'Think about scope blocks (if, for, while).'
      },
      {
        id: 'js-i-5',
        question: 'What does `Array.map()` do?',
        codeSnippet: `const nums = [1, 2, 3];\nconst doubled = nums.map(x => x * 2);`,
        options: [
          'Filters array based on condition',
          'Transforms each element and returns new array',
          'Adds all elements and returns sum',
          'Finds first matching element'
        ],
        correctAnswerIndex: 1,
        explanation: '`map()` applies function to each element.',
        hint: 'It returns a new transformed array.'
      },
      {
        id: 'js-i-6',
        question: 'Which statement is TRUE about arrow functions?',
        codeSnippet: `const obj = {\n  name: "JS",\n  regularFunc: function() { return this.name; },\n  arrowFunc: () => this.name\n};\nobj.regularFunc(); // ?\nobj.arrowFunc();   // ?`,
        options: [
          'Both return "JS"',
          'Arrow functions have their own `this`, regular functions do not',
          'Regular function returns "JS", arrow function has lexical `this`',
          'Arrow functions are always faster'
        ],
        correctAnswerIndex: 2,
        explanation: 'Arrow functions inherit `this` from enclosing scope.',
        hint: 'Arrow functions do not have their own `this`.'
      },
      {
        id: 'js-i-7',
        question: 'What is the output of `[1,2,3].filter(x => x > 1)`?',
        codeSnippet: `[1,2,3].filter(x => x > 1)`,
        options: ['[2, 3]', '[1]', '[]', 'Error'],
        correctAnswerIndex: 0,
        explanation: '`filter()` keeps elements matching the condition.',
        hint: 'Returns elements where condition is true.'
      },
      {
        id: 'js-i-8',
        question: 'What does `Object.keys()` return?',
        codeSnippet: `const obj = {a: 1, b: 2, c: 3};\nObject.keys(obj)`,
        options: [
          'An array of values',
          'An array of keys',
          'An object of keys',
          'A string of keys'
        ],
        correctAnswerIndex: 1,
        explanation: '`Object.keys()` returns array of property names.',
        hint: 'Keys are the property names.'
      },
      {
        id: 'js-i-9',
        question: 'What is destructuring?',
        codeSnippet: `const {name, age} = {name: "Alice", age: 25};\nconst [a, b] = [1, 2];`,
        options: [
          'Breaking an object/array into independent variables',
          'Removing properties from objects',
          'Splitting strings into characters',
          'Destroying data structures'
        ],
        correctAnswerIndex: 0,
        explanation: 'Destructuring extracts values into separate variables.',
        hint: 'It unpacks values from objects/arrays.'
      },
      {
        id: 'js-i-10',
        question: 'What is the spread operator used for?',
        codeSnippet: `const arr1 = [1, 2];\nconst arr2 = [...arr1, 3, 4];\nconst merged = {a: 1, ...obj};`,
        options: [
          'Copying arrays and objects, combining iterables',
          'Performing arithmetic operations',
          'Indicating optional parameters',
          'Creating conditional statements'
        ],
        correctAnswerIndex: 0,
        explanation: 'Spread operator (...) expands iterables.',
        hint: 'Three dots (...) spread elements.'
      }
    ]
  },

  // JavaScript Advanced (15+ questions)
  {
    id: 'js-advanced-1',
    languageId: 'javascript',
    languageName: 'JavaScript',
    title: 'Prototypes, Async/Await & Design Patterns',
    difficulty: 'advanced',
    timeLimitMinutes: 10,
    questions: [
      {
        id: 'js-a-1',
        question: 'What is prototype-based inheritance?',
        codeSnippet: `function Animal(name) { this.name = name; }\nAnimal.prototype.speak = function() {...}\nconst dog = new Animal("Rex");`,
        options: [
          'Creating classes like in traditional OOP',
          'Objects inheriting from other objects via prototype chain',
          'A design pattern for inheritance',
          'Using __proto__ property directly'
        ],
        correctAnswerIndex: 1,
        explanation: 'JavaScript uses prototype chain for inheritance.',
        hint: 'Each object has a prototype chain.'
      },
      {
        id: 'js-a-2',
        question: 'What does `Object.create()` do?',
        codeSnippet: `const parent = {greet: () => "Hi"};\nconst child = Object.create(parent);\nchild.greet();`,
        options: [
          'Copies parent properties to child',
          'Creates new object with specified prototype',
          'Clones an object',
          'Creates a class-like constructor'
        ],
        correctAnswerIndex: 1,
        explanation: '`Object.create()` creates object with given prototype.',
        hint: 'It sets up prototype chain.'
      },
      {
        id: 'js-a-3',
        question: 'What is the difference between `call()`, `apply()`, and `bind()`?',
        codeSnippet: `function greet(greeting) {\\nconsole.log(greeting + " " + this.name);\\n}\\ngreet.call(obj, "Hi");`,
        options: [
          'No significant difference',
          'call() takes args as list, apply() as array, bind() returns new function',
          'Only call() can bind this',
          'They are aliases for the same method'
        ],
        correctAnswerIndex: 1,
        explanation: 'call/apply execute immediately; bind returns bound function.',
        hint: 'Consider how arguments are passed.'
      },
      {
        id: 'js-a-4',
        question: 'What is the temporal dead zone (TDZ)?',
        codeSnippet: `console.log(x); // ReferenceError?\nlet x = 10;`,
        options: [
          'A browser feature that prevents execution',
          'Period before let/const are initialized where they cannot be accessed',
          'A hoisting mechanism for variables',
          'A scope created by arrow functions'
        ],
        correctAnswerIndex: 1,
        explanation: 'TDZ is the gap between declaration and initialization.',
        hint: 'It affects let and const variables.'
      },
      {
        id: 'js-a-5',
        question: 'What is async/await and how does it relate to Promises?',
        codeSnippet: `async function fetch Data() {\\nconst data = await fetchFromServer();\\nreturn data;\\n}`,
        options: [
          'Different systems for asynchronous code',
          'async/await is syntactic sugar over Promises',
          'await creates a Promise automatically',
          'async/await replaces Promises entirely'
        ],
        correctAnswerIndex: 1,
        explanation: 'async/await provides cleaner Promise syntax.',
        hint: 'await can only be used in async functions.'
      },
      {
        id: 'js-a-6',
        question: 'What happens with `Promise.all()` vs `Promise.race()`?',
        codeSnippet: `Promise.all([p1, p2, p3]); // All complete?\nPromise.race([p1, p2, p3]); // First completes?`,
        options: [
          'Same result, different names',
          'all() waits for all, race() returns first completed',
          'all() is synchronous, race() is asynchronous',
          'race() is faster but less reliable'
        ],
        correctAnswerIndex: 1,
        explanation: 'all() waits for all promises; race() returns first.',
        hint: 'Think about concurrency patterns.'
      },
      {
        id: 'js-a-7',
        question: 'What is event delegation?',
        codeSnippet: `document.addEventListener("click", (e) => {\\nif (e.target.matches(".btn")) { ... }\\n});`,
        options: [
          'Passing events to child elements',
          'Attaching single listener to parent for all children',
          'Creating event listeners programmatically',
          'Preventing event bubbling'
        ],
        correctAnswerIndex: 1,
        explanation: 'Event delegation uses bubbling for efficient handling.',
        hint: 'One listener handles multiple elements.'
      },
      {
        id: 'js-a-8',
        question: 'What is the difference between `==` and `===`?',
        codeSnippet: `0 == false  // true or false?\n0 === false // true or false?\n"" == false // true or false?\n"" === false // true or false?`,
        options: [
          'No difference',
          '== does type coercion, === requires exact type match',
          '=== is faster',
          '== is for objects, === is for primitives'
        ],
        correctAnswerIndex: 1,
        explanation: '`===` prevents unexpected type coercion.',
        hint: 'Use strict equality for safety.'
      },
      {
        id: 'js-a-9',
        question: 'What is memoization?',
        codeSnippet: `function memoize(fn) {\\nconst cache = {};\\nreturn (arg) => cache[arg] ?? (cache[arg] = fn(arg));\\n}`,
        options: [
          'Storing function definitions',
          'Caching function results to avoid recomputation',
          'Optimizing loop performance',
          'Preventing memory leaks'
        ],
        correctAnswerIndex: 1,
        explanation: 'Memoization caches expensive function results.',
        hint: 'It\'s an optimization technique.'
      },
      {
        id: 'js-a-10',
        question: 'What is the observer pattern in JavaScript?',
        codeSnippet: `class Subject { ... attach(observer) {} notify() {} }`,
        options: [
          'Watching object changes',
          'Design pattern for one-to-many dependencies',
          'Browser API for DOM mutations',
          'Redux state management'
        ],
        correctAnswerIndex: 1,
        explanation: 'Observer pattern handles event-driven architecture.',
        hint: 'Subject notifies multiple observers.'
      },
      {
        id: 'js-a-11',
        question: 'What is currying in JavaScript?',
        codeSnippet: `const add = (a) => (b) => a + b;\\nadd(2)(3); // 5`,
        options: [
          'Adding spice to functions',
          'Converting function with multiple args to nested single-arg functions',
          'A styling function for DOM',
          'A built-in Array method'
        ],
        correctAnswerIndex: 1,
        explanation: 'Currying transforms arguments into nested functions.',
        hint: 'Each level returns a new function.'
      },
      {
        id: 'js-a-12',
        question: 'What is composition in functional programming?',
        codeSnippet: `const compose = (...fns) => (x) => fns.reduceRight((acc, f) => f(acc), x);`,
        options: [
          'Combining objects into components',
          'Chaining multiple functions together',
          'Creating music programmatically',
          'Storing composed styles'
        ],
        correctAnswerIndex: 1,
        explanation: 'Composition applies functions in sequence.',
        hint: 'f(g(h(x))) is function composition.'
      },
      {
        id: 'js-a-13',
        question: 'What causes memory leaks in JavaScript?',
        codeSnippet: `const cache = [];\nfunction addListener() {\\ndom.addEventListener("click", () => cache.push(big));\\n}`,
        options: [
          'Too many variables',
          'Unremoved event listeners, circular references, forgotten timers',
          'Using const instead of let',
          'Large function definitions'
        ],
        correctAnswerIndex: 1,
        explanation: 'Retained references prevent garbage collection.',
        hint: 'Clean up listeners and timers.'
      },
      {
        id: 'js-a-14',
        question: 'What is the module pattern?',
        codeSnippet: `const module = (() => {\\nlet private = "secret";\\nreturn { public: () => private };\\n})();`,
        options: [
          'Using ES6 import/export',
          'IIFE creating private and public scope',
          'A way to organize files',
          'An external library'
        ],
        correctAnswerIndex: 1,
        explanation: 'Module pattern uses IIFE for encapsulation.',
        hint: 'It creates private variables.'
      },
      {
        id: 'js-a-15',
        question: 'What is the singleton pattern?',
        codeSnippet: `const singleton = (() => {\\nlet instance;\\nreturn { getInstance: () => instance || (instance = {}) };\\n})();`,
        options: [
          'Creating one instance of a class',
          'Ensuring only one object instance exists globally',
          'A design pattern for callbacks',
          'A way to prevent object creation'
        ],
        correctAnswerIndex: 1,
        explanation: 'Singleton restricts instantiation to one object.',
        hint: 'Controls object instantiation.'
      }
    ]
  },

  // ===== PYTHON - 3 TIERS =====

  // Python Beginner (5 questions)
  {
    id: 'py-beginner-1',
    languageId: 'python',
    languageName: 'Python',
    title: 'Python Fundamentals',
    difficulty: 'beginner',
    timeLimitMinutes: 5,
    questions: [
      {
        id: 'py-b-1',
        question: 'Which data structure is IMMUTABLE in Python?',
        codeSnippet: `a = [1, 2, 3]\nb = (1, 2, 3)\nc = {1, 2, 3}`,
        options: ['List', 'Tuple', 'Set', 'Dictionary'],
        correctAnswerIndex: 1,
        explanation: 'Tuples use () and cannot be modified after creation.',
        hint: 'Round parentheses ()'
      },
      {
        id: 'py-b-2',
        question: 'What is the output of `print(3 * "Hi")`?',
        codeSnippet: `print(3 * "Hi")`,
        options: ['HiHiHi', '3Hi', 'Error', 'Hi Hi Hi'],
        correctAnswerIndex: 0,
        explanation: 'Multiplying string by int repeats the string.',
        hint: 'String repetition'
      },
      {
        id: 'py-b-3',
        question: 'What does list comprehension `[x**2 for x in range(3)]` produce?',
        codeSnippet: `[x**2 for x in range(3)]`,
        options: ['[0, 1, 4]', '[1, 4, 9]', '[0, 1, 2]', 'Error'],
        correctAnswerIndex: 0,
        explanation: 'range(3) yields 0, 1, 2; squared gives 0, 1, 4.',
        hint: 'range(3) starts at 0'
      },
      {
        id: 'py-b-4',
        question: 'Which method adds an element to the END of a list?',
        codeSnippet: `lst = [1, 2]\nlst._____(3)`,
        options: ['extend()', 'append()', 'insert()', 'add()'],
        correctAnswerIndex: 1,
        explanation: 'append() adds single element to end.',
        hint: 'append means "add to end"'
      },
      {
        id: 'py-b-5',
        question: 'What keyword creates an immutable binding?',
        codeSnippet: `x = 10\n# Python doesn't have const, but we use:`,
        options: ['const', 'final', 'readonly', 'All have same mutability'],
        correctAnswerIndex: 3,
        explanation: 'Python treats all variables the same; naming convention (CONSTANT) suggests immutability.',
        hint: 'Python philosophy'
      }
    ]
  },

  // Python Intermediate (10 questions)
  {
    id: 'py-intermediate-1',
    languageId: 'python',
    languageName: 'Python',
    title: 'Decorators, Generators & OOP',
    difficulty: 'intermediate',
    timeLimitMinutes: 8,
    questions: [
      {
        id: 'py-i-1',
        question: 'What keyword converts a function into a generator?',
        codeSnippet: `def count():\n    n = 1\n    while True:\n        ____ n\n        n += 1`,
        options: ['return', 'yield', 'emit', 'send'],
        correctAnswerIndex: 1,
        explanation: '`yield` creates generator that pauses and resumes.',
        hint: '"yield" pauses execution'
      },
      {
        id: 'py-i-2',
        question: 'What is a decorator?',
        codeSnippet: `@decorator\ndef my_function():\n    pass`,
        options: [
          'A function that decorates with visual style',
          'A function that modifies another function or class',
          'A design pattern for object creation',
          'A way to access private variables'
        ],
        correctAnswerIndex: 1,
        explanation: 'Decorators wrap functions to modify behavior.',
        hint: 'Uses @ symbol'
      },
      {
        id: 'py-i-3',
        question: 'What is the difference between *args and **kwargs?',
        codeSnippet: `def func(*args, **kwargs):\n    print(args)    # tuple\n    print(kwargs)  # dict`,
        options: [
          'No difference',
          '*args is tuple of positional, **kwargs is dict of keyword args',
          '*args is dict, **kwargs is tuple',
          'Only *args is commonly used'
        ],
        correctAnswerIndex: 1,
        explanation: '*args for positional, **kwargs for named arguments.',
        hint: 'One asterisk vs two'
      },
      {
        id: 'py-i-4',
        question: 'What is a lambda function?',
        codeSnippet: `square = lambda x: x ** 2\nsquare(5)  # 25`,
        options: [
          'A Greek letter',
          'Anonymous single-expression function',
          'A class method',
          'A loop construct'
        ],
        correctAnswerIndex: 1,
        explanation: 'Lambda creates anonymous, single-expression functions.',
        hint: 'One-liner function'
      },
      {
        id: 'py-i-5',
        question: 'What does map() do?',
        codeSnippet: `result = map(lambda x: x*2, [1, 2, 3])`,
        options: [
          'Creates a dictionary',
          'Applies function to each element',
          'Filters elements',
          'Sorts elements'
        ],
        correctAnswerIndex: 1,
        explanation: 'map() applies function to each element.',
        hint: 'Transformation function'
      },
      {
        id: 'py-i-6',
        question: 'What does filter() do?',
        codeSnippet: `evens = filter(lambda x: x % 2 == 0, [1,2,3,4])`,
        options: [
          'Transforms elements',
          'Keeps elements where condition is True',
          'Sorts elements',
          'Removes duplicates'
        ],
        correctAnswerIndex: 1,
        explanation: 'filter() keeps matching elements.',
        hint: 'Selection function'
      },
      {
        id: 'py-i-7',
        question: 'What is the purpose of self in Python?',
        codeSnippet: `class Dog:\n    def bark(self):\n        print(self.name)`,
        options: [
          'A keyword like "this" in JavaScript',
          'Reference to instance (object) itself',
          'Optional parameter',
          'Used only in static methods'
        ],
        correctAnswerIndex: 1,
        explanation: '`self` refers to the instance calling the method.',
        hint: 'Instance reference'
      },
      {
        id: 'py-i-8',
        question: 'What is inheritance in Python?',
        codeSnippet: `class Animal:\n    def speak(self): pass\n\nclass Dog(Animal):\n    def speak(self): print("Woof")`,
        options: [
          'Passing variables to functions',
          'One class gaining methods/properties from another',
          'Copying code between files',
          'Memory allocation'
        ],
        correctAnswerIndex: 1,
        explanation: 'Inheritance allows class to extend another class.',
        hint: 'Parent-child relationship'
      },
      {
        id: 'py-i-9',
        question: 'What does `try-except` do?',
        codeSnippet: `try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("Error")`,
        options: [
          'Repeats code',
          'Catches and handles exceptions',
          'Validates input',
          'Tests code performance'
        ],
        correctAnswerIndex: 1,
        explanation: 'try-except handles runtime errors gracefully.',
        hint: 'Exception handling'
      },
      {
        id: 'py-i-10',
        question: 'What is a context manager (with statement)?',
        codeSnippet: `with open("file.txt") as f:\n    content = f.read()`,
        options: [
          'A loop construct',
          'Ensures resources are properly acquired and released',
          'A conditional statement',
          'A type of function'
        ],
        correctAnswerIndex: 1,
        explanation: 'Context managers handle setup/cleanup automatically.',
        hint: 'with statement'
      }
    ]
  },

  // Python Advanced (15+ questions)
  {
    id: 'py-advanced-1',
    languageId: 'python',
    languageName: 'Python',
    title: 'Metaprogramming & Advanced Patterns',
    difficulty: 'advanced',
    timeLimitMinutes: 10,
    questions: [
      {
        id: 'py-a-1',
        question: 'What is a metaclass?',
        codeSnippet: `class Meta(type):\n    pass\n\nclass MyClass(metaclass=Meta):\n    pass`,
        options: [
          'A parent class',
          'A class of a class',
          'An abstract class',
          'A type definition'
        ],
        correctAnswerIndex: 1,
        explanation: 'Metaclasses are classes whose instances are classes.',
        hint: 'Class of a class'
      },
      {
        id: 'py-a-2',
        question: 'What is __init__ vs __new__?',
        codeSnippet: `class Obj:\n    def __new__(cls): ...\n    def __init__(self): ...`,
        options: [
          'Same purpose',
          '__new__ creates instance, __init__ initializes it',
          '__init__ always called first',
          '__new__ is deprecated'
        ],
        correctAnswerIndex: 1,
        explanation: '__new__ creates; __init__ initializes.',
        hint: 'Object creation sequence'
      },
      {
        id: 'py-a-3',
        question: 'What is a property decorator?',
        codeSnippet: `class Circle:\n    @property\n    def area(self):\n        return self.radius ** 2 * 3.14`,
        options: [
          'Adds visual property to object',
          'Creates method accessible as attribute',
          'Validates property assignment',
          'A design pattern'
        ],
        correctAnswerIndex: 1,
        explanation: '@property allows method calls without ().',
        hint: 'Attribute-like method access'
      },
      {
        id: 'py-a-4',
        question: 'What is abstract base class (ABC)?',
        codeSnippet: `from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self): pass`,
        options: [
          'An incomplete class',
          'Defines interface all subclasses must implement',
          'A class that cannot be instantiated',
          'All of the above'
        ],
        correctAnswerIndex: 3,
        explanation: 'ABC enforces subclass implementation of methods.',
        hint: 'Interface enforcement'
      },
      {
        id: 'py-a-5',
        question: 'What is monkey patching?',
        codeSnippet: `str.reverse = lambda self: self[::-1]`,
        options: [
          'A bug fix method',
          'Dynamically modifying class/module at runtime',
          'Applying patches to code',
          'A testing technique'
        ],
        correctAnswerIndex: 1,
        explanation: 'Monkey patching modifies objects at runtime.',
        hint: 'Runtime modification'
      },
      {
        id: 'py-a-6',
        question: 'What is a descriptor?',
        codeSnippet: `class Descriptor:\n    def __get__(self, obj, type=None): ...\n    def __set__(self, obj, value): ...`,
        options: [
          'Describes an object',
          'Implements protocols for attribute access',
          'A documentation string',
          'A type annotation'
        ],
        correctAnswerIndex: 1,
        explanation: 'Descriptors control attribute access.',
        hint: '__get__, __set__, __delete__'
      },
      {
        id: 'py-a-7',
        question: 'What is GIL (Global Interpreter Lock)?',
        codeSnippet: `# Python threading limitation`,
        options: [
          'A permission system',
          'Limits thread concurrency in CPython',
          'A memory management technique',
          'Only affects Python 2'
        ],
        correctAnswerIndex: 1,
        explanation: 'GIL prevents true parallelism in CPython.',
        hint: 'Threading limitation'
      },
      {
        id: 'py-a-8',
        question: 'What is asyncio?',
        codeSnippet: `async def fetch():\n    return await get_data()`,
        options: [
          'Asynchronous I/O library',
          'A way to run parallel threads',
          'Error handling',
          'File operations'
        ],
        correctAnswerIndex: 0,
        explanation: 'asyncio enables asynchronous programming.',
        hint: 'async/await'
      },
      {
        id: 'py-a-9',
        question: 'What is __slots__?',
        codeSnippet: `class Optimized:\n    __slots__ = ["x", "y"]`,
        options: [
          'Creates class variables',
          'Restricts attributes and saves memory',
          'Defines method ordering',
          'A naming convention'
        ],
        correctAnswerIndex: 1,
        explanation: '__slots__ restricts and optimizes attribute storage.',
        hint: 'Memory optimization'
      },
      {
        id: 'py-a-10',
        question: 'What is a closure in Python?',
        codeSnippet: `def outer(x):\n    def inner():\n        return x\n    return inner`,
        options: [
          'A way to end functions',
          'Inner function retaining outer scope variables',
          'Closing files',
          'Error handling'
        ],
        correctAnswerIndex: 1,
        explanation: 'Closure captures outer function variables.',
        hint: 'Inner function scope'
      },
      {
        id: 'py-a-11',
        question: 'What is the difference between = and == in Python?',
        codeSnippet: `x = 5       # Assignment\nx == 5      # Comparison`,
        options: [
          'No difference',
          '= assigns, == compares',
          '== is for strings only',
          '= is deprecated'
        ],
        correctAnswerIndex: 1,
        explanation: '= assigns; == compares values.',
        hint: 'One vs two equals signs'
      },
      {
        id: 'py-a-12',
        question: 'What is mutable vs immutable?',
        codeSnippet: `x = [1, 2, 3]  # Mutable\ny = (1, 2, 3)  # Immutable`,
        options: [
          'Only strings are immutable',
          'Mutable can change; immutable cannot after creation',
          'Opposite definitions',
          'Applies only to classes'
        ],
        correctAnswerIndex: 1,
        explanation: 'Mutability determines if object can be modified.',
        hint: 'Can you change it?'
      },
      {
        id: 'py-a-13',
        question: 'What is reduce()?',
        codeSnippet: `from functools import reduce\nreduce(lambda x, y: x + y, [1,2,3,4])`,
        options: [
          'Reduces file size',
          'Applies function cumulatively to items',
          'Removes duplicates',
          'Filters elements'
        ],
        correctAnswerIndex: 1,
        explanation: 'reduce() applies function to reduce sequence to single value.',
        hint: 'Cumulative operation'
      },
      {
        id: 'py-a-14',
        question: 'What is a classmethod?',
        codeSnippet: `class Counter:\n    count = 0\n    @classmethod\n    def increment(cls):\n        cls.count += 1`,
        options: [
          'A method for classes only',
          'Receives class as first argument, not instance',
          'Cannot be called on instances',
          'Used only for validation'
        ],
        correctAnswerIndex: 1,
        explanation: '@classmethod passes class, not instance.',
        hint: 'cls vs self'
      },
      {
        id: 'py-a-15',
        question: 'What is unpacking?',
        codeSnippet: `a, b, c = [1, 2, 3]\nx, *rest = [1, 2, 3, 4]`,
        options: [
          'Removing from storage',
          'Extracting values from iterable to variables',
          'Opening compressed files',
          'Deserializing data'
        ],
        correctAnswerIndex: 1,
        explanation: 'Unpacking assigns iterable elements to variables.',
        hint: 'Destructuring assignment'
      }
    ]
  }
];

// Subject-knowledge tests for every remaining language.
export const COMPREHENSIVE_QUIZZES: Quiz[] = [
  ...BASE_COMPREHENSIVE_QUIZZES,
  ...SUBJECT_QUIZZES,
];
