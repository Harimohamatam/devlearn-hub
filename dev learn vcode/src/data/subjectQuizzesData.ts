import { Quiz, QuizQuestion } from '../types';

type Fact = [topic: string, answer: string, wrong1: string, wrong2: string, wrong3: string];

const FACTS: Record<string, { name: string; facts: Fact[] }> = {
  typescript: { name: 'TypeScript', facts: [
    ['Static typing','checks many type errors before runtime','only checks CSS styles','removes JavaScript from the project','runs SQL queries'],
    ['Type inference','lets the compiler determine many types automatically','requires every value to be typed manually','converts TypeScript to Java','stores values in a database'],
    ['Interfaces','describe the shape and contract of objects','execute network requests','replace all functions','compile HTML templates'],
    ['Union types','allow a value to be one of several specified types','make every value any','disable type checking','force inheritance'],
    ['Type narrowing','uses checks to safely determine a more specific type','compresses JavaScript bundles','renames variables','starts a server'],
    ['Generics','reuse code while preserving relationships between types','store only strings','remove all runtime values','replace interfaces with SQL'],
    ['Partial<T>','makes properties of an existing type optional','makes every property private','converts objects to arrays','creates database tables'],
    ['Type guards','provide reusable runtime checks that help TypeScript narrow types','format source code','install packages','run unit tests automatically'],
    ['strict mode','enables stronger compile-time checks including safer null handling','turns off the compiler','allows every value to be any','removes interfaces'],
    ['unknown','represents an unknown value that must be checked before unsafe use','is identical to never','means the value is always a string','is only for arrays'],
    ['readonly','prevents assignment through that property in the type system','deletes the property','makes code asynchronous','creates a class'],
    ['Record<K,V>','builds an object type whose keys and values follow specified types','creates a database index','runs a loop','declares a JavaScript module'],
    ['async function return type','is commonly Promise<T> for a future T value','must always be void','must always be number','cannot be typed'],
    ['intersection type','combines requirements from multiple types with &','chooses one type with |','turns a type into a string','removes all properties'],
    ['compile target','controls which JavaScript version TypeScript emits','chooses the database engine','sets the browser window size','changes npm registry credentials']
  ]},
  rust: { name: 'Rust', facts: [
    ['ownership','gives each value a clear owner and deterministic drop behavior','uses a garbage collector for every value','stores all values globally','allows unlimited aliases'],
    ['borrowing','lets code use a value through a reference without taking ownership','copies every value automatically','deletes a value immediately','turns Rust into C'],
    ['mutable reference','provides exclusive mutable access while borrowed','allows unlimited writers','is always global','can outlive every value'],
    ['struct','groups related fields into a custom data type','declares a database table','starts a thread','replaces Cargo'],
    ['enum','represents one of several variants and can carry data','only stores integers','is a package manager','is a loop construct'],
    ['match','performs exhaustive pattern matching','sorts vectors automatically','allocates memory manually','compiles Java'],
    ['Option<T>','represents either Some(value) or None','represents only errors','is a thread primitive','is a file handle'],
    ['Result<T,E>','models success with Ok or failure with Err','stores only strings','always panics','creates a socket'],
    ['trait','defines shared behavior that types can implement','is a mutable variable','is a database query','is a compiler flag'],
    ['generic type','lets one definition work with multiple concrete types','forces one concrete type forever','disables type checking','means dynamic typing'],
    ['iterator','provides a composable way to traverse and transform values','always creates a thread','is a database cursor only','replaces structs'],
    ['Cargo','manages Rust builds, dependencies, tests, and packages','is Rust’s garbage collector','is the borrow checker','is an editor'],
    ['borrow checker','enforces ownership and borrowing rules at compile time','runs code faster at runtime','downloads crates','formats HTML'],
    ['Send and Sync','are marker traits used to reason about safe concurrency','are SQL commands','are ownership operators','are file permissions'],
    ['panic!','stops normal execution when an unrecoverable condition is triggered','handles every recoverable error','creates a new process','starts a coroutine']
  ]},
  java: { name: 'Java', facts: [
    ['JVM','executes Java bytecode and enables platform portability','is Java’s package manager','stores source files only','replaces the compiler'],
    ['class','defines a blueprint for objects with fields and methods','is only a primitive value','is a SQL query','is a thread'],
    ['object','is an instance of a class created at runtime','is always a source file','is a package name','is a compiler error'],
    ['encapsulation','hides internal state behind controlled access','means every field is public','removes classes','forces multiple inheritance'],
    ['inheritance','lets a class derive behavior and structure from another class','is Java’s garbage collector','only applies to interfaces','creates database tables'],
    ['polymorphism','allows a common type to refer to different concrete implementations','means no method can be overridden','disables interfaces','means all objects have one type'],
    ['interface','defines a contract that implementing classes provide','is a concrete database row','must always contain fields with state','is a primitive'],
    ['ArrayList','is a resizable ordered List implementation','stores only unique keys','is a thread pool','is a compiler'],
    ['HashMap','associates keys with values','stores values only in sorted order','is a primitive type','creates JVM bytecode'],
    ['generics','provide compile-time type safety for reusable classes and methods','remove all types','make Java dynamically typed','replace the JVM'],
    ['checked exception','is an exception the compiler can require code to handle or declare','is always ignored','can only occur in the JVM','is a collection'],
    ['stream','supports declarative processing of collections and other data sources','is a network cable','is a class loader','is a primitive'],
    ['lambda','is a concise expression for behavior that can be passed as a value','is a database table','is a JVM process','is a package'],
    ['garbage collector','reclaims memory for objects that are no longer reachable','deletes source files','compiles Java code','manages HTTP routes'],
    ['Maven or Gradle','automates builds, dependencies, testing, and packaging','replaces the JVM','is a primitive type','is Java syntax for loops']
  ]},
  go: { name: 'Go (Golang)', facts: [
    [':=','declares and initializes local variables with type inference','declares database tables','starts a goroutine','closes a channel'],
    ['struct','groups related fields into a named data type','provides class inheritance','is a package manager','is a goroutine'],
    ['interface','describes behavior and is satisfied implicitly by matching methods','requires explicit inheritance','stores SQL rows','is a compiler directive'],
    ['error value','represents an expected failure returned by a function','is always a panic','is a goroutine','is a pointer'],
    ['goroutine','is a lightweight concurrent function execution managed by the Go runtime','is a database transaction','is a class','is a shell command'],
    ['channel','provides typed communication between goroutines','is only a file descriptor','stores package metadata','is a mutex'],
    ['select','waits on multiple channel operations and chooses a ready case','sorts a slice','starts the compiler','declares a struct'],
    ['defer','schedules a function call to run when the surrounding function returns','creates a goroutine','handles type inference','opens a database'],
    ['slice','is a flexible view over an underlying array','is an immutable tuple','is a class hierarchy','is a channel'],
    ['map','stores key-value associations','is a goroutine scheduler','is always ordered','is a pointer only'],
    ['go.mod','declares a module and records dependency information','contains only compiled machine code','is a UI file','replaces source packages'],
    ['gofmt','formats Go source code consistently','runs a database migration','starts a web server','checks passwords'],
    ['context.Context','carries cancellation, deadlines, and request-scoped values across API boundaries','is a replacement for goroutines','stores structs','formats code'],
    ['sync.Mutex','protects shared mutable state from concurrent access','creates a channel','runs SQL','is a type alias'],
    ['net/http','provides standard-library HTTP client and server functionality','is Go’s package manager','is the garbage collector','is a compiler']
  ]},
  cpp: { name: 'C++', facts: [
    ['const','prevents modification through that name or reference in the relevant context','allocates heap memory','creates a class','starts a thread'],
    ['reference','provides another name for an existing object','always owns heap memory','is a database key','is a namespace'],
    ['pointer','stores an address and can be dereferenced to access the pointed value','always manages lifetime safely','is a class','is an exception'],
    ['RAII','ties resource lifetime to object lifetime for automatic cleanup','means manual global allocation','is a loop syntax','is a database protocol'],
    ['constructor','initializes an object when it is created','destroys an object','sorts a vector','compiles templates'],
    ['virtual function','enables dynamic dispatch through a polymorphic base','forces compile-time dispatch only','allocates memory','is a namespace'],
    ['std::vector','is a dynamic contiguous sequence container','stores only key-value pairs','is a smart pointer','is a compiler'],
    ['std::map','stores key-value pairs with ordered keys','stores duplicate unordered values only','is a thread','is a lambda'],
    ['template','lets the compiler generate generic code for different types','is a runtime reflection system','is a database query','is a pointer'],
    ['unique_ptr','expresses single ownership of a dynamically allocated object','allows unrestricted shared ownership','is a raw pointer with no lifetime','is a vector'],
    ['shared_ptr','provides reference-counted shared ownership','is always faster than unique_ptr','cannot be copied','is a stack variable'],
    ['lambda','creates an inline callable object','is a database connection','is a compiler error','is a namespace'],
    ['move semantics','transfers resources instead of unnecessarily copying them','copies every byte twice','disables constructors','is only for integers'],
    ['STL algorithm','provides reusable operations such as sort, find, and transform','is a database engine','is a memory allocator only','is a class'],
    ['destructor','runs when an object’s lifetime ends and is used for cleanup','creates an object','starts a goroutine','compiles code']
  ]},
  sql: { name: 'SQL', facts: [
    ['SELECT','chooses columns or expressions to return','creates a programming language','deletes a database','starts a transaction automatically'],
    ['WHERE','filters individual rows before the result is returned','groups rows after aggregation','sorts columns','creates indexes'],
    ['ORDER BY','sorts query results','filters groups','creates tables','joins servers'],
    ['INSERT','adds rows to a table','removes rows','renames a database','creates a view only'],
    ['UPDATE','changes existing rows that match its condition','adds a new table','reads only metadata','starts a server'],
    ['DELETE','removes rows that match its condition','changes column types','creates a primary key','sorts data'],
    ['primary key','uniquely identifies rows in a table','allows duplicate identities by design','is always a text column','is a query result'],
    ['foreign key','references a key in another or the same table to model relationships','is a sort order','is a database password','is a stored procedure'],
    ['INNER JOIN','returns rows with matching join keys on both sides','returns every row from the left table','deletes unmatched rows','groups data'],
    ['LEFT JOIN','keeps all rows from the left side and matching rows from the right','returns only exact matches','always removes NULLs','sorts by primary key'],
    ['GROUP BY','forms groups for aggregate calculations','filters individual rows only','creates indexes','renames columns'],
    ['HAVING','filters groups after aggregation','filters rows before grouping','creates a table','sorts results'],
    ['CTE','defines a named temporary query result using WITH','creates a permanent table automatically','is a database password','replaces every JOIN'],
    ['window function','calculates across related rows while keeping row detail','always collapses rows into one result','only creates indexes','deletes duplicates'],
    ['transaction','groups changes so they can be committed or rolled back together','is only a SELECT statement','is a table index','is a column type']
  ]},
  swift: { name: 'Swift', facts: [
    ['let','declares a value that cannot be reassigned after initialization','starts a loop','creates an optional automatically','declares a class only'],
    ['var','declares mutable storage that can be reassigned','creates an immutable constant','starts an async task','is a protocol'],
    ['struct','defines a value type with properties and methods','is always a reference type','is a database table','is an exception'],
    ['enum','models a closed set of cases and can carry associated values','only stores strings','is a thread','replaces protocols'],
    ['optional','represents a value that may be absent','means the value is always non-nil','is only for arrays','is a class'],
    ['if let','unwraps an optional safely when a value exists','forces a crash','creates a protocol','starts a task'],
    ['protocol','defines requirements that conforming types implement','is a concrete object only','is a database schema','is a loop'],
    ['closure','is an anonymous function that can capture surrounding values','is a class constructor only','is a memory allocator','is a compiler'],
    ['map on a collection','transforms each element into a new value','removes all elements','sorts only strings','creates a dictionary'],
    ['filter on a collection','keeps elements that satisfy a condition','changes every element','creates a thread','deletes the collection'],
    ['do-catch','handles errors thrown by Swift functions','creates an optional','starts a view','compiles a package'],
    ['SwiftUI','builds UI declaratively from views and state','is Swift’s database engine','replaces the compiler','is a networking protocol'],
    ['@State','stores view-local state that can trigger SwiftUI updates','makes every property global','creates a thread','is a database annotation'],
    ['async/await','makes asynchronous control flow easier to read and compose','turns all code synchronous','disables error handling','replaces optionals'],
    ['actor','protects mutable state from data races in Swift concurrency','is a UI view only','is a database table','is a primitive integer']
  ]},
  kotlin: { name: 'Kotlin', facts: [
    ['val','declares a read-only reference after initialization','always creates a mutable variable','starts a coroutine','declares a database'],
    ['var','declares a reassignable variable','is immutable forever','is a class','is a coroutine'],
    ['null safety','uses nullable types and operators to reduce null reference errors','disables type checking','forces every value to be nullable','is only an Android feature'],
    ['?.','safely accesses a nullable value and returns null if needed','forces a non-null value','starts a coroutine','declares a class'],
    ['?:','provides an alternative value when the expression on the left is null','casts any value unsafely','creates a thread','is a loop'],
    ['data class','provides concise value-oriented models with generated utility methods','is only for UI','is a database table','disables equality'],
    ['when','is Kotlin’s expressive conditional matching construct','is a package manager','is a coroutine','is a class'],
    ['extension function','adds callable utility syntax to an existing type without modifying its source','changes the original class bytecode','creates inheritance','is a database trigger'],
    ['sealed class/interface','models a closed hierarchy of known variants','allows unlimited unrelated runtime subclasses only','is a primitive','is a thread'],
    ['lambda','is an anonymous function expression','is a data class','is a database connection','is a compiler'],
    ['coroutine','is a lightweight unit of suspending asynchronous work','is a JVM class loader','is a SQL query','is an OS process'],
    ['suspend','marks a function that can suspend within a coroutine context','makes a function run on another CPU automatically','creates a thread','means the function returns null'],
    ['Flow','represents an asynchronous stream of values','is a database table','is a UI button','is a compiler'],
    ['smart cast','lets Kotlin narrow a value’s type after a recognized check','converts strings to integers automatically','starts a coroutine','changes JVM bytecode'],
    ['Jetpack Compose','is Android’s declarative UI toolkit commonly used with Kotlin','is a database engine','is a compiler plugin only','is a networking protocol']
  ]},
  csharp: { name: 'C# (.NET)', facts: [
    ['property','provides controlled access to object state using get/set accessors','is always a database column','starts a task','is a namespace'],
    ['interface','defines a contract that classes or structs can implement','is a concrete object only','is a loop','is a SQL query'],
    ['inheritance','derives a type from a base type to reuse or specialize behavior','is garbage collection','is asynchronous execution','is a collection'],
    ['generic','allows reusable code to preserve type information','turns C# into dynamic typing','removes all constraints','is a UI element'],
    ['List<T>','stores an ordered resizable collection of values','stores only unique keys','is a thread','is a database'],
    ['Dictionary<TKey,TValue>','stores key-value associations','is always ordered by insertion','stores only strings','is an exception'],
    ['LINQ','provides query and transformation operators for collections and data sources','is a compiler','is a game engine','is a database server'],
    ['deferred execution','means some LINQ queries run when their results are enumerated','means queries always run at declaration time','disables filtering','creates a new thread'],
    ['Task','represents ongoing or future asynchronous work','is a database row','is a class modifier','is a pointer'],
    ['async/await','allows asynchronous operations to be composed without blocking in typical I/O code','forces every method onto a new thread','disables exceptions','is only for Unity'],
    ['dependency injection','provides dependencies from outside a class instead of constructing them internally','is a database join','is garbage collection','is a loop'],
    ['ASP.NET Core','is a cross-platform framework for web applications and APIs','is a compiler for C++','is a database engine','is a desktop-only UI toolkit'],
    ['middleware','is a component in the HTTP request/response pipeline','is a C# primitive','is a SQL index','is a Unity texture'],
    ['nullable reference types','help the compiler reason about possible null references','make all references null','remove garbage collection','disable properties'],
    ['Unity','uses C# scripting for gameplay and real-time application logic','is Microsoft’s database','is a .NET compiler','is a shell']
  ]},
  'rust-scripting': { name: 'Bash / Shell', facts: [
    ['shell','interprets commands and provides an interface to the operating system','is a database engine','is a compiled Java program','is a browser'],
    ['pwd','prints the current working directory','deletes the current directory','changes the password','starts a server'],
    ['ls','lists directory contents','moves a file','changes permissions','prints process IDs only'],
    ['mkdir','creates directories','removes files','prints text','joins commands'],
    ['pipe |','connects one command’s standard output to another command’s standard input','redirects output only to a file','changes file permissions','starts a background job'],
    ['>','redirects output to a file and normally replaces its existing contents','appends only','reads a file','creates a process group'],
    ['>>','appends redirected output to a file','deletes the file','changes ownership','reads stdin only'],
    ['export','makes a shell variable available to child processes','deletes an environment variable','compiles a script','starts a service'],
    ['exit code 0','conventionally indicates successful command completion','always means failure','means a command was skipped','means the shell exited unexpectedly'],
    ['for loop','repeats commands for a sequence of values or files','creates a database','changes permissions automatically','starts a server'],
    ['function','groups reusable shell commands and parameters','creates a binary executable automatically','is a file permission','is a process'],
    ['grep','searches text for matching patterns','compresses files only','changes directories','creates users'],
    ['chmod +x','adds an executable permission in the common Unix permission model','deletes execute permission','changes a file name','prints file contents'],
    ['set -e','causes a script to stop when a simple command returns non-zero in common Bash usage','ignores all errors','prints every command','creates a loop'],
    ['cron','schedules commands to run at specified times on Unix-like systems','is a text editor','is a package manager','is a shell variable']
  ]}
};

