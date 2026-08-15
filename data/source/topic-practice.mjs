// ─────────────────────────────────────────────────────────────────────────────
// Practice catalog.
// Every learnable node ships a `practice` list: direct links to platforms where
// the learner can immediately practise that exact topic. Entries are curated
// for the most common topics (CURATED_PRACTICE, keyed like TOPIC_RESOURCES)
// and generated from roadmap-aware rules for everything else (PRACTICE_RULES +
// domain/skill fallbacks). Rules always emit DIRECT platform pages — never
// search URLs.
// Practice shape: { t: title, p: platform, u: url, d: difficulty, e: time,
//                   s: [skills], ds: description }
// ─────────────────────────────────────────────────────────────────────────────

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

// helpers — build practice entries with sane defaults
const p = (t, pl, u, d, e, s, ds) => ({ t, p: pl, u, d, e, s, ds });

// ── context families ─────────────────────────────────────────────────────────
// A rule only fires inside a roadmap whose domain/category belongs to the rule's
// family. This is what stops LeetCode appearing in WordPress/AutoCAD or CSSBattle
// inside an engineering roadmap. Values are lowercase roadmap domains/categories.
const CODE = new Set([
  "software development", "backend", "frontend", "programming languages",
  "mobile development", "game & graphics", "blockchain & web3", "qa & testing",
  "databases", "database & infrastructure", "ai & data science",
  "artificial intelligence & data", "data & business", "cloud & devops",
  "iot & robotics", "electronics & embedded", "cybersecurity",
]);
const WEB = new Set([
  "frontend", "software development", "backend", "mobile development",
  "ui/ux & design", "qa & testing", "cloud & devops", "databases",
  "database & infrastructure", "programming languages", "cybersecurity",
  "ai & data science", "artificial intelligence & data", "data & business",
]);
const CLOUD = new Set([
  "cloud & devops", "software development", "backend", "frontend", "databases",
  "database & infrastructure", "mobile development", "game & graphics",
  "blockchain & web3", "qa & testing", "cybersecurity", "electronics & embedded",
  "iot & robotics", "ai & data science", "artificial intelligence & data",
  "data & business", "programming languages",
]);
const ENG = new Set(["engineering", "engineering software", "electronics & embedded", "iot & robotics"]);
const DATA = new Set([
  "ai & data science", "artificial intelligence & data", "data & business",
  "databases", "database & infrastructure", "backend", "programming languages",
  "software development", "cloud & devops", "qa & testing", "blockchain & web3",
  "cybersecurity", "mobile development", "frontend", "game & graphics",
]);
const SEC = new Set([
  "cybersecurity", "software development", "backend", "frontend", "cloud & devops",
  "databases", "database & infrastructure", "ai & data science",
  "artificial intelligence & data", "data & business", "programming languages",
  "mobile development", "game & graphics", "blockchain & web3", "qa & testing",
  "electronics & embedded", "iot & robotics", "engineering", "engineering software",
]);

// Slugs inside coding domains that are really CMS / no-code / consulting
// careers — algorithm and language-kata platforms would be noise there.
const NON_CODING_SLUGS = new Set([
  "wordpress", "wordpress-developer", "no-code-developer", "erp-consultant",
  "sap-consultant", "salesforce-developer", "product-manager", "technical-writer",
]);

const fam = (ctx = {}) => String(ctx.domain ?? ctx.skillCategory ?? "").toLowerCase();
const inFam = (ctx, set) => set.has(fam(ctx));
const isCoding = (ctx) => inFam(ctx, CODE) && !NON_CODING_SLUGS.has(ctx.slug);

// Algorithm kata / interview platforms — the ones that are noise outside real
// coding careers (WordPress, AutoCAD, PowerPoint…). SQL and language tracks
// (HackerRank SQL, HackerRank JS, Exercism language tracks) stay allowed.
const ALGO_HOSTS = new Set(["leetcode.com", "neetcode.io", "codeforces.com", "codechef.com", "codewars.com", "exercism.org"]);
const isAlgoUrl = (u = "") => {
  try {
    const { hostname, pathname } = new URL(u);
    const h = hostname.replace(/^www\./, "");
    if (ALGO_HOSTS.has(h)) return true;
    return h === "hackerrank.com" && /\/domains\/algorithms/.test(pathname);
  } catch {
    return false;
  }
};
export { isCoding, isAlgoUrl };

