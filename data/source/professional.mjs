// Professional career skeletons — engineering, health & science, design,
// business, legal, education, creative and digital careers beyond software.
// Same shape as skeletons.mjs / nonit.mjs: an array of SEC sections whose
// children are SUB subsections or loose topic strings.

const SEC = (t, d, k) => ({ t, d, k });
const SUB = (t, k, o) => ({ t, k, o });

const B_SOFT = SUB("Soft Skills", [
  "Communication & collaboration",
  "Documentation & writing",
  "Time management",
  "Learning how to learn",
  "Professional ethics",
]);

export const PROFESSIONAL_SKELETONS = {
  // ── Engineering — traditional disciplines ────────────────────────────────
  "chemical-engineer": [
    SEC("Foundations", "The chemistry + engineering core.", [
      SUB("Core Sciences", ["Chemistry fundamentals", "Physics & mechanics", "Calculus & differential equations", "Material & energy balance"]),
      SUB("Chemical Core", ["Thermodynamics", "Fluid mechanics", "Heat & mass transfer", "Process engineering basics"]),
    ]),
    SEC("Process Engineering", "Design processes that scale.", [
      SUB("Reaction & Separation", ["Chemical reaction engineering", "Separation processes", "Distillation & extraction", "Process control basics"]),
      SUB("Process Design", ["Process flow diagrams", "Equipment design", "Piping & instrumentation", "Process simulation (Aspen)"]),
    ]),
    SEC("Professional Practice", "From design to plant floor.", [
      SUB("Safety & Environment", ["Process safety", "Hazard analysis (HAZOP)", "Environmental compliance", "Waste treatment"]),
      SUB("Industry & Career", ["Plant operations", "Quality & standards", "Licensure (FE/PE)", "Industry sectors (pharma, energy, FMCG)"]),
      B_SOFT,
    ]),
  ],

  "petroleum-engineer": [
    SEC("Foundations", "Geology, physics and the energy industry.", [
      SUB("Core Sciences", ["Physics & mechanics", "Chemistry basics", "Calculus & statistics", "Geology fundamentals"]),
      SUB("Reservoir Basics", ["Rock & fluid properties", "Reservoir engineering intro", "Drilling fundamentals", "Energy economics"]),
    ]),
    SEC("Core Petroleum", "The discipline in depth.", [
      SUB("Reservoir Engineering", ["Reservoir characterization", "Fluid flow in porous media", "Reserves estimation", "Simulation models"]),
      SUB("Drilling & Production", ["Drilling engineering", "Well design & completion", "Production operations", "Artificial lift & stimulation"]),
    ]),
    SEC("Field & Career", "Operate and advance.", [
      SUB("Field Operations", ["Well testing", "Production optimization", "HSE & safety", "Data analytics for wells"]),
      SUB("Career", ["Industry roles (upstream/midstream)", "Professional licensure", "Sustainability & transition energy", "Global energy outlook"]),
      B_SOFT,
    ]),
  ],

  "mining-engineer": [
    SEC("Foundations", "Earth science and engineering basics.", [
      SUB("Core Sciences", ["Physics & mechanics", "Chemistry basics", "Geology & mineralogy", "Mathematics & statistics"]),
      SUB("Mining Fundamentals", ["Mining methods overview", "Rock mechanics", "Surveying", "Mine safety principles"]),
    ]),
    SEC("Mining Engineering", "Extract responsibly.", [
      SUB("Design & Operations", ["Surface mining", "Underground mining", "Mine planning & design", "Drilling & blasting"]),
      SUB("Mineral Processing", ["Ore processing", "Crushing & grinding", "Flotation & separation", "Metallurgy basics"]),
    ]),
    SEC("Professional Practice", "Safe, sustainable mining.", [
      SUB("Safety & Environment", ["Mine health & safety", "Ventilation & ground control", "Environmental management", "Reclamation"]),
      SUB("Career", ["Mine management", "Valuation & economics", "Licensure (PE)", "Automation & digital mining"]),
      B_SOFT,
    ]),
  ],

  "aerospace-engineer": [
    SEC("Foundations", "Aeronautics, astronautics and the math behind flight.", [
      SUB("Core Sciences", ["Physics & mechanics", "Calculus & differential equations", "Fluid mechanics", "Materials science"]),
      SUB("Engineering Core", ["Engineering mechanics", "Thermodynamics", "Control systems basics", "Engineering drawing & CAD"]),
    ]),
    SEC("Aerospace Core", "Air and space vehicles.", [
      SUB("Aerodynamics", ["Aerodynamics", "Flight mechanics", "Propulsion systems", "Structures & loads"]),
      SUB("Systems & Design", ["Aircraft design", "Spacecraft systems", "Avionics & navigation", "Structural analysis (FEA)"]),
    ]),
    SEC("Industry & Career", "Work in aerospace.", [
      SUB("Tools & Standards", ["CAD (CATIA/SolidWorks)", "Simulation (MATLAB/Simulink)", "DO-178 & certification", "Test & validation"]),
      SUB("Career", ["Airframe / engines / space roles", "Defense & commercial sectors", "Graduate study paths", "Professional licensure"]),
      B_SOFT,
    ]),
  ],

  "automobile-engineer": [
    SEC("Foundations", "Mechanical engineering for vehicles.", [
      SUB("Core Sciences", ["Physics & mechanics", "Thermodynamics", "Materials science", "Engineering drawing"]),
      SUB("Auto Core", ["Internal combustion engines", "Vehicle dynamics", "Chassis & suspension", "Transmission systems"]),
    ]),
    SEC("Vehicle Systems", "Modern vehicle engineering.", [
      SUB("Powertrain", ["Engine design", "Electric powertrains", "Hybrid systems", "Fuel & emissions"]),
      SUB("Electronics & Safety", ["Automotive electronics", "ECUs & CAN bus", "Active safety systems", "Crashworthiness"]),
    ]),
    SEC("Industry & Career", "Design, build, launch.", [
      SUB("Tools & CAD", ["CATIA / SolidWorks", "CAE & FEA analysis", "NVH testing", "Prototyping"]),
      SUB("Career", ["OEM vs supplier roles", "EV & autonomous trends", "Quality & manufacturing", "Certifications"]),
      B_SOFT,
    ]),
  ],

  "industrial-engineer": [
    SEC("Foundations", "Optimize people, processes and systems.", [
      SUB("Core Sciences", ["Mathematics & statistics", "Physics basics", "Economics for engineers", "Engineering drawing"]),
      SUB("IE Fundamentals", ["Work study & methods", "Production planning", "Ergonomics", "Operations research intro"]),
    ]),
    SEC("Optimization & Systems", "The IE toolkit.", [
      SUB("Operations Research", ["Linear programming", "Queuing theory", "Simulation", "Decision analysis"]),
      SUB("Systems Design", ["Facility layout", "Supply chain basics", "Quality management (Six Sigma)", "Process improvement"]),
    ]),
    SEC("Career & Practice", "Improve everything you touch.", [
      SUB("Tools", ["Excel & data analytics", "SAP & ERP basics", "Arena / AnyLogic simulation", "Lean tools"]),
      SUB("Career", ["Manufacturing, logistics & services", "Lean Six Sigma certification", "Consulting paths", "Professional licensure"]),
      B_SOFT,
    ]),
  ],

  "manufacturing-engineer": [
    SEC("Foundations", "Materials, machines and production science.", [
      SUB("Core Sciences", ["Physics & mechanics", "Materials science", "Thermodynamics basics", "Engineering drawing"]),
      SUB("Manufacturing Core", ["Manufacturing processes", "Machining & forming", "Casting & welding", "CNC programming"]),
    ]),
    SEC("Production Systems", "Run a plant that performs.", [
      SUB("Process Engineering", ["Process planning", "Tooling & fixtures", "Quality control (SPC)", "Lean manufacturing"]),
      SUB("Automation", ["Robotics in manufacturing", "PLC & automation", "IoT & smart factory", "Additive manufacturing"]),
    ]),
    SEC("Career & Practice", "From line to leadership.", [
      SUB("Tools", ["CAD/CAM (SolidWorks, Mastercam)", "SAP / MES systems", "Six Sigma tools", "Simulation"]),
      SUB("Career", ["Production management", "Continuous improvement roles", "Industry 4.0 skills", "Certifications"]),
      B_SOFT,
    ]),
  ],

  "environmental-engineer": [
    SEC("Foundations", "Science for a cleaner world.", [
      SUB("Core Sciences", ["Chemistry", "Biology & ecology", "Physics & mechanics", "Mathematics & statistics"]),
      SUB("Environmental Core", ["Water & wastewater", "Air quality", "Soil & groundwater", "Environmental regulations"]),
    ]),
    SEC("Engineering Solutions", "Design systems that protect.", [
      SUB("Treatment Systems", ["Water treatment design", "Wastewater treatment", "Solid waste management", "Air pollution control"]),
      SUB("Sustainability", ["Environmental impact assessment", "Sustainability & ESG", "Renewable energy basics", "Remediation"]),
    ]),
    SEC("Career & Practice", "Engineer the future.", [
      SUB("Tools & Standards", ["GIS & modeling", "AutoCAD Civil 3D", "Environmental monitoring", "Compliance reporting"]),
      SUB("Career", ["Consulting & government roles", "Licensure (PE)", "ESG & corporate roles", "Climate & policy paths"]),
      B_SOFT,
    ]),
  ],

  "marine-engineer": [
    SEC("Foundations", "Ship systems and ocean engineering.", [
      SUB("Core Sciences", ["Physics & mechanics", "Thermodynamics", "Materials science", "Mathematics"]),
      SUB("Marine Core", ["Naval architecture basics", "Marine propulsion", "Ship systems", "Fluid & hydrodynamics"]),
    ]),
    SEC("Ship Systems", "Power and operate vessels.", [
      SUB("Propulsion & Power", ["Diesel engines", "Gas turbines & steam", "Electrical systems", "Shafting & propellers"]),
      SUB("Auxiliary Systems", ["HVAC & piping", "Fuel & ballast systems", "Pumping systems", "Automation & controls"]),
    ]),
    SEC("Career & Practice", "Work at sea and ashore.", [
      SUB("Operations", ["Shipboard operations", "Maintenance & drydocking", "Marine safety & SOLAS", "Surveys & classification"]),
      SUB("Career", ["Marine engineer officer (STCW)", "Ship design & shipyards", "Offshore & renewables", "Licensure & certification"]),
      B_SOFT,
    ]),
  ],

  "biomedical-engineer": [
    SEC("Foundations", "Engineering meets medicine.", [
      SUB("Core Sciences", ["Biology & human physiology", "Chemistry", "Physics & mechanics", "Calculus & statistics"]),
      SUB("Engineering Core", ["Circuit analysis", "Signals & systems", "Materials science", "Programming (MATLAB/Python)"]),
    ]),
    SEC("Biomedical Core", "Devices, imaging and biomechanics.", [
      SUB("Medical Devices", ["Biomedical instrumentation", "Medical device design", "Sensors & biosignals", "Medical imaging (MRI/CT/US)"]),
      SUB("Biomechanics & Biomaterials", ["Biomechanics", "Biomaterials", "Tissue engineering basics", "Rehabilitation engineering"]),
    ]),
    SEC("Regulatory & Career", "Bring devices to patients.", [
      SUB("Regulatory", ["FDA & CE marking", "ISO 13485", "Clinical trials basics", "Quality systems"]),
      SUB("Career", ["Device industry roles", "Hospitals & clinical engineering", "Research & graduate study", "Entrepreneurship in medtech"]),
      B_SOFT,
    ]),
  ],

  "materials-engineer": [
    SEC("Foundations", "The science of stuff.", [
      SUB("Core Sciences", ["Chemistry", "Physics", "Calculus & statistics", "Thermodynamics"]),
      SUB("Materials Core", ["Structure of materials", "Crystallography & defects", "Phase diagrams", "Mechanical properties"]),
    ]),
    SEC("Materials Families", "Metals, ceramics, polymers, composites.", [
      SUB("Families", ["Metals & alloys", "Ceramics & glasses", "Polymers", "Composites"]),
      SUB("Characterization", ["Microscopy (SEM/TEM)", "X-ray diffraction", "Mechanical testing", "Thermal analysis"]),
    ]),
    SEC("Application & Career", "Choose materials that matter.", [
      SUB("Applications", ["Materials selection", "Failure analysis", "Corrosion & degradation", "Nanomaterials & coatings"]),
      SUB("Career", ["Aerospace, auto & energy sectors", "Semiconductors & electronics", "Research & graduate study", "Professional licensure"]),
      B_SOFT,
    ]),
  ],

  "metallurgical-engineer": [
    SEC("Foundations", "Metals from ore to application.", [
      SUB("Core Sciences", ["Chemistry", "Physics", "Thermodynamics", "Mathematics"]),
      SUB("Metallurgy Core", ["Physical metallurgy", "Phase transformations", "Thermodynamics of materials", "Materials characterization"]),
    ]),
    SEC("Process Metallurgy", "Extract and refine.", [
      SUB("Extractive Metallurgy", ["Mineral processing", "Pyrometallurgy", "Hydrometallurgy", "Electrometallurgy"]),
      SUB("Manufacturing", ["Casting & solidification", "Hot & cold working", "Welding metallurgy", "Powder metallurgy"]),
    ]),
    SEC("Career & Practice", "Metals in industry.", [
      SUB("Advanced Topics", ["Alloy design", "Corrosion engineering", "Failure analysis", "Heat treatment"]),
      SUB("Career", ["Steel & non-ferrous industries", "Quality & inspection", "R&D roles", "Professional licensure"]),
      B_SOFT,
    ]),
  ],

  "robotics-engineer": [
    SEC("Foundations", "Mechanical + electrical + software.", [
      SUB("Core Sciences", ["Physics & mechanics", "Linear algebra & calculus", "Circuit analysis", "Programming (Python/C++)"]),
      SUB("Robotics Core", ["Robot kinematics", "Dynamics & control", "Sensors & actuators", "Microcontrollers (Arduino/ESP32)"]),
    ]),
    SEC("Robot Systems", "Build robots that work.", [
      SUB("Software", ["ROS / ROS 2", "Motion planning", "Computer vision", "SLAM & localization"]),
      SUB("Hardware", ["Motor control & drivers", "Embedded systems", "Mechanical design (CAD)", "3D printing & fabrication"]),
    ]),
    SEC("AI & Career", "Intelligent machines.", [
      SUB("Intelligence", ["Machine learning basics", "Reinforcement learning", "Perception & navigation", "Human-robot interaction"]),
      SUB("Career", ["Industrial automation", "Autonomous vehicles & drones", "Research & graduate study", "Robotics competitions & portfolio"]),
      B_SOFT,
    ]),
  ],

  "mechatronics-engineer": [
    SEC("Foundations", "Mechanics + electronics + computing.", [
      SUB("Core Sciences", ["Physics & mechanics", "Circuit analysis", "Calculus & differential equations", "Programming (C/Python)"]),
      SUB("Mechatronics Core", ["Sensors & transducers", "Actuators & motors", "Microcontrollers", "Signal processing"]),
    ]),
    SEC("Systems Integration", "Design smart systems.", [
      SUB("Control Systems", ["Control theory", "PID & state-space control", "PLC & industrial automation", "Embedded control"]),
      SUB("Mechanical Design", ["Mechanisms & linkages", "CAD & FEA", "Hydraulics & pneumatics", "Mechatronic system design"]),
    ]),
    SEC("Career & Practice", "From prototype to product.", [
      SUB("Tools", ["MATLAB/Simulink", "ROS basics", "LabVIEW", "3D printing & CNC"]),
      SUB("Career", ["Automation & manufacturing", "Automotive & EV systems", "Consumer electronics", "Robotics & drones"]),
      B_SOFT,
    ]),
  ],

  "engineering-manager": [
    SEC("Foundations", "Engineer first, leader second.", [
      SUB("Technical Base", ["Software or hardware fundamentals", "Systems thinking", "Architecture & design reviews", "Quality & reliability"]),
      SUB("Leadership Foundations", ["Management vs leadership", "1:1s & feedback", "Team motivation", "Emotional intelligence"]),
    ]),
    SEC("People Management", "Grow engineers.", [
      SUB("Team Development", ["Hiring & interviewing", "Onboarding & mentorship", "Performance reviews", "Career ladders & promotion"]),
      SUB("Communication", ["Stakeholder management", "Cross-team collaboration", "Conflict resolution", "Presentation & writing"]),
    ]),
    SEC("Delivery & Strategy", "Ship, then ship better.", [
      SUB("Delivery", ["Project & sprint management", "Estimation & planning", "Risk management", "Agile & Scrum leadership"]),
      SUB("Strategy", ["Roadmapping", "Resource planning", "Metrics & OKRs", "Budgeting & headcount"]),
    ]),
    SEC("Career Growth", "Level up as a leader.", [
      SUB("Advanced", ["Director track", "Org design", "Executive communication", "Change management"]),
      B_SOFT,
    ]),
  ],

  // ── Engineering — electronics & electrical ───────────────────────────────
  "electronics-engineer": [
    SEC("Foundations", "Circuits, signals and semiconductor physics.", [
      SUB("Core Sciences", ["Physics", "Mathematics (calculus, complex analysis)", "Chemistry basics", "Engineering drawing"]),
      SUB("Electronics Core", ["Circuit analysis", "Analog electronics", "Digital electronics", "Signals & systems"]),
    ]),
    SEC("Core Electronics", "Design electronic systems.", [
      SUB("Device & Circuits", ["Semiconductor devices", "Amplifiers & op-amps", "Power electronics", "Filters & oscillators"]),
      SUB("Digital Systems", ["Digital logic design", "Microprocessors & microcontrollers", "Embedded C", "FPGA basics"]),
    ]),
    SEC("Professional Practice", "From schematic to product.", [
      SUB("Tools & Lab", ["PCB design (KiCad/Altium)", "Circuit simulation (SPICE)", "Oscilloscope & lab skills", "Testing & validation"]),
      SUB("Career", ["Consumer electronics", "Industrial electronics", "EMI/EMC compliance", "Professional licensure"]),
      B_SOFT,
    ]),
  ],

  "instrumentation-engineer": [
    SEC("Foundations", "Measure, control, automate.", [
      SUB("Core Sciences", ["Physics", "Mathematics", "Circuit analysis", "Thermodynamics & process basics"]),
      SUB("Instrumentation Core", ["Sensors & transducers", "Measurement fundamentals", "Signal conditioning", "Control systems basics"]),
    ]),
    SEC("Process Control", "Automate industry.", [
      SUB("Control Systems", ["Process control theory", "PID tuning", "PLC & DCS systems", "SCADA systems"]),
      SUB("Instruments", ["Pressure & temperature", "Flow & level measurement", "Analytical instruments", "Valves & actuators"]),
    ]),
    SEC("Career & Practice", "The eyes and hands of industry.", [
      SUB("Tools & Standards", ["Instrument diagrams (P&ID)", "Loop drawings & calibration", "Safety instrumented systems", "HART & fieldbus"]),
      SUB("Career", ["Process industries (oil, pharma, power)", "Automation companies", "Control room operations", "Certifications"]),
      B_SOFT,
    ]),
  ],

  "power-systems-engineer": [
    SEC("Foundations", "Generation, transmission, distribution.", [
      SUB("Core Sciences", ["Physics & electromagnetism", "Mathematics", "Circuit analysis", "Electrical machines basics"]),
      SUB("Power Core", ["Power generation", "Transformers", "Transmission lines", "Switchgear & protection"]),
    ]),
    SEC("Power Engineering", "Keep the grid running.", [
      SUB("System Analysis", ["Load flow analysis", "Fault analysis", "Power system stability", "Power quality"]),
      SUB("Modern Grid", ["Smart grids", "Renewable integration", "Energy storage", "HVDC & FACTS"]),
    ]),
    SEC("Career & Practice", "Engineer the energy transition.", [
      SUB("Tools & Standards", ["ETAP / PSS/E", "AutoCAD Electrical", "IEC & IEEE standards", "Substation design"]),
      SUB("Career", ["Utilities & grid operators", "Renewables & solar/wind", "Consulting & EPC", "Professional licensure (PE)"]),
      B_SOFT,
    ]),
  ],

  "electronics-communication-engineer": [
    SEC("Foundations", "Circuits, signals and communication theory.", [
      SUB("Core Sciences", ["Physics", "Mathematics (calculus, probability)", "Circuit analysis", "Engineering drawing"]),
      SUB("ECE Core", ["Analog & digital electronics", "Signals & systems", "Electromagnetic fields", "Network theory"]),
    ]),
    SEC("Communication", "Move information at scale.", [
      SUB("Core Communications", ["Analog & digital communication", "Information theory", "Digital signal processing", "Communication networks"]),
      SUB("Wireless & RF", ["Antennas & propagation", "Wireless communication", "RF & microwave circuits", "5G fundamentals"]),
    ]),
    SEC("Career & Practice", "From circuits to telecom.", [
      SUB("Specializations", ["VLSI design", "Embedded systems", "IoT & sensors", "Optical communication"]),
      SUB("Tools & Career", ["MATLAB & Simulink", "Lab tools (VNA, spectrum)", "Telecom & semiconductor industry", "Graduate study paths"]),
      B_SOFT,
    ]),
  ],

  "electrical-electronics-engineer": [
    SEC("Foundations", "Electrical + electronics engineering.", [
      SUB("Core Sciences", ["Physics & electromagnetism", "Mathematics", "Chemistry basics", "Engineering drawing"]),
      SUB("EEE Core", ["Circuit analysis", "Electrical machines", "Analog & digital electronics", "Control systems"]),
    ]),
    SEC("Power & Machines", "The electrical heart of industry.", [
      SUB("Power Systems", ["Power generation & transmission", "Switchgear & protection", "Power electronics", "Electrical drives"]),
      SUB("Machines", ["DC & AC machines", "Transformers", "Machine design basics", "Motor control"]),
    ]),
    SEC("Electronics & Career", "Blend both worlds.", [
      SUB("Electronics", ["Microcontrollers & embedded", "Digital signal processing", "Renewable energy systems", "Electric vehicles"]),
      SUB("Career", ["Utilities & industrial plants", "EV & renewable industry", "Electrical contracting", "Licensure (PE)"]),
      B_SOFT,
    ]),
  ],

  // ── Engineering — computing & emerging ───────────────────────────────────
  "computer-engineer": [
    SEC("Foundations", "Hardware + software engineering.", [
      SUB("Core Sciences", ["Mathematics & discrete math", "Physics (digital logic basics)", "Programming fundamentals (C/Python)", "Data structures"]),
      SUB("Hardware Core", ["Digital logic design", "Computer architecture", "Operating systems", "Computer networks"]),
    ]),
    SEC("Systems Engineering", "Build the machine stack.", [
      SUB("Software", ["Object-oriented programming", "Algorithms", "Databases basics", "Software engineering practice"]),
      SUB("Hardware-Software", ["Embedded systems", "Microprocessors & microcontrollers", "FPGA & VLSI basics", "System-on-chip concepts"]),
    ]),
    SEC("Career & Practice", "Bridge chips and code.", [
      SUB("Advanced", ["Parallel computing", "GPU & accelerators", "Security & hardware trust", "Cloud & distributed systems"]),
      SUB("Career", ["Chip design & verification", "Embedded & IoT industry", "Systems software roles", "Graduate study paths"]),
      B_SOFT,
    ]),
  ],

  "computer-science-engineer": [
    SEC("Foundations", "Math, logic and programming.", [
      SUB("Core Sciences", ["Mathematics", "Discrete mathematics", "Probability & statistics", "Programming fundamentals"]),
      SUB("CS Core", ["Data structures", "Algorithms", "Object-oriented programming", "Computer organization"]),
    ]),
    SEC("Core Computer Science", "The depth of the degree.", [
      SUB("Systems", ["Operating systems", "Databases", "Computer networks", "Compiler design"]),
      SUB("Software", ["Software engineering", "Web technologies", "Software testing", "Design patterns"]),
    ]),
    SEC("Specialize & Career", "Pick your direction.", [
      SUB("Specializations", ["Machine learning & AI", "Cloud & distributed systems", "Cybersecurity", "Full-stack development"]),
      SUB("Career", ["Software engineer roles", "Coding interview prep", "Open-source & internships", "Graduate study paths"]),
      B_SOFT,
    ]),
  ],

  "information-technology": [
    SEC("Foundations", "Computers, networks and IT basics.", [
      SUB("Core IT", ["Computer fundamentals", "Operating systems", "Office & productivity tools", "Hardware & troubleshooting"]),
      SUB("Networking Basics", ["Networking fundamentals", "TCP/IP & DNS", "Wireless & LAN", "Network devices"]),
    ]),
    SEC("IT Operations", "Run technology for organizations.", [
      SUB("Systems Admin", ["Windows & Linux administration", "Virtualization", "Active Directory & users", "Backup & recovery"]),
      SUB("Infrastructure", ["Cloud fundamentals (AWS/Azure)", "Server management", "IT service management (ITIL)", "Security basics"]),
    ]),
    SEC("Career & Practice", "From helpdesk to architect.", [
      SUB("Tools & Skills", ["Scripting (PowerShell/Bash)", "Monitoring & ticketing tools", "Documentation", "Customer support skills"]),
      SUB("Career", ["Helpdesk → sysadmin → cloud", "Certifications (CompTIA, Azure, AWS)", "Networking roles", "Security roles"]),
      B_SOFT,
    ]),
  ],

  "vlsi-engineer": [
    SEC("Foundations", "Semiconductor physics and digital design.", [
      SUB("Core Sciences", ["Physics (semiconductors)", "Mathematics", "Digital logic design", "Electronics basics"]),
      SUB("VLSI Core", ["Digital design with Verilog/VHDL", "Computer architecture", "Circuit analysis", "EDA tooling"]),
    ]),
    SEC("Chip Design", "Design silicon.", [
      SUB("Frontend Design", ["RTL design", "Functional verification (UVM)", "Static timing analysis", "Synthesis & DFT"]),
      SUB("Backend Design", ["Floorplanning & placement", "Routing & physical design", "DRC/LVS & signoff", "Analog & mixed-signal basics"]),
    ]),
    SEC("Industry & Career", "Work in semiconductors.", [
      SUB("Advanced", ["System-on-chip (SoC)", "Low-power design", "Memory design", "Advanced nodes (FinFET)"]),
      SUB("Career", ["Chip design companies", "FPGA & emulation roles", "EDA industry", "Graduate study paths"]),
      B_SOFT,
    ]),
  ],

  "quantum-computing": [
    SEC("Foundations", "The physics and math of quantum.", [
      SUB("Mathematics", ["Linear algebra", "Probability & complex numbers", "Group theory basics", "Programming (Python)"]),
      SUB("Physics", ["Quantum mechanics", "Superposition & entanglement", "Qubits & states", "Measurement"]),
    ]),
    SEC("Quantum Computing", "The model.", [
      SUB("Core Concepts", ["Quantum gates & circuits", "Quantum algorithms", "Error correction basics", "Quantum complexity"]),
      SUB("Programming", ["Qiskit / Cirq", "Quantum simulators", "IBM Quantum / AWS Braket", "Hybrid quantum-classical"]),
    ]),
    SEC("Career & Research", "Frontier field.", [
      SUB("Applications", ["Quantum chemistry", "Optimization (QAOA)", "Machine learning + quantum", "Cryptography (post-quantum)"]),
      SUB("Career", ["Quantum software roles", "Hardware & cryogenics", "Research & PhD paths", "Industry labs & startups"]),
      B_SOFT,
    ]),
  ],

  // ── Health & Science ─────────────────────────────────────────────────────
  dentist: [
    SEC("Foundations", "Pre-dental science.", [
      SUB("Pre-Dental", ["Biology & chemistry", "Physics basics", "DAT preparation", "Study discipline"]),
      SUB("Dental Science", ["Human anatomy & physiology", "Oral anatomy", "Biochemistry", "Microbiology"]),
    ]),
    SEC("Core Dentistry", "Clinical dental education.", [
      SUB("Clinical Sciences", ["Dental materials", "Oral pathology", "Pharmacology for dentistry", "Radiology"]),
      SUB("Clinical Skills", ["Operative dentistry", "Endodontics", "Periodontics", "Prosthodontics", "Oral surgery basics"]),
    ]),
    SEC("Career & Practice", "The professional path.", [
      SUB("Clinical Practice", ["Patient management", "Preventive dentistry", "Pediatric dentistry", "Orthodontics basics"]),
      SUB("Career", ["Dental licensure", "Residency & specialization", "Private practice", "Public health dentistry"]),
      B_SOFT,
    ]),
  ],

  physiotherapist: [
    SEC("Foundations", "Human body and movement science.", [
      SUB("Pre-Professional", ["Biology & anatomy", "Physiology", "Physics & biomechanics basics", "Psychology basics"]),
      SUB("Movement Science", ["Kinesiology", "Musculoskeletal anatomy", "Neuroanatomy", "Exercise physiology"]),
    ]),
    SEC("Physiotherapy Core", "Assess, treat, rehabilitate.", [
      SUB("Assessment", ["Patient assessment", "Gait analysis", "Manual muscle testing", "Range of motion & special tests"]),
      SUB("Interventions", ["Therapeutic exercise", "Manual therapy", "Electrotherapy", "Rehabilitation protocols"]),
    ]),
    SEC("Specialization & Career", "Grow your practice.", [
      SUB("Specializations", ["Sports physiotherapy", "Orthopedic physiotherapy", "Neurological rehabilitation", "Cardiopulmonary rehab"]),
      SUB("Career", ["Licensure & certification", "Clinical practice", "Sports teams & clinics", "Research & graduate study"]),
      B_SOFT,
    ]),
  ],

  nutritionist: [
    SEC("Foundations", "Nutrition science.", [
      SUB("Core Science", ["Biology & human physiology", "Chemistry & biochemistry", "Food science basics", "Microbiology"]),
      SUB("Nutrition Core", ["Macronutrients & micronutrients", "Digestion & metabolism", "Dietary guidelines", "Nutrition assessment"]),
    ]),
    SEC("Applied Nutrition", "Turn science into plans.", [
      SUB("Clinical Nutrition", ["Medical nutrition therapy", "Disease-specific diets", "Weight management", "Sports nutrition"]),
      SUB("Practice Skills", ["Diet planning", "Food labeling & claims", "Behavior change counseling", "Food safety"]),
    ]),
    SEC("Career & Credentials", "The professional nutritionist.", [
      SUB("Career", ["Registered Dietitian path", "Clinical & community roles", "Wellness & corporate nutrition", "Content & consulting"]),
      B_SOFT,
    ]),
  ],

  "medical-laboratory-scientist": [
    SEC("Foundations", "Lab science fundamentals.", [
      SUB("Core Science", ["Biology & chemistry", "Anatomy & physiology", "Biochemistry", "Microbiology basics"]),
      SUB("Lab Fundamentals", ["Lab safety & quality", "Specimen collection & handling", "Microscopy", "Lab instrumentation"]),
    ]),
    SEC("Laboratory Disciplines", "The diagnostic departments.", [
      SUB("Core Disciplines", ["Hematology", "Clinical chemistry", "Immunology & serology", "Clinical microbiology"]),
      SUB("Advanced", ["Molecular diagnostics (PCR)", "Blood banking & transfusion", "Urinalysis & body fluids", "Histopathology basics"]),
    ]),
    SEC("Career & Practice", "Behind every diagnosis.", [
      SUB("Professional", ["Lab quality control", "Accreditation & standards", "Automation & LIS", "Emerging diagnostics"]),
      SUB("Career", ["Certification & licensure", "Hospital & reference labs", "Research & industry", "Specialist tracks"]),
      B_SOFT,
    ]),
  ],

  biotechnologist: [
    SEC("Foundations", "Biology meets engineering.", [
      SUB("Core Science", ["Cell & molecular biology", "Chemistry & biochemistry", "Genetics", "Mathematics & statistics"]),
      SUB("Biotech Core", ["Microbiology", "Genetic engineering", "Enzyme & fermentation technology", "Bioinformatics basics"]),
    ]),
    SEC("Biotech Applications", "Solve real problems.", [
      SUB("Industry Applications", ["Pharmaceutical biotechnology", "Agriculture & GM crops", "Environmental biotechnology", "Food biotechnology"]),
      SUB("Lab Skills", ["Molecular biology techniques", "Cell culture", "Protein purification", "Analytical techniques"]),
    ]),
    SEC("Career & Research", "From lab to industry.", [
      SUB("Career", ["Biotech & pharma industry", "Research labs & academia", "Regulatory affairs (FDA/EMA)", "Biotech entrepreneurship"]),
      B_SOFT,
    ]),
  ],

  // ── Architecture & Design ────────────────────────────────────────────────
  "urban-planner": [
    SEC("Foundations", "Cities, society and design.", [
      SUB("Core Knowledge", ["Urban studies", "Geography & demography", "Economics basics", "Environmental science"]),
      SUB("Planning Basics", ["Urban planning history", "Land use planning", "Zoning & regulations", "Community engagement"]),
    ]),
    SEC("Planning Practice", "Shape cities.", [
      SUB("Design & Analysis", ["Urban design", "Transportation planning", "Housing & neighborhoods", "GIS & spatial analysis"]),
      SUB("Policy & Law", ["Planning law & policy", "Environmental planning", "Economic development", "Public participation"]),
    ]),
    SEC("Career & Professional", "The planning profession.", [
      SUB("Tools", ["GIS (ArcGIS/QGIS)", "SketchUp / AutoCAD", "Data analysis & modeling", "Urban analytics"]),
      SUB("Career", ["Government & municipal roles", "Planning consultancies", "Real estate & development", "Certification (AICP/RTPI)"]),
      B_SOFT,
    ]),
  ],

  "industrial-designer": [
    SEC("Foundations", "Design thinking + manufacturing.", [
      SUB("Design Fundamentals", ["Design principles", "Sketching & drawing", "Color & materials", "Design history"]),
      SUB("Technology", ["Manufacturing processes", "Materials & finishes", "Ergonomics", "CAD fundamentals"]),
    ]),
    SEC("Product Design", "Design objects people love.", [
      SUB("Design Process", ["User research", "Concept development", "Prototyping", "Design for manufacturing"]),
      SUB("Tools", ["CAD (SolidWorks/Fusion)", "3D modeling & rendering", "3D printing", "Design presentation"]),
    ]),
    SEC("Career & Portfolio", "The product designer's path.", [
      SUB("Specializations", ["Consumer products", "Furniture design", "Automotive design", "Medical devices"]),
      SUB("Career", ["Industrial design portfolio", "In-house vs studio roles", "Freelance & consulting", "Design awards & competitions"]),
      B_SOFT,
    ]),
  ],

  "product-designer": [
    SEC("Foundations", "Design + product thinking.", [
      SUB("Design Core", ["Design fundamentals", "Visual design principles", "UX basics", "Design research"]),
      SUB("Product Thinking", ["Product lifecycle", "User-centered design", "Business acumen", "Data-informed design"]),
    ]),
    SEC("Design Practice", "Ship products end to end.", [
      SUB("UX/UI Craft", ["User research & interviews", "Wireframing & prototyping (Figma)", "Usability testing", "Interaction design"]),
      SUB("Delivery", ["Design systems", "Cross-functional collaboration", "Design handoff", "Iterating with data"]),
    ]),
    SEC("Career & Portfolio", "The product design career.", [
      SUB("Career", ["Product design portfolio", "Design roles (junior → staff)", "Design interviews (portfolio/whiteboard)", "Freelance & consulting"]),
      B_SOFT,
    ]),
  ],

  "animation-artist": [
    SEC("Foundations", "Art, motion and storytelling.", [
      SUB("Art Fundamentals", ["Drawing & anatomy", "Color theory", "Composition & staging", "Storytelling basics"]),
      SUB("Animation Principles", ["12 principles of animation", "Timing & spacing", "Keyframes & in-betweens", "Walk cycles & body mechanics"]),
    ]),
    SEC("Animation Craft", "Bring characters to life.", [
      SUB("Software", ["After Effects", "Blender", "Toon Boom / TVPaint", "Maya basics"]),
      SUB("Techniques", ["2D animation", "3D animation", "Motion graphics", "Character rigging"]),
    ]),
    SEC("Career & Portfolio", "The animation industry.", [
      SUB("Industry", ["Animation showreel", "Studio roles (film, games, ads)", "Freelance & remote work", "Motion design for brands"]),
      B_SOFT,
    ]),
  ],

  // ── Business & Finance ───────────────────────────────────────────────────
  "marketing-manager": [
    SEC("Foundations", "Marketing fundamentals and strategy.", [
      SUB("Marketing Core", ["Marketing fundamentals", "Brand & positioning", "Market research", "Consumer behavior"]),
      SUB("Strategy", ["Marketing strategy", "Segmentation & targeting", "Marketing mix (4Ps)", "Budgeting & ROI"]),
    ]),
    SEC("Channels & Execution", "Own the full funnel.", [
      SUB("Digital Channels", ["Digital marketing", "Content & social strategy", "SEO & SEM", "Email & automation"]),
      SUB("Offline & Brand", ["Campaign management", "PR & partnerships", "Events & sponsorships", "Brand guidelines"]),
    ]),
    SEC("Leadership & Career", "Lead marketing teams.", [
      SUB("Analytics & Leadership", ["Marketing analytics (GA4)", "A/B testing & CRO", "Team management", "Agency management"]),
      SUB("Career", ["Marketing manager roles", "Marketing stack & tools", "Certifications (Google, HubSpot)", "From manager to CMO"]),
      B_SOFT,
    ]),
  ],

  "sales-manager": [
    SEC("Foundations", "Sales fundamentals.", [
      SUB("Sales Core", ["Sales process & methodology", "Prospecting & lead generation", "Needs analysis & discovery", "Negotiation fundamentals"]),
      SUB("Communication", ["Pitching & presentations", "Objection handling", "Relationship building", "Closing techniques"]),
    ]),
    SEC("Sales Operations", "Run the numbers.", [
      SUB("Operations", ["CRM management (Salesforce)", "Sales pipelines & forecasting", "KPIs & quotas", "Sales enablement"]),
      SUB("Strategy", ["Territory planning", "Account management", "Key account strategy", "Pricing & proposals"]),
    ]),
    SEC("Leadership & Career", "Lead the team.", [
      SUB("Leadership", ["Hiring & training reps", "Coaching & 1:1s", "Compensation plans", "Motivation & retention"]),
      SUB("Career", ["Sales manager roles (SDR → AE → Manager)", "SaaS & enterprise sales", "Revenue operations", "VP of Sales path"]),
      B_SOFT,
    ]),
  ],

  // ── Legal ────────────────────────────────────────────────────────────────
  "corporate-legal-advisor": [
    SEC("Foundations", "Law school basics + corporate context.", [
      SUB("Legal Foundation", ["Contracts law", "Company law & governance", "Corporate compliance", "Legal writing"]),
      SUB("Business Context", ["Business fundamentals", "Finance for lawyers", "Negotiation skills", "Risk management"]),
    ]),
    SEC("Corporate Law Practice", "Advise businesses.", [
      SUB("Core Areas", ["M&A transactions", "Corporate governance", "Employment law", "Intellectual property"]),
      SUB("Practice Skills", ["Due diligence", "Contract drafting & review", "Board advisory", "Regulatory filings"]),
    ]),
    SEC("Career & Professional", "In-house and beyond.", [
      SUB("Career", ["In-house counsel roles", "Law firm corporate practice", "Bar admission & licensure", "Legal technology"]),
      B_SOFT,
    ]),
  ],

  "legal-consultant": [
    SEC("Foundations", "Legal knowledge for advisory work.", [
      SUB("Legal Foundation", ["Contracts & commercial law", "Regulatory compliance", "Legal research", "Legal writing"]),
      SUB("Advisory Skills", ["Risk assessment", "Advisory frameworks", "Client communication", "Ethics & confidentiality"]),
    ]),
    SEC("Consulting Practice", "Advise without practicing law.", [
      SUB("Specialties", ["Compliance consulting", "Regulatory affairs", "Contract management", "Policy advisory"]),
      SUB("Delivery", ["Audits & assessments", "Policies & procedures", "Training & workshops", "Reporting"]),
    ]),
    SEC("Career & Growth", "The consulting path.", [
      SUB("Career", ["Big Four & consulting firms", "Independent consulting", "Compliance officer track", "Certifications (CAMS, CCEP)"]),
      B_SOFT,
    ]),
  ],

  // ── Education ────────────────────────────────────────────────────────────
  "education-consultant": [
    SEC("Foundations", "Education systems and counseling.", [
      SUB("Education Core", ["Education systems", "Curriculum design", "Learning theories", "Student assessment"]),
      SUB("Counseling Skills", ["Student counseling", "Career guidance", "Communication skills", "Parent engagement"]),
    ]),
    SEC("Consulting Practice", "Guide students and institutions.", [
      SUB("Services", ["College admissions consulting", "Study abroad advising", "Career counseling", "Institutional consulting"]),
      SUB("Knowledge", ["University systems worldwide", "Scholarships & financial aid", "Visa & application processes", "Test prep landscape"]),
    ]),
    SEC("Career & Business", "Build your practice.", [
      SUB("Career", ["Admissions offices", "Education consultancies", "Independent practice", "EdTech roles"]),
      B_SOFT,
    ]),
  ],

  // ── Creative ─────────────────────────────────────────────────────────────
  videographer: [
    SEC("Foundations", "Camera, light and story.", [
      SUB("Camera & Optics", ["Camera fundamentals", "Lenses & focal lengths", "Exposure & settings", "Composition"]),
      SUB("Lighting & Audio", ["Lighting fundamentals", "Three-point lighting", "Audio capture", "Microphones"]),
    ]),
    SEC("Shooting & Editing", "From raw footage to story.", [
      SUB("Shooting", ["Shot types & coverage", "Camera movement", "Interview filming", "B-roll techniques"]),
      SUB("Post-Production", ["Video editing (Premiere/DaVinci)", "Color grading", "Sound design & mixing", "Motion graphics basics"]),
    ]),
    SEC("Career & Business", "Professional videography.", [
      SUB("Genres", ["Events & weddings", "Corporate video", "Documentary", "YouTube & social content"]),
      SUB("Career", ["Portfolio & showreel", "Client workflow & pricing", "Gear & equipment", "Freelance vs studio"]),
      B_SOFT,
    ]),
  ],

  "music-producer": [
    SEC("Foundations", "Music theory and the DAW.", [
      SUB("Music Fundamentals", ["Music theory", "Rhythm & time", "Ear training", "Songwriting basics"]),
      SUB("Production Tools", ["DAW mastery (Ableton/Logic)", "MIDI & virtual instruments", "Audio recording", "Signal flow"]),
    ]),
    SEC("Production Craft", "Produce and mix.", [
      SUB("Producing", ["Beat making", "Arrangement", "Sound design & synthesis", "Sampling"]),
      SUB("Mixing & Mastering", ["Mixing fundamentals", "EQ & compression", "Reverb & effects", "Mastering basics"]),
    ]),
    SEC("Career & Business", "Make music for a living.", [
      SUB("Career", ["Producer portfolio & credits", "Working with artists", "Sync licensing & royalties", "Distribution & release strategy"]),
      B_SOFT,
    ]),
  ],

  "content-creator": [
    SEC("Foundations", "Create, distribute, engage.", [
      SUB("Creation Fundamentals", ["Content strategy", "Storytelling", "Video & photo basics", "Writing & scripting"]),
      SUB("Platforms", ["YouTube", "Instagram & TikTok", "LinkedIn & X", "Newsletters & blogs"]),
    ]),
    SEC("Content Systems", "Produce consistently.", [
      SUB("Production", ["Content calendar & workflow", "Editing (video/photo)", "Trends & formats", "AI tools for creators"]),
      SUB("Growth", ["Algorithm & SEO basics", "Audience building", "Community engagement", "Analytics & iteration"]),
    ]),
    SEC("Monetization & Career", "Turn content into income.", [
      SUB("Monetization", ["Sponsorships & brand deals", "Affiliate marketing", "Digital products & courses", "Memberships (Patreon)"]),
      SUB("Career", ["Creator brand & positioning", "Pitch decks & rates", "Contracts & rights", "Agency representation"]),
      B_SOFT,
    ]),
  ],

  // ── Digital careers ──────────────────────────────────────────────────────
  "email-marketing-specialist": [
    SEC("Foundations", "Email strategy and the funnel.", [
      SUB("Marketing Fundamentals", ["Digital marketing basics", "Email marketing fundamentals", "List building & segmentation", "Email strategy & goals"]),
      SUB("Compliance", ["CAN-SPAM & GDPR", "Consent & opt-ins", "Deliverability basics", "Privacy best practices"]),
    ]),
    SEC("Campaign Craft", "Design emails that convert.", [
      SUB("Content & Design", ["Email copywriting", "Email design & templates", "Mobile-first design", "CTA optimization"]),
      SUB("Automation", ["Drip campaigns", "Lifecycle email", "Behavioral triggers", "A/B testing"]),
    ]),
    SEC("Tools & Career", "Run the channel.", [
      SUB("Tools", ["Email platforms (Klaviyo, Mailchimp)", "ESP setup & workflows", "Analytics & reporting", "Deliverability tools"]),
      SUB("Career", ["Email marketing roles", "Metrics: open, CTR, revenue", "E-commerce & SaaS focus", "Certifications"]),
      B_SOFT,
    ]),
  ],

  "performance-marketing-specialist": [
    SEC("Foundations", "Paid media fundamentals.", [
      SUB("Marketing Core", ["Digital marketing basics", "Paid media landscape", "Attribution models", "Funnel & conversion thinking"]),
      SUB("Platforms", ["Google Ads", "Meta Ads", "TikTok & LinkedIn Ads", "Programmatic basics"]),
    ]),
    SEC("Campaign Execution", "Spend that converts.", [
      SUB("Campaign Management", ["Campaign structure & setup", "Bidding strategies", "Audience targeting", "Creative testing"]),
      SUB("Optimization", ["CRO & landing pages", "A/B testing at scale", "Budget allocation", "Scaling campaigns"]),
    ]),
    SEC("Analytics & Career", "Prove the return.", [
      SUB("Analytics", ["GA4 & conversion tracking", "Attribution & incrementality", "Dashboards & reporting", "ROAS & CAC analysis"]),
      SUB("Career", ["Performance marketing roles", "Growth marketing path", "E-commerce & DTC focus", "Certifications (Google, Meta)"]),
      B_SOFT,
    ]),
  ],
};
