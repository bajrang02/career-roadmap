// ─────────────────────────────────────────────────────────────────────────────
// Topic lexicon — merged curated knowledge for the most-repeated labels, plus
// a label-aware family composer for the long tail.
//
// Lookup order in generate.mjs:
//   1. KNOWLEDGE (topic-knowledge.mjs) — exact slug
//   2. LEXICON   (this file)            — exact slug, hand-written entries
//   3. MATCHES   (topic-knowledge.mjs)  — regex matches
//   4. Family composer (this file)      — label-aware, family-specific text
//
// The composer exists so NO node ever falls back to generic template text.
// Every label not in the curated maps is classified into a knowledge family
// and described with real, domain-specific facts woven around the label,
// parent topic and career name.
// ─────────────────────────────────────────────────────────────────────────────
import { CAREER_LEXICON } from "./lexicon-career.mjs";
import { TECH_LEXICON } from "./lexicon-tech.mjs";
import { CONCEPT_LEXICON } from "./lexicon-concepts.mjs";

export const LEXICON = {
  ...CAREER_LEXICON,
  ...TECH_LEXICON,
  ...CONCEPT_LEXICON,
};

// Substitute the roadmap/career title into §career§ placeholders.
export const fillLexicon = (obj, careerTitle) => {
  if (!obj) return obj;
  const out = { ...obj };
  if (typeof out.d === "string") out.d = out.d.replaceAll("§career§", careerTitle);
  if (typeof out.why === "string") out.why = out.why.replaceAll("§career§", careerTitle);
  if (Array.isArray(out.obj)) out.obj = out.obj.map((s) => s.replaceAll("§career§", careerTitle));
  if (Array.isArray(out.prereq)) out.prereq = out.prereq.map((s) => s.replaceAll("§career§", careerTitle));
  return out;
};

// ── Family registry: real, domain-specific facts per topic family ────────────
// Each family provides what/why/used/core/mistake/outcome. {label} and {career}
// are substituted at composition time. `re` is tested against the label.