// curated entries — keyed by normalized label (same normalization as resources)
export const CURATED_PRACTICE = {
  // ── SQL ────────────────────────────────────────────────────────────────────
  "sql joins": [
    p("JOIN challenges", "HackerRank", "https://www.hackerrank.com/domains/sql?filters%5Bsubdomains%5D%5B%5D=join", "Intermediate", "30–60 min", ["JOIN", "LEFT/RIGHT JOIN", "INNER JOIN"], "Practice every JOIN flavor on real SQL datasets."),
    p("SQL JOIN problems", "LeetCode", "https://leetcode.com/problemset/database/", "Intermediate", "45–90 min", ["JOIN", "GROUP BY", "Aggregation"], "Database problems that combine tables and aggregate the result."),
    p("Join exercises", "SQLBolt", "https://sqlbolt.com/lesson/select_queries_with_joins", "Beginner", "20–40 min", ["INNER JOIN", "Aliasing"], "Interactive JOIN lessons with instant browser feedback."),
  ],
  "select and filtering": [
    p("Basic SELECT challenges", "HackerRank", "https://www.hackerrank.com/domains/sql?filters%5Bsubdomains%5D%5B%5D=select", "Beginner", "20–40 min", ["SELECT", "WHERE", "Filtering"], "Read-only SELECT queries on practice databases."),
    p("Filtering practice", "SQLZoo", "https://sqlzoo.net/wiki/SELECT_from_WORLD_Tutorial", "Beginner", "20–40 min", ["SELECT", "WHERE", "LIKE"], "Step-by-step SELECT tutorial with live checks."),
    p("SQL queries", "W3Schools", "https://www.w3schools.com/sql/exercise.asp", "Beginner", "15–30 min", ["SELECT", "WHERE", "ORDER BY"], "Quick multiple-choice SQL exercises."),
  ],
  "aggregations and group by": [
    p("Aggregation challenges", "HackerRank", "https://www.hackerrank.com/domains/sql?filters%5Bsubdomains%5D%5B%5D=aggregation", "Intermediate", "30–60 min", ["GROUP BY", "COUNT", "SUM", "HAVING"], "Summarize and group data across practice tables."),
    p("SQL aggregation problems", "LeetCode", "https://leetcode.com/problemset/database/", "Intermediate", "45–90 min", ["GROUP BY", "HAVING", "Aggregates"], "Real interview SQL questions about grouping."),
  ],
  "subqueries and ctes": [
    p("Subquery challenges", "HackerRank", "https://www.hackerrank.com/domains/sql?filters%5Bsubdomains%5D%5B%5D=advanced_select", "Intermediate", "30–60 min", ["Subqueries", "CTEs", "Nested SELECT"], "Advanced SELECT problems that nest queries."),
    p("Advanced SQL", "LeetCode", "https://leetcode.com/problemset/database/", "Advanced", "60–90 min", ["CTEs", "Window functions", "Subqueries"], "Interview-level SQL with modern query constructs."),
  ],
  "indexes and performance": [
    p("Query optimization practice", "HackerRank", "https://www.hackerrank.com/domains/sql", "Intermediate", "45–90 min", ["EXPLAIN", "Indexes", "Query tuning"], "Practice writing queries that run fast on large tables."),
    p("Indexing lab", "PostgreSQL Exercises", "https://pgexercises.com/", "Intermediate", "60–120 min", ["Indexes", "EXPLAIN", "Join strategies"], "Real PostgreSQL exercises — including performance-sensitive queries."),
  ],
  "transactions": [
    p("Transaction practice", "W3Schools", "https://www.w3schools.com/sql/sql_ref_transaction.asp", "Intermediate", "20–40 min", ["BEGIN", "COMMIT", "ROLLBACK"], "Learn and test transaction control statements."),
    p("Database exercises", "SQLBolt", "https://sqlbolt.com/", "Beginner", "30–60 min", ["SQL basics", "Data manipulation"], "Interactive lessons covering INSERT/UPDATE/DELETE and beyond."),
  ],
  crud: [
    p("CRUD exercises", "SQLZoo", "https://sqlzoo.net/wiki/INSERT_and_UPDATE", "Beginner", "20–40 min", ["INSERT", "UPDATE", "DELETE"], "Practice creating, reading, updating and deleting rows."),
    p("Data manipulation", "HackerRank", "https://www.hackerrank.com/domains/sql?filters%5Bsubdomains%5D%5B%5D=basic_join", "Beginner", "20–40 min", ["INSERT", "UPDATE", "SELECT"], "Manipulate rows in practice tables."),
  ],
  "data modeling": [
    p("Schema design practice", "HackerRank", "https://www.hackerrank.com/domains/sql", "Intermediate", "45–90 min", ["Schema design", "Normalization", "Relationships"], "Design and query normalized schemas."),
    p("Database design exercises", "Vertabelo", "https://vertabelo.com/blog/database-design-exercises/", "Intermediate", "60–120 min", ["ER diagrams", "Normalization", "Keys"], "Guided database-design workouts with solutions."),
  ],

  // ── JavaScript ─────────────────────────────────────────────────────────────
  "variables and constants": [
    p("JS basics", "freeCodeCamp", "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", "Beginner", "30–60 min", ["let", "const", "var"], "Interactive lessons covering variables from scratch."),
    p("JavaScript fundamentals", "Codewars", "https://www.codewars.com/kata/search/javascript", "Beginner", "20–40 min", ["Variables", "Data types"], "Tiny JS katas ranked by difficulty."),
  ],
  "functions and scope": [
    p("Functions kata", "Codewars", "https://www.codewars.com/kata/search/javascript?q=function", "Intermediate", "20–40 min", ["Function declarations", "Scope", "Closures"], "Practice writing functions that pass real tests."),
    p("JS functions", "HackerRank", "https://www.hackerrank.com/domains/tutorials/10-days-of-javascript", "Intermediate", "30–60 min", ["Functions", "Scope"], "HackerRank's JavaScript track with auto-graded challenges."),
  ],
  "closures": [
    p("Closure challenges", "freeCodeCamp", "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", "Intermediate", "30–60 min", ["Closures", "Lexical scope"], "Reinforce closures inside freeCodeCamp's curriculum."),
    p("Closure katas", "Codewars", "https://www.codewars.com/kata/search/javascript?q=closure", "Intermediate", "20–40 min", ["Closures", "IIFEs"], "Small kata that force you to use closures."),
  ],
  arrays: [
    p("Array problems", "LeetCode", "https://leetcode.com/tag/array/", "Intermediate", "30–60 min", ["Array manipulation", "Two pointers"], "The most common interview category — filter to Easy first."),
    p("Array katas", "Codewars", "https://www.codewars.com/kata/search/javascript?q=array", "Beginner", "20–40 min", ["map", "filter", "reduce"], "Practice array methods on real kata."),
  ],
  strings: [
    p("String problems", "LeetCode", "https://leetcode.com/tag/string/", "Intermediate", "30–60 min", ["String manipulation", "Parsing"], "Interview string problems from Easy upward."),
    p("String katas", "Codewars", "https://www.codewars.com/kata/search/javascript?q=string", "Beginner", "20–40 min", ["String methods", "Regex"], "Manipulate strings in bite-sized challenges."),
  ],
  promises: [
    p("Promise challenges", "freeCodeCamp", "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/", "Intermediate", "45–90 min", ["Promises", "then/catch"], "Build a real project that depends on async JS."),
    p("Async kata", "Codewars", "https://www.codewars.com/kata/search/javascript?q=promise", "Intermediate", "20–40 min", ["Promises", "Async/await"], "Kata that chain and handle promises."),
  ],
  "async await": [
    p("Async JS challenges", "freeCodeCamp", "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/", "Intermediate", "45–90 min", ["async/await", "Error handling"], "Practice async/await inside a guided project."),
    p("Async katas", "Codewars", "https://www.codewars.com/kata/search/javascript?q=async", "Intermediate", "20–40 min", ["async/await", "Promises"], "Write async functions that pass tests."),
  ],
  "dom manipulation": [
    p("Build a UI", "freeCodeCamp", "https://www.freecodecamp.org/learn/2022/responsive-web-design/", "Beginner", "60–120 min", ["DOM", "Events", "Styling"], "Project-based practice that forces DOM work."),
    p("Frontend challenges", "Frontend Mentor", "https://www.frontendmentor.io/challenges", "Intermediate", "2–4 hours", ["DOM", "Layout", "Interactivity"], "Real designs to implement with HTML/CSS/JS."),
  ],
  "event handling": [
    p("Event challenges", "freeCodeCamp", "https://www.freecodecamp.org/learn/front-end-development-libraries/", "Beginner", "30–60 min", ["Events", "Listeners"], "Exercises where UI events drive the outcome."),
    p("Interactive demos", "CodePen", "https://codepen.io/", "Beginner", "20–40 min", ["Events", "DOM"], "Sketch interactive widgets and share them."),
  ],
  "react hooks": [
    p("React hooks project", "freeCodeCamp", "https://www.freecodecamp.org/learn/front-end-development-libraries/react/", "Intermediate", "2–3 hours", ["useState", "useEffect", "Custom hooks"], "Build React apps that lean on hooks."),
    p("React challenges", "Frontend Mentor", "https://www.frontendmentor.io/challenges?languages=React", "Intermediate", "2–4 hours", ["Hooks", "Components", "State"], "Real UI briefs solved with React."),
  ],
  "state management": [
    p("State practice", "freeCodeCamp", "https://www.freecodecamp.org/learn/front-end-development-libraries/", "Intermediate", "45–90 min", ["State", "Props", "Context"], "Manage state across a React exercise chain."),
    p("React interview practice", "InterviewBit", "https://www.interviewbit.com/react-interview-questions/", "Advanced", "60–90 min", ["State design", "Rendering"], "Think through state-heavy interview scenarios."),
  ],
  "props data flow": [
    p("Props exercises", "freeCodeCamp", "https://www.freecodecamp.org/learn/front-end-development-libraries/react/", "Beginner", "30–60 min", ["Props", "Component composition"], "Pass data between components in guided exercises."),
    p("Component challenges", "Frontend Mentor", "https://www.frontendmentor.io/challenges", "Beginner", "1–2 hours", ["Props", "Components"], "Break a real design into prop-driven components."),
  ],
  "css flexbox": [
    p("Flexbox froggy", "Flexbox Froggy", "https://flexboxfroggy.com/", "Beginner", "15–30 min", ["flex-direction", "justify-content", "align-items"], "A game that teaches every Flexbox property."),
    p("Flexbox layouts", "Frontend Mentor", "https://www.frontendmentor.io/challenges", "Beginner", "1–2 hours", ["Flexbox", "Responsive layout"], "Implement real layouts that demand flexbox."),
    p("Flexbox battles", "CSSBattle", "https://cssbattle.dev/", "Intermediate", "20–40 min", ["Flexbox", "Precision CSS"], "Reproduce targets pixel-perfectly."),
  ],
  "css grid": [
    p("Grid garden", "CSS Grid Garden", "https://cssgridgarden.com/", "Beginner", "15–30 min", ["grid-template", "grid-area", "Gap"], "A game that teaches CSS Grid interactively."),
    p("Grid layouts", "Frontend Mentor", "https://www.frontendmentor.io/challenges", "Intermediate", "1–2 hours", ["Grid", "Responsive design"], "Real briefs solved with grid layouts."),
  ],
  "css media queries": [
    p("Responsive challenges", "Frontend Mentor", "https://www.frontendmentor.io/challenges", "Intermediate", "1–2 hours", ["Media queries", "Breakpoints"], "Make real designs responsive at every width."),
    p("Responsive exercises", "freeCodeCamp", "https://www.freecodecamp.org/learn/2022/responsive-web-design/", "Beginner", "45–90 min", ["Media queries", "Units"], "Guided responsive-design projects."),
  ],
  "responsive design": [
    p("Responsive challenges", "Frontend Mentor", "https://www.frontendmentor.io/challenges", "Intermediate", "2–3 hours", ["Fluid layouts", "Breakpoints", "Images"], "Build real pages that work on every screen."),
    p("Responsive web design", "freeCodeCamp", "https://www.freecodecamp.org/learn/2022/responsive-web-design/", "Beginner", "3–5 hours", ["Flexbox", "Grid", "Media queries"], "Project-based responsive curriculum."),
  ],

  // ── Python ─────────────────────────────────────────────────────────────────
  "python functions": [
    p("Python functions", "HackerRank", "https://www.hackerrank.com/domains/python?filters%5Bsubdomains%5D%5B%5D=py-functionals", "Beginner", "20–40 min", ["Defining functions", "Return values"], "Auto-graded function challenges."),
    p("Python track", "Exercism", "https://exercism.org/tracks/python", "Beginner", "30–60 min", ["Functions", "Args & kwargs"], "Mentored exercises with a friendly community."),
  ],
  "python classes": [
    p("Python OOP", "Exercism", "https://exercism.org/tracks/python/concepts/classes", "Intermediate", "30–60 min", ["Classes", "Inheritance", "Magic methods"], "Exercises that build real class hierarchies."),
    p("Python katas", "Codewars", "https://www.codewars.com/kata/search/python?q=class", "Intermediate", "20–40 min", ["Classes", "Encapsulation"], "Practice OOP in short kata."),
  ],
  "python data types": [
    p("Python fundamentals", "HackerRank", "https://www.hackerrank.com/domains/python", "Beginner", "30–60 min", ["Types", "Strings", "Lists"], "The full Python beginner track."),
    p("Python exercises", "Exercism", "https://exercism.org/tracks/python", "Beginner", "30–60 min", ["Data types", "Functions"], "Bite-sized exercises with instant feedback."),
  ],
  "python loops": [
    p("Loops practice", "HackerRank", "https://www.hackerrank.com/domains/python?filters%5Bsubdomains%5D%5B%5D=py-introduction", "Beginner", "20–40 min", ["for", "while", "range"], "Loops challenges with auto-grading."),
    p("Loop katas", "Codewars", "https://www.codewars.com/kata/search/python?q=loop", "Beginner", "20–40 min", ["for", "while"], "Small kata that reward clean loop logic."),
  ],
  "pandas": [
    p("Pandas exercises", "Kaggle", "https://www.kaggle.com/learn/pandas", "Beginner", "2–3 hours", ["DataFrames", "Grouping", "Filtering"], "Kaggle's hands-on pandas micro-course."),
    p("Data wrangling", "LeetCode", "https://leetcode.com/problemset/database/", "Intermediate", "45–90 min", ["DataFrames", "Aggregations"], "Solve real data questions in code."),
  ],
  "data analysis": [
    p("Data analysis with Python", "freeCodeCamp", "https://www.freecodecamp.org/learn/data-analysis-with-python/", "Intermediate", "3–5 hours", ["pandas", "NumPy", "Visualization"], "Certification track with data analysis projects."),
    p("Kaggle micro-courses", "Kaggle", "https://www.kaggle.com/learn", "Beginner", "2–4 hours", ["Pandas", "Visualization", "Cleaning"], "Bite-sized courses with real datasets."),
  ],

  // ── DSA / algorithms ───────────────────────────────────────────────────────
  "arrays and strings problems": [
    p("Arrays & strings", "NeetCode", "https://neetcode.io/practice", "Intermediate", "60–120 min", ["Arrays", "Strings", "Two pointers"], "The canonical practice roadmap for interviews."),
    p("Array problems", "LeetCode", "https://leetcode.com/tag/array/", "Intermediate", "45–90 min", ["Array algorithms", "Sliding window"], "Filter to Easy/Medium and work up."),
    p("Algorithms track", "HackerRank", "https://www.hackerrank.com/domains/algorithms", "Intermediate", "60–120 min", ["Arrays", "Sorting", "Searching"], "Graded algorithm challenges."),
  ],
  "dynamic programming basics": [
    p("DP problems", "NeetCode", "https://neetcode.io/practice?tab=dynamicProgramming", "Intermediate", "60–120 min", ["Memoization", "Tabulation", "Subproblems"], "Start with the classic DP set."),
    p("Dynamic programming", "LeetCode", "https://leetcode.com/tag/dynamic-programming/", "Advanced", "60–120 min", ["1D DP", "2D DP", "State design"], "Interview DP problems from Easy upward."),
    p("DP fundamentals", "freeCodeCamp", "https://www.freecodecamp.org/news/demystifying-dynamic-programming/", "Intermediate", "30–60 min", ["Recurrences", "Optimization"], "Read the explainer, then solve the warm-ups."),
  ],
  "linked lists": [
    p("Linked list problems", "NeetCode", "https://neetcode.io/practice?tab=linkedList", "Intermediate", "45–90 min", ["Traversal", "Reversal", "Two pointers"], "The curated linked-list problem set."),
    p("Linked list tag", "LeetCode", "https://leetcode.com/tag/linked-list/", "Intermediate", "45–90 min", ["Pointers", "Merging"], "Interview linked-list problems."),
  ],
  "stacks and queues": [
    p("Stack & queue problems", "NeetCode", "https://neetcode.io/practice?tab=stack", "Intermediate", "45–90 min", ["Stacks", "Monotonic stack", "Queues"], "Practice the stack problem set."),
    p("Stack tag", "LeetCode", "https://leetcode.com/tag/stack/", "Intermediate", "45–90 min", ["Stack", "Parsing"], "Interview stack problems."),
  ],
  "trees and graphs": [
    p("Trees & graphs", "NeetCode", "https://neetcode.io/practice?tab=trees", "Advanced", "60–120 min", ["BST", "BFS", "DFS"], "Work through the tree and graph sets."),
    p("Tree problems", "LeetCode", "https://leetcode.com/tag/tree/", "Intermediate", "60–120 min", ["Traversals", "Recursion"], "Interview tree problems."),
    p("Graph problems", "LeetCode", "https://leetcode.com/tag/graph/", "Advanced", "60–120 min", ["Graphs", "Topological sort"], "From Easy graphs upward."),
  ],
  "binary search variants": [
    p("Binary search", "LeetCode", "https://leetcode.com/tag/binary-search/", "Intermediate", "45–90 min", ["Binary search", "Bounds"], "The classic binary-search problem set."),
    p("Search problems", "NeetCode", "https://neetcode.io/practice?tab=binarySearch", "Intermediate", "45–90 min", ["Binary search", "Sqrt / search"], "Curated search problems."),
  ],
  "two pointers": [
    p("Two pointers", "LeetCode", "https://leetcode.com/tag/two-pointers/", "Intermediate", "30–60 min", ["Two pointers", "In-place"], "Problems built for the two-pointer technique."),
    p("Two pointer set", "NeetCode", "https://neetcode.io/practice?tab=twoPointers", "Intermediate", "30–60 min", ["Two pointers", "Sliding window"], "Follow the recommended order."),
  ],
  "sliding window": [
    p("Sliding window", "LeetCode", "https://leetcode.com/tag/sliding-window/", "Intermediate", "45–90 min", ["Sliding window", "Hash maps"], "The dedicated sliding-window tag."),
    p("Window problems", "NeetCode", "https://neetcode.io/practice?tab=slidingWindow", "Intermediate", "45–90 min", ["Sliding window"], "Curated window problems in order."),
  ],
  "recursion": [
    p("Recursion problems", "LeetCode", "https://leetcode.com/tag/recursion/", "Intermediate", "45–90 min", ["Recursion", "Base cases"], "Practice recursive thinking on real problems."),
    p("Recursion katas", "Codewars", "https://www.codewars.com/kata/search?q=recursion", "Intermediate", "20–40 min", ["Recursion", "Backtracking"], "Short kata that require recursion."),
  ],
  "sorting and searching": [
    p("Sorting problems", "LeetCode", "https://leetcode.com/tag/sorting/", "Intermediate", "45–90 min", ["Sorting", "Searching"], "Sort-heavy interview problems."),
    p("Algorithms practice", "HackerRank", "https://www.hackerrank.com/domains/algorithms?filters%5Bsubdomains%5D%5B%5D=sorting", "Intermediate", "45–90 min", ["Sorting", "Searching"], "Graded sorting challenges."),
  ],
  "complexity analysis": [
    p("Complexity quiz", "Big-O Cheat Sheet", "https://www.bigocheatsheet.com/", "Beginner", "15–30 min", ["Big-O", "Complexity classes"], "Memorize the chart, then analyze code aloud."),
    p("Analysis practice", "LeetCode", "https://leetcode.com/problemset/", "Intermediate", "30–60 min", ["Time complexity", "Space complexity"], "Before solving, write the complexity of your approach."),
  ],
  "problem solving patterns": [
    p("14 interview patterns", "freeCodeCamp", "https://www.freecodecamp.org/news/the-14-patterns-to-master-any-coding-interview-question/", "Intermediate", "60–120 min", ["Patterns", "Problem solving"], "Read the patterns, then apply them on NeetCode."),
    p("Practice roadmap", "NeetCode", "https://neetcode.io/roadmap", "Intermediate", "60–120 min", ["Pattern recognition", "Techniques"], "A full ordered plan of pattern-based problems."),
  ],

  // ── Git / version control ──────────────────────────────────────────────────
  git: [
    p("Learn Git Branching", "Learn Git Branching", "https://learngitbranching.js.org/", "Beginner", "30–60 min", ["Branching", "Merging", "Rebasing"], "The classic interactive Git playground — visual and fun."),
    p("Git challenges", "GitHub Skills", "https://skills.github.com/", "Beginner", "30–60 min", ["Commits", "Branches", "Pull requests"], "Hands-on labs run right in your browser."),
  ],
  branches: [
    p("Branching practice", "Learn Git Branching", "https://learngitbranching.js.org/", "Beginner", "20–40 min", ["Branch", "Checkout", "Merge"], "Visual exercises dedicated to branches."),
    p("Branch & merge lab", "GitHub Skills", "https://skills.github.com/", "Beginner", "20–40 min", ["Branching", "Merging"], "Do it for real in a practice repository."),
  ],
  merging: [
    p("Merge practice", "Learn Git Branching", "https://learngitbranching.js.org/", "Beginner", "20–40 min", ["Merge", "Conflicts"], "Merge branches until it feels automatic."),
    p("Resolve conflicts", "GitHub Skills", "https://skills.github.com/", "Intermediate", "30–60 min", ["Conflict resolution", "Merging"], "Learn to resolve merge conflicts safely."),
  ],
  rebasing: [
    p("Rebase practice", "Learn Git Branching", "https://learngitbranching.js.org/", "Intermediate", "20–40 min", ["Rebase", "Interactive rebase"], "Visual lessons on rebasing."),
    p("Rebase challenges", "GitHub Skills", "https://skills.github.com/", "Intermediate", "30–60 min", ["Rebase", "History rewriting"], "Real repo practice with guided instructions."),
  ],
  "git workflows": [
    p("GitHub flow", "GitHub Skills", "https://skills.github.com/", "Beginner", "30–60 min", ["GitHub Flow", "Pull requests"], "Learn the standard team workflow hands-on."),
    p("Branching strategies", "Learn Git Branching", "https://learngitbranching.js.org/", "Intermediate", "30–60 min", ["Workflows", "Branching"], "Model team workflows visually."),
  ],

  // ── Docker / DevOps ────────────────────────────────────────────────────────
  docker: [
    p("Play with Docker", "Play with Docker", "https://labs.play-with-docker.com/", "Beginner", "30–60 min", ["Containers", "Images", "Ports"], "Run real Docker commands in your browser — no install."),
    p("Docker labs", "Killercoda", "https://killercoda.com/playgrounds/scenario/docker", "Beginner", "30–60 min", ["docker run", "Dockerfile", "Compose"], "Interactive Docker playgrounds."),
  ],
  "docker compose": [
    p("Compose lab", "Killercoda", "https://killercoda.com/playgrounds/scenario/docker", "Intermediate", "45–90 min", ["docker-compose.yml", "Services", "Networks"], "Run multi-service stacks in a sandbox."),
    p("Play with Docker", "Play with Docker", "https://labs.play-with-docker.com/", "Intermediate", "45–90 min", ["Compose", "Volumes"], "Compose real apps in the browser."),
  ],
  "dockerfiles": [
    p("Dockerfile practice", "Play with Docker", "https://labs.play-with-docker.com/", "Intermediate", "45–90 min", ["Dockerfile", "Build context", "Layers"], "Write and build Dockerfiles live."),
    p("Docker playground", "Killercoda", "https://killercoda.com/playgrounds/scenario/docker", "Intermediate", "45–90 min", ["Build", "Run", "Debug"], "Iterate on images in a sandbox."),
  ],
  kubernetes: [
    p("Kubernetes playground", "Killercoda", "https://killercoda.com/playgrounds/scenario/kubernetes", "Intermediate", "60–120 min", ["Pods", "Deployments", "Services"], "Real kubectl practice in your browser."),
    p("Kubernetes basics lab", "Katacoda Archive", "https://kubernetes.io/docs/tutorials/kubernetes-basics/", "Beginner", "60–120 min", ["Pods", "Deployments"], "Official interactive Kubernetes tutorials."),
  ],
  terraform: [
    p("Terraform playground", "Killercoda", "https://killercoda.com/playgrounds/scenario/terraform", "Intermediate", "60–120 min", ["Providers", "Resources", "Plan/apply"], "Write and apply Terraform configs in a sandbox."),
    p("Learn Terraform", "HashiCorp Learn", "https://developer.hashicorp.com/terraform/tutorials", "Beginner", "60–120 min", ["HCL", "State", "Modules"], "Official hands-on tutorials."),
  ],
  "containerization": [
    p("Container playground", "Play with Docker", "https://labs.play-with-docker.com/", "Beginner", "30–60 min", ["Containers", "Images", "Networks"], "Containerize a real app in the browser."),
    p("Container labs", "Killercoda", "https://killercoda.com/playgrounds/scenario/docker", "Beginner", "30–60 min", ["Docker", "Compose"], "Interactive container scenarios."),
  ],
  linux: [
    p("Linux playground", "Killercoda", "https://killercoda.com/playgrounds/scenario/linux", "Beginner", "30–60 min", ["Shell", "Commands", "Permissions"], "A real Linux shell in your browser."),
    p("Bandit levels", "OverTheWire", "https://overthewire.org/wargames/bandit/", "Beginner", "30–60 min", ["Commands", "Navigation", "Permissions"], "Level-based Linux challenges that teach by doing."),
    p("Learn Shell", "LearnShell.org", "https://www.learnshell.org/", "Beginner", "30–60 min", ["Shell basics", "Scripting"], "Interactive shell lessons."),
  ],
  "bash scripting": [
    p("Bash exercises", "LearnShell.org", "https://www.learnshell.org/", "Beginner", "30–60 min", ["Variables", "Conditionals", "Loops"], "Interactive Bash scripting lessons."),
    p("Shell scripting lab", "Killercoda", "https://killercoda.com/playgrounds/scenario/linux", "Intermediate", "45–90 min", ["Scripts", "Pipes", "Cron"], "Write and run real scripts."),
  ],
  "networking commands": [
    p("Network command lab", "Killercoda", "https://killercoda.com/playgrounds/scenario/linux", "Intermediate", "30–60 min", ["ping", "curl", "traceroute"], "Run real networking commands in a sandbox."),
    p("Linux networking", "OverTheWire", "https://overthewire.org/wargames/bandit/", "Intermediate", "45–90 min", ["SSH", "Ports", "Processes"], "Solve levels that require network tools."),
  ],

  // ── Cybersecurity ──────────────────────────────────────────────────────────
  "sql injection": [
    p("SQL injection labs", "PortSwigger Web Security Academy", "https://portswigger.net/web-security/sql-injection", "Intermediate", "60–120 min", ["SQLi detection", "Exploitation", "Blind SQLi"], "Free browser-based labs on every SQLi flavor."),
    p("SQLi challenges", "TryHackMe", "https://tryhackme.com/room/sqlinjection", "Beginner", "45–90 min", ["SQLi", "Web exploitation"], "Guided rooms that walk through real payloads."),
  ],
  "cross site scripting": [
    p("XSS labs", "PortSwigger Web Security Academy", "https://portswigger.net/web-security/cross-site-scripting", "Intermediate", "60–120 min", ["Reflected XSS", "Stored XSS", "DOM XSS"], "Hands-on XSS labs with a working lab environment."),
    p("XSS challenges", "TryHackMe", "https://tryhackme.com/room/xss", "Beginner", "45–90 min", ["XSS", "Payloads"], "Guided XSS exploitation rooms."),
  ],
  "cross site request forgery": [
    p("CSRF labs", "PortSwigger Web Security Academy", "https://portswigger.net/web-security/csrf", "Intermediate", "45–90 min", ["CSRF", "Tokens", "Exploitation"], "Lab-based CSRF practice."),
    p("Web security rooms", "TryHackMe", "https://tryhackme.com/module/web-fundamentals", "Beginner", "45–90 min", ["CSRF", "Session handling"], "Guided web security modules."),
  ],
  osint: [
    p("OSINT challenges", "TryHackMe", "https://tryhackme.com/module/osint-fundamentals", "Beginner", "45–90 min", ["OSINT", "Reconnaissance"], "Guided OSINT rooms with real targets."),
    p("OSINT wargames", "OverTheWire", "https://overthewire.org/wargames/krypton/", "Intermediate", "45–90 min", ["Recon", "Analysis"], "Levels that force investigation skills."),
  ],
  "digital forensics": [
    p("Forensics rooms", "TryHackMe", "https://tryhackme.com/module/cyber-defence", "Intermediate", "60–120 min", ["Disk forensics", "Memory analysis"], "Practical forensic investigation rooms."),
    p("Forensics challenges", "Hack The Box", "https://www.hackthebox.com/hacker/ctf", "Advanced", "2–4 hours", ["Forensics", "Steganography"], "CTF forensics challenges."),
  ],
  "malware analysis": [
    p("Malware analysis", "TryHackMe", "https://tryhackme.com/module/malware-analysis", "Advanced", "2–3 hours", ["Static analysis", "Dynamic analysis"], "Guided malware triage rooms."),
    p("RE challenges", "Hack The Box", "https://www.hackthebox.com/hacker/ctf", "Advanced", "2–4 hours", ["Reverse engineering", "Debugging"], "CTF reverse-engineering challenges."),
  ],
  "exploitation techniques": [
    p("Exploitation labs", "TryHackMe", "https://tryhackme.com/module/hacking-essentials", "Intermediate", "60–120 min", ["Exploitation", "Privilege escalation"], "Practice exploiting intentionally vulnerable targets."),
    p("Offensive challenges", "Hack The Box", "https://www.hackthebox.com/", "Advanced", "2–4 hours", ["Enumeration", "Exploitation"], "Attack real vulnerable machines legally."),
  ],
  "information gathering": [
    p("Recon challenges", "TryHackMe", "https://tryhackme.com/module/passive-reconnaissance", "Beginner", "30–60 min", ["Recon", "OSINT"], "Learn and practise passive recon."),
    p("Recon practice", "Hack The Box", "https://www.hackthebox.com/", "Intermediate", "60–120 min", ["Enumeration", "Footprinting"], "Start every box with enumeration."),
  ],
  "vulnerability analysis": [
    p("Vulnerability labs", "TryHackMe", "https://tryhackme.com/module/vulnerability-research", "Intermediate", "60–120 min", ["CVE research", "Exploit validation"], "Research and validate real vulnerabilities."),
    p("Web security labs", "PortSwigger Web Security Academy", "https://portswigger.net/web-security/all-labs", "Intermediate", "60–120 min", ["Vulnerability hunting", "Exploitation"], "A full lab library on web vulnerabilities."),
  ],
  "access control": [
    p("Access control labs", "PortSwigger Web Security Academy", "https://portswigger.net/web-security/access-control", "Intermediate", "45–90 min", ["IDOR", "Privilege escalation"], "Practice finding broken access control."),
    p("Auth challenges", "TryHackMe", "https://tryhackme.com/module/web-fundamentals", "Beginner", "45–90 min", ["Authentication", "Authorization"], "Guided labs on auth flaws."),
  ],
  "post exploitation": [
    p("Post-exploitation rooms", "TryHackMe", "https://tryhackme.com/module/post-exploitation-basics", "Intermediate", "60–120 min", ["Lateral movement", "Persistence"], "Practise what happens after the shell."),
    p("Privilege escalation", "TryHackMe", "https://tryhackme.com/room/linuxprivesc", "Intermediate", "60–90 min", ["PrivEsc", "Enumeration"], "Hands-on Linux privilege escalation."),
  ],
  "network security": [
    p("Network security rooms", "TryHackMe", "https://tryhackme.com/module/intro-to-network-security", "Beginner", "60–120 min", ["Networking", "Firewalls", "Sniffing"], "Guided network security labs."),
    p("Network wargames", "OverTheWire", "https://overthewire.org/wargames/bandit/", "Intermediate", "60–120 min", ["SSH", "Service exploitation"], "Levels that need networking skills."),
  ],
  "cryptography basics": [
    p("Crypto challenges", "TryHackMe", "https://tryhackme.com/module/cryptography", "Beginner", "45–90 min", ["Ciphers", "Hashing", "Keys"], "Hands-on cryptography rooms."),
    p("Crypto wargame", "OverTheWire", "https://overthewire.org/wargames/krypton/", "Intermediate", "45–90 min", ["Ciphers", "Breaking codes"], "Levels dedicated to breaking ciphers."),
  ],

  // ── Cloud ──────────────────────────────────────────────────────────────────
  aws: [
    p("AWS Skill Builder", "AWS Skill Builder", "https://skillbuilder.aws/", "Beginner", "60–120 min", ["Services", "Hands-on"], "Official free labs and courses from AWS."),
    p("AWS hands-on labs", "AWS Workshops", "https://workshops.aws/", "Intermediate", "60–120 min", ["Architecture", "Services"], "Real workshops you run in your own AWS account."),
  ],
  "google cloud": [
    p("Google Cloud Skills Boost", "Google Cloud Skills Boost", "https://www.cloudskillsboost.google/", "Beginner", "60–120 min", ["Compute", "Storage", "Networking"], "Official labs with a free trial quota."),
    p("GCP labs", "Qwiklabs", "https://www.cloudskillsboost.google/catalog", "Intermediate", "60–120 min", ["Services", "Deployment"], "Hands-on GCP quests."),
  ],
  azure: [
    p("Microsoft Learn", "Microsoft Learn", "https://learn.microsoft.com/training/", "Beginner", "60–120 min", ["Compute", "Storage", "Identity"], "Official sandbox-enabled Azure modules."),
    p("Azure labs", "Microsoft Learn", "https://learn.microsoft.com/training/browse/?products=azure", "Intermediate", "60–120 min", ["Deployment", "Services"], "Browse hands-on Azure learning paths."),
  ],
  "cloud fundamentals": [
    p("Cloud fundamentals", "Microsoft Learn", "https://learn.microsoft.com/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/", "Beginner", "2–4 hours", ["Cloud models", "SLA", "Pricing"], "Free official cloud concepts training."),
    p("AWS Cloud Practitioner", "AWS Skill Builder", "https://skillbuilder.aws/", "Beginner", "2–4 hours", ["Cloud concepts", "Services"], "Official foundational cloud training."),
  ],
  "serverless managed services": [
    p("Serverless labs", "AWS Workshops", "https://workshops.aws/categories/serverless", "Intermediate", "60–120 min", ["Lambda", "API Gateway", "Events"], "Build serverless apps in guided workshops."),
    p("Azure Functions labs", "Microsoft Learn", "https://learn.microsoft.com/training/browse/?products=azure-functions", "Intermediate", "60–120 min", ["Functions", "Triggers"], "Hands-on Azure Functions modules."),
  ],

  // ── Data science / ML ──────────────────────────────────────────────────────
  "feature engineering": [
    p("Feature engineering", "Kaggle", "https://www.kaggle.com/learn/feature-engineering", "Intermediate", "2–3 hours", ["Encoding", "Scaling", "Interaction features"], "Kaggle's dedicated feature engineering course."),
    p("Kaggle competitions", "Kaggle", "https://www.kaggle.com/competitions", "Advanced", "3–6 hours", ["Feature engineering", "Modeling"], "Apply feature tricks to real competitions."),
  ],
  "training evaluation": [
    p("Model validation", "Kaggle", "https://www.kaggle.com/learn/machine-learning", "Beginner", "2–3 hours", ["Cross-validation", "Metrics"], "Build and validate models on real data."),
    p("ML micro-courses", "Google Colab", "https://colab.research.google.com/", "Intermediate", "60–120 min", ["Training", "Evaluation", "Notebooks"], "Run and tune models in free notebooks."),
  ],
  "machine learning": [
    p("Intro to ML", "Kaggle", "https://www.kaggle.com/learn/intro-to-machine-learning", "Beginner", "2–3 hours", ["Models", "Validation", "Overfitting"], "Kaggle's beginner ML course."),
    p("ML exercises", "Hugging Face", "https://huggingface.co/learn", "Intermediate", "60–120 min", ["Models", "Pipelines", "Datasets"], "Hands-on learning with real models."),
    p("ML notebooks", "Google Colab", "https://colab.research.google.com/", "Intermediate", "60–120 min", ["Scikit-learn", "PyTorch"], "Run ML notebooks for free in the browser."),
  ],
  "deep learning": [
    p("Deep learning", "Kaggle", "https://www.kaggle.com/learn/intro-to-deep-learning", "Intermediate", "2–3 hours", ["Neural networks", "Keras"], "Hands-on deep learning with real data."),
    p("PyTorch tutorials", "Google Colab", "https://colab.research.google.com/github/pytorch/tutorials/blob/gh-pages/_downloads/", "Intermediate", "60–120 min", ["Tensors", "Training loops"], "Official PyTorch tutorials, runnable in Colab."),
  ],
  "data visualization": [
    p("Data viz", "Kaggle", "https://www.kaggle.com/learn/data-visualization", "Beginner", "2–3 hours", ["Matplotlib", "Seaborn", "Storytelling"], "Learn charting on real datasets."),
    p("Viz exercises", "freeCodeCamp", "https://www.freecodecamp.org/learn/data-visualization/", "Intermediate", "2–3 hours", ["D3", "Charts"], "Project-based data-viz certification."),
  ],
  "statistics for data science": [
    p("Statistics micro-course", "Kaggle", "https://www.kaggle.com/learn/statistics", "Beginner", "2–3 hours", ["Distributions", "Hypothesis testing", "Regression"], "Practical statistics with code."),
    p("Stats exercises", "Khan Academy", "https://www.khanacademy.org/math/statistics-probability", "Beginner", "2–4 hours", ["Probability", "Inference"], "Free statistics practice problems."),
  ],
  "pandas": [
    p("Pandas exercises", "Kaggle", "https://www.kaggle.com/learn/pandas", "Beginner", "2–3 hours", ["DataFrames", "Grouping", "Filtering"], "Kaggle's hands-on pandas micro-course."),
    p("Data wrangling", "LeetCode", "https://leetcode.com/problemset/database/", "Intermediate", "45–90 min", ["DataFrames", "Aggregations"], "Solve real data questions in code."),
  ],

  // ── Java ───────────────────────────────────────────────────────────────────
  java: [
    p("Java track", "HackerRank", "https://www.hackerrank.com/domains/java", "Beginner", "30–60 min", ["Syntax", "OOP", "Data structures"], "Graded Java challenges from basics up."),
    p("Java kata", "Codewars", "https://www.codewars.com/kata/search/java", "Beginner", "20–40 min", ["Java", "Algorithms"], "Ranked Java exercises."),
    p("Java problems", "LeetCode", "https://leetcode.com/problemset/all/?difficulty=EASY", "Intermediate", "45–90 min", ["Data structures", "Algorithms"], "Solve interview problems in Java."),
  ],
  "spring boot": [
    p("Spring guides", "Spring Quickstarts", "https://spring.io/quickstart", "Beginner", "60–120 min", ["REST APIs", "Beans", "Dependencies"], "Official hands-on Spring projects."),
    p("Spring challenges", "GeeksforGeeks", "https://practice.geeksforgeeks.org/", "Intermediate", "45–90 min", ["Spring Boot", "REST"], "Practice problems around Java + Spring."),
  ],

  // ── Frontend career ────────────────────────────────────────────────────────
  "html forms": [
    p("Forms exercises", "W3Schools", "https://www.w3schools.com/html/html_forms.asp", "Beginner", "20–40 min", ["Form elements", "Input types", "Labels"], "Interactive form examples to tweak and run."),
    p("Form challenge", "Frontend Mentor", "https://www.frontendmentor.io/challenges?q=form", "Beginner", "1–2 hours", ["Form design", "Validation"], "Build a real form from a design brief."),
    p("Form project", "freeCodeCamp", "https://www.freecodecamp.org/learn/2022/responsive-web-design/#build-a-survey-form", "Beginner", "45–90 min", ["HTML forms", "Accessibility"], "Build a survey form for the certification."),
  ],
  "forms validation": [
    p("Form validation lab", "freeCodeCamp", "https://www.freecodecamp.org/learn/2022/responsive-web-design/#build-a-survey-form", "Beginner", "45–90 min", ["Required fields", "Patterns", "Validation"], "Practice validating real form inputs."),
    p("Validation challenges", "Frontend Mentor", "https://www.frontendmentor.io/challenges?q=validation", "Intermediate", "1–2 hours", ["Client validation", "UX"], "Implement validation on a real brief."),
  ],
  "responsive images": [
    p("Responsive image lab", "Frontend Mentor", "https://www.frontendmentor.io/challenges", "Intermediate", "1–2 hours", ["srcset", "sizes", "Art direction"], "Make real pages load images well on every screen."),
    p("Image exercises", "freeCodeCamp", "https://www.freecodecamp.org/learn/2022/responsive-web-design/", "Beginner", "30–60 min", ["Responsive images", "Media queries"], "Guided exercises on responsive media."),
  ],
  "accessibility": [
    p("a11y challenges", "Frontend Mentor", "https://www.frontendmentor.io/challenges", "Intermediate", "1–2 hours", ["ARIA", "Keyboard nav", "Contrast"], "Build accessible versions of real designs."),
    p("Accessibility lab", "web.dev", "https://web.dev/learn/accessibility", "Beginner", "30–60 min", ["Semantics", "Focus", "Labels"], "Interactive accessibility lessons."),
  ],
  "css animations": [
    p("Animation challenges", "CSSBattle", "https://cssbattle.dev/", "Intermediate", "20–40 min", ["Transforms", "Keyframes", "Transitions"], "Pixel battles that demand animation tricks."),
    p("Animation lab", "CodePen", "https://codepen.io/", "Beginner", "30–60 min", ["Keyframes", "Transitions"], "Prototype micro-interactions and share them."),
  ],

  // ── Engineering software ───────────────────────────────────────────────────
  autocad: [
    p("AutoCAD guided tutorials", "Autodesk Learn", "https://www.autodesk.com/learn/onboarding/overview/experience/learn-autocad", "Beginner", "2–3 hours", ["Drafting", "Drawing tools", "Layers"], "Official step-by-step AutoCAD tutorials."),
    p("CAD exercises", "CAD Exercises", "https://caddexpert.com/", "Intermediate", "60–120 min", ["2D drafting", "Dimensioning"], "Real drawings to reproduce from scratch."),
  ],
  solidworks: [
    p("SOLIDWORKS tutorials", "SOLIDWORKS", "https://www.solidworks.com/support/learn", "Beginner", "2–3 hours", ["Part modeling", "Assemblies", "Drawings"], "Official learning resources from Dassault."),
    p("Modeling challenges", "CAD Exercises", "https://caddexpert.com/", "Intermediate", "60–120 min", ["3D modeling", "Sketches"], "Reproduce 3D parts from prints."),
  ],
  matlab: [
    p("MATLAB Onramp", "MathWorks", "https://matlabacademy.mathworks.com/", "Beginner", "2–4 hours", ["MATLAB syntax", "Arrays", "Plotting"], "Official free interactive MATLAB course."),
    p("MATLAB practice", "Cody", "https://www.mathworks.com/matlabcentral/cody/", "Intermediate", "30–60 min", ["MATLAB", "Problem solving"], "Solve MATLAB challenges and compare solutions."),
  ],
  ansys: [
    p("Ansys Innovation Courses", "Ansys", "https://courses.ansys.com/", "Beginner", "2–3 hours", ["FEA", "Meshing", "Simulation"], "Free official simulation courses."),
    p("FEA practice", "Ansys Learning Hub", "https://www.ansys.com/training", "Intermediate", "2–3 hours", ["Static analysis", "Meshing"], "Guided analysis workshops."),
  ],
  revit: [
    p("Revit tutorials", "Autodesk Learn", "https://www.autodesk.com/learn/onboarding/overview/experience/learn-revit", "Beginner", "2–3 hours", ["BIM", "Modeling", "Families"], "Official guided Revit tutorials."),
    p("BIM practice", "Autodesk University", "https://www.autodesk.com/autodesk-university/", "Intermediate", "60–120 min", ["BIM workflows", "Documentation"], "Real BIM classes and datasets."),
  ],

  // ── Soft skills / career ───────────────────────────────────────────────────
  "the negotiation conversation": [
    p("Negotiation roleplay", "Pramp", "https://www.pramp.com/", "Intermediate", "30–60 min", ["Negotiation", "Communication"], "Practise live conversations in mock interviews."),
    p("Salary conversation practice", "The Muse", "https://www.themuse.com/advice/how-to-negotiate-salary-in-an-interview", "Beginner", "15–30 min", ["Scripting", "Preparation"], "Rehearse scripts, then say them out loud."),
  ],
  "behavioral questions star": [
    p("Behavioral mock interviews", "Pramp", "https://www.pramp.com/", "Intermediate", "30–60 min", ["STAR", "Storytelling"], "Practice STAR answers with a live peer."),
    p("STAR exercise", "The Muse", "https://www.themuse.com/advice/star-interview-method", "Beginner", "15–30 min", ["STAR framework"], "Write one STAR story per achievement."),
  ],
  "salary negotiation": [
    p("Negotiation practice", "Pramp", "https://www.pramp.com/", "Intermediate", "30–60 min", ["Negotiation", "Counteroffers"], "Roleplay the negotiation live."),
    p("Salary research", "Levels.fyi", "https://www.levels.fyi/", "Beginner", "15–30 min", ["Market research"], "Look up real offers before you negotiate."),
  ],
};

