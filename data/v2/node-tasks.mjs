// Per-node practical tasks: every meaningful learning node gets ONE concrete
// practice task and ONE mini-project, authored from the node's own topic and
// its roadmap's professional domain.
//
// Why this exists: the external practice/project libraries are small (174 and
// ~500 URLs), so most nodes inherited a platform landing page and the roadmap
// root's projects. That is false coverage — a student opening "Force Systems"
// saw "LeetCode" and the Mechanical Engineer root project.
//
// Design rules (deliberately strict, so this is NOT filler):
//   1. Every task names the node's own topic — never a generic "build an app".
//   2. Wording comes from the field's OWN working mode (a CNC topic gets a
//      process plan and tolerance check, never "implement it in code").
//   3. Every task has a verifiable finish condition, not just an activity.
//   4. Structural nodes (sections, choice/achievement containers) and meta nodes
//      ("Career Ready", "Interview Preparation") are skipped entirely.
//
// Tasks are self-contained: they need no external URL, so they render even when
// no platform deep-link exists.

// ── Field detection ──────────────────────────────────────────────────────────
// Keyword → field. Order matters (specific before generic).
// NOTE: stems are written WITHOUT a trailing \b where the real word continues
// (agricultur-al, horticultur-al) and "engineer" is deliberately absent from the
// software pattern — otherwise "Agricultural Engineer" classified as software.
const FIELDS = [
  ["security", /(security|cyber|pentest|penetration|soc analyst|malware|forensic|appsec|infosec|\boscp\b|\bcissp\b|threat)/i],
  ["cloud", /\b(cloud|devops|sre|platform engineer|kubernetes|docker|terraform|aws|azure|gcp|infrastructure|site reliability|build.release|gitops|observability|monitoring)\b/i],
  ["data", /\b(data (scientist|engineer|analyst)|machine learning|ml engineer|deep learning|analytics|bi\b|business intelligence|nlp|computer vision|ai |llm|generative|statistician|quantitative|etl|data science)\b/i],
  // RF/microwave engineering is a CIRCUIT discipline, not packet networking —
  // it must not receive Cisco packet-simulator tooling. Checked before
  // "network" so "rf engineer" is never classified as computer networking.
  ["rf", /\b(rf|rf engineer|microwave|antenna|antennas|radar|satellite|electromagnetic|emc|s-parameter|phased array|spectrum|radio)\b/i],
  ["network", /\b(network|telecom|wireless|cisco|routing|switching|5g|lte|optical|packet)\b/i],
  ["mobile", /\b(android|ios|mobile|flutter|react native|kotlin|swift)\b/i],
  ["frontend", /\b(frontend|front-end|ui engineer|web design|react|vue|angular|javascript|typescript|html|css|accessibility|design system)\b/i],
  ["design", /\b(ux|ui\/ux|product design|graphic design|interaction design|visual design|figma|sketch|illustrator|photoshop|motion design|industrial design|interior design|designer)\b/i],
  ["mechanical", /\b(mechanical|hvac|thermal|fluid|thermodynamic|manufacturing|production engineer|tooling|machining|cad|cae|fea|robot|automotive|aero|aerospace|aerodynamic|maintenance engineer|metallurg|welding|piping)\b/i],
  ["civil", /\b(civil|structural|construction|geotechnical|transportation|highway|survey|water resources|environmental engineer|urban|quantity survey|site engineer|planning engineer|bridges?)\b/i],
  ["electrical", /\b(electrical|electronic|power system|power electronics|vlsi|asic|fpga|embedded|firmware|instrumentation|control system|signal processing|pcb|semiconductor|robotics|mechatronic|optoelectronic|microelectronic)\b/i],
  ["chemical", /\b(chemical|process engineer|petroleum|polymer|pharma|bioprocess|refinery|oil and gas|mining|material)\b/i],
  ["agriculture", /(agricultur|agronom|horticultur|animal science|dairy|food science|\bsoil\b|forestry|\bcrop|\bfish|veterinar|environmental science)/i],
  // Computational biology is practised with pipelines and reference datasets,
  // never with a device test rig — so it is its own field, checked first.
  ["bioinformatics", /(bioinformatic|sequence alignment|\bgenom|proteom|transcriptom|phylogenet|\bblast\b|microarray|variant calling|bioconductor|nextflow)/i],
  ["biomedical", /(biomedical|biotechnology|clinical|medical device|healthcare|bioengineer|pharmacovigilance|implants?|sterilization|iso 13485)/i],
  ["industrial", /\b(industrial engineer|systems engineer|quality engineer|supply chain|logistics|operations|project manager|product manager|six sigma|lean|manufacturing engineer|safety|occupational health|ergonomic)\b/i],
  ["business", /\b(accountant|finance|marketing|sales|hr|human resource|recruit|customer success|business analyst|consultant|teacher|educator|research engineer|technical writer|freelance|entrepreneur|devrel|advocate)\b/i],
  ["software", /(software|developer|programmer|backend|back-end|full.?stack|\bweb\b|database|\bsql\b|\bqa\b|sdet|blockchain|web3|\bgame\b|systems programmer|compiler|\blinux\b|\bgit\b|python|\bjava\b|\bruby\b|\bgo\b|\brust\b|c\+\+|c#|php|laravel|django|\bnode\b|\bapi\b|microservice|architect)/i],
];

const GENERIC = "generic";

function fieldFor(slug, title) {
  const hay = `${slug} ${title}`;
  for (const [name, re] of FIELDS) if (re.test(hay)) return name;
  return GENERIC;
}

// ── Working mode per field: how practitioners actually practise ──────────────
const MODE_BY_FIELD = {
  software: "build", frontend: "build", mobile: "build", cloud: "deploy", data: "notebook",
  security: "lab", network: "lab", rf: "compute", mechanical: "compute", civil: "compute", electrical: "compute",
  chemical: "compute", design: "create", industrial: "improve", business: "improve", bioinformatics: "notebook",
  agriculture: "field", biomedical: "validate", generic: "study",
};

// ── Field vocabulary: working tools, deliverable, verification ───────────────
const VOCAB = {
  software: { tools: "a scratch repository with tests", deliver: "a working module plus its test file", verify: "its tests pass and a peer can run it from the README", artifact: "source file and a short README" },
  frontend: { tools: "a sandbox project and browser DevTools", deliver: "a rendered component/page with its responsive states", verify: "it passes an accessibility check and works at 360px width", artifact: "component source plus a screenshot" },
  mobile: { tools: "the platform SDK, an emulator, and a device or simulator", deliver: "a runnable app screen implementing the target behavior", verify: "it runs without errors and handles its empty and error states", artifact: "project source plus a screen recording" },
  data: { tools: "a notebook with a fixed random seed and a versioned dataset", deliver: "a reproducible notebook or query script with its results", verify: "a clean run reproduces the same metrics", artifact: "notebook plus a short findings summary" },
  cloud: { tools: "an isolated dev account/namespace and infrastructure-as-code", deliver: "a reproducible deployment with all configuration under version control", verify: "the environment rebuilds from scratch and the health check passes", artifact: "IaC/config files plus a runbook" },
  security: { tools: "an isolated lab VM/container (never production) and the original advisories", deliver: "a lab exercise with captured evidence for each step", verify: "every finding states proof, impact, and a concrete remediation", artifact: "lab notes plus a findings report" },
  network: { tools: "a network simulator (Packet Tracer/GNS3) or a lab topology", deliver: "a configured topology with addressing and routing documented", verify: "traffic flows as intended and a deliberately introduced fault is diagnosed", artifact: "topology diagram plus device configurations" },
  rf: { tools: "an RF/microwave simulator (ADS, ANSYS HFSS, or MATLAB) plus a VNA or spectrum-analyzer bench as available", deliver: "a circuit or antenna design with its simulated S-parameters or link budget", verify: "simulated and measured/expected values agree within a stated tolerance across the band", artifact: "schematic or geometry, S-parameter plots, and a measurement/test log" },
  mechanical: { tools: "CAD plus a hand-calculation sheet and, where relevant, a simulation", deliver: "a dimensioned model together with its governing calculations", verify: "the hand calculations agree with the simulation within a stated tolerance", artifact: "model files, the calculation sheet, and a one-page design note (assumptions, units, result)" },
  civil: { tools: "CAD/analysis software (or a calculation spreadsheet) and the governing code", deliver: "a design check covering load takedown, member sizing, and code references", verify: "every check cites the governing clause and reports utilization", artifact: "the calculation package plus drawings" },
  electrical: { tools: "a simulator (LTspice/MATLAB/Vivado) or a bench setup with instruments", deliver: "a schematic and its simulated or measured results", verify: "calculated and simulated values agree within tolerance, with deviations explained", artifact: "schematic, plots, and a test/measurement log" },
  chemical: { tools: "process simulation software and a mass/energy balance sheet", deliver: "a balanced flowsheet with sizing for the key unit operations", verify: "mass and energy balances close and safety limits are stated", artifact: "flowsheet, balance tables, and a design summary" },
  agriculture: { tools: "field sampling data or a crop/soil model plus official agronomic guidelines", deliver: "a site-specific plan with measured inputs and cited guidelines", verify: "every recommendation traces to measured data or a cited guideline", artifact: "plan, data table, and a stakeholder-facing summary" },
  bioinformatics: { tools: "the reference dataset, standard file formats (FASTA/FASTQ/VCF), and a workflow tool (Biopython, Bioconductor, or Nextflow)", deliver: "a reproducible analysis pipeline with its inputs, parameters, and outputs", verify: "the pipeline reruns from raw inputs to identical outputs with tool versions pinned", artifact: "pipeline scripts, a version manifest, and a results summary" },
  biomedical: { tools: "the reference dataset, applicable standard, or the device test rig", deliver: "a validated analysis or the device/process documentation", verify: "results meet stated acceptance criteria and the standard is cited", artifact: "analysis report with traceable inputs" },
  industrial: { tools: "a process map plus a spreadsheet or Minitab for measurement", deliver: "a documented improvement with baseline and post-change measurement", verify: "the improvement is quantified against the baseline with the method stated", artifact: "before/after data and an implementation plan" },
  business: { tools: "a spreadsheet or tracking tool plus the relevant framework", deliver: "a deliverable a manager could act on (plan, model, or analysis)", verify: "it states assumptions, inputs, and the decision it supports", artifact: "the deliverable plus a one-page executive summary" },
  design: { tools: "Figma (or your tool of record) and a design-review checklist", deliver: "an annotated design artifact with variants", verify: "a reviewer can map every decision to a stated user need", artifact: "the design file plus a one-page rationale" },
  generic: { tools: "the standard tooling for this field and your note-taking system", deliver: "a documented worked example whose steps someone else can reproduce", verify: "an independent reader follows the steps and reaches the same result", artifact: "the documentation plus the working artifact" },
};

// ── Task archetypes per working mode ─────────────────────────────────────────
// Each archetype gets the topic and the field vocabulary, and must produce
// steps that make sense for a practitioner of THAT field.
const MODE_TASKS = {
  build: [
    (t, v) => ({ title: `Guided implementation: ${t}`, steps: [
      `Write down what ${t} does and when you would reach for it, before writing code.`,
      `Implement the smallest working example of ${t} using ${v.tools}.`,
      `Add one edge case, watch it fail or pass, then document what you learned.`,
    ] }),
    (t, v) => ({ title: `Refactor-and-prove: ${t}`, steps: [
      `Take a working example of ${t} and deliberately introduce one realistic mistake.`,
      `Diagnose it from the symptoms alone using ${v.tools}, then fix it.`,
      `Record the diagnostic checklist you used so the same fault is found faster next time.`,
    ] }),
  ],
  deploy: [
    (t, v) => ({ title: `Provision-and-verify: ${t}`, steps: [
      `Sketch the architecture for ${t} and list what must be configured.`,
      `Provision it in an isolated environment using ${v.tools}.`,
      `Tear it down and rebuild it from your notes — then fix whatever you had to guess.`,
    ] }),
    (t, v) => ({ title: `Break-and-recover: ${t}`, steps: [
      `Deploy a working ${t} setup and record its healthy state (metrics, logs, health checks).`,
      `Introduce one realistic failure and diagnose it from the evidence alone.`,
      `Write the runbook entry: symptom → diagnosis → fix → prevention.`,
    ] }),
  ],
  notebook: [
    (t, v) => ({ title: `Reproducible analysis: ${t}`, steps: [
      `State the question ${t} should answer and the metric that decides it.`,
      `Build the analysis using ${v.tools}.`,
      `Re-run it end to end from a clean state and confirm the numbers reproduce.`,
    ] }),
    (t, v) => ({ title: `Compare-and-critique: ${t}`, steps: [
      `Produce a baseline result for ${t} and record the assumptions behind it.`,
      `Apply one better-founded method and compare honestly, including where it does not help.`,
      `Write the caveats a reviewer would raise about your comparison.`,
    ] }),
  ],
  lab: [
    (t, v) => ({ title: `Hands-on lab: ${t}`, steps: [
      `Set up an isolated environment using ${v.tools}.`,
      `Work through ${t} step by step, capturing evidence at every step.`,
      `Write up findings with proof, impact, and a concrete remediation for each.`,
    ] }),
    (t, v) => ({ title: `Detect-and-explain: ${t}`, steps: [
      `Reproduce a realistic ${t} scenario in the lab and record what normal looks like.`,
      `Identify the one signal that reveals the problem and explain why it matters.`,
      `Propose the countermeasure and state its cost or limitation.`,
    ] }),
  ],
  compute: [
    // Process / operations topics (machining, welding, casting, inspection) are
    // practised by planning and verifying the process, not by varying a design
    // quantity — so they get their own archetype.
    (t, v) => ({ title: `Process plan: ${t}`, steps: [
      `Define the process for ${t}: inputs, equipment, sequence, and acceptance criteria.`,
      `Plan a realistic job using it — parameters, tolerances, and inspection points.`,
      `Check the plan against a standard, datasheet, or supervisor review and note every change.`,
    ] }),
    (t, v) => ({ title: `Worked design problem: ${t}`, steps: [
      `Pick a realistic component, system, or case that exercises ${t}.`,
      `Complete the governing calculations by hand using ${v.tools} — state assumptions and units at every step.`,
      `Check the result against a reference, code clause, or simulation and reconcile any difference.`,
    ] }),
    (t, v) => ({ title: `Sensitivity check: ${t}`, steps: [
      `Solve one baseline case for ${t} and record every input you assumed.`,
      `Vary the two most influential inputs and re-solve.`,
      `Report how sensitive the result is, and the design margin you would recommend.`,
    ] }),
  ],
  create: [
    (t, v) => ({ title: `Design exercise: ${t}`, steps: [
      `Define the user need ${t} must serve and the constraints you are working within.`,
      `Produce two distinct options using ${v.tools} rather than polishing one.`,
      `Review both against the need and write why you chose the one you did.`,
    ] }),
    (t, v) => ({ title: `Critique-and-revise: ${t}`, steps: [
      `Take an existing example of ${t} and audit it against a stated checklist.`,
      `Revise it to fix the two most important problems you found.`,
      `Document what the revision changed and the evidence behind each change.`,
    ] }),
  ],
  improve: [
    (t, v) => ({ title: `Measure-and-improve: ${t}`, steps: [
      `Map the process ${t} sits in and identify its most likely waste or defect.`,
      `Establish a baseline measurement using ${v.tools}.`,
      `Apply one disciplined change, re-measure, and state whether the improvement is real.`,
    ] }),
    (t, v) => ({ title: `Case analysis: ${t}`, steps: [
      `Take a realistic case where ${t} matters and write the decision being made.`,
      `Quantify the options using ${v.tools} and state your assumptions.`,
      `Recommend one option and name the risk it carries.`,
    ] }),
  ],
  field: [
    (t, v) => ({ title: `Field-data task: ${t}`, steps: [
      `Collect or source real measurements relevant to ${t} using ${v.tools}.`,
      `Analyze the data against the applicable guidelines for ${t}.`,
      `Turn it into a recommendation someone could act on this season or cycle.`,
    ] }),
    (t, v) => ({ title: `Plan-and-justify: ${t}`, steps: [
      `Draft the plan for ${t} with inputs, timing, and resource requirements.`,
      `Check each choice against a published guideline or measured baseline.`,
      `Note what you would monitor to know the plan is working.`,
    ] }),
  ],
  validate: [
    (t, v) => ({ title: `Validation exercise: ${t}`, steps: [
      `State the acceptance criteria ${t} must meet and how they will be measured.`,
      `Run the analysis or test using ${v.tools}.`,
      `Report pass/fail against the criteria, with the evidence and any deviation.`,
    ] }),
    (t, v) => ({ title: `Traceability review: ${t}`, steps: [
      `Take a realistic ${t} case and identify every input and assumption it depends on.`,
      `Check each one against a source, standard, or measurement.`,
      `Write up the gaps you could not verify — those are the real findings.`,
    ] }),
  ],
  study: [
    (t, v) => ({ title: `Worked examples: ${t}`, steps: [
      `Collect 5 representative ${t} problems from an authoritative source.`,
      `Work each one using ${v.tools}, recording assumptions and results.`,
      `Compare with the reference answer and write one line on every difference.`,
    ] }),
    (t, v) => ({ title: `Explain-and-apply: ${t}`, steps: [
      `Explain ${t} in writing as if teaching a beginner, without looking it up.`,
      `Apply it to a realistic example and check that your explanation held up.`,
      `Fix the explanation where your example exposed a gap.`,
    ] }),
  ],
};

const PROCESS_TOPIC_RE = /\b(machining|welding|casting|forming|stamping|molding|moulding|assembly|inspection|maintenance|commissioning|fabrication|safety|quality|tolerance|surface finish|joining|heat treatment|lubrication|tooling|process|manufacturing|production|commissioning|scheduling|pipelines?|networks?|grid|distribution|transmission|sourcing|procurement|supply|vendor|testing|operations|monitoring|calibration)\b/i;

// ONLY genuinely structural / navigation nodes get no task. Career-readiness
// nodes are real nodes a student opens with a real objective, so they receive a
// career-practical deliverable from CAREER_TASKS below rather than being skipped
// (skipping them left "Portfolio & Proof of Work", "Resume & LinkedIn" and
// "Specializations & Next Steps" with no practice and no deliverable at all).
const META_LABEL = /^(career ready|overview|next steps|getting started|resources|projects|portfolio projects?|domain deep dives)$/i;

/**
 * Career-readiness deliverables. These are NOT software projects: the output is
 * a document, a profile, a plan, or a recorded explanation — the artifact the
 * topic actually produces in real job hunting.
 * Keyed by normalised label.
 */
const CAREER_TASKS = {
  "specializations-next-steps": {
    practice: {
      title: "Compare two adjacent specializations and choose your next step",
      steps: [
        "Write down the specializations this roadmap branches into.",
        "For two of them, list 3 real job postings and the skills each one asks for.",
        "Score each against the skills you already have and the gaps you still need.",
        "Pick one and write a 30-day plan with a concrete first deliverable for each week.",
      ],
    },
    project: {
      title: "Specialization decision brief and 30-day plan",
      deliver: "a one-page decision brief comparing two specializations",
      verify: "every claim is backed by a real job posting you cited",
      artifact: "decision brief plus a 30-day plan with dated milestones",
      outcomes: ["A chosen specialization with a defensible reason", "A dated 30-day plan you can start this week"],
    },
  },
  "portfolio-proof-of-work": {
    practice: {
      title: "Turn one finished piece of work into portfolio evidence",
      steps: [
        "Pick the strongest project you have completed on this roadmap.",
        "Write the problem, your approach, and the measurable outcome in 5 sentences.",
        "Add one artifact that proves it: a screenshot, a repository, a report, or a demo link.",
        "Ask one person to read it and tell you what is unclear.",
      ],
    },
    project: {
      title: "Portfolio case study for your strongest project",
      deliver: "a portfolio case study page with problem, approach, evidence, and outcome",
      verify: "a reader who does not know the project can follow it end to end",
      artifact: "a published case study with at least one verifiable artifact",
      outcomes: ["Public proof of work you can link on a resume", "A reusable case-study template"],
    },
  },
  "portfolio-walkthrough": {
    practice: {
      title: "Rehearse a 3-minute portfolio walkthrough",
      steps: [
        "Choose two portfolio pieces that are relevant to your target role.",
        "Write a 90-second walkthrough of each: problem, decisions, trade-offs, result.",
        "Record yourself delivering both and time them.",
        "Cut anything that does not support the result you want to show.",
      ],
    },
    project: {
      title: "Portfolio walkthrough script and recording",
      deliver: "a recorded 3-minute walkthrough of two portfolio projects",
      verify: "each project's trade-offs and result are stated explicitly",
      artifact: "the script plus the recording",
      outcomes: ["A rehearsed portfolio story", "A recording you can re-watch before interviews"],
    },
  },
  "resume-linkedin": {
    practice: {
      title: "Rewrite your resume into ATS-readable, evidence-backed bullets",
      steps: [
        "Rewrite every bullet as action verb + technical detail + measurable result.",
        "Remove graphics, columns, and tables that break applicant tracking systems.",
        "Mirror the exact skill keywords from three real postings for your target role.",
        "Have a peer check that each bullet states an outcome, not a duty.",
      ],
    },
    project: {
      title: "ATS-ready resume and matching LinkedIn profile",
      deliver: "a one-page ATS-parseable resume plus a LinkedIn profile that matches it",
      verify: "an ATS parser reads your skills and dates correctly, and a peer finds no unsupported claims",
      artifact: "the resume file plus the updated LinkedIn profile URL",
      outcomes: ["A resume that survives automated screening", "A LinkedIn profile consistent with your resume"],
    },
  },
  "linkedin-networking": {
    practice: {
      title: "Send three targeted professional outreach messages",
      steps: [
        "Find three people working in a role you want.",
        "Write each message in under 90 words: who you are, what you are working on, one specific question.",
        "Send them and log what you sent and when.",
        "Follow up once after a week on the ones that did not reply.",
      ],
    },
    project: {
      title: "Professional networking campaign",
      deliver: "a shortlist of 10 target contacts plus the outreach messages you sent",
      verify: "every message is personalised and asks one answerable question",
      artifact: "an outreach tracker with replies and follow-ups",
      outcomes: ["A repeatable outreach template", "At least one real industry conversation"],
    },
  },
  "job-search-strategy": {
    practice: {
      title: "Build a target list of employers and roles",
      steps: [
        "List 15 employers that hire for your target role in your region or remotely.",
        "For each, note the role title you would apply for and the top three required skills.",
        "Mark which skills you can already evidence and which you cannot.",
        "Set a weekly application target you can realistically sustain.",
      ],
    },
    project: {
      title: "Job search plan with employer research brief",
      deliver: "a target-employer research brief with role titles, required skills, and an application schedule",
      verify: "each employer entry names a real open or recurring role",
      artifact: "the brief plus an application tracker",
      outcomes: ["A focused target list instead of mass applications", "A weekly plan you can measure"],
    },
  },
  "job-hunting": {
    practice: {
      title: "Run one full application cycle end to end",
      steps: [
        "Pick one real posting you are qualified for.",
        "Tailor your resume keywords and write a matching short cover note.",
        "Apply, then log the date, role, and where you applied.",
        "Note what took the longest so the next application is faster.",
      ],
    },
    project: {
      title: "Application pipeline with tailored materials",
      deliver: "five completed applications with tailored resumes and a tracked pipeline",
      verify: "each application names a real posting and shows the tailoring you made",
      artifact: "an application tracker plus the tailored documents",
      outcomes: ["A working application routine", "Evidence of tailoring per role"],
    },
  },
  "job-portals-networking": {
    practice: {
      title: "Set up alerts on the portals that actually list your target role",
      steps: [
        "Check three job portals for your exact role title and note which one has the most results.",
        "Configure a saved search and a daily or weekly alert on the best two.",
        "Record the portal, search string, and number of matches you saw today.",
      ],
    },
    project: {
      title: "Job portal and alert setup review",
      deliver: "configured saved searches on your two best portals plus a note on which sources produced interviews",
      verify: "the alerts actually deliver matches for your role title",
      artifact: "a short written comparison of the portals you used",
      outcomes: ["A steady inbound flow of relevant postings", "Evidence of which portal is worth your time"],
    },
  },
  "salary-negotiation": {
    practice: {
      title: "Prepare and rehearse a compensation negotiation",
      steps: [
        "Research the market range for your exact role, level, and location; record your sources.",
        "Write your target number, your acceptable minimum, and your justification.",
        "Script responses to the three hardest pushbacks.",
        "Rehearse the conversation out loud and time it.",
      ],
    },
    project: {
      title: "Compensation research brief and negotiation script",
      deliver: "a written market range with cited sources plus a negotiation script with objection responses",
      verify: "every number you would quote is traceable to a cited source",
      artifact: "the research brief and script",
      outcomes: ["A defensible salary ask", "Rehearsed answers to common pushbacks"],
    },
  },
  "offer-evaluation": {
    practice: {
      title: "Score one offer against a written decision framework",
      steps: [
        "List the factors that matter to you: compensation, growth, tech stack, location, stability.",
        "Weight each factor and score the offer on each one.",
        "Write the questions you still need answered before deciding.",
      ],
    },
    project: {
      title: "Offer comparison framework",
      deliver: "a weighted scoring sheet comparing at least two offers or one offer against your current situation",
      verify: "the recommendation follows from the weights you set, not from gut feel",
      artifact: "the scoring sheet plus a one-paragraph recommendation",
      outcomes: ["A repeatable offer decision method", "A written record of your reasoning"],
    },
  },
  "interview-preparation": {
    practice: {
      title: "Run a structured mock interview and score it",
      steps: [
        "Pick 5 questions typical for your role.",
        "Answer each out loud in under 2 minutes, recorded.",
        "Score each answer for structure, specifics, and evidence.",
        "Redo the two weakest answers and compare the recordings.",
      ],
    },
    project: {
      title: "Structured mock interview with scored feedback",
      deliver: "recorded answers to 5 role-typical questions with a scoresheet and revised answers",
      verify: "each final answer names a concrete example and its outcome",
      artifact: "the recordings plus your scoresheet",
      outcomes: ["Rehearsed, evidence-backed answers", "A personal list of weak areas to fix"],
    },
  },
  "interview-skills": {
    practice: {
      title: "Practise STAR-format answers for three real scenarios",
      steps: [
        "Choose three experiences: a conflict, a failure, and a technical win.",
        "Write each in Situation, Task, Action, Result form.",
        "Keep each to 90 seconds when read aloud.",
        "Ask a peer which answer sounded most credible and why.",
      ],
    },
    project: {
      title: "STAR answer bank and mock assessment",
      deliver: "a written bank of eight STAR answers covering conflict, failure, teamwork, and impact",
      verify: "each answer states a measurable result",
      artifact: "the answer bank plus peer feedback notes",
      outcomes: ["Ready answers for behavioural rounds", "Feedback on how you come across"],
    },
  },
  "stakeholder-communication": {
    practice: {
      title: "Explain one technical decision to a non-technical reader",
      steps: [
        "Pick a decision you made and write it for a manager with no technical background.",
        "Lead with impact, then cost, then the technical detail.",
        "Cut every term the reader would have to look up.",
        "Have someone outside your field read it and mark the unclear parts.",
      ],
    },
    project: {
      title: "Stakeholder update pack",
      deliver: "a one-page stakeholder update plus a 5-minute verbal summary of a technical decision",
      verify: "a non-technical reader can state the impact and the trade-off afterwards",
      artifact: "the written update and the recorded summary",
      outcomes: ["A reusable update format", "Practice at translating technical work into impact"],
    },
  },
  "presentation-skills": {
    practice: {
      title: "Deliver a 5-minute technical presentation",
      steps: [
        "Choose a topic you know well and write the one sentence you want remembered.",
        "Build at most five slides that all support that sentence.",
        "Present it to one person and ask what they took away.",
        "Cut whatever did not survive the question.",
      ],
    },
    project: {
      title: "Recorded technical presentation",
      deliver: "a recorded 5-minute presentation with a stated takeaway and supporting visuals",
      verify: "your audience can restate your main point without prompting",
      artifact: "the slides plus the recording",
      outcomes: ["A rehearsed presentation you can reuse", "Evidence you can hold an audience's attention"],
    },
  },
  "core-revision": {
    practice: {
      title: "Audit your own fundamentals and target the gaps",
      steps: [
        "List the core topics in this roadmap and mark each as solid, shaky, or unknown.",
        "Write one question you could not answer for every shaky or unknown topic.",
        "Answer them from the roadmap resources and re-mark the list.",
      ],
    },
    project: {
      title: "Revision plan built from a self-audit",
      deliver: "a self-audit of every core topic plus a dated revision plan for the weak areas",
      verify: "each weak topic has a resource and a completion date",
      artifact: "the audit table and the revision plan",
      outcomes: ["A prioritised revision list", "Evidence of what you actually know"],
    },
  },
};

const normLabel = (s) => String(s ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/**
 * Assemble a career-readiness node's practice + project.
 * The deliverable is always a document, artefact, or recording — never a
 * fabricated software project (this is what the roadmap topic actually
 * produces in practice).
 */
function buildCareerTasks(spec, topic, careerTitle = "") {
  const context = careerTitle ? ` for ${careerTitle}` : "";
  const practice = {
    title: spec.practice.title,
    platform: "Guided task",
    task: true,
    steps: spec.practice.steps,
    difficulty: "Beginner",
    estimatedTime: "45-90 min",
    skills: [topic],
    description: `A self-contained ${topic.toLowerCase()} exercise${context}. Finish it by checking that ${spec.project.verify}.`,
  };
  const project = {
    title: spec.project.title,
    description: `For ${topic}${context}, produce ${spec.project.deliver}. Then check that ${spec.project.verify}.`,
    goal: `Complete ${topic}${context} by producing ${spec.project.deliver} and verifying that ${spec.project.verify}.`,
    skills: [topic, careerTitle].filter(Boolean),
    duration: "2-4 hours",
    difficulty: "Beginner",
    requirements: [
      `Produce ${spec.project.deliver} — a real artefact, not a description of one.`,
      `Verify it by checking that ${spec.project.verify}.`,
    ],
    outcomes: spec.project.outcomes,
    extensions: [`Repeat it for a second target role or company and compare the two results.`],
    generated: true,
  };
  return { practice, project };
}
const LEARNABLE = new Set(["topic", "concept", "advanced", "subsection", "project"]);

/** Deterministic index from a string, so a node always gets the same task. */
function stableIndex(seed, n) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h % n;
}

/**
 * Build the node's own practice task and mini-project.
 * Returns {} for structural/meta nodes so nothing attaches to containers.
 */
export function buildNodeTasks({ label, type, careerTitle = "", careerSlug = "" }) {
  const topic = String(label ?? "").trim();
  if (!topic || !LEARNABLE.has(String(type))) return {};
  if (META_LABEL.test(topic)) return {};

  // Career-readiness nodes get a career-practical deliverable; skipping them
  // left them with no practice and no project at all.
  const career = CAREER_TASKS[normLabel(topic)];
  if (career) return buildCareerTasks(career, topic, careerTitle);

  const field = fieldFor(careerSlug, careerTitle);
  const mode = MODE_BY_FIELD[field] ?? "study";
  const v = VOCAB[field] ?? VOCAB.generic;
  const archetypes = MODE_TASKS[mode] ?? MODE_TASKS.study;
  const seed = `${careerSlug}|${topic}`;
  // In the engineering modes the process archetype (index 0) only fits topics
  // that describe a process; design/quantity topics use the remaining ones.
  const isProcessTopic = PROCESS_TOPIC_RE.test(topic);
  const index =
    mode === "compute"
      ? isProcessTopic
        ? 0
        : 1 + stableIndex(seed, Math.max(1, archetypes.length - 1))
      : stableIndex(seed, archetypes.length);
  const task = archetypes[index](topic, v);
  const context = careerTitle ? ` for ${careerTitle}` : "";

  // A process topic's deliverable is the process documentation, not a design
  // calculation sheet — otherwise the mini-project contradicts its own task.
  const vProject =
    mode === "compute" && isProcessTopic
      ? {
          ...v,
          deliver: "a documented process plan with parameters, tolerances, and inspection criteria",
          verify: "the plan holds up against the applicable standard or a supervisor's review",
          artifact: "the process plan plus a worked job example",
        }
      : v;

  const practice = {
    title: task.title,
    platform: "Guided task",
    task: true,
    steps: task.steps,
    difficulty: type === "advanced" ? "Advanced" : "Intermediate",
    estimatedTime: type === "advanced" ? "90-150 min" : "45-90 min",
    skills: [topic],
    description: `A self-contained exercise on ${topic}${context}. Finish it by checking that ${v.verify}.`,
  };

  const project = {
    title: `Mini-project: apply ${topic}`,
    description: `Apply ${topic}${context} and produce ${vProject.deliver}. Then check that ${vProject.verify}.`,
    goal: `Demonstrate working command of ${topic} by producing ${vProject.deliver} and verifying that ${vProject.verify}.`,
    skills: [topic, careerTitle].filter(Boolean),
    duration: type === "advanced" ? "8-12 hours" : "4-6 hours",
    difficulty: type === "advanced" ? "Advanced" : "Intermediate",
    requirements: [
      `${vProject.deliver[0].toUpperCase()}${vProject.deliver.slice(1)} that genuinely applies ${topic}${context}.`,
      `Record the inputs, assumptions, and exact steps you followed.`,
      `State the evidence that it works: ${vProject.verify}.`,
    ],
    outcomes: [
      `Working ${vProject.artifact}.`,
      `A short written explanation of ${topic} you could defend in a review or interview.`,
    ],
    extensions: [
      `Re-do it under one changed constraint (scale, tolerance, budget, or dataset) and compare the outcome.`,
    ],
    generated: true,
  };

  return { practice, project };
}

/** Exposed for tests/audits: the field a roadmap is classified into. */
export function fieldForRoadmap(slug, title) {
  return fieldFor(slug, title);
}
