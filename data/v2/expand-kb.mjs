// ─────────────────────────────────────────────────────────────────────────────
// CareerRoadmaps v2 — Knowledge Base Expander
// Expands every topic in every career with rich knowledge base entries:
//   whatIsIt, whyMatters, resources, practice, prerequisites, objectives
// Run: node data/v2/expand-kb.mjs
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CAREERS_PATH = join(__dirname, "source", "careers-v2.json");
const RESOURCES_PATH = join(__dirname, "source", "resources-v2.json");
const PRACTICE_PATH = join(__dirname, "source", "practice-v2.json");
const PROJECTS_PATH = join(__dirname, "source", "projects-v2.json");

const data = JSON.parse(readFileSync(CAREERS_PATH, "utf8"));
const careers = data.careers || data;
const sharedResources = JSON.parse(readFileSync(RESOURCES_PATH, "utf8"));
const sharedPractice = JSON.parse(readFileSync(PRACTICE_PATH, "utf8"));
const sharedProjects = JSON.parse(readFileSync(PROJECTS_PATH, "utf8"));

// ── Resource Database ────────────────────────────────────────────────────────
// Real, authoritative resources indexed by topic pattern
const RESOURCE_DB = {
  // ─── Programming ────────────────────────────────────────────────────────
  "python": [
    { title: "Python Official Documentation", url: "https://docs.python.org/3/", kind: "docs", provider: "python.org" },
    { title: "Automate the Boring Stuff with Python", url: "https://automatetheboringstuff.com/", kind: "course", provider: "Al Sweigart" },
    { title: "Real Python Tutorials", url: "https://realpython.com/", kind: "article", provider: "Real Python" },
    { title: "Python Practice Exercises", url: "https://www.practicepython.org/", kind: "practice", provider: "PracticePython" },
  ],
  "javascript": [
    { title: "MDN JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", kind: "docs", provider: "MDN" },
    { title: "JavaScript.info — The Modern JS Tutorial", url: "https://javascript.info/", kind: "article", provider: "javascript.info" },
    { title: "Eloquent JavaScript (free book)", url: "https://eloquentjavascript.net/", kind: "article", provider: "Marijn Haverbeke" },
    { title: "FreeCodeCamp JavaScript Exercises", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", kind: "practice", provider: "FreeCodeCamp" },
  ],
  "typescript": [
    { title: "TypeScript Official Handbook", url: "https://www.typescriptlang.org/docs/handbook/", kind: "docs", provider: "typescriptlang.org" },
    { title: "TypeScript Deep Dive", url: "https://basarat.gitbook.io/typescript/", kind: "article", provider: "Basarat Syed" },
    { title: "TypeScript Playground", url: "https://www.typescriptlang.org/play", kind: "practice", provider: "TypeScript Team" },
  ],
  "java": [
    { title: "Java Tutorials — Oracle", url: "https://docs.oracle.com/javase/tutorial/", kind: "docs", provider: "Oracle" },
    { title: "Baeldung Java Tutorials", url: "https://www.baeldung.com/", kind: "article", provider: "Baeldung" },
    { title: "Java Practice — HackerRank", url: "https://www.hackerrank.com/domains/java", kind: "practice", provider: "HackerRank" },
  ],
  "c": [
    { title: "C Programming — Learn-C.org", url: "https://www.learn-c.org/", kind: "practice", provider: "Learn-C.org" },
    { title: "The C Programming Language (K&R)", url: "https://en.wikipedia.org/wiki/The_C_Programming_Language", kind: "article", provider: "Kernighan & Ritchie" },
    { title: "C Documentation — cppreference", url: "https://en.cppreference.com/w/c", kind: "docs", provider: "cppreference" },
  ],
  "c++": [
    { title: "C++ Reference — cppreference", url: "https://en.cppreference.com/w/cpp", kind: "docs", provider: "cppreference" },
    { title: "Learn C++ — learncpp.com", url: "https://www.learncpp.com/", kind: "article", provider: "learncpp.com" },
    { title: "C++ Practice — Codeforces", url: "https://codeforces.com/", kind: "practice", provider: "Codeforces" },
  ],
  "rust": [
    { title: "The Rust Programming Language Book", url: "https://doc.rust-lang.org/book/", kind: "docs", provider: "Rust Team" },
    { title: "Rust by Example", url: "https://doc.rust-lang.org/rust-by-example/", kind: "article", provider: "Rust Team" },
    { title: "Rustlings Exercises", url: "https://github.com/rust-lang/rustlings", kind: "practice", provider: "Rust Team" },
  ],
  "go": [
    { title: "Go Official Documentation", url: "https://go.dev/doc/", kind: "docs", provider: "go.dev" },
    { title: "Go by Example", url: "https://gobyexample.com/", kind: "article", provider: "Go by Example" },
    { title: "A Tour of Go", url: "https://go.dev/tour/", kind: "practice", provider: "Go Team" },
  ],
  // ─── Web Development ────────────────────────────────────────────────────
  "react": [
    { title: "React Official Documentation", url: "https://react.dev/", kind: "docs", provider: "react.dev" },
    { title: "React Tutorial — Official", url: "https://react.dev/learn", kind: "course", provider: "React Team" },
    { title: "Scrimba — Learn React", url: "https://scrimba.com/learn/learnreact", kind: "course", provider: "Scrimba" },
  ],
  "angular": [
    { title: "Angular Official Documentation", url: "https://angular.dev/", kind: "docs", provider: "angular.dev" },
    { title: "Angular Tutorial", url: "https://angular.dev/tutorial", kind: "course", provider: "Angular Team" },
  ],
  "vue": [
    { title: "Vue.js Official Guide", url: "https://vuejs.org/guide/", kind: "docs", provider: "vuejs.org" },
    { title: "Vue Mastery Courses", url: "https://www.vuemastery.com/courses/", kind: "course", provider: "Vue Mastery" },
  ],
  "html": [
    { title: "MDN HTML Guide", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML", kind: "docs", provider: "MDN" },
    { title: "HTML — W3Schools", url: "https://www.w3schools.com/html/", kind: "article", provider: "W3Schools" },
  ],
  "css": [
    { title: "MDN CSS Guide", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS", kind: "docs", provider: "MDN" },
    { title: "CSS-Tricks", url: "https://css-tricks.com/", kind: "article", provider: "CSS-Tricks" },
    { title: "Flexbox Froggy", url: "https://flexboxfroggy.com/", kind: "practice", provider: "Flexbox Froggy" },
  ],
  "node": [
    { title: "Node.js Official Documentation", url: "https://nodejs.org/docs/latest/api/", kind: "docs", provider: "nodejs.org" },
    { title: "Node.js Guides", url: "https://nodejs.org/en/learn", kind: "article", provider: "Node.js" },
  ],
  "nextjs": [
    { title: "Next.js Official Documentation", url: "https://nextjs.org/docs", kind: "docs", provider: "nextjs.org" },
    { title: "Next.js Learn Course", url: "https://nextjs.org/learn", kind: "course", provider: "Vercel" },
  ],
  "django": [
    { title: "Django Official Documentation", url: "https://docs.djangoproject.com/", kind: "docs", provider: "djangoproject.com" },
    { title: "Django Tutorial — Official Polls App", url: "https://docs.djangoproject.com/en/stable/intro/tutorial01/", kind: "course", provider: "Django Team" },
  ],
  "flask": [
    { title: "Flask Official Documentation", url: "https://flask.palletsprojects.com/", kind: "docs", provider: "Pallets Projects" },
    { title: "Flask Mega-Tutorial", url: "https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world", kind: "course", provider: "Miguel Grinberg" },
  ],
  "spring": [
    { title: "Spring Boot Official Guides", url: "https://spring.io/guides", kind: "docs", provider: "spring.io" },
    { title: "Baeldung Spring Tutorials", url: "https://www.baeldung.com/spring-boot", kind: "article", provider: "Baeldung" },
  ],
  // ─── Data & Databases ───────────────────────────────────────────────────
  "sql": [
    { title: "SQL Tutorial — W3Schools", url: "https://www.w3schools.com/sql/", kind: "article", provider: "W3Schools" },
    { title: "SQLBolt Interactive Lessons", url: "https://sqlbolt.com/", kind: "practice", provider: "SQLBolt" },
    { title: "PostgreSQL Official Tutorial", url: "https://www.postgresql.org/docs/current/tutorial.html", kind: "docs", provider: "postgresql.org" },
  ],
  "postgresql": [
    { title: "PostgreSQL Official Documentation", url: "https://www.postgresql.org/docs/current/", kind: "docs", provider: "postgresql.org" },
    { title: "PostgreSQL Tutorial", url: "https://www.postgresqltutorial.com/", kind: "article", provider: "PostgreSQL Tutorial" },
  ],
  "mongodb": [
    { title: "MongoDB Official Documentation", url: "https://www.mongodb.com/docs/", kind: "docs", provider: "mongodb.com" },
    { title: "MongoDB University (free courses)", url: "https://learn.mongodb.com/", kind: "course", provider: "MongoDB" },
  ],
  "redis": [
    { title: "Redis Official Documentation", url: "https://redis.io/docs/", kind: "docs", provider: "redis.io" },
    { title: "Redis University", url: "https://university.redis.com/", kind: "course", provider: "Redis" },
  ],
  "pandas": [
    { title: "Pandas Official Documentation", url: "https://pandas.pydata.org/docs/getting_started/", kind: "docs", provider: "pandas.pydata.org" },
    { title: "10 Minutes to Pandas", url: "https://pandas.pydata.org/docs/user_guide/10min.html", kind: "article", provider: "Pandas Team" },
    { title: "Pandas Exercises — W3Resource", url: "https://w3resource.com/python/pandas/index.php", kind: "practice", provider: "W3Resource" },
  ],
  "numpy": [
    { title: "NumPy Official Documentation", url: "https://numpy.org/doc/stable/user/index.html", kind: "docs", provider: "numpy.org" },
    { title: "NumPy Tutorial — W3Schools", url: "https://www.w3schools.com/python/numpy/", kind: "article", provider: "W3Schools" },
  ],
  "power-bi": [
    { title: "Microsoft Power BI Learning", url: "https://learn.microsoft.com/en-us/training/powerplatform/power-bi", kind: "docs", provider: "Microsoft" },
    { title: "Power BI Guided Learning", url: "https://learn.microsoft.com/en-us/power-bi/guided-learning/", kind: "course", provider: "Microsoft" },
  ],
  "tableau": [
    { title: "Tableau Official Training", url: "https://www.tableau.com/learn/training", kind: "course", provider: "Tableau" },
    { title: "Tableau Public (free practice)", url: "https://public.tableau.com/", kind: "practice", provider: "Tableau" },
  ],
  // ─── AI & ML ────────────────────────────────────────────────────────────
  "machine-learning": [
    { title: "Coursera — Machine Learning by Andrew Ng", url: "https://www.coursera.org/learn/machine-learning", kind: "course", provider: "Stanford/Coursera" },
    { title: "Scikit-learn Official Documentation", url: "https://scikit-learn.org/stable/tutorial/", kind: "docs", provider: "scikit-learn" },
    { title: "Kaggle Intro to ML Course", url: "https://www.kaggle.com/learn/intro-to-machine-learning", kind: "course", provider: "Kaggle" },
  ],
  "deep-learning": [
    { title: "fast.ai Practical Deep Learning", url: "https://course.fast.ai/", kind: "course", provider: "fast.ai" },
    { title: "Deep Learning Book (Goodfellow)", url: "https://www.deeplearningbook.org/", kind: "article", provider: "Ian Goodfellow" },
    { title: "PyTorch Official Tutorials", url: "https://pytorch.org/tutorials/", kind: "docs", provider: "PyTorch" },
  ],
  "tensorflow": [
    { title: "TensorFlow Official Documentation", url: "https://www.tensorflow.org/tutorials", kind: "docs", provider: "tensorflow.org" },
    { title: "TensorFlow Lite for Mobile", url: "https://www.tensorflow.org/lite/guide", kind: "docs", provider: "Google" },
  ],
  "pytorch": [
    { title: "PyTorch Official Tutorials", url: "https://pytorch.org/tutorials/", kind: "docs", provider: "pytorch.org" },
    { title: "PyTorch Lightning Docs", url: "https://lightning.ai/docs/pytorch/stable/", kind: "docs", provider: "Lightning AI" },
  ],
  "nlp": [
    { title: "Hugging Face NLP Course", url: "https://huggingface.co/learn/nlp-course", kind: "course", provider: "Hugging Face" },
    { title: "Stanford CS224N: NLP with Deep Learning", url: "https://web.stanford.edu/class/cs224n/", kind: "course", provider: "Stanford" },
  ],
  "computer-vision": [
    { title: "OpenCV Official Tutorials", url: "https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html", kind: "docs", provider: "OpenCV" },
    { title: "CS231n: CNNs for Visual Recognition", url: "https://cs231n.stanford.edu/", kind: "course", provider: "Stanford" },
  ],
  // ─── Cloud & DevOps ─────────────────────────────────────────────────────
  "aws": [
    { title: "AWS Official Documentation", url: "https://docs.aws.amazon.com/", kind: "docs", provider: "AWS" },
    { title: "AWS Skill Builder (free courses)", url: "https://skillbuilder.aws/", kind: "course", provider: "AWS" },
    { title: "AWS Well-Architected Labs", url: "https://wellarchitectedlabs.com/", kind: "practice", provider: "AWS" },
  ],
  "docker": [
    { title: "Docker Official Documentation", url: "https://docs.docker.com/", kind: "docs", provider: "docker.com" },
    { title: "Docker Getting Started", url: "https://docs.docker.com/get-started/", kind: "course", provider: "Docker" },
    { title: "Play with Docker (free lab)", url: "https://labs.play-with-docker.com/", kind: "practice", provider: "Docker" },
  ],
  "kubernetes": [
    { title: "Kubernetes Official Documentation", url: "https://kubernetes.io/docs/home/", kind: "docs", provider: "kubernetes.io" },
    { title: "Kubernetes Tutorials", url: "https://kubernetes.io/docs/tutorials/", kind: "course", provider: "Kubernetes" },
    { title: "KillerCoda Kubernetes Labs", url: "https://killercoda.com/playgrounds/scenario/kubernetes", kind: "practice", provider: "KillerCoda" },
  ],
  "terraform": [
    { title: "Terraform Official Documentation", url: "https://developer.hashicorp.com/terraform/docs", kind: "docs", provider: "HashiCorp" },
    { title: "Terraform Tutorials", url: "https://developer.hashicorp.com/terraform/tutorials", kind: "course", provider: "HashiCorp" },
  ],
  "linux": [
    { title: "Linux Tutorial — The Linux Documentation Project", url: "https://tldp.org/LDP/intro-linux/html/", kind: "article", provider: "TLDP" },
    { title: "Linux Journey", url: "https://linuxjourney.com/", kind: "course", provider: "Linux Journey" },
    { title: "OverTheWire: Bandit (Linux wargame)", url: "https://overthewire.org/wargames/bandit/", kind: "practice", provider: "OverTheWire" },
  ],
  "git": [
    { title: "Git Official Documentation", url: "https://git-scm.com/doc", kind: "docs", provider: "git-scm.com" },
    { title: "Learn Git Branching (interactive)", url: "https://learngitbranching.js.org/", kind: "practice", provider: "Learn Git Branching" },
    { title: "Pro Git Book (free)", url: "https://git-scm.com/book/en/v2", kind: "article", provider: "Scott Chacon" },
  ],
  "ci-cd": [
    { title: "GitHub Actions Documentation", url: "https://docs.github.com/en/actions", kind: "docs", provider: "GitHub" },
    { title: "Jenkins Official Documentation", url: "https://www.jenkins.io/doc/", kind: "docs", provider: "Jenkins" },
    { title: "CircleCI Documentation", url: "https://circleci.com/docs/", kind: "docs", provider: "CircleCI" },
  ],
  "azure": [
    { title: "Azure Official Documentation", url: "https://learn.microsoft.com/en-us/azure/", kind: "docs", provider: "Microsoft" },
    { title: "Azure Fundamentals Learning Path", url: "https://learn.microsoft.com/en-us/training/paths/azure-fundamentals/", kind: "course", provider: "Microsoft" },
  ],
  "gcp": [
    { title: "Google Cloud Documentation", url: "https://cloud.google.com/docs", kind: "docs", provider: "Google Cloud" },
    { title: "Google Cloud Skills Boost", url: "https://cloudskillsboost.google/", kind: "course", provider: "Google Cloud" },
  ],
  // ─── Cybersecurity ──────────────────────────────────────────────────────
  "network-security": [
    { title: "Cisco Networking Academy", url: "https://www.netacad.com/", kind: "course", provider: "Cisco" },
    { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", kind: "docs", provider: "NIST" },
    { title: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/", kind: "docs", provider: "OWASP" },
  ],
  "penetration-testing": [
    { title: "OWASP Web Security Testing Guide", url: "https://owasp.org/www-project-web-security-testing-guide/", kind: "docs", provider: "OWASP" },
    { title: "Hack The Box", url: "https://www.hackthebox.com/", kind: "practice", provider: "Hack The Box" },
    { title: "TryHackMe", url: "https://tryhackme.com/", kind: "practice", provider: "TryHackMe" },
    { title: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security", kind: "practice", provider: "PortSwigger" },
  ],
  "digital-forensics": [
    { title: "SANS DFIR Reading Room", url: "https://www.sans.org/reading-room/", kind: "article", provider: "SANS" },
    { title: "Autopsy Forensic Tool", url: "https://www.autopsy.com/", kind: "docs", provider: "Autopsy" },
    { title: "Volatility Memory Analysis", url: "https://www.volatilityfoundation.org/", kind: "docs", provider: "Volatility Foundation" },
  ],
  "incident-response": [
    { title: "NIST SP 800-61 — Incident Handling", url: "https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final", kind: "docs", provider: "NIST" },
    { title: "SANS Incident Response Process", url: "https://www.sans.org/white-papers/incident-handlers-handbook/", kind: "article", provider: "SANS" },
  ],
  // ─── Engineering Software ───────────────────────────────────────────────
  "autocad": [
    { title: "AutoCAD Official Documentation", url: "https://help.autodesk.com/view/ACD/2024/ENU/", kind: "docs", provider: "Autodesk" },
    { title: "AutoCAD Tutorials — Autodesk Learning", url: "https://www.autodesk.com/learning/", kind: "course", provider: "Autodesk" },
  ],
  "solidworks": [
    { title: "SolidWorks Official Help", url: "https://help.solidworks.com/", kind: "docs", provider: "Dassault Systèmes" },
    { title: "SolidWorks Tutorials", url: "https://www.solidworks.com/sw/resources/tutorials.htm", kind: "course", provider: "Dassault Systèmes" },
  ],
  "matlab": [
    { title: "MATLAB Official Documentation", url: "https://www.mathworks.com/help/matlab/", kind: "docs", provider: "MathWorks" },
    { title: "MATLAB Onramp (free course)", url: "https://matlabacademy.mathworks.com/", kind: "course", provider: "MathWorks" },
    { title: "MATLAB Practice Problems", url: "https://www.mathworks.com/courses/", kind: "practice", provider: "MathWorks" },
  ],
  "simulink": [
    { title: "Simulink Official Documentation", url: "https://www.mathworks.com/help/simulink/", kind: "docs", provider: "MathWorks" },
    { title: "Simulink Onramp", url: "https://matlabacademy.mathworks.com/details/simulink-onramp/gettingstarted", kind: "course", provider: "MathWorks" },
  ],
  "ansys": [
    { title: "ANSYS Official Documentation", url: "https://ansyshelp.ansys.com/", kind: "docs", provider: "ANSYS" },
    { title: "ANSYS Learning Hub", url: "https://www.ansys.com/academic/students", kind: "course", provider: "ANSYS" },
  ],
  "catia": [
    { title: "CATIA Official Documentation", url: "https://www.3ds.com/products/catia", kind: "docs", provider: "Dassault Systèmes" },
  ],
  "revit": [
    { title: "Revit Official Documentation", url: "https://help.autodesk.com/view/RVT/2024/ENU/", kind: "docs", provider: "Autodesk" },
    { title: "Revit Tutorials — Autodesk Learning", url: "https://www.autodesk.com/learning/", kind: "course", provider: "Autodesk" },
  ],
  "civil-3d": [
    { title: "Civil 3D Official Documentation", url: "https://help.autodesk.com/view/CIV3D/2024/ENU/", kind: "docs", provider: "Autodesk" },
  ],
  "etabs": [
    { title: "ETABS Official Documentation", url: "https://www.csiamerica.com/products/etabs", kind: "docs", provider: "CSI" },
  ],
  "staad": [
    { title: "STAAD.Pro Documentation", url: "https://www.bentley.com/software/staad-pro/", kind: "docs", provider: "Bentley" },
  ],
  "altium": [
    { title: "Altium Designer Documentation", url: "https://www.altium.com/documentation/", kind: "docs", provider: "Altium" },
    { title: "Altium Learning", url: "https://www.altium.com/learning/", kind: "course", provider: "Altium" },
  ],
  "kicad": [
    { title: "KiCad Official Documentation", url: "https://docs.kicad.org/", kind: "docs", provider: "KiCad" },
    { title: "Getting Started with KiCad", url: "https://docs.kicad.org/7.0/en/getting_started_with_kicad/getting_started_with_kicad.html", kind: "article", provider: "KiCad" },
  ],
  // ─── Electrical ─────────────────────────────────────────────────────────
  "etap": [
    { title: "ETAP Official Documentation", url: "https://etap.com/documentation", kind: "docs", provider: "ETAP" },
  ],
  "pscad": [
    { title: "PSCAD Official Documentation", url: "https://www.pscad.com/documentation", kind: "docs", provider: "Manitoba Hydro" },
  ],
  "labview": [
    { title: "LabVIEW Official Documentation", url: "https://www.ni.com/docs/en-US/bundle/labview/page/measuringautomationexplorer/labviewhelp.html", kind: "docs", provider: "NI" },
    { title: "NI LabVIEW Training", url: "https://www.ni.com/en/support/training.html", kind: "course", provider: "NI" },
  ],
  "ltspice": [
    { title: "LTspice Official Documentation", url: "https://www.analog.com/en/resources/design-tools-and-calculators/ltspice-simulator.html", kind: "docs", provider: "Analog Devices" },
  ],
  "verilog": [
    { title: "Verilog Tutorial — NPTEL", url: "https://nptel.ac.in/courses/117101111", kind: "course", provider: "NPTEL" },
    { title: "EDA Playground (online Verilog)", url: "https://www.edaplayground.com/", kind: "practice", provider: "EDA Playground" },
  ],
  "vhdl": [
    { title: "VHDL Tutorial — NPTEL", url: "https://nptel.ac.in/courses/117101111", kind: "course", provider: "NPTEL" },
    { title: "All About FPGAs", url: "https://www.allaboutcircuits.com/educational/modules/all-about-fpgas/", kind: "article", provider: "All About Circuits" },
  ],
  "fpga": [
    { title: "FPGA Fundamentals — NI", url: "https://www.ni.com/en/support/documentation/supplemental/06/fpga-fundamentals.html", kind: "article", provider: "NI" },
    { title: "Xilinx/AMD FPGA Documentation", url: "https://docs.xilinx.com/", kind: "docs", provider: "AMD/Xilinx" },
  ],
  "embedded-c": [
    { title: "Embedded C Programming — GeeksforGeeks", url: "https://www.geeksforgeeks.org/embedded-c/", kind: "article", provider: "GeeksforGeeks" },
    { title: "Mastering STM32 (book)", url: "https://www.amazon.com/Mastering-STM32-Clever-Techniques-Optimization/dp/1801811994", kind: "article", provider: "Clever Programmer" },
  ],
  "arduino": [
    { title: "Arduino Official Documentation", url: "https://docs.arduino.cc/", kind: "docs", provider: "Arduino" },
    { title: "Arduino Project Hub", url: "https://projecthub.arduino.cc/", kind: "practice", provider: "Arduino" },
  ],
  "raspberry-pi": [
    { title: "Raspberry Pi Official Documentation", url: "https://www.raspberrypi.com/documentation/", kind: "docs", provider: "Raspberry Pi Foundation" },
    { title: "Raspberry Pi Projects", url: "https://projects.raspberrypi.org/", kind: "practice", provider: "Raspberry Pi Foundation" },
  ],
  // ─── Mechanical / Manufacturing ─────────────────────────────────────────
  "fea": [
    { title: "ANSYS FEA Tutorials", url: "https://ansyshelp.ansys.com/", kind: "docs", provider: "ANSYS" },
    { title: "FEA Theory — Cornell University", url: "https://courses.washington.edu/cm426/Intro_FEA.pdf", kind: "article", provider: "University of Washington" },
  ],
  "cfd": [
    { title: "OpenFOAM Official Documentation", url: "https://www.openfoam.com/documentation/", kind: "docs", provider: "OpenCFD" },
    { title: "ANSYS Fluent Documentation", url: "https://ansyshelp.ansys.com/", kind: "docs", provider: "ANSYS" },
  ],
  "gd-t": [
    { title: "ASME Y14.5 GD&T Standard", url: "https://www.asme.org/codes-standards/find-standards/y14.5-2018/", kind: "docs", provider: "ASME" },
    { title: "GD&T Basics", url: "https://www.gdandtbasics.com/", kind: "article", provider: "GD&T Basics" },
  ],
  "thermodynamics": [
    { title: "MIT OpenCourseWare — Thermodynamics", url: "https://ocw.mit.edu/courses/2-51-intermediate-heat-and-mass-transfer-fall-2008/", kind: "course", provider: "MIT OCW" },
    { title: "Engineering Thermodynamics — NPTEL", url: "https://nptel.ac.in/courses/112107145", kind: "course", provider: "NPTEL" },
  ],
  "fluid-mechanics": [
    { title: "MIT OpenCourseWare — Fluid Mechanics", url: "https://ocw.mit.edu/courses/2-06-fluid-dynamics-spring-2013/", kind: "course", provider: "MIT OCW" },
    { title: "NPTEL Fluid Mechanics", url: "https://nptel.ac.in/courses/112104123", kind: "course", provider: "NPTEL" },
  ],
  "heat-transfer": [
    { title: "MIT OpenCourseWare — Heat Transfer", url: "https://ocw.mit.edu/courses/2-51-intermediate-heat-and-mass-transfer-fall-2008/", kind: "course", provider: "MIT OCW" },
  ],
  "material-science": [
    { title: "MIT OpenCourseWare — Material Science", url: "https://ocw.mit.edu/courses/3-091-introduction-to-solid-state-chemistry-fall-2018/", kind: "course", provider: "MIT OCW" },
    { title: "NPTEL Material Science", url: "https://nptel.ac.in/courses/113107132", kind: "course", provider: "NPTEL" },
  ],
  // ─── Civil ──────────────────────────────────────────────────────────────
  "structural-analysis": [
    { title: "Structural Analysis — NPTEL", url: "https://nptel.ac.in/courses/105108106", kind: "course", provider: "NPTEL" },
    { title: "SkyCiv Structural Analysis", url: "https://skyciv.com/tutorials/", kind: "course", provider: "SkyCiv" },
  ],
  "geotechnical": [
    { title: "Geotechnical Engineering — NPTEL", url: "https://nptel.ac.in/courses/105105127", kind: "course", provider: "NPTEL" },
    { title: "Principles of Geotechnical Engineering (Das)", kind: "article", url: "https://www.cengage.com/c/principles-of-geotechnical-engineering-9e-das/9781305970939/" },
  ],
  "transportation": [
    { title: "Transportation Engineering — NPTEL", url: "https://nptel.ac.in/courses/105108117", kind: "course", provider: "NPTEL" },
    { title: "FHWA Highway Engineering", url: "https://www.fhwa.dot.gov/", kind: "docs", provider: "FHWA" },
  ],
  "hydraulics": [
    { title: "Hydraulics — NPTEL", url: "https://nptel.ac.in/courses/105108111", kind: "course", provider: "NPTEL" },
    { title: "HEC-RAS Official Documentation", url: "https://www.hec.usace.army.mil/software/hec-ras/", kind: "docs", provider: "USACE" },
  ],
  "surveying": [
    { title: "Surveying — NPTEL", url: "https://nptel.ac.in/courses/105108107", kind: "course", provider: "NPTEL" },
    { title: "AutoCAD Civil 3D for Surveying", url: "https://help.autodesk.com/view/CIV3D/2024/ENU/", kind: "docs", provider: "Autodesk" },
  ],
  // ─── Electrical ─────────────────────────────────────────────────────────
  "power-systems": [
    { title: "Power Systems — NPTEL", url: "https://nptel.ac.in/courses/108105225", kind: "course", provider: "NPTEL" },
    { title: "ETAP Power System Analysis", url: "https://etap.com/documentation", kind: "docs", provider: "ETAP" },
  ],
  "power-electronics": [
    { title: "Power Electronics — NPTEL", url: "https://nptel.ac.in/courses/108105227", kind: "course", provider: "NPTEL" },
    { title: "Power Electronics (Mohan, Undeland)", kind: "article", url: "https://www.wiley.com/en-us/Power+Electronics%3A+Converters%2C+Applications%2C+and+Design-p-9780471226932" },
  ],
  "control-systems": [
    { title: "Control Systems — NPTEL", url: "https://nptel.ac.in/courses/108105223", kind: "course", provider: "NPTEL" },
    { title: "MIT OCW — Feedback Control Systems", url: "https://ocw.mit.edu/courses/6-003-signals-and-systems-fall-2011/", kind: "course", provider: "MIT" },
  ],
  "vlsi": [
    { title: "VLSI Design — NPTEL", url: "https://nptel.ac.in/courses/117101111", kind: "course", provider: "NPTEL" },
    { title: "Cadence VLSI Documentation", url: "https://support.cadence.com/", kind: "docs", provider: "Cadence" },
  ],
  "signal-processing": [
    { title: "Signals and Systems — NPTEL", url: "https://nptel.ac.in/courses/108105221", kind: "course", provider: "NPTEL" },
    { title: "MIT OCW — Signals and Systems", url: "https://ocw.mit.edu/courses/6-003-signals-and-systems-fall-2011/", kind: "course", provider: "MIT" },
  ],
  "telecommunications": [
    { title: "Telecommunications — NPTEL", url: "https://nptel.ac.in/courses/108105229", kind: "course", provider: "NPTEL" },
    { title: "5G Technology Overview — 3GPP", url: "https://www.3gpp.org/technologies/5g-overview", kind: "docs", provider: "3GPP" },
  ],
  // ─── Chemical ───────────────────────────────────────────────────────────
  "process-design": [
    { title: "Process Design — NPTEL", url: "https://nptel.ac.in/courses/102106136", kind: "course", provider: "NPTEL" },
    { title: "Aspen HYSYS Documentation", url: "https://www.aspentech.com/en/products/aspen-hysys", kind: "docs", provider: "AspenTech" },
  ],
  "process-safety": [
    { title: "Process Safety — CCPS", url: "https://www.aiche.org/ccps", kind: "docs", provider: "AIChE/CCPS" },
    { title: "HSE Process Safety Management", url: "https://www.hse.gov.uk/peg/chemical-process-safety/", kind: "docs", provider: "HSE" },
  ],
  // ─── Generic topic lookups ──────────────────────────────────────────────
  "system-design": [
    { title: "System Design Interview (Alex Xu)", url: "https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF", kind: "article", provider: "Alex Xu" },
    { title: "System Design Primer (GitHub)", url: "https://github.com/donnemartin/system-design-primer", kind: "article", provider: "GitHub" },
    { title: "Grokking System Design (Educative)", url: "https://www.educative.io/courses/grokking-modern-system-design-interview-for-engineers-managers", kind: "course", provider: "Educative" },
  ],
  "algorithms": [
    { title: "Introduction to Algorithms (CLRS)", url: "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/", kind: "article", provider: "MIT Press" },
    { title: "Algorithm Design — Stanford (Coursera)", url: "https://www.coursera.org/specializations/algorithms", kind: "course", provider: "Stanford/Coursera" },
    { title: "LeetCode", url: "https://leetcode.com/", kind: "practice", provider: "LeetCode" },
    { title: "NeetCode (curated problem sets)", url: "https://neetcode.io/", kind: "practice", provider: "NeetCode" },
  ],
  "data-structures": [
    { title: "Data Structures — University of Alberta (Coursera)", url: "https://www.coursera.org/learn/data-structures", kind: "course", provider: "University of Alberta" },
    { title: "VisuAlgo (visualize data structures)", url: "https://visualgo.net/", kind: "practice", provider: "VisuAlgo" },
  ],
  "api-design": [
    { title: "RESTful API Design — Microsoft", url: "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design", kind: "docs", provider: "Microsoft" },
    { title: "Swagger/OpenAPI Documentation", url: "https://swagger.io/docs/", kind: "docs", provider: "Swagger" },
  ],
  "testing": [
    { title: "Testing — Martin Fowler", url: "https://martinfowler.com/testing/", kind: "article", provider: "Martin Fowler" },
    { title: "JUnit Official Documentation", url: "https://junit.org/junit5/docs/current/user-guide/", kind: "docs", provider: "JUnit" },
    { title: "pytest Official Documentation", url: "https://docs.pytest.org/en/stable/", kind: "docs", provider: "pytest" },
  ],
  "project-management": [
    { title: "PMI — Project Management Institute", url: "https://www.pmi.org/", kind: "docs", provider: "PMI" },
    { title: "PMBOK Guide Overview", url: "https://www.pmi.org/pmbok-guide-standards", kind: "docs", provider: "PMI" },
  ],
  "technical-writing": [
    { title: "Google Technical Writing Course", url: "https://developers.google.com/tech-writing", kind: "course", provider: "Google" },
    { title: "Write the Docs", url: "https://www.writethedocs.org/", kind: "article", provider: "Write the Docs" },
  ],
  "communication": [
    { title: "Business Communication — Coursera", url: "https://www.coursera.org/specializations/business-communication", kind: "course", provider: "Coursera" },
  ],
  "ethics": [
    { title: "ACM Code of Ethics", url: "https://www.acm.org/code-of-ethics", kind: "docs", provider: "ACM" },
    { title: "IEEE Code of Ethics", url: "https://www.ieee.org/about/corporate/governance/p7-2.html", kind: "docs", provider: "IEEE" },
  ],
  "sustainability": [
    { title: "UN Sustainable Development Goals", url: "https://sdgs.un.org/", kind: "docs", provider: "United Nations" },
    { title: "IEEE Sustainability", url: "https://sustainability.ieee.org/", kind: "docs", provider: "IEEE" },
  ],
  "quality": [
    { title: "ISO 9001 Quality Management", url: "https://www.iso.org/iso-9001-quality-management.html", kind: "docs", provider: "ISO" },
    { title: "Six Sigma — ASQ", url: "https://asq.org/quality-resources/six-sigma", kind: "article", provider: "ASQ" },
  ],
  "safety": [
    { title: "OSHA Standards", url: "https://www.osha.gov/laws-regs/", kind: "docs", provider: "OSHA" },
    { title: "Safety Engineering — NPTEL", url: "https://nptel.ac.in/courses/118106134", kind: "course", provider: "NPTEL" },
  ],
  // ─── Soft Skills ────────────────────────────────────────────────────────
  "problem-solving": [
    { title: "Problem Solving — HackerRank", url: "https://www.hackerrank.com/domains/algorithms", kind: "practice", provider: "HackerRank" },
    { title: "Critical Thinking — Coursera", url: "https://www.coursera.org/learn/critical-thinking-problem-solving", kind: "course", provider: "Coursera" },
  ],
  "teamwork": [
    { title: "Collaborative Teamwork — Coursera", url: "https://www.coursera.org/learn/teamwork-skills-effective-communication", kind: "course", provider: "Coursera" },
  ],
  "leadership": [
    { title: "Engineering Leadership — Stanford", url: "https://leadership.stanford.edu/", kind: "article", provider: "Stanford" },
  ],
  "time-management": [
    { title: "Time Management — Coursera", url: "https://www.coursera.org/learn/work-smarter-not-harder", kind: "course", provider: "Coursera" },
  ],
  // ─── Portfolio / Career ─────────────────────────────────────────────────
  "portfolio": [
    { title: "How to Build a Developer Portfolio", url: "https://www.freecodecamp.org/news/how-to-build-a-developer-portfolio-website/", kind: "article", provider: "FreeCodeCamp" },
    { title: "GitHub — Showcase Your Work", url: "https://github.com/", kind: "docs", provider: "GitHub" },
    { title: "Behance — Design Portfolio", url: "https://www.behance.net/", kind: "practice", provider: "Behance" },
  ],
  "resume": [
    { title: "Resume Writing Guide — The Muse", url: "https://www.themuse.com/advice/complete-guide-to-writing-a-resume", kind: "article", provider: "The Muse" },
    { title: "LinkedIn Profile Optimization", url: "https://www.linkedin.com/help/linkedin/answer/a424958", kind: "article", provider: "LinkedIn" },
  ],
  "interview-preparation": [
    { title: "Cracking the Coding Interview (book)", url: "https://www.crackingthecodinginterview.com/", kind: "article", provider: "Gayle McDowell" },
    { title: "LeetCode Interview Questions", url: "https://leetcode.com/problemset/", kind: "practice", provider: "LeetCode" },
    { title: "Pramp — Mock Interviews", url: "https://www.pramp.com/", kind: "practice", provider: "Pramp" },
    { title: "System Design Interview Prep", url: "https://www.tryexponent.com/", kind: "practice", provider: "Exponent" },
  ],
  "open-source": [
    { title: "First Timers Only", url: "https://www.firsttimersonly.com/", kind: "article", provider: "First Timers Only" },
    { title: "GitHub Good First Issues", url: "https://github.com/topics/good-first-issue", kind: "practice", provider: "GitHub" },
  ],
  // ─── Industrial / Manufacturing ─────────────────────────────────────────
  "lean-manufacturing": [
    { title: "Lean Manufacturing — ASQ", url: "https://asq.org/quality-resources/lean", kind: "article", provider: "ASQ" },
    { title: "Toyota Production System", url: "https://www.toyota-global.com/company/toyota-production-system/", kind: "article", provider: "Toyota" },
  ],
  "six-sigma": [
    { title: "Six Sigma — ASQ", url: "https://asq.org/quality-resources/six-sigma", kind: "article", provider: "ASQ" },
    { title: "Six Sigma Certification — IASSC", url: "https://www.iassc.org/six-sigma-certification/", kind: "docs", provider: "IASSC" },
  ],
  "supply-chain": [
    { title: "Supply Chain Management — Coursera (Rutgers)", url: "https://www.coursera.org/specializations/supply-chain-management", kind: "course", provider: "Rutgers/Coursera" },
    { title: "APICS/ASCM Resources", url: "https://www.ascm.org/", kind: "docs", provider: "ASCM" },
  ],
  // ─── Biomedical ─────────────────────────────────────────────────────────
  "biomaterials": [
    { title: "Biomaterials Science (Ratner et al.)", url: "https://www.elsevier.com/books/biomaterials-science/ratner/978-0-12-816137-1", kind: "article", provider: "Elsevier" },
    { title: "Biocompatibility Assessment — ISO 10993", url: "https://www.iso.org/standard/75067.html", kind: "docs", provider: "ISO" },
  ],
  "biomechanics": [
    { title: "Biomechanics — NPTEL", url: "https://nptel.ac.in/courses/102106146", kind: "course", provider: "NPTEL" },
  ],
  "medical-devices": [
    { title: "FDA Medical Device Regulations", url: "https://www.fda.gov/medical-devices", kind: "docs", provider: "FDA" },
    { title: "ISO 13485 Quality Management for Medical Devices", url: "https://www.iso.org/standard/59742.html", kind: "docs", provider: "ISO" },
  ],
  // ─── Aerospace ──────────────────────────────────────────────────────────
  "aerodynamics": [
    { title: "Aerodynamics — MIT OCW", url: "https://ocw.mit.edu/courses/16-110-flight-vehicle-aerodynamics-fall-2004/", kind: "course", provider: "MIT" },
    { title: "NASA Glenn Research Center — Aerodynamics", url: "https://www.grc.nasa.gov/www/k-12/airplane/", kind: "article", provider: "NASA" },
  ],
  "propulsion": [
    { title: "Rocket Propulsion Elements (Sutton)", url: "https://www.wiley.com/en-us/Rocket+Propulsion+Elements-p-9781118753651", kind: "article", provider: "Wiley" },
    { title: "NASA Propulsion Education", url: "https://www.nasa.gov/learning-resources/for-educators/", kind: "article", provider: "NASA" },
  ],
  "flight-mechanics": [
    { title: "Flight Dynamics — NPTEL", url: "https://nptel.ac.in/courses/103106130", kind: "course", provider: "NPTEL" },
    { title: "NASA Flight Dynamics", url: "https://www.nasa.gov/", kind: "article", provider: "NASA" },
  ],
  // ─── Environmental ──────────────────────────────────────────────────────
  "water-treatment": [
    { title: "Water Treatment — NPTEL", url: "https://nptel.ac.in/courses/105108135", kind: "course", provider: "NPTEL" },
    { title: "WHO Drinking Water Guidelines", url: "https://www.who.int/publications/i/item/9789240045064", kind: "docs", provider: "WHO" },
  ],
  "renewable-energy": [
    { title: "Renewable Energy — NPTEL", url: "https://nptel.ac.in/courses/103105112", kind: "course", provider: "NPTEL" },
    { title: "IRENA Resources", url: "https://www.irena.org/", kind: "docs", provider: "IRENA" },
  ],
  "solar-energy": [
    { title: "Solar Energy — NPTEL", url: "https://nptel.ac.in/courses/103105112", kind: "course", provider: "NPTEL" },
    { title: "NREL Solar Resources", url: "https://www.nrel.gov/", kind: "docs", provider: "NREL" },
  ],
  "wind-energy": [
    { title: "Wind Energy — NPTEL", url: "https://nptel.ac.in/courses/103105112", kind: "course", provider: "NPTEL" },
  ],
  // ─── Materials ──────────────────────────────────────────────────────────
  "metallurgy": [
    { title: "Metallurgy — NPTEL", url: "https://nptel.ac.in/courses/113107132", kind: "course", provider: "NPTEL" },
  ],
  "corrosion": [
    { title: "Corrosion Engineering — NPTEL", url: "https://nptel.ac.in/courses/113107134", kind: "course", provider: "NPTEL" },
    { title: "NACE International", url: "https://www.ampp.org/", kind: "docs", provider: "AMPP" },
  ],
  "polymer": [
    { title: "Polymer Science — NPTEL", url: "https://nptel.ac.in/courses/113107136", kind: "course", provider: "NPTEL" },
  ],
  "welding": [
    { title: "Welding — American Welding Society", url: "https://www.aws.org/", kind: "docs", provider: "AWS" },
  ],
};

// ── Practice Database ────────────────────────────────────────────────────────
const PRACTICE_DB = {
  "python": [
    { title: "HackerRank Python Track", platform: "HackerRank", url: "https://www.hackerrank.com/domains/python", difficulty: "Beginner", estimatedTime: "30-60 min" },
    { title: "LeetCode Easy Problems in Python", platform: "LeetCode", url: "https://leetcode.com/problemset/", difficulty: "Intermediate", estimatedTime: "60-90 min" },
  ],
  "javascript": [
    { title: "FreeCodeCamp JavaScript Algorithms", platform: "FreeCodeCamp", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", difficulty: "Beginner", estimatedTime: "30-60 min" },
    { title: "Exercism JavaScript Track", platform: "Exercism", url: "https://exercism.org/tracks/javascript", difficulty: "Intermediate", estimatedTime: "30-60 min" },
  ],
  "react": [
    { title: "Scrimba — Learn React for Free", platform: "Scrimba", url: "https://scrimba.com/learn/learnreact", difficulty: "Beginner", estimatedTime: "60-90 min" },
    { title: "React Challenges on Frontend Mentor", platform: "Frontend Mentor", url: "https://www.frontendmentor.io/", difficulty: "Intermediate", estimatedTime: "60-120 min" },
  ],
  "sql": [
    { title: "SQLBolt Interactive SQL Exercises", platform: "SQLBolt", url: "https://sqlbolt.com/", difficulty: "Beginner", estimatedTime: "30-60 min" },
    { title: "HackerRank SQL Track", platform: "HackerRank", url: "https://www.hackerrank.com/domains/sql", difficulty: "Intermediate", estimatedTime: "30-60 min" },
    { title: "SQLZoo Interactive Tutorials", platform: "SQLZoo", url: "https://sqlzoo.net/", difficulty: "Beginner", estimatedTime: "30-60 min" },
  ],
  "docker": [
    { title: "Play with Docker Labs", platform: "Play with Docker", url: "https://labs.play-with-docker.com/", difficulty: "Beginner", estimatedTime: "30-60 min" },
  ],
  "kubernetes": [
    { title: "KillerCoda Kubernetes Scenarios", platform: "KillerCoda", url: "https://killercoda.com/playgrounds/scenario/kubernetes", difficulty: "Intermediate", estimatedTime: "30-60 min" },
    { title: "Katacoda Kubernetes Labs", platform: "Katacoda", url: "https://www.katacoda.com/", difficulty: "Intermediate", estimatedTime: "30-60 min" },
  ],
  "aws": [
    { title: "AWS Skill Builder Free Labs", platform: "AWS Skill Builder", url: "https://skillbuilder.aws/", difficulty: "Beginner", estimatedTime: "60-120 min" },
    { title: "AWS Well-Architected Labs", platform: "AWS", url: "https://wellarchitectedlabs.com/", difficulty: "Intermediate", estimatedTime: "60-120 min" },
  ],
  "algorithms": [
    { title: "LeetCode — Algorithm Problems", platform: "LeetCode", url: "https://leetcode.com/", difficulty: "Intermediate", estimatedTime: "60-120 min" },
    { title: "HackerRank — Algorithms Track", platform: "HackerRank", url: "https://www.hackerrank.com/domains/algorithms", difficulty: "Intermediate", estimatedTime: "30-60 min" },
    { title: "NeetCode — Curated Problems", platform: "NeetCode", url: "https://neetcode.io/", difficulty: "Intermediate", estimatedTime: "60-90 min" },
    { title: "CodeSignal Interview Practice", platform: "CodeSignal", url: "https://codesignal.com/", difficulty: "Intermediate", estimatedTime: "60-90 min" },
  ],
  "system-design": [
    { title: "System Design Interview Prep", platform: "Exponent", url: "https://www.tryexponent.com/", difficulty: "Advanced", estimatedTime: "60-120 min" },
    { title: "Educative — System Design", platform: "Educative", url: "https://www.educative.io/courses/grokking-modern-system-design-interview-for-engineers-managers", difficulty: "Advanced", estimatedTime: "60-120 min" },
  ],
  "penetration-testing": [
    { title: "TryHackMe — Complete Beginner Path", platform: "TryHackMe", url: "https://tryhackme.com/path/outline/complete-beginner", difficulty: "Beginner", estimatedTime: "30-60 min" },
    { title: "Hack The Box — Starting Point", platform: "Hack The Box", url: "https://www.hackthebox.com/", difficulty: "Intermediate", estimatedTime: "60-120 min" },
    { title: "PortSwigger Web Security Academy", platform: "PortSwigger", url: "https://portswigger.net/web-security", difficulty: "Intermediate", estimatedTime: "30-60 min" },
    { title: "PicoCTF — CTF Challenges", platform: "PicoCTF", url: "https://picoctf.org/", difficulty: "Beginner", estimatedTime: "60-120 min" },
  ],
  "linux": [
    { title: "OverTheWire — Bandit", platform: "OverTheWire", url: "https://overthewire.org/wargames/bandit/", difficulty: "Beginner", estimatedTime: "30-60 min" },
    { title: "Linux Journey — Interactive", platform: "Linux Journey", url: "https://linuxjourney.com/", difficulty: "Beginner", estimatedTime: "30-60 min" },
  ],
  "git": [
    { title: "Learn Git Branching (Interactive)", platform: "Learn Git Branching", url: "https://learngitbranching.js.org/", difficulty: "Beginner", estimatedTime: "30-60 min" },
    { title: "GitHub Skills (Learning Workflows)", platform: "GitHub", url: "https://skills.github.com/", difficulty: "Beginner", estimatedTime: "30-60 min" },
  ],
  "matlab": [
    { title: "MATLAB Onramp (Free Course)", platform: "MathWorks", url: "https://matlabacademy.mathworks.com/", difficulty: "Beginner", estimatedTime: "60-120 min" },
  ],
  "machine-learning": [
    { title: "Kaggle — Intro to ML", platform: "Kaggle", url: "https://www.kaggle.com/learn/intro-to-machine-learning", difficulty: "Beginner", estimatedTime: "60-120 min" },
    { title: "Kaggle Competitions", platform: "Kaggle", url: "https://www.kaggle.com/competitions", difficulty: "Intermediate", estimatedTime: "120+ min" },
  ],
  "deep-learning": [
    { title: "fast.ai Practical Deep Learning", platform: "fast.ai", url: "https://course.fast.ai/", difficulty: "Intermediate", estimatedTime: "120+ min" },
  ],
  "problem-solving": [
    { title: "HackerRank — Problem Solving Track", platform: "HackerRank", url: "https://www.hackerrank.com/domains/algorithms", difficulty: "Beginner", estimatedTime: "30-60 min" },
    { title: "LeetCode Easy Problems", platform: "LeetCode", url: "https://leetcode.com/problemset/?difficulty=EASY", difficulty: "Beginner", estimatedTime: "60-90 min" },
  ],
  "interview-preparation": [
    { title: "Pramp — Mock Interview Platform", platform: "Pramp", url: "https://www.pramp.com/", difficulty: "Intermediate", estimatedTime: "60-90 min" },
    { title: "LeetCode — Top Interview Questions", platform: "LeetCode", url: "https://leetcode.com/problemset/top-100-liked-questions/", difficulty: "Intermediate", estimatedTime: "60-120 min" },
  ],
  "portfolio": [
    { title: "GitHub — Build Your Profile", platform: "GitHub", url: "https://github.com/", difficulty: "Beginner", estimatedTime: "60-120 min" },
    { title: "Frontend Mentor — Build Projects", platform: "Frontend Mentor", url: "https://www.frontendmentor.io/", difficulty: "Intermediate", estimatedTime: "60-120 min" },
  ],
  "resume": [
    { title: "LinkedIn Profile Optimization", platform: "LinkedIn", url: "https://www.linkedin.com/", difficulty: "Beginner", estimatedTime: "30-60 min" },
  ],
  "open-source": [
    { title: "GitHub — Good First Issues", platform: "GitHub", url: "https://github.com/topics/good-first-issue", difficulty: "Intermediate", estimatedTime: "60-120 min" },
    { title: "First Timers Only", platform: "First Timers Only", url: "https://www.firsttimersonly.com/", difficulty: "Beginner", estimatedTime: "60-120 min" },
  ],
};

// ── Knowledge Base Generator ─────────────────────────────────────────────────

function slugify(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function findResources(topicTitle, careerDomain, careerTitle) {
  const slug = slugify(topicTitle);
  // Try exact match
  if (RESOURCE_DB[slug]) return RESOURCE_DB[slug];
  // Try partial matches
  for (const [key, res] of Object.entries(RESOURCE_DB)) {
    if (slug.includes(key) || key.includes(slug) || slug.includes(key.replace(/-/g, ""))) return res;
  }
  // Domain-specific fallback
  if (careerDomain?.includes("Software") || careerDomain?.includes("AI")) {
    return [
      { title: `${topicTitle} — MDN Web Docs`, url: `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(topicTitle)}`, kind: "article", provider: "MDN" },
      { title: `${topicTitle} on GeeksforGeeks`, url: `https://www.geeksforgeeks.org/?s=${encodeURIComponent(topicTitle)}`, kind: "article", provider: "GeeksforGeeks" },
    ];
  }
  if (careerDomain?.includes("Mechanical") || careerDomain?.includes("Electrical") || careerDomain?.includes("Civil") || careerDomain?.includes("Chemical") || careerDomain?.includes("Aerospace")) {
    return [
      { title: `${topicTitle} — NPTEL`, url: `https://nptel.ac.in/`, kind: "course", provider: "NPTEL" },
      { title: `${topicTitle} — MIT OpenCourseWare`, url: "https://ocw.mit.edu/", kind: "course", provider: "MIT OCW" },
    ];
  }
  return [
    { title: `Learn about ${topicTitle}`, url: `https://www.google.com/search?q=${encodeURIComponent(topicTitle + " tutorial")}`, kind: "article", provider: "Google Search" },
  ];
}

function findPractice(topicTitle, careerDomain) {
  const slug = slugify(topicTitle);
  if (PRACTICE_DB[slug]) return PRACTICE_DB[slug];
  for (const [key, prac] of Object.entries(PRACTICE_DB)) {
    if (slug.includes(key) || key.includes(slug) || slug.includes(key.replace(/-/g, ""))) return prac;
  }
  // Generic practice fallback based on domain
  if (careerDomain?.includes("Software") || careerDomain?.includes("AI")) {
    return [
      { title: `Practice ${topicTitle} with hands-on exercises`, platform: "HackerRank", url: "https://www.hackerrank.com/", difficulty: "Intermediate", estimatedTime: "30-60 min" },
    ];
  }
  if (careerDomain?.includes("Mechanical") || careerDomain?.includes("Civil") || careerDomain?.includes("Electrical")) {
    return [
      { title: `Solve ${topicTitle} practice problems on NPTEL assignments`, platform: "NPTEL", url: "https://nptel.ac.in/", difficulty: "Intermediate", estimatedTime: "60-120 min" },
    ];
  }
  return [
    { title: `Practice ${topicTitle} — work through textbook problems`, platform: "Self-study", url: "https://www.google.com/search?q=" + encodeURIComponent(topicTitle + " practice problems"), difficulty: "Intermediate", estimatedTime: "60-120 min" },
  ];
}

function getWhatIsIt(topicTitle, sectionTitle, careerTitle, careerDomain) {
  // Context-aware definitions
  const domain = careerDomain || "";
  const section = sectionTitle || "";
  
  // Programming topics
  const programmingDefs = {
    "variables": "Variables are named storage locations in memory that hold data values during program execution. They are the fundamental building blocks for storing and manipulating information in code.",
    "functions": "Functions are reusable blocks of code that perform a specific task. They accept inputs (parameters), execute logic, and return outputs, forming the core abstraction for organizing programs.",
    "arrays": "Arrays are ordered collections of elements stored in contiguous memory locations, enabling efficient indexed access and iteration over groups of related data.",
    "loops": "Loops are control flow structures that repeat a block of code based on a condition. They enable processing collections, performing iterations, and implementing repetitive algorithms.",
    "conditionals": "Conditionals are control structures that execute different code paths based on boolean expressions, enabling programs to make decisions and branch logic.",
    "classes": "Classes are blueprints for creating objects — they define the data (properties) and behavior (methods) that instances of the class will share.",
    "objects": "Objects are instances of classes that encapsulate state (data) and behavior (methods) into a single entity, forming the basis of object-oriented programming.",
    "inheritance": "Inheritance is a mechanism where a new class derives properties and methods from an existing class, enabling code reuse and hierarchical relationships between types.",
    "encapsulation": "Encapsulation is the practice of bundling data with the methods that operate on that data, and restricting direct access to some components — controlling how an object's internal state is accessed.",
    "polymorphism": "Polymorphism allows objects of different types to be treated through a common interface, where the specific behavior depends on the actual type at runtime.",
    "abstraction": "Abstraction is the process of hiding complex implementation details while exposing only the essential features and interfaces that users need to interact with.",
    "error-handling": "Error handling is the practice of detecting, responding to, and recovering from exceptional conditions during program execution, ensuring graceful degradation instead of crashes.",
    "debugging": "Debugging is the process of identifying, analyzing, and removing defects or unexpected behavior in software, typically using specialized tools and systematic investigation techniques.",
    "testing": "Software testing is the practice of verifying that code behaves correctly by executing it against defined expectations, catching regressions, and ensuring quality before deployment.",
    "recursion": "Recursion is a technique where a function calls itself with modified arguments to solve problems by breaking them into smaller self-similar subproblems.",
    "pointers": "Pointers are variables that store memory addresses of other data, enabling direct memory manipulation, efficient data structures, and low-level system programming.",
    "memory-management": "Memory management is the process of allocating and deallocating memory during program execution, ensuring efficient use of resources and preventing leaks and corruption.",
    "sorting": "Sorting algorithms arrange elements in a defined order (ascending/descending). Different algorithms have different time and space complexities, making algorithm choice important for performance.",
    "searching": "Searching algorithms locate specific elements or values within a data structure. Efficient searching (like binary search) can dramatically reduce the number of comparisons needed.",
    "trees": "Trees are hierarchical data structures consisting of nodes connected by edges, with one root node and child relationships, used for representing hierarchical data and enabling efficient lookups.",
    "graphs": "Graphs are collections of vertices (nodes) and edges (connections) that model relationships between entities, used in networks, pathfinding, scheduling, and dependency resolution.",
    "hash-tables": "Hash tables are data structures that map keys to values using a hash function, providing near-constant-time average lookup, insertion, and deletion operations.",
    "stacks": "Stacks are LIFO (Last-In-First-Out) data structures that support push and pop operations, used for managing function calls, undo operations, and parsing expressions.",
    "queues": "Queues are FIFO (First-In-First-Out) data structures that support enqueue and dequeue operations, used for task scheduling, buffering, and breadth-first traversal.",
    "linked-lists": "Linked lists are sequential data structures where each element (node) contains data and a pointer to the next node, enabling efficient insertions and deletions without contiguous memory.",
    "binary-trees": "Binary trees are tree data structures where each node has at most two children (left and right), used for efficient searching (BST), expression parsing, and hierarchical data.",
    "dynamic-programming": "Dynamic programming is an algorithmic technique that solves complex problems by breaking them into overlapping subproblems, storing results to avoid redundant computation.",
    "big-o": "Big-O notation describes the upper bound of an algorithm's time or space complexity as input size grows, enabling comparison of algorithm efficiency independent of hardware.",
    "api-design": "API design is the practice of creating intuitive, consistent, and well-documented interfaces that enable software components to communicate effectively.",
    "database": "Databases are organized collections of structured data stored electronically, enabling persistent storage, efficient retrieval, and concurrent access to information.",
    "authentication": "Authentication is the process of verifying the identity of a user, device, or system, ensuring that only authorized entities can access protected resources.",
    "authorization": "Authorization determines what an authenticated entity is allowed to do — controlling access to resources, actions, and data based on permissions and roles.",
    "deployment": "Deployment is the process of making software available for use in a target environment, including building, configuring, and releasing code to production infrastructure.",
    "cicd": "Continuous Integration and Continuous Deployment (CI/CD) is a practice of automatically building, testing, and deploying code changes to enable rapid, reliable software delivery.",
    "version-control": "Version control systems track changes to files over time, enabling collaboration, branching, merging, and maintaining a complete history of a codebase.",
    "agile": "Agile is an iterative software development methodology that emphasizes incremental delivery, continuous feedback, and adaptive planning over rigid long-term schedules.",
    "refactoring": "Refactoring is the process of restructuring existing code without changing its external behavior, improving readability, reducing complexity, and making the code easier to maintain.",
    "design-patterns": "Design patterns are proven, reusable solutions to common software design problems, providing a shared vocabulary and proven approaches for structuring code.",
    "solid-principles": "SOLID is a set of five object-oriented design principles (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) that promote maintainable, flexible code.",
    "microservices": "Microservices architecture structures an application as a collection of loosely coupled, independently deployable services, each responsible for a specific business capability.",
    "monolith": "A monolithic architecture builds an application as a single, unified unit where all components are interconnected and interdependent, simpler to develop initially but harder to scale.",
    "load-balancing": "Load balancing distributes incoming network traffic across multiple servers, ensuring no single server is overwhelmed and improving application availability and responsiveness.",
    "caching": "Caching stores frequently accessed data in a fast-access storage layer to reduce database load and improve response times for subsequent requests.",
    "message-queues": "Message queues enable asynchronous communication between software components by buffering messages, enabling decoupled, scalable, and reliable distributed systems.",
    "event-driven": "Event-driven architecture is a design pattern where components communicate by producing and consuming events, enabling loose coupling and reactive system behavior.",
    "concurrency": "Concurrency is the execution of multiple tasks simultaneously or interleaved, requiring careful synchronization to avoid race conditions and ensure correctness.",
    "parallelism": "Parallelism is the simultaneous execution of multiple computations, leveraging multiple processors or cores to improve performance on computationally intensive tasks.",
    "optimization": "Optimization is the process of improving code or system performance by reducing time complexity, space usage, or resource consumption while maintaining correctness.",
  };

  const lowerTitle = topicTitle.toLowerCase();
  for (const [key, def] of Object.entries(programmingDefs)) {
    if (lowerTitle.includes(key)) return def;
  }
  
  // Engineering domain definitions
  if (section.includes("Math") || section.includes("Foundation")) {
    return `${topicTitle} is a foundational concept in engineering mathematics/science that provides the theoretical tools needed to analyze, model, and solve engineering problems across the discipline.`;
  }
  if (section.includes("Standards") || section.includes("Regulation")) {
    return `${topicTitle} establishes the rules, guidelines and requirements that ensure engineering work meets safety, quality, and compliance standards in the professional domain.`;
  }
  if (section.includes("Portfolio")) {
    return `${topicTitle} is a hands-on project that demonstrates your practical skills and problem-solving ability to potential employers, forming a key part of your professional portfolio.`;
  }
  if (section.includes("Interview") || section.includes("Career")) {
    return `${topicTitle} is an essential preparation step for successfully transitioning into your professional career, covering the skills needed beyond technical knowledge.`;
  }
  
  // Domain-specific fallback
  if (domain.includes("Software") || domain.includes("AI")) {
    return `${topicTitle} is a core technical concept in ${careerTitle} that enables building robust, scalable software systems and making sound engineering decisions.`;
  }
  if (domain.includes("Mechanical")) {
    return `${topicTitle} is a core engineering concept in mechanical engineering that applies to the design, analysis, manufacturing and testing of physical products and systems.`;
  }
  if (domain.includes("Civil")) {
    return `${topicTitle} is a core concept in civil engineering used in the planning, design, construction and maintenance of infrastructure systems.`;
  }
  if (domain.includes("Electrical")) {
    return `${topicTitle} is a fundamental concept in electrical and electronics engineering used in the design, analysis and operation of electrical systems and devices.`;
  }
  if (domain.includes("Chemical")) {
    return `${topicTitle} is a core concept in chemical engineering applied to the design, optimization and operation of chemical processes and systems.`;
  }
  if (domain.includes("Aerospace")) {
    return `${topicTitle} is a key concept in aerospace engineering used in the design, analysis and operation of aircraft, spacecraft and propulsion systems.`;
  }
  return `${topicTitle} is an important concept in ${careerTitle} that contributes to building professional competence in this field.`;
}

function getWhyMatters(topicTitle, careerTitle, careerDomain, sectionTitle) {
  const lowerTitle = topicTitle.toLowerCase();
  const lowerSection = sectionTitle.toLowerCase();
  
  // Generic career relevance patterns
  if (lowerSection.includes("interview") || lowerSection.includes("career")) {
    return `Mastering ${topicTitle} is essential for interview success — expect questions about it in technical and behavioral rounds.`;
  }
  if (lowerSection.includes("portfolio")) {
    return `${topicTitle} forms a key portfolio piece that demonstrates your ability to build real-world systems from start to finish.`;
  }
  if (lowerSection.includes("foundation") || lowerSection.includes("math") || lowerSection.includes("science")) {
    return `${topicTitle} provides the foundational understanding needed for all advanced topics in ${careerTitle}. Without it, later concepts will be difficult to grasp.`;
  }
  
  const domain = careerDomain || "";
  if (domain.includes("Software") || domain.includes("AI")) {
    return `${topicTitle} is a skill that interviewers and teams expect ${careerTitle}s to know. It appears in daily coding work, code reviews and system design discussions.`;
  }
  if (domain.includes("Mechanical")) {
    return `${topicTitle} is directly applied in product design, manufacturing processes, and failure analysis — core activities of a ${careerTitle}.`;
  }
  if (domain.includes("Civil")) {
    return `${topicTitle} is essential for designing safe, code-compliant infrastructure. Professional engineers use it in structural analysis, design review and construction management.`;
  }
  if (domain.includes("Electrical")) {
    return `${topicTitle} is fundamental to circuit design, system analysis and hardware development — the daily work of a ${careerTitle}.`;
  }
  if (domain.includes("Chemical")) {
    return `${topicTitle} is critical for process design, safety analysis and production optimization in chemical plants and manufacturing facilities.`;
  }
  if (domain.includes("Aerospace")) {
    return `${topicTitle} is essential for aircraft and spacecraft design, safety analysis and flight test evaluation — core activities in aerospace engineering.`;
  }
  return `${topicTitle} is a core competency for ${careerTitle} — it comes up in interviews, daily work and professional development.`;
}

// ── Main Processing ──────────────────────────────────────────────────────────
let totalEnriched = 0;
let totalResourcesAdded = 0;
let totalPracticeAdded = 0;

for (const career of careers) {
  const domain = career.domain;
  const title = career.title;
  
  for (const section of career.sections || []) {
    const sectionKB = section.knowledgeBase || {};
    const sectionSlug = slugify(section.title);
    
    for (const topic of section.topics || []) {
      const topicSlug = slugify(topic);
      const existing = sectionKB[topicSlug] || {};
      
      // Skip if already fully populated
      if (existing.whatIsIt && existing.whyMatters && (existing.resources || []).length > 0 && (existing.practice || []).length > 0) {
        continue;
      }
      
      const enriched = { ...existing };
      
      // What is it
      if (!enriched.whatIsIt) {
        enriched.whatIsIt = getWhatIsIt(topic, section.title, title, domain);
      }
      
      // Description
      if (!enriched.description) {
        enriched.description = enriched.whatIsIt;
      }
      
      // Why it matters
      if (!enriched.whyMatters) {
        enriched.whyMatters = [getWhyMatters(topic, title, domain, section.title)];
      }
      
      // Prerequisites
      if (!enriched.prerequisites || enriched.prerequisites.length === 0) {
        // Find previous topic in same section
        const idx = section.topics.indexOf(topic);
        enriched.prerequisites = idx > 0 ? [section.topics[idx - 1]] : [`Fundamentals of ${section.title}`];
      }
      
      // Objectives
      if (!enriched.objectives || enriched.objectives.length === 0) {
        enriched.objectives = [
          `Understand the core concepts of ${topic}`,
          `Apply ${topic} in practical ${career.title.toLowerCase()} scenarios`,
          `Demonstrate competence in interviews and code/design reviews`,
        ];
      }
      
      // Concepts (from subtopics)
      if (!enriched.concepts || enriched.concepts.length === 0) {
        const subs = section.subtopics?.[topic] || [];
        if (subs.length > 0) enriched.concepts = subs;
      }
      
      // Resources
      if (!enriched.resources || enriched.resources.length === 0) {
        enriched.resources = findResources(topic, domain, title);
        totalResourcesAdded++;
      }
      
      // Practice
      if (!enriched.practice || enriched.practice.length === 0) {
        enriched.practice = findPractice(topic, domain);
        totalPracticeAdded++;
      }
      
      // Difficulty
      if (!enriched.difficulty) {
        enriched.difficulty = "Intermediate";
      }
      
      // Interview questions
      if (!enriched.interviewQuestions || enriched.interviewQuestions.length === 0) {
        enriched.interviewQuestions = [
          `Explain ${topic} to someone unfamiliar with ${career.title.toLowerCase()} work.`,
          `Why is ${topic} important for a ${title.toLowerCase()}?`,
          `What common mistakes do people make when applying ${topic}?`,
        ];
      }
      
      // Common mistakes
      if (!enriched.commonMistakes || enriched.commonMistakes.length === 0) {
        enriched.commonMistakes = [
          "Rushing through without hands-on practice",
          "Memorizing concepts without understanding the why",
          "Skipping the fundamentals and jumping to advanced topics",
        ];
      }
      
      // Tips
      if (!enriched.tips || enriched.tips.length === 0) {
        enriched.tips = [
          `Practice ${topic} by building something small every day`,
          "Explain what you learn to solidify understanding",
          "Connect each concept to real-world ${career.title.toLowerCase()} work",
        ];
      }
      
      sectionKB[topicSlug] = enriched;
      totalEnriched++;
    }
    
    section.knowledgeBase = sectionKB;
  }
}

// ── Write Updated Data ───────────────────────────────────────────────────────
writeFileSync(CAREERS_PATH, JSON.stringify(data, null, 2));

console.log(`✓ Knowledge base expansion complete`);
console.log(`  Topics enriched: ${totalEnriched}`);
console.log(`  Resources added: ${totalResourcesAdded}`);
console.log(`  Practice entries added: ${totalPracticeAdded}`);
console.log(`  Careers processed: ${careers.length}`);
console.log(`  Written to: ${CAREERS_PATH}`);