// ── rule-based fallbacks (ordered: first match wins) ─────────────────────────
// Each rule: { fam, re, t, p, u, d, e, s, ds }. `fam` is the context family the
// rule is allowed in (CODE/WEB/CLOUD/ENG/DATA/SEC) — rules without a family fire
// anywhere. These fire when a label isn't curated, using roadmap context.
export const PRACTICE_RULES = [
  // ── network & web concepts ──
  { fam: CLOUD, re: /how the internet works|internet works|how does the internet|networking basics/i, t: "How the internet works", p: "Cloudflare Learning", u: "https://www.cloudflare.com/learning/network-layer/how-does-the-internet-work/", d: "Beginner", e: "20–40 min", s: ["Networking"], ds: "Clear interactive explainer of how the internet works." },
  { fam: CLOUD, re: /\bdns\b|\bdomain name[s]?\b|\bnameserver[s]?\b|\bhosting\b|\bdomains?\b/i, t: "DNS explainer", p: "Cloudflare Learning", u: "https://www.cloudflare.com/learning/dns/what-is-dns/", d: "Beginner", e: "20–40 min", s: ["DNS"], ds: "Interactive explainer of DNS records and lookups." },
  { fam: CLOUD, re: /\bhttp\b|\bhttps\b|\bssl\b|\btls\b|\brequest methods?\b|\bstatus codes?\b|\bheaders?\b|\brest api\b|\bapi design\b/i, t: "HTTP request lab", p: "httpbingo.org", u: "https://httpbingo.org/", d: "Beginner", e: "20–40 min", s: ["HTTP"], ds: "Send real HTTP requests and inspect responses immediately." },
  { fam: CLOUD, re: /\btcp\b|\btcp\/ip\b|\binternet protocol\b|\bip (address|v4|v6|packet|routing)\b|\bpackets?\b|\brouting\b/i, t: "TCP/IP model guide", p: "Cloudflare Learning", u: "https://www.cloudflare.com/learning/network-layer/what-is-the-network-layer/", d: "Beginner", e: "20–40 min", s: ["TCP/IP"], ds: "Visual guide to the TCP/IP model and packet flow." },
  { fam: WEB, re: /\bbrowsers?\b|\brendering\b|\bweb performance\b|\bpage load[ing]?\b/i, t: "Learn Performance", p: "web.dev", u: "https://web.dev/learn/performance", d: "Intermediate", e: "2–3 hours", s: ["Performance"], ds: "Measure and fix real page-load performance." },
  // ── SQL (practised wherever it is taught) ──
  { re: /\bsql\b|\bquery[ing]?\b|\bdatabase[s]?\b|\bindex[ing]?\b|\bjoin[s]?\b|\bnormaliz[a-z]*\b|\bschema[s]?\b/i, p: "HackerRank SQL", u: "https://www.hackerrank.com/domains/sql", d: "Beginner", e: "30–60 min", s: ["SQL", "Queries"], ds: "Auto-graded SQL challenges across every topic level." },
  { re: /\bsql\b|\bquery[ing]?\b|\bdatabase[s]?\b/i, p: "SQLBolt", u: "https://sqlbolt.com/", d: "Beginner", e: "20–40 min", s: ["SQL basics"], ds: "Interactive SQL lessons with live feedback." },
  // ── git (used everywhere) ──
  { re: /\bgit\b|\bversion control\b|\bcommit[s]?\b|\bbranch[es]?\b|\bmerg[ing]?\b|\brebas[ing]?\b/i, p: "Learn Git Branching", u: "https://learngitbranching.js.org/", d: "Beginner", e: "30–60 min", s: ["Git", "Branching"], ds: "Visual, interactive Git exercises." },
  // ── WordPress (platform-specific) ──
  { re: /\bwordpress\b|\bgutenberg\b/i, p: "WordPress Learn", u: "https://learn.wordpress.org/", d: "Beginner", e: "30–60 min", s: ["WordPress"], ds: "Official free WordPress workshops and courses." },
  { re: /\bwordpress\b|\bgutenberg\b/i, p: "WordPress Playground", u: "https://playground.wordpress.net/", d: "Beginner", e: "20–40 min", s: ["WordPress", "Themes", "Plugins"], ds: "Spin up a live WordPress site in your browser and experiment." },
  // ── cloud infrastructure ──
  { fam: CLOUD, re: /\bdocker\b|\bdockerfile[s]?\b|\bcontainerization\b|\bcontainer[s]?\b|\bcompose\b/i, p: "Play with Docker", u: "https://labs.play-with-docker.com/", d: "Beginner", e: "30–60 min", s: ["Docker"], ds: "Run real Docker commands in your browser." },
  { fam: CLOUD, re: /\bkubernetes\b|\bk8s\b|\borchestration\b|\bhelm\b/i, p: "Killercoda Kubernetes", u: "https://killercoda.com/playgrounds/scenario/kubernetes", d: "Intermediate", e: "60–120 min", s: ["kubectl", "Pods", "Services"], ds: "Interactive Kubernetes sandbox." },
  { fam: CLOUD, re: /\bterraform\b|\binfrastructure as code\b|\biac\b/i, p: "HashiCorp Learn", u: "https://developer.hashicorp.com/terraform/tutorials", d: "Beginner", e: "60–120 min", s: ["Terraform", "HCL"], ds: "Official hands-on Terraform tutorials." },
  { fam: CLOUD, re: /\baws\b|\bcloud practitioner\b|\bs3\b|\blambda\b|\bec2\b|\biam\b/i, p: "AWS Skill Builder", u: "https://skillbuilder.aws/", d: "Beginner", e: "60–120 min", s: ["AWS services"], ds: "Official free labs and courses." },
  { fam: CLOUD, re: /\bgoogle cloud\b|\bgcp\b/i, p: "Google Cloud Skills Boost", u: "https://www.cloudskillsboost.google/", d: "Beginner", e: "60–120 min", s: ["GCP services"], ds: "Official hands-on GCP labs." },
  { fam: CLOUD, re: /\bazure\b|\bmicrosoft cloud\b/i, p: "Microsoft Learn", u: "https://learn.microsoft.com/training/", d: "Beginner", e: "60–120 min", s: ["Azure services"], ds: "Official sandbox-enabled Microsoft training." },
  // ── Linux / shell (tech contexts only — AutoCAD has a "command line" too) ──
  { fam: CLOUD, re: /\blinux\b|\bunix\b|\bshell\b|\bbash\b|\bterminal\b|\bcommand line\b|\bcli\b/i, p: "OverTheWire Bandit", u: "https://overthewire.org/wargames/bandit/", d: "Beginner", e: "30–60 min", s: ["Linux commands"], ds: "Level-based Linux challenges that teach by doing." },
  { fam: CLOUD, re: /\blinux\b|\bshell\b|\bbash\b/i, p: "LearnShell.org", u: "https://www.learnshell.org/", d: "Beginner", e: "20–40 min", s: ["Shell", "Scripting"], ds: "Interactive shell lessons in the browser." },
  // ── security ──
  { fam: SEC, re: /\binjection\b|\bsql injection\b|\bsqli\b|\bcommand injection\b/i, p: "PortSwigger Web Security Academy", u: "https://portswigger.net/web-security/all-labs", d: "Intermediate", e: "60–120 min", s: ["Injection"], ds: "Free browser-based exploitation labs." },
  { fam: SEC, re: /\bxss\b|\bcsrf\b|\bssrf\b|\bweb security\b|\bowasp\b|\bexploit[s]?\b|\bvulnerab[a-z]*\b|\bpentest\b|\bsecurity\b/i, p: "TryHackMe", u: "https://tryhackme.com/", d: "Beginner", e: "60–120 min", s: ["Security labs"], ds: "Guided hands-on security rooms." },
  { fam: SEC, re: /\bhack(ing|er|ed)?\b|\bctf\b|\bforensic[s]?\b|\bmalware\b|\bcrypto(graphy|analysis)?\b|\bosint\b/i, p: "Hack The Box", u: "https://www.hackthebox.com/", d: "Advanced", e: "2–4 hours", s: ["Offensive security"], ds: "Legal attack challenges on real machines." },
  { fam: SEC, re: /\bosint\b|\brecon\b|\binformation gathering\b|\benumeration\b/i, p: "TryHackMe", u: "https://tryhackme.com/module/passive-reconnaissance", d: "Beginner", e: "45–90 min", s: ["OSINT", "Recon"], ds: "Guided reconnaissance labs." },
  // ── web frontend ──
  { fam: WEB, re: /\breact\b|\bvue\b|\bangular\b|\bsvelte\b|\bnext\.?js\b|\bfrontend\b|\bui\b|\bcomponent[s]?\b|\bhook[s]?\b/i, p: "Frontend Mentor", u: "https://www.frontendmentor.io/challenges", d: "Intermediate", e: "2–3 hours", s: ["Frontend", "Components"], ds: "Real design briefs to build with your framework." },
  { fam: WEB, re: /\bcss\b|\bflexbox\b|\bgrid\b|\bresponsive\b|\blayout\b|\banimation[s]?\b/i, p: "CSSBattle", u: "https://cssbattle.dev/", d: "Beginner", e: "20–40 min", s: ["CSS"], ds: "Pixel-perfect CSS challenges." },
  { fam: WEB, re: /\bhtml\b|\bforms?\b|\bsemantic\b/i, p: "W3Schools HTML", u: "https://www.w3schools.com/html/html_exercises.asp", d: "Beginner", e: "15–30 min", s: ["HTML"], ds: "Quick interactive HTML exercises." },
  // ── languages & algorithms (coding contexts only) ──
  { fam: "code", re: /\bjavascript\b|\bjs\b|\btypescript\b|\bts\b/i, p: "Codewars", u: "https://www.codewars.com/kata/search/javascript", d: "Beginner", e: "20–40 min", s: ["JavaScript"], ds: "Ranked JavaScript kata that auto-grade." },
  { fam: "code", re: /\bjavascript\b|\bjs\b/i, p: "HackerRank JavaScript", u: "https://www.hackerrank.com/domains/tutorials/10-days-of-javascript", d: "Beginner", e: "30–60 min", s: ["JavaScript"], ds: "Graded JavaScript challenges." },
  { fam: "code", re: /\bpython\b|\bdjango\b|\bflask\b|\bfastapi\b|\bpandas\b|\bnumpy\b|\bscikit/i, p: "Exercism Python", u: "https://exercism.org/tracks/python", d: "Beginner", e: "30–60 min", s: ["Python"], ds: "Mentored Python exercises." },
  { fam: "code", re: /\bpython\b/i, p: "HackerRank Python", u: "https://www.hackerrank.com/domains/python", d: "Beginner", e: "30–60 min", s: ["Python"], ds: "Graded Python challenges." },
  { fam: "code", re: /\bjava\b|\bspring\b|\bjvm\b/i, p: "HackerRank Java", u: "https://www.hackerrank.com/domains/java", d: "Beginner", e: "30–60 min", s: ["Java"], ds: "Graded Java challenges." },
  { fam: "code", re: /\bgolang\b|\bgo lang\b|\bgo programming\b/i, p: "Exercism Go", u: "https://exercism.org/tracks/go", d: "Beginner", e: "30–60 min", s: ["Go"], ds: "Mentored Go exercises." },
  { fam: "code", re: /\brust\b/i, p: "Exercism Rust", u: "https://exercism.org/tracks/rust", d: "Intermediate", e: "30–60 min", s: ["Rust"], ds: "Mentored Rust exercises." },
  { fam: "code", re: /\bc\+\+\b|\bcpp\b|\bcompetitive\b|\bcodeforces\b|\bcodechef\b/i, p: "Codeforces", u: "https://codeforces.com/problemset", d: "Intermediate", e: "60–120 min", s: ["Competitive programming"], ds: "Real contest problems ranked by difficulty." },
  { fam: "code", re: /\balgorithms?\b|\bdata structure[s]?\b|\brecursion\b|\bsorting\b|\bsearching\b|\bdynamic programming\b|\bgraphs?\b|\btrees?\b|\blinked list[s]?\b|\bstacks?\b|\bqueues?\b|\barrays?\b|\bstrings?\b|\bcomplexity\b|\bbig o\b|\bproblem solving\b/i, p: "LeetCode", u: "https://leetcode.com/problemset/", d: "Intermediate", e: "45–90 min", s: ["Algorithms"], ds: "Interview problems sorted by topic tag." },
  { fam: "code", re: /\balgorithms?\b|\bdata structure[s]?\b|\brecursion\b|\bdynamic programming\b/i, p: "NeetCode", u: "https://neetcode.io/roadmap", d: "Intermediate", e: "60–120 min", s: ["DSA roadmap"], ds: "An ordered practice plan for interviews." },
  // ── DSA for non-coding contexts ─────────────────────────────────────────
  // The shared interview-prep section teaches DSA to every career, including
  // WordPress/PM/designer/engineer roadmaps. Outside coding contexts these
  // fire instead of LeetCode-style judges: educational visualizers, walkthroughs
  // and references — genuinely relevant to learning the concepts.
  { fam: "noncode", re: /\blinked lists?\b/i, t: "Linked list visualizer", p: "VisuAlgo", u: "https://visualgo.net/en/list", d: "Beginner", e: "20–40 min", s: ["Linked lists"], ds: "Step-through animations of list operations — insert, delete, reverse." },
  { fam: "noncode", re: /\bstacks? and queues?\b|\bstacks? & queues?\b/i, t: "Stack & queue visualizer", p: "VisuAlgo", u: "https://visualgo.net/en/list", d: "Beginner", e: "20–40 min", s: ["Stacks", "Queues"], ds: "Watch push, pop, enqueue and dequeue on animated structures." },
  { fam: "noncode", re: /\btrees? and graphs?\b|\btrees? & graphs?\b/i, t: "Tree & graph visualizer", p: "VisuAlgo", u: "https://visualgo.net/en/bst", d: "Intermediate", e: "30–60 min", s: ["Trees", "Graphs"], ds: "Animated BST traversals and graph representations." },
  { fam: "noncode", re: /\bsorting and searching\b/i, t: "Sorting visualizer", p: "VisuAlgo", u: "https://visualgo.net/en/sorting", d: "Beginner", e: "20–40 min", s: ["Sorting", "Searching"], ds: "Compare sort algorithms step by step on live data." },
  { fam: "noncode", re: /\barrays? and strings? problems?\b/i, t: "Arrays & strings", p: "GeeksforGeeks", u: "https://www.geeksforgeeks.org/array-data-structure/", d: "Beginner", e: "30–60 min", s: ["Arrays", "Strings"], ds: "Topic walkthroughs with runnable examples and practice links." },
  { fam: "noncode", re: /\bsliding window\b/i, t: "Sliding window technique", p: "GeeksforGeeks", u: "https://www.geeksforgeeks.org/window-sliding-technique/", d: "Intermediate", e: "30–60 min", s: ["Sliding window"], ds: "Worked examples of the sliding-window pattern with code." },
  { fam: "noncode", re: /\btwo pointers?\b|\btwo-pointer/i, t: "Two pointers technique", p: "GeeksforGeeks", u: "https://www.geeksforgeeks.org/two-pointers-technique/", d: "Intermediate", e: "30–60 min", s: ["Two pointers"], ds: "The two-pointer pattern explained with visual examples." },
  { fam: "noncode", re: /\bbinary search variants?\b|\bbinary search\b/i, t: "Binary search visualizer", p: "VisuAlgo", u: "https://visualgo.net/en/binarysearch", d: "Intermediate", e: "20–40 min", s: ["Binary search"], ds: "Animated binary search on sorted arrays, including variants." },

  // ── data science / AI ──
  { fam: DATA, re: /\bmachine learning\b|\bdeep learning\b|\bneural\b|\bml\b|\bai\b|\btensorflow\b|\bpytorch\b|\bhugging\b|\btransformer[s]?\b|\bllm[s]?\b/i, p: "Kaggle Learn", u: "https://www.kaggle.com/learn", d: "Beginner", e: "2–3 hours", s: ["Machine learning"], ds: "Micro-courses with real datasets and notebooks." },
  { fam: DATA, re: /\bdata science\b|\bdata analysis\b|\bpandas\b|\bnumpy\b|\bstatistics\b|\bvisualization\b|\bdata cleaning\b|\bfeature engineering\b|\bviz\b/i, p: "Kaggle", u: "https://www.kaggle.com/", d: "Beginner", e: "60–120 min", s: ["Data science"], ds: "Real datasets, notebooks and competitions." },
  { fam: DATA, re: /\bjupyter\b|\bnotebook[s]?\b|\bcolab\b/i, p: "Google Colab", u: "https://colab.research.google.com/", d: "Beginner", e: "30–60 min", s: ["Notebooks"], ds: "Free GPU-backed notebooks to run code now." },
  // ── engineering software ──
  { fam: ENG, re: /\bautocad\b|\bcad\b|\bdrafting\b/i, p: "Autodesk Learn", u: "https://www.autodesk.com/learn/onboarding/overview/experience/learn-autocad", d: "Beginner", e: "2–3 hours", s: ["CAD"], ds: "Official guided CAD tutorials." },
  { fam: ENG, re: /\bsolidworks\b|\b3d modeling\b/i, p: "SOLIDWORKS Learn", u: "https://www.solidworks.com/support/learn", d: "Beginner", e: "2–3 hours", s: ["CAD"], ds: "Official SOLIDWORKS tutorials." },
  { fam: ENG, re: /\bmatlab\b|\bsimulink\b/i, p: "MATLAB Onramp", u: "https://matlabacademy.mathworks.com/", d: "Beginner", e: "2–4 hours", s: ["MATLAB"], ds: "Official interactive MATLAB course." },
  { fam: ENG, re: /\bansys\b|\bfea\b|\bsimulation[s]?\b|\bcfd\b/i, p: "Ansys Courses", u: "https://courses.ansys.com/", d: "Beginner", e: "2–3 hours", s: ["Simulation"], ds: "Free official simulation courses." },
  { fam: ENG, re: /\brevit\b|\bbim\b/i, p: "Autodesk Learn", u: "https://www.autodesk.com/learn/onboarding/overview/experience/learn-revit", d: "Beginner", e: "2–3 hours", s: ["BIM"], ds: "Official guided Revit tutorials." },
  // ── soft skills / misc ──
  { re: /\bmock interview\b|\binterview practice\b|\bbehavioral\b|\bnegotiation\b|\bsalary\b/i, p: "Pramp", u: "https://www.pramp.com/", d: "Intermediate", e: "30–60 min", s: ["Mock interviews"], ds: "Free live mock interviews with peers." },
  { fam: "apt", re: /\baptitude\b|\breasoning\b|\bquantitative\b/i, p: "IndiaBix", u: "https://www.indiabix.com/", d: "Beginner", e: "30–60 min", s: ["Aptitude"], ds: "Practice questions with detailed solutions." },
  { fam: "typ", re: /\btyping\b|\bspeed\b|\baccuracy\b/i, p: "Keybr", u: "https://www.keybr.com/", d: "Beginner", e: "10–20 min", s: ["Typing"], ds: "Adaptive typing practice." },
];

