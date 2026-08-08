// ─────────────────────────────────────────────────────────────────────────────
// Curated per-topic resources.
// When a node's label matches a key here, the node ships these exact links —
// official docs and known-good tutorials that are *about that topic*.
// Keys are normalized labels: lowercase, no punctuation/emoji, spaces only.
// Fallback (see generate.mjs) covers everything else with topic-aware searches.
// k = docs | course | video | article | book | practice | cheatsheet | repo | community
// ─────────────────────────────────────────────────────────────────────────────

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const yt = (q) => ({ t: `${cap(q)} — tutorial (YouTube)`, u: `https://www.youtube.com/results?search_query=${encodeURIComponent(q + " tutorial")}`, k: "video" });
const so = (q) => ({ t: `${cap(q)} — Stack Overflow`, u: `https://stackoverflow.com/search?q=${encodeURIComponent(q)}`, k: "community" });

export const TOPIC_RESOURCES = {
  // ── programming fundamentals ───────────────────────────────────────────────
  "variables and constants": [
    { t: "JavaScript variables — MDN", u: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables", k: "docs" },
    { t: "Variables — JavaScript.info", u: "https://javascript.info/variables", k: "course" },
    { t: "W3Schools — JS variables", u: "https://www.w3schools.com/js/js_variables.asp", k: "article" },
  ],
  "data types": [
    { t: "JS data types — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures", k: "docs" },
    { t: "JavaScript.info — types", u: "https://javascript.info/types", k: "course" },
    { t: "Python data types — official docs", u: "https://docs.python.org/3/library/stdtypes.html", k: "docs" },
  ],
  "operators and expressions": [
    { t: "JS operators — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators", k: "docs" },
    { t: "JavaScript.info — operators", u: "https://javascript.info/operators", k: "course" },
    { t: "W3Schools — JS operators", u: "https://www.w3schools.com/js/js_operators.asp", k: "article" },
  ],
  "conditionals": [
    { t: "Making decisions — MDN", u: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals", k: "docs" },
    { t: "JavaScript.info — if/else", u: "https://javascript.info/ifelse", k: "course" },
    { t: "W3Schools — JS if else", u: "https://www.w3schools.com/js/js_if_else.asp", k: "article" },
  ],
  "loops": [
    { t: "Looping code — MDN", u: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code", k: "docs" },
    { t: "JavaScript.info — loops", u: "https://javascript.info/while-for", k: "course" },
    { t: "W3Schools — JS loops", u: "https://www.w3schools.com/js/js_loop_for.asp", k: "article" },
  ],
  "conditionals and loops": [
    { t: "Building blocks — MDN", u: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks", k: "docs" },
    { t: "freeCodeCamp — conditionals & loops", u: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/#basic-javascript", k: "course" },
    { t: "Khan Academy — programming", u: "https://www.khanacademy.org/computing/computer-programming/programming", k: "course" },
  ],
  "functions": [
    { t: "Functions — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions", k: "docs" },
    { t: "JavaScript.info — functions", u: "https://javascript.info/function-basics", k: "course" },
    { t: "Python functions — official docs", u: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions", k: "docs" },
  ],
  "functions and scope": [
    { t: "Scope — MDN", u: "https://developer.mozilla.org/en-US/docs/Glossary/Scope", k: "docs" },
    { t: "JavaScript.info — closures & scope", u: "https://javascript.info/closure", k: "course" },
    { t: "freeCodeCamp — function scope", u: "https://www.freecodecamp.org/news/scope-in-javascript/", k: "article" },
  ],
  "arrow functions": [
    { t: "Arrow functions — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions", k: "docs" },
    { t: "JavaScript.info — arrow functions", u: "https://javascript.info/arrow-functions-basics", k: "course" },
  ],
  "arrow functions and callbacks": [
    { t: "Arrow functions — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions", k: "docs" },
    { t: "JavaScript.info — callbacks", u: "https://javascript.info/callbacks", k: "course" },
    { t: "freeCodeCamp — callbacks explained", u: "https://www.freecodecamp.org/news/javascript-callback-functions-what-are-callbacks-in-js-and-how-to-use-them/", k: "article" },
  ],
  "closures": [
    { t: "Closures — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures", k: "docs" },
    { t: "JavaScript.info — closures", u: "https://javascript.info/closure", k: "course" },
    { t: "freeCodeCamp — closures in JS", u: "https://www.freecodecamp.org/news/understanding-javascript-closures/", k: "article" },
  ],
  "scope and closures": [
    { t: "Closures — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures", k: "docs" },
    { t: "JavaScript.info — closures", u: "https://javascript.info/closure", k: "course" },
    { t: "freeCodeCamp — scope & closures", u: "https://www.freecodecamp.org/news/scope-and-closures-in-javascript/", k: "article" },
  ],
  "hoisting": [
    { t: "Hoisting — MDN", u: "https://developer.mozilla.org/en-US/docs/Glossary/Hoisting", k: "docs" },
    { t: "JavaScript.info — variable hoisting", u: "https://javascript.info/var", k: "course" },
    { t: "freeCodeCamp — hoisting explained", u: "https://www.freecodecamp.org/news/what-is-hoisting-in-javascript/", k: "article" },
  ],
  "this binding": [
    { t: "this — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this", k: "docs" },
    { t: "JavaScript.info — this", u: "https://javascript.info/object-methods#this-in-methods", k: "course" },
    { t: "freeCodeCamp — this keyword", u: "https://www.freecodecamp.org/news/the-javascript-this-keyword-explained/", k: "article" },
  ],
  "strings": [
    { t: "JS strings — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String", k: "docs" },
    { t: "JavaScript.info — strings", u: "https://javascript.info/string", k: "course" },
    { t: "Python strings — docs", u: "https://docs.python.org/3/library/string.html", k: "docs" },
  ],
  "arrays": [
    { t: "JS arrays — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array", k: "docs" },
    { t: "JavaScript.info — arrays", u: "https://javascript.info/array", k: "course" },
    { t: "Python lists — docs", u: "https://docs.python.org/3/tutorial/datastructures.html", k: "docs" },
  ],
  "arrays and objects": [
    { t: "Arrays — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array", k: "docs" },
    { t: "JavaScript.info — objects", u: "https://javascript.info/object", k: "course" },
    { t: "freeCodeCamp — arrays & objects", u: "https://www.freecodecamp.org/news/javascript-array-and-object-destructuring-with-es6/", k: "article" },
  ],
  "maps and sets": [
    { t: "Map & Set — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map", k: "docs" },
    { t: "JavaScript.info — Map & Set", u: "https://javascript.info/map-set", k: "course" },
  ],
  "map and set": [
    { t: "Map & Set — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map", k: "docs" },
    { t: "JavaScript.info — Map & Set", u: "https://javascript.info/map-set", k: "course" },
  ],
  "collections and generics": [
    { t: "Generics — Java tutorials", u: "https://docs.oracle.com/javase/tutorial/java/generics/index.html", k: "docs" },
    { t: "Python collections — docs", u: "https://docs.python.org/3/library/collections.html", k: "docs" },
    { t: "Go slices — official docs", u: "https://go.dev/blog/slices-intro", k: "article" },
  ],
  "destructuring and spread": [
    { t: "Destructuring — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment", k: "docs" },
    { t: "JavaScript.info — destructuring", u: "https://javascript.info/destructuring-assignment", k: "course" },
    { t: "Spread syntax — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax", k: "docs" },
  ],
  "template literals": [
    { t: "Template literals — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals", k: "docs" },
    { t: "JavaScript.info — strings", u: "https://javascript.info/string", k: "course" },
    { t: "freeCodeCamp — template literals", u: "https://www.freecodecamp.org/news/template-literals-in-javascript/", k: "article" },
  ],
  "classes and objects": [
    { t: "Classes — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes", k: "docs" },
    { t: "JavaScript.info — classes", u: "https://javascript.info/class", k: "course" },
    { t: "Python classes — docs", u: "https://docs.python.org/3/tutorial/classes.html", k: "docs" },
  ],
  "object oriented programming": [
    { t: "OOP in JS — MDN", u: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects", k: "docs" },
    { t: "freeCodeCamp — OOP explained", u: "https://www.freecodecamp.org/news/object-oriented-programming-concepts-21bb035f7260/", k: "article" },
    { t: "Python OOP — official tutorial", u: "https://docs.python.org/3/tutorial/classes.html", k: "course" },
  ],
  "encapsulation": [
    { t: "Encapsulation — Wikipedia", u: "https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)", k: "article" },
    { t: "OOP concepts — GeeksforGeeks", u: "https://www.geeksforgeeks.org/encapsulation-in-java/", k: "article" },
  ],
  "inheritance and polymorphism": [
    { t: "Inheritance — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain", k: "docs" },
    { t: "Inheritance — Wikipedia", u: "https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)", k: "article" },
    { t: "Polymorphism — Wikipedia", u: "https://en.wikipedia.org/wiki/Polymorphism_(computer_science)", k: "article" },
  ],
  "interfaces and abstract classes": [
    { t: "Abstract classes & interfaces — Oracle", u: "https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html", k: "docs" },
    { t: "TypeScript interfaces — official docs", u: "https://www.typescriptlang.org/docs/handbook/interfaces.html", k: "docs" },
  ],
  "prototypes vs classes": [
    { t: "Prototype chain — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain", k: "docs" },
    { t: "JavaScript.info — prototypes", u: "https://javascript.info/prototype-inheritance", k: "course" },
  ],
  "pointers and memory": [
    { t: "Pointers — C tutorial", u: "https://www.geeksforgeeks.org/c-pointers/", k: "article" },
    { t: "Memory in C — Learn-C", u: "https://www.learn-c.org/en/Pointers", k: "course" },
    { t: "Rust ownership — official book", u: "https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html", k: "book" },
  ],
  "exception handling": [
    { t: "Errors & exceptions — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling", k: "docs" },
    { t: "Python exceptions — official docs", u: "https://docs.python.org/3/tutorial/errors.html", k: "docs" },
    { t: "JavaScript.info — try/catch", u: "https://javascript.info/try-catch", k: "course" },
  ],
  "exceptions and files": [
    { t: "Python exceptions — docs", u: "https://docs.python.org/3/tutorial/errors.html", k: "docs" },
    { t: "Reading & writing files — Python docs", u: "https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files", k: "docs" },
    { t: "File handling — W3Schools", u: "https://www.w3schools.com/java/java_files.asp", k: "article" },
  ],
  "file handling and io": [
    { t: "Python file I/O — docs", u: "https://docs.python.org/3/tutorial/inputoutput.html", k: "docs" },
    { t: "Node.js file system", u: "https://nodejs.org/api/fs.html", k: "docs" },
  ],
  "modules and imports": [
    { t: "JS modules — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules", k: "docs" },
    { t: "JavaScript.info — modules", u: "https://javascript.info/modules-intro", k: "course" },
    { t: "Python modules — docs", u: "https://docs.python.org/3/tutorial/modules.html", k: "docs" },
  ],
  "modules and ecosystem": [
    { t: "JS modules — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules", k: "docs" },
    { t: "npm — official docs", u: "https://docs.npmjs.com/", k: "docs" },
  ],
  "recursion": [
    { t: "Recursion — MDN (JS guide)", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#recursion", k: "docs" },
    { t: "freeCodeCamp — recursion explained", u: "https://www.freecodecamp.org/news/recursion-is-not-hard-858a48830d83/", k: "article" },
    { t: "Khan Academy — recursion", u: "https://www.khanacademy.org/computing/computer-science/algorithms/recursive-algorithms/a/recursion", k: "course" },
  ],
  "dynamic typing and coercion": [
    { t: "Type coercion — MDN", u: "https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion", k: "docs" },
    { t: "JavaScript.info — type conversions", u: "https://javascript.info/type-conversions", k: "course" },
  ],
  "let const vs var": [
    { t: "let & const — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let", k: "docs" },
    { t: "JavaScript.info — variables", u: "https://javascript.info/variables", k: "course" },
    { t: "freeCodeCamp — var vs let vs const", u: "https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/", k: "article" },
  ],
  "declarations vs expressions": [
    { t: "Function declarations vs expressions — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions", k: "docs" },
    { t: "JavaScript.info — function expressions", u: "https://javascript.info/function-expressions", k: "course" },
  ],
  "iifes and modules": [
    { t: "IIFE — MDN", u: "https://developer.mozilla.org/en-US/docs/Glossary/IIFE", k: "docs" },
    { t: "JavaScript.info — modules", u: "https://javascript.info/modules-intro", k: "course" },
  ],
  "input and output": [
    { t: "Console — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/API/console", k: "docs" },
    { t: "Python input & output — docs", u: "https://docs.python.org/3/tutorial/inputoutput.html", k: "docs" },
  ],
  "unit testing": [
    { t: "Testing frameworks — jest docs", u: "https://jestjs.io/docs/getting-started", k: "docs" },
    { t: "pytest — official docs", u: "https://docs.pytest.org/", k: "docs" },
    { t: "freeCodeCamp — unit testing guide", u: "https://www.freecodecamp.org/news/unit-testing-in-javascript/", k: "article" },
  ],
  "debugging techniques": [
    { t: "Chrome DevTools — debug JavaScript", u: "https://developer.chrome.com/docs/devtools/javascript/", k: "docs" },
    { t: "MDN — debugging HTML/CSS/JS", u: "https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing", k: "course" },
    { t: "Python debugging — docs (pdb)", u: "https://docs.python.org/3/library/pdb.html", k: "docs" },
  ],
  "code quality and linting": [
    { t: "ESLint — official docs", u: "https://eslint.org/docs/latest/", k: "docs" },
    { t: "Google style guides", u: "https://google.github.io/styleguide/", k: "docs" },
    { t: "Prettier — official docs", u: "https://prettier.io/docs/en/", k: "docs" },
  ],
  "code style and conventions": [
    { t: "Google style guides", u: "https://google.github.io/styleguide/", k: "docs" },
    { t: "Airbnb JavaScript style guide", u: "https://github.com/airbnb/javascript", k: "repo" },
  ],
  "language specific gotchas": [
    { t: "JS gotchas — JavaScript.info", u: "https://javascript.info/", k: "course" },
    so("language specific pitfalls"),
    yt("programming language pitfalls"),
  ],
  "recommended books and courses": [
    { t: "freeCodeCamp — free courses", u: "https://www.freecodecamp.org/learn", k: "course" },
    { t: "The Odin Project", u: "https://www.theodinproject.com/", k: "course" },
    { t: "CS50 — Harvard", u: "https://cs50.harvard.edu/x/", k: "course" },
  ],
  "real world problem sets": [
    { t: "LeetCode", u: "https://leetcode.com/problemset/", k: "practice" },
    { t: "Exercism — free exercises", u: "https://exercism.org/", k: "practice" },
    { t: "Codewars", u: "https://www.codewars.com/", k: "practice" },
  ],
  "getting started": [
    { t: "Learn web development — MDN", u: "https://developer.mozilla.org/en-US/docs/Learn", k: "course" },
    { t: "The Odin Project", u: "https://www.theodinproject.com/", k: "course" },
    { t: "freeCodeCamp", u: "https://www.freecodecamp.org/learn", k: "course" },
  ],
  "installation and setup": [
    { t: "freeCodeCamp — how to install dev tools", u: "https://www.freecodecamp.org/news/how-to-install-node-js-and-npm/", k: "article" },
    yt("installation and setup"),
    so("installation and setup"),
  ],
  "ide and tooling": [
    { t: "VS Code docs", u: "https://code.visualstudio.com/docs", k: "docs" },
    { t: "VS Code in 100 seconds", u: "https://www.youtube.com/watch?v=KMxo3T_MTvY", k: "video" },
    { t: "JetBrains IDEs", u: "https://www.jetbrains.com/ides/", k: "docs" },
  ],
  "running and debugging": [
    { t: "Chrome DevTools — debug", u: "https://developer.chrome.com/docs/devtools/javascript/", k: "docs" },
    { t: "MDN — debugging guide", u: "https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/JavaScript", k: "course" },
  ],
  "control flow": [
    { t: "Control flow — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling", k: "docs" },
    { t: "JavaScript.info — conditionals & loops", u: "https://javascript.info/ifelse", k: "course" },
  ],
  "data structures": [
    { t: "freeCodeCamp — Data Structures 101", u: "https://www.freecodecamp.org/news/data-structures-101-an-introduction-to-data-structures-and-algorithms/", k: "article" },
    { t: "NeetCode roadmap", u: "https://neetcode.io/roadmap", k: "practice" },
    { t: "Khan Academy — algorithms", u: "https://www.khanacademy.org/computing/computer-science/algorithms", k: "course" },
  ],
  "data structures algorithms": [
    { t: "NeetCode roadmap", u: "https://neetcode.io/roadmap", k: "practice" },
    { t: "freeCodeCamp — DS&A curriculum", u: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", k: "course" },
    { t: "The Algorithms — GitHub", u: "https://github.com/TheAlgorithms", k: "repo" },
  ],
  "data structures and algorithms": [
    { t: "NeetCode roadmap", u: "https://neetcode.io/roadmap", k: "practice" },
    { t: "freeCodeCamp — DS&A curriculum", u: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", k: "course" },
    { t: "The Algorithms — GitHub", u: "https://github.com/TheAlgorithms", k: "repo" },
  ],
  "arrays and strings": [
    { t: "NeetCode — arrays & strings", u: "https://neetcode.io/practice", k: "practice" },
    { t: "MDN — arrays", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array", k: "docs" },
    { t: "freeCodeCamp — string algorithms", u: "https://www.freecodecamp.org/news/string-methods-in-javascript/", k: "article" },
  ],
  "linked lists": [
    { t: "Linked lists — freeCodeCamp", u: "https://www.freecodecamp.org/news/implementing-a-linked-list-in-javascript/", k: "article" },
    { t: "Linked lists — GeeksforGeeks", u: "https://www.geeksforgeeks.org/data-structures/linked-list/", k: "article" },
    { t: "NeetCode — linked list problems", u: "https://neetcode.io/practice", k: "practice" },
  ],
  "stacks and queues": [
    { t: "Stacks & queues — freeCodeCamp", u: "https://www.freecodecamp.org/news/stack-and-queue-in-javascript/", k: "article" },
    { t: "GeeksforGeeks — stack & queue", u: "https://www.geeksforgeeks.org/stack-data-structure/", k: "article" },
    { t: "NeetCode — stack problems", u: "https://neetcode.io/practice", k: "practice" },
  ],
  "trees and graphs": [
    { t: "Trees — freeCodeCamp", u: "https://www.freecodecamp.org/news/all-you-need-to-know-about-tree-data-structures/", k: "article" },
    { t: "Graphs — freeCodeCamp", u: "https://www.freecodecamp.org/news/graph-data-structures-explained-with-examples/", k: "article" },
    { t: "NeetCode — tree & graph problems", u: "https://neetcode.io/practice", k: "practice" },
  ],
  "sorting and searching": [
    { t: "Sorting algorithms — Khan Academy", u: "https://www.khanacademy.org/computing/computer-science/algorithms", k: "course" },
    { t: "freeCodeCamp — sorting explained", u: "https://www.freecodecamp.org/news/sorting-algorithms-explained-with-examples-in-python-java-and-c/", k: "article" },
    { t: "GeeksforGeeks — searching algorithms", u: "https://www.geeksforgeeks.org/searching-algorithms/", k: "article" },
  ],
  "dynamic programming": [
    { t: "freeCodeCamp — DP explained", u: "https://www.freecodecamp.org/news/demystifying-dynamic-programming/", k: "article" },
    { t: "NeetCode — DP roadmap", u: "https://neetcode.io/practice", k: "practice" },
    { t: "CS50 — dynamic programming", u: "https://www.youtube.com/watch?v=OQ5jsbhAv_M", k: "video" },
  ],
  "sliding window": [
    { t: "Sliding window — NeetCode", u: "https://neetcode.io/courses/advanced-algorithms/0", k: "course" },
    { t: "freeCodeCamp — sliding window", u: "https://www.freecodecamp.org/news/sliding-window-technique/", k: "article" },
    { t: "Sliding window problems — LeetCode", u: "https://leetcode.com/tag/sliding-window/", k: "practice" },
  ],
  "two pointers": [
    { t: "Two pointers — LeetCode", u: "https://leetcode.com/tag/two-pointers/", k: "practice" },
    { t: "freeCodeCamp — two pointer technique", u: "https://www.freecodecamp.org/news/two-pointer-technique/", k: "article" },
    { t: "NeetCode — two pointers", u: "https://neetcode.io/practice", k: "practice" },
  ],
  "hash maps and two pointers": [
    { t: "Hash tables — freeCodeCamp", u: "https://www.freecodecamp.org/news/hash-tables/", k: "article" },
    { t: "NeetCode — hash map problems", u: "https://neetcode.io/practice", k: "practice" },
    { t: "Two pointers — LeetCode", u: "https://leetcode.com/tag/two-pointers/", k: "practice" },
  ],
  "bfs dfs": [
    { t: "BFS/DFS — freeCodeCamp", u: "https://www.freecodecamp.org/news/graph-traversal-bfs-and-dfs/", k: "article" },
    { t: "BFS & DFS — GeeksforGeeks", u: "https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/", k: "article" },
    { t: "NeetCode — graph problems", u: "https://neetcode.io/practice", k: "practice" },
  ],
  "binary search variants": [
    { t: "Binary search — Khan Academy", u: "https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search", k: "course" },
    { t: "Binary search — LeetCode", u: "https://leetcode.com/tag/binary-search/", k: "practice" },
    { t: "freeCodeCamp — binary search", u: "https://www.freecodecamp.org/news/binary-search-in-python/", k: "article" },
  ],
  "greedy and backtracking": [
    { t: "Greedy algorithms — GeeksforGeeks", u: "https://www.geeksforgeeks.org/greedy-algorithms/", k: "article" },
    { t: "Backtracking — GeeksforGeeks", u: "https://www.geeksforgeeks.org/backtracking-algorithms/", k: "article" },
    { t: "NeetCode — practice", u: "https://neetcode.io/practice", k: "practice" },
  ],
  "problem solving patterns": [
    { t: "14 patterns — freeCodeCamp", u: "https://www.freecodecamp.org/news/the-14-patterns-to-master-any-coding-interview-question/", k: "article" },
    { t: "NeetCode — patterns", u: "https://neetcode.io/roadmap", k: "practice" },
    { t: "Grokking patterns (Educative)", u: "https://www.educative.io/courses/grokking-the-coding-interview", k: "course" },
  ],
  "recognizing patterns": [
    { t: "Coding interview patterns — freeCodeCamp", u: "https://www.freecodecamp.org/news/the-14-patterns-to-master-any-coding-interview-question/", k: "article" },
    { t: "NeetCode roadmap", u: "https://neetcode.io/roadmap", k: "practice" },
  ],
  "complexity analysis": [
    { t: "Big O — freeCodeCamp", u: "https://www.freecodecamp.org/news/big-o-notation-why-it-matters-and-why-it-doesnt/", k: "article" },
    { t: "Big O notation — Khan Academy", u: "https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/big-o-notation", k: "course" },
    { t: "Big O cheat sheet", u: "https://www.bigocheatsheet.com/", k: "cheatsheet" },
  ],
  "coding practice leetcode": [
    { t: "LeetCode — problems", u: "https://leetcode.com/problemset/", k: "practice" },
    { t: "NeetCode roadmap", u: "https://neetcode.io/roadmap", k: "practice" },
    { t: "HackerRank", u: "https://www.hackerrank.com/domains/algorithms", k: "practice" },
  ],
  "whiteboard practice": [
    { t: "Pramp — free mock interviews", u: "https://www.pramp.com/", k: "practice" },
    { t: "freeCodeCamp — how to ace whiteboard", u: "https://www.freecodecamp.org/news/coding-interviews-for-dummies/", k: "article" },
    { t: "Interviewing.io", u: "https://interviewing.io/", k: "practice" },
  ],
  "thinking out loud": [
    { t: "How to think out loud — freeCodeCamp", u: "https://www.freecodecamp.org/news/how-to-ace-your-coding-interview/", k: "article" },
    so("think out loud during coding interviews"),
  ],
  "clarifying requirements": [
    { t: "System design primer — requirements", u: "https://github.com/donnemartin/system-design-primer", k: "repo" },
    so("clarifying requirements interview"),
  ],
  "testing your solution": [
    { t: "Test your solution — freeCodeCamp", u: "https://www.freecodecamp.org/news/coding-interview-cheatsheet/", k: "article" },
    so("testing edge cases coding interview"),
  ],
  "mock tests and practice": [
    { t: "IndiaBix — practice", u: "https://www.indiabix.com/", k: "practice" },
    { t: "Testbook — mock tests", u: "https://testbook.com/", k: "practice" },
    { t: "Pramp — mock interviews", u: "https://www.pramp.com/", k: "practice" },
  ],
  "core revision": [
    { t: "InterviewBit", u: "https://www.interviewbit.com/", k: "practice" },
    { t: "NeetCode roadmap", u: "https://neetcode.io/roadmap", k: "practice" },
    { t: "freeCodeCamp — full curriculum", u: "https://www.freecodecamp.org/learn", k: "course" },
  ],
  "core concepts refresher": [
    { t: "freeCodeCamp — core concepts", u: "https://www.freecodecamp.org/news/", k: "article" },
    yt("core concepts revision"),
  ],
  "key terminology": [
    { t: "Tech glossary — freeCodeCamp", u: "https://www.freecodecamp.org/news/glossary-of-terminology/", k: "article" },
    { t: "MDN Glossary", u: "https://developer.mozilla.org/en-US/docs/Glossary", k: "docs" },
  ],
  "revision schedule": [
    { t: "Spaced repetition — Wikipedia", u: "https://en.wikipedia.org/wiki/Spaced_repetition", k: "article" },
    { t: "Anki — spaced repetition app", u: "https://apps.ankiweb.net/", k: "practice" },
  ],
  "system design basics": [
    { t: "System Design Primer", u: "https://github.com/donnemartin/system-design-primer", k: "repo" },
    { t: "Grokking System Design", u: "https://www.educative.io/courses/grokking-modern-system-design-interview-for-engineers-managers", k: "course" },
    { t: "freeCodeCamp — system design intro", u: "https://www.freecodecamp.org/news/systems-design-for-interviews/", k: "article" },
  ],
  "understanding requirements": [
    { t: "System Design Primer — requirements", u: "https://github.com/donnemartin/system-design-primer", k: "repo" },
    so("system design requirements gathering"),
  ],
  "clean tested code": [
    { t: "Clean Code — freeCodeCamp summary", u: "https://www.freecodecamp.org/news/clean-code-practices/", k: "article" },
    { t: "Testing — jest docs", u: "https://jestjs.io/docs/getting-started", k: "docs" },
  ],
  "readme and run instructions": [
    { t: "GitHub — README guide", u: "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes", k: "docs" },
    { t: "Make a README", u: "https://www.makeareadme.com/", k: "article" },
  ],
  "behavioral questions star": [
    { t: "STAR method — The Muse", u: "https://www.themuse.com/advice/star-interview-method", k: "article" },
    { t: "Harvard — STAR interview guide", u: "https://hbr.org/2023/11/how-to-answer-behavioral-interview-questions", k: "article" },
  ],
  "the star method": [
    { t: "STAR method — The Muse", u: "https://www.themuse.com/advice/star-interview-method", k: "article" },
    { t: "HBR — behavioral interviews", u: "https://hbr.org/2023/11/how-to-answer-behavioral-interview-questions", k: "article" },
  ],
  "situation and task": [
    { t: "STAR method — The Muse", u: "https://www.themuse.com/advice/star-interview-method", k: "article" },
  ],
  "action": [
    { t: "STAR method — The Muse", u: "https://www.themuse.com/advice/star-interview-method", k: "article" },
  ],
  "result and metrics": [
    { t: "How to quantify achievements — The Muse", u: "https://www.themuse.com/advice/how-to-talk-about-your-accomplishments-in-an-interview", k: "article" },
    { t: "STAR method — The Muse", u: "https://www.themuse.com/advice/star-interview-method", k: "article" },
  ],
  "common behavioral questions": [
    { t: "Common behavioral questions — The Muse", u: "https://www.themuse.com/advice/behavioral-interview-questions", k: "article" },
    { t: "30 questions — HBR", u: "https://hbr.org/2023/11/how-to-answer-behavioral-interview-questions", k: "article" },
  ],
  "practice and delivery": [
    { t: "Mock interviews — Pramp", u: "https://www.pramp.com/", k: "practice" },
    yt("behavioral interview practice"),
  ],
  "tell me about yourself": [
    { t: "Tell me about yourself — The Muse", u: "https://www.themuse.com/advice/tell-me-about-yourself-interview-question", k: "article" },
    { t: "HBR — how to answer", u: "https://hbr.org/2021/12/how-to-answer-tell-me-about-yourself-in-a-job-interview", k: "article" },
  ],
  "why this role": [
    { t: "Why this role — The Muse", u: "https://www.themuse.com/advice/why-do-you-want-this-job", k: "article" },
    { t: "HBR — answer why this role", u: "https://hbr.org/2022/03/how-to-answer-why-do-you-want-this-job", k: "article" },
  ],
  "strengths and weaknesses": [
    { t: "Strengths & weaknesses — The Muse", u: "https://www.themuse.com/advice/what-are-your-greatest-strengths-weaknesses", k: "article" },
    { t: "HBR — strengths & weaknesses", u: "https://hbr.org/2021/07/how-to-answer-what-are-your-strengths-and-weaknesses", k: "article" },
  ],
  "behavioral scenarios": [
    { t: "Behavioral questions — The Muse", u: "https://www.themuse.com/advice/behavioral-interview-questions", k: "article" },
    { t: "HBR — behavioral answers", u: "https://hbr.org/2023/11/how-to-answer-behavioral-interview-questions", k: "article" },
  ],
  "questions to ask them": [
    { t: "Questions to ask — The Muse", u: "https://www.themuse.com/advice/questions-to-ask-in-an-interview", k: "article" },
    { t: "HBR — questions to ask", u: "https://hbr.org/2019/08/how-to-ask-great-questions-in-an-interview", k: "article" },
  ],
  "resume and linkedin": [
    { t: "Resume tips — Google careers", u: "https://careers.google.com/how-we-hire/resume-tips/", k: "article" },
    { t: "LinkedIn profile optimization", u: "https://www.linkedin.com/business/talent/blog", k: "article" },
  ],
  "resume structure and impact": [
    { t: "Resume tips — Google careers", u: "https://careers.google.com/how-we-hire/resume-tips/", k: "article" },
    { t: "How to write a resume — The Muse", u: "https://www.themuse.com/advice/how-to-write-a-resume", k: "article" },
  ],
  "action verbs and metrics": [
    { t: "Resume action verbs — The Muse", u: "https://www.themuse.com/advice/185-powerful-verbs-that-will-make-your-resume-awesome", k: "article" },
    { t: "Resume tips — Google careers", u: "https://careers.google.com/how-we-hire/resume-tips/", k: "article" },
  ],
  "tailoring per role": [
    { t: "Tailor your resume — The Muse", u: "https://www.themuse.com/advice/why-you-should-tailor-your-resume-to-each-job", k: "article" },
  ],
  "ats and keyword scanning": [
    { t: "ATS-friendly resumes — The Muse", u: "https://www.themuse.com/advice/ats-resume", k: "article" },
    { t: "ATS resume checker", u: "https://www.jobscan.co/", k: "practice" },
  ],
  "linkedin profile optimization": [
    { t: "LinkedIn optimization guide", u: "https://www.linkedin.com/business/talent/blog", k: "article" },
    { t: "The Muse — LinkedIn tips", u: "https://www.themuse.com/advice/how-to-use-linkedin-to-get-a-job", k: "article" },
  ],
  "portfolio proof of work": [
    { t: "GitHub — build a portfolio", u: "https://github.com/", k: "practice" },
    { t: "How to build a portfolio — freeCodeCamp", u: "https://www.freecodecamp.org/news/how-to-build-a-portfolio/", k: "article" },
  ],
  "choosing your best work": [
    { t: "Portfolio projects — freeCodeCamp", u: "https://www.freecodecamp.org/news/how-to-build-a-portfolio/", k: "article" },
  ],
  "structuring case studies": [
    { t: "Case study format — The Muse", u: "https://www.themuse.com/advice/consulting-case-interview", k: "article" },
    { t: "How to present case studies", u: "https://www.studiobinder.com/blog/case-study/", k: "article" },
  ],
  "project write ups": [
    { t: "GitHub README guide", u: "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes", k: "docs" },
    { t: "Make a README", u: "https://www.makeareadme.com/", k: "article" },
  ],
  "live demos and links": [
    { t: "Deploy for free — Vercel", u: "https://vercel.com/docs", k: "docs" },
    { t: "GitHub Pages", u: "https://pages.github.com/", k: "docs" },
  ],
  "presentation quality": [
    { t: "Presentation skills — HBR", u: "https://hbr.org/topic/presentations", k: "article" },
    yt("presentation skills"),
  ],
  "keeping it updated": [
    { t: "GitHub — update your portfolio", u: "https://docs.github.com/en", k: "docs" },
  ],
  "job portals and networking": [
    { t: "LinkedIn Jobs", u: "https://www.linkedin.com/jobs", k: "practice" },
    { t: "Indeed", u: "https://www.indeed.com/", k: "practice" },
    { t: "Remote jobs — We Work Remotely", u: "https://weworkremotely.com/", k: "practice" },
  ],
  "building a network": [
    { t: "Networking guide — The Muse", u: "https://www.themuse.com/advice/how-to-network", k: "article" },
    { t: "LinkedIn networking", u: "https://www.linkedin.com/business/talent/blog", k: "article" },
  ],
  "recruiters and referrals": [
    { t: "How referrals work — The Muse", u: "https://www.themuse.com/advice/how-to-ask-for-a-referral", k: "article" },
  ],
  "tracking applications": [
    { t: "Job search tracker — Notion", u: "https://www.notion.com/templates/job-application-tracker", k: "article" },
    { t: "How to organize a job search — The Muse", u: "https://www.themuse.com/advice/how-to-organize-your-job-search", k: "article" },
  ],
  "informational interviews": [
    { t: "Informational interviews — The Muse", u: "https://www.themuse.com/advice/informational-interviews", k: "article" },
    { t: "HBR — informational interviews", u: "https://hbr.org/2020/09/how-to-make-the-most-of-informational-interviews", k: "article" },
  ],
  "knowing your market worth": [
    { t: "Levels.fyi — salary data", u: "https://www.levels.fyi/", k: "practice" },
    { t: "Glassdoor salaries", u: "https://www.glassdoor.com/Salaries/index.htm", k: "practice" },
    { t: "Salary research — The Muse", u: "https://www.themuse.com/advice/how-to-research-a-salary-before-a-job-interview", k: "article" },
  ],
  "total compensation base bonus equity": [
    { t: "Levels.fyi — compensation", u: "https://www.levels.fyi/", k: "practice" },
    { t: "Understanding equity — The Muse", u: "https://www.themuse.com/advice/equity-compensation-explained", k: "article" },
  ],
  "salary negotiation": [
    { t: "Salary negotiation guide — HBR", u: "https://hbr.org/2020/08/how-to-negotiate-your-salary", k: "article" },
    { t: "The Muse — salary negotiation", u: "https://www.themuse.com/advice/salary-negotiation-tips", k: "article" },
  ],
  "negotiating the final offer": [
    { t: "HBR — negotiate the offer", u: "https://hbr.org/2020/08/how-to-negotiate-your-salary", k: "article" },
    { t: "Levels.fyi — negotiation data", u: "https://www.levels.fyi/", k: "practice" },
  ],
  "counter offers": [
    { t: "Counter-offers — The Muse", u: "https://www.themuse.com/advice/what-is-a-counter-offer", k: "article" },
    { t: "HBR — handling counter offers", u: "https://hbr.org/2019/10/should-you-take-the-counteroffer", k: "article" },
  ],
  "when to accept or walk away": [
    { t: "How to evaluate a job offer — The Muse", u: "https://www.themuse.com/advice/how-to-evaluate-a-job-offer", k: "article" },
  ],
  "talking about money early": [
    { t: "Salary conversations — HBR", u: "https://hbr.org/2021/04/how-to-talk-about-salary-in-an-interview", k: "article" },
    { t: "The Muse — salary questions", u: "https://www.themuse.com/advice/salary-interview-questions", k: "article" },
  ],
  "offer evaluation": [
    { t: "Evaluate a job offer — The Muse", u: "https://www.themuse.com/advice/how-to-evaluate-a-job-offer", k: "article" },
    { t: "Levels.fyi — offers", u: "https://www.levels.fyi/", k: "practice" },
  ],
  "comparing offers": [
    { t: "Compare offers — Levels.fyi", u: "https://www.levels.fyi/", k: "practice" },
    { t: "The Muse — compare job offers", u: "https://www.themuse.com/advice/how-to-compare-job-offers", k: "article" },
  ],
  "cost of living adjustments": [
    { t: "Numbeo — cost of living", u: "https://www.numbeo.com/cost-of-living/", k: "practice" },
    { t: "NerdWallet — cost of living calculator", u: "https://www.nerdwallet.com/cost-of-living-calculator", k: "practice" },
  ],
  "growth and learning potential": [
    { t: "Career growth — HBR", u: "https://hbr.org/topic/career-development", k: "article" },
  ],
  "company stability and culture": [
    { t: "Glassdoor — company reviews", u: "https://www.glassdoor.com/", k: "practice" },
    { t: "Blind — company culture", u: "https://www.teamblind.com/", k: "community" },
  ],
  "portfolio and proof of work": [
    { t: "GitHub — build a portfolio", u: "https://github.com/", k: "practice" },
    { t: "How to build a portfolio — freeCodeCamp", u: "https://www.freecodecamp.org/news/how-to-build-a-portfolio/", k: "article" },
  ],
  "portfolio links": [
    { t: "GitHub — build a portfolio", u: "https://github.com/", k: "practice" },
    { t: "Behance portfolio examples", u: "https://www.behance.net/", k: "community" },
  ],
  "case studies and aptitude": [
    { t: "IndiaBix — aptitude", u: "https://www.indiabix.com/", k: "practice" },
    { t: "Testbook — mock tests", u: "https://testbook.com/", k: "practice" },
  ],
  "speed and accuracy": [
    { t: "Testbook — practice tests", u: "https://testbook.com/", k: "practice" },
    { t: "IndiaBix — practice", u: "https://www.indiabix.com/", k: "practice" },
  ],
  "quick calculation techniques": [
    { t: "Vedic math — quick calculations", u: "https://www.vedicmaths.org/", k: "course" },
    yt("quick math tricks"),
  ],
  "avoiding careless errors": [
    { t: "Test-taking strategies — Testbook", u: "https://testbook.com/", k: "practice" },
    yt("avoid careless mistakes in exams"),
  ],
  "guessing strategies": [
    yt("exam guessing strategies"),
    { t: "IndiaBix — practice", u: "https://www.indiabix.com/", k: "practice" },
  ],
  "structuring answers": [
    { t: "STAR method — The Muse", u: "https://www.themuse.com/advice/star-interview-method", k: "article" },
    { t: "HBR — structure answers", u: "https://hbr.org/2023/11/how-to-answer-behavioral-interview-questions", k: "article" },
  ],
  "framework based answers": [
    { t: "STAR method — The Muse", u: "https://www.themuse.com/advice/star-interview-method", k: "article" },
    { t: "HBR — behavioral interviews", u: "https://hbr.org/2023/11/how-to-answer-behavioral-interview-questions", k: "article" },
  ],
  "presentation skills": [
    { t: "Presentation skills — HBR", u: "https://hbr.org/topic/presentations", k: "article" },
    yt("presentation skills for interviews"),
  ],
  "domain deep dives": [
    yt("industry deep dive"),
    { t: "Industry reports — HBR", u: "https://hbr.org/", k: "article" },
  ],
  "picking your niche": [
    { t: "Choose a niche — freeCodeCamp", u: "https://www.freecodecamp.org/news/how-to-pick-your-niche/", k: "article" },
  ],
  "staying current": [
    { t: "Hacker News", u: "https://news.ycombinator.com/", k: "community" },
    { t: "MDN — web platform news", u: "https://developer.mozilla.org/en-US/blog/", k: "article" },
  ],
  "telling the story": [
    { t: "Storytelling at work — HBR", u: "https://hbr.org/2019/10/the-power-of-storytelling-at-work", k: "article" },
  ],
  "highlighting decisions": [
    { t: "How to present decisions — HBR", u: "https://hbr.org/2019/11/8-ways-to-make-a-business-case", k: "article" },
  ],
  "metrics and impact": [
    { t: "Quantify your impact — The Muse", u: "https://www.themuse.com/advice/how-to-talk-about-your-accomplishments-in-an-interview", k: "article" },
  ],
  "handling questions": [
    { t: "Handle tough questions — HBR", u: "https://hbr.org/2021/06/how-to-answer-questions-you-dont-know-the-answer-to", k: "article" },
  ],
  "rehearsing the demo": [
    { t: "Demo skills — The Muse", u: "https://www.themuse.com/advice/", k: "article" },
    yt("product demo presentation"),
  ],
  "mock contests": [
    { t: "LeetCode contest", u: "https://leetcode.com/contest/", k: "practice" },
    { t: "Codeforces contests", u: "https://codeforces.com/contests", k: "practice" },
    { t: "HackerRank contests", u: "https://www.hackerrank.com/contests", k: "practice" },
  ],
  "tracking solved problems": [
    { t: "LeetCode — solved tracker", u: "https://leetcode.com/problemset/", k: "practice" },
    { t: "NeetCode — progress tracker", u: "https://neetcode.io/roadmap", k: "practice" },
  ],
  "writing clean code by hand": [
    { t: "Coding interview cheatsheet — freeCodeCamp", u: "https://www.freecodecamp.org/news/coding-interview-cheatsheet/", k: "article" },
    yt("write code on whiteboard interview"),
  ],
  "planning the solution": [
    { t: "System design primer — approach", u: "https://github.com/donnemartin/system-design-primer", k: "repo" },
    { t: "How to plan code — freeCodeCamp", u: "https://www.freecodecamp.org/news/how-to-think-like-a-programmer/", k: "article" },
  ],
  "designing the approach": [
    { t: "System Design Primer", u: "https://github.com/donnemartin/system-design-primer", k: "repo" },
    so("design the approach coding interview"),
  ],
  "take home projects": [
    { t: "Take-home challenge guide — The Muse", u: "https://www.themuse.com/advice/take-home-coding-challenges", k: "article" },
    { t: "GitHub — build & share", u: "https://github.com/", k: "practice" },
  ],
  "weak spots audit": [
    yt("interview weak spots"),
    { t: "NeetCode — practice", u: "https://neetcode.io/practice", k: "practice" },
  ],
  "core concepts and architecture": [
    yt("architecture fundamentals"),
    { t: "System Design Primer", u: "https://github.com/donnemartin/system-design-primer", k: "repo" },
  ],
  "interview preparation": [
    { t: "InterviewBit", u: "https://www.interviewbit.com/", k: "practice" },
    { t: "LeetCode", u: "https://leetcode.com/problemset/", k: "practice" },
    { t: "Pramp — mock interviews", u: "https://www.pramp.com/", k: "practice" },
  ],
  "technical interview": [
    { t: "System Design Primer", u: "https://github.com/donnemartin/system-design-primer", k: "repo" },
    { t: "LeetCode — practice", u: "https://leetcode.com/problemset/", k: "practice" },
    { t: "Interviewing.io", u: "https://interviewing.io/", k: "practice" },
  ],
  "interview skills": [
    { t: "Interview skills — The Muse", u: "https://www.themuse.com/advice/interview-tips", k: "article" },
    { t: "Pramp — practice", u: "https://www.pramp.com/", k: "practice" },
  ],
  "job hunting": [
    { t: "Job search guide — The Muse", u: "https://www.themuse.com/advice/job-search-guide", k: "article" },
    { t: "LinkedIn Jobs", u: "https://www.linkedin.com/jobs", k: "practice" },
  ],
  "job portals and networking": [
    { t: "LinkedIn Jobs", u: "https://www.linkedin.com/jobs", k: "practice" },
    { t: "Indeed", u: "https://www.indeed.com/", k: "practice" },
  ],
  "following up": [
    { t: "Thank-you notes after interviews — The Muse", u: "https://www.themuse.com/advice/thank-you-email-after-interview", k: "article" },
  ],
  "common questions": [
    { t: "Common interview questions — The Muse", u: "https://www.themuse.com/advice/interview-questions-and-answers", k: "article" },
  ],
  "key frameworks": [
    { t: "System design frameworks — HBR", u: "https://hbr.org/", k: "article" },
    so("key frameworks"),
  ],
  "quick reference notes": [
    { t: "Interview cheat sheets — freeCodeCamp", u: "https://www.freecodecamp.org/news/coding-interview-cheatsheet/", k: "article" },
  ],
  "spaced revision": [
    { t: "Spaced repetition — Wikipedia", u: "https://en.wikipedia.org/wiki/Spaced_repetition", k: "article" },
    { t: "Anki", u: "https://apps.ankiweb.net/", k: "practice" },
  ],
  "analyzing mistakes": [
    { t: "How to review mistakes — freeCodeCamp", u: "https://www.freecodecamp.org/news/how-to-learn-from-your-mistakes/", k: "article" },
  ],
  "improving speed": [
    { t: "Typing practice — Keybr", u: "https://www.keybr.com/", k: "practice" },
    yt("solve coding problems faster"),
  ],
  "consistency and revision": [
    { t: "Spaced repetition — Wikipedia", u: "https://en.wikipedia.org/wiki/Spaced_repetition", k: "article" },
    { t: "Anki", u: "https://apps.ankiweb.net/", k: "practice" },
  ],
  "fundamentals revision": [
    { t: "freeCodeCamp — curriculum", u: "https://www.freecodecamp.org/learn", k: "course" },
    { t: "Khan Academy — computing", u: "https://www.khanacademy.org/computing", k: "course" },
  ],
  "problem solving": [
    { t: "How to think like a programmer — freeCodeCamp", u: "https://www.freecodecamp.org/news/how-to-think-like-a-programmer/", k: "article" },
    { t: "Khan Academy — algorithms", u: "https://www.khanacademy.org/computing/computer-science/algorithms", k: "course" },
  ],

  // ── web development ────────────────────────────────────────────────────────
  html: [
    { t: "HTML — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/HTML", k: "docs" },
    { t: "W3Schools — HTML tutorial", u: "https://www.w3schools.com/html/", k: "course" },
    { t: "HTML cheat sheet", u: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element", k: "cheatsheet" },
  ],
  css: [
    { t: "CSS — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/CSS", k: "docs" },
    { t: "W3Schools — CSS tutorial", u: "https://www.w3schools.com/css/", k: "course" },
    { t: "CSS reference — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference", k: "cheatsheet" },
  ],
  javascript: [
    { t: "JavaScript — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", k: "docs" },
    { t: "JavaScript.info — The Modern JavaScript Tutorial", u: "https://javascript.info/", k: "course" },
    { t: "Eloquent JavaScript (free book)", u: "https://eloquentjavascript.net/", k: "book" },
  ],
  typescript: [
    { t: "TypeScript official docs", u: "https://www.typescriptlang.org/docs/", k: "docs" },
    { t: "TypeScript handbook", u: "https://www.typescriptlang.org/docs/handbook/intro.html", k: "docs" },
    { t: "TypeScript — freeCodeCamp course", u: "https://www.freecodecamp.org/news/learn-typescript-beginners-guide/", k: "course" },
  ],
  dom: [
    { t: "Document Object Model — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model", k: "docs" },
    { t: "JavaScript.info — DOM", u: "https://javascript.info/document", k: "course" },
  ],
  "dom manipulation": [
    { t: "Manipulating documents — MDN", u: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents", k: "course" },
    { t: "JavaScript.info — DOM", u: "https://javascript.info/document", k: "course" },
  ],
  "media queries": [
    { t: "Media queries — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries", k: "docs" },
    { t: "Responsive design — web.dev", u: "https://web.dev/learn/design/", k: "course" },
  ],
  breakpoints: [
    { t: "Responsive breakpoints — web.dev", u: "https://web.dev/learn/design/responsive/", k: "course" },
    { t: "Media queries — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries", k: "docs" },
  ],
  "mobile first approach": [
    { t: "Mobile-first — web.dev", u: "https://web.dev/learn/design/mobile-first/", k: "course" },
    { t: "Responsive web design — MDN", u: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design", k: "course" },
  ],
  "responsive design": [
    { t: "Responsive design — MDN", u: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design", k: "course" },
    { t: "Learn responsive design — web.dev", u: "https://web.dev/learn/design/", k: "course" },
    { t: "Responsive cheat sheet — CSS-Tricks", u: "https://css-tricks.com/snippets/css/media-queries-for-standard-devices/", k: "cheatsheet" },
  ],
  "fluid layouts and units": [
    { t: "CSS units — MDN", u: "https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units", k: "docs" },
    { t: "Flexbox & Grid — web.dev", u: "https://web.dev/learn/css/flexbox/", k: "course" },
  ],
  "images and responsive media": [
    { t: "Responsive images — MDN", u: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images", k: "course" },
    { t: "Image optimization — web.dev", u: "https://web.dev/learn/images/", k: "course" },
  ],
  "testing across devices": [
    { t: "Cross-browser testing — MDN", u: "https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing", k: "course" },
    { t: "BrowserStack", u: "https://www.browserstack.com/", k: "practice" },
  ],
  "accessibility a11y": [
    { t: "Accessibility — MDN", u: "https://developer.mozilla.org/en-US/docs/Learn/Accessibility", k: "course" },
    { t: "Accessibility — web.dev", u: "https://web.dev/learn/accessibility/", k: "course" },
    { t: "A11y project checklist", u: "https://www.a11yproject.com/checklist/", k: "cheatsheet" },
  ],
  accessibility: [
    { t: "Accessibility — MDN", u: "https://developer.mozilla.org/en-US/docs/Learn/Accessibility", k: "course" },
    { t: "Accessibility — web.dev", u: "https://web.dev/learn/accessibility/", k: "course" },
    { t: "A11y project checklist", u: "https://www.a11yproject.com/checklist/", k: "cheatsheet" },
  ],
  "aria roles and attributes": [
    { t: "ARIA — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA", k: "docs" },
    { t: "ARIA — web.dev", u: "https://web.dev/learn/accessibility/aria-html/", k: "course" },
  ],
  "form controls": [
    { t: "Form controls — MDN", u: "https://developer.mozilla.org/en-US/docs/Learn/Forms", k: "course" },
    { t: "HTML forms — W3Schools", u: "https://www.w3schools.com/html/html_forms.asp", k: "article" },
  ],
  "labels and accessibility": [
    { t: "Form labels — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label", k: "docs" },
    { t: "Labels — web.dev", u: "https://web.dev/learn/accessibility/labels/", k: "course" },
  ],
  "client side validation": [
    { t: "Client-side form validation — MDN", u: "https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation", k: "course" },
    { t: "HTML validation — W3Schools", u: "https://www.w3schools.com/js/js_validation_api.asp", k: "article" },
  ],
  "server side validation": [
    { t: "Form validation — MDN", u: "https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation", k: "course" },
    so("server side validation"),
  ],
  "error handling ux": [
    { t: "Error messages — NN/g", u: "https://www.nngroup.com/articles/error-message-guidelines/", k: "article" },
    { t: "Form UX — NN/g", u: "https://www.nngroup.com/articles/form-design/", k: "article" },
  ],
  "keyboard navigation": [
    { t: "Keyboard accessibility — web.dev", u: "https://web.dev/learn/accessibility/keyboard/", k: "course" },
    { t: "Keyboard — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets", k: "docs" },
  ],
  "screen reader testing": [
    { t: "Screen readers — web.dev", u: "https://web.dev/learn/accessibility/screen-readers/", k: "course" },
    { t: "NVDA screen reader", u: "https://www.nvaccess.org/", k: "practice" },
  ],
  "contrast and hierarchy": [
    { t: "Contrast — NN/g", u: "https://www.nngroup.com/articles/contrast-why-it-matters/", k: "article" },
    { t: "Visual hierarchy — NN/g", u: "https://www.nngroup.com/articles/visual-hierarchy-ux-definition/", k: "article" },
  ],
  "alignment and spacing": [
    { t: "Spacing — NN/g", u: "https://www.nngroup.com/articles/white-space-in-ui-design/", k: "article" },
    { t: "Laws of UX — spacing", u: "https://lawsofux.com/", k: "article" },
  ],
  whitespace: [
    { t: "White space in UI — NN/g", u: "https://www.nngroup.com/articles/white-space-in-ui-design/", k: "article" },
    { t: "Laws of UX", u: "https://lawsofux.com/", k: "article" },
  ],
  "image optimization": [
    { t: "Image optimization — web.dev", u: "https://web.dev/learn/images/", k: "course" },
    { t: "Images — web.dev", u: "https://web.dev/articles/fast#optimize-your-images", k: "article" },
  ],
  "formats webp avif": [
    { t: "Image formats — web.dev", u: "https://web.dev/learn/images/avif/", k: "course" },
    { t: "WebP — Google", u: "https://developers.google.com/speed/webp", k: "docs" },
  ],
  "browser devtools": [
    { t: "Chrome DevTools docs", u: "https://developer.chrome.com/docs/devtools", k: "docs" },
    { t: "DevTools in 100 seconds", u: "https://www.youtube.com/watch?v=gTVpBwqoNfs", k: "video" },
  ],
  "css and preprocessors": [
    { t: "Sass official docs", u: "https://sass-lang.com/documentation/", k: "docs" },
    { t: "Tailwind CSS docs", u: "https://tailwindcss.com/docs", k: "docs" },
    { t: "CSS — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/CSS", k: "docs" },
  ],
  "flexbox and grid": [
    { t: "Flexbox — MDN", u: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox", k: "course" },
    { t: "Grid — MDN", u: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids", k: "course" },
    { t: "Flexbox Froggy (game)", u: "https://flexboxfroggy.com/", k: "practice" },
  ],
  "semantic html": [
    { t: "HTML semantics — MDN", u: "https://developer.mozilla.org/en-US/docs/Glossary/Semantics", k: "docs" },
    { t: "Semantic HTML — web.dev", u: "https://web.dev/learn/html/semantic-html/", k: "course" },
  ],
  "box model": [
    { t: "The box model — MDN", u: "https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model", k: "course" },
    { t: "Box model — web.dev", u: "https://web.dev/learn/css/box-model/", k: "course" },
  ],
  "css specificity": [
    { t: "Specificity — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity", k: "docs" },
    { t: "Specificity — web.dev", u: "https://web.dev/learn/css/specificity/", k: "course" },
  ],
  "css animations": [
    { t: "CSS transitions & animations — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations", k: "docs" },
    { t: "Animations — web.dev", u: "https://web.dev/learn/css/animations/", k: "course" },
  ],
  "api design": [
    { t: "REST API design — MDN", u: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps", k: "course" },
    { t: "RESTful API design best practices", u: "https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/", k: "article" },
  ],

  // ── frameworks ─────────────────────────────────────────────────────────────
  react: [
    { t: "React official docs", u: "https://react.dev/", k: "docs" },
    { t: "Learn React — official tutorial", u: "https://react.dev/learn", k: "course" },
    { t: "The Odin Project — React", u: "https://www.theodinproject.com/paths/full-stack-javascript/courses/react", k: "course" },
  ],
  vue: [
    { t: "Vue official docs", u: "https://vuejs.org/guide/introduction.html", k: "docs" },
    { t: "Vue tutorial", u: "https://vuejs.org/tutorial/", k: "course" },
  ],
  angular: [
    { t: "Angular official docs", u: "https://angular.dev/", k: "docs" },
    { t: "Angular tutorial", u: "https://angular.dev/tutorials", k: "course" },
  ],
  svelte: [
    { t: "Svelte official docs", u: "https://svelte.dev/docs", k: "docs" },
    { t: "Svelte tutorial", u: "https://learn.svelte.dev/", k: "course" },
  ],
  "next js": [
    { t: "Next.js official docs", u: "https://nextjs.org/docs", k: "docs" },
    { t: "Learn Next.js", u: "https://nextjs.org/learn", k: "course" },
  ],
  nextjs: [
    { t: "Next.js official docs", u: "https://nextjs.org/docs", k: "docs" },
    { t: "Learn Next.js", u: "https://nextjs.org/learn", k: "course" },
  ],
  "components and templates": [
    { t: "React components — react.dev", u: "https://react.dev/learn/your-first-component", k: "course" },
    { t: "Vue components", u: "https://vuejs.org/guide/essentials/component-basics.html", k: "docs" },
  ],
  "props and data flow": [
    { t: "Passing props — react.dev", u: "https://react.dev/learn/passing-props-to-a-component", k: "course" },
    { t: "Vue props", u: "https://vuejs.org/guide/components/props.html", k: "docs" },
  ],
  "lifecycle hooks": [
    { t: "React hooks — react.dev", u: "https://react.dev/reference/react", k: "docs" },
    { t: "useEffect — react.dev", u: "https://react.dev/reference/react/useEffect", k: "docs" },
    { t: "Vue lifecycle", u: "https://vuejs.org/guide/essentials/lifecycle.html", k: "docs" },
  ],
  "styling and layout": [
    { t: "Styling — react.dev", u: "https://react.dev/learn/styles-and-css", k: "course" },
    { t: "Tailwind CSS docs", u: "https://tailwindcss.com/docs", k: "docs" },
  ],
  "component styling": [
    { t: "CSS modules — web.dev", u: "https://web.dev/learn/css/", k: "course" },
    { t: "Styled components", u: "https://styled-components.com/docs", k: "docs" },
  ],
  "data fetching and apis": [
    { t: "Fetch API — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API", k: "docs" },
    { t: "Data fetching — react.dev", u: "https://react.dev/learn/you-might-not-need-an-effect", k: "course" },
    { t: "TanStack Query docs", u: "https://tanstack.com/query/latest", k: "docs" },
  ],
  "forms and validation": [
    { t: "Forms — react.dev", u: "https://react.dev/reference/react-dom/components/input", k: "docs" },
    { t: "React Hook Form docs", u: "https://react-hook-form.com/", k: "docs" },
    { t: "Form validation — MDN", u: "https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation", k: "course" },
  ],
  "routing and navigation": [
    { t: "React Router docs", u: "https://reactrouter.com/", k: "docs" },
    { t: "Next.js routing", u: "https://nextjs.org/docs/app/building-your-application/routing", k: "docs" },
    { t: "Vue Router", u: "https://router.vuejs.org/", k: "docs" },
  ],
  "client routing": [
    { t: "React Router docs", u: "https://reactrouter.com/", k: "docs" },
    { t: "Next.js routing", u: "https://nextjs.org/docs/app/building-your-application/routing", k: "docs" },
  ],
  "route guards protected routes": [
    { t: "React Router — protected routes", u: "https://reactrouter.com/en/main/start/tutorial", k: "docs" },
    { t: "Vue Router guards", u: "https://router.vuejs.org/guide/advanced/navigation-guards.html", k: "docs" },
  ],
  "url and query state": [
    { t: "React Router — search params", u: "https://reactrouter.com/en/main/hooks/use-search-params", k: "docs" },
    { t: "Next.js — query params", u: "https://nextjs.org/docs/app/api-reference/functions/use-search-params", k: "docs" },
  ],
  "state management": [
    { t: "State — react.dev", u: "https://react.dev/learn/state-a-components-memory", k: "course" },
    { t: "Zustand docs", u: "https://zustand.docs.pmnd.rs/", k: "docs" },
    { t: "Redux docs", u: "https://redux.js.org/", k: "docs" },
  ],
  "server side rendering static": [
    { t: "SSR — Next.js docs", u: "https://nextjs.org/docs/app/building-your-application/rendering", k: "docs" },
    { t: "SSG — Next.js docs", u: "https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering", k: "docs" },
  ],
  "caching and streaming": [
    { t: "Caching — Next.js docs", u: "https://nextjs.org/docs/app/building-your-application/caching", k: "docs" },
    { t: "HTTP caching — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching", k: "docs" },
  ],
  "progressive web apps": [
    { t: "PWA — web.dev", u: "https://web.dev/learn/pwa/", k: "course" },
    { t: "PWA — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps", k: "docs" },
  ],
  "component architecture": [
    { t: "Thinking in React — react.dev", u: "https://react.dev/learn/thinking-in-react", k: "course" },
    { t: "Component design — web.dev", u: "https://web.dev/learn/design/", k: "course" },
  ],
  "code splitting and bundling": [
    { t: "Vite docs", u: "https://vite.dev/guide/", k: "docs" },
    { t: "Webpack docs", u: "https://webpack.js.org/guides/code-splitting/", k: "docs" },
    { t: "Code splitting — react.dev", u: "https://react.dev/reference/react/lazy", k: "docs" },
  ],
  "framework specific gotchas": [
    { t: "React — common mistakes", u: "https://react.dev/reference/react", k: "docs" },
    so("framework specific pitfalls"),
  ],
  "component testing": [
    { t: "Testing Library docs", u: "https://testing-library.com/docs/", k: "docs" },
    { t: "Testing — Vitest", u: "https://vitest.dev/guide/", k: "docs" },
    { t: "React testing — react.dev", u: "https://react.dev/learn/adding-interactivity", k: "course" },
  ],
  "automation": [
    { t: "Playwright docs", u: "https://playwright.dev/docs/intro", k: "docs" },
    { t: "Cypress docs", u: "https://docs.cypress.io/", k: "docs" },
  ],
  "troubleshooting": [
    { t: "Chrome DevTools", u: "https://developer.chrome.com/docs/devtools", k: "docs" },
    so("troubleshooting"),
  ],
  "dev server and tooling": [
    { t: "Vite docs", u: "https://vite.dev/guide/", k: "docs" },
    { t: "Webpack dev server", u: "https://webpack.js.org/configuration/dev-server/", k: "docs" },
  ],
  "tools": [
    { t: "Modern JS tooling — web.dev", u: "https://web.dev/learn/", k: "course" },
    yt("developer tools"),
  ],
  "programming": [
    { t: "freeCodeCamp", u: "https://www.freecodecamp.org/learn", k: "course" },
    { t: "The Odin Project", u: "https://www.theodinproject.com/", k: "course" },
  ],

  // ── node / backend / apis ──────────────────────────────────────────────────
  "node js": [
    { t: "Node.js official docs", u: "https://nodejs.org/docs/latest/api/", k: "docs" },
    { t: "Node.js learning path", u: "https://nodejs.org/en/learn", k: "course" },
    { t: "freeCodeCamp — Node.js course", u: "https://www.freecodecamp.org/news/learn-node-js-free-4-hour-course/", k: "video" },
  ],
  nodejs: [
    { t: "Node.js official docs", u: "https://nodejs.org/docs/latest/api/", k: "docs" },
    { t: "Node.js learning path", u: "https://nodejs.org/en/learn", k: "course" },
  ],
  "node js and npm": [
    { t: "Node.js official docs", u: "https://nodejs.org/docs/latest/api/", k: "docs" },
    { t: "npm docs", u: "https://docs.npmjs.com/", k: "docs" },
  ],
  "es modules vs commonjs": [
    { t: "ES modules — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules", k: "docs" },
    { t: "CommonJS vs ESM — Node docs", u: "https://nodejs.org/api/esm.html", k: "docs" },
  ],
  express: [
    { t: "Express official docs", u: "https://expressjs.com/", k: "docs" },
    { t: "Express tutorial — MDN", u: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs", k: "course" },
  ],
  "rest api": [
    { t: "REST — MDN", u: "https://developer.mozilla.org/en-US/docs/Glossary/REST", k: "docs" },
    { t: "REST best practices", u: "https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/", k: "article" },
  ],
  graphql: [
    { t: "GraphQL official docs", u: "https://graphql.org/learn/", k: "docs" },
    { t: "GraphQL tutorial — Apollo", u: "https://www.apollographql.com/tutorials", k: "course" },
  ],
  "web sockets": [
    { t: "WebSockets — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API", k: "docs" },
    { t: "Socket.io docs", u: "https://socket.io/docs/v4/", k: "docs" },
  ],
  http: [
    { t: "HTTP — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/HTTP", k: "docs" },
    { t: "HTTP status codes — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status", k: "cheatsheet" },
  ],
  "http methods": [
    { t: "HTTP request methods — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods", k: "docs" },
    { t: "REST methods — MDN", u: "https://developer.mozilla.org/en-US/docs/Glossary/REST", k: "docs" },
  ],
  authentication: [
    { t: "Auth — OWASP cheat sheet", u: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html", k: "docs" },
    { t: "Auth — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication", k: "docs" },
  ],
  jwt: [
    { t: "JWT official site", u: "https://jwt.io/introduction", k: "docs" },
    { t: "JWT auth — Auth0", u: "https://auth0.com/learn/json-web-tokens", k: "course" },
  ],
  "oauth 2": [
    { t: "OAuth 2.0 — OAuth.net", u: "https://oauth.net/2/", k: "docs" },
    { t: "OAuth 2.0 — Auth0", u: "https://auth0.com/intro-to-iam/what-is-oauth-2", k: "course" },
  ],
  "middleware": [
    { t: "Express middleware", u: "https://expressjs.com/en/guide/using-middleware.html", k: "docs" },
    { t: "Middleware — MDN", u: "https://developer.mozilla.org/en-US/docs/Glossary/Middleware", k: "docs" },
  ],
  "error handling": [
    { t: "Error handling — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling", k: "docs" },
    { t: "Express error handling", u: "https://expressjs.com/en/guide/error-handling.html", k: "docs" },
  ],
  "rate limiting": [
    { t: "Rate limiting — Cloudflare", u: "https://www.cloudflare.com/learning/bots/what-is-rate-limiting/", k: "article" },
    { t: "express-rate-limit", u: "https://www.npmjs.com/package/express-rate-limit", k: "repo" },
  ],
  "background jobs": [
    { t: "BullMQ docs", u: "https://docs.bullmq.io/", k: "docs" },
    { t: "Background jobs — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API", k: "docs" },
  ],
  "message queues": [
    { t: "RabbitMQ docs", u: "https://www.rabbitmq.com/documentation.html", k: "docs" },
    { t: "Apache Kafka docs", u: "https://kafka.apache.org/documentation/", k: "docs" },
  ],
  "microservices": [
    { t: "Microservices — Martin Fowler", u: "https://martinfowler.com/articles/microservices.html", k: "article" },
    { t: "Microservices — AWS", u: "https://aws.amazon.com/microservices/", k: "article" },
  ],
  "serverless": [
    { t: "Serverless — AWS docs", u: "https://aws.amazon.com/serverless/", k: "article" },
    { t: "Vercel functions", u: "https://vercel.com/docs/functions", k: "docs" },
  ],
  "api security": [
    { t: "OWASP API Security Top 10", u: "https://owasp.org/API-Security/editions/2023/en/0x11-t10/", k: "docs" },
    { t: "API security — OWASP cheat sheet", u: "https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html", k: "docs" },
  ],
  "postman": [
    { t: "Postman docs", u: "https://learning.postman.com/", k: "docs" },
    { t: "Postman — API testing tutorial", u: "https://www.postman.com/collection/", k: "course" },
  ],
  "docker": [
    { t: "Docker official docs", u: "https://docs.docker.com/", k: "docs" },
    { t: "Docker curriculum — Docker", u: "https://docs.docker.com/get-started/", k: "course" },
    { t: "Docker cheat sheet", u: "https://dockerlabs.collabnix.com/docker/cheatsheet/", k: "cheatsheet" },
  ],
  kubernetes: [
    { t: "Kubernetes official docs", u: "https://kubernetes.io/docs/", k: "docs" },
    { t: "Kubernetes basics tutorial", u: "https://kubernetes.io/docs/tutorials/", k: "course" },
    { t: "K8s cheat sheet", u: "https://kubernetes.io/docs/reference/kubectl/cheatsheet/", k: "cheatsheet" },
  ],
  terraform: [
    { t: "Terraform official docs", u: "https://developer.hashicorp.com/terraform/docs", k: "docs" },
    { t: "Terraform tutorial", u: "https://developer.hashicorp.com/terraform/tutorials", k: "course" },
  ],
  "infrastructure as code": [
    { t: "Terraform docs", u: "https://developer.hashicorp.com/terraform/docs", k: "docs" },
    { t: "Pulumi docs", u: "https://www.pulumi.com/docs/", k: "docs" },
    { t: "AWS CloudFormation docs", u: "https://docs.aws.amazon.com/cloudformation/", k: "docs" },
  ],
  "ci cd and delivery": [
    { t: "GitHub Actions docs", u: "https://docs.github.com/en/actions", k: "docs" },
    { t: "GitLab CI/CD docs", u: "https://docs.gitlab.com/ee/ci/", k: "docs" },
  ],
  "build and test automation": [
    { t: "GitHub Actions docs", u: "https://docs.github.com/en/actions", k: "docs" },
    { t: "Jenkins docs", u: "https://www.jenkins.io/doc/", k: "docs" },
  ],
  "deployment strategies": [
    { t: "Deployment strategies — Kubernetes", u: "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/", k: "docs" },
    { t: "Blue-green & canary — AWS", u: "https://docs.aws.amazon.com/whitepapers/latest/overview-deployment-options/bluegreen-deployments.html", k: "article" },
  ],
  containerization: [
    { t: "Docker docs", u: "https://docs.docker.com/", k: "docs" },
    { t: "Containers — Kubernetes docs", u: "https://kubernetes.io/docs/concepts/containers/", k: "docs" },
  ],
  "containers and orchestration": [
    { t: "Docker docs", u: "https://docs.docker.com/", k: "docs" },
    { t: "Kubernetes docs", u: "https://kubernetes.io/docs/concepts/overview/", k: "docs" },
  ],
  "service networking": [
    { t: "Kubernetes networking", u: "https://kubernetes.io/docs/concepts/services-networking/", k: "docs" },
    { t: "DNS — Cloudflare learning", u: "https://www.cloudflare.com/learning/dns/what-is-dns/", k: "article" },
  ],
  "cloud and services": [
    { t: "AWS docs", u: "https://docs.aws.amazon.com/", k: "docs" },
    { t: "Google Cloud docs", u: "https://cloud.google.com/docs", k: "docs" },
    { t: "Azure docs", u: "https://learn.microsoft.com/en-us/azure/", k: "docs" },
  ],
  "compute storage networking": [
    { t: "AWS compute — docs", u: "https://docs.aws.amazon.com/ec2/", k: "docs" },
    { t: "AWS storage — docs", u: "https://docs.aws.amazon.com/s3/", k: "docs" },
    { t: "AWS networking — docs", u: "https://docs.aws.amazon.com/vpc/", k: "docs" },
  ],
  "serverless and managed services": [
    { t: "AWS Lambda docs", u: "https://docs.aws.amazon.com/lambda/", k: "docs" },
    { t: "Google Cloud Functions", u: "https://cloud.google.com/functions/docs", k: "docs" },
  ],
  "monitoring and reliability": [
    { t: "Google SRE book", u: "https://sre.google/sre-book/table-of-contents/", k: "book" },
    { t: "Grafana docs", u: "https://grafana.com/docs/", k: "docs" },
    { t: "Prometheus docs", u: "https://prometheus.io/docs/", k: "docs" },
  ],
  "observability metrics logs traces": [
    { t: "OpenTelemetry docs", u: "https://opentelemetry.io/docs/", k: "docs" },
    { t: "Observability — Google SRE", u: "https://sre.google/sre-book/monitoring-distributed-systems/", k: "book" },
  ],
  "alerting and incident response": [
    { t: "Incident response — Google SRE", u: "https://sre.google/sre-book/incident-response/", k: "book" },
    { t: "PagerDuty incident response", u: "https://response.pagerduty.com/", k: "docs" },
  ],
  "slos and reliability": [
    { t: "SRE workbook — SLOs", u: "https://sre.google/workbook/slo-documentation/", k: "book" },
    { t: "Google SRE book — SLOs", u: "https://sre.google/sre-book/service-level-objectives/", k: "book" },
  ],
  "security hardening": [
    { t: "CIS benchmarks", u: "https://www.cisecurity.org/cis-benchmarks", k: "docs" },
    { t: "Security hardening — OWASP", u: "https://owasp.org/www-project-application-security-verification-standard/", k: "docs" },
  ],
  "cost optimization": [
    { t: "AWS Well-Architected — cost", u: "https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html", k: "docs" },
    { t: "Cloud cost — FinOps", u: "https://www.finops.org/", k: "community" },
  ],
  "architecture discussions": [
    { t: "System Design Primer", u: "https://github.com/donnemartin/system-design-primer", k: "repo" },
    { t: "System design — freeCodeCamp", u: "https://www.freecodecamp.org/news/systems-design-for-interviews/", k: "article" },
  ],
  "real world incidents": [
    { t: "Google SRE book — postmortems", u: "https://sre.google/sre-book/postmortem-culture/", k: "book" },
    { t: "GitHub incident reports", u: "https://www.githubstatus.com/", k: "article" },
  ],
  orchestration: [
    { t: "Kubernetes docs", u: "https://kubernetes.io/docs/", k: "docs" },
    { t: "Docker Compose docs", u: "https://docs.docker.com/compose/", k: "docs" },
  ],
  "container security": [
    { t: "Container security — Docker", u: "https://docs.docker.com/engine/security/", k: "docs" },
    { t: "Kubernetes security docs", u: "https://kubernetes.io/docs/concepts/security/", k: "docs" },
  ],
  "minimal base images": [
    { t: "Distroless images — Google", u: "https://github.com/GoogleContainerTools/distroless", k: "repo" },
    { t: "Docker best practices — multi-stage", u: "https://docs.docker.com/build/building/best-practices/", k: "docs" },
  ],
  "scanning for vulnerabilities": [
    { t: "Trivy docs", u: "https://aquasecurity.github.io/trivy/", k: "docs" },
    { t: "Docker Scout", u: "https://docs.docker.com/scout/", k: "docs" },
  ],
  "least privilege containers": [
    { t: "Least privilege — OWASP", u: "https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html", k: "docs" },
    { t: "K8s pod security", u: "https://kubernetes.io/docs/concepts/security/pod-security-standards/", k: "docs" },
  ],
  "runtime security": [
    { t: "Falco docs", u: "https://falco.org/docs/", k: "docs" },
    { t: "Runtime security — OWASP", u: "https://owasp.org/www-project-top-ten/", k: "docs" },
  ],

  // ── databases ──────────────────────────────────────────────────────────────
  sql: [
    { t: "SQL tutorial — W3Schools", u: "https://www.w3schools.com/sql/", k: "course" },
    { t: "SQL — freeCodeCamp", u: "https://www.freecodecamp.org/news/sql-and-databases-full-course/", k: "video" },
    { t: "PostgreSQL docs", u: "https://www.postgresql.org/docs/", k: "docs" },
  ],
  postgresql: [
    { t: "PostgreSQL official docs", u: "https://www.postgresql.org/docs/", k: "docs" },
    { t: "PostgreSQL tutorial", u: "https://www.postgresqltutorial.com/", k: "course" },
  ],
  mongodb: [
    { t: "MongoDB official docs", u: "https://www.mongodb.com/docs/", k: "docs" },
    { t: "MongoDB university — free courses", u: "https://learn.mongodb.com/", k: "course" },
  ],
  redis: [
    { t: "Redis official docs", u: "https://redis.io/docs/latest/", k: "docs" },
    { t: "Redis cheat sheet", u: "https://quickref.me/redis", k: "cheatsheet" },
  ],
  mysql: [
    { t: "MySQL docs", u: "https://dev.mysql.com/doc/", k: "docs" },
    { t: "MySQL tutorial", u: "https://www.mysqltutorial.org/", k: "course" },
  ],
  transactions: [
    { t: "Transactions — PostgreSQL docs", u: "https://www.postgresql.org/docs/current/tutorial-transactions.html", k: "docs" },
    { t: "ACID — freeCodeCamp", u: "https://www.freecodecamp.org/news/acid-databases-explained/", k: "article" },
  ],
  indexes: [
    { t: "Indexes — PostgreSQL docs", u: "https://www.postgresql.org/docs/current/indexes.html", k: "docs" },
    { t: "Indexes explained — use-the-index-luke", u: "https://use-the-index-luke.com/", k: "book" },
  ],
  normalization: [
    { t: "Database normalization — freeCodeCamp", u: "https://www.freecodecamp.org/news/database-normalization-1nf-2nf-3nf/", k: "article" },
    { t: "Normalization — GeeksforGeeks", u: "https://www.geeksforgeeks.org/normal-forms-in-dbms/", k: "article" },
  ],
  modeling: [
    { t: "Data modeling — freeCodeCamp", u: "https://www.freecodecamp.org/news/data-modeling/", k: "article" },
    { t: "MongoDB data modeling", u: "https://www.mongodb.com/docs/manual/data-modeling/", k: "docs" },
  ],
  "database design": [
    { t: "Database design — freeCodeCamp", u: "https://www.freecodecamp.org/news/database-design/", k: "article" },
    { t: "ER diagrams — Lucidchart", u: "https://www.lucidchart.com/pages/er-diagrams", k: "article" },
  ],
  "query optimization": [
    { t: "Query planning — PostgreSQL docs", u: "https://www.postgresql.org/docs/current/using-explain.html", k: "docs" },
    { t: "Indexing strategies — use-the-index-luke", u: "https://use-the-index-luke.com/", k: "book" },
  ],
  "nosql databases": [
    { t: "NoSQL — MongoDB", u: "https://www.mongodb.com/nosql-explained", k: "article" },
    { t: "NoSQL — AWS", u: "https://aws.amazon.com/nosql/", k: "article" },
  ],
  "database scaling": [
    { t: "Sharding — MongoDB docs", u: "https://www.mongodb.com/docs/manual/sharding/", k: "docs" },
    { t: "Database scaling — System Design Primer", u: "https://github.com/donnemartin/system-design-primer", k: "repo" },
  ],

  // ── git & version control ──────────────────────────────────────────────────
  git: [
    { t: "Git official docs", u: "https://git-scm.com/doc", k: "docs" },
    { t: "Git tutorial — Atlassian", u: "https://www.atlassian.com/git/tutorials", k: "course" },
    { t: "Git cheat sheet", u: "https://training.github.com/downloads/github-git-cheat-sheet.pdf", k: "cheatsheet" },
  ],
  "version control": [
    { t: "Git official docs", u: "https://git-scm.com/doc", k: "docs" },
    { t: "Version control — GitHub docs", u: "https://docs.github.com/en/get-started", k: "docs" },
  ],
  "repositories and commits": [
    { t: "Git basics — git-scm", u: "https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository", k: "book" },
    { t: "Commits — GitHub docs", u: "https://docs.github.com/en/pull-requests/committing-changes-to-your-project", k: "docs" },
  ],
  "staging area": [
    { t: "Staging — git-scm", u: "https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository", k: "book" },
  ],
  branches: [
    { t: "Branches — git-scm", u: "https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell", k: "book" },
    { t: "Branching — Atlassian", u: "https://www.atlassian.com/git/tutorials/using-branches", k: "course" },
  ],
  merging: [
    { t: "Merging — git-scm", u: "https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging", k: "book" },
    { t: "Merge conflicts — Atlassian", u: "https://www.atlassian.com/git/tutorials/using-branches/merge-conflicts", k: "course" },
  ],
  "remotes and pushing pulling": [
    { t: "Remotes — git-scm", u: "https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes", k: "book" },
    { t: "GitHub — pushing", u: "https://docs.github.com/en/get-started/using-git/pushing-commits-to-a-remote-repository", k: "docs" },
  ],
  "undoing changes": [
    { t: "Undoing — git-scm", u: "https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things", k: "book" },
    { t: "git reset & revert — Atlassian", u: "https://www.atlassian.com/git/tutorials/undoing-changes", k: "course" },
  ],
  "pull requests": [
    { t: "PRs — GitHub docs", u: "https://docs.github.com/en/pull-requests", k: "docs" },
    { t: "Open source guide — PRs", u: "https://opensource.guide/how-to-contribute/", k: "article" },
  ],
  "repositories and readme": [
    { t: "README — GitHub docs", u: "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes", k: "docs" },
    { t: "Make a README", u: "https://www.makeareadme.com/", k: "article" },
  ],
  "collaboration workflows": [
    { t: "GitHub Flow — GitHub", u: "https://docs.github.com/en/get-started/using-github/github-flow", k: "docs" },
    { t: "Collaborating — GitHub docs", u: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests", k: "docs" },
  ],
  "branching strategies": [
    { t: "Branching strategies — Atlassian", u: "https://www.atlassian.com/git/tutorials/comparing-workflows", k: "course" },
    { t: "Trunk-based development", u: "https://trunkbaseddevelopment.com/", k: "article" },
  ],
  "github flow": [
    { t: "GitHub Flow — official docs", u: "https://docs.github.com/en/get-started/using-github/github-flow", k: "docs" },
  ],
  "git flow": [
    { t: "Git Flow — Atlassian", u: "https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow", k: "course" },
    { t: "A successful Git branching model", u: "https://nvie.com/posts/a-successful-git-branching-model/", k: "article" },
  ],
  "pull request etiquette": [
    { t: "PR etiquette — GitHub community", u: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests", k: "docs" },
    { t: "How to write a good PR — freeCodeCamp", u: "https://www.freecodecamp.org/news/how-to-write-a-great-pull-request/", k: "article" },
  ],
  "handling conflicts": [
    { t: "Merge conflicts — Atlassian", u: "https://www.atlassian.com/git/tutorials/using-branches/merge-conflicts", k: "course" },
    { t: "Resolving conflicts — GitHub", u: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts", k: "docs" },
  ],
  rebasing: [
    { t: "Rebasing — git-scm", u: "https://git-scm.com/book/en/v2/Git-Branching-Rebasing", k: "book" },
    { t: "Rebase vs merge — Atlassian", u: "https://www.atlassian.com/git/tutorials/merging-vs-rebasing", k: "course" },
  ],
  "conventional commits": [
    { t: "Conventional Commits spec", u: "https://www.conventionalcommits.org/en/v1.0.0/", k: "docs" },
    { t: "Commitizen", u: "https://commitizen-tools.github.io/commitizen/", k: "repo" },
  ],
  "commit message format": [
    { t: "Conventional Commits spec", u: "https://www.conventionalcommits.org/en/v1.0.0/", k: "docs" },
    { t: "Writing good commits", u: "https://cbea.ms/git-commit/", k: "article" },
  ],
  "common types feat fix": [
    { t: "Conventional Commits — types", u: "https://www.conventionalcommits.org/en/v1.0.0/#summary", k: "docs" },
  ],
  "breaking changes": [
    { t: "SemVer — breaking changes", u: "https://semver.org/#spec-item-8", k: "docs" },
    { t: "Conventional Commits spec", u: "https://www.conventionalcommits.org/en/v1.0.0/", k: "docs" },
  ],
  scopes: [
    { t: "Conventional Commits — scopes", u: "https://www.conventionalcommits.org/en/v1.0.0/", k: "docs" },
  ],
  changelogs: [
    { t: "Keep a Changelog", u: "https://keepachangelog.com/en/1.0.0/", k: "article" },
    { t: "Semantic versioning", u: "https://semver.org/", k: "docs" },
  ],
  versioning: [
    { t: "Semantic Versioning", u: "https://semver.org/", k: "docs" },
    { t: "npm versioning", u: "https://docs.npmjs.com/about-semantic-versioning", k: "docs" },
  ],
  "open source contribution": [
    { t: "Open Source Guide", u: "https://opensource.guide/", k: "article" },
    { t: "First Contributions", u: "https://github.com/firstcontributions/first-contributions", k: "repo" },
    { t: "Good First Issue", u: "https://goodfirstissue.dev/", k: "practice" },
  ],
  "forking and branching": [
    { t: "Fork a repo — GitHub docs", u: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks", k: "docs" },
  ],
  "submitting prs": [
    { t: "PRs — GitHub docs", u: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests", k: "docs" },
    { t: "How to contribute — open source guide", u: "https://opensource.guide/how-to-contribute/", k: "article" },
  ],
  "reading a codebase": [
    { t: "How to read a codebase — freeCodeCamp", u: "https://www.freecodecamp.org/news/how-to-read-code-better/", k: "article" },
    yt("read code faster"),
  ],
  "good first issues": [
    { t: "Good First Issue", u: "https://goodfirstissue.dev/", k: "practice" },
    { t: "First Timers Only", u: "https://www.firsttimersonly.com/", k: "article" },
  ],

  // ── linux / sysadmin ───────────────────────────────────────────────────────
  "moving files directories": [
    { t: "mv command — Linuxize", u: "https://linuxize.com/post/how-to-rename-files-in-linux/", k: "article" },
    { t: "File commands — GNU coreutils", u: "https://www.gnu.org/software/coreutils/manual/html_node/mv-invocation.html", k: "docs" },
  ],
  "creating deleting files dirs": [
    { t: "mkdir & rm — Linuxize", u: "https://linuxize.com/post/how-to-create-directories-in-linux-with-the-mkdir-command/", k: "article" },
    { t: "GNU coreutils manual", u: "https://www.gnu.org/software/coreutils/manual/", k: "docs" },
  ],
  "directory hierarchy overview": [
    { t: "Filesystem Hierarchy Standard", u: "https://www.pathname.com/fhs/", k: "docs" },
    { t: "Linux directory structure — tldp", u: "https://tldp.org/LDP/Linux-Filesystem-Hierarchy/html/", k: "docs" },
  ],
  "environment variables": [
    { t: "Environment variables — Linuxize", u: "https://linuxize.com/post/how-to-set-and-list-environment-variables-in-linux/", k: "article" },
    { t: "Bash environment — GNU manual", u: "https://www.gnu.org/software/bash/manual/html_node/Bash-Variables.html", k: "docs" },
  ],
  redirects: [
    { t: "I/O redirection — tldp", u: "https://tldp.org/LDP/abs/html/io-redirection.html", k: "docs" },
    { t: "Redirection — Linuxize", u: "https://linuxize.com/post/bash-redirect-stderr-stdout/", k: "article" },
  ],
  "pipes and redirection": [
    { t: "Pipes & redirection — tldp", u: "https://tldp.org/LDP/abs/html/io-redirection.html", k: "docs" },
    { t: "The Missing Semester — shell", u: "https://missing.csail.mit.edu/2020/shell-tools/", k: "course" },
  ],
  "shebang and execution": [
    { t: "Shebang — Wikipedia", u: "https://en.wikipedia.org/wiki/Shebang_(Unix)", k: "article" },
    { t: "Executing scripts — GNU bash", u: "https://www.gnu.org/software/bash/manual/html_node/Executing-Commands.html", k: "docs" },
  ],
  "variables and quoting": [
    { t: "Bash variables — GNU manual", u: "https://www.gnu.org/software/bash/manual/html_node/Variables.html", k: "docs" },
    { t: "Quoting — tldp", u: "https://tldp.org/LDP/abs/html/quoting.html", k: "docs" },
  ],
  "exit codes and error handling": [
    { t: "Exit codes — tldp", u: "https://tldp.org/LDP/abs/html/exit-status.html", k: "docs" },
    { t: "Error handling in bash — Linuxize", u: "https://linuxize.com/post/bash-set-e/", k: "article" },
  ],
  "cron and automation": [
    { t: "Cron — Linuxize", u: "https://linuxize.com/post/scheduling-cron-jobs-with-crontab/", k: "article" },
    { t: "Cronie docs", u: "https://github.com/cronie-crond/cronie", k: "docs" },
  ],
  "processes and pids": [
    { t: "Processes — Linuxize", u: "https://linuxize.com/post/how-to-list-running-processes-in-linux/", k: "article" },
    { t: "ps command — man page", u: "https://man7.org/linux/man-pages/man1/ps.1.html", k: "docs" },
  ],
  "processes and systemd": [
    { t: "Systemd — freedesktop docs", u: "https://www.freedesktop.org/software/systemd/man/latest/", k: "docs" },
    { t: "systemd essentials — DigitalOcean", u: "https://www.digitalocean.com/community/tutorials/systemd-essentials-working-with-services-units-and-the-journal", k: "article" },
  ],
  "background and foreground": [
    { t: "Job control — tldp", u: "https://tldp.org/LDP/abs/html/x9644.html", k: "docs" },
    { t: "nohup & background — Linuxize", u: "https://linuxize.com/post/run-bash-commands-in-background/", k: "article" },
  ],
  "systemd units": [
    { t: "Systemd units — freedesktop", u: "https://www.freedesktop.org/software/systemd/man/latest/systemd.unit.html", k: "docs" },
    { t: "systemd basics — DigitalOcean", u: "https://www.digitalocean.com/community/tutorials/understanding-systemd-units-and-unit-files", k: "article" },
  ],
  "services and timers": [
    { t: "systemd.service — freedesktop", u: "https://www.freedesktop.org/software/systemd/man/latest/systemd.service.html", k: "docs" },
    { t: "systemd.timer — freedesktop", u: "https://www.freedesktop.org/software/systemd/man/latest/systemd.timer.html", k: "docs" },
  ],
  "journal logs": [
    { t: "journalctl — freedesktop", u: "https://www.freedesktop.org/software/systemd/man/latest/journalctl.html", k: "docs" },
    { t: "How to use journalctl — DigitalOcean", u: "https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs", k: "article" },
  ],
  "core utilities grep awk sed": [
    { t: "GNU grep manual", u: "https://www.gnu.org/software/grep/manual/", k: "docs" },
    { t: "awk — GNU manual", u: "https://www.gnu.org/software/gawk/manual/", k: "docs" },
    { t: "sed — GNU manual", u: "https://www.gnu.org/software/sed/manual/", k: "docs" },
  ],
  "process substitution": [
    { t: "Process substitution — tldp", u: "https://tldp.org/LDP/abs/html/process-sub.html", k: "docs" },
    { t: "Bash manual — process substitution", u: "https://www.gnu.org/software/bash/manual/html_node/Process-Substitution.html", k: "docs" },
  ],
  "ping and traceroute": [
    { t: "ping — man page", u: "https://man7.org/linux/man-pages/man8/ping.8.html", k: "docs" },
    { t: "traceroute — man page", u: "https://man7.org/linux/man-pages/man8/traceroute.8.html", k: "docs" },
    { t: "Network troubleshooting — Linuxize", u: "https://linuxize.com/post/linux-network-commands/", k: "article" },
  ],
  "netstat and ss": [
    { t: "ss — man page", u: "https://man7.org/linux/man-pages/man8/ss.8.html", k: "docs" },
    { t: "netstat — man page", u: "https://man7.org/linux/man-pages/man8/netstat.8.html", k: "docs" },
  ],
  "ip and ifconfig": [
    { t: "ip command — man page", u: "https://man7.org/linux/man-pages/man8/ip.8.html", k: "docs" },
    { t: "Network config — Linuxize", u: "https://linuxize.com/post/linux-ip-command/", k: "article" },
  ],
  "dig and nslookup": [
    { t: "dig — man page", u: "https://man7.org/linux/man-pages/man1/dig.1.html", k: "docs" },
    { t: "DNS lookup — Linuxize", u: "https://linuxize.com/post/linux-dig-command/", k: "article" },
  ],
  curl: [
    { t: "curl docs", u: "https://curl.se/docs/", k: "docs" },
    { t: "curl cheat sheet", u: "https://quickref.me/curl", k: "cheatsheet" },
  ],
  "packet analysis tcpdump": [
    { t: "tcpdump — man page", u: "https://www.tcpdump.org/manpages/tcpdump.1.html", k: "docs" },
    { t: "tcpdump tutorial — Daniel Miessler", u: "https://danielmiessler.com/p/tcpdump/", k: "article" },
  ],
  "bash scripting": [
    { t: "Bash manual — GNU", u: "https://www.gnu.org/software/bash/manual/", k: "docs" },
    { t: "ShellCheck", u: "https://www.shellcheck.net/", k: "practice" },
    { t: "Bash cheat sheet", u: "https://devhints.io/bash", k: "cheatsheet" },
  ],
  "linux command line": [
    { t: "The Missing Semester", u: "https://missing.csail.mit.edu/", k: "course" },
    { t: "Linux command line — Ryan's tutorials", u: "https://ryanstutorials.net/linuxtutorial/", k: "course" },
    { t: "Linux cheat sheet", u: "https://quickref.me/linux", k: "cheatsheet" },
  ],
  terminal: [
    { t: "The Missing Semester", u: "https://missing.csail.mit.edu/", k: "course" },
    { t: "Command line tutorial", u: "https://www.learnenough.com/command-line-tutorial", k: "course" },
  ],
  networking: [
    { t: "Networking basics — Cloudflare learning", u: "https://www.cloudflare.com/learning/network-layer/what-is-the-network-layer/", k: "article" },
    { t: "Computer networks — Khan Academy", u: "https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:the-internet", k: "course" },
    { t: "Kurose & Ross — Computer Networking (book)", u: "https://gaia.cs.umass.edu/kurose_ross/index.php", k: "book" },
  ],
  "osi and tcp ip models": [
    { t: "OSI model — Cloudflare", u: "https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/", k: "article" },
    { t: "TCP/IP — Khan Academy", u: "https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:the-internet/xcae6f4a7ff015e7d:transporting-packets/a/transmission-control-protocol-tcp", k: "course" },
  ],
  "ip addressing and subnets": [
    { t: "IP addressing — Cloudflare", u: "https://www.cloudflare.com/learning/network-layer/what-is-ip-address/", k: "article" },
    { t: "Subnetting — freeCodeCamp", u: "https://www.freecodecamp.org/news/subnetting-cheat-sheet/", k: "cheatsheet" },
  ],
  "routing and switching": [
    { t: "Routing — Cloudflare", u: "https://www.cloudflare.com/learning/network-layer/what-is-routing/", k: "article" },
    { t: "Routing basics — Cisco", u: "https://www.cisco.com/c/en/us/solutions/small-business/resource-center/networking/routing-basics.html", k: "article" },
  ],
  "ports and protocols": [
    { t: "Ports — Cloudflare", u: "https://www.cloudflare.com/learning/network-layer/what-is-a-computer-port/", k: "article" },
    { t: "IANA service names", u: "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml", k: "docs" },
  ],
  "troubleshooting tools": [
    { t: "Linux network commands — Linuxize", u: "https://linuxize.com/post/linux-network-commands/", k: "article" },
    { t: "The Missing Semester — debugging", u: "https://missing.csail.mit.edu/2020/debugging/", k: "course" },
  ],
  "domain name system": [
    { t: "What is DNS? — Cloudflare", u: "https://www.cloudflare.com/learning/dns/what-is-dns/", k: "article" },
    { t: "DNS — MDN", u: "https://developer.mozilla.org/en-US/docs/Glossary/DNS", k: "docs" },
  ],
  "load balancing": [
    { t: "Load balancing — Cloudflare", u: "https://www.cloudflare.com/learning/performance/what-is-load-balancing/", k: "article" },
    { t: "Load balancers — System Design Primer", u: "https://github.com/donnemartin/system-design-primer", k: "repo" },
  ],
  "cdns": [
    { t: "CDN — Cloudflare", u: "https://www.cloudflare.com/learning/cdn/what-is-a-cdn/", k: "article" },
    { t: "CDN — MDN", u: "https://developer.mozilla.org/en-US/docs/Glossary/CDN", k: "docs" },
  ],
  "http https": [
    { t: "HTTP — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/HTTP", k: "docs" },
    { t: "HTTPS — Cloudflare", u: "https://www.cloudflare.com/learning/ssl/what-is-https/", k: "article" },
  ],
  "tcp udp": [
    { t: "TCP vs UDP — Cloudflare", u: "https://www.cloudflare.com/learning/ddos/glossary/tcp-vs-udp/", k: "article" },
    { t: "TCP — MDN", u: "https://developer.mozilla.org/en-US/docs/Glossary/TCP", k: "docs" },
  ],

  // ── security ───────────────────────────────────────────────────────────────
  "owasp top 10": [
    { t: "OWASP Top 10 official", u: "https://owasp.org/www-project-top-ten/", k: "docs" },
    { t: "OWASP Top 10 — explained", u: "https://www.freecodecamp.org/news/owasp-top-10-explained/", k: "article" },
  ],
  injection: [
    { t: "Injection — OWASP", u: "https://owasp.org/www-community/attacks/SQL_Injection", k: "docs" },
    { t: "SQL injection — PortSwigger", u: "https://portswigger.net/web-security/sql-injection", k: "course" },
  ],
  "broken access control": [
    { t: "Broken Access Control — OWASP", u: "https://owasp.org/Top10/A01_2021-Broken_Access_Control/", k: "docs" },
    { t: "Access control — PortSwigger", u: "https://portswigger.net/web-security/access-control", k: "course" },
  ],
  "cryptographic failures": [
    { t: "Cryptographic Failures — OWASP", u: "https://owasp.org/Top10/A02_2021-Cryptographic_Failures/", k: "docs" },
    { t: "Cryptography — Khan Academy", u: "https://www.khanacademy.org/computing/computer-science/cryptography", k: "course" },
  ],
  "security misconfiguration": [
    { t: "Security Misconfiguration — OWASP", u: "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/", k: "docs" },
  ],
  "how to mitigate each": [
    { t: "OWASP Top 10 mitigations", u: "https://owasp.org/www-project-top-ten/", k: "docs" },
    { t: "OWASP ASVS", u: "https://owasp.org/www-project-application-security-verification-standard/", k: "docs" },
  ],
  reconnaissance: [
    { t: "Recon — PortSwigger", u: "https://portswigger.net/web-security/recon", k: "course" },
    { t: "Reconnaissance — MITRE ATT&CK", u: "https://attack.mitre.org/tactics/TA0043/", k: "docs" },
  ],
  exploitation: [
    { t: "Exploitation — PortSwigger Academy", u: "https://portswigger.net/web-security", k: "course" },
    { t: "TryHackMe", u: "https://tryhackme.com/", k: "practice" },
  ],
  "web exploitation": [
    { t: "PortSwigger Web Security Academy", u: "https://portswigger.net/web-security", k: "course" },
    { t: "OWASP WebGoat", u: "https://owasp.org/www-project-webgoat/", k: "practice" },
  ],
  osint: [
    { t: "OSINT — freeCodeCamp guide", u: "https://www.freecodecamp.org/news/osint/", k: "article" },
    { t: "Bellingcat online toolkit", u: "https://www.bellingcat.com/resources/2022/01/31/bellingcats-online-investigation-toolkit/", k: "article" },
  ],
  "active directory": [
    { t: "Active Directory — Microsoft Learn", u: "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview", k: "docs" },
    { t: "AD attacks — HackTricks", u: "https://book.hacktricks.wiki/en/windows-hardening/active-directory-methodology", k: "docs" },
  ],
  "security fundamentals": [
    { t: "Security — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/Security", k: "docs" },
    { t: "Security 101 — OWASP", u: "https://owasp.org/www-community/", k: "docs" },
  ],
  "penetration testing": [
    { t: "Pentesting — OWASP WSTG", u: "https://owasp.org/www-project-web-security-testing-guide/", k: "docs" },
    { t: "Hack The Box", u: "https://www.hackthebox.com/", k: "practice" },
    { t: "TryHackMe", u: "https://tryhackme.com/", k: "practice" },
  ],
  "cryptography": [
    { t: "Cryptography — Khan Academy", u: "https://www.khanacademy.org/computing/computer-science/cryptography", k: "course" },
    { t: "Crypto — Computerphile", u: "https://www.youtube.com/watch?v=NmM9HA2MXGI", k: "video" },
  ],

  // ── soft skills & productivity ─────────────────────────────────────────────
  "learning how to learn": [
    { t: "Learning How to Learn — Coursera", u: "https://www.coursera.org/learn/learning-how-to-learn", k: "course" },
    { t: "How to learn faster — freeCodeCamp", u: "https://www.freecodecamp.org/news/how-to-learn-to-code/", k: "article" },
  ],
  "spaced repetition": [
    { t: "Spaced repetition — Wikipedia", u: "https://en.wikipedia.org/wiki/Spaced_repetition", k: "article" },
    { t: "Anki — spaced repetition app", u: "https://apps.ankiweb.net/", k: "practice" },
  ],
  "active recall": [
    { t: "Active recall — Wikipedia", u: "https://en.wikipedia.org/wiki/Active_recall", k: "article" },
    { t: "Learning techniques — freeCodeCamp", u: "https://www.freecodecamp.org/news/learning-techniques-that-work/", k: "article" },
  ],
  "learning by building": [
    { t: "Project-based learning — freeCodeCamp", u: "https://www.freecodecamp.org/news/learn-by-doing/", k: "article" },
    { t: "The Odin Project — project-based", u: "https://www.theodinproject.com/", k: "course" },
  ],
  "knowledge mapping": [
    { t: "Mind mapping — Wikipedia", u: "https://en.wikipedia.org/wiki/Mind_map", k: "article" },
    { t: "The Feynman technique — freeCodeCamp", u: "https://www.freecodecamp.org/news/feynman-technique/", k: "article" },
  ],
  "avoiding tutorial hell": [
    { t: "How to escape tutorial hell — freeCodeCamp", u: "https://www.freecodecamp.org/news/how-to-escape-tutorial-hell/", k: "article" },
    { t: "Build projects — The Odin Project", u: "https://www.theodinproject.com/", k: "course" },
  ],
  "deep work vs shallow work": [
    { t: "Deep Work — Cal Newport", u: "https://www.calnewport.com/books/deep-work/", k: "book" },
    { t: "Deep work — HBR", u: "https://hbr.org/2016/06/how-to-do-deep-work", k: "article" },
  ],
  "handling interruptions": [
    { t: "Managing interruptions — HBR", u: "https://hbr.org/2019/05/how-to-stop-interruptions-from-derailing-your-day", k: "article" },
  ],
  "tracking progress": [
    { t: "Progress tracking — freeCodeCamp", u: "https://www.freecodecamp.org/news/how-to-track-progress/", k: "article" },
    { t: "Habit tracking — James Clear", u: "https://jamesclear.com/habit-tracker", k: "article" },
  ],
  "avoiding burnout": [
    { t: "Avoiding burnout — HBR", u: "https://hbr.org/2021/05/8-ways-to-manage-yourself-during-a-crisis", k: "article" },
    { t: "Burnout — WHO", u: "https://www.who.int/news-room/questions-and-answers/item/burn-out-an-occupational-phenomenon", k: "article" },
  ],
  "presenting ideas": [
    { t: "Presenting ideas — HBR", u: "https://hbr.org/2019/10/10-tips-for-better-slide-decks", k: "article" },
    yt("present ideas clearly"),
  ],
  "active listening": [
    { t: "Active listening — HBR", u: "https://hbr.org/2022/09/what-is-active-listening", k: "article" },
    { t: "Active listening — MindTools", u: "https://www.mindtools.com/a2sm8fe/active-listening", k: "article" },
  ],
  "giving and receiving feedback": [
    { t: "Radical candor — book", u: "https://www.radicalcandor.com/", k: "book" },
    { t: "How to give feedback — HBR", u: "https://hbr.org/2019/01/the-feedback-fallacy", k: "article" },
  ],
  "working in teams": [
    { t: "Teamwork — HBR", u: "https://hbr.org/topic/teamwork", k: "article" },
    { t: "Google's Project Aristotle", u: "https://rework.withgoogle.com/guides/understanding-team-effectiveness/steps/introduction/", k: "article" },
  ],
  "code comments vs docs": [
    { t: "Comments — Google style guide", u: "https://google.github.io/styleguide/docguide/comments.html", k: "docs" },
    { t: "Self-documenting code — freeCodeCamp", u: "https://www.freecodecamp.org/news/code-documentation/", k: "article" },
  ],
  "readmes and runbooks": [
    { t: "Make a README", u: "https://www.makeareadme.com/", k: "article" },
    { t: "GitHub README docs", u: "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes", k: "docs" },
    { t: "Runbooks — Google SRE", u: "https://sre.google/sre-book/effective-troubleshooting/", k: "book" },
  ],
  "technical specifications": [
    { t: "Writing specs — freeCodeCamp", u: "https://www.freecodecamp.org/news/how-to-write-a-technical-specification/", k: "article" },
    { t: "Design docs — Google", u: "https://www.industrialempathy.com/posts/design-docs-at-google/", k: "article" },
  ],
  "prioritization frameworks": [
    { t: "Eisenhower matrix — MindTools", u: "https://www.mindtools.com/a3gq2h8/eisenhowers-urgencyimportance-principle", k: "article" },
    { t: "RICE scoring — Intercom", u: "https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/", k: "article" },
    { t: "MoSCoW — Wikipedia", u: "https://en.wikipedia.org/wiki/MoSCoW_method", k: "article" },
  ],
  communication: [
    { t: "Communicating — HBR", u: "https://hbr.org/topic/communication", k: "article" },
    { t: "Crucial Conversations (book)", u: "https://www.crucialconversations.com/", k: "book" },
  ],
  "code review": [
    { t: "Code review — Google eng practices", u: "https://google.github.io/eng-practices/review/", k: "docs" },
    { t: "GitHub — reviewing PRs", u: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews", k: "docs" },
  ],
  "code review etiquette": [
    { t: "Code review etiquette — freeCodeCamp", u: "https://www.freecodecamp.org/news/how-to-give-and-receive-code-review/", k: "article" },
    { t: "Code review — Google eng practices", u: "https://google.github.io/eng-practices/review/", k: "docs" },
  ],
  "reviewing code effectively": [
    { t: "Code review — Google eng practices", u: "https://google.github.io/eng-practices/review/reviewer/", k: "docs" },
    { t: "How to review code — GitHub blog", u: "https://github.blog/engineering/engineering-practices/code-review/", k: "article" },
  ],
  "handling feedback gracefully": [
    { t: "Receiving feedback — HBR", u: "https://hbr.org/2021/03/how-to-receive-feedback-well", k: "article" },
    { t: "Radical candor", u: "https://www.radicalcandor.com/", k: "book" },
  ],
  "automated vs manual review": [
    { t: "Automated code review — freeCodeCamp", u: "https://www.freecodecamp.org/news/automated-code-review/", k: "article" },
    { t: "ESLint", u: "https://eslint.org/", k: "practice" },
  ],
  "security in review": [
    { t: "Security review — OWASP", u: "https://owasp.org/www-project-code-review-guide/", k: "docs" },
    { t: "Security in code review — GitHub", u: "https://docs.github.com/en/code-security", k: "docs" },
  ],
  "professional ethics": [
    { t: "Ethics in tech — ACM", u: "https://www.acm.org/code-of-ethics", k: "docs" },
  ],
  "honesty and transparency": [
    { t: "Transparency at work — HBR", u: "https://hbr.org/topic/transparency", k: "article" },
  ],
  "data privacy": [
    { t: "Data privacy — GDPR", u: "https://gdpr-info.eu/", k: "docs" },
    { t: "Privacy — EFF", u: "https://www.eff.org/issues/privacy", k: "article" },
  ],
  "responsible use of ai": [
    { t: "Responsible AI — Google", u: "https://ai.google/responsibility/", k: "article" },
    { t: "AI ethics — UNESCO", u: "https://www.unesco.org/en/artificial-intelligence/recommendation-ethics", k: "article" },
  ],
  "intellectual property": [
    { t: "IP — WIPO", u: "https://www.wipo.int/about-ip/en/", k: "article" },
    { t: "Open source licenses — choosealicense", u: "https://choosealicense.com/", k: "article" },
  ],
  "professional boundaries": [
    { t: "Professional boundaries — HBR", u: "https://hbr.org/topic/work-life-balance", k: "article" },
  ],

  // ── data science / ml ──────────────────────────────────────────────────────
  python: [
    { t: "Python official docs", u: "https://docs.python.org/3/", k: "docs" },
    { t: "Python.org tutorial", u: "https://docs.python.org/3/tutorial/", k: "course" },
    { t: "Automate the Boring Stuff (free book)", u: "https://automatetheboringstuff.com/", k: "book" },
  ],
  jupyter: [
    { t: "Jupyter docs", u: "https://docs.jupyter.org/en/latest/", k: "docs" },
    { t: "JupyterLab docs", u: "https://jupyterlab.readthedocs.io/", k: "docs" },
  ],
  "environment setup jupyter": [
    { t: "Jupyter install docs", u: "https://jupyter.org/install", k: "docs" },
    { t: "Anaconda docs", u: "https://docs.anaconda.com/", k: "docs" },
  ],
  numpy: [
    { t: "NumPy official docs", u: "https://numpy.org/doc/stable/", k: "docs" },
    { t: "NumPy quickstart", u: "https://numpy.org/doc/stable/user/quickstart.html", k: "course" },
  ],
  pandas: [
    { t: "pandas official docs", u: "https://pandas.pydata.org/docs/", k: "docs" },
    { t: "pandas — 10 minutes to pandas", u: "https://pandas.pydata.org/docs/user_guide/10min.html", k: "course" },
  ],
  "core library": [
    { t: "pandas docs", u: "https://pandas.pydata.org/docs/", k: "docs" },
    { t: "NumPy docs", u: "https://numpy.org/doc/stable/", k: "docs" },
  ],
  "core data structures": [
    { t: "pandas data structures", u: "https://pandas.pydata.org/docs/user_guide/dsintro.html", k: "docs" },
    { t: "NumPy arrays", u: "https://numpy.org/doc/stable/user/absolute_beginners.html", k: "course" },
  ],
  "key functions and methods": [
    { t: "pandas API reference", u: "https://pandas.pydata.org/docs/reference/", k: "docs" },
    { t: "NumPy reference", u: "https://numpy.org/doc/stable/reference/", k: "docs" },
  ],
  "working with data": [
    { t: "pandas — working with data", u: "https://pandas.pydata.org/docs/getting_started/intro_tutorials/", k: "course" },
    { t: "freeCodeCamp — pandas course", u: "https://www.freecodecamp.org/news/pandas/", k: "course" },
  ],
  "loading and cleaning data": [
    { t: "pandas — IO tools", u: "https://pandas.pydata.org/docs/user_guide/io.html", k: "docs" },
    { t: "Data cleaning — freeCodeCamp", u: "https://www.freecodecamp.org/news/data-cleaning-in-python/", k: "article" },
  ],
  "transforming and filtering": [
    { t: "pandas — reshaping", u: "https://pandas.pydata.org/docs/user_guide/reshaping.html", k: "docs" },
    { t: "pandas — indexing & selecting", u: "https://pandas.pydata.org/docs/user_guide/indexing.html", k: "docs" },
  ],
  "handling missing values": [
    { t: "pandas — missing data", u: "https://pandas.pydata.org/docs/user_guide/missing_data.html", k: "docs" },
    { t: "Missing data — freeCodeCamp", u: "https://www.freecodecamp.org/news/data-cleaning-in-python/", k: "article" },
  ],
  "analysis and visualization": [
    { t: "Matplotlib docs", u: "https://matplotlib.org/stable/", k: "docs" },
    { t: "Seaborn docs", u: "https://seaborn.pydata.org/", k: "docs" },
  ],
  "visualization techniques": [
    { t: "Matplotlib gallery", u: "https://matplotlib.org/stable/gallery/", k: "docs" },
    { t: "Seaborn tutorial", u: "https://seaborn.pydata.org/tutorial.html", k: "course" },
  ],
  "statistical methods": [
    { t: "Statistics — Khan Academy", u: "https://www.khanacademy.org/math/statistics-probability", k: "course" },
    { t: "SciPy stats docs", u: "https://docs.scipy.org/doc/scipy/reference/stats.html", k: "docs" },
  ],
  "model selection": [
    { t: "scikit-learn — model selection", u: "https://scikit-learn.org/stable/model_selection.html", k: "docs" },
    { t: "scikit-learn — user guide", u: "https://scikit-learn.org/stable/user_guide.html", k: "docs" },
  ],
  "training and evaluation": [
    { t: "scikit-learn — cross-validation", u: "https://scikit-learn.org/stable/modules/cross_validation.html", k: "docs" },
    { t: "ML metrics — Google", u: "https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall", k: "course" },
  ],
  "model deployment": [
    { t: "MLOps — Google", u: "https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning", k: "article" },
    { t: "MLflow docs", u: "https://mlflow.org/docs/latest/", k: "docs" },
  ],
  "pipelines and automation": [
    { t: "scikit-learn pipelines", u: "https://scikit-learn.org/stable/modules/pipeline.html", k: "docs" },
    { t: "Airflow docs", u: "https://airflow.apache.org/docs/", k: "docs" },
  ],
  "monitoring and drift": [
    { t: "Model monitoring — Evidently", u: "https://www.evidentlyai.com/ml-in-production/model-monitoring", k: "article" },
    { t: "Data drift — Wikipedia", u: "https://en.wikipedia.org/wiki/Concept_drift", k: "article" },
  ],
  "reproducible workflows": [
    { t: "Reproducibility — The Turing Way", u: "https://the-turing-way.netlify.app/reproducible-research/reproducible-research", k: "book" },
    { t: "DVC docs", u: "https://dvc.org/doc", k: "docs" },
  ],
  "code quality for data": [
    { t: "Clean data code — freeCodeCamp", u: "https://www.freecodecamp.org/news/clean-code-for-data-science/", k: "article" },
    { t: "Ruff (Python linter)", u: "https://docs.astral.sh/ruff/", k: "docs" },
  ],
  "ethics and bias": [
    { t: "Fairness in ML — Google", u: "https://developers.google.com/machine-learning/fairness-overview", k: "course" },
    { t: "Ethics — OECD AI", u: "https://oecd.ai/en/ai-principles", k: "article" },
  ],
  "datasets and communities": [
    { t: "Kaggle datasets", u: "https://www.kaggle.com/datasets", k: "practice" },
    { t: "UCI ML repository", u: "https://archive.ics.uci.edu/", k: "repo" },
  ],
  "kaggle style challenges": [
    { t: "Kaggle competitions", u: "https://www.kaggle.com/competitions", k: "practice" },
    { t: "Kaggle Learn", u: "https://www.kaggle.com/learn", k: "course" },
  ],
  "real datasets": [
    { t: "Kaggle datasets", u: "https://www.kaggle.com/datasets", k: "practice" },
    { t: "Awesome Public Datasets", u: "https://github.com/awesomedata/awesome-public-datasets", k: "repo" },
  ],
  "machine learning": [
    { t: "scikit-learn docs", u: "https://scikit-learn.org/stable/", k: "docs" },
    { t: "Google ML Crash Course", u: "https://developers.google.com/machine-learning/crash-course", k: "course" },
    { t: "CS229 — Stanford", u: "https://cs229.stanford.edu/", k: "course" },
  ],
  "deep learning": [
    { t: "deeplearning.ai courses", u: "https://www.deeplearning.ai/courses/", k: "course" },
    { t: "PyTorch tutorials", u: "https://pytorch.org/tutorials/", k: "course" },
  ],
  "statistics": [
    { t: "Statistics — Khan Academy", u: "https://www.khanacademy.org/math/statistics-probability", k: "course" },
    { t: "Seeing Theory (interactive)", u: "https://seeing-theory.brown.edu/", k: "course" },
  ],
  probability: [
    { t: "Probability — Khan Academy", u: "https://www.khanacademy.org/math/statistics-probability/probability-library", k: "course" },
    { t: "3Blue1Brown — probability", u: "https://www.youtube.com/playlist?list=PLZHQObOWTQDOjmo3Y6ADm0ScWAlEXf-fI", k: "video" },
  ],
  "linear algebra": [
    { t: "3Blue1Brown — Essence of Linear Algebra", u: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", k: "video" },
    { t: "MIT OCW — Linear Algebra (Strang)", u: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", k: "course" },
    { t: "Khan Academy — linear algebra", u: "https://www.khanacademy.org/math/linear-algebra", k: "course" },
  ],
  calculus: [
    { t: "3Blue1Brown — Essence of Calculus", u: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr", k: "video" },
    { t: "Khan Academy — calculus", u: "https://www.khanacademy.org/math/calculus-1", k: "course" },
  ],
  algebra: [
    { t: "Khan Academy — algebra", u: "https://www.khanacademy.org/math/algebra", k: "course" },
  ],
  mathematics: [
    { t: "Khan Academy — math", u: "https://www.khanacademy.org/math", k: "course" },
    { t: "Brilliant", u: "https://brilliant.org/", k: "practice" },
  ],
  thermodynamics: [
    { t: "Thermodynamics — Khan Academy", u: "https://www.khanacademy.org/science/physics/thermodynamics", k: "course" },
    { t: "MIT OCW — Thermodynamics", u: "https://ocw.mit.edu/courses/2-43-advanced-thermodynamics-spring-2024/", k: "course" },
  ],
  "physics and mechanics": [
    { t: "Physics — Khan Academy", u: "https://www.khanacademy.org/science/physics", k: "course" },
    { t: "MIT OCW — Physics I", u: "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/", k: "course" },
  ],
  kinematics: [
    { t: "Kinematics — Khan Academy", u: "https://www.khanacademy.org/science/physics/one-dimensional-motion", k: "course" },
  ],
  "work energy power": [
    { t: "Work & energy — Khan Academy", u: "https://www.khanacademy.org/science/physics/work-and-energy", k: "course" },
  ],
  "rotational motion": [
    { t: "Rotational motion — Khan Academy", u: "https://www.khanacademy.org/science/physics/torque-angular-momentum", k: "course" },
  ],
  fluids: [
    { t: "Fluids — Khan Academy", u: "https://www.khanacademy.org/science/physics/fluids", k: "course" },
  ],

  // ── misc containers (generic but honest links) ─────────────────────────────
  career: [
    { t: "Career guides — freeCodeCamp", u: "https://www.freecodecamp.org/news/tag/careers/", k: "article" },
    { t: "The Muse — career advice", u: "https://www.themuse.com/advice", k: "article" },
  ],
  resources: [
    { t: "freeCodeCamp — free courses", u: "https://www.freecodecamp.org/learn", k: "course" },
    { t: "Khan Academy", u: "https://www.khanacademy.org/", k: "course" },
    { t: "The Odin Project", u: "https://www.theodinproject.com/", k: "course" },
  ],
  "specializations and next steps": [
    { t: "Career paths — LinkedIn Learning", u: "https://www.linkedin.com/learning/topics/career-development", k: "course" },
    { t: "Levels.fyi — career ladders", u: "https://www.levels.fyi/", k: "practice" },
  ],
  "industry applications": [
    { t: "Case studies — HBR", u: "https://hbr.org/", k: "article" },
    yt("industry applications"),
  ],
  "advanced topics": [
    yt("advanced topics"),
    { t: "MIT OpenCourseWare", u: "https://ocw.mit.edu/", k: "course" },
  ],
  "beginner exercises": [
    { t: "Exercism", u: "https://exercism.org/", k: "practice" },
    { t: "Codecademy — free exercises", u: "https://www.codecademy.com/", k: "practice" },
  ],
  "intermediate challenges": [
    { t: "Codewars", u: "https://www.codewars.com/", k: "practice" },
    { t: "LeetCode", u: "https://leetcode.com/problemset/", k: "practice" },
  ],
  "performance optimization": [
    { t: "Web performance — web.dev", u: "https://web.dev/learn/performance/", k: "course" },
    { t: "Web performance — MDN", u: "https://developer.mozilla.org/en-US/docs/Learn/Performance", k: "course" },
  ],
  performance: [
    { t: "Web performance — web.dev", u: "https://web.dev/learn/performance/", k: "course" },
    { t: "Core Web Vitals — web.dev", u: "https://web.dev/explore/learn-core-web-vitals", k: "course" },
  ],
  maintenance: [
    yt("software maintenance"),
    { t: "Refactoring — Martin Fowler", u: "https://refactoring.com/", k: "book" },
  ],
  debugging: [
    { t: "Chrome DevTools — debug", u: "https://developer.chrome.com/docs/devtools/javascript/", k: "docs" },
    { t: "Debugging — The Missing Semester", u: "https://missing.csail.mit.edu/2020/debugging/", k: "course" },
  ],
  integration: [
    { t: "Integrations — MDN", u: "https://developer.mozilla.org/en-US/docs/Web/API", k: "docs" },
    so("software integration"),
  ],
  collaboration: [
    { t: "Team collaboration — Atlassian", u: "https://www.atlassian.com/team-playbook", k: "article" },
    { t: "GitHub — collaboration", u: "https://docs.github.com/en/get-started/using-github/github-flow", k: "docs" },
  ],
  interfacing: [
    so("software interfacing"),
    yt("api integration"),
  ],
  "configuration and files": [
    yt("configuration files"),
    { t: "Dotfiles — GitHub", u: "https://github.com/mathiasbynens/dotfiles", k: "repo" },
  ],
  "exploratory analysis": [
    { t: "EDA — freeCodeCamp", u: "https://www.freecodecamp.org/news/exploratory-data-analysis/", k: "article" },
    { t: "pandas — EDA tutorial", u: "https://pandas.pydata.org/docs/getting_started/intro_tutorials/", k: "course" },
  ],
  "incident response": [
    { t: "Incident response — Google SRE", u: "https://sre.google/sre-book/incident-response/", k: "book" },
    { t: "NIST incident response", u: "https://csrc.nist.gov/pubs/sp/800/61/r2/upd1/final", k: "docs" },
  ],
  "infrastructure as code": [
    { t: "Terraform docs", u: "https://developer.hashicorp.com/terraform/docs", k: "docs" },
    { t: "Pulumi docs", u: "https://www.pulumi.com/docs/", k: "docs" },
  ],
  "design principles": [
    { t: "Laws of UX", u: "https://lawsofux.com/", k: "article" },
    { t: "Nielsen Norman Group", u: "https://www.nngroup.com/", k: "article" },
  ],
  "design system": [
    { t: "Design systems — NN/g", u: "https://www.nngroup.com/articles/design-systems-101/", k: "article" },
    { t: "shadcn/ui", u: "https://ui.shadcn.com/", k: "docs" },
  ],
  "essential tools": [
    yt("essential developer tools"),
    { t: "VS Code docs", u: "https://code.visualstudio.com/docs", k: "docs" },
  ],
  "advanced features": [
    yt("advanced features"),
    { t: "Documentation — official docs", u: "https://developer.mozilla.org/en-US/docs/Web", k: "docs" },
  ],
  "common pitfalls": [
    { t: "Common mistakes — freeCodeCamp", u: "https://www.freecodecamp.org/news/", k: "article" },
    so("common pitfalls"),
  ],
  "tokens and theming": [
    { t: "Design tokens — NN/g", u: "https://www.nngroup.com/articles/design-tokens/", k: "article" },
    { t: "Theming — Tailwind docs", u: "https://tailwindcss.com/docs/theme", k: "docs" },
  ],
  "governance and adoption": [
    { t: "Design system governance — NN/g", u: "https://www.nngroup.com/articles/design-system-governance/", k: "article" },
  ],
  "frontend performance": [
    { t: "Web performance — web.dev", u: "https://web.dev/learn/performance/", k: "course" },
    { t: "Rendering performance — web.dev", u: "https://web.dev/learn/performance/rendering/", k: "course" },
  ],
  "web accessibility": [
    { t: "Accessibility — web.dev", u: "https://web.dev/learn/accessibility/", k: "course" },
    { t: "A11y project checklist", u: "https://www.a11yproject.com/checklist/", k: "cheatsheet" },
  ],
  "state and data": [
    { t: "State — react.dev", u: "https://react.dev/learn/state-a-components-memory", k: "course" },
    { t: "State management — Zustand", u: "https://zustand.docs.pmnd.rs/", k: "docs" },
  ],
  "layers and organization": [
    yt("code organization"),
    { t: "Clean Architecture — freeCodeCamp", u: "https://www.freecodecamp.org/news/clean-architecture-for-the-others/", k: "article" },
  ],
  "interface and navigation": [
    { t: "Navigation — NN/g", u: "https://www.nngroup.com/articles/navigation-101/", k: "article" },
  ],
  "audience and purpose": [
    { t: "UX research — NN/g", u: "https://www.nngroup.com/articles/ux-research/", k: "article" },
  ],
  "structure and navigation": [
    { t: "Information architecture — NN/g", u: "https://www.nngroup.com/articles/ia-vs-navigation/", k: "article" },
  ],
  "core skills": [
    { t: "Core skills — freeCodeCamp", u: "https://www.freecodecamp.org/learn", k: "course" },
    yt("core skills"),
  ],
  "professional tips": [
    yt("professional tips"),
    { t: "Career advice — The Muse", u: "https://www.themuse.com/advice", k: "article" },
  ],
  "efficiency tips and shortcuts": [
    yt("productivity shortcuts"),
    { t: "VS Code shortcuts", u: "https://code.visualstudio.com/docs/getstarted/keybindings", k: "cheatsheet" },
  ],
  "tools and shortcuts": [
    { t: "VS Code keybindings", u: "https://code.visualstudio.com/docs/getstarted/keybindings", k: "cheatsheet" },
    yt("tool shortcuts"),
  ],
  "from concept to deliverable": [
    yt("concept to deliverable"),
    { t: "Project management — HBR", u: "https://hbr.org/topic/project-management", k: "article" },
  ],
  "standards and codes": [
    { t: "Standards — ISO", u: "https://www.iso.org/standards.html", k: "docs" },
  ],
  "quality and review": [
    { t: "QA — freeCodeCamp", u: "https://www.freecodecamp.org/news/software-testing/", k: "article" },
    { t: "Google eng practices — review", u: "https://google.github.io/eng-practices/review/", k: "docs" },
  ],
  "cost drivers": [
    { t: "AWS cost optimization", u: "https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html", k: "docs" },
  ],
  "cost reduction levers": [
    { t: "FinOps — cost reduction", u: "https://www.finops.org/framework/capabilities/", k: "article" },
  ],
  "trade off analysis": [
    { t: "Trade-offs — System Design Primer", u: "https://github.com/donnemartin/system-design-primer", k: "repo" },
    { t: "Decision making — HBR", u: "https://hbr.org/topic/decision-making", k: "article" },
  ],
};
