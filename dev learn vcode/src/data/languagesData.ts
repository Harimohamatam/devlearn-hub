import { Language } from '../types';

export const LANGUAGES: Language[] = [
  {
    id: 'javascript',
    name: 'JavaScript',
    categoryId: 'web',
    categoryName: 'Web Development',
    iconName: 'FileCode2',
    themeColor: 'amber',
    accentHex: '#f7df1e',
    tagline: 'The universal scripting language of the web browser and full-stack web platforms.',
    yearCreated: 1995,
    createdByName: 'Brendan Eich (Netscape)',
    paradigm: 'Multi-paradigm: Event-driven, Functional, Prototype-based OO',
    difficultyRating: 'Beginner',
    overview: 'JavaScript is the core programming language of the Web. Used in 98%+ of websites worldwide, it provides dynamic interactive capabilities on the client side, while Node.js enables full-stack backend development.',
    compilerOrRuntime: 'V8 Engine (Chrome/Node.js), SpiderMonkey (Firefox), JavaScriptCore (Safari)',
    keyFeatures: [
      'First-class functions & closures',
      'Asynchronous non-blocking Event Loop',
      'Dynamic dynamic typing with loose/strict equals',
      'Prototype-based object inheritance',
      'Massive NPM ecosystem with over 2M packages'
    ],
    pros: [
      'Runs natively in all web browsers without plugins',
      'Huge job market and massive active developer community',
      'Full-stack capability with JavaScript on Client (React/Vue) and Server (Node/Express)'
    ],
    cons: [
      'Dynamic typing can cause runtime type error bugs if not managed carefully',
      'Single-threaded event loop requires care with CPU-heavy computations',
      'Historical syntax quirks (e.g. var vs let/const, coercion rules)'
    ],
    popularFrameworks: [
      { name: 'React', role: 'UI Library', description: 'Declarative component-based frontend library created by Meta.' },
      { name: 'Node.js / Express', role: 'Backend Runtime', description: 'Asynchronous event-driven backend server platform.' },
      { name: 'Next.js', role: 'Full-Stack Framework', description: 'Server-side rendering and static site generation built on React.' }
    ],
    syntaxSnippets: [
      {
        id: 'js-basics',
        title: 'Variables & Modern ES6 Syntax',
        description: 'Using const, let, template literals, and arrow functions.',
        code: `// Modern Variable Declarations
const studentName = "Alex";
let studyTimeMinutes = 45;

// Arrow Function with Template Literals
const getGreeting = (name, minutes) => {
  return \`Welcome \${name}! You have studied for \${minutes} mins today.\`;
};

console.log(getGreeting(studentName, studyTimeMinutes));`,
        simulatedOutput: 'Welcome Alex! You have studied for 45 mins today.',
        explanation: 'Use `const` by default for variables that do not change reference, and `let` for variables that get reassigned. Arrow functions provide a concise syntax.'
      },
      {
        id: 'js-async',
        title: 'Async / Await and Promises',
        description: 'Handling asynchronous operations gracefully without callback hell.',
        code: `// Simulating an asynchronous API fetch
async function fetchStudentScores(studentId) {
  console.log("Fetching student records...");
  
  // Simulated network delay
  const data = await new Promise((resolve) => 
    setTimeout(() => resolve({ id: studentId, score: 95, level: "Advanced" }), 500)
  );

  return \`Student #\${data.id} achieved \${data.score}% in \${data.level} level.\`;
}

fetchStudentScores(101).then(console.log);`,
        simulatedOutput: `Fetching student records...\nStudent #101 achieved 95% in Advanced level.`,
        explanation: '`async/await` turns Promise-based asynchronous logic into clean sequential-looking code.'
      }
    ],
    commonUseCases: [
      'Interactive Frontend Web Apps (React, Vue, Angular)',
      'Backend Web APIs & Microservices (Node.js, Express, Fastify)',
      'Cross-Platform Mobile Apps (React Native)',
      'Desktop Applications (Electron, Tauri)'
    ],
    learningRoadmap: [
      '1. Core Fundamentals: Variables, Data Types, Operators, Conditionals',
      '2. Functions, Scope, Closures, and Higher-Order Functions (map, filter, reduce)',
      '3. DOM Manipulation, Events, and Browser Web APIs',
      '4. Asynchronous JS: Promises, Async/Await, Fetch API',
      '5. Modern ES6+ Features: Destructuring, Spread Operator, Modules'
    ]
  },
  {
    id: 'python',
    name: 'Python',
    categoryId: 'data-ai',
    categoryName: 'Data Science & AI',
    iconName: 'Code',
    themeColor: 'blue',
    accentHex: '#3776ab',
    tagline: 'Clean, readable, and incredibly powerful language for AI, Machine Learning, Data Science, and Automation.',
    yearCreated: 1991,
    createdByName: 'Guido van Rossum',
    paradigm: 'Multi-paradigm: Object-oriented, Procedural, Functional',
    difficultyRating: 'Beginner',
    overview: 'Python is renowned for its clean syntax and readability, making it the top choice for beginners, researchers, data scientists, and AI engineers. Its philosophy prioritizes code readability with significant indentation.',
    compilerOrRuntime: 'CPython (Standard Interpreter), PyPy (JIT Compiler)',
    keyFeatures: [
      'Extremely clean, indentation-based syntax',
      'Dominant ecosystem for Artificial Intelligence & Deep Learning (PyTorch, TensorFlow)',
      'Rich scientific libraries (NumPy, Pandas, SciPy, Matplotlib)',
      'Dynamic typing with optional type hinting (mypy)',
      'Automatic garbage collection & dynamic memory allocation'
    ],
    pros: [
      'Easiest syntax to learn for beginner students',
      'Industry standard for Artificial Intelligence, Machine Learning & Data Analytics',
      'Huge ecosystem of 400,000+ PyPI packages'
    ],
    cons: [
      'Slower execution speed compared to compiled languages like C++ or Rust',
      'Global Interpreter Lock (GIL) limits multi-threaded CPU-bound parallelism in CPython',
      'Higher memory usage for large data structures'
    ],
    popularFrameworks: [
      { name: 'PyTorch / TensorFlow', role: 'AI & Deep Learning', description: 'Industry standards for building neural networks and AI models.' },
      { name: 'Django / FastAPI', role: 'Web Backend', description: 'Fast, secure web frameworks for building REST APIs and web platforms.' },
      { name: 'Pandas & NumPy', role: 'Data Science', description: 'High-performance data manipulation and numerical computing.' }
    ],
    syntaxSnippets: [
      {
        id: 'py-basics',
        title: 'List Comprehensions & Functions',
        description: 'Idiomatic Python syntax for clean data transformations.',
        code: `# Calculate squares of even numbers in a single line
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_squares = [x**2 for x in numbers if x % 2 == 0]

def summarize_study(subject: str, hours: float) -> str:
    return f"Studied {subject} for {hours} hours today!"

print("Even Squares:", even_squares)
print(summarize_study("Python Basics", 2.5))`,
        simulatedOutput: `Even Squares: [4, 16, 36, 64, 100]\nStudied Python Basics for 2.5 hours today!`,
        explanation: 'List comprehensions provide a concise way to create lists based on existing lists with optional filtering.'
      },
      {
        id: 'py-classes',
        title: 'Object-Oriented Programming (Classes & Dataclasses)',
        description: 'Creating structured models with dataclasses.',
        code: `from dataclasses import dataclass

@dataclass
class Student:
    name: str
    study_hours: float
    is_active: bool = True

    def calculate_score(self) -> int:
        return int(self.study_hours * 15)

alex = Student(name="Alex", study_hours=4.0)
print(f"{alex.name}'s Score: {alex.calculate_score()} pts")`,
        simulatedOutput: `Alex's Score: 60 pts`,
        explanation: 'Python `@dataclass` automatically generates `__init__`, `__repr__`, and `__eq__` methods.'
      }
    ],
    commonUseCases: [
      'Artificial Intelligence & Machine Learning (LLMs, Computer Vision)',
      'Data Science & Statistical Analysis',
      'Backend Web APIs & Microservices (FastAPI, Django)',
      'Automation Scripts & Web Scraping'
    ],
    learningRoadmap: [
      '1. Basic Syntax: Variables, Loops, Conditionals, Data Types (Lists, Dicts, Sets)',
      '2. Functions, Modules, and Package Management (pip, venv)',
      '3. Object-Oriented Python (Classes, Inheritance, Dunder Methods)',
      '4. File I/O, Error Handling (try/except), and Context Managers (with statement)',
      '5. Essential Libraries: NumPy, Pandas, Requests, and FastAPI/Django'
    ]
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    categoryId: 'web',
    categoryName: 'Web Development',
    iconName: 'ShieldCheck',
    themeColor: 'indigo',
    accentHex: '#3178c6',
    tagline: 'JavaScript with syntax for types. Catches bugs before your code even runs.',
    yearCreated: 2012,
    createdByName: 'Anders Hejlsberg (Microsoft)',
    paradigm: 'Multi-paradigm: Object-oriented, Functional, Strongly Typed',
    difficultyRating: 'Intermediate',
    overview: 'TypeScript is a strongly typed superset of JavaScript that compiles directly to clean JavaScript. It provides compile-time type checking, auto-completion, and refactoring tools loved by enterprise development teams.',
    compilerOrRuntime: 'tsc (TypeScript Compiler), SWC, esbuild',
    keyFeatures: [
      'Static Type Checking at compile time',
      'Interfaces, Generics, and Union Types',
      'Seamless 100% interoperability with JavaScript',
      'Superior IDE auto-completion and error detection',
      'Strict mode for eliminating null/undefined runtime crashes'
    ],
    pros: [
      'Catches 15%+ of common developer bugs before runtime',
      'Self-documenting codebases with automatic type hover docs',
      'Standard for modern web frontend & backend enterprise development'
    ],
    cons: [
      'Requires a compilation build step (tsc / esbuild)',
      'Slightly steeper learning curve for beginners due to generic types',
      'Can feel overly verbose for very tiny 10-line throwaway scripts'
    ],
    popularFrameworks: [
      { name: 'Angular', role: 'Web Framework', description: 'Full-featured enterprise framework built natively in TypeScript.' },
      { name: 'NestJS', role: 'Backend Framework', description: 'Progressive Node.js server framework inspired by Angular architecture.' },
      { name: 'React + TS', role: 'Frontend UI', description: 'Type-safe UI component development.' }
    ],
    syntaxSnippets: [
      {
        id: 'ts-interfaces',
        title: 'Interfaces, Types, and Generics',
        description: 'Defining strict contracts and reusable generic functions.',
        code: `interface StudentProfile {
  id: string;
  name: string;
  enrolledCourses: string[];
  gpa?: number; // Optional property
}

// Generic helper function
function getFirstItem<T>(items: T[]): T | undefined {
  return items[0];
}

const student: StudentProfile = {
  id: "STU-882",
  name: "Sophia",
  enrolledCourses: ["TypeScript", "Data Structures", "Algorithms"]
};

console.log(\`Student: \${student.name}\`);
console.log(\`First Course: \${getFirstItem(student.enrolledCourses)}\`);`,
        simulatedOutput: `Student: Sophia\nFirst Course: TypeScript`,
        explanation: 'Interfaces define the structure of objects. Generics (`<T>`) allow creating reusable functions that preserve exact type safety.'
      }
    ],
    commonUseCases: [
      'Large-Scale Web Applications (React, Next.js, Angular)',
      'Enterprise Backend Services (NestJS, Express)',
      'Open Source Libraries and NPM Packages'
    ],
    learningRoadmap: [
      '1. JavaScript Fundamentals (Functions, Objects, ES6+)',
      '2. Basic Types: string, number, boolean, arrays, tuples, enums',
      '3. Interfaces & Type Aliases (Union, Intersection)',
      '4. Generics and Utility Types (Partial, Readonly, Record, Pick)',
      '5. Strict Mode, Type Guards, and Narrowing'
    ]
  },
  {
    id: 'rust',
    name: 'Rust',
    categoryId: 'systems',
    categoryName: 'Systems & Low-Level',
    iconName: 'Cpu',
    themeColor: 'amber',
    accentHex: '#de4123',
    tagline: 'Empowering everyone to build reliable and efficient systems software without garbage collection runtime overhead.',
    yearCreated: 2015,
    createdByName: 'Graydon Hoare (Mozilla Research)',
    paradigm: 'Multi-paradigm: Concurrent, Functional, Imperative, Memory-safe Systems',
    difficultyRating: 'Advanced',
    overview: 'Rust achieves memory safety and concurrency without a garbage collector through its innovative Borrow Checker. It has been voted Stack Overflow\'s most loved programming language for 8+ consecutive years.',
    compilerOrRuntime: 'rustc (LLVM Backend), Cargo Package Manager',
    keyFeatures: [
      'Ownership system with strict compile-time Borrow Checker',
      'Zero-cost abstractions with no runtime garbage collector',
      'Guaranteed thread safety (eliminates data races at compile time)',
      'Cargo: unified build system, package manager, and test runner',
      'Pattern matching with Option<T> and Result<T, E> error handling'
    ],
    pros: [
      'Blazing fast performance on par with C and C++',
      'Eliminates null pointer exceptions, buffer overflows, and memory leaks',
      'Exceptional compiler error messages with detailed guidance'
    ],
    cons: [
      'Steep learning curve due to the Borrow Checker rules',
      'Longer compile times compared to Go or C',
      'Rigid rules require rethink of traditional object-oriented patterns'
    ],
    popularFrameworks: [
      { name: 'Actix Web / Axum', role: 'Web Backend', description: 'Ultra-high performance, memory-safe backend web frameworks.' },
      { name: 'Tauri', role: 'Desktop / Mobile', description: 'Build lightweight cross-platform desktop apps with web frontends.' },
      { name: 'Tokio', role: 'Async Runtime', description: 'Event-driven, non-blocking I/O platform for writing network applications.' }
    ],
    syntaxSnippets: [
      {
        id: 'rust-ownership',
        title: 'Ownership, Borrowing, and Pattern Matching',
        description: 'Safe memory management and explicit error handling without nulls.',
        code: `fn calculate_grade(score: u32) -> Result<String, &'static str> {
    if score > 100 {
        Err("Score cannot exceed 100")
    } else if score >= 90 {
        Ok(String::from("A Grade"))
    } else {
        Ok(String::from("Keep practicing!"))
    }
}

fn main() {
    let student_score = 95;
    match calculate_grade(student_score) {
        Ok(grade) => println!("Result: {}", grade),
        Err(msg) => println!("Error: {}", msg),
    }
}`,
        simulatedOutput: `Result: A Grade`,
        explanation: 'Rust uses `Result<T, E>` and pattern matching (`match`) to force explicit handling of success and failure cases without throwing unhandled exceptions.'
      }
    ],
    commonUseCases: [
      'Operating System Kernels, Browsers, and Game Engines',
      'High-Performance Web Servers & Microservices',
      'WebAssembly (Wasm) High-Speed Browser Modules',
      'Blockchain, Cryptography, & Command-Line Utilities'
    ],
    learningRoadmap: [
      '1. Basic Syntax: Variables, Mutability, Functions, Control Flow',
      '2. The Core Concept: Ownership, References, and Borrowing Rules',
      '3. Structs, Enums, and Pattern Matching',
      '4. Error Handling: Option<T>, Result<T, E>, and the ? Operator',
      '5. Traits, Generics, Lifetimes, and Concurrency with Tokio'
    ]
  },
  {
    id: 'java',
    name: 'Java',
    categoryId: 'backend',
    categoryName: 'Backend & Cloud',
    iconName: 'Coffee',
    themeColor: 'rose',
    accentHex: '#b07219',
    tagline: 'Write Once, Run Anywhere. The enterprise battle-tested backbone of cloud computing and backend infrastructure.',
    yearCreated: 1995,
    createdByName: 'James Gosling (Sun Microsystems)',
    paradigm: 'Object-oriented, Class-based, Concurrent, Strongly Typed',
    difficultyRating: 'Intermediate',
    overview: 'Java is one of the most widely deployed programming languages in the world, trusted by Fortune 500 companies, banks, and enterprise systems. The Java Virtual Machine (JVM) provides cross-platform execution and robust memory management.',
    compilerOrRuntime: 'Java Virtual Machine (JVM), OpenJDK / Oracle JDK',
    keyFeatures: [
      'Bytecode execution on any platform via the JVM',
      'Strict Object-Oriented structure with classes & interfaces',
      'Garbage-collected automatic memory management',
      'Virtual Threads (Project Loom) for lightweight high-concurrency',
      'Rich enterprise ecosystem (Spring Boot, Hibernate, Maven, Gradle)'
    ],
    pros: [
      'Enormous enterprise adoption and high job demand worldwide',
      'Exceptional stability, backward compatibility, and tool ecosystem',
      'High runtime performance with modern JIT compilers'
    ],
    cons: [
      'Verbose syntax compared to modern scripting languages like Python',
      'Slower cold-start initialization time for small serverless functions',
      'Requires JVM memory overhead'
    ],
    popularFrameworks: [
      { name: 'Spring Boot', role: 'Enterprise Web', description: 'Dominant framework for building production-grade enterprise microservices.' },
      { name: 'Hibernate', role: 'ORM Database', description: 'Object-relational mapping library for database persistence.' },
      { name: 'Apache Spark', role: 'Big Data', description: 'Unified analytics engine for large-scale data processing.' }
    ],
    syntaxSnippets: [
      {
        id: 'java-basics',
        title: 'Classes, OOP, and Streams API',
        description: 'Creating objects and processing collections with modern Java Streams.',
        code: `import java.util.List;

public class StudentPortal {
    public static void main(String[] args) {
        List<String> languages = List.of("Java", "Python", "Rust", "Go");

        // Processing using Java Streams
        List<String> filtered = languages.stream()
            .filter(lang -> lang.length() <= 4)
            .map(String::toUpperCase)
            .toList();

        System.out.println("Short Languages: " + filtered);
    }
}`,
        simulatedOutput: `Short Languages: [JAVA, RUST, GO]`,
        explanation: 'Java Streams provide functional-style operations on streams of elements, such as map-reduce transformations.'
      }
    ],
    commonUseCases: [
      'Enterprise Backend Web Systems & Microservices (Spring Boot)',
      'Android App Development (Native Legacy & Modern JVM)',
      'Big Data Infrastructure (Hadoop, Kafka, Spark)',
      'Financial & Banking Core Transaction Engines'
    ],
    learningRoadmap: [
      '1. Java Fundamentals: Classes, Objects, Syntax, Primitive Data Types',
      '2. Core OOP Principles: Encapsulation, Inheritance, Polymorphism, Abstraction',
      '3. Collections Framework: List, Set, Map, and Generics',
      '4. Exceptions Handling, File I/O, and Multithreading',
      '5. Spring Boot, JPA/Hibernate, and Building REST APIs'
    ]
  },
  {
    id: 'go',
    name: 'Go (Golang)',
    categoryId: 'backend',
    categoryName: 'Backend & Cloud',
    iconName: 'Zap',
    themeColor: 'cyan',
    accentHex: '#00add8',
    tagline: 'Simple, fast, and concurrent language designed at Google for cloud infrastructure and microservices.',
    yearCreated: 2009,
    createdByName: 'Robert Griesemer, Rob Pike, Ken Thompson (Google)',
    paradigm: 'Multi-paradigm: Concurrent, Imperative, Compiled',
    difficultyRating: 'Beginner',
    overview: 'Go was engineered at Google to solve software engineering at scale. It offers ultra-fast compile times, a minimalist syntax (only 25 keywords), and lightweight goroutines that make concurrent programming effortless.',
    compilerOrRuntime: 'go compiler (Direct Native Machine Code Execution)',
    keyFeatures: [
      'Goroutines: Lightweight green threads using ~2KB RAM per thread',
      'Channels for safe CSP (Communicating Sequential Processes) concurrency',
      'Compiles to single self-contained static binary executable',
      'Built-in formatter (gofmt) and native test runner',
      'Simple, pragmatic standard library with built-in HTTP server'
    ],
    pros: [
      'Extremely fast compile times and runtime execution',
      'Minimalist language design easy to master in a weekend',
      'Powerhouse behind cloud infrastructure (Docker, Kubernetes, Terraform)'
    ],
    cons: [
      'Intentionally simple syntax lacks some expressive functional constructs',
      'Error handling via explicit \`if err != nil\` can feel repetitive',
      'No classical class inheritance (uses composition and interfaces instead)'
    ],
    popularFrameworks: [
      { name: 'Gin / Fiber', role: 'Web Framework', description: 'Ultra-fast HTTP web frameworks for high-speed microservices.' },
      { name: 'GORM', role: 'Database ORM', description: 'Developer-friendly ORM library for Go.' },
      { name: 'Cobra', role: 'CLI Tools', description: 'Library for creating powerful modern CLI applications (used by kubectl).' }
    ],
    syntaxSnippets: [
      {
        id: 'go-concurrency',
        title: 'Goroutines and Channels',
        description: 'Concurrent background execution using lightweight goroutines.',
        code: `package main

import (
    "fmt"
    "time"
)

func worker(id int, ch chan string) {
    time.Sleep(100 * time.Millisecond)
    ch <- fmt.Sprintf("Worker %d completed study task!", id)
}

func main() {
    ch := make(chan string)

    // Launching 3 goroutines concurrently
    for i := 1; i <= 3; i++ {
        go worker(i, ch)
    }

    // Receiving results from channel
    for i := 1; i <= 3; i++ {
        fmt.Println(<-ch)
    }
}`,
        simulatedOutput: `Worker 1 completed study task!\nWorker 2 completed study task!\nWorker 3 completed study task!`,
        explanation: 'Goroutines start with the `go` keyword. Channels (`chan`) provide safe communication between concurrent goroutines.'
      }
    ],
    commonUseCases: [
      'Cloud Native Infrastructure & DevOps Tools (Docker, Kubernetes)',
      'High-Throughput Microservices & gRPC APIs',
      'Distributed Databases and Network Proxies',
      'Command-Line Tools (CLIs)'
    ],
    learningRoadmap: [
      '1. Go Basics: Variables, Structs, Functions, Loops, Pointers',
      '2. Interfaces and Composition (No Inheritance)',
      '3. Error Handling Idioms (if err != nil)',
      '4. Concurrency: Goroutines, Channels, Select, and Mutexes',
      '5. Building REST & gRPC Services with Standard Library & Gin'
    ]
  },
  {
    id: 'cpp',
    name: 'C++',
    categoryId: 'systems',
    categoryName: 'Systems & Low-Level',
    iconName: 'Cpu',
    themeColor: 'blue',
    accentHex: '#00599c',
    tagline: 'High-performance, object-oriented systems language powering AAA games, OS software, and high-frequency trading.',
    yearCreated: 1985,
    createdByName: 'Bjarne Stroustrup',
    paradigm: 'Multi-paradigm: Procedural, Object-oriented, Generic, Low-level',
    difficultyRating: 'Advanced',
    overview: 'C++ builds on C by adding object-oriented features, template metaprogramming, and standard template library (STL) containers, giving developers direct control over hardware and memory allocation.',
    compilerOrRuntime: 'GCC, Clang, MSVC',
    keyFeatures: [
      'RAII (Resource Acquisition Is Initialization) for automatic cleanup',
      'Direct manual memory management (pointers, references, dynamic stack/heap)',
      'Template Metaprogramming for compile-time generic algorithms',
      'Standard Template Library (STL): vector, map, set, algorithms',
      'Zero-overhead principle: You don\'t pay for what you don\'t use'
    ],
    pros: [
      'Unrivaled execution speed and hardware control',
      'Industry standard for AAA game development (Unreal Engine) and graphics rendering',
      'Massive legacy codebases and foundational systems foundation'
    ],
    cons: [
      'Complex syntax with manual memory risks (dangling pointers, memory leaks)',
      'Long compilation times and complicated build tools (CMake, Make)',
      'Undefined behavior pitfalls if memory rules are violated'
    ],
    popularFrameworks: [
      { name: 'Unreal Engine', role: 'Game Development', description: 'World-leading 3D game development engine.' },
      { name: 'Qt', role: 'Desktop GUI', description: 'Cross-platform GUI application framework.' },
      { name: 'Boost', role: 'C++ Libraries', description: 'Peer-reviewed portable C++ source libraries.' }
    ],
    syntaxSnippets: [
      {
        id: 'cpp-basics',
        title: 'Classes, Vectors, and Pointers',
        description: 'STL containers and smart pointers.',
        code: `#include <iostream>
#include <vector>
#include <memory>

class Student {
public:
    std::string name;
    Student(std::string n) : name(n) {}
    void study() {
        std::cout << name << " is solving C++ pointers!" << std::endl;
    }
};

int main() {
    // Modern C++ Smart Pointer (Automatic memory cleanup)
    auto student = std::make_unique<Student>("David");
    student->study();

    std::vector<int> scores = {88, 92, 95};
    std::cout << "Top Score: " << scores.back() << std::endl;
    return 0;
}`,
        simulatedOutput: `David is solving C++ pointers!\nTop Score: 95`,
        explanation: 'Smart pointers (`std::unique_ptr`) automatically free memory when going out of scope, preventing memory leaks in modern C++.'
      }
    ],
    commonUseCases: [
      'AAA 3D Game Engines & Computer Graphics (Unreal Engine, OpenGL, DirectX)',
      'Operating Systems, Browsers (Chromium core), and Drivers',
      'High-Frequency Trading Platforms & Embedded Systems',
      'Audio & Video Real-time Processing Engines'
    ],
    learningRoadmap: [
      '1. Basic Syntax: Data Types, Functions, Conditionals, Loops',
      '2. Pointers, References, Stack vs Heap Allocation',
      '3. Classes, Constructors, Destructors, Inheritance, Polymorphism',
      '4. Standard Template Library (STL): vector, map, string, algorithms',
      '5. Modern C++ (C++11 to C++23): Smart Pointers, Lambdas, Move Semantics'
    ]
  },
  {
    id: 'sql',
    name: 'SQL',
    categoryId: 'data-ai',
    categoryName: 'Data Science & AI',
    iconName: 'Database',
    themeColor: 'purple',
    accentHex: '#e38c00',
    tagline: 'The universal declarative query language for relational database management and data manipulation.',
    yearCreated: 1974,
    createdByName: 'Donald D. Chamberlin & Raymond F. Boyce (IBM)',
    paradigm: 'Declarative, Domain-Specific Database Query Language',
    difficultyRating: 'Beginner',
    overview: 'SQL (Structured Query Language) is the standard language for querying, updating, and managing relational databases like PostgreSQL, MySQL, SQLite, and SQL Server.',
    compilerOrRuntime: 'PostgreSQL, MySQL, SQLite, Oracle, SQL Server Engine',
    keyFeatures: [
      'Declarative syntax: Specify WHAT data you want, not HOW to retrieve it',
      'ACID transaction compliance (Atomicity, Consistency, Isolation, Durability)',
      'Powerful JOIN operations across multiple relational tables',
      'Aggregation functions: GROUP BY, HAVING, SUM, AVG, COUNT',
      'Window functions and CTEs (Common Table Expressions)'
    ],
    pros: [
      'Essential skill for every software engineer, data analyst, and backend developer',
      'Declarative and readable query syntax',
      'Extremely optimized database query engines'
    ],
    cons: [
      'Relational schema migrations require careful planning in production',
      'Different database engines have slight syntax dialect variations (e.g. Postgres vs MySQL vs T-SQL)'
    ],
    popularFrameworks: [
      { name: 'PostgreSQL', role: 'Database Engine', description: 'Advanced open-source relational database engine.' },
      { name: 'Prisma / Drizzle', role: 'Type-Safe ORM', description: 'Modern TypeScript ORMs for database querying.' },
      { name: 'dbt', role: 'Data Analytics', description: 'Analytics engineering tool to transform data in SQL.' }
    ],
    syntaxSnippets: [
      {
        id: 'sql-query',
        title: 'JOINs, Aggregation, and Filtering',
        description: 'Combining records from multiple tables with GROUP BY.',
        code: `-- Querying average study time per language for active students
SELECT 
    l.language_name,
    COUNT(s.student_id) AS total_students,
    ROUND(AVG(s.study_time_hours), 2) AS avg_hours
FROM students s
JOIN languages l ON s.language_id = l.id
WHERE s.is_active = TRUE
GROUP BY l.language_name
HAVING AVG(s.study_time_hours) >= 2.0
ORDER BY avg_hours DESC;`,
        simulatedOutput: `language_name | total_students | avg_hours
------------------------------------------
Python        | 1420           | 4.25
Rust          | 850            | 3.80
JavaScript    | 2100           | 3.10`,
        explanation: '`JOIN` merges related tables on matching keys. `GROUP BY` and `HAVING` aggregate and filter grouped result sets.'
      }
    ],
    commonUseCases: [
      'Relational Database Management & Schema Queries',
      'Data Analytics, Reporting, & Business Intelligence',
      'Backend Application Data Storage & Persistence'
    ],
    learningRoadmap: [
      '1. Basic Commands: SELECT, FROM, WHERE, ORDER BY, LIMIT',
      '2. Data Manipulation: INSERT, UPDATE, DELETE, CREATE TABLE',
      '3. Relationships & JOINs: INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN',
      '4. Aggregations: GROUP BY, HAVING, COUNT, SUM, AVG, MIN, MAX',
      '5. Advanced: CTEs (WITH clause), Window Functions (ROW_NUMBER, RANK), Indexing'
    ]
  },
  {
    id: 'swift',
    name: 'Swift',
    categoryId: 'mobile',
    categoryName: 'Mobile Development',
    iconName: 'Smartphone',
    themeColor: 'amber',
    accentHex: '#f05138',
    tagline: 'Powerful and intuitive language developed by Apple for building apps across iOS, iPadOS, macOS, and watchOS.',
    yearCreated: 2014,
    createdByName: 'Chris Lattner (Apple)',
    paradigm: 'Multi-paradigm: Protocol-Oriented, Object-Oriented, Functional, Concurrent',
    difficultyRating: 'Beginner',
    overview: 'Swift is Apple\'s flagship programming language for app development across Apple devices. Combined with SwiftUI, it offers declarative live-preview UI creation with safe Optionals and modern concurrency.',
    compilerOrRuntime: 'swiftc (LLVM compiler framework), Xcode',
    keyFeatures: [
      'Safe Optionals and Option Binding (eliminates null pointer crashes)',
      'Protocol-Oriented Programming paradigm',
      'SwiftUI: Declarative user interface framework with live design canvas',
      'Modern Async/Await concurrency model',
      'Automatic Reference Counting (ARC) memory management'
    ],
    pros: [
      'Unrivaled native performance and fluid animations on Apple devices',
      'Clean, modern syntax with type inference',
      'SwiftUI makes building iOS interfaces lightning fast'
    ],
    cons: [
      'Primarily locked into Apple ecosystem (iOS, macOS, watchOS)',
      'Requires macOS and Xcode for official app compilation'
    ],
    popularFrameworks: [
      { name: 'SwiftUI', role: 'UI Framework', description: 'Declarative framework for designing interfaces across Apple devices.' },
      { name: 'Combine', role: 'Reactive Programming', description: 'Asynchronous event processing library.' },
      { name: 'Vapor', role: 'Server-Side Swift', description: 'HTTP web framework for building backend services in Swift.' }
    ],
    syntaxSnippets: [
      {
        id: 'swift-basics',
        title: 'SwiftUI Component & Optionals',
        description: 'Declarative SwiftUI view and safe optional binding.',
        code: `import SwiftUI

struct StudentCardView: View {
    let studentName: String
    @State private var studyHours: Double = 3.5

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("Student: \\(studentName)")
                .font(.headline)
            Text("Study Time: \\(studyHours, specifier: "%.1f") hrs")
                .foregroundColor(.secondary)
            Button("Log +1 Hour") {
                studyHours += 1.0
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }
}`,
        simulatedOutput: `[Rendered SwiftUI Card with Interactive Button]`,
        explanation: 'SwiftUI uses `@State` property wrappers for dynamic view state updates.'
      }
    ],
    commonUseCases: [
      'Native iOS / iPadOS App Development',
      'macOS Desktop Software',
      'watchOS & tvOS Applications',
      'Apple Vision Pro (visionOS) Spatial Apps'
    ],
    learningRoadmap: [
      '1. Swift Basics: Variables (let/var), Structs, Enums, Functions',
      '2. Optionals, Optional Binding (if let, guard let), and Guard Statements',
      '3. Protocols and Protocol-Oriented Programming',
      '4. SwiftUI Fundamentals: Views, Modifiers, @State, @Binding, @EnvironmentObject',
      '5. Networking (URLSession), Async/Await, and CoreData / SwiftData'
    ]
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    categoryId: 'mobile',
    categoryName: 'Mobile Development',
    iconName: 'Smartphone',
    themeColor: 'purple',
    accentHex: '#7f52ff',
    tagline: 'Modern, concise, and safe programming language recommended by Google for native Android app development.',
    yearCreated: 2011,
    createdByName: 'JetBrains',
    paradigm: 'Multi-paradigm: Object-oriented, Functional, Strongly Typed',
    difficultyRating: 'Beginner',
    overview: 'Kotlin is Google\'s official preferred language for Android development. Fully interoperable with Java, Kotlin eliminates NullPointerExceptions with null safety and provides lightweight Coroutines for async execution.',
    compilerOrRuntime: 'kotlinc (compiles to JVM Bytecode, Native, or JS)',
    keyFeatures: [
      'Built-in Null Safety (`String?` vs `String`)',
      'Kotlin Coroutines for lightweight non-blocking async tasks',
      '100% two-way interoperability with existing Java code',
      'Jetpack Compose: Modern declarative UI toolkit for Android',
      'Data classes, extension functions, and smart casts'
    ],
    pros: [
      'Cuts code verbosity by ~40% compared to Java',
      'Official standard for modern Android app development',
      'Kotlin Multiplatform (KMP) enables sharing code between Android & iOS'
    ],
    cons: [
      'Slightly slower initial compilation time than pure Java',
      'Kotlin Multiplatform is still evolving compared to React Native / Flutter'
    ],
    popularFrameworks: [
      { name: 'Jetpack Compose', role: 'Android UI', description: 'Declarative UI toolkit for building native Android interfaces.' },
      { name: 'Ktor', role: 'Web & Client', description: 'Asynchronous framework for creating microservices and HTTP clients.' },
      { name: 'KMP (Multiplatform)', role: 'Cross-Platform', description: 'Share business logic across iOS, Android, and Web.' }
    ],
    syntaxSnippets: [
      {
        id: 'kotlin-basics',
        title: 'Coroutines and Data Classes',
        description: 'Concise data models and non-blocking asynchronous coroutines.',
        code: `import kotlinx.coroutines.*

data class StudentProgress(val name: String, val streak: Int)

fun main() = runBlocking {
    val student = StudentProgress("Elena", 12)
    
    println("Student: \${student.name}, Streak: \${student.streak} days")

    // Launching async coroutine
    launch {
        delay(200)
        println("Coroutine: Study time synced to cloud!")
    }
}`,
        simulatedOutput: `Student: Elena, Streak: 12 days\nCoroutine: Study time synced to cloud!`,
        explanation: 'Data classes auto-generate getters, `copy()`, and `toString()`. Coroutines make background async tasks concise.'
      }
    ],
    commonUseCases: [
      'Native Android Mobile App Development (Jetpack Compose)',
      'Kotlin Multiplatform (KMP) Cross-Platform Logic Sharing',
      'Backend Server Web Development (Ktor, Spring Boot with Kotlin)',
      'Desktop & Embedded Interfaces'
    ],
    learningRoadmap: [
      '1. Kotlin Syntax: val vs var, Null Safety (?, ?:, !!), When expressions',
      '2. Functions, Lambdas, Extension Functions, Higher-Order Functions',
      '3. Data Classes, Sealed Classes, Smart Casts, Enums',
      '4. Kotlin Coroutines & Flow for Asynchronous Execution',
      '5. Android App Dev: Jetpack Compose, ViewModel, Navigation, Room'
    ]
  },
  {
    id: 'csharp',
    name: 'C# (.NET)',
    categoryId: 'backend',
    categoryName: 'Backend & Cloud',
    iconName: 'Code',
    themeColor: 'indigo',
    accentHex: '#239120',
    tagline: 'Versatile multi-purpose language developed by Microsoft for web backend services, enterprise solutions, and Unity game development.',
    yearCreated: 2000,
    createdByName: 'Anders Hejlsberg (Microsoft)',
    paradigm: 'Multi-paradigm: Object-oriented, Component-oriented, Strongly Typed',
    difficultyRating: 'Intermediate',
    overview: 'C# is a modern, object-oriented language that runs on the cross-platform .NET runtime. It is the dominant choice for Unity 3D game creation and enterprise web applications via ASP.NET Core.',
    compilerOrRuntime: 'Roslyn Compiler, .NET Runtime (Cross-platform)',
    keyFeatures: [
      'LINQ (Language Integrated Query) for querying collections seamlessly',
      'Async/Await pattern natively integrated into the language',
      'Unity Engine integration for 2D/3D game development',
      'ASP.NET Core: High-performance web APIs and Blazor web apps',
      'Cross-platform execution on Windows, Linux, and macOS'
    ],
    pros: [
      'Outstanding LINQ syntax for collection querying',
      'Top choice for game developers using Unity',
      'Enterprise stability backed by Microsoft .NET ecosystem'
    ],
    cons: [
      'Heavy reliance on the .NET runtime ecosystem',
      'Slight legacy historical association with Windows-only software (though .NET Core is cross-platform)'
    ],
    popularFrameworks: [
      { name: 'ASP.NET Core', role: 'Web Backend', description: 'Cross-platform framework for building high-performance web APIs.' },
      { name: 'Unity 3D', role: 'Game Engine', description: 'World-renowned game engine using C# for scripting.' },
      { name: 'Entity Framework Core', role: 'Database ORM', description: 'Object-relational mapper for database access.' }
    ],
    syntaxSnippets: [
      {
        id: 'cs-linq',
        title: 'LINQ Queries & Async Task Methods',
        description: 'Querying list collections with LINQ and async execution.',
        code: `using System;
using System.Linq;
using System.Collections.Generic;

class Program {
    static void Main() {
        var scores = new List<int> { 85, 92, 78, 95, 88 };

        // LINQ Query
        var topScores = scores.Where(s => s >= 90).OrderByDescending(s => s);

        Console.WriteLine("Top Scores: " + string.Join(", ", topScores));
    }
}`,
        simulatedOutput: `Top Scores: 95, 92`,
        explanation: 'LINQ allows querying objects, database records, and XML in C# using SQL-like syntax directly in code.'
      }
    ],
    commonUseCases: [
      'Enterprise Backend Web Services & Microservices (ASP.NET Core)',
      '2D/3D Game Development (Unity Game Engine)',
      'Cross-Platform Desktop & Mobile Apps (.NET MAUI, Avalonia)',
      'Cloud Native Applications on Microsoft Azure'
    ],
    learningRoadmap: [
      '1. C# Basics: Data Types, Classes, Methods, Properties, Access Modifiers',
      '2. Object-Oriented C#: Inheritance, Interfaces, Abstract Classes, Polymorphism',
      '3. LINQ (Language Integrated Query) and Collections',
      '4. Asynchronous Programming (Task, async/await)',
      '5. ASP.NET Core Web APIs or Unity Scripting'
    ]
  },
  {
    id: 'rust-scripting',
    name: 'Bash / Shell',
    categoryId: 'scripting',
    categoryName: 'Functional & Scripting',
    iconName: 'Terminal',
    themeColor: 'rose',
    accentHex: '#4eaa25',
    tagline: 'The command-line interpreter and scripting language for automating Linux systems, CI/CD pipelines, and cloud servers.',
    yearCreated: 1989,
    createdByName: 'Brian Fox (GNU Project)',
    paradigm: 'Command-line Interpreter, Scripting, Automation',
    difficultyRating: 'Beginner',
    overview: 'Bash (Bourne Again SHell) is the default command-line shell on most Linux distributions and macOS. It allows developers and system administrators to automate tasks, orchestrate deployment scripts, and manage cloud servers.',
    compilerOrRuntime: 'GNU Bash, Zsh, Sh',
    keyFeatures: [
      'Command chaining via Unix pipes (`|`)',
      'File manipulation, text processing with `grep`, `sed`, `awk`',
      'Process execution and environment variable management',
      'Automation of deployment scripts and CI/CD workflows'
    ],
    pros: [
      'Pre-installed on virtually all Linux and macOS servers',
      'Indispensable tool for cloud, DevOps, and backend developers',
      'Direct interaction with OS processes and file systems'
    ],
    cons: [
      'Cryptic syntax for complex data structures and error handling',
      'Differences between OS shell variants (Bash vs Zsh vs Dash)'
    ],
    popularFrameworks: [
      { name: 'GitHub Actions', role: 'CI/CD Automation', description: 'Automate build and deployment scripts.' },
      { name: 'Docker / Linux Scripts', role: 'Container Startup', description: 'Initialize container runtime configurations.' }
    ],
    syntaxSnippets: [
      {
        id: 'bash-script',
        title: 'Shell Scripting & Loops',
        description: 'Automating study logs with loops and environment variables.',
        code: `#!/bin/bash

# Simple Study Time Logger Script
STUDENT_NAME="Alex"
LANGUAGES=("Python" "JavaScript" "Rust" "Go")

echo "=== DevLearn Study Backup for $STUDENT_NAME ==="

for LANG in "\${LANGUAGES[@]}"; do
    echo "Backing up study logs for: $LANG..."
done

echo "Status: Backup Complete!"`,
        simulatedOutput: `=== DevLearn Study Backup for Alex ===\nBacking up study logs for: Python...\nBacking up study logs for: JavaScript...\nBacking up study logs for: Rust...\nBacking up study logs for: Go...\nStatus: Backup Complete!`,
        explanation: 'Bash scripts automate repetitive operating system commands.'
      }
    ],
    commonUseCases: [
      'Linux Server Administration & Maintenance',
      'CI/CD Pipeline Automation (GitHub Actions, GitLab CI)',
      'Docker Container Entrypoint Execution Scripts'
    ],
    learningRoadmap: [
      '1. Basic CLI Commands: cd, ls, mkdir, cp, mv, rm, chmod',
      '2. Variables, Input Parameters ($1, $2), and Environment Variables',
      '3. Pipes (|), Redirection (>, >>), and Command Substitution',
      '4. Control Flow: if/else, for loops, while loops',
      '5. Utility Tools: grep, find, awk, sed, curl'
    ]
  }
];