const FAMILIES = [
  {
    name: "data-structures",
    re: /array|linked list|stack|queue|tree|graph|hash|heap|sort|search|recursion|dynamic programming|big-o|sliding window|two pointer|bfs|dfs|binary search|greedy|backtracking|data structure|algorithm/i,
    what: "{label} is a core data-structure or algorithm concept: the way data is organised or processed in {career} work. Understanding its mechanics, complexity and trade-offs is what lets you choose the right tool for the problem instead of reaching for the first one that compiles.",
    why: "Data structures and algorithm analysis are the backbone of technical interviews and the vocabulary of every efficiency discussion.",
    used: "These ideas appear in production systems constantly — databases, caches, search, compilers and networks are all built from these fundamentals.",
    core: ["The structure's operations and their Big-O complexity", "When to choose it over the alternatives", "The classic problems that expose its edge cases"],
    mistake: "The classic mistake is memorising implementations without understanding the trade-offs that determine when each structure fits.",
    outcome: "By the end you'll be able to analyse a problem, pick the appropriate structure or algorithm, and justify your choice with complexity reasoning.",
  },
  {
    name: "system-design",
    re: /consisten|availability|load balanc|caching|cache|message queue|event-driven|event driven|schedule driven|background job|cap theorem|replicat|partition|microservice|api gateway|distributed|scalab|latency|throughput|cd n|domain name system|idempoten|rate limit|dead-letter|dead letter|pub\/sub|service discovery|circuit break/i,
    what: "{label} is a system-design concept: the architectural thinking that determines how production systems stay fast, available and correct as they grow. It is the layer between 'this works on my laptop' and 'this works for a million users'.",
    why: "System design topics dominate senior interviews and every serious architecture discussion, because real systems fail in exactly the ways these concepts describe.",
    used: "These principles show up in the design of every large platform — web services, databases, data pipelines and cloud infrastructure.",
    core: ["The problem the concept solves", "The trade-offs it introduces", "How it combines with the other building blocks of a system"],
    mistake: "The classic mistake is memorising patterns without understanding the trade-offs, so the pattern gets applied where it does harm.",
    outcome: "By the end you'll be able to reason about scale, availability and consistency, and defend your design choices with the same vocabulary senior engineers use.",
  },
  {
    name: "databases",
    re: /sql|database|query|index|join|transaction|schema|table|crud|normaliz|nosql|mongodb|postgres|mysql|redis|oracle|sqlite|acid|aggregation|group by|select|where clause|migration|stored procedur|view|trigger|sharding|backup|recovery|data model/i,
    what: "{label} is a database concept: how data is stored, queried and kept consistent in {career} work. Databases are the memory of every application, and understanding them separates code that works from systems that survive.",
    why: "Nearly every software role touches data — interviews probe database knowledge constantly, and production incidents trace back to schema and query decisions.",
    used: "From a product's user records to analytics warehouses, databases power the information layer of every organisation.",
    core: ["The concept's role in storing and retrieving data", "Correct syntax and semantics for real queries", "The performance and integrity trade-offs involved"],
    mistake: "The classic mistake is writing queries that work on small data and silently collapse as the dataset grows.",
    outcome: "By the end you'll be able to design schemas, write correct and efficient queries, and reason about data integrity and performance.",
  },
  {
    name: "cloud-devops",
    re: /cloud|aws|azure|gcp|lambda|s3|ec2|serverless|vpc|iam|docker|container|kubernetes|k8s|helm|ci\/cd|pipeline|terraform|ansible|jenkins|gitlab|github action|deploy|infrastructure|observab|monitor|alert|logging|metric|slo|incident|on-call|on call|cost optimi|secret|automat/i,
    what: "{label} is a cloud or DevOps concept: how modern systems are built, deployed and operated at scale in {career} work. It is the discipline of turning code into reliably running, observable software.",
    why: "Cloud and DevOps practices are the operating model of the entire industry — every deployed system runs on them, and roles in this area are in constant demand.",
    used: "From startup MVPs to enterprise platforms, these tools and practices run the infrastructure everything else sits on.",
    core: ["What the tool or practice does", "How it fits the build-deploy-operate cycle", "The operational habits that keep systems healthy"],
    mistake: "The classic mistake is learning tools in isolation without understanding the delivery and reliability problems they solve.",
    outcome: "By the end you'll be able to build, deploy, monitor and recover systems using the standard platform practices of the industry.",
  },
  {
    name: "networking",
    re: /network|tcp|udp|ip address|dns|http|https|routing|switching|subnet|protocol|packet|socket|firewall|osi|port|vpn|tls|load balanc|ping|traceroute|wireshark|bandwidth|dhcp|nat/i,
    what: "{label} is a networking concept: how data moves between computers, devices and services. It is the invisible plumbing that makes the internet, cloud and every distributed system possible.",
    why: "Networking fundamentals explain the behaviour of everything from web requests to database replication, and they are assumed knowledge in infrastructure and security roles.",
    used: "Every request, API call, stream and sync travels a network — understanding it is how you debug, secure and scale systems.",
    core: ["The protocol or mechanism and how it works", "Where it sits in the network stack", "How to troubleshoot it when things break"],
    mistake: "The classic mistake is memorising protocols without being able to trace a request through the stack when something fails.",
    outcome: "By the end you'll be able to reason about how traffic flows, diagnose connectivity problems and design network-aware systems.",
  },
  {
    name: "security",
    re: /security|threat|attack|exploit|vulnerab|owasp|xss|csrf|injection|encryption|cryptograph|hash|password|firewall|malware|forensic|penetration|authn|authz|sandbox|zero trust|red team|blue team|incident response|privacy|pii|compliance|hardening|risk/i,
    what: "{label} is a security concept: how systems are protected from the attacks that threaten them. It is the discipline of anticipating how things can break or be broken, and designing against it.",
    why: "Security failures destroy trust, data and careers — and understanding the threats is the first step to defending against them.",
    used: "Security thinking applies to every layer of software, from a login form to cloud infrastructure to the code review itself.",
    core: ["The threat or defence mechanism", "How the attack actually works", "The mitigation or practice that prevents it"],
    mistake: "The classic mistake is treating security as an afterthought instead of a property designed into the system from the start.",
    outcome: "By the end you'll be able to recognise common vulnerabilities, apply the standard defences and review systems with a security mindset.",
  },
  {
    name: "frontend",
    re: /html|css|javascript|dom|browser|responsive|flexbox|grid|component|react|vue|angular|svelte|state|hook|styling|accessib|seo|animation|tailwind|bootstrap|sass|typescript|frontend|ui |user interface|rendering|layout|font|color|media query/i,
    what: "{label} is a frontend concept: how the user-facing layer of a web application is built, styled and made interactive in {career} work. It is the part users see and feel, and where design meets engineering.",
    why: "The frontend is the product's first impression — performance, accessibility and polish there determine whether users stay or leave.",
    used: "Every website, web app and increasingly mobile app is built on frontend technologies, making this one of the most in-demand skill areas.",
    core: ["The technology or technique and what it solves", "How it combines with the rest of the frontend stack", "The performance and accessibility considerations"],
    mistake: "The classic mistake is focusing on what looks right at one screen size while ignoring performance, accessibility and real user behaviour.",
    outcome: "By the end you'll be able to build fast, accessible, responsive interfaces and explain the engineering behind them.",
  },
  {
    name: "backend",
    re: /api|rest|graphql|server|node|express|middleware|auth|jwt|session|oauth|endpoint|request|response|serializ|validation|rate limit|webhook|microservice|backend|server-side|server side|worker|queue|daemon/i,
    what: "{label} is a backend concept: how the logic, data and services behind an application are designed and exposed in {career} work. It is the engine room the frontend talks to.",
    why: "Backend design determines how an application scales, stays secure and integrates with the rest of the system — and it is the core of most engineering roles.",
    used: "APIs, services and data layers power everything from mobile apps to enterprise platforms to internal tooling.",
    core: ["The mechanism or pattern and its role", "How it handles requests, data and errors", "The security and scalability considerations"],
    mistake: "The classic mistake is building endpoints that work in happy-path demos but break under real inputs, load and edge cases.",
    outcome: "By the end you'll be able to design, build and secure the server side of an application, and reason about how it scales.",
  },
  {
    name: "mobile",
    re: /android|ios|swift|kotlin|flutter|react native|widget|app store|activity|intent|view|screen|mobile|touch|gesture|push notification|permission|app lifecycle|deep link/i,
    what: "{label} is a mobile development concept: how applications for phones and tablets are built and shipped in {career} work. It covers the platform, its UX conventions and the store ecosystem.",
    why: "Mobile is how most of the world accesses software — and mobile developers are among the most consistently in demand.",
    used: "From consumer apps to enterprise field tools, mobile platforms power billions of daily interactions.",
    core: ["The platform mechanism and how it works", "Mobile UX and lifecycle considerations", "How apps are tested, published and maintained"],
    mistake: "The classic mistake is building for one device and resolution, ignoring the fragmentation, battery and network realities of real phones.",
    outcome: "By the end you'll be able to build, test and publish mobile apps that respect the platform's conventions.",
  },
  {
    name: "ai-ml",
    re: /machine learning|neural|deep learning|tensor|model|training|dataset|feature|regression|classification|cluster|nlp|natural language|vision|transformer|llm|prompt|rag|embedding|vector database|generative|ai |ml |inference|gradient|backprop|fine-tun|fine tun|token|attention/i,
    what: "{label} is an AI or machine-learning concept: how systems learn from data and make predictions in {career} work. It is the fastest-moving and most transformative area of modern computing.",
    why: "AI and ML skills command premium roles across every industry, and understanding the concepts is what turns tools into capability.",
    used: "From recommendation engines and chatbots to computer vision and generative tools, ML powers the intelligence layer of modern products.",
    core: ["The concept or technique and how it works", "Where it applies and where it does not", "The data, evaluation and ethics considerations"],
    mistake: "The classic mistake is treating models as magic — skipping the data quality, evaluation and failure analysis that real ML work demands.",
    outcome: "By the end you'll be able to frame problems for ML, train and evaluate models, and discuss AI capability and limits accurately.",
  },
  {
    name: "data-analysis",
    re: /data|pandas|numpy|excel|spreadsheet|dashboard|visualiz|chart|statistic|analytics|bi |tableau|power bi|kpi|metric|cohort|funnel|forecast|report|cleaning|aggregat|trend|outlier|correlation/i,
    what: "{label} is a data concept: how raw information is cleaned, analysed and turned into insight in {career} work. It is the practice of making data answer questions.",
    why: "Every organisation runs on data — analysts and data-literate professionals turn it into the decisions that move businesses.",
    used: "From product analytics to finance to operations, data skills drive reporting, dashboards and evidence-based decision making.",
    core: ["The tool or technique for working with data", "How to get a reliable answer from messy data", "How to present findings clearly"],
    mistake: "The classic mistake is letting the analysis confirm what was already believed, instead of letting the data genuinely answer the question.",
    outcome: "By the end you'll be able to clean, analyse and present data credibly, and translate numbers into decisions.",
  },
  {
    name: "design",
    re: /design|ux|ui|figma|typograph|color theory|layout|wireframe|prototype|brand|logo|illustrator|photoshop|user experience|user interface|usability|heuristic|persona|journey|mockup|hierarchy|contrast|white space|grid system/i,
    what: "{label} is a design concept: how products are shaped to be usable, attractive and effective in {career} work. It is where psychology, aesthetics and function meet.",
    why: "Design determines whether a product is understood, trusted and enjoyed — and design skills are valued across product, engineering and marketing roles.",
    used: "From apps and websites to branding and marketing materials, design thinking shapes how people experience everything digital.",
    core: ["The principle or tool and its purpose", "How it influences user behaviour and perception", "How it is applied in a real design workflow"],
    mistake: "The classic mistake is decorating instead of designing — adding visual polish before the structure and usability are solved.",
    outcome: "By the end you'll be able to apply design principles deliberately and produce work that is both functional and considered.",
  },
  {
    name: "soft-skills",
    re: /communicat|collaborat|feedback|listen|document|writing|time manag|learning|teamwork|present|negotiat|leadership|mentor|meeting|stakeholder|interviewing|etiquette|professional|ethics|bias|workflow|priorit/i,
    what: "{label} is a professional skill: the way you work with people, information and yourself in {career} settings. Technical skill gets the work done; these skills determine how far it takes you.",
    why: "Hiring teams hire people, not just skills — and the soft skills are what interviews, reviews and promotions are decided on.",
    used: "Every team, meeting, review, client relationship and career conversation runs on these capabilities.",
    core: ["The skill and what it looks like in practice", "The common failure modes", "How to practise and improve it deliberately"],
    mistake: "The classic mistake is treating soft skills as innate, when they are practised capabilities like any other.",
    outcome: "By the end you'll be able to communicate, collaborate and manage your work in ways that make you someone teams want to keep and promote.",
  },
  {
    name: "engineering",
    re: /mechanics|thermodynamic|fluid|material|circuit|electrical|structural|civil|mechanical|chemical|kinematic|dynamic|static|stress|strain|beam|load|force|energy|power|turbine|pump|heat|entropy|enthalpy|momentum|torque|friction|machine|manufactur|process|automation|control|signal|sensor|actuator|embedded|firmware|microcontroller|plc|scada|cad|drafting|simulation|fea|cfd|finite element|solidworks|autocad|catia|ansys|matlab|simulink|revit|etabs|staad|sketchup|fusion|creo|labview/i,
    what: "{label} is an engineering concept: the physics, mathematics and tooling that let engineers design, analyse and build the physical world in {career} work. It is applied science with real constraints.",
    why: "Engineering fundamentals are the foundation of every engineered product — and the reason careers in this field are built on solid theory plus practical skill.",
    used: "From bridges and machines to electronics and energy systems, engineering concepts shape the physical infrastructure of modern life.",
    core: ["The principle or tool and how it works", "The standard methods of analysis or modelling", "How it is applied in real engineering work"],
    mistake: "The classic mistake is memorising formulas without understanding the assumptions behind them, then applying them outside their valid range.",
    outcome: "By the end you'll be able to reason about physical systems, use the standard analysis methods and apply professional engineering judgement.",
  },
  {
    name: "math",
    re: /calculus|linear algebra|probability|statistics|algebra|trigonometry|differential equation|matrix|vector|derivative|integral|function|graph|theorem|proof|geometry|discrete|number theory|optimization|series/i,
    what: "{label} is a mathematics concept: the branch of mathematics and how it is applied in {career} work. Math is the shared language of engineering, data and computer science.",
    why: "Mathematical reasoning underpins everything from algorithms and machine learning to engineering analysis — and it is a foundation interviewers test.",
    used: "Quantitative fields rely on these tools daily: modelling, optimisation, data science, control systems and scientific computing.",
    core: ["The concept and its definition", "The operations and techniques used with it", "Its applications in the real world"],
    mistake: "The classic mistake is learning procedures without the intuition, so problems that require adapting the method become impossible.",
    outcome: "By the end you'll be able to apply the mathematics with both fluency and understanding, and connect it to its applications.",
  },
  {
    name: "exam-career",
    re: /exam|aptitude|reasoning|mock test|upsc|ssc|banking|railways|current affairs|general awareness|english language|interview|resume|salary|offer|negotiat|portfolio|job|networking|behavioral|star method|certification|career|specializ|leadership|growth|role|job hunt|application|recruit/i,
    what: "{label} is a career or assessment concept: the strategy and preparation that turns knowledge into results in {career} — whether in a competitive exam, a hiring process or a career move.",
    why: "Preparation strategy often decides outcomes as much as raw ability does — and knowing how to approach the process is a skill in itself.",
    used: "From competitive exams to interviews, negotiations and career planning, these techniques apply at every career milestone.",
    core: ["What the process or technique involves", "The common pitfalls and how to avoid them", "The practice that produces strong results"],
    mistake: "The classic mistake is starting preparation without a strategy, spending time on low-value activity while the real test format goes unpractised.",
    outcome: "By the end you'll be able to approach assessments, interviews and career decisions with a plan, preparation and confidence.",
  },
  {
    name: "git",
    re: /git|github|commit|branch|merge|rebase|repository|pull request|version control|staging|remote|conflict|clone|push|checkout/i,
    what: "{label} is a version-control concept: how code is tracked, shared and collaborated on in {career} work. Git is the safety net and record of every professional codebase.",
    why: "Version control is the first professional tool every developer learns — and fluency with it is assumed from day one at any company.",
    used: "From solo projects to open-source and enterprise teams, every line of professional code lives in a version-control system.",
    core: ["The command or concept and what it does", "How it fits the collaboration workflow", "The safe ways to undo and recover"],
    mistake: "The classic mistake is memorising commands without understanding the commit/branch model, so mistakes are solved by panic rather than understanding.",
    outcome: "By the end you'll be able to manage code history confidently, collaborate cleanly and recover from mistakes calmly.",
  },
  {
    name: "office-productivity",
    re: /excel|powerpoint|word|notion|confluence|jira|trello|google sheets|slides|document|spreadsheet|formula|pivot|macro|template|mail|calendar|task|project plan|gantt|agile|scrum|sprint|kanban/i,
    what: "{label} is a productivity-tool concept: how office and project software is used to organise work, communicate and deliver in {career} settings. These tools are the daily operating system of most professionals.",
    why: "Tool fluency is silent productivity — professionals who command these tools produce better work in less time and are trusted with more.",
    used: "Reporting, planning, communication and collaboration in virtually every organisation run on this software.",
    core: ["The tool's core functions", "The features that save the most time", "How it fits real workflows"],
    mistake: "The classic mistake is using the tool's shallow defaults while ignoring the features — formulas, automations, templates — that multiply output.",
    outcome: "By the end you'll be able to produce polished, effective documents, spreadsheets and plans efficiently.",
  },
  {
    name: "science-bio",
    re: /biology|chemistry|physics|cell|molecule|organism|genetic|enzyme|microbe|bacteri|virus|immune|protein|dna|rna|reaction|atom|bond|acid|base|thermo|electric|magnet|wave|optics|quantum|nuclear|lab|experiment|clinical|pharma|drug/i,
    what: "{label} is a science concept: the natural phenomenon, law or laboratory technique central to {career} work. It is the fundamental knowledge on which the applied field is built.",
    why: "A scientific foundation is what lets practitioners understand why things work, not just how — the depth that separates technicians from professionals.",
    used: "From healthcare and biotechnology to materials and energy, scientific principles drive every applied discipline.",
    core: ["The concept and its underlying mechanism", "The key laws or relationships", "Its real-world applications"],
    mistake: "The classic mistake is memorising facts without understanding the mechanisms, so new situations that need reasoning become unmanageable.",
    outcome: "By the end you'll be able to reason from first principles and connect the science to its professional applications.",
  },
  {
    name: "business",
    re: /market|marketing|sales|finance|account|audit|tax|budget|revenue|cost|customer|product manag|project manag|strategy|supply chain|logistics|procurement|hr |talent|recruit|entrepreneur|startup|business|pricing|advertis|seo|campaign|brand|content|email|growth|analytics|kpi|forecast|financial|investment|risk/i,
    what: "{label} is a business concept: how organisations create, deliver and capture value in {career} work. It connects specialised skills to the economic reality of how companies operate.",
    why: "Business acumen is what turns technical or creative ability into career value — the professionals who understand the business are the ones who lead it.",
    used: "Every company runs on these functions — finance, marketing, operations and strategy shape how work is funded, sold and prioritised.",
    core: ["The function or concept and its purpose", "The key metrics and frameworks", "How it drives decisions"],
    mistake: "The classic mistake is mastering a skill without understanding the business context, so the work is competent but disconnected from value.",
    outcome: "By the end you'll be able to understand how organisations work and connect your work to the outcomes that matter.",
  },
];