const APT = new Set(["productivity", "data & business", "career"]);
const TYP = new Set(["productivity", "office"]);

// ── roadmap-context practice (domain-aware last-resort) ─────────────────────
// keyed by roadmap slug or skill category; returns direct links.
export const ROADMAP_PRACTICE = {
  // security-focused roadmaps
  "cyber-security": [
    p("Web Security Academy", "PortSwigger", "https://portswigger.net/web-security/all-labs", "Intermediate", "60–120 min", ["Web security"], "A full library of free web-security labs."),
    p("TryHackMe paths", "TryHackMe", "https://tryhackme.com/paths", "Beginner", "60–120 min", ["Hands-on security"], "Guided learning paths with real machines."),
  ],
  "ai-red-teaming": [
    p("TryHackMe AI rooms", "TryHackMe", "https://tryhackme.com/", "Intermediate", "60–120 min", ["AI security", "Prompt injection"], "Hands-on AI-security rooms."),
    p("Hack The Box", "Hack The Box", "https://www.hackthebox.com/", "Advanced", "2–4 hours", ["Offensive security"], "Legal attack challenges."),
  ],
  // data / AI
  "data-analyst": [
    p("Kaggle datasets", "Kaggle", "https://www.kaggle.com/datasets", "Beginner", "60–120 min", ["Data analysis"], "Explore and analyze real datasets."),
    p("SQL practice", "SQLBolt", "https://sqlbolt.com/", "Beginner", "30–60 min", ["SQL"], "Interactive SQL lessons."),
  ],
  "bi-analyst": [
    p("Kaggle datasets", "Kaggle", "https://www.kaggle.com/datasets", "Beginner", "60–120 min", ["Data analysis"], "Analyze real datasets end-to-end."),
    p("HackerRank SQL", "HackerRank", "https://www.hackerrank.com/domains/sql", "Beginner", "30–60 min", ["SQL"], "Auto-graded SQL challenges."),
  ],
  "data-scientist": [
    p("Kaggle Learn", "Kaggle", "https://www.kaggle.com/learn", "Beginner", "2–3 hours", ["ML", "Data science"], "Hands-on micro-courses."),
    p("Kaggle competitions", "Kaggle", "https://www.kaggle.com/competitions", "Advanced", "3–6 hours", ["Modeling"], "Compete on real problems."),
  ],
  "ai-engineer": [
    p("Hugging Face Learn", "Hugging Face", "https://huggingface.co/learn", "Intermediate", "60–120 min", ["LLMs", "Pipelines"], "Practice with real models."),
    p("Kaggle", "Kaggle", "https://www.kaggle.com/competitions", "Intermediate", "2–4 hours", ["ML engineering"], "Apply skills on real data."),
  ],
  "machine-learning": [
    p("Kaggle Learn", "Kaggle", "https://www.kaggle.com/learn", "Beginner", "2–3 hours", ["ML"], "Hands-on micro-courses."),
    p("Google Colab", "Google Colab", "https://colab.research.google.com/", "Intermediate", "60–120 min", ["Notebooks"], "Run models for free."),
  ],
  "datastructures-and-algorithms": [
    p("NeetCode roadmap", "NeetCode", "https://neetcode.io/roadmap", "Intermediate", "60–120 min", ["DSA"], "Ordered interview practice plan."),
    p("LeetCode", "LeetCode", "https://leetcode.com/problemset/", "Intermediate", "45–90 min", ["Algorithms"], "Interview problems by tag."),
  ],
  // cloud / devops
  docker: [
    p("Play with Docker", "Play with Docker", "https://labs.play-with-docker.com/", "Beginner", "30–60 min", ["Docker"], "Run Docker in the browser."),
    p("Killercoda Docker", "Killercoda", "https://killercoda.com/playgrounds/scenario/docker", "Beginner", "30–60 min", ["Docker"], "Interactive Docker playground."),
  ],
  kubernetes: [
    p("Killercoda Kubernetes", "Killercoda", "https://killercoda.com/playgrounds/scenario/kubernetes", "Intermediate", "60–120 min", ["kubectl"], "Browser Kubernetes sandbox."),
    p("Kubernetes basics", "Kubernetes Docs", "https://kubernetes.io/docs/tutorials/kubernetes-basics/", "Beginner", "60–120 min", ["Pods", "Deployments"], "Official interactive tutorial."),
  ],
  aws: [
    p("AWS Skill Builder", "AWS Skill Builder", "https://skillbuilder.aws/", "Beginner", "60–120 min", ["AWS"], "Official free labs."),
    p("AWS Workshops", "AWS Workshops", "https://workshops.aws/", "Intermediate", "60–120 min", ["Architecture"], "Real guided workshops."),
  ],
  terraform: [
    p("HashiCorp Learn", "HashiCorp", "https://developer.hashicorp.com/terraform/tutorials", "Beginner", "60–120 min", ["Terraform"], "Official hands-on tutorials."),
    p("Killercoda Terraform", "Killercoda", "https://killercoda.com/playgrounds/scenario/terraform", "Intermediate", "60–120 min", ["Terraform"], "Interactive sandbox."),
  ],
  linux: [
    p("OverTheWire Bandit", "OverTheWire", "https://overthewire.org/wargames/bandit/", "Beginner", "30–60 min", ["Linux"], "Level-based Linux challenges."),
    p("LearnShell", "LearnShell.org", "https://www.learnshell.org/", "Beginner", "20–40 min", ["Shell"], "Interactive shell lessons."),
  ],
  devops: [
    p("Killercoda", "Killercoda", "https://killercoda.com/playgrounds", "Beginner", "30–60 min", ["DevOps tools"], "Interactive DevOps playgrounds."),
    p("Play with Docker", "Play with Docker", "https://labs.play-with-docker.com/", "Beginner", "30–60 min", ["Containers"], "Hands-on container labs."),
  ],
  // frontend
  frontend: [
    p("Frontend Mentor", "Frontend Mentor", "https://www.frontendmentor.io/challenges", "Intermediate", "2–3 hours", ["HTML", "CSS", "JS"], "Real design briefs to build."),
    p("W3Schools exercises", "W3Schools", "https://www.w3schools.com/html/html_exercises.asp", "Beginner", "15–30 min", ["HTML", "CSS"], "Quick interactive exercises."),
  ],
  "ui-ux-design": [
    p("Frontend Mentor", "Frontend Mentor", "https://www.frontendmentor.io/challenges", "Intermediate", "2–3 hours", ["UI implementation"], "Turn designs into working pages."),
    p("CodePen", "CodePen", "https://codepen.io/", "Beginner", "20–40 min", ["Prototyping"], "Prototype interactions and share them."),
  ],
  react: [
    p("Frontend Mentor React", "Frontend Mentor", "https://www.frontendmentor.io/challenges?languages=React", "Intermediate", "2–3 hours", ["React"], "Real briefs solved with React."),
    p("freeCodeCamp React", "freeCodeCamp", "https://www.freecodecamp.org/learn/front-end-development-libraries/", "Beginner", "2–3 hours", ["Components", "Hooks"], "Guided React projects."),
  ],
  vue: [
    p("Frontend Mentor", "Frontend Mentor", "https://www.frontendmentor.io/challenges", "Intermediate", "2–3 hours", ["Vue"], "Real briefs solved with Vue."),
    p("Vue exercises", "Vue School", "https://vueschool.io/", "Beginner", "2–3 hours", ["Vue"], "Video lessons with downloadable exercises."),
  ],
  angular: [
    p("Frontend Mentor", "Frontend Mentor", "https://www.frontendmentor.io/challenges", "Intermediate", "2–3 hours", ["Angular"], "Real briefs solved with Angular."),
    p("Angular tutorials", "Angular.dev", "https://angular.dev/tutorials", "Beginner", "2–3 hours", ["Components", "Services"], "Official interactive Angular tutorials."),
  ],
  // databases
  sql: [
    p("HackerRank SQL", "HackerRank", "https://www.hackerrank.com/domains/sql", "Beginner", "30–60 min", ["SQL"], "Auto-graded SQL challenges."),
    p("SQLBolt", "SQLBolt", "https://sqlbolt.com/", "Beginner", "20–40 min", ["SQL"], "Interactive SQL lessons."),
  ],
  postgresql: [
    p("PostgreSQL Exercises", "PGExercises", "https://pgexercises.com/", "Intermediate", "60–120 min", ["PostgreSQL"], "Real PostgreSQL practice on live data."),
    p("HackerRank SQL", "HackerRank", "https://www.hackerrank.com/domains/sql", "Beginner", "30–60 min", ["SQL"], "Auto-graded SQL challenges."),
  ],
  mongodb: [
    p("MongoDB University", "MongoDB", "https://learn.mongodb.com/", "Beginner", "2–3 hours", ["MongoDB"], "Official free courses with labs."),
    p("Mongo playground", "MongoDB Playground", "https://mongoplayground.net/", "Beginner", "20–40 min", ["Queries"], "Try MongoDB queries in the browser."),
  ],
  redis: [
    p("Redis sandbox", "Redis", "https://redis.io/tutorials/howtos/redis-sandbox/", "Beginner", "20–40 min", ["Redis commands"], "Official interactive Redis sandbox — run commands in your browser."),
    p("Redis University", "Redis University", "https://university.redis.com/", "Intermediate", "2–3 hours", ["Redis"], "Free official Redis courses."),
  ],
  // languages
  python: [
    p("HackerRank Python", "HackerRank", "https://www.hackerrank.com/domains/python", "Beginner", "30–60 min", ["Python"], "Graded Python challenges."),
    p("Exercism Python", "Exercism", "https://exercism.org/tracks/python", "Beginner", "30–60 min", ["Python"], "Mentored exercises."),
  ],
  javascript: [
    p("HackerRank JavaScript", "HackerRank", "https://www.hackerrank.com/domains/tutorials/10-days-of-javascript", "Beginner", "30–60 min", ["JavaScript"], "Graded JS challenges."),
    p("Codewars", "Codewars", "https://www.codewars.com/kata/search/javascript", "Beginner", "20–40 min", ["JavaScript"], "Ranked JS kata."),
  ],
  typescript: [
    p("Exercism TypeScript", "Exercism", "https://exercism.org/tracks/typescript", "Beginner", "30–60 min", ["TypeScript"], "Mentored TS exercises."),
    p("Codewars TS", "Codewars", "https://www.codewars.com/kata/search/typescript", "Beginner", "20–40 min", ["TypeScript"], "Ranked TS kata."),
  ],
  java: [
    p("HackerRank Java", "HackerRank", "https://www.hackerrank.com/domains/java", "Beginner", "30–60 min", ["Java"], "Graded Java challenges."),
    p("Exercism Java", "Exercism", "https://exercism.org/tracks/java", "Beginner", "30–60 min", ["Java"], "Mentored exercises."),
  ],
  golang: [
    p("Exercism Go", "Exercism", "https://exercism.org/tracks/go", "Beginner", "30–60 min", ["Go"], "Mentored Go exercises."),
    p("Go by Example practice", "Go by Example", "https://gobyexample.com/", "Beginner", "20–40 min", ["Go"], "Run and tweak runnable examples."),
  ],
  rust: [
    p("Exercism Rust", "Exercism", "https://exercism.org/tracks/rust", "Intermediate", "30–60 min", ["Rust"], "Mentored Rust exercises."),
    p("Rustlings", "Rustlings", "https://github.com/rust-lang/rustlings", "Beginner", "2–3 hours", ["Rust basics"], "Small exercises that fix compile errors."),
  ],
  cpp: [
    p("HackerRank C++", "HackerRank", "https://www.hackerrank.com/domains/cpp", "Beginner", "30–60 min", ["C++"], "Graded C++ challenges."),
    p("Exercism C++", "Exercism", "https://exercism.org/tracks/cpp", "Beginner", "30–60 min", ["C++"], "Mentored exercises."),
  ],
  "server-side-game-developer": [
    p("Exercism", "Exercism", "https://exercism.org/", "Beginner", "30–60 min", ["Programming"], "Practice the language you picked."),
    p("LeetCode", "LeetCode", "https://leetcode.com/problemset/", "Intermediate", "45–90 min", ["Algorithms"], "Interview problems by tag."),
  ],
  git: [
    p("Learn Git Branching", "Learn Git Branching", "https://learngitbranching.js.org/", "Beginner", "30–60 min", ["Git"], "Visual interactive Git practice."),
    p("GitHub Skills", "GitHub Skills", "https://skills.github.com/", "Beginner", "30–60 min", ["Git", "GitHub"], "Hands-on labs in a real repo."),
  ],
  "git-github": [
    p("Learn Git Branching", "Learn Git Branching", "https://learngitbranching.js.org/", "Beginner", "30–60 min", ["Git"], "Visual interactive Git practice."),
    p("GitHub Skills", "GitHub Skills", "https://skills.github.com/", "Beginner", "30–60 min", ["GitHub"], "Hands-on labs in a real repo."),
  ],
  // engineering software
  autocad: [
    p("Autodesk Learn", "Autodesk", "https://www.autodesk.com/learn/onboarding/overview/experience/learn-autocad", "Beginner", "2–3 hours", ["AutoCAD"], "Official guided tutorials."),
    p("CAD exercises", "CADExercises", "https://caddexpert.com/", "Intermediate", "60–120 min", ["Drafting"], "Real drawings to reproduce."),
  ],
  solidworks: [
    p("SOLIDWORKS Learn", "SOLIDWORKS", "https://www.solidworks.com/support/learn", "Beginner", "2–3 hours", ["SOLIDWORKS"], "Official tutorials."),
    p("CAD exercises", "CADExercises", "https://caddexpert.com/", "Intermediate", "60–120 min", ["Modeling"], "Reproduce 3D parts from prints."),
  ],
  matlab: [
    p("MATLAB Onramp", "MathWorks", "https://matlabacademy.mathworks.com/", "Beginner", "2–4 hours", ["MATLAB"], "Official free interactive course."),
    p("Cody", "MathWorks", "https://www.mathworks.com/matlabcentral/cody/", "Intermediate", "30–60 min", ["MATLAB"], "Solve and compare MATLAB problems."),
  ],
  ansys: [
    p("Ansys Innovation Courses", "Ansys", "https://courses.ansys.com/", "Beginner", "2–3 hours", ["FEA", "CFD"], "Free official simulation courses."),
    p("Ansys Learning Hub", "Ansys", "https://www.ansys.com/training", "Intermediate", "2–3 hours", ["Simulation"], "Guided workshops."),
  ],
  revit: [
    p("Autodesk Learn", "Autodesk", "https://www.autodesk.com/learn/onboarding/overview/experience/learn-revit", "Beginner", "2–3 hours", ["Revit"], "Official guided tutorials."),
    p("Autodesk University", "Autodesk", "https://www.autodesk.com/autodesk-university/", "Intermediate", "60–120 min", ["BIM"], "Real classes and datasets."),
  ],
  etabs: [
    p("CSI Knowledge Base", "CSI", "https://wiki.csiamerica.com/display/tutorials/ETABS+Tutorials", "Intermediate", "2–3 hours", ["ETABS"], "Official ETABS tutorials."),
    p("CSI webinars", "CSI", "https://www.csiamerica.com/webinars", "Intermediate", "60–120 min", ["Structural analysis"], "Live and recorded structural webinars."),
  ],
  arcgis: [
    p("Esri Learn", "Esri", "https://learn.arcgis.com/", "Beginner", "2–3 hours", ["GIS"], "Free official ArcGIS lessons."),
    p("ArcGIS tutorials", "Esri", "https://learn.arcgis.com/en/gallery/", "Intermediate", "60–120 min", ["Mapping", "Analysis"], "Guided projects with real data."),
  ],
  // platform-config / consulting careers — these must never fall through to
  // the LeetCode/Exercism domain fallback, so they get their own practice.
  "wordpress": [
    p("WordPress workshops", "WordPress Learn", "https://learn.wordpress.org/", "Beginner", "30–60 min", ["WordPress", "Themes", "Plugins"], "Free official courses and workshops."),
    p("WordPress Playground", "WordPress Playground", "https://playground.wordpress.net/", "Beginner", "20–40 min", ["WordPress", "Blocks", "PHP"], "Run a live WordPress site in your browser and experiment."),
  ],
  "wordpress-developer": [
    p("WordPress workshops", "WordPress Learn", "https://learn.wordpress.org/", "Beginner", "30–60 min", ["WordPress", "Themes", "Plugins"], "Free official courses and workshops."),
    p("WordPress Playground", "WordPress Playground", "https://playground.wordpress.net/", "Beginner", "20–40 min", ["WordPress", "Blocks", "PHP"], "Run a live WordPress site in your browser and experiment."),
  ],
  "no-code-developer": [
    p("Bubble Academy", "Bubble", "https://academy.bubble.io/", "Beginner", "2–3 hours", ["No-code apps"], "Guided no-code app-building lessons."),
    p("Webflow University", "Webflow", "https://university.webflow.com/", "Beginner", "2–3 hours", ["Webflow", "Design"], "Official free Webflow courses."),
  ],
  "erp-consultant": [
    p("SAP Learning", "SAP", "https://learning.sap.com/", "Beginner", "2–3 hours", ["SAP", "ERP"], "Official SAP training and learning journeys."),
    p("ERP practice labs", "Odoo", "https://www.odoo.com/slides", "Beginner", "2–3 hours", ["ERP flows"], "Free ERP walkthroughs you can follow in a demo."),
  ],
  "sap-consultant": [
    p("SAP Learning", "SAP", "https://learning.sap.com/", "Beginner", "2–3 hours", ["SAP", "Config"], "Official SAP certification prep and courses."),
    p("SAP community practice", "SAP Community", "https://community.sap.com/", "Intermediate", "60–120 min", ["SAP scenarios"], "Follow real Q&A scenarios and solve them."),
  ],
  "salesforce-developer": [
    p("Trailhead", "Salesforce", "https://trailhead.salesforce.com/", "Beginner", "2–4 hours", ["Apex", "LWC", "Admin"], "Official free Salesforce learning with hands-on trails."),
    p("Apex exercises", "Salesforce Developers", "https://developer.salesforce.com/docs", "Intermediate", "60–120 min", ["Apex", "SOQL"], "Official docs with runnable Apex examples."),
  ],
  "product-manager": [
    p("PM mock interviews", "Pramp", "https://www.pramp.com/", "Intermediate", "30–60 min", ["PM interviews"], "Live mock product interviews with peers."),
    p("PM case practice", "Product School", "https://productschool.com/resources/product-case-interviews", "Intermediate", "60–120 min", ["Case studies"], "Practice real product case interview questions."),
  ],
  "technical-writer": [
    p("Google tech writing", "Google", "https://developers.google.com/tech-writing", "Beginner", "2–3 hours", ["Tech writing"], "Free official technical writing courses."),
    p("Docs-as-code practice", "Write the Docs", "https://www.writethedocs.org/guide/", "Intermediate", "60–120 min", ["Documentation"], "Community guide to shipping great docs."),
  ],
};

