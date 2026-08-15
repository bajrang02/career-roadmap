// ─────────────────────────────────────────────────────────────────────────────
// Curated knowledge for the final recurring concept labels: React state
// patterns, design interviews, performance, networking deep-dives, compiler
// tooling, power electronics and math topics. One entry per label applies in
// every roadmap where that label appears. Merged into ALL_KNOWLEDGE in
// generate.mjs (KNOWLEDGE wins). Entries stay atomic: META_SLUGS keeps their
// objectives from spawning thin concept children.
// ─────────────────────────────────────────────────────────────────────────────

const res = (t, u, k) => ({ t, u, k });

export const META_RECURRING_I = {
  // ── React state patterns ───────────────────────────────────────────────────
  "distinguish-local-vs-shared-vs-server-state": {
    d: "Distinguishing local, shared and server state is the first decision of React state design: local state lives in one component (form inputs), shared state is used by many components (user preferences), and server state is fetched data with its own lifecycle.",
    why: "State type determines the right tool — local needs useState, shared needs context or a store, server state needs fetching and caching — choosing wrong creates bugs and re-renders.",
    obj: ["Classify state by ownership and source", "Use useState for local, ephemeral state", "Lift shared state or use context/stores", "Treat server data as its own state category"],
    prereq: ["Hooks", "React component model"],
    res: [
      res("Managing state — React docs", "https://react.dev/learn/managing-state", "docs"),
      res("Choosing the state tool — React docs", "https://react.dev/learn/scaling-up-with-reducer-and-context", "docs"),
      res("Server state vs client state — TanStack Query", "https://tanstack.com/query/latest/docs/framework/react/guides/does-this-placeholder-exist", "docs"),
    ],
    int: ["What is the difference between local and shared state?", "When is server state not 'state' in the React sense?", "How do you decide between context and a store?"],
    tips: ["Ask 'who owns it and where does it come from?' before choosing a tool"],
    diff: "Advanced", time: "3–4 hours",
  },
  "lift-state-up-to-the-right-component": {
    d: "Lifting state up is moving shared state to the lowest common ancestor of the components that need it — so siblings can coordinate through a single source of truth instead of duplicating data.",
    why: "Lifting state is the core React pattern for shared data — it prevents the desync bugs that come from duplicated state.",
    obj: ["Identify the common owner of shared state", "Move state to the lowest common parent", "Pass state and setters down as props", "Know when to lift vs use context"],
    prereq: ["Hooks", "Props and data flow"],
    res: [
      res("Lifting state up — React docs", "https://react.dev/learn/sharing-state-between-components", "tutorial"),
      res("Passing data with props — React docs", "https://react.dev/learn/passing-props-to-a-component", "tutorial"),
      res("State management — React docs", "https://react.dev/learn/managing-state", "docs"),
    ],
    int: ["What problem does lifting state solve?", "How do you find the right parent?", "When should you stop lifting and use context?"],
    tips: ["Lift to the closest ancestor that genuinely needs the state — not higher"],
    diff: "Intermediate", time: "3 hours",
  },
  "use-context-or-a-store-for-cross-cutting-state": {
    d: "Using context or a store for cross-cutting state is how React shares data that many unrelated components need — Context for medium-scope shared values, stores (Zustand, Redux, Jotai) for app-wide state with complex updates.",
    why: "Prop-drilling through many layers is painful — context and stores are the standard solutions, and choosing between them is a real architecture decision.",
    obj: ["Create and consume context providers", "Build stores with Zustand or Redux", "Choose context vs store by scope and complexity", "Avoid over-rendering with context"],
    prereq: ["Lifting state up", "Hooks"],
    res: [
      res("Passing data with context — React docs", "https://react.dev/learn/passing-data-deeply-with-context", "tutorial"),
      res("Zustand — official docs", "https://zustand.docs.pmnd.rs/", "docs"),
      res("Redux Toolkit — official docs", "https://redux-toolkit.js.org/", "docs"),
    ],
    int: ["When is context the right tool over a store?", "What is the re-render cost of context?", "Why might you choose Zustand over Redux?"],
    tips: ["Use context for shared values, stores for shared state with logic"],
    diff: "Advanced", time: "4–5 hours",
  },

  // ── Design interviews ──────────────────────────────────────────────────────
  "design-interviews": {
    d: "Design interviews are the system-design and product-design interview formats: interviewer-led problems where you design a system, feature or experience — requirements, trade-offs, components and communication, scored on reasoning.",
    why: "Design interviews gate senior roles across engineering, product and design — mastering the format and structure is what converts experience into offers.",
    obj: ["Clarify requirements before designing", "Structure the answer (requirements → design → trade-offs)", "Discuss trade-offs explicitly", "Drive the interview, don't wait for prompts"],
    prereq: ["System design basics", "Communication skills"],
    res: [
      res("System design interview — ByteByteGo", "https://blog.bytebytego.com/p/system-design-interview-basics", "article"),
      res("System design primer — GitHub", "https://github.com/donnemartin/system-design-primer", "reference"),
      res("Design interviews — Nielsen Norman Group", "https://www.nngroup.com/articles/portfolio-interviews/", "article"),
    ],
    int: ["How do you structure a design interview answer?", "What questions do you ask the interviewer?", "How do you handle unknown areas?"],
    tips: ["Talk through your reasoning — interviewers score process, not the final diagram"],
    diff: "Advanced", time: "10+ hours",
  },

  // ── Performance ────────────────────────────────────────────────────────────
  "performance": {
    d: "Performance is how fast and responsive a system is — measured with metrics like latency, throughput and resource usage, and improved by profiling, caching, and reducing wasted work.",
    why: "Performance is a product feature — users and search engines reward fast systems, and performance skills are required in almost every engineering role.",
    obj: ["Define performance metrics for the system", "Profile to find real bottlenecks", "Apply caching, batching and optimisation", "Measure improvements after changes"],
    prereq: ["Basic engineering", "Observability basics"],
    res: [
      res("Performance — web.dev", "https://web.dev/learn/performance", "tutorial"),
      res("Performance fundamentals — Google SRE", "https://sre.google/sre-book/", "article"),
      res("Performance profiling — freeCodeCamp", "https://www.freecodecamp.org/news/", "article"),
    ],
    int: ["What metrics define performance?", "Why profile before optimising?", "What is the biggest performance win in most systems?"],
    tips: ["Measure first, optimise second, re-measure always"],
    diff: "Intermediate", time: "4–6 hours",
  },
  "performance-profiling": {
    d: "Performance profiling is measuring where a system spends its time and resources — CPU, memory, network — using profilers and tracing to find the actual bottlenecks instead of guessing.",
    why: "Most optimisation effort is wasted on code that isn't slow — profiling turns performance work from guesswork into evidence.",
    obj: ["Run CPU and memory profilers", "Read flame graphs and hot spots", "Find the actual bottleneck", "Verify optimisations by re-profiling"],
    prereq: ["One language", "Performance basics"],
    res: [
      res("Profiling — Chrome DevTools", "https://developer.chrome.com/docs/devtools/performance/", "docs"),
      res("Python profiling — Real Python", "https://realpython.com/python-profiling/", "tutorial"),
      res("Profiling — GeeksforGeeks", "https://www.geeksforgeeks.org/profiling-in-python/", "tutorial"),
    ],
    int: ["Why profile instead of guessing?", "What is a flame graph?", "How do you confirm an optimisation worked?"],
    tips: ["Profile the real workload — synthetic benchmarks mislead"],
    diff: "Advanced", time: "4 hours",
  },

  // ── Networking deep dives ──────────────────────────────────────────────────
  "tcpip-deep-dive": {
    d: "The TCP/IP deep dive goes beyond basics into how the stack actually behaves: TCP connection lifecycle, congestion control, retransmission, flow control and the protocol details behind real network behaviour.",
    why: "Deep TCP/IP knowledge is what separates network engineers and systems people from the rest — it's the layer where mysterious outages and performance problems actually live.",
    obj: ["Explain TCP handshake, teardown and states", "Understand congestion control and retransmission", "Use packet captures to verify behaviour", "Troubleshoot with protocol knowledge"],
    prereq: ["TCP/IP basics", "Packet analysis"],
    res: [
      res("TCP — RFC 9293", "https://www.rfc-editor.org/rfc/rfc9293", "docs"),
      res("TCP congestion control — Cloudflare", "https://www.cloudflare.com/learning/", "article"),
      res("TCP/IP — GeeksforGeeks", "https://www.geeksforgeeks.org/tcp-ip-model/", "tutorial"),
    ],
    int: ["Walk me through the TCP handshake and teardown.", "How does congestion control work?", "What is the TIME_WAIT state for?"],
    tips: ["Verify every theory with a packet capture — the stack is observable"],
    diff: "Advanced", time: "6–8 hours",
  },
  "subnetting-routing": {
    d: "Subnetting and routing are the practical network-design skills: dividing networks into subnets with CIDR, and configuring routing between them — the mechanics behind every VPC and enterprise network.",
    why: "Subnet and route design is the daily work of cloud and network engineers — getting it wrong breaks connectivity and security boundaries.",
    obj: ["Subnet networks with CIDR math", "Design subnet layouts for tiers", "Configure static and dynamic routing", "Troubleshoot routing failures"],
    prereq: ["IP addressing and subnets", "Routing and switching"],
    res: [
      res("Subnetting — NetworkLessons", "https://networklessons.com/subnetting", "tutorial"),
      res("CIDR — DigitalOcean", "https://www.digitalocean.com/community/tutorials/understanding-ip-addresses-subnets-and-cidr-notation-for-networking", "tutorial"),
      res("Routing — Cisco", "https://www.cisco.com/c/en/us/solutions/enterprise-networks/what-is-routing.html", "article"),
    ],
    int: ["How do you calculate a subnet's range?", "How do route tables decide packet paths?", "Why segment networks into subnets?"],
    tips: ["Practice subnet math until it's instant — it's the fluency of networking"],
    diff: "Advanced", time: "5–6 hours",
  },
  "web-technologies-htmljs": {
    d: "Web technologies (HTML/JS) are the client-side foundation of the web — the markup and scripting that browsers run — and the context every web attack and web app operates in.",
    why: "Security and frontend work both assume fluency in how browsers parse, render and execute HTML and JavaScript — it's the common ground of the web platform.",
    obj: ["Understand how browsers parse and render", "Know HTML structure and JS execution", "Explain the DOM and events", "See how web tech enables attacks and defences"],
    prereq: ["HTML/JS basics"],
    res: [
      res("How browsers work — web.dev", "https://web.dev/articles/howbrowserswork", "article"),
      res("HTML — MDN Web Docs", "https://developer.mozilla.org/en-US/docs/Web/HTML", "docs"),
      res("JavaScript — MDN Web Docs", "https://developer.mozilla.org/en-US/docs/Web/JavaScript", "docs"),
    ],
    int: ["How does a browser turn HTML into a page?", "What is the DOM?", "Why do security controls live in the browser?"],
    tips: ["Use DevTools to see the parsed DOM and network reality — not just source code"],
    diff: "Intermediate", time: "4–5 hours",
  },

  // ── Compiler & power electronics ───────────────────────────────────────────
  "compiler-build-tools": {
    d: "Compiler and build tools are the toolchain that turns source into software: compilers and interpreters, linkers, package managers, task runners and bundlers working together in a build pipeline.",
    why: "Every project ships through a toolchain — knowing what each tool does is how you fix build problems, add dependencies and understand CI.",
    obj: ["Explain compiler, linker and runtime roles", "Manage builds with package managers and bundlers", "Read and fix build errors", "Automate builds in CI"],
    prereq: ["One language", "Command line"],
    res: [
      res("Compiler — Wikipedia", "https://en.wikipedia.org/wiki/Compiler", "reference"),
      res("npm docs", "https://docs.npmjs.com/", "docs"),
      res("Build systems — GNU Make manual", "https://www.gnu.org/software/make/manual/make.html", "docs"),
    ],
    int: ["What is the difference between a compiler and an interpreter?", "What does a linker do?", "Why do builds fail and how do you fix them?"],
    tips: ["Learn to run your toolchain from the terminal — it demystifies the whole pipeline"],
    diff: "Intermediate", time: "4–5 hours",
  },
  "power-electronics": {
    d: "Power electronics is the conversion and control of electrical power — rectifiers, inverters, DC-DC converters and switching regulators — the electronics layer of power systems, drives and chargers.",
    why: "Power electronics is the technology behind EVs, solar inverters, phone chargers and industrial drives — a core electrical engineering specialisation with high demand.",
    obj: ["Understand converter topologies (buck, boost, inverter)", "Explain switching and PWM control", "Analyse efficiency and losses", "Apply converters to real systems"],
    prereq: ["Circuit basics", "Electronics"],
    res: [
      res("Power electronics — Khan Academy", "https://www.khanacademy.org/science/electrical-engineering", "course"),
      res("DC-DC converters — All About Circuits", "https://www.allaboutcircuits.com/textbook/semiconductors/chpt-11/", "tutorial"),
      res("Power electronics — MIT OCW", "https://ocw.mit.edu/courses/6-334-power-electronics-spring-2007/", "course"),
    ],
    int: ["What is the difference between a buck and a boost converter?", "Why is switching more efficient than linear regulation?", "Where does power electronics appear in everyday devices?"],
    tips: ["Learn the switching basics first — every converter is switches, inductors and capacitors"],
    diff: "Advanced", time: "8–10 hours",
  },

  // ── Math topics ────────────────────────────────────────────────────────────
  "algebra-and-functions": {
    d: "Algebra and functions are the foundation of quantitative work: solving equations, manipulating expressions and understanding functions — their notation, graphs and behaviour — the language of all applied math.",
    why: "Every technical field — from engineering to data science — assumes fluent algebra and function literacy, and it's the first thing tested in aptitude and placement exams.",
    obj: ["Solve equations and inequalities", "Manipulate polynomials and rationals", "Graph and transform functions", "Model situations with functions"],
    prereq: ["Arithmetic"],
    res: [
      res("Algebra — Khan Academy", "https://www.khanacademy.org/math/algebra", "course"),
      res("Functions — Math is Fun", "https://www.mathsisfun.com/sets/function.html", "tutorial"),
      res("Algebra — Paul's Online Notes", "https://tutorial.math.lamar.edu/classes/alg/alg.aspx", "reference"),
    ],
    int: ["What is a function?", "How do you solve a system of equations?", "What does a function's graph tell you?"],
    tips: ["Practise until manipulation is automatic — speed matters in exams"],
    diff: "Beginner", time: "15–20 hours",
  },
};
