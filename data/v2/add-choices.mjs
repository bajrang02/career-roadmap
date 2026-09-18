#!/usr/bin/env node
/**
 * add-choices.mjs — Inject technology choice nodes into career & skill source data.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CAREERS_SRC = join(__dirname, 'source', 'careers-v2.json');
const SKILLS_SRC = join(__dirname, 'source', 'skills-v2.json');
const careerData = JSON.parse(readFileSync(CAREERS_SRC, 'utf8'));
const skillData = JSON.parse(readFileSync(SKILLS_SRC, 'utf8'));

// ── Helper: insert a choice object at the beginning of a section's topics ──
function insertChoice(dataArr, careerTitle, sectionTitle, choiceObj) {
  const career = dataArr.find(c => c.title === careerTitle);
  if (!career) { console.warn(`  ⚠ Not found: ${careerTitle}`); return false; }
  const section = career.sections.find(s => s.title === sectionTitle);
  if (!section) { console.warn(`  ⚠ Section not found: ${careerTitle} → ${sectionTitle}`); return false; }
  if (!section.topics) section.topics = [];
  section.topics.unshift(choiceObj);
  return true;
}

// ── Helper: insert after a specific topic ──
function insertAfterTopic(dataArr, careerTitle, sectionTitle, afterTopic, choiceObj) {
  const career = dataArr.find(c => c.title === careerTitle);
  if (!career) { console.warn(`  ⚠ Not found: ${careerTitle}`); return false; }
  const section = career.sections.find(s => s.title === sectionTitle);
  if (!section) { console.warn(`  ⚠ Section not found: ${careerTitle} → ${sectionTitle}`); return false; }
  if (!section.topics) section.topics = [];
  const idx = section.topics.findIndex(t => {
    const name = typeof t === 'string' ? t : t.title;
    return name === afterTopic;
  });
  if (idx === -1) { console.warn(`  ⚠ Topic not found: ${careerTitle} → ${sectionTitle} → ${afterTopic}`); return false; }
  section.topics.splice(idx + 1, 0, choiceObj);
  return true;
}

// ════════════════════════════════════════════════════════════════
// CHOICE DEFINITIONS — Software / Web
// ════════════════════════════════════════════════════════════════

const FRONTEND_FRAMEWORK = {
  choice: true, title: "Choose Frontend Framework", recommended: "React",
  options: [
    { title: "React", topics: ["JSX & Component Patterns", "Hooks Deep Dive", "State Management (Redux/Zustand/Context)", "React Router & Navigation", "Performance Optimization", "React Projects"] },
    { title: "Vue", topics: ["Vue Templates & Directives", "Reactivity System & Composition API", "Vue Router", "Vuex / Pinia State Management", "Vue Projects"] },
    { title: "Angular", topics: ["TypeScript & Angular CLI", "Components & Templates", "Services & Dependency Injection", "RxJS & Observables", "Angular Projects"] },
    { title: "Svelte", topics: ["Svelte Syntax & Reactivity", "Stores & Components", "SvelteKit Routing", "Transitions & Animations", "Svelte Projects"] }
  ]
};

const BACKEND_LANGUAGE = {
  choice: true, title: "Choose Backend Technology", recommended: "Node.js",
  options: [
    { title: "Node.js", topics: ["Node.js Runtime & Modules", "Express.js Framework", "REST API Design", "Authentication & Authorization", "WebSockets & Real-time"] },
    { title: "Python (Django/FastAPI)", topics: ["Python Web Fundamentals", "Django Framework", "FastAPI Framework", "ORM & Database Integration", "Python Backend Projects"] },
    { title: "Java (Spring Boot)", topics: ["Java Fundamentals for Backend", "Spring Boot Framework", "Spring Data & JPA", "Spring Security", "Java Backend Projects"] },
    { title: "C# (.NET)", topics: ["C# Fundamentals", "ASP.NET Core", "Entity Framework", "REST APIs with .NET", ".NET Projects"] },
    { title: "Go", topics: ["Go Fundamentals", "HTTP & Web Frameworks", "Goroutines & Concurrency", "Database Integration", "Go Projects"] },
    { title: "PHP (Laravel)", topics: ["PHP Fundamentals", "Laravel Framework", "Eloquent ORM", "Blade Templates", "Laravel Projects"] }
  ]
};

const DATABASE_CHOICE = {
  choice: true, title: "Choose Primary Database", recommended: "PostgreSQL",
  options: [
    { title: "PostgreSQL", topics: ["PostgreSQL Setup & Configuration", "Advanced SQL & Window Functions", "Indexing & Performance Tuning", "JSONB & Advanced Features", "PostgreSQL Administration"] },
    { title: "MySQL", topics: ["MySQL Setup & Configuration", "SQL Queries & Optimization", "Indexing Strategies", "Replication & Clustering", "MySQL Administration"] },
    { title: "MongoDB", topics: ["Document Model & CRUD", "Aggregation Pipeline", "Indexing & Performance", "Sharding & Replication", "MongoDB in Production"] },
    { title: "SQLite", topics: ["SQLite Fundamentals", "Embedded Database Patterns", "Performance & Limitations", "SQLite in Applications"] }
  ]
};

const CLOUD_CHOICE = {
  choice: true, title: "Choose Cloud Platform", recommended: "AWS",
  options: [
    { title: "AWS", topics: ["AWS Core Services (EC2, S3, RDS)", "IAM & Security", "VPC & Networking", "Lambda & Serverless", "ECS/EKS Container Services", "CloudWatch & Monitoring"] },
    { title: "Microsoft Azure", topics: ["Azure Core Services (VMs, Blob Storage, SQL)", "Entra ID & Security", "Virtual Networks", "Azure Functions", "AKS Container Services"] },
    { title: "Google Cloud", topics: ["GCP Core Services (Compute Engine, Cloud Storage)", "IAM & Security", "VPC & Networking", "Cloud Functions / Cloud Run", "GKE Kubernetes"] }
  ]
};

const CICD_CHOICE = {
  choice: true, title: "Choose CI/CD Platform", recommended: "GitHub Actions",
  options: [
    { title: "GitHub Actions", topics: ["Workflow YAML Syntax", "Build & Test Pipelines", "Deployment Workflows", "Secrets & Environment Variables", "Reusable Workflows"] },
    { title: "GitLab CI/CD", topics: [".gitlab-ci.yml Syntax", "Stages & Jobs", "Docker Integration", "Deployment Strategies", "GitLab CI Best Practices"] },
    { title: "Jenkins", topics: ["Jenkins Installation", "Pipeline as Code", "Groovy Scripts", "Plugin Ecosystem", "Jenkins Best Practices"] }
  ]
};

const IAC_CHOICE = {
  choice: true, title: "Choose Infrastructure as Code Tool", recommended: "Terraform",
  options: [
    { title: "Terraform", topics: ["HCL Syntax & Resources", "State Management", "Modules & Composition", "Providers & Workspaces", "Terraform Best Practices"] },
    { title: "Pulumi", topics: ["Pulumi Fundamentals", "TypeScript/Python SDKs", "State Management", "Components & Stacks", "Pulumi Best Practices"] }
  ]
};

const CONTAINER_CHOICE = {
  choice: true, title: "Choose Container Technology", recommended: "Docker",
  options: [
    { title: "Docker", topics: ["Dockerfile & Image Building", "Containers & Volumes", "Docker Compose", "Docker Networking", "Docker Security Best Practices"] },
    { title: "Podman", topics: ["Podman Fundamentals", "Rootless Containers", "Podman Compose", "Podman vs Docker Comparison"] }
  ]
};

const E2E_TESTING = {
  choice: true, title: "Choose End-to-End Testing Tool", recommended: "Playwright",
  options: [
    { title: "Playwright", topics: ["Playwright Setup & Configuration", "Selectors & Locator Strategy", "Page Object Model", "Visual Testing", "Cross-browser Testing"] },
    { title: "Cypress", topics: ["Cypress Setup & Configuration", "Selectors & Commands", "Custom Commands", "Network Interception", "Cypress Best Practices"] }
  ]
};

// ════════════════════════════════════════════════════════════════
// CHOICE DEFINITIONS — AI / Data
// ════════════════════════════════════════════════════════════════

const ML_FRAMEWORK = {
  choice: true, title: "Choose ML Framework", recommended: "PyTorch",
  options: [
    { title: "PyTorch", topics: ["Tensors & Autograd", "nn.Module & Custom Layers", "Training Loops & Optimizers", "Computer Vision with torchvision", "NLP with Hugging Face"] },
    { title: "TensorFlow", topics: ["Tensors & Eager Execution", "Keras High-Level API", "Training & Optimization Pipeline", "TensorFlow Lite & Serving", "TensorFlow.js for Browser ML"] },
    { title: "scikit-learn", topics: ["Classification Algorithms", "Regression & Clustering", "Model Evaluation & Selection", "Feature Engineering Pipelines", "scikit-learn Best Practices"] }
  ]
};

const LLM_FRAMEWORK = {
  choice: true, title: "Choose LLM Application Framework", recommended: "Hugging Face",
  options: [
    { title: "Hugging Face Transformers", topics: ["Pipeline API & AutoModels", "Fine-tuning with Trainer", "Tokenizers & Model Hub", "PEFT & LoRA Fine-tuning", "Spaces & Deployment"] },
    { title: "LangChain", topics: ["LangChain Core Concepts", "Chains & LCEL", "Retrieval Augmented Generation (RAG)", "Agents & Tool Use", "LangSmith Evaluation"] },
    { title: "LlamaIndex", topics: ["Data Connectors & Indexes", "Query Engines", "Chat Engines & Memory", "Agents & Tool Integration", "LlamaCloud"] }
  ]
};

const BI_PLATFORM = {
  choice: true, title: "Choose BI Platform", recommended: "Power BI",
  options: [
    { title: "Power BI", topics: ["Power BI Desktop", "DAX Formulas", "Data Modeling", "Reports & Dashboards", "Power BI Service & Sharing"] },
    { title: "Tableau", topics: ["Tableau Interface & Connectors", "Calculated Fields & LOD Expressions", "Dashboard Design", "Tableau Server/Online", "Tableau Best Practices"] },
    { title: "Looker", topics: ["LookML Fundamentals", "Looks & Dashboards", "Data Exploration", "Looker API", "Looker Best Practices"] }
  ]
};

// ════════════════════════════════════════════════════════════════
// CHOICE DEFINITIONS — Cybersecurity
// ════════════════════════════════════════════════════════════════

const SIEM_CHOICE = {
  choice: true, title: "Choose SIEM Platform", recommended: "Splunk",
  options: [
    { title: "Splunk", topics: ["SPL (Search Processing Language)", "Dashboards & Alerts", "Correlation Rules", "Incident Investigation", "Splunk Enterprise Security"] },
    { title: "Microsoft Sentinel", topics: ["Kusto Query Language (KQL)", "Analytics Rules", "Workbooks & Dashboards", "Incident Management", "Sentinel Automation"] },
    { title: "Elastic Security (ELK)", topics: ["Elasticsearch Query DSL", "Logstash Data Ingestion", "Kibana Dashboards", "Detection Rules", "Elastic Security Cases"] }
  ]
};

const PEN_TEST_PLATFORM = {
  choice: true, title: "Choose Practice Platform", recommended: "Hack The Box",
  options: [
    { title: "Hack The Box", topics: ["Starting Point Machines", "Beginner & Easy Challenges", "Active Directory Attacks", "Web Application Penetration", "Privilege Escalation"] },
    { title: "TryHackMe", topics: ["Pre-Security Path", "Complete Beginner Path", "Web Fundamentals", "Network Security", "SOC Level 1 Path"] },
    { title: "PortSwigger Web Security Academy", topics: ["OWASP Top 10 Labs", "Authentication Vulnerabilities", "SQL Injection Labs", "Cross-Site Scripting (XSS)", "Advanced Web Attacks"] }
  ]
};

// ════════════════════════════════════════════════════════════════
// CHOICE DEFINITIONS — Mobile
// ════════════════════════════════════════════════════════════════

const MOBILE_CHOICE = {
  choice: true, title: "Choose Mobile Development Path", recommended: "Flutter",
  options: [
    { title: "Flutter (Cross-platform)", topics: ["Dart Fundamentals", "Widget System & UI", "State Management Patterns", "Navigation & Routing", "Firebase Integration"] },
    { title: "React Native (Cross-platform)", topics: ["React Native Fundamentals", "Components & Native Styling", "Navigation (React Navigation)", "State Management", "Native Modules & Bridge"] },
    { title: "Kotlin (Android Native)", topics: ["Kotlin Fundamentals", "Android Studio & Layouts", "Jetpack Compose", "Room & Retrofit", "Android Architecture Components"] },
    { title: "Swift (iOS Native)", topics: ["Swift Fundamentals", "UIKit & App Lifecycle", "SwiftUI", "Core Data & Networking", "iOS App Distribution"] }
  ]
};

// ════════════════════════════════════════════════════════════════
// CHOICE DEFINITIONS — Mechanical Engineering
// ════════════════════════════════════════════════════════════════

const MECH_CAD = {
  choice: true, title: "Choose Primary CAD Software", recommended: "SolidWorks",
  options: [
    { title: "SolidWorks", topics: ["SolidWorks Interface & Sketching", "Part Modeling", "Assembly Design", "Drawing & Detailing", "Sheet Metal & Weldments"] },
    { title: "AutoCAD", topics: ["2D Drafting & Annotations", "Layers & Blocks", "3D Modeling Basics", "Dynamic Blocks & Constraints", "AutoCAD Customization"] },
    { title: "CATIA", topics: ["CATIA V5 Interface", "Part Design", "Assembly Design", "Generative Shape Design", "Drafting"] },
    { title: "Fusion 360", topics: ["Fusion 360 Interface", "Solid Modeling", "Surface Modeling", "Simulation Basics", "CAM & Manufacturing"] },
    { title: "Siemens NX", topics: ["NX Interface & Sketching", "Part Modeling", "Assembly Design", "Drafting", "NX Advanced Features"] }
  ]
};

const MECH_SIMULATION = {
  choice: true, title: "Choose Simulation Software", recommended: "ANSYS",
  options: [
    { title: "ANSYS", topics: ["ANSYS Workbench Interface", "Static Structural Analysis", "Thermal Analysis", "CFD with Fluent", "Modal & Harmonic Analysis"] },
    { title: "Abaqus", topics: ["Abaqus/CAE Interface", "Standard & Explicit Analysis", "Contact & Nonlinearity", "Material Models", "Abaqus Scripting"] },
    { title: "COMSOL Multiphysics", topics: ["COMSOL Interface", "Multiphysics Coupling", "Structural Mechanics", "Heat Transfer", "Fluid Dynamics"] }
  ]
};

const MECH_SPECIALIZATION = {
  choice: true, title: "Choose Mechanical Specialization", recommended: "Machine Design",
  options: [
    { title: "Machine Design", topics: ["Machine Elements Design", "GD&T & Tolerancing", "Design for Manufacturing", "FEA-Based Design Optimization", "Design Documentation"] },
    { title: "Manufacturing Engineering", topics: ["CNC Programming", "Injection Molding", "Sheet Metal Fabrication", "Additive Manufacturing", "Lean Manufacturing"] },
    { title: "Automotive Engineering", topics: ["Vehicle Dynamics", "Powertrain Systems", "Chassis Design", "Automotive Electronics", "EV Technology"] },
    { title: "Thermal & HVAC", topics: ["Heat Transfer Fundamentals", "HVAC System Design", "Refrigeration Cycles", "Building Energy Simulation", "Thermal Management"] }
  ]
};

// ════════════════════════════════════════════════════════════════
// CHOICE DEFINITIONS — Civil Engineering
// ════════════════════════════════════════════════════════════════

const CIVIL_STRUCTURAL = {
  choice: true, title: "Choose Structural Analysis Software", recommended: "ETABS",
  options: [
    { title: "ETABS", topics: ["Building Modeling", "Load Patterns & Combinations", "Seismic Analysis", "Concrete & Steel Design", "Response Spectrum Analysis"] },
    { title: "STAAD.Pro", topics: ["STAAD Modeling", "Load Definitions", "Analysis Commands", "Steel & Concrete Design", "Dynamic Analysis"] },
    { title: "SAP2000", topics: ["SAP2000 Interface", "Structural Modeling", "Load Analysis", "Design Codes", "Advanced Analysis"] }
  ]
};

const CIVIL_BIM = {
  choice: true, title: "Choose CAD/BIM Software", recommended: "AutoCAD Civil 3D",
  options: [
    { title: "AutoCAD Civil 3D", topics: ["Alignment & Profile Design", "Corridor Modeling", "Pipe Networks", "Grading & Surfaces", "Quantity Takeoff"] },
    { title: "Revit", topics: ["Revit Interface & Families", "Structural Modeling", "MEP Systems", "Construction Documentation", "Collaboration & Worksharing"] }
  ]
};

const CIVIL_SPECIALIZATION = {
  choice: true, title: "Choose Civil Engineering Specialization", recommended: "Structural Engineering",
  options: [
    { title: "Structural Engineering", topics: ["Structural Analysis Methods", "Reinforced Concrete Design", "Steel Structure Design", "Foundation Design", "Seismic Design Principles"] },
    { title: "Geotechnical Engineering", topics: ["Soil Mechanics", "Foundation Engineering", "Slope Stability Analysis", "Earth Retaining Structures", "Ground Improvement"] },
    { title: "Transportation Engineering", topics: ["Highway Geometric Design", "Traffic Engineering", "Pavement Design", "Transportation Planning", "Road Safety Audit"] }
  ]
};

// ════════════════════════════════════════════════════════════════
// CHOICE DEFINITIONS — Electrical / Electronics
// ════════════════════════════════════════════════════════════════

const EE_SIMULATION = {
  choice: true, title: "Choose Electrical Simulation Software", recommended: "MATLAB/Simulink",
  options: [
    { title: "MATLAB/Simulink", topics: ["MATLAB Programming", "Simulink Modeling", "Power Systems Simulation", "Control System Design", "Signal Processing"] },
    { title: "ETAP", topics: ["ETAP One-Line Diagrams", "Load Flow Analysis", "Short Circuit Analysis", "Protection Coordination", "Arc Flash Analysis"] },
    { title: "PSpice / LTspice", topics: ["Circuit Schematic Entry", "DC & AC Analysis", "Transient Simulation", "Parameter Sweeps", "SPICE Best Practices"] }
  ]
};

const PCB_CHOICE = {
  choice: true, title: "Choose PCB Design Software", recommended: "Altium Designer",
  options: [
    { title: "Altium Designer", topics: ["Schematic Capture", "PCB Layout & Routing", "Design Rules & Constraints", "Component Libraries", "Output Generation (Gerber/BOM)"] },
    { title: "KiCad", topics: ["Schematic Editor", "PCB Layout & Routing", "Library Management", "DRC & ERC", "KiCad Best Practices"] }
  ]
};

const FPGA_CHOICE = {
  choice: true, title: "Choose FPGA Platform", recommended: "Xilinx/Vivado",
  options: [
    { title: "Xilinx/Vivado", topics: ["Vivado IDE & Project Flow", "HDL Design Entry", "Simulation & Synthesis", "Implementation & Bitstream", "Vivado IP Integrator"] },
    { title: "Intel Quartus", topics: ["Quartus Prime IDE", "HDL Design Entry", "Analysis & Synthesis", "Place & Route", "In-System Debugging (SignalTap)"] }
  ]
};

const EE_SPECIALIZATION = {
  choice: true, title: "Choose Electrical Specialization", recommended: "Power Systems",
  options: [
    { title: "Power Systems", topics: ["Power Generation & Transmission", "Power System Analysis", "Substation Design", "Power Quality Analysis", "Smart Grid Technology"] },
    { title: "Power Electronics", topics: ["Power Semiconductor Devices", "DC-DC Converters", "Inverters & Rectifiers", "Motor Drives", "Power Electronics Control"] },
    { title: "Control Systems", topics: ["Classical Control Theory", "Modern Control Systems", "PID Controller Design", "PLC Programming", "Industrial Automation"] },
    { title: "Renewable Energy", topics: ["Solar PV System Design", "Wind Energy Systems", "Energy Storage Solutions", "Grid Integration", "Renewable Energy Economics"] }
  ]
};

const EE_POWER_SIM = {
  choice: true, title: "Choose Power Systems Software", recommended: "ETAP",
  options: [
    { title: "ETAP", topics: ["ETAP One-Line Diagrams", "Load Flow Analysis", "Short Circuit Studies", "Protection Coordination", "Arc Flash Analysis"] },
    { title: "MATLAB/Simulink", topics: ["Power System Modeling", "Transient Analysis", "Control System Simulation", "Renewable Energy Modeling", "Power Electronics Simulation"] },
    { title: "PSpice / LTspice", topics: ["Power Circuit Simulation", "Component Modeling", "Transient Analysis", "Efficiency Analysis", "SPICE Best Practices"] }
  ]
};

const EE_PROTECTION_SIM = {
  choice: true, title: "Choose Protection Study Software", recommended: "ETAP",
  options: [
    { title: "ETAP", topics: ["Protective Device Modeling", "Coordination Studies", "Arc Flash Analysis", "Relay Settings", "ETAP Relay Database"] },
    { title: "ASPEN OneLiner", topics: ["One-Line Diagram", "Relay Coordination", "Fault Analysis", "ASPEN Tools", "Reporting"] }
  ]
};

// ════════════════════════════════════════════════════════════════
// CHOICE DEFINITIONS — Chemical Engineering
// ════════════════════════════════════════════════════════════════

const CHEM_SIMULATION = {
  choice: true, title: "Choose Process Simulation Software", recommended: "Aspen Plus",
  options: [
    { title: "Aspen Plus", topics: ["Property Methods & Databases", "Unit Operations Modeling", "Distillation Column Design", "Heat Exchanger Design", "Process Optimization"] },
    { title: "Aspen HYSYS", topics: ["HYSYS Interface", "Fluid Characterization", "Process Simulation", "Dynamic Simulation", "Oil & Gas Applications"] },
    { title: "DWSIM", topics: ["DWSIM Fundamentals", "Unit Operations", "Separation Processes", "Reactor Modeling", "Open-Source Process Simulation"] }
  ]
};

const CHEM_SPECIALIZATION = {
  choice: true, title: "Choose Chemical Engineering Specialization", recommended: "Process Design",
  options: [
    { title: "Process Design", topics: ["Process Flow Diagrams", "Equipment Sizing & Selection", "Process Economics & Costing", "P&ID Development", "HAZOP Studies"] },
    { title: "Petroleum & Energy", topics: ["Refinery Operations", "Catalytic Cracking", "Petrochemical Plant Design", "Fuel Technology", "Energy Systems"] },
    { title: "Materials & Polymers", topics: ["Polymer Manufacturing", "Composite Materials", "Corrosion Engineering", "Materials Characterization", "Advanced Materials"] }
  ]
};

// ════════════════════════════════════════════════════════════════
// CHOICE DEFINITIONS — Agricultural
// ════════════════════════════════════════════════════════════════

const AGRI_GIS = {
  choice: true, title: "Choose GIS Software", recommended: "QGIS",
  options: [
    { title: "QGIS", topics: ["QGIS Interface & Navigation", "Vector & Raster Data", "Spatial Analysis", "Map Design & Export", "QGIS Plugins & Python"] },
    { title: "ArcGIS", topics: ["ArcGIS Pro Interface", "Data Management", "Spatial Analysis", "Geoprocessing Toolboxes", "ArcGIS Online"] }
  ]
};

// ════════════════════════════════════════════════════════════════
// CHOICE DEFINITIONS — Aerospace
// ════════════════════════════════════════════════════════════════

const AERO_CAD = {
  choice: true, title: "Choose Aerospace CAD Software", recommended: "CATIA",
  options: [
    { title: "CATIA", topics: ["CATIA V5 Interface", "Part & Assembly Design", "Surface Modeling", "Generative Drafting", "Aerospace Design Workflows"] },
    { title: "Siemens NX", topics: ["NX Interface", "Part Modeling", "Assembly Design", "NX Surface Modeling", "Aerospace Applications"] },
    { title: "SolidWorks", topics: ["SolidWorks Interface", "Part & Assembly", "Surface Modeling", "Simulation Basics", "Aerospace Applications"] }
  ]
};

const AERO_SIM = {
  choice: true, title: "Choose Simulation Software", recommended: "ANSYS",
  options: [
    { title: "ANSYS", topics: ["ANSYS Fluent for CFD", "Structural Analysis", "Aerodynamic Simulation", "Thermal Analysis", "Coupled Physics"] },
    { title: "MATLAB/Simulink", topics: ["Flight Dynamics Modeling", "GNC Algorithm Design", "System Simulation", "Signal Processing", "Control System Design"] },
    { title: "OpenFOAM", topics: ["OpenFOAM Fundamentals", "Mesh Generation", "CFD Solver Setup", "Post-Processing", "Aerodynamic Simulations"] }
  ]
};

const AERO_SPECIALIZATION = {
  choice: true, title: "Choose Aerospace Specialization", recommended: "Aerodynamics",
  options: [
    { title: "Aerodynamics", topics: ["Fluid Mechanics Fundamentals", "Boundary Layer Theory", "CFD Simulation", "Wind Tunnel Testing", "Aircraft Performance Analysis"] },
    { title: "Propulsion", topics: ["Jet Engine Principles", "Rocket Propulsion", "Propulsion System Design", "Combustion Theory", "Electric Propulsion"] },
    { title: "Avionics & GNC", topics: ["Flight Control Systems", "Navigation Systems", "Guidance Algorithms", "Avionics Integration", "Flight Simulation"] }
  ]
};

// ════════════════════════════════════════════════════════════════
// CHOICE DEFINITIONS — Industrial
// ════════════════════════════════════════════════════════════════

const IND_SIMULATION = {
  choice: true, title: "Choose Simulation/Optimization Tool", recommended: "Python (NumPy/SciPy)",
  options: [
    { title: "Python (NumPy/SciPy/Pandas)", topics: ["Python for Optimization", "Linear & Integer Programming", "Discrete Event Simulation", "Statistical Analysis", "Data Analysis with Pandas"] },
    { title: "MATLAB", topics: ["MATLAB Programming", "Optimization Toolbox", "Statistics & ML Toolbox", "Simulink for Discrete Event Simulation", "MATLAB for Operations Research"] },
    { title: "Arena / FlexSim", topics: ["Discrete Event Simulation", "Model Building", "Process Flow Modeling", "Resource & Queue Analysis", "Simulation Results Analysis"] }
  ]
};

// ════════════════════════════════════════════════════════════════
// GAME ENGINE CHOICE
// ════════════════════════════════════════════════════════════════

const GAME_ENGINE = {
  choice: true, title: "Choose Game Engine", recommended: "Unity",
  options: [
    { title: "Unity", topics: ["Unity Interface & Scene Management", "C# Scripting for Games", "Physics & Colliders", "UI System & Menus", "2D & 3D Game Development"] },
    { title: "Unreal Engine", topics: ["Unreal Editor & Blueprints", "C++ in Unreal", "Material Editor", "Level Design", "Unreal Gameplay Systems"] }
  ]
};

// ════════════════════════════════════════════════════════════════
// DESIGN SOFTWARE CHOICES
// ════════════════════════════════════════════════════════════════

const CAD_SOFTWARE = {
  choice: true, title: "Choose CAD Software", recommended: "AutoCAD",
  options: [
    { title: "AutoCAD", topics: ["2D Drafting & Annotations", "3D Modeling", "Layers & Blocks", "Dynamic Blocks", "AutoCAD Customization"] },
    { title: "SolidWorks", topics: ["Part Modeling", "Assembly Design", "Drawing & Detailing", "Simulation Basics", "SolidWorks Customization"] },
    { title: "Fusion 360", topics: ["Parametric Modeling", "Surface Modeling", "Sheet Metal", "CAM Manufacturing", "Fusion 360 Cloud Features"] }
  ]
};

// ════════════════════════════════════════════════════════════════
// APPLY CHOICES TO CAREERS
// ════════════════════════════════════════════════════════════════

const careerInserts = [
  // ── Software ──
  { career: "Software Engineer", section: "Software Architecture & Design", choices: [BACKEND_LANGUAGE, DATABASE_CHOICE, CLOUD_CHOICE] },
  { career: "Software Engineer", section: "DevOps & Deployment", after: "Version Control (Git)", choices: [CICD_CHOICE] },
  { career: "Full Stack Developer", section: "Frontend Framework", choices: [FRONTEND_FRAMEWORK, BACKEND_LANGUAGE] },
  { career: "Full Stack Developer", section: "Databases", choices: [DATABASE_CHOICE] },
  { career: "Full Stack Developer", section: "DevOps & Deployment", choices: [CLOUD_CHOICE] },
  { career: "Frontend Developer", section: "React / Framework", choices: [FRONTEND_FRAMEWORK] },
  { career: "Backend Developer", section: "Server-Side Foundations", choices: [BACKEND_LANGUAGE, DATABASE_CHOICE, CLOUD_CHOICE] },
  { career: "Cross-Platform Developer", section: "Cross-Platform Foundations", choices: [MOBILE_CHOICE] },
  { career: "Game Developer", section: "Game Development Foundations", choices: [GAME_ENGINE] },
  { career: "DevOps Engineer", section: "DevOps Foundations", choices: [CONTAINER_CHOICE, CLOUD_CHOICE] },
  { career: "DevOps Engineer", section: "CI/CD Pipelines", choices: [CICD_CHOICE] },
  { career: "DevOps Engineer", section: "Infrastructure as Code", choices: [IAC_CHOICE] },
  { career: "Site Reliability Engineer (SRE)", section: "SRE Fundamentals", choices: [CLOUD_CHOICE] },
  { career: "Platform Engineer", section: "Infrastructure as Code", choices: [IAC_CHOICE, CLOUD_CHOICE] },
  { career: "System Engineer", section: "Operating Systems", choices: [{ choice: true, title: "Choose Primary OS", recommended: "Linux",
    options: [
      { title: "Linux", topics: ["Linux Fundamentals", "Shell Scripting", "System Administration", "Linux Security", "Linux Networking"] },
      { title: "Windows Server", topics: ["Windows Server Fundamentals", "Active Directory", "PowerShell", "Windows Security", "Windows Networking"] }
    ]
  }] },

  // ── Data & AI ──
  { career: "Data Scientist", section: "Machine Learning", choices: [ML_FRAMEWORK] },
  { career: "Data Analyst", section: "Data Visualization", choices: [BI_PLATFORM] },
  { career: "Machine Learning Engineer", section: "Machine Learning Core", choices: [ML_FRAMEWORK] },
  { career: "AI Engineer", section: "Large Language Models", choices: [LLM_FRAMEWORK] },
  { career: "AI Engineer", section: "AI Foundations", choices: [ML_FRAMEWORK] },
  { career: "MLOps Engineer", section: "MLOps Fundamentals", choices: [ML_FRAMEWORK, CLOUD_CHOICE] },
  { career: "BI Developer", section: "Power BI", choices: [BI_PLATFORM] },

  // ── Cybersecurity ──
  { career: "SOC Analyst", section: "SIEM & Log Analysis", choices: [SIEM_CHOICE] },
  { career: "Security Analyst", section: "Security Monitoring", choices: [SIEM_CHOICE] },
  { career: "Penetration Tester", section: "Penetration Testing Foundations", choices: [PEN_TEST_PLATFORM] },
  { career: "Ethical Hacker", section: "Ethical Hacking Fundamentals", choices: [PEN_TEST_PLATFORM] },
  { career: "Security Engineer", section: "Cloud Security", choices: [CLOUD_CHOICE, SIEM_CHOICE] },
  { career: "Cloud Security Engineer", section: "Cloud Security Fundamentals", choices: [CLOUD_CHOICE] },

  // ── Cloud & Infrastructure ──
  { career: "AWS Cloud Engineer", section: "AWS Fundamentals", choices: [CLOUD_CHOICE] },
  { career: "Azure Engineer", section: "Azure Fundamentals", choices: [CLOUD_CHOICE] },
  { career: "GCP Engineer", section: "GCP Fundamentals", choices: [CLOUD_CHOICE] },
  { career: "Linux Administrator", section: "Linux Fundamentals", choices: [CONTAINER_CHOICE] },
  { career: "Database Administrator", section: "Database Fundamentals", choices: [DATABASE_CHOICE] },
  { career: "Kubernetes Engineer", section: "Kubernetes Fundamentals", choices: [CLOUD_CHOICE] },
  { career: "Infrastructure Engineer", section: "Infrastructure Fundamentals", choices: [IAC_CHOICE, CLOUD_CHOICE, CONTAINER_CHOICE] },

  // ── Embedded / Electronics ──
  { career: "FPGA Engineer", section: "FPGA Architecture", choices: [FPGA_CHOICE] },
  { career: "PCB Design Engineer", section: "PCB Design Foundations", choices: [PCB_CHOICE] },
  { career: "Electronics Design Engineer", section: "PCB Design", choices: [PCB_CHOICE] },
  { career: "VLSI Design Engineer", section: "Physical Design", choices: [FPGA_CHOICE] },
  { career: "ASIC Engineer", section: "ASIC Architecture", choices: [FPGA_CHOICE] },
  { career: "Embedded Engineer", section: "Embedded Foundations", choices: [{ choice: true, title: "Choose Embedded Platform", recommended: "STM32 (ARM Cortex-M)",
    options: [
      { title: "STM32 (ARM Cortex-M)", topics: ["STM32CubeIDE Setup", "GPIO & Peripheral Drivers", "Interrupts & DMA", "RTOS on STM32", "Communication (SPI/I2C/UART)"] },
      { title: "ESP32", topics: ["ESP-IDF Setup", "WiFi & Bluetooth", "GPIO & ADC", "FreeRTOS on ESP32", "MQTT & IoT Connectivity"] },
      { title: "Arduino (ATmega)", topics: ["Arduino IDE & C/C++", "Sensors & Actuators", "Communication Shields", "Library Ecosystem", "Arduino Projects"] },
      { title: "Raspberry Pi", topics: ["Linux on Raspberry Pi", "GPIO with Python/C", "Camera & Sensor Integration", "Networking Projects", "Pi as Embedded Server"] }
    ]
  }] },
  { career: "Control Systems Engineer", section: "Simulation & Design", choices: [EE_SIMULATION] },
  { career: "RF Engineer", section: "RF Simulation", choices: [{ choice: true, title: "Choose RF Simulation Tool", recommended: "MATLAB/Simulink",
    options: [
      { title: "MATLAB/Simulink", topics: ["RF Toolbox", "Antenna Design & Analysis", "Signal Processing", "RF System Simulation", "MATLAB for RF Engineering"] },
      { title: "ANSYS HFSS", topics: ["HFSS Interface", "Antenna Simulation", "Waveguide Analysis", "S-Parameter Extraction", "EM Simulation Best Practices"] }
    ]
  }] },
  { career: "Power Electronics Engineer", section: "Control & Simulation", choices: [EE_SIMULATION] },

  // ── Mechanical ──
  { career: "Mechanical Engineer", section: "Computer-Aided Engineering", choices: [MECH_CAD, MECH_SIMULATION, MECH_SPECIALIZATION] },
  { career: "Mechanical Design Engineer", section: "Engineering Graphics", choices: [MECH_CAD] },
  { career: "Mechanical Design Engineer", section: "3D CAD Modeling", choices: [MECH_SIMULATION] },
  { career: "CAD Engineer", section: "CAD Fundamentals", choices: [MECH_CAD] },
  { career: "CAE Engineer", section: "CAE Fundamentals", choices: [MECH_SIMULATION] },
  { career: "Manufacturing Engineer", section: "Manufacturing Fundamentals", choices: [MECH_CAD] },
  { career: "Automotive Engineer", section: "Automotive Fundamentals", choices: [MECH_CAD, MECH_SIMULATION] },
  { career: "HVAC Engineer", section: "HVAC Fundamentals", choices: [{ choice: true, title: "Choose HVAC Design Software", recommended: "Revit MEP",
    options: [
      { title: "Revit MEP", topics: ["Revit Interface for MEP", "HVAC Duct Design", "Piping Design", "Equipment Sizing", "Energy Analysis"] },
      { title: "AutoCAD MEP", topics: ["AutoCAD MEP Interface", "Duct & Pipe Routing", "Equipment Layout", "Schematic Design", "MEP Documentation"] }
    ]
  }] },

  // ── Civil ──
  { career: "Civil Engineer", section: "Software & Tools", choices: [CIVIL_BIM, CIVIL_STRUCTURAL] },
  { career: "Structural Engineer", section: "Structural Analysis", choices: [CIVIL_STRUCTURAL, CIVIL_BIM, CIVIL_SPECIALIZATION] },
  { career: "Site Engineer", section: "Construction Fundamentals", choices: [CIVIL_BIM] },
  { career: "Construction Engineer", section: "Construction Methods", choices: [CIVIL_BIM] },
  { career: "Geotechnical Engineer", section: "Soil Mechanics", choices: [{ choice: true, title: "Choose Geotech Software", recommended: "PLAXIS",
    options: [
      { title: "PLAXIS", topics: ["PLAXIS 2D Interface", "Soil Modeling", "Foundation Analysis", "Excavation Simulation", "PLAXIS Reporting"] },
      { title: "GeoStudio", topics: ["SLOPE/W Analysis", "SEEP/W Groundwater", "SIGMA/W Stress", "CTRAN/W Contaminant", "GeoStudio Suite"] }
    ]
  }] },
  { career: "Water Resources Engineer", section: "Software & GIS", choices: [AGRI_GIS, { choice: true, title: "Choose Hydrology Software", recommended: "HEC-HMS",
    options: [
      { title: "HEC-HMS", topics: ["Hydrologic Modeling", "Basin Configuration", "Precipitation-Runoff", "Flood Forecasting", "HEC-HMS Calibration"] },
      { title: "EPANET", topics: ["Water Distribution Modeling", "Network Analysis", "Water Quality Simulation", "EPANET Calibration", "EPANET Applications"] }
    ]
  }] },

  // ── Electrical ──
  { career: "Electrical Engineer", section: "Circuit Fundamentals", choices: [EE_SIMULATION] },
  { career: "Electrical Engineer", section: "Power Systems", choices: [EE_POWER_SIM] },
  { career: "Electrical Engineer", section: "Control Systems", choices: [EE_SIMULATION] },
  { career: "Electrical Design Engineer", section: "Software Tools", choices: [EE_SIMULATION] },
  { career: "Power Systems Engineer", section: "Software", choices: [EE_POWER_SIM] },
  { career: "Protection Engineer", section: "Software & Tools", choices: [EE_PROTECTION_SIM] },
  { career: "Renewable Energy Engineer", section: "Software", choices: [{ choice: true, title: "Choose Energy Simulation Tool", recommended: "PVsyst",
    options: [
      { title: "PVsyst", topics: ["PVsyst Project Setup", "PV System Sizing", "Shading Analysis", "Energy Yield Simulation", "PVsyst Reporting"] },
      { title: "HOMER Pro", topics: ["HOMER Interface", "Microgrid Sizing", "Technology Optimization", "Economic Analysis", "HOMER Best Practices"] }
    ]
  }] },

  // ── Chemical ──
  { career: "Chemical Engineer", section: "Process Design", choices: [CHEM_SIMULATION, CHEM_SPECIALIZATION] },
  { career: "Chemical Engineer", section: "Control & Instrumentation", choices: [EE_SIMULATION] },

  // ── Aerospace ──
  { career: "Aerospace Engineer", section: "Software & Simulation", choices: [AERO_CAD, AERO_SIM, AERO_SPECIALIZATION] },

  // ── Agricultural ──
  { career: "Agricultural Engineer", section: "Software & Tools for Agriculture", choices: [AGRI_GIS] },
  { career: "Agricultural Engineer", section: "Precision Agriculture & IoT", choices: [{ choice: true, title: "Choose Precision Ag Platform", recommended: "QGIS + IoT Sensors",
    options: [
      { title: "QGIS + IoT Sensors", topics: ["QGIS for Agriculture", "Soil Sensor Data", "Drone Mapping", "Crop Health Analysis", "Data Integration"] },
      { title: "ArcGIS + Remote Sensing", topics: ["ArcGIS for Agriculture", "Satellite Imagery Analysis", "NDVI & Vegetation Indices", "Yield Prediction", "ArcGIS Dashboards"] }
    ]
  }] },

  // ── Industrial ──
  { career: "Industrial Engineer", section: "Operations Research", choices: [IND_SIMULATION] },
  { career: "Industrial Engineer", section: "Quality Engineering", choices: [{ choice: true, title: "Choose Quality Software", recommended: "Minitab",
    options: [
      { title: "Minitab", topics: ["Minitab Interface", "Statistical Analysis", "Control Charts", "DOE (Design of Experiments)", "Regression Analysis"] },
      { title: "JMP", topics: ["JMP Interface", "Statistical Discovery", "DOE Builder", "Predictive Modeling", "JMP Scripting"] }
    ]
  }] },

  // ── Other ──
  { career: "GIS Engineer", section: "ArcGIS/QGIS", choices: [AGRI_GIS] },
  { career: "AR/VR Developer", section: "XR Fundamentals", choices: [{ choice: true, title: "Choose XR Engine", recommended: "Unity",
    options: [
      { title: "Unity", topics: ["Unity XR Toolkit", "VR Interaction", "AR Foundation", "Performance Optimization", "XR Publishing"] },
      { title: "Unreal Engine", topics: ["Unreal VR Framework", "Blueprint VR", "Unreal AR", "Unreal XR Optimization", "Unreal XR Publishing"] }
    ]
  }] },
];

let careersModified = 0;
let careerChoicesAdded = 0;

for (const { career, section, after, choices } of careerInserts) {
  let modified = false;
  for (const choice of choices) {
    let ok;
    if (after) {
      ok = insertAfterTopic(careerData.careers, career, section, after, choice);
    } else {
      ok = insertChoice(careerData.careers, career, section, choice);
    }
    if (ok) { careerChoicesAdded++; modified = true; }
  }
  if (modified) careersModified++;
}

console.log(`\n✅ Added ${careerChoicesAdded} choice nodes to ${careersModified} careers`);

// ════════════════════════════════════════════════════════════════
// APPLY CHOICES TO SKILLS
// ════════════════════════════════════════════════════════════════

const skillInserts = [
  { slug: "react", section: "State Management", choices: [{ choice: true, title: "Choose State Management Library", recommended: "Zustand",
    options: [
      { title: "Zustand", topics: ["Zustand Store Setup", "Selectors & Performance", "Middleware", "DevTools Integration", "Zustand Best Practices"] },
      { title: "Redux Toolkit", topics: ["Redux Store & Slices", "RTK Query", "Redux Middleware", "Redux DevTools", "Redux Best Practices"] },
      { title: "Jotai / Recoil", topics: ["Atomic State Model", "Derived State", "Async Atoms", "Performance Patterns", "When to Use Atoms"] }
    ]
  }] },
  { slug: "react", section: "Projects", choices: [{ choice: true, title: "Choose React Meta-Framework", recommended: "Next.js",
    options: [
      { title: "Next.js", topics: ["App Router & File-based Routing", "Server Components & Actions", "API Routes", "Deployment (Vercel)", "Next.js Performance"] },
      { title: "Remix", topics: ["Remix Loaders & Actions", "Nested Routes", "Form Handling", "Remix Deployment", "Remix Best Practices"] }
    ]
  }] },
  { slug: "python", section: "Web Development with Python", choices: [{ choice: true, title: "Choose Python Web Framework", recommended: "FastAPI",
    options: [
      { title: "FastAPI", topics: ["FastAPI Setup & Routing", "Pydantic Models", "Dependency Injection", "Async & Background Tasks", "Auto-Generated Docs"] },
      { title: "Django", topics: ["Django MVT Pattern", "Models & Migrations", "Views & Templates", "Django REST Framework", "Django Best Practices"] },
      { title: "Flask", topics: ["Flask Routing & Views", "Templates & Forms", "SQLAlchemy ORM", "Flask Extensions", "Flask Best Practices"] }
    ]
  }] },
  { slug: "javascript", section: "Node.js", choices: [{ choice: true, title: "Choose Node.js Framework", recommended: "Express.js",
    options: [
      { title: "Express.js", topics: ["Express Routing & Middleware", "REST API Design", "Error Handling", "Template Engines", "Express Best Practices"] },
      { title: "Fastify", topics: ["Fastify Schema-Based Routing", "Plugins & Hooks", "JSON Schema Validation", "Performance Optimization", "Fastify Best Practices"] },
      { title: "NestJS", topics: ["NestJS Modules & Controllers", "Services & Dependency Injection", "Guards & Interceptors", "Microservices", "NestJS Best Practices"] }
    ]
  }] },
  { slug: "csharp", section: ".NET Ecosystem", choices: [{ choice: true, title: "Choose .NET Web Framework", recommended: "ASP.NET Core",
    options: [
      { title: "ASP.NET Core", topics: ["ASP.NET Core MVC", "Razor Pages", "Blazor", "SignalR Real-time", "ASP.NET Core Best Practices"] },
      { title: "MAUI", topics: ["MAUI Cross-platform UI", "XAML for MAUI", "Platform Integration", "Navigation", "MAUI Best Practices"] }
    ]
  }] },
  { slug: "aws", section: "Compute & Containers", choices: [CLOUD_CHOICE] },
  { slug: "azure", section: "Compute Services", choices: [CLOUD_CHOICE] },
  { slug: "gcp", section: "Compute", choices: [CLOUD_CHOICE] },
  { slug: "docker", section: "Docker Fundamentals", choices: [CONTAINER_CHOICE] },
  { slug: "kubernetes", section: "Kubernetes Fundamentals", choices: [{ choice: true, title: "Choose Kubernetes Platform", recommended: "Managed Kubernetes (EKS/AKS/GKE)",
    options: [
      { title: "Managed Kubernetes (EKS/AKS/GKE)", topics: ["Managed K8s Setup", "Cluster Management", "Node Pools & Scaling", "Managed Service Integration", "Cost Optimization"] },
      { title: "Self-hosted Kubernetes", topics: ["kubeadm Setup", "Cluster Components", "Networking & CNI", "Storage & Volumes", "Self-hosted Maintenance"] }
    ]
  }] },
  { slug: "terraform", section: "Terraform Fundamentals", choices: [IAC_CHOICE] },
  { slug: "machine-learning", section: "ML Fundamentals", choices: [ML_FRAMEWORK] },
  { slug: "deep-learning", section: "Neural Network Fundamentals", choices: [ML_FRAMEWORK] },
  { slug: "nlp", section: "NLP Fundamentals", choices: [LLM_FRAMEWORK] },
  { slug: "generative-ai", section: "Generative AI Fundamentals", choices: [LLM_FRAMEWORK] },
  { slug: "cybersecurity-fundamentals", section: "Security Tools", choices: [PEN_TEST_PLATFORM] },
  { slug: "network-security", section: "Network Monitoring", choices: [SIEM_CHOICE] },
  { slug: "web-application-security", section: "Security Testing", choices: [PEN_TEST_PLATFORM] },
  { slug: "ethical-hacking", section: "Labs & Practice", choices: [PEN_TEST_PLATFORM] },
  { slug: "security-operations", section: "SIEM & Log Analysis", choices: [SIEM_CHOICE] },
  { slug: "pcb-design", section: "PCB Fundamentals", choices: [PCB_CHOICE] },
  { slug: "fpga-design", section: "FPGA Architecture", choices: [FPGA_CHOICE] },
  { slug: "vlsi-design", section: "Physical Design", choices: [FPGA_CHOICE] },
  { slug: "control-systems", section: "Simulation & Design", choices: [EE_SIMULATION] },
  { slug: "solidworks", section: "SolidWorks Fundamentals", choices: [MECH_CAD] },
  { slug: "matlab", section: "Simulink", choices: [{ choice: true, title: "Choose MATLAB Application Domain", recommended: "Control Systems",
    options: [
      { title: "Control Systems", topics: ["Transfer Functions", "Root Locus & Bode", "PID Tuning", "State-Space Design", "Digital Control"] },
      { title: "Signal Processing", topics: ["Digital Filters", "FFT Analysis", "Spectral Analysis", "Adaptive Filtering", "Signal Processing Applications"] },
      { title: "Image Processing", topics: ["Image I/O & Display", "Filtering & Enhancement", "Segmentation", "Feature Extraction", "Computer Vision with MATLAB"] }
    ]
  }] },
  { slug: "embedded-systems", section: "Embedded Fundamentals", choices: [{ choice: true, title: "Choose Embedded Platform", recommended: "STM32 (ARM Cortex-M)",
    options: [
      { title: "STM32 (ARM Cortex-M)", topics: ["STM32CubeIDE Setup", "GPIO & Peripheral Drivers", "Interrupts & DMA", "RTOS on STM32", "Communication (SPI/I2C/UART)"] },
      { title: "ESP32", topics: ["ESP-IDF Setup", "WiFi & Bluetooth", "GPIO & ADC", "FreeRTOS on ESP32", "MQTT & IoT"] },
      { title: "Arduino (ATmega)", topics: ["Arduino IDE & C/C++", "Sensors & Actuators", "Communication Shields", "Library Ecosystem", "Arduino Projects"] }
    ]
  }] },
  { slug: "robotics", section: "Robotics Fundamentals", choices: [{ choice: true, title: "Choose Robotics Platform", recommended: "ROS/ROS2",
    options: [
      { title: "ROS/ROS2", topics: ["ROS2 Nodes & Topics", "Services & Actions", "URDF & TF", "Navigation Stack", "ROS2 Best Practices"] },
      { title: "Arduino + ROS", topics: ["Arduino as ROS Node", "Sensor Integration", "Motor Control", "Arduino-ROS Bridge", "Arduino Robotics Projects"] }
    ]
  }] },
];

let skillsModified = 0;
let skillChoicesAdded = 0;

for (const { slug, section, choices } of skillInserts) {
  const skill = skillData.skills.find(s => s.slug === slug);
  if (!skill) { console.warn(`  ⚠ Skill not found: ${slug}`); continue; }
  const sec = skill.sections.find(s => s.title === section);
  if (!sec) { console.warn(`  ⚠ Section not found: ${slug} → ${section}`); continue; }
  if (!sec.topics) sec.topics = [];
  for (const choice of choices) {
    sec.topics.unshift(choice);
    skillChoicesAdded++;
    skillsModified++;
  }
}

console.log(`✅ Added ${skillChoicesAdded} choice nodes to ${skillsModified} skill sections`);

// ── Save ──
writeFileSync(CAREERS_SRC, JSON.stringify(careerData, null, 2), 'utf8');
writeFileSync(SKILLS_SRC, JSON.stringify(skillData, null, 2), 'utf8');
console.log(`\n📁 Saved updated source data.`);