// ── per-skill-category practice (broad last resort, direct links only) ───────
export const CATEGORY_PRACTICE = {
  programming: [
    p("Exercism", "Exercism", "https://exercism.org/", "Beginner", "30–60 min", ["Coding"], "Mentored exercises for dozens of languages."),
    p("Codewars", "Codewars", "https://www.codewars.com/", "Beginner", "20–40 min", ["Coding"], "Ranked kata across languages."),
    p("LeetCode", "LeetCode", "https://leetcode.com/problemset/", "Intermediate", "45–90 min", ["Algorithms"], "Interview problems by tag."),
  ],
  frontend: [
    p("Frontend Mentor", "Frontend Mentor", "https://www.frontendmentor.io/challenges", "Intermediate", "2–3 hours", ["HTML", "CSS", "JS"], "Real design briefs to build."),
    p("CodePen", "CodePen", "https://codepen.io/", "Beginner", "20–40 min", ["Frontend"], "Prototype and share frontend ideas."),
    p("W3Schools exercises", "W3Schools", "https://www.w3schools.com/html/html_exercises.asp", "Beginner", "15–30 min", ["HTML", "CSS"], "Quick interactive exercises."),
  ],
  backend: [
    p("Exercism", "Exercism", "https://exercism.org/", "Beginner", "30–60 min", ["Programming"], "Practice in your backend language."),
    p("LeetCode", "LeetCode", "https://leetcode.com/problemset/", "Intermediate", "45–90 min", ["Algorithms"], "Interview problems by tag."),
  ],
  databases: [
    p("HackerRank SQL", "HackerRank", "https://www.hackerrank.com/domains/sql", "Beginner", "30–60 min", ["SQL"], "Auto-graded SQL challenges."),
    p("SQLBolt", "SQLBolt", "https://sqlbolt.com/", "Beginner", "20–40 min", ["SQL"], "Interactive SQL lessons."),
  ],
  data: [
    p("Kaggle Learn", "Kaggle", "https://www.kaggle.com/learn", "Beginner", "2–3 hours", ["Data science", "ML"], "Hands-on micro-courses."),
    p("Google Colab", "Google Colab", "https://colab.research.google.com/", "Intermediate", "60–120 min", ["Notebooks"], "Free GPU notebooks."),
  ],
  devops: [
    p("Killercoda", "Killercoda", "https://killercoda.com/playgrounds", "Beginner", "30–60 min", ["DevOps"], "Interactive browser playgrounds."),
    p("Play with Docker", "Play with Docker", "https://labs.play-with-docker.com/", "Beginner", "30–60 min", ["Containers"], "Hands-on container labs."),
  ],
  security: [
    p("TryHackMe", "TryHackMe", "https://tryhackme.com/", "Beginner", "60–120 min", ["Security"], "Guided hands-on rooms."),
    p("PortSwigger Academy", "PortSwigger", "https://portswigger.net/web-security/all-labs", "Intermediate", "60–120 min", ["Web security"], "Free web-security labs."),
    p("OverTheWire", "OverTheWire", "https://overthewire.org/wargames/", "Beginner", "30–60 min", ["Linux", "Security"], "Level-based wargames."),
  ],
  engineering: [
    p("Vendor tutorials", "Autodesk", "https://www.autodesk.com/learn", "Beginner", "2–3 hours", ["CAD"], "Official software tutorials."),
    p("CAD exercises", "CADExercises", "https://caddexpert.com/", "Intermediate", "60–120 min", ["Drafting", "Modeling"], "Real drawings to reproduce."),
  ],
  design: [
    p("Figma practice", "Figma", "https://www.figma.com/community", "Beginner", "30–60 min", ["Design"], "Recreate community files."),
    p("Frontend Mentor", "Frontend Mentor", "https://www.frontendmentor.io/challenges", "Intermediate", "1–2 hours", ["UI"], "Turn briefs into designs."),
  ],
  office: [
    p("Microsoft Learn", "Microsoft Learn", "https://learn.microsoft.com/training/", "Beginner", "30–60 min", ["Office skills"], "Free official Office training."),
    p("Typing practice", "Keybr", "https://www.keybr.com/", "Beginner", "10–20 min", ["Typing"], "Adaptive typing practice."),
  ],
  // normalized buckets reached through CATEGORY_ALIAS (e.g. the
  // "Programming Languages" skill category maps to programming)
  "programming languages": [
    p("Exercism", "Exercism", "https://exercism.org/", "Beginner", "30–60 min", ["Coding"], "Mentored exercises for dozens of languages."),
    p("Codewars", "Codewars", "https://www.codewars.com/", "Beginner", "20–40 min", ["Coding"], "Ranked kata across languages."),
  ],
  "engineering software": [
    p("Engineering courses", "MIT OpenCourseWare", "https://ocw.mit.edu/search/?d=Engineering", "Beginner", "2–3 hours", ["Engineering"], "Free university courses with lecture notes, problem sets and exams."),
    p("Vendor tutorials", "Autodesk", "https://www.autodesk.com/learn", "Beginner", "2–3 hours", ["CAD"], "Official software tutorials."),
    p("CAD exercises", "CADExercises", "https://caddexpert.com/", "Intermediate", "60–120 min", ["Drafting", "Modeling"], "Real drawings to reproduce."),
  ],
  productivity: [
    p("Microsoft Learn", "Microsoft Learn", "https://learn.microsoft.com/training/", "Beginner", "30–60 min", ["Office skills"], "Free official Office training."),
    p("Typing practice", "Keybr", "https://www.keybr.com/", "Beginner", "10–20 min", ["Typing"], "Adaptive typing practice."),
  ],
  electronics: [
    p("Arduino tutorials", "Arduino", "https://docs.arduino.cc/learn/", "Beginner", "60–120 min", ["Microcontrollers"], "Official hands-on Arduino lessons."),
    p("Circuit simulator", "Tinkercad", "https://www.tinkercad.com/circuits", "Beginner", "30–60 min", ["Circuits"], "Design and test circuits in your browser."),
  ],
};

