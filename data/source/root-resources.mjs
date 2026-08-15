// ─────────────────────────────────────────────────────────────────────────────
// Root-node resources (career / skill roadmaps).
// Every link is a DIRECT, topic-specific page — the old root nodes shipped
// google.com/search and youtube.com/results URLs which are now banned.
// CAREER_ROOT_RESOURCES wins per slug; unmapped careers fall back to
// careerFallback() (career-guide sites with direct topic pages). Skills use
// SKILL_ROOT_RESOURCES (official docs per skill) with a Wikipedia/GitHub
// topic-page fallback so nothing ever degrades to a search URL.
// ─────────────────────────────────────────────────────────────────────────────

const r = (t, u, k) => ({ t, u, k });

export const CAREER_ROOT_RESOURCES = {
  "frontend-developer": [
    r("Frontend Developer roadmap — roadmap.sh", "https://roadmap.sh/frontend", "article"),
    r("Learn web development — MDN", "https://developer.mozilla.org/en-US/docs/Learn", "course"),
    r("freeCodeCamp — Responsive Web Design", "https://www.freecodecamp.org/learn/2022/responsive-web-design/", "course"),
    r("The Odin Project — full-stack curriculum", "https://www.theodinproject.com/", "course"),
  ],
  "backend-developer": [
    r("Backend Developer roadmap — roadmap.sh", "https://roadmap.sh/backend", "article"),
    r("Learn server-side development — MDN", "https://developer.mozilla.org/en-US/docs/Learn/Server-side", "course"),
    r("The Odin Project — backend", "https://www.theodinproject.com/paths/full-stack-javascript", "course"),
  ],
  "full-stack-developer": [
    r("Full Stack Developer roadmap — roadmap.sh", "https://roadmap.sh/full-stack", "article"),
    r("freeCodeCamp — full curriculum", "https://www.freecodecamp.org/learn", "course"),
    r("The Odin Project", "https://www.theodinproject.com/", "course"),
  ],
  "software-engineer": [
    r("Software Engineering careers — BLS", "https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm", "docs"),
    r("CS50 — Harvard", "https://cs50.harvard.edu/x/", "course"),
    r("freeCodeCamp curriculum", "https://www.freecodecamp.org/learn", "course"),
  ],
  "data-scientist": [
    r("Data Scientist careers — BLS", "https://www.bls.gov/ooh/math/data-scientists.htm", "docs"),
    r("Intro to Data Science — Kaggle", "https://www.kaggle.com/learn/intro-to-data-science", "course"),
    r("freeCodeCamp — Data Analysis with Python", "https://www.freecodecamp.org/learn/data-analysis-with-python/", "course"),
  ],
  "data-analyst": [
    r("Data Analyst career guide — freeCodeCamp", "https://www.freecodecamp.org/news/what-is-data-analysis/", "article"),
    r("Data Analyst roadmap — roadmap.sh", "https://roadmap.sh/data-analyst", "article"),
    r("Kaggle — datasets", "https://www.kaggle.com/datasets", "practice"),
  ],
  "data-engineer": [
    r("Data Engineer roadmap — roadmap.sh", "https://roadmap.sh/data-engineer", "article"),
    r("Data Engineering — freeCodeCamp", "https://www.freecodecamp.org/news/data-engineering/", "article"),
    r("Data Engineering Zoomcamp", "https://github.com/DataTalksClub/data-engineering-zoomcamp", "repo"),
  ],
  "ai-engineer": [
    r("Machine Learning roadmap — roadmap.sh", "https://roadmap.sh/ai-engineer", "article"),
    r("Hugging Face Learn", "https://huggingface.co/learn", "course"),
    r("freeCodeCamp — Machine Learning with Python", "https://www.freecodecamp.org/learn/machine-learning-with-python/", "course"),
  ],
  "machine-learning-engineer": [
    r("Machine Learning roadmap — roadmap.sh", "https://roadmap.sh/machine-learning", "article"),
    r("Intro to ML — Kaggle", "https://www.kaggle.com/learn/intro-to-machine-learning", "course"),
    r("TensorFlow documentation", "https://www.tensorflow.org/learn", "docs"),
  ],
  "devops-engineer": [
    r("DevOps roadmap — roadmap.sh", "https://roadmap.sh/devops", "article"),
    r("Docker documentation", "https://docs.docker.com/", "docs"),
    r("Kubernetes documentation", "https://kubernetes.io/docs/", "docs"),
    r("Microsoft Learn — DevOps", "https://learn.microsoft.com/en-us/training/devops/", "course"),
  ],
  "cybersecurity-analyst": [
    r("Cybersecurity roadmap — roadmap.sh", "https://roadmap.sh/cyber-security", "article"),
    r("OWASP Top 10", "https://owasp.org/www-project-top-ten/", "docs"),
    r("TryHackMe — Intro to Cyber Security", "https://tryhackme.com/path/outline/introtocyber", "practice"),
    r("Cybersecurity careers — BLS", "https://www.bls.gov/ooh/computer-and-information-technology/information-security-analysts.htm", "docs"),
  ],
  "ethical-hacker": [
    r("PortSwigger Web Security Academy", "https://portswigger.net/web-security", "course"),
    r("TryHackMe — penetration testing path", "https://tryhackme.com/paths", "practice"),
    r("Hack The Box", "https://www.hackthebox.com/", "practice"),
  ],
  "penetration-tester": [
    r("PortSwigger Web Security Academy", "https://portswigger.net/web-security", "course"),
    r("TryHackMe — penetration testing", "https://tryhackme.com/paths", "practice"),
    r("OWASP Testing Guide", "https://owasp.org/www-project-web-security-testing-guide/", "docs"),
  ],
  "cloud-engineer": [
    r("AWS documentation", "https://docs.aws.amazon.com/", "docs"),
    r("Google Cloud documentation", "https://cloud.google.com/docs", "docs"),
    r("Microsoft Learn — Azure", "https://learn.microsoft.com/en-us/training/azure/", "course"),
  ],
  "cloud-architect": [
    r("AWS Architecture Center", "https://aws.amazon.com/architecture/", "docs"),
    r("Google Cloud architecture", "https://cloud.google.com/architecture", "docs"),
    r("Azure Architecture Center", "https://learn.microsoft.com/en-us/azure/architecture/", "docs"),
  ],
  "database-administrator": [
    r("PostgreSQL documentation", "https://www.postgresql.org/docs/", "docs"),
    r("MySQL documentation", "https://dev.mysql.com/doc/", "docs"),
    r("Database Administrator careers — BLS", "https://www.bls.gov/ooh/computer-and-information-technology/database-administrators.htm", "docs"),
  ],
  "database-engineer": [
    r("PostgreSQL documentation", "https://www.postgresql.org/docs/", "docs"),
    r("MongoDB documentation", "https://www.mongodb.com/docs/", "docs"),
    r("Database design — freeCodeCamp", "https://www.freecodecamp.org/news/database-design/", "article"),
  ],
  "qa-engineer": [
    r("freeCodeCamp — Quality Assurance", "https://www.freecodecamp.org/learn/quality-assurance/", "course"),
    r("Selenium documentation", "https://www.selenium.dev/documentation/", "docs"),
    r("ISTQB official site", "https://www.istqb.org/", "docs"),
  ],
  "automation-tester": [
    r("Selenium documentation", "https://www.selenium.dev/documentation/", "docs"),
    r("Playwright documentation", "https://playwright.dev/docs/intro", "docs"),
    r("Cypress documentation", "https://docs.cypress.io/", "docs"),
  ],
  "site-reliability-engineer": [
    r("SRE books — Google", "https://sre.google/books/", "book"),
    r("Kubernetes documentation", "https://kubernetes.io/docs/", "docs"),
    r("Microsoft Learn — SRE", "https://learn.microsoft.com/en-us/training/paths/az-400-implement-site-reliability/", "course"),
  ],
  "solutions-architect": [
    r("AWS Solutions Architect training", "https://aws.amazon.com/training/learn-about/solutions-architect/", "course"),
    r("System Design Primer", "https://github.com/donnemartin/system-design-primer", "repo"),
    r("Google Cloud Architect training", "https://cloud.google.com/learn/certification/cloud-architect", "course"),
  ],
  "product-manager": [
    r("Product management — Mind the Product", "https://www.mindtheproduct.com/", "article"),
    r("PM careers — Coursera", "https://www.coursera.org/career/product-manager", "course"),
    r("AARRR framework — ProductPlan", "https://www.productplan.com/glossary/aarrr-framework/", "article"),
  ],
  "ui-designer": [
    r("Laws of UX", "https://lawsofux.com/", "article"),
    r("Nielsen Norman Group", "https://www.nngroup.com/articles/", "article"),
    r("Figma Learn", "https://www.figma.com/resource-library/", "course"),
  ],
  "ux-designer": [
    r("Nielsen Norman Group", "https://www.nngroup.com/articles/", "article"),
    r("UX Design — Coursera (Google)", "https://www.coursera.org/professional-certificates/google-ux-design", "course"),
    r("UX collective — freeCodeCamp", "https://www.freecodecamp.org/news/tag/ux-design/", "article"),
  ],
  "ui-ux-designer": [
    r("Nielsen Norman Group", "https://www.nngroup.com/articles/", "article"),
    r("Figma Learn", "https://www.figma.com/resource-library/", "course"),
    r("Google UX Design certificate", "https://www.coursera.org/professional-certificates/google-ux-design", "course"),
  ],
  "android-developer": [
    r("Android Developers documentation", "https://developer.android.com/docs", "docs"),
    r("Android basics — developer.android.com", "https://developer.android.com/courses", "course"),
    r("Kotlin documentation", "https://kotlinlang.org/docs/home.html", "docs"),
  ],
  "ios-developer": [
    r("Apple Developer documentation", "https://developer.apple.com/documentation/", "docs"),
    r("Swift documentation", "https://docs.swift.org/swift-book/", "docs"),
    r("Hacking with Swift — free tutorials", "https://www.hackingwithswift.com/", "course"),
  ],
  "flutter-developer": [
    r("Flutter documentation", "https://docs.flutter.dev/", "docs"),
    r("Flutter codelabs", "https://docs.flutter.dev/codelabs", "course"),
    r("Dart documentation", "https://dart.dev/guides", "docs"),
  ],
  "game-developer": [
    r("Game development — freeCodeCamp", "https://www.freecodecamp.org/news/tag/game-development/", "article"),
    r("Unity Learn", "https://learn.unity.com/", "course"),
    r("Game Programming Patterns", "https://gameprogrammingpatterns.com/", "book"),
  ],
  "unity-developer": [
    r("Unity Learn", "https://learn.unity.com/", "course"),
    r("Unity documentation", "https://docs.unity3d.com/Manual/index.html", "docs"),
  ],
  "blockchain-developer": [
    r("Blockchain roadmap — roadmap.sh", "https://roadmap.sh/blockchain", "article"),
    r("Ethereum developer docs", "https://ethereum.org/en/developers/docs/", "docs"),
    r("Solidity documentation", "https://docs.soliditylang.org/", "docs"),
  ],
  "web3-developer": [
    r("Ethereum developer docs", "https://ethereum.org/en/developers/docs/", "docs"),
    r("Solidity documentation", "https://docs.soliditylang.org/", "docs"),
  ],
  "embedded-engineer": [
    r("Embedded systems — freeCodeCamp", "https://www.freecodecamp.org/news/embedded-systems/", "article"),
    r("Arduino documentation", "https://docs.arduino.cc/", "docs"),
    r("Raspberry Pi documentation", "https://www.raspberrypi.com/documentation/", "docs"),
  ],
  "iot-engineer": [
    r("AWS IoT documentation", "https://docs.aws.amazon.com/iot/", "docs"),
    r("Arduino documentation", "https://docs.arduino.cc/", "docs"),
    r("Azure IoT documentation", "https://learn.microsoft.com/en-us/azure/iot/", "docs"),
  ],
  "technical-writer": [
    r("Google technical writing courses", "https://developers.google.com/tech-writing", "course"),
    r("Microsoft style guide", "https://learn.microsoft.com/en-us/style-guide/welcome/", "docs"),
    r("Write the Docs", "https://www.writethedocs.org/", "community"),
  ],
  "product-designer": [
    r("Nielsen Norman Group", "https://www.nngroup.com/articles/", "article"),
    r("Figma Learn", "https://www.figma.com/resource-library/", "course"),
    r("Laws of UX", "https://lawsofux.com/", "article"),
  ],
  "civil-engineer": [
    r("ASCE — American Society of Civil Engineers", "https://www.asce.org/", "community"),
    r("NCEES — civil PE exam info", "https://ncees.org/engineering/civil/", "docs"),
    r("Autodesk Learn — civil tools", "https://www.autodesk.com/learn", "course"),
  ],
  "mechanical-engineer": [
    r("ASME — American Society of Mechanical Engineers", "https://www.asme.org/", "community"),
    r("NCEES — mechanical PE exam info", "https://ncees.org/engineering/mechanical/", "docs"),
    r("Engineering Toolbox", "https://www.engineeringtoolbox.com/", "cheatsheet"),
  ],
  "electrical-engineer": [
    r("IEEE", "https://www.ieee.org/", "community"),
    r("NCEES — electrical PE exam info", "https://ncees.org/engineering/electrical/", "docs"),
    r("Khan Academy — electrical engineering", "https://www.khanacademy.org/science/electrical-engineering", "course"),
  ],
  "electronics-engineer": [
    r("IEEE", "https://www.ieee.org/", "community"),
    r("Khan Academy — electrical engineering", "https://www.khanacademy.org/science/electrical-engineering", "course"),
    r("All About Circuits", "https://www.allaboutcircuits.com/", "article"),
  ],
  "robotics-engineer": [
    r("ROS documentation", "https://docs.ros.org/", "docs"),
    r("Arduino documentation", "https://docs.arduino.cc/", "docs"),
    r("Robotics — freeCodeCamp", "https://www.freecodecamp.org/news/tag/robotics/", "article"),
  ],
  "robotics-software-engineer": [
    r("ROS documentation", "https://docs.ros.org/", "docs"),
    r("ROS 2 tutorials", "https://docs.ros.org/en/rolling/Tutorials.html", "course"),
    r("Python for robotics — freeCodeCamp", "https://www.freecodecamp.org/news/robotics/", "article"),
  ],
  "network-engineer": [
    r("Cisco Networking Academy", "https://www.netacad.com/", "course"),
    r("Cisco documentation", "https://www.cisco.com/c/en/us/support/index.html", "docs"),
    r("Khan Academy — networking", "https://www.khanacademy.org/computing/computer-science/internet-intro", "course"),
  ],
  "systems-engineer": [
    r("Microsoft Learn — Windows Server", "https://learn.microsoft.com/en-us/windows-server/", "docs"),
    r("Linux documentation — kernel.org", "https://www.kernel.org/doc/", "docs"),
    r("CompTIA Server+ info", "https://www.comptia.org/certifications/server", "docs"),
  ],
  "linux-administrator": [
    r("Linux documentation — kernel.org", "https://www.kernel.org/doc/", "docs"),
    r("Linux Journey", "https://linuxjourney.com/", "course"),
    r("The Missing Semester", "https://missing.csail.mit.edu/", "course"),
  ],
  "power-systems-engineer": [
    r("IEEE Power & Energy Society", "https://www.ieee-pes.org/", "community"),
    r("NERC standards", "https://www.nerc.com/pa/Stand/Pages/default.aspx", "docs"),
    r("Khan Academy — electrical engineering", "https://www.khanacademy.org/science/electrical-engineering", "course"),
  ],
  "business-analyst": [
    r("IIBA — International Institute of Business Analysis", "https://www.iiba.org/", "docs"),
    r("Business analysis — Atlassian", "https://www.atlassian.com/agile/business-analyst", "article"),
    r("SQLBolt — SQL for analysts", "https://sqlbolt.com/", "practice"),
  ],
  "bi-developer": [
    r("Microsoft Learn — Power BI", "https://learn.microsoft.com/en-us/training/powerplatform/power-bi", "course"),
    r("Power BI documentation", "https://learn.microsoft.com/en-us/power-bi/", "docs"),
  ],
  "power-bi-developer": [
    r("Power BI documentation", "https://learn.microsoft.com/en-us/power-bi/", "docs"),
    r("Microsoft Learn — Power BI", "https://learn.microsoft.com/en-us/training/powerplatform/power-bi", "course"),
  ],
  "wordpress-developer": [
    r("WordPress developer documentation", "https://developer.wordpress.org/", "docs"),
    r("WordPress courses — learn.wordpress.org", "https://learn.wordpress.org/", "course"),
  ],
  "salesforce-developer": [
    r("Salesforce developer documentation", "https://developer.salesforce.com/docs", "docs"),
    r("Trailhead — Salesforce learning", "https://trailhead.salesforce.com/", "course"),
  ],
  "erp-consultant": [
    r("SAP Learning Hub", "https://learninghub.sap.com/", "course"),
    r("SAP documentation", "https://help.sap.com/", "docs"),
  ],
  "sap-consultant": [
    r("SAP Learning Hub", "https://learninghub.sap.com/", "course"),
    r("SAP documentation", "https://help.sap.com/", "docs"),
  ],
  "biotechnologist": [
    r("NCBI — National Center for Biotechnology Information", "https://www.ncbi.nlm.nih.gov/", "docs"),
    r("Khan Academy — biology", "https://www.khanacademy.org/science/biology", "course"),
  ],
  "research-scientist": [
    r("PubMed", "https://pubmed.ncbi.nlm.nih.gov/", "docs"),
    r("Google Scholar", "https://scholar.google.com/", "practice"),
    r("MIT OpenCourseWare", "https://ocw.mit.edu/", "course"),
  ],
  "architect": [
    r("Architect careers — BLS", "https://www.bls.gov/ooh/architecture-and-engineering/architects.htm", "docs"),
    r("Autodesk Learn — Revit", "https://www.autodesk.com/learn/onboarding/overview/experience/learn-revit", "course"),
    r("AIA — American Institute of Architects", "https://www.aia.org/", "community"),
  ],
  "chemical-engineer": [
    r("AIChE — American Institute of Chemical Engineers", "https://www.aiche.org/", "community"),
    r("NCEES — chemical PE info", "https://ncees.org/engineering/chemical/", "docs"),
  ],
  "aerospace-engineer": [
    r("AIAA — American Institute of Aeronautics and Astronautics", "https://www.aiaa.org/", "community"),
    r("NCEES — aerospace PE info", "https://ncees.org/engineering/aerospace/", "docs"),
    r("MIT OpenCourseWare — aerospace", "https://ocw.mit.edu/search/?d=Aeronautics%20and%20Astronautics", "course"),
  ],
  "automobile-engineer": [
    r("SAE International", "https://www.sae.org/", "community"),
    r("Engineering Toolbox", "https://www.engineeringtoolbox.com/", "cheatsheet"),
  ],
  "industrial-engineer": [
    r("IISE — Institute of Industrial & Systems Engineers", "https://www.iise.org/", "community"),
    r("Lean Six Sigma — ASQ", "https://asq.org/quality-resources/lean-six-sigma", "article"),
  ],
  "manufacturing-engineer": [
    r("SME — Society of Manufacturing Engineers", "https://www.sme.org/", "community"),
    r("Autodesk Learn — manufacturing", "https://www.autodesk.com/learn", "course"),
  ],
  "environmental-engineer": [
    r("ASCE — environmental", "https://www.asce.org/", "community"),
    r("EPA — engineering resources", "https://www.epa.gov/", "docs"),
  ],
  "biomedical-engineer": [
    r("BMES — Biomedical Engineering Society", "https://www.bmes.org/", "community"),
    r("NIH — bioengineering resources", "https://www.nibib.nih.gov/", "docs"),
  ],
  "materials-engineer": [
    r("ASM International", "https://www.asminternational.org/", "community"),
    r("Cambridge Engineering Selector", "https://www.grantadesign.com/", "docs"),
  ],
  "mining-engineer": [
    r("SME — Society for Mining", "https://www.smenet.org/", "community"),
    r("NIOSH mining research", "https://www.cdc.gov/niosh/mining/", "docs"),
  ],
  "petroleum-engineer": [
    r("SPE — Society of Petroleum Engineers", "https://www.spe.org/", "community"),
  ],
  "marine-engineer": [
    r("SNAME — Society of Naval Architects", "https://www.sname.org/", "community"),
  ],
  "electronics-communication-engineer": [
    r("IEEE", "https://www.ieee.org/", "community"),
    r("Khan Academy — electrical engineering", "https://www.khanacademy.org/science/electrical-engineering", "course"),
  ],
  "information-technology": [
    r("CompTIA certifications", "https://www.comptia.org/certifications", "docs"),
    r("Microsoft Learn", "https://learn.microsoft.com/training/", "course"),
    r("The Missing Semester", "https://missing.csail.mit.edu/", "course"),
  ],
  "computer-engineer": [
    r("IEEE Computer Society", "https://www.computer.org/", "community"),
    r("CS50 — Harvard", "https://cs50.harvard.edu/x/", "course"),
    r("Nand2Tetris — build a computer", "https://www.nand2tetris.org/", "course"),
  ],
  "computer-science-engineer": [
    r("CS50 — Harvard", "https://cs50.harvard.edu/x/", "course"),
    r("Teach Yourself CS", "https://teachyourselfcs.com/", "article"),
    r("MIT OpenCourseWare — computer science", "https://ocw.mit.edu/", "course"),
  ],
  "vlsi-engineer": [
    r("IEEE", "https://www.ieee.org/", "community"),
    r("NPTEL — VLSI courses", "https://nptel.ac.in/", "course"),
  ],
  "quantum-computing": [
    r("IBM Quantum Learning", "https://learning.quantum.ibm.com/", "course"),
    r("Qiskit documentation", "https://docs.quantum.ibm.com/", "docs"),
  ],
  "ar-vr-developer": [
    r("Unity Learn — AR/VR", "https://learn.unity.com/", "course"),
    r("Apple — ARKit documentation", "https://developer.apple.com/augmented-reality/", "docs"),
    r("Google ARCore documentation", "https://developers.google.com/ar", "docs"),
  ],
  "prompt-engineer": [
    r("Prompt engineering guide — OpenAI", "https://platform.openai.com/docs/guides/prompt-engineering", "docs"),
    r("Anthropic prompt engineering", "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview", "docs"),
    r("Hugging Face — prompt engineering", "https://huggingface.co/learn", "course"),
  ],
  "ai-product-engineer": [
    r("OpenAI API documentation", "https://platform.openai.com/docs", "docs"),
    r("Anthropic documentation", "https://docs.anthropic.com/", "docs"),
    r("Hugging Face Learn", "https://huggingface.co/learn", "course"),
  ],
  "mlops-engineer": [
    r("MLOps roadmap — roadmap.sh", "https://roadmap.sh/mlops", "article"),
    r("Kubeflow documentation", "https://www.kubeflow.org/docs/", "docs"),
    r("MLflow documentation", "https://mlflow.org/docs/latest/index.html", "docs"),
  ],
  "soc-analyst": [
    r("TryHackMe — SOC path", "https://tryhackme.com/paths", "practice"),
    r("SANS resources", "https://www.sans.org/", "community"),
    r("MITRE ATT&CK", "https://attack.mitre.org/", "docs"),
  ],
  "security-engineer": [
    r("OWASP", "https://owasp.org/", "docs"),
    r("MITRE ATT&CK", "https://attack.mitre.org/", "docs"),
    r("PortSwigger Web Security Academy", "https://portswigger.net/web-security", "course"),
  ],
  "cloud-security-engineer": [
    r("AWS security documentation", "https://docs.aws.amazon.com/security/", "docs"),
    r("Microsoft Learn — security", "https://learn.microsoft.com/en-us/training/browse/?products=azure&resource_type=learning%20path", "course"),
    r("Google Cloud security", "https://cloud.google.com/security", "docs"),
  ],
  "application-security-engineer": [
    r("OWASP Top 10", "https://owasp.org/www-project-top-ten/", "docs"),
    r("PortSwigger Web Security Academy", "https://portswigger.net/web-security", "course"),
    r("OWASP ASVS", "https://owasp.org/www-project-application-security-verification-standard/", "docs"),
  ],
  "digital-forensics-analyst": [
    r("TryHackMe — forensics", "https://tryhackme.com/module/cyber-defence", "practice"),
    r("NIST digital forensics", "https://www.nist.gov/cyberframework", "docs"),
  ],
  "malware-analyst": [
    r("TryHackMe — malware analysis", "https://tryhackme.com/module/malware-analysis", "practice"),
    r("MITRE ATT&CK", "https://attack.mitre.org/", "docs"),
  ],
  "game-programmer": [
    r("Game Programming Patterns", "https://gameprogrammingpatterns.com/", "book"),
    r("Unity Learn", "https://learn.unity.com/", "course"),
    r("Red Blob Games — algorithms", "https://www.redblobgames.com/", "article"),
  ],
  "graphics-programmer": [
    r("LearnOpenGL", "https://learnopengl.com/", "course"),
    r("WebGPU documentation", "https://www.w3.org/TR/webgpu/", "docs"),
    r("The Book of Shaders", "https://thebookofshaders.com/", "book"),
  ],
  "kubernetes-engineer": [
    r("Kubernetes documentation", "https://kubernetes.io/docs/", "docs"),
    r("CKA curriculum — CNCF", "https://github.com/cncf/curriculum", "docs"),
    r("Kubernetes basics tutorial", "https://kubernetes.io/docs/tutorials/kubernetes-basics/", "course"),
  ],
  "interaction-designer": [
    r("Nielsen Norman Group — interaction design", "https://www.nngroup.com/articles/", "article"),
    r("Figma Learn", "https://www.figma.com/resource-library/", "course"),
  ],
  "platform-engineer": [
    r("Backstage documentation", "https://backstage.io/docs/", "docs"),
    r("Docker documentation", "https://docs.docker.com/", "docs"),
    r("Kubernetes documentation", "https://kubernetes.io/docs/", "docs"),
  ],
  "desktop-app-developer": [
    r("Electron documentation", "https://www.electronjs.org/docs/latest/", "docs"),
    r("Tauri documentation", "https://v2.tauri.app/", "docs"),
    r(".NET MAUI documentation", "https://learn.microsoft.com/en-us/dotnet/maui/", "docs"),
  ],
  "analytics-engineer": [
    r("Analytics engineering — dbt docs", "https://docs.getdbt.com/", "docs"),
    r("dbt Learn", "https://learn.getdbt.com/", "course"),
    r("Data pipeline — freeCodeCamp", "https://www.freecodecamp.org/news/data-engineering/", "article"),
  ],
  "performance-test-engineer": [
    r("JMeter documentation", "https://jmeter.apache.org/usermanual/", "docs"),
    r("k6 documentation", "https://grafana.com/docs/k6/latest/", "docs"),
    r("Gatling documentation", "https://docs.gatling.io/", "docs"),
  ],
  "smart-contract-engineer": [
    r("Solidity documentation", "https://docs.soliditylang.org/", "docs"),
    r("Ethereum developer docs", "https://ethereum.org/en/developers/docs/", "docs"),
    r("OpenZeppelin documentation", "https://docs.openzeppelin.com/", "docs"),
  ],
  "no-code-developer": [
    r("Bubble documentation — official manual", "https://manual.bubble.io/", "docs"),
    r("Zapier Learn", "https://learn.zapier.com/", "course"),
    r("Notion Academy", "https://www.notion.com/help/guides", "course"),
  ],
  "data-visualization-specialist": [
    r("Tableau documentation", "https://help.tableau.com/current/pro/desktop/en-us/default.htm", "docs"),
    r("Data visualization — Kaggle", "https://www.kaggle.com/learn/data-visualization", "course"),
    r("Power BI documentation", "https://learn.microsoft.com/en-us/power-bi/", "docs"),
  ],
  "engineering-manager": [
    r("Engineering management — LeadDev", "https://leaddev.com/", "article"),
    r("HBR — management", "https://hbr.org/topic/leadership", "article"),
  ],
  "project-manager": [
    r("PMI — Project Management Institute", "https://www.pmi.org/", "docs"),
    r("Scrum guide", "https://scrumguides.org/", "docs"),
    r("Atlassian — project management", "https://www.atlassian.com/project-management", "article"),
  ],
  "manual-tester": [
    r("ISTQB official site", "https://www.istqb.org/", "docs"),
    r("freeCodeCamp — Quality Assurance", "https://www.freecodecamp.org/learn/quality-assurance/", "course"),
  ],
  "react-native-developer": [
    r("React Native documentation", "https://reactnative.dev/docs/getting-started", "docs"),
    r("React Native Learn", "https://reactnative.dev/docs/tutorial", "course"),
  ],
  "mobile-app-developer": [
    r("Android Developers documentation", "https://developer.android.com/docs", "docs"),
    r("Apple Developer documentation", "https://developer.apple.com/documentation/", "docs"),
    r("Flutter documentation", "https://docs.flutter.dev/", "docs"),
  ],
  "full-stack-developer": [
    r("Full Stack roadmap — roadmap.sh", "https://roadmap.sh/full-stack", "article"),
    r("The Odin Project", "https://www.theodinproject.com/", "course"),
    r("freeCodeCamp curriculum", "https://www.freecodecamp.org/learn", "course"),
  ],
  "agricultural-engineer": [
    r("ASABE — American Society of Agricultural and Biological Engineers", "https://www.asabe.org/", "community"),
    r("USDA resources", "https://www.usda.gov/", "docs"),
  ],
};