const DEFAULT_FAMILY = {
  name: "general",
  what: "{label} is a key part of {career} work: the concept, tool or practice that professionals in this field actually use day to day. It belongs in this roadmap because it directly supports the kind of work the career involves.",
  why: "Professionals in this field are expected to know it — it shows up in everyday work, in projects and in the discussions that shape decisions.",
  used: "You will meet it in real scenarios: in projects, on the job and in the way practitioners describe their work.",
  core: ["What it is and what it is for", "How it is used in practice", "Where it fits in the wider field"],
  mistake: "The classic mistake is learning it in isolation, without connecting it to the real workflows where it earns its place.",
  outcome: "By the end you'll be able to recognise where it applies, use it confidently and build on it in later topics.",
};

const familyFor = (label) => FAMILIES.find((f) => f.re.test(label)) ?? DEFAULT_FAMILY;

// ── Label-aware composer (long-tail fallback) ────────────────────────────────
// Produces a genuinely topic-specific description for any label using real
// family facts + the label, type, parent and career name. Never emits the
// generic template phrases the old fallback used.
export function composeLabelAware(label, type, careerTitle, parentLabel) {
  const fam = familyFor(label);
  const clean = label.replace(/^Understand:\s*/i, "").replace(/—\s*(fundamentals|practice).*$/i, "").trim();
  const what = fam.what.replaceAll("{label}", clean).replaceAll("{career}", careerTitle);
  const why = fam.why.replaceAll("{label}", clean).replaceAll("{career}", careerTitle);
  const used = fam.used.replaceAll("{label}", clean).replaceAll("{career}", careerTitle);

  let lead;
  if (type === "project" || /project/i.test(clean)) {
    lead = `${clean} is a hands-on project where you apply ${careerTitle} skills to build something real and working. Projects are how understanding becomes ability: you plan, build, debug and finish, and the result is something you can show and discuss. ${why} ${used} You'll practise the full cycle — scoping the work, building it, testing it and presenting it. ${fam.mistake} ${fam.outcome}`;
  } else if (type === "section") {
    lead = `This section focuses on ${clean}, one of the concrete skill areas within ${careerTitle}. It gathers the related topics you'll need at this stage of the roadmap, and it sets up the sections that follow by building the knowledge they assume. ${why} ${used} You'll cover ${fam.core[0]}, ${fam.core[1]} and ${fam.core[2]}. ${fam.mistake} ${fam.outcome}`;
  } else if (type === "subsection") {
    lead = `${clean} is a grouped set of related topics inside the ${careerTitle} roadmap, designed to be learned together because they reinforce one another. ${why} ${used} Working through them as a cluster gives you a complete picture of this part of the field. ${fam.mistake} ${fam.outcome}`;
  } else if (type === "concept" || type === "advanced") {
    const parent = parentLabel ? ` within ${parentLabel}` : "";
    lead = `${clean} is a specific concept${parent} that ${careerTitle} professionals work with directly. Understanding it at this level — what it is, why it matters and how it behaves in practice — is what lets you reason about real problems rather than follow steps. ${why} ${used} ${fam.mistake} ${fam.outcome}`;
  } else if (type === "career" || type === "achievement") {
    lead = `${clean} marks an important milestone in the ${careerTitle} journey: the point where the work you've done comes together into capability you can use. ${why} ${used} ${fam.mistake} ${fam.outcome}`;
  } else {
    lead = `${clean} is a practical topic in ${careerTitle}: the ideas and techniques professionals use when they work with this area. It appears at this stage because it builds on what you've already covered and feeds the topics that come next. ${why} ${used} You'll cover ${fam.core[0]}, ${fam.core[1]} and ${fam.core[2]}. ${fam.mistake} ${fam.outcome}`;
  }
  return lead;
}