// ── career-domain practice (non-technical / interview roadmaps) ──────────────
export const DOMAIN_PRACTICE = {
  "QA & Testing": [
    p("Testing exercises", "freeCodeCamp", "https://www.freecodecamp.org/learn/quality-assurance/", "Intermediate", "2–3 hours", ["Testing"], "Project-based QA curriculum."),
    p("SQL practice", "SQLBolt", "https://sqlbolt.com/", "Beginner", "30–60 min", ["SQL"], "Interactive SQL lessons for test queries."),
  ],
  "Cybersecurity": [
    p("TryHackMe", "TryHackMe", "https://tryhackme.com/", "Beginner", "60–120 min", ["Security"], "Guided hands-on rooms."),
    p("PortSwigger Academy", "PortSwigger", "https://portswigger.net/web-security/all-labs", "Intermediate", "60–120 min", ["Web security"], "Free web-security labs."),
  ],
  "AI & Data": [
    p("Kaggle Learn", "Kaggle", "https://www.kaggle.com/learn", "Beginner", "2–3 hours", ["Data", "ML"], "Hands-on micro-courses."),
  ],
  "Data & Business": [
    p("Kaggle", "Kaggle", "https://www.kaggle.com/datasets", "Beginner", "60–120 min", ["Analysis"], "Real datasets to analyze."),
    p("HackerRank SQL", "HackerRank", "https://www.hackerrank.com/domains/sql", "Beginner", "30–60 min", ["SQL"], "Auto-graded SQL challenges."),
  ],
  "Cloud & DevOps": [
    p("Killercoda", "Killercoda", "https://killercoda.com/playgrounds", "Beginner", "30–60 min", ["DevOps"], "Interactive playgrounds."),
  ],
  "Database & Infrastructure": [
    p("HackerRank SQL", "HackerRank", "https://www.hackerrank.com/domains/sql", "Beginner", "30–60 min", ["SQL"], "Auto-graded SQL challenges."),
    p("SQLBolt", "SQLBolt", "https://sqlbolt.com/", "Beginner", "20–40 min", ["SQL"], "Interactive SQL lessons."),
  ],
  "Engineering": [
    p("Engineering courses", "MIT OpenCourseWare", "https://ocw.mit.edu/search/?d=Engineering", "Beginner", "2–3 hours", ["Engineering"], "Free university courses with lecture notes, problem sets and exams."),
    p("Engineering reference", "Engineering Toolbox", "https://www.engineeringtoolbox.com/", "Beginner", "20–40 min", ["Formulas", "Data"], "Reference tables, formulas and calculators for engineering work."),
    p("Vendor tutorials", "Autodesk", "https://www.autodesk.com/learn", "Beginner", "2–3 hours", ["CAD"], "Official software tutorials."),
    p("CAD exercises", "CADExercises", "https://caddexpert.com/", "Intermediate", "60–120 min", ["Drafting"], "Real drawings to reproduce."),
  ],
  "Game & Graphics": [
    p("Exercism", "Exercism", "https://exercism.org/", "Beginner", "30–60 min", ["Programming"], "Practice your chosen language."),
    p("LeetCode", "LeetCode", "https://leetcode.com/problemset/", "Intermediate", "45–90 min", ["Algorithms"], "Interview problems by tag."),
  ],
  "UI/UX & Design": [
    p("Frontend Mentor", "Frontend Mentor", "https://www.frontendmentor.io/challenges", "Intermediate", "1–2 hours", ["UI"], "Turn briefs into designs."),
    p("Figma community", "Figma", "https://www.figma.com/community", "Beginner", "30–60 min", ["Design"], "Recreate community files."),
  ],
  "Software Development": [
    p("LeetCode", "LeetCode", "https://leetcode.com/problemset/", "Intermediate", "45–90 min", ["Algorithms"], "Interview problems by tag."),
    p("Exercism", "Exercism", "https://exercism.org/", "Beginner", "30–60 min", ["Coding"], "Mentored exercises."),
  ],
  "Blockchain & Web3": [
    p("Exercism", "Exercism", "https://exercism.org/", "Beginner", "30–60 min", ["Programming"], "Practice your chosen language."),
    p("LeetCode", "LeetCode", "https://leetcode.com/problemset/", "Intermediate", "45–90 min", ["Algorithms"], "Interview problems by tag."),
  ],
  "Mobile Development": [
    p("Exercism", "Exercism", "https://exercism.org/", "Beginner", "30–60 min", ["Programming"], "Practice in your platform language."),
    p("Frontend Mentor", "Frontend Mentor", "https://www.frontendmentor.io/challenges", "Intermediate", "1–2 hours", ["UI"], "Build mobile-friendly UIs."),
  ],
  "Artificial Intelligence & Data": [
    p("Kaggle Learn", "Kaggle", "https://www.kaggle.com/learn", "Beginner", "2–3 hours", ["Data", "ML"], "Hands-on micro-courses."),
    p("Hugging Face Learn", "Hugging Face", "https://huggingface.co/learn", "Intermediate", "60–120 min", ["Models", "Pipelines"], "Practice with real models."),
  ],
  "Engineering Software": [
    p("Engineering courses", "MIT OpenCourseWare", "https://ocw.mit.edu/search/?d=Engineering", "Beginner", "2–3 hours", ["Engineering"], "Free university courses with lecture notes, problem sets and exams."),
    p("Vendor tutorials", "Autodesk", "https://www.autodesk.com/learn", "Beginner", "2–3 hours", ["CAD"], "Official software tutorials."),
    p("CAD exercises", "CADExercises", "https://caddexpert.com/", "Intermediate", "60–120 min", ["Drafting"], "Real drawings to reproduce."),
  ],
  "Electronics & Embedded": [
    p("Arduino tutorials", "Arduino", "https://docs.arduino.cc/learn/", "Beginner", "60–120 min", ["Microcontrollers"], "Official hands-on Arduino lessons."),
    p("Circuit simulator", "Tinkercad", "https://www.tinkercad.com/circuits", "Beginner", "30–60 min", ["Circuits"], "Design and test circuits in your browser."),
    p("MATLAB Onramp", "MathWorks", "https://matlabacademy.mathworks.com/", "Beginner", "2–4 hours", ["MATLAB", "Signal processing"], "Free official interactive MATLAB course."),
  ],
  "IoT & Robotics": [
    p("Arduino tutorials", "Arduino", "https://docs.arduino.cc/learn/", "Beginner", "60–120 min", ["Microcontrollers"], "Official hands-on Arduino lessons."),
    p("Circuit simulator", "Tinkercad", "https://www.tinkercad.com/circuits", "Beginner", "30–60 min", ["Circuits"], "Design and test circuits in your browser."),
  ],
};