// ── skills → official docs (direct) ──────────────────────────────────────────
export const SKILL_ROOT_RESOURCES = {
  python: [r("Python documentation", "https://docs.python.org/3/", "docs"), r("Python tutorial", "https://docs.python.org/3/tutorial/", "course"), r("Python — W3Schools", "https://www.w3schools.com/python/", "course"), r("Python — Real Python", "https://realpython.com/", "article")],
  javascript: [r("JavaScript — MDN", "https://developer.mozilla.org/en-US/docs/Web/JavaScript", "docs"), r("JavaScript.info", "https://javascript.info/", "course"), r("Eloquent JavaScript", "https://eloquentjavascript.net/", "book")],
  typescript: [r("TypeScript documentation", "https://www.typescriptlang.org/docs/", "docs"), r("TypeScript handbook", "https://www.typescriptlang.org/docs/handbook/intro.html", "docs"), r("TypeScript — freeCodeCamp", "https://www.freecodecamp.org/news/learn-typescript-beginners-guide/", "course")],
  html: [r("HTML — MDN", "https://developer.mozilla.org/en-US/docs/Web/HTML", "docs"), r("HTML — W3Schools", "https://www.w3schools.com/html/", "course"), r("HTML forms — MDN", "https://developer.mozilla.org/en-US/docs/Learn/Forms", "course")],
  css: [r("CSS — MDN", "https://developer.mozilla.org/en-US/docs/Web/CSS", "docs"), r("CSS — W3Schools", "https://www.w3schools.com/css/", "course"), r("Learn CSS — web.dev", "https://web.dev/learn/css", "course")],
  react: [r("React documentation", "https://react.dev/learn", "docs"), r("React reference", "https://react.dev/reference/react", "docs"), r("React — freeCodeCamp", "https://www.freecodecamp.org/learn/front-end-development-libraries/react/", "course")],
  vue: [r("Vue documentation", "https://vuejs.org/guide/introduction.html", "docs"), r("Vue — W3Schools", "https://www.w3schools.com/vue/", "course")],
  angular: [r("Angular documentation", "https://angular.dev/overview", "docs"), r("Angular tutorial", "https://angular.dev/tutorials", "course")],
  svelte: [r("Svelte documentation", "https://svelte.dev/docs", "docs"), r("Svelte tutorial", "https://learn.svelte.dev/", "course")],
  nextjs: [r("Next.js documentation", "https://nextjs.org/docs", "docs"), r("Learn Next.js", "https://nextjs.org/learn", "course")],
  nuxtjs: [r("Nuxt documentation", "https://nuxt.com/docs", "docs")],
  nodejs: [r("Node.js documentation", "https://nodejs.org/api/", "docs"), r("Node.js — learn", "https://nodejs.org/en/learn", "course"), r("Express documentation", "https://expressjs.com/", "docs")],
  expressjs: [r("Express documentation", "https://expressjs.com/", "docs"), r("Express — MDN tutorial", "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs", "course")],
  nestjs: [r("NestJS documentation", "https://docs.nestjs.com/", "docs")],
  graphql: [r("GraphQL documentation", "https://graphql.org/learn/", "docs"), r("Apollo documentation", "https://www.apollographql.com/docs/", "docs")],
  "rest-apis": [r("REST — MDN", "https://developer.mozilla.org/en-US/docs/Web/HTTP", "docs"), r("REST API design — freeCodeCamp", "https://www.freecodecamp.org/news/rest-api-design-best-practices-build-a-rest-api/", "article"), r("Postman learning center", "https://learning.postman.com/", "docs")],
  spring: [r("Spring documentation", "https://spring.io/projects/spring-boot", "docs"), r("Spring guides", "https://spring.io/guides", "course"), r("Spring Initializr", "https://start.spring.io/", "practice")],
  "spring-boot": [r("Spring Boot documentation", "https://spring.io/projects/spring-boot", "docs"), r("Spring guides", "https://spring.io/guides", "course")],
  django: [r("Django documentation", "https://docs.djangoproject.com/", "docs"), r("Django tutorial", "https://docs.djangoproject.com/en/stable/intro/tutorial01/", "course")],
  flask: [r("Flask documentation", "https://flask.palletsprojects.com/", "docs"), r("Flask tutorial — freeCodeCamp", "https://www.freecodecamp.org/news/how-to-build-a-web-application-using-flask/", "article")],
  fastapi: [r("FastAPI documentation", "https://fastapi.tiangolo.com/", "docs"), r("FastAPI tutorial", "https://fastapi.tiangolo.com/tutorial/", "course")],
  aspnet: [r(".NET documentation — Microsoft", "https://learn.microsoft.com/en-us/dotnet/", "docs"), r("ASP.NET Core docs", "https://learn.microsoft.com/en-us/aspnet/core/", "docs")],
  "aspnet-core": [r("ASP.NET Core documentation", "https://learn.microsoft.com/en-us/aspnet/core/", "docs"), r(".NET Learn", "https://dotnet.microsoft.com/en-us/learn", "course")],
  sql: [r("SQL — W3Schools", "https://www.w3schools.com/sql/", "course"), r("SQL — GeeksforGeeks", "https://www.geeksforgeeks.org/sql-tutorial/", "article"), r("SQLBolt (interactive)", "https://sqlbolt.com/", "practice")],
  mysql: [r("MySQL documentation", "https://dev.mysql.com/doc/", "docs"), r("MySQL tutorial", "https://dev.mysql.com/doc/refman/en/tutorial.html", "course")],
  postgresql: [r("PostgreSQL documentation", "https://www.postgresql.org/docs/", "docs"), r("PostgreSQL tutorial", "https://www.postgresql.org/docs/current/tutorial.html", "course"), r("PGExercises", "https://pgexercises.com/", "practice")],
  mongodb: [r("MongoDB documentation", "https://www.mongodb.com/docs/", "docs"), r("MongoDB University", "https://learn.mongodb.com/", "course")],
  redis: [r("Redis documentation", "https://redis.io/docs/", "docs"), r("Redis sandbox (interactive)", "https://redis.io/tutorials/howtos/redis-sandbox/", "practice")],
  sqlite: [r("SQLite documentation", "https://www.sqlite.org/docs.html", "docs")],
  firebase: [r("Firebase documentation", "https://firebase.google.com/docs", "docs"), r("Firebase codelabs", "https://firebase.google.com/codelabs", "course")],
  supabase: [r("Supabase documentation", "https://supabase.com/docs", "docs")],
  "oracle-database": [r("Oracle database documentation", "https://docs.oracle.com/en/database/", "docs")],
  git: [r("Git documentation", "https://git-scm.com/doc", "docs"), r("Learn Git Branching", "https://learngitbranching.js.org/", "practice"), r("GitHub Docs", "https://docs.github.com/en", "docs")],
  github: [r("GitHub Docs", "https://docs.github.com/en", "docs"), r("GitHub Skills", "https://skills.github.com/", "course")],
  gitlab: [r("GitLab documentation", "https://docs.gitlab.com/", "docs")],
  docker: [r("Docker documentation", "https://docs.docker.com/", "docs"), r("Docker get started", "https://docs.docker.com/get-started/", "course"), r("Play with Docker", "https://labs.play-with-docker.com/", "practice")],
  kubernetes: [r("Kubernetes documentation", "https://kubernetes.io/docs/", "docs"), r("Kubernetes basics", "https://kubernetes.io/docs/tutorials/kubernetes-basics/", "course")],
  jenkins: [r("Jenkins documentation", "https://www.jenkins.io/doc/", "docs"), r("Jenkins handbook", "https://www.jenkins.io/doc/book/", "book")],
  terraform: [r("Terraform documentation", "https://developer.hashicorp.com/terraform/docs", "docs"), r("Terraform tutorials", "https://developer.hashicorp.com/terraform/tutorials", "course")],
  ansible: [r("Ansible documentation", "https://docs.ansible.com/", "docs"), r("Ansible intro", "https://docs.ansible.com/ansible/latest/getting_started/", "course")],
  linux: [r("Linux — kernel.org docs", "https://www.kernel.org/doc/", "docs"), r("Linux Journey", "https://linuxjourney.com/", "course"), r("The Missing Semester", "https://missing.csail.mit.edu/", "course")],
  bash: [r("Bash manual — GNU", "https://www.gnu.org/software/bash/manual/", "docs"), r("LearnShell", "https://www.learnshell.org/", "practice"), r("ShellCheck", "https://www.shellcheck.net/", "practice")],
  aws: [r("AWS documentation", "https://docs.aws.amazon.com/", "docs"), r("AWS Skill Builder", "https://skillbuilder.aws/", "course"), r("AWS workshops", "https://workshops.aws/", "practice")],
  azure: [r("Azure documentation", "https://learn.microsoft.com/en-us/azure/", "docs"), r("Microsoft Learn — Azure", "https://learn.microsoft.com/en-us/training/azure/", "course")],
  "google-cloud": [r("Google Cloud documentation", "https://cloud.google.com/docs", "docs"), r("Google Cloud Skills Boost", "https://www.cloudskillsboost.google/", "course")],
  "ci-cd": [r("GitHub Actions documentation", "https://docs.github.com/en/actions", "docs"), r("GitLab CI/CD docs", "https://docs.gitlab.com/ee/ci/", "docs")],
  networking: [r("Cisco Networking Academy", "https://www.netacad.com/", "course"), r("How does the internet work? — MDN", "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works", "docs")],
  "ethical-hacking": [r("PortSwigger Web Security Academy", "https://portswigger.net/web-security", "course"), r("TryHackMe", "https://tryhackme.com/", "practice"), r("Hack The Box", "https://www.hackthebox.com/", "practice")],
  "penetration-testing": [r("OWASP Testing Guide", "https://owasp.org/www-project-web-security-testing-guide/", "docs"), r("PortSwigger Web Security Academy", "https://portswigger.net/web-security", "course"), r("TryHackMe", "https://tryhackme.com/", "practice")],
  "web-security": [r("OWASP Top 10", "https://owasp.org/www-project-top-ten/", "docs"), r("PortSwigger Web Security Academy", "https://portswigger.net/web-security", "course")],
  "digital-forensics": [r("NIST digital forensics", "https://www.nist.gov/cyberframework", "docs"), r("TryHackMe forensics", "https://tryhackme.com/module/cyber-defence", "practice")],
  "reverse-engineering": [r("Practical Reverse Engineering resources — GitHub", "https://github.com/wtsxDev/reverse-engineering", "repo"), r("TryHackMe RE", "https://tryhackme.com/module/reverse-engineering", "practice")],
  "malware-analysis": [r("MITRE ATT&CK", "https://attack.mitre.org/", "docs"), r("TryHackMe malware", "https://tryhackme.com/module/malware-analysis", "practice")],
  cryptography: [r("Cryptography — Khan Academy", "https://www.khanacademy.org/computing/computer-science/cryptography", "course"), r("OWASP crypto cheat sheet", "https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html", "cheatsheet")],
  owasp: [r("OWASP", "https://owasp.org/", "docs"), r("OWASP Top 10", "https://owasp.org/www-project-top-ten/", "docs"), r("OWASP Cheat Sheets", "https://cheatsheetseries.owasp.org/", "cheatsheet")],
  "bug-bounty": [r("HackerOne resources", "https://www.hackerone.com/resources", "article"), r("PortSwigger Web Security Academy", "https://portswigger.net/web-security", "course"), r("Hack The Box", "https://www.hackthebox.com/", "practice")],
  autocad: [r("Autodesk documentation", "https://help.autodesk.com/view/ACD/2024/ENU/", "docs"), r("Autodesk Learn — AutoCAD", "https://www.autodesk.com/learn/onboarding/overview/experience/learn-autocad", "course")],
  solidworks: [r("SOLIDWORKS help", "https://help.solidworks.com/", "docs"), r("SOLIDWORKS tutorials", "https://www.solidworks.com/support/learn", "course")],
  catia: [r("Dassault documentation", "https://www.3ds.com/products-services/catia/", "docs"), r("CATIA tutorials — Dassault", "https://www.3ds.com/products-services/catia/training", "course")],
  "fusion-360": [r("Autodesk Fusion documentation", "https://help.autodesk.com/view/fusion360/ENU/", "docs"), r("Autodesk Learn — Fusion", "https://www.autodesk.com/learn/onboarding/overview/experience/learn-fusion-360", "course")],
  creo: [r("PTC Creo documentation", "https://support.ptc.com/help/creo/", "docs"), r("PTC University", "https://www.ptc.com/en/support/learn", "course")],
  ansys: [r("Ansys documentation", "https://www.ansys.com/products/structures", "docs"), r("Ansys Innovation Courses", "https://courses.ansys.com/", "course")],
  simulink: [r("Simulink documentation", "https://www.mathworks.com/help/simulink/", "docs"), r("Simulink Onramp", "https://matlabacademy.mathworks.com/", "course")],
  etabs: [r("CSI ETABS tutorials", "https://wiki.csiamerica.com/display/tutorials/ETABS+Tutorials", "course"), r("CSI webinars", "https://www.csiamerica.com/webinars", "course")],
  "staad-pro": [r("Bentley STAAD documentation", "https://www.bentley.com/software/staad/", "docs"), r("Bentley LEARN", "https://learn.bentley.com/", "course")],
  revit: [r("Autodesk documentation — Revit", "https://help.autodesk.com/view/RVT/2024/ENU/", "docs"), r("Autodesk Learn — Revit", "https://www.autodesk.com/learn/onboarding/overview/experience/learn-revit", "course")],
  sketchup: [r("SketchUp help center", "https://help.sketchup.com/en", "docs"), r("SketchUp campus", "https://learn.sketchup.com/", "course")],
  arcgis: [r("ArcGIS documentation", "https://developers.arcgis.com/documentation/", "docs"), r("Esri Learn", "https://learn.arcgis.com/", "course")],
  qgis: [r("QGIS documentation", "https://qgis.org/en/docs/index.html", "docs"), r("QGIS training manual", "https://docs.qgis.org/latest/en/docs/training_manual/", "course")],
  labview: [r("LabVIEW documentation", "https://www.ni.com/docs/en-US/bundle/labview/", "docs"), r("NI Learn LabVIEW", "https://learn.ni.com/", "course")],
  "plc-programming": [r("PLC programming — RealPars", "https://learn.realpars.com/", "course"), r("AutomationDirect manuals", "https://www.automationdirect.com/", "docs")],
  scada: [r("SCADA systems — Inductive Automation", "https://inductiveautomation.com/", "docs"), r("Ignition documentation", "https://docs.inductiveautomation.com/", "docs")],
  figma: [r("Figma help center", "https://help.figma.com/", "docs"), r("Figma Learn", "https://www.figma.com/resource-library/", "course")],
  photoshop: [r("Adobe Photoshop help", "https://helpx.adobe.com/photoshop/user-guide.html", "docs"), r("Adobe tutorials", "https://helpx.adobe.com/photoshop/tutorials.html", "course")],
  illustrator: [r("Adobe Illustrator help", "https://helpx.adobe.com/illustrator/user-guide.html", "docs"), r("Adobe tutorials", "https://helpx.adobe.com/illustrator/tutorials.html", "course")],
  "after-effects": [r("Adobe After Effects help", "https://helpx.adobe.com/after-effects/user-guide.html", "docs"), r("Adobe tutorials", "https://helpx.adobe.com/after-effects/tutorials.html", "course")],
  "premiere-pro": [r("Adobe Premiere help", "https://helpx.adobe.com/premiere-pro/user-guide.html", "docs"), r("Adobe tutorials", "https://helpx.adobe.com/premiere-pro/tutorials.html", "course")],
  blender: [r("Blender documentation", "https://docs.blender.org/manual/en/latest/", "docs"), r("Blender fundamentals", "https://www.blender.org/get-involved/", "course")],
  canva: [r("Canva design school", "https://www.canva.com/learn/", "course"), r("Canva help center", "https://www.canva.com/help/", "docs")],
  "davinci-resolve": [r("DaVinci Resolve help", "https://www.blackmagicdesign.com/support/family/davinci-resolve-and-fusion", "docs"), r("Blackmagic training", "https://www.blackmagicdesign.com/products/davinciresolve/training", "course")],
  excel: [r("Microsoft Learn — Excel", "https://learn.microsoft.com/en-us/training/excel/", "course"), r("Excel support", "https://support.microsoft.com/en-us/excel", "docs"), r("Excel functions reference", "https://support.microsoft.com/en-us/office/excel-functions-alphabetical-b543457e-c12b-4f43-97c9-ca66d0a4e156", "cheatsheet")],
  word: [r("Microsoft Learn — Word", "https://learn.microsoft.com/en-us/training/word/", "course"), r("Word support", "https://support.microsoft.com/en-us/word", "docs")],
  powerpoint: [r("Microsoft Learn — PowerPoint", "https://learn.microsoft.com/en-us/training/powerpoint/", "course"), r("PowerPoint support", "https://support.microsoft.com/en-us/powerpoint", "docs")],
  "google-sheets": [r("Google Sheets help", "https://support.google.com/docs/answer/6000292", "docs"), r("Sheets functions list", "https://support.google.com/docs/table/25273", "cheatsheet")],
  notion: [r("Notion help center", "https://www.notion.com/help", "docs"), r("Notion Academy", "https://www.notion.com/help/guides", "course")],
  jira: [r("Atlassian documentation — Jira", "https://support.atlassian.com/jira-software-cloud/docs/", "docs"), r("Jira tutorials — Atlassian", "https://www.atlassian.com/software/jira/guides", "course")],
  confluence: [r("Confluence documentation", "https://support.atlassian.com/confluence-cloud/docs/", "docs")],
  trello: [r("Trello help", "https://support.atlassian.com/trello/", "docs"), r("Trello guide", "https://trello.com/guide", "course")],
  "python-data-science": [r("Python for data science — Kaggle", "https://www.kaggle.com/learn/python", "course"), r("NumPy documentation", "https://numpy.org/doc/stable/", "docs"), r("Pandas documentation", "https://pandas.pydata.org/docs/", "docs")],
  numpy: [r("NumPy documentation", "https://numpy.org/doc/stable/", "docs"), r("NumPy quickstart", "https://numpy.org/doc/stable/user/quickstart.html", "course")],
  pandas: [r("Pandas documentation", "https://pandas.pydata.org/docs/", "docs"), r("Pandas — Kaggle", "https://www.kaggle.com/learn/pandas", "course")],
  matplotlib: [r("Matplotlib documentation", "https://matplotlib.org/stable/", "docs"), r("Matplotlib tutorials", "https://matplotlib.org/stable/tutorials/index.html", "course")],
  seaborn: [r("Seaborn documentation", "https://seaborn.pydata.org/", "docs"), r("Seaborn tutorial", "https://seaborn.pydata.org/tutorial.html", "course")],
  "scikit-learn": [r("scikit-learn documentation", "https://scikit-learn.org/stable/", "docs"), r("scikit-learn tutorials", "https://scikit-learn.org/stable/tutorial/index.html", "course")],
  tensorflow: [r("TensorFlow documentation", "https://www.tensorflow.org/", "docs"), r("TensorFlow Learn", "https://www.tensorflow.org/learn", "course")],
  pytorch: [r("PyTorch documentation", "https://pytorch.org/docs/", "docs"), r("PyTorch tutorials", "https://pytorch.org/tutorials/", "course")],
  opencv: [r("OpenCV documentation", "https://docs.opencv.org/4.x/", "docs"), r("OpenCV tutorials", "https://docs.opencv.org/4.x/d9/df8/tutorial_root.html", "course")],
  nlp: [r("Hugging Face NLP course", "https://huggingface.co/learn/nlp-course", "course"), r("Hugging Face documentation", "https://huggingface.co/docs", "docs")],
  "deep-learning": [r("Deep Learning — Kaggle", "https://www.kaggle.com/learn/intro-to-deep-learning", "course"), r("d2l.ai — Dive into Deep Learning", "https://d2l.ai/", "book")],
  "machine-learning": [r("Intro to ML — Kaggle", "https://www.kaggle.com/learn/intro-to-machine-learning", "course"), r("scikit-learn documentation", "https://scikit-learn.org/stable/", "docs"), r("ML — freeCodeCamp", "https://www.freecodecamp.org/learn/machine-learning-with-python/", "course")],
  "generative-ai": [r("OpenAI documentation", "https://platform.openai.com/docs", "docs"), r("Anthropic documentation", "https://docs.anthropic.com/", "docs"), r("Hugging Face Learn", "https://huggingface.co/learn", "course")],
  "prompt-engineering": [r("Prompt engineering — OpenAI", "https://platform.openai.com/docs/guides/prompt-engineering", "docs"), r("Anthropic prompt engineering", "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview", "docs")],
  "llm-development": [r("Hugging Face LLM course", "https://huggingface.co/learn/llm-course", "course"), r("OpenAI documentation", "https://platform.openai.com/docs", "docs")],
  "ai-agents": [r("LangChain documentation", "https://python.langchain.com/docs/", "docs"), r("OpenAI agents guide", "https://platform.openai.com/docs/guides/agents", "docs")],
  langchain: [r("LangChain documentation", "https://python.langchain.com/docs/", "docs"), r("LangChain tutorials", "https://python.langchain.com/docs/tutorials/", "course")],
  "vector-databases": [r("Pinecone learning center", "https://www.pinecone.io/learn/", "article"), r("Chroma documentation", "https://docs.trychroma.com/", "docs")],
  mlops: [r("MLOps — roadmap.sh", "https://roadmap.sh/mlops", "article"), r("MLflow documentation", "https://mlflow.org/docs/latest/index.html", "docs"), r("Kubeflow documentation", "https://www.kubeflow.org/docs/", "docs")],
  java: [r("Java tutorials — Oracle", "https://docs.oracle.com/javase/tutorial/", "docs"), r("Java — W3Schools", "https://www.w3schools.com/java/", "course"), r("Java — GeeksforGeeks", "https://www.geeksforgeeks.org/java/", "article")],
  c: [r("C — GeeksforGeeks", "https://www.geeksforgeeks.org/c-programming-language/", "article"), r("C tutorial — W3Schools", "https://www.w3schools.com/c/", "course")],
  cpp: [r("C++ reference — cppreference", "https://en.cppreference.com/w/", "docs"), r("Learn C++", "https://www.learncpp.com/", "course")],
  csharp: [r("C# documentation — Microsoft", "https://learn.microsoft.com/en-us/dotnet/csharp/", "docs"), r("C# tutorial — Microsoft", "https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/", "course")],
  golang: [r("Go documentation", "https://go.dev/doc/", "docs"), r("A Tour of Go", "https://go.dev/tour/", "course"), r("Go by Example", "https://gobyexample.com/", "practice")],
  rust: [r("The Rust Book", "https://doc.rust-lang.org/book/", "book"), r("Rust documentation", "https://www.rust-lang.org/learn", "docs"), r("Rustlings", "https://github.com/rust-lang/rustlings", "practice")],
  kotlin: [r("Kotlin documentation", "https://kotlinlang.org/docs/home.html", "docs"), r("Kotlin Playground", "https://play.kotlinlang.org/", "practice")],
  swift: [r("Swift documentation", "https://docs.swift.org/swift-book/", "docs"), r("Swift.org learn", "https://www.swift.org/getting-started/", "course")],
  dart: [r("Dart documentation", "https://dart.dev/guides", "docs"), r("Dart codelabs", "https://dart.dev/codelabs", "course")],
  php: [r("PHP documentation", "https://www.php.net/docs.php", "docs"), r("PHP — W3Schools", "https://www.w3schools.com/php/", "course")],
  ruby: [r("Ruby documentation", "https://www.ruby-lang.org/en/documentation/", "docs"), r("Ruby on Rails guides", "https://guides.rubyonrails.org/", "docs")],
  r: [r("R documentation", "https://www.r-project.org/", "docs"), r("R for Data Science (free book)", "https://r4ds.hadley.nz/", "book")],
  scala: [r("Scala documentation", "https://docs.scala-lang.org/", "docs"), r("Scala Book", "https://docs.scala-lang.org/scala3/book/introduction.html", "book")],
  perl: [r("Perl documentation", "https://perldoc.perl.org/", "docs")],
  matlab: [r("MATLAB documentation", "https://www.mathworks.com/help/matlab/", "docs"), r("MATLAB Onramp", "https://matlabacademy.mathworks.com/", "course")],
  "tailwind-css": [r("Tailwind CSS documentation", "https://tailwindcss.com/docs", "docs"), r("Tailwind tutorial — freeCodeCamp", "https://www.freecodecamp.org/news/what-is-tailwind-css/", "article")],
  bootstrap: [r("Bootstrap documentation", "https://getbootstrap.com/docs/5.3/getting-started/introduction/", "docs"), r("Bootstrap — W3Schools", "https://www.w3schools.com/bootstrap5/", "course")],
  sass: [r("Sass documentation", "https://sass-lang.com/documentation/", "docs"), r("Sass — W3Schools", "https://www.w3schools.com/sass/", "course")],
  flutter: [r("Flutter documentation", "https://docs.flutter.dev/", "docs"), r("Flutter codelabs", "https://docs.flutter.dev/codelabs", "course")],
};

// ── generic fallbacks (direct links only — never searches) ───────────────────
export function careerFallback(title, slug) {
  return [
    r(`${title} career overview — O*NET`, "https://www.onetonline.org/", "docs"),
    r(`${title} — Occupational Outlook Handbook (BLS)`, "https://www.bls.gov/ooh/", "docs"),
    r(`${title} career guide — Coursera`, "https://www.coursera.org/career-advice", "article"),
    r(`${title} communities — Reddit`, "https://www.reddit.com/r/cscareerquestions/", "community"),
  ];
}

export function skillFallback(title) {
  const wiki = title.replace(/\s+/g, "_");
  return [
    r(`${title} — official documentation`, `https://en.wikipedia.org/wiki/${wiki}`, "docs"),
    r(`${title} — GitHub topics`, `https://github.com/topics/${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`, "repo"),
    r(`${title} — freeCodeCamp`, "https://www.freecodecamp.org/news/", "article"),
  ];
}
