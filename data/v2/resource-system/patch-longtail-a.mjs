// Applies round-1 probe fixes to longtail-resources-a.mjs.
// Each patch matches the line containing BOTH the old URL and (optionally) the
// old title, and rewrites the whole entry line. Type/qualityScore are kept,
// `verified` is set true only for URLs already probed OK in round 1.
import { readFileSync, writeFileSync } from "node:fs";

const FILE = "data/v2/resource-system/longtail-resources-a.mjs";
const PROBED = "data/v2/resource-system/longtail-a-urls.probed.json";

const okUrls = new Set(
  JSON.parse(readFileSync(PROBED, "utf8"))
    .filter((r) => r.state === "OK" || r.state === "REDIRECT")
    .flatMap((r) => [r.url, r.finalUrl])
    .filter(Boolean)
);

// oldUrl, oldTitle (optional disambiguator), newUrl, newTitle
const PATCHES = [
  // business-analyst
  { u: "https://en.wikipedia.org/wiki/A_Guide_to_the_Business_Analysis_Body_of_Knowledge", t: "A Guide to the Business Analysis Body of Knowledge (BABOK)", nu: "https://en.wikipedia.org/wiki/Business_analysis", nt: "Business analysis — Wikipedia" },
  { u: "https://www.iiba.org/business-analysis-bodies-of-knowledge/babok/", nu: "https://en.wikipedia.org/wiki/Requirements_analysis", nt: "Requirements analysis — Wikipedia" },
  { u: "https://www.geeksforgeeks.org/gap-analysis/", t: "Gap Analysis — GeeksforGeeks", nu: "https://www.investopedia.com/terms/g/gap-analysis.asp", nt: "Gap Analysis Definition — Investopedia", all: true },
  { u: "https://seeing-theory.brown.edu/", nu: "https://seeing-theory.brown.edu/basic-probability/index.html", nt: "Seeing Theory — Basic Probability" },
  { u: "https://hbr.org/2017/08/a-leaders-guide-to-creating-a-kpi-system", nu: "https://www.kpi.org/KPI-basics", nt: "What is a KPI? — KPI.org", all: true },
  { u: "https://www.geeksforgeeks.org/software-engineering-classic-user-interview/", nu: "https://www.geeksforgeeks.org/software-engineering-requirements-engineering-process/", nt: "Requirements Engineering Process — GeeksforGeeks" },
  { u: "https://www.atlassian.com/agile/scrum/user-stories", nu: "https://www.mountaingoatsoftware.com/agile/user-stories", nt: "User Stories — Mountain Goat Software" },
  { u: "https://www.toptal.com/agile/acceptance-criteria", nu: "https://www.agilealliance.org/glossary/user-stories/", nt: "User Stories — Agile Alliance Glossary" },
  { u: "https://www.geeksforgeeks.org/requirements-artifacts/", nu: "https://www.perforce.com/blog/alm/what-requirements-traceability-matrix-rtm", nt: "Requirements Traceability Matrix (RTM) — Perforce" },
  { u: "https://www.presentation-preceptor.com/", nu: "https://www.skillsyouneed.com/presentation-skills.html", nt: "Presentation Skills — SkillsYouNeed" },
  { u: "https://www.geeksforgeeks.org/dbms-data-models/", nu: "https://www.visual-paradigm.com/guide/data-modeling/what-is-data-modeling/", nt: "What is Data Modeling? — Visual Paradigm" },
  { u: "https://support.microsoft.com/en-us/office/create-a-dashboard-in-excel-1a1b2f4e-1f4c-4a5b-9f2a-3a5b7c8d9e0f", nu: "https://learn.microsoft.com/en-us/power-bi/create-reports/service-dashboards", nt: "Dashboards in the Power BI service — Microsoft Learn" },
  // data-scientist
  { u: "https://www.people.vcu.edu/~rhammack/BookOfProof/", nu: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/", nt: "Mathematics for Computer Science — MIT OCW" },
  { u: "https://online.stat.psu.edu/stat415/lesson/16", nu: "https://www.itl.nist.gov/div898/handbook/ppc/section2/ppc221.htm", nt: "One-Way ANOVA — NIST Engineering Statistics Handbook" },
  { u: "https://online.stat.psu.edu/stat502/lesson/4", nu: "https://www.itl.nist.gov/div898/handbook/ppc/section2/ppc223.htm", nt: "Two-Way ANOVA — NIST Engineering Statistics Handbook" },
  { u: "https://www.bradyneal.com/Introduction_to_Causal_Inference-Dec17_2020-Step.pdf", nu: "https://mixtape.scunning.com/", nt: "Causal Inference: The Mixtape (free book)" },
  { u: "https://cloud.google.com/architecture/data-science?hl=en", nu: "https://en.wikipedia.org/wiki/Problem_solving", nt: "Problem solving — Wikipedia" },
  { u: "https://en.wikipedia.org/wiki/Problem_shaping", nu: "https://en.wikipedia.org/wiki/Wicked_problem", nt: "Wicked problem — Wikipedia" },
  { u: "https://www.mindtheproduct.com/what-is-product-thinking/", nu: "https://en.wikipedia.org/wiki/Product_management", nt: "Product management — Wikipedia" },
  { u: "https://scikit-learn.org/stable/tutorial/basic/tutorial.html", nu: "https://scikit-learn.org/stable/getting_started.html", nt: "Getting Started — scikit-learn" },
  { u: "https://www.kaggle.com/learn/intro-to-machine-learning", nu: "https://scikit-learn.org/stable/tutorial/machine_learning_map/index.html", nt: "Choosing the right estimator — scikit-learn" },
  { u: "https://course.fast.ai/", t: "fast.ai — Practical Deep Learning", nu: "https://course.fast.ai/Lessons/lesson1.html", nt: "Practical Deep Learning — Lesson 1 (fast.ai)" },
  { u: "https://www.deeplearningbook.org/", nu: "https://cs231n.github.io/neural-networks-1/", nt: "Neural Networks — CS231n (Stanford)" },
  // data-analyst
  { u: "https://support.microsoft.com/en-us/office/create-a-pivottable-to-analyze-worksheet-data-a9a84538-bfe9-4a1a-8d0a-9a5d6b4d5b3a", nu: "https://www.excel-easy.com/data-analysis/pivot-tables.html", nt: "Pivot Tables — Excel Easy" },
  { u: "https://support.microsoft.com/en-us/office/vlookup-function-0bbc8083-26fe-4963-8ab8-93a18ad188f7", nu: "https://www.excel-easy.com/examples/vlookup.html", nt: "VLOOKUP — Excel Easy" },
  { u: "https://support.microsoft.com/en-us/office/video-use-conditional-formatting-0c0f0f1e-0f0d-4b4f-9c8b-8a1b2c3d4e5f", nu: "https://exceljet.net/articles/conditional-formatting-formulas", nt: "Conditional Formatting Formulas — ExcelJet" },
  { u: "https://support.microsoft.com/en-us/office/create-a-chart-from-start-to-finish-0baf399e-c61a-434a-9e22-4b509a65d146", nu: "https://www.excel-easy.com/data-analysis/charts.html", nt: "Charts — Excel Easy" },
  { u: "https://support.microsoft.com/en-us/office/create-or-delete-a-macro-3d0c6f4a-5f5f-4f5b-a5a3-3b3f4f5b6c7d", nu: "https://www.excel-easy.com/vba.html", nt: "VBA & Macros — Excel Easy" },
  { u: "https://support.microsoft.com/en-us/office/automate-tasks-with-the-macro-recorder-974efdc2-97e4-4ba7-9eee-fe5a7792b9ea", nu: "https://www.automateexcel.com/vba/create-a-macro/", nt: "How to Create a Macro — Automate Excel" },
  { u: "https://towardsdatascience.com/how-to-frame-data-questions-for-stakeholders-5b6b6b6b6b6b", nu: "https://blog.hubspot.com/sales/discovery-call-questions", nt: "Discovery call questions — HubSpot" },
  { u: "https://www.investopedia.com/terms/r/returnoninvestment.asp", nu: "https://corporatefinanceinstitute.com/resources/valuation/return-on-investment/", nt: "Return on Investment (ROI) — Corporate Finance Institute" },
  { u: "https://www.geeksforgeeks.org/ab-testing-in-data-science/", nu: "https://www.optimizely.com/optimization-glossary/ab-testing/", nt: "A/B Testing — Optimizely Glossary" },
  { u: "https://academy.datawrapper.de/article/280-data-visualization-checklist", nu: "https://www.storytellingwithdata.com/blog", nt: "Storytelling with Data — blog" },
  { u: "https://learn.microsoft.com/en-us/training/paths/create-dashboards-power-bi/", nu: "https://learn.microsoft.com/en-us/power-bi/create-reports/service-dashboards", nt: "Dashboards in the Power BI service — Microsoft Learn" },
  { u: "https://blog.analytics-toolkit.com/2020/how-to-report-ab-test-results/", nu: "https://www.evanmiller.org/ab-testing/", nt: "A/B Testing Calculator — Evan Miller" },
  { u: "https://www.geeksforgeeks.org/data-analyst-interview-questions/", nu: "https://www.interviewquery.com/learning-paths", nt: "Interview Query — learning paths" },
  { u: "https://www.kaggle.com/learn", nu: "https://www.w3schools.com/sql/", nt: "SQL Tutorial — W3Schools" },
  { u: "https://sqlzoo.net/", nu: "https://mode.com/sql-tutorial/", nt: "SQL Tutorial — Mode Analytics" },
  { u: "https://www.pramp.com/", nu: "https://www.geeksforgeeks.org/sql-interview-questions/", nt: "SQL Interview Questions — GeeksforGeeks" },
  { u: "https://www.interviewquery.com/learning-paths", t: "Interviewing at data roles — Interview Query", nu: "https://www.indeed.com/career-advice/interviewing/business-analyst-interview-questions", nt: "Business Analyst Interview Questions — Indeed" },
  // solutions-engineer
  { u: "https://www.atlassian.com/blog/productivity/software-demo", nu: "https://en.wikipedia.org/wiki/Product_demonstration", nt: "Product demonstration — Wikipedia" },
  { u: "https://www.demoengineering.com/", nu: "https://www.pipedrive.com/en/blog/sales-demo", nt: "How to give a great sales demo — Pipedrive" },
  { u: "https://www.pipedrive.com/en/blog/objection-handling", nu: "https://blog.hubspot.com/sales/handling-common-sales-objections", nt: "How to Handle Common Sales Objections — HubSpot" },
  { u: "https://en.wikipedia.org/wiki/Objection_(sales)", nu: "https://www.saleshacker.com/overcoming-sales-objections/", nt: "Overcoming Sales Objections — Sales Hacker" },
  { u: "https://blog.postman.com/integration-patterns/", nu: "https://learning.postman.com/docs/integrations/integrations-intro/", nt: "Postman Integrations — documentation" },
  { u: "https://www.intercom.com/blog/product-demos/", nu: "https://en.wikipedia.org/wiki/Product_demonstration", nt: "Product demonstration — Wikipedia" },
  { u: "https://www.techstars.com/blog/demo-day", nu: "https://www.toastmasters.org/resources/public-speaking-tips", nt: "Public Speaking Tips — Toastmasters" },
  { u: "https://www.tryexponent.com/blog/system-design-interview", nu: "https://github.com/donnemartin/system-design-primer", nt: "System Design Primer — GitHub" },
  { u: "https://professional.dce.harvard.edu/blog/executive-presentation-skills/", nu: "https://hbr.org/topic/subject/communication", nt: "Communication — HBR" },
  { u: "https://hbr.org/2019/03/how-to-handle-questions-you-cant-answer", nu: "https://hbr.org/topic/subject/communication", nt: "Communication — HBR" },
  { u: "https://en.wikipedia.org/wiki/Product_knowledge", nu: "https://www.writethedocs.org/guide/writing/docs-principles/", nt: "Docs principles — Write the Docs" },
  { u: "https://www.intercom.com/blog/using-jobs-to-be-done-theory/", nu: "https://jtbd.info/", nt: "Jobs To Be Done — jtbd.info" },
  { u: "https://www.investopedia.com/terms/p/pricing-strategy.asp", nu: "https://en.wikipedia.org/wiki/Pricing_strategies", nt: "Pricing strategies — Wikipedia" },
  { u: "https://en.wikipedia.org/wiki/Product_roadmap", nu: "https://en.wikipedia.org/wiki/Roadmap", nt: "Roadmap — Wikipedia" },
  { u: "https://blog.hubspot.com/sales/discovery-call", nu: "https://blog.hubspot.com/sales/discovery-call-questions", nt: "Discovery call questions — HubSpot" },
  { u: "https://en.wikipedia.org/wiki/SPIN_Selling", nu: "https://en.wikipedia.org/wiki/Solution_selling", nt: "Solution selling — Wikipedia" },
  { u: "https://miro.com/guide/stakeholder-mapping/", nu: "https://www.atlassian.com/team-playbook/plays", nt: "Team Playbook — Atlassian" },
  { u: "https://churnzero.com/blog/customer-onboarding-handoff/", nu: "https://en.wikipedia.org/wiki/Customer_success", nt: "Customer success — Wikipedia" },
  { u: "https://userpilot.com/blog/product-demo/", t: "How to structure a product demo — Userpilot", nu: "https://en.wikipedia.org/wiki/Product_demonstration", nt: "Product demonstration — Wikipedia" },
  { u: "https://userpilot.com/blog/product-demo/", t: "Product demo structure — Userpilot", nu: "https://www.toastmasters.org/resources/public-speaking-tips", nt: "Public Speaking Tips — Toastmasters" },
  { u: "https://www.saleshacker.com/product-demo-script/", nu: "https://www.toastmasters.org/resources/public-speaking-tips", nt: "Public Speaking Tips — Toastmasters" },
  { u: "https://www.saleshacker.com/customer-poc-success/", t: "Customer POC playbook — Sales Hacker", nu: "https://en.wikipedia.org/wiki/Feasibility_study", nt: "Feasibility study — Wikipedia" },
  { u: "https://www.saleshacker.com/customer-poc-success/", t: "POC success criteria — Sales Hacker", nu: "https://en.wikipedia.org/wiki/Feasibility_study", nt: "Feasibility study — Wikipedia" },
  { u: "https://www.pipedrive.com/en/blog/sales-role-play", nu: "https://en.wikipedia.org/wiki/Sales_process", nt: "Sales process — Wikipedia" },
  // rpa-developer
  { u: "https://www.uipath.com/blog/industry-solutions/rpa-process-selection", t: "RPA candidate process selection — UiPath blog", nu: "https://www.uipath.com/rpa/robotic-process-automation", nt: "What is RPA? — UiPath" },
  { u: "https://www.uipath.com/blog/industry-solutions/rpa-process-selection", t: "RPA process selection criteria — UiPath blog", nu: "https://www.uipath.com/rpa/robotic-process-automation", nt: "What is RPA? — UiPath" },
  { u: "https://www.blueprism.com/resources/identifying-rpa-opportunities/", nu: "https://en.wikipedia.org/wiki/Robotic_process_automation", nt: "Robotic process automation — Wikipedia" },
  { u: "https://www.uipath.com/blog/ai/rpa-vs-apis", nu: "https://www.uipath.com/rpa/robotic-process-automation", nt: "What is RPA? — UiPath" },
  { u: "https://docs.uipath.com/studio/standalone/2023.4/user-guide/uiexplorer", nu: "https://docs.uipath.com/studio/standalone/2023.4/user-guide/robotic-enterprise-framework", nt: "Robotic Enterprise Framework — UiPath docs" },
  { u: "https://docs.uipath.com/studio/standalone/2023.4/quickstart/", nu: "https://docs.uipath.com/studio/standalone/2023.4/user-guide/about-studio", nt: "About Studio — UiPath docs" },
  { u: "https://www.uipath.com/resources/automation-whitepapers/center-of-excellence", nu: "https://en.wikipedia.org/wiki/Center_of_excellence", nt: "Center of excellence — Wikipedia" },
  { u: "https://www.blueprism.com/resources/center-of-excellence/", nu: "https://www.geeksforgeeks.org/rpa-life-cycle/", nt: "RPA Life Cycle — GeeksforGeeks" },
  { u: "https://www.uipath.com/blog/rpa/citizen-developers", nu: "https://en.wikipedia.org/wiki/Citizen_development", nt: "Citizen development — Wikipedia" },
  { u: "https://en.wikipedia.org/wiki/Citizen_developer", nu: "https://www.gartner.com/en/information-technology/glossary/citizen-developer", nt: "Citizen Developer — Gartner Glossary" },
  { u: "https://www.uipath.com/resources/automation-whitepapers/rpa-roi", t: "RPA ROI — UiPath calculator & guide", nu: "https://en.wikipedia.org/wiki/Return_on_investment", nt: "Return on investment — Wikipedia" },
  { u: "https://www.uipath.com/resources/automation-whitepapers/rpa-roi", t: "RPA ROI measurement — UiPath guide", nu: "https://en.wikipedia.org/wiki/Return_on_investment", nt: "Return on investment — Wikipedia" },
  { u: "https://www2.deloitte.com/us/en/insights/focus/signals-for-strategists/robotic-process-automation-roi.html", t: "Measuring RPA ROI — Deloitte insights", nu: "https://docs.uipath.com/orchestrator/standalone/2023.4/user-guide/monitoring", nt: "Monitoring robots — UiPath Orchestrator docs" },
  { u: "https://www2.deloitte.com/us/en/insights/focus/signals-for-strategists/robotic-process-automation-roi.html", t: "RPA business case — Deloitte", nu: "https://www.geeksforgeeks.org/rpa-life-cycle/", nt: "RPA Life Cycle — GeeksforGeeks" },
  { u: "https://www.uipath.com/product/ai", nu: "https://docs.uipath.com/document-understanding/standalone/2023.4/user-guide/introduction", nt: "Document Understanding — UiPath docs" },
  { u: "https://www.uipath.com/solutions/accounting-finance/invoice-processing", nu: "https://docs.uipath.com/activities/other/latest/user-guide/excel-activities", nt: "Excel automation — UiPath activities" },
  { u: "https://www.blueprism.com/resources/data-migration/", nu: "https://docs.uipath.com/activities/other/latest/user-guide/file-activities", nt: "File automation — UiPath activities" },
  { u: "https://www.uipath.com/solutions/customer-service", nu: "https://docs.uipath.com/activities/other/latest/user-guide/mail-activities", nt: "Mail automation — UiPath activities" },
  { u: "https://www.automationanywhere.com/rpa/customer-onboarding", nu: "https://www.ibm.com/topics/intelligent-automation", nt: "Intelligent automation — IBM" },
  { u: "https://www.uipath.com/blog/rpa/automated-reporting", nu: "https://docs.uipath.com/activities/other/latest/user-guide/mail-activities", nt: "Mail automation — UiPath activities" },
  { u: "https://www.geeksforgeeks.org/rpa-interview-questions/", nu: "https://www.geeksforgeeks.org/rpa-life-cycle/", nt: "RPA Life Cycle — GeeksforGeeks" },
  // developer-advocate
  { u: "https://www.slashdata.co/developer-economics/", nu: "https://draft.dev/learn/", nt: "draft.dev — DevRel learning guides" },
  { u: "https://hoopy.io/insights", nu: "https://en.wikipedia.org/wiki/OKR", nt: "Objectives and key results — Wikipedia" },
  { u: "https://draft.dev/learn/devrel", nu: "https://en.wikipedia.org/wiki/Developer_relations", nt: "Developer relations — Wikipedia" },
  { u: "https://en.wikipedia.org/wiki/Developer_marketing", nu: "https://hoopy.io/", nt: "Developer Relations — Hoopy" },
  { u: "https://www.freecodecamp.org/news/tag/personal-branding/", nu: "https://blog.hootsuite.com/how-to-create-a-social-media-marketing-plan/", nt: "Social media marketing plan — Hootsuite" },
  { u: "https://trainingindustry.com/wiki/content-development/facilitation/", nu: "https://designsprintkit.withgoogle.com/", nt: "Design Sprint Kit — Google" },
  { u: "https://transistor.fm/podcast-guest/", nu: "https://en.wikipedia.org/wiki/Podcast", nt: "Podcast — Wikipedia" },
  { u: "https://www.co-host.ai/podcast-guesting", nu: "https://www.thepodcasthost.com/planning/how-to-be-a-guest-on-a-podcast/", nt: "How to Be a Great Podcast Guest — The Podcast Host" },
  { u: "https://draft.dev/learn/demo", t: "Building product demos — DevRel draft.dev", nu: "https://en.wikipedia.org/wiki/Product_demonstration", nt: "Product demonstration — Wikipedia" },
  { u: "https://draft.dev/learn/demo", t: "Building dev-rel demos — draft.dev", nu: "https://en.wikipedia.org/wiki/Feasibility_study", nt: "Feasibility study — Wikipedia" },
  { u: "https://www.productplan.com/glossary/product-feedback/", nu: "https://www.uservoice.com/blog", nt: "Product Management Blog — UserVoice" },
  { u: "https://www.atlassian.com/agile/product-management/feature-requests", nu: "https://en.wikipedia.org/wiki/Feedback", nt: "Feedback — Wikipedia" },
  { u: "https://us.pycon.org/2024/speaking/", nu: "https://www.speaking.io/", nt: "Speaking.io — public speaking for tech talks" },
  { u: "https://devrelcollective.com/", t: "Running community events — DevRel Collective", nu: "https://en.wikipedia.org/wiki/Hackathon", nt: "Hackathon — Wikipedia" },
  { u: "https://devrelcollective.com/", t: "Community building — DevRel Collective", nu: "https://en.wikipedia.org/wiki/Community_of_practice", nt: "Community of practice — Wikipedia" },
  { u: "https://dx.doi.org/", nu: "https://getdx.com/what-is-developer-experience/", nt: "What is Developer Experience? — DX" },
  // ios-developer
  { u: "https://developer.apple.com/tutorials/swiftui/creating-widgets-with-widgetkit-and-swiftui", nu: "https://developer.apple.com/documentation/widgetkit/making-a-configurable-widget", nt: "Making a configurable widget — Apple Developer" },
  // community roots
  { u: "https://meta.discourse.org/", t: "Discourse — community platform docs", nu: "https://www.contributor-covenant.org/version/2/1/code_of_conduct/", nt: "Contributor Covenant — Code of Conduct" },
  { u: "https://meta.discourse.org/", t: "Handling difficult community situations — Discourse docs", nu: "https://www.contributor-covenant.org/version/2/1/code_of_conduct/", nt: "Contributor Covenant — Code of Conduct" },
];

const TITLE_FIXES = [
  ["Elements of Information Theory? — Stanford EE376A course", "Information Theory — Stanford EE376A course"],
  ["Software requirements specification (SRS) — Krasimir? GeeksforGeeks format guide", "Software Requirement Specification (SRS) Format — GeeksforGeeks"],
  ["Live coding best practices — The Live-Coding? twitch dev", "Twitch Developers — documentation"],
  ["The Staff Engineer's Path (O'Reilly? book excerpts)", "The Staff Engineer's Path — staffeng.com"],
  ["Community management — Community Building Garden? — Community building Wikipedia", "Community building — Wikipedia"],
];

let text = readFileSync(FILE, "utf8");
const lines = text.split("\n");
let applied = 0;
const misses = [];

for (const p of PATCHES) {
  let hit = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.includes(p.u)) continue;
    if (p.t && !line.includes(p.t)) continue;
    if (hit > 0 && !p.all) break;
    const type = (line.match(/type: "([^"]+)"/) || [])[1] ?? "article";
    const q = (line.match(/qualityScore: (\d+)/) || [])[1] ?? "4";
    const verified = okUrls.has(p.nu) ? "true" : "false";
    lines[i] = `    { title: "${p.nt}", url: "${p.nu}", type: "${type}", qualityScore: ${q}, verified: ${verified} },`;
    hit++;
    applied++;
  }
  if (hit === 0) misses.push(p.u + (p.t ? ` :: ${p.t}` : ""));
}

for (const [oldT, newT] of TITLE_FIXES) {
  if (text.includes(oldT)) { text = text.split(oldT).join(newT); applied++; }
  else misses.push("TITLE: " + oldT);
}

text = lines.join("\n");
writeFileSync(FILE, text);
console.log(`patches applied: ${applied}/${PATCHES.length + TITLE_FIXES.length}`);
if (misses.length) console.log("MISSES:\n" + misses.map((m) => "  " + m).join("\n"));