// ── export a resolver so generate.mjs stays thin ─────────────────────────────
const norm = (s) =>
  String(s)
    .replace(/[^a-z0-9\s&]+/gi, " ")
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export function curatedPractice(label) {
  return CURATED_PRACTICE[norm(label)] ?? null;
}

// Family check — a rule tagged with `fam` only fires when the roadmap's
// domain/category belongs to that family ("code" is special-cased: coding
// domains minus non-coding slugs like WordPress).
const famOk = (r, ctx) => {
  if (!r.fam) return true;
  // noncode: only NON-coding contexts — used for genuinely relevant educational
  // practice (DSA visualizers/references) on the shared interview-prep section
  // of non-coding careers like WordPress, PM, designers and engineers.
  if (r.fam === "noncode") return !isCoding(ctx);
  // CMS / no-code / consulting careers never get family-gated technical
  // platforms — they resolve to their own roadmap practice instead.
  if (NON_CODING_SLUGS.has(ctx.slug)) return false;
  if (r.fam === "code") return isCoding(ctx);
  if (r.fam === "apt") return inFam(ctx, APT);
  if (r.fam === "typ") return inFam(ctx, TYP);
  return inFam(ctx, r.fam);
};

export function practiceRules(label, ctx = {}) {
  const matches = [];
  for (const r of PRACTICE_RULES) {
    if (!r.re.test(label)) continue;
    if (!famOk(r, ctx)) continue;
    matches.push(r);
    if (matches.length >= 3) break;
  }
  return matches.length ? matches : null;
}

// Skill-category fallback with lowercase/alias matching so categories like
// "Programming Languages", "Cloud & DevOps" or "Engineering Software" resolve
// to the right bucket instead of silently missing.
const CATEGORY_ALIAS = {
  "cloud devops": "devops",
  "ai data science": "data",
  "artificial intelligence & data": "data",
  "programming languages": "programming",
  cybersecurity: "security",
  "qa & testing": "programming",
  "engineering software": "engineering",
  "electronics & embedded": "electronics",
  "iot & robotics": "electronics",
  productivity: "office",
  "ui ux design": "design",
  "ui/ux & design": "design",
};

export function categoryPractice(cat) {
  if (!cat) return null;
  const key = norm(cat);
  return CATEGORY_PRACTICE[CATEGORY_ALIAS[key] ?? key] ?? null;
}