const makeQuestion = (languageId: string, fact: Fact, index: number): QuizQuestion => {
  const [topic, answer, ...wrong] = fact;
  const choices = [answer, ...wrong];
  const shift = index % 4;
  const options = choices.map((_, i) => choices[(i + shift) % 4]);
  const correctAnswerIndex = options.indexOf(answer);
  const difficulty = index < 5 ? 'Beginner' : index < 10 ? 'Intermediate' : 'Advanced';
  return {
    id: `${languageId}-subject-q-${index + 1}`,
    question: `In ${FACTS[languageId].name}, what is the best description of ${topic}?`,
    options,
    correctAnswerIndex,
    explanation: `${topic} is important because it ${answer.charAt(0).toLowerCase() + answer.slice(1)}.`,
    hint: `Think about the core purpose of ${topic}.`,
    codeSnippet: undefined
  };
};

export const SUBJECT_QUIZZES: Quiz[] = Object.entries(FACTS).flatMap(([languageId, data]) => {
  const allQuestions = data.facts.map((fact, index) => makeQuestion(languageId, fact, index));
  return [
    { id: `${languageId}-beginner-subject`, languageId, languageName: data.name, title: `${data.name}: Subject Fundamentals`, difficulty: 'beginner' as const, timeLimitMinutes: 5, questions: allQuestions.slice(0, 5) },
    { id: `${languageId}-intermediate-subject`, languageId, languageName: data.name, title: `${data.name}: Core Concepts`, difficulty: 'intermediate' as const, timeLimitMinutes: 8, questions: allQuestions.slice(0, 10) },
    { id: `${languageId}-advanced-subject`, languageId, languageName: data.name, title: `${data.name}: Advanced Knowledge`, difficulty: 'advanced' as const, timeLimitMinutes: 12, questions: allQuestions.slice(0, 15) }
  ];
});
