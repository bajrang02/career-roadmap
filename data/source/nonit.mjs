// Non-IT roadmap skeletons (marketing, finance, HR, healthcare, education, creative, operations, government exams…)
import { B_SOFT } from "./skeletons.mjs";

const SEC = (t, d, k) => ({ t, d, k });
const SUB = (t, k, o) => ({ t, k, o });

export const NON_IT_SKELETONS = {
  "digital-marketing": [
    SEC("Foundations", "The marketing mindset and the modern channel landscape.", [
      SUB("Marketing Fundamentals", ["Digital marketing", "Marketing funnels & journeys", "Brand & positioning", "Customer segments & personas", "Marketing analytics basics"]),
      SUB("Strategy & Planning", ["Go-to-market strategy", "Channel selection", "Budgeting & ROI", "Campaign planning", "Marketing calendars"]),
    ]),
    SEC("Core Channels", "The channels every marketer must master.", [
      SUB("Content & SEO", ["Content marketing", "SEO", "Blog & content strategy", "Repurposing content"]),
      SUB("Social & Community", ["Social media marketing", "Platform strategies", "Community management", "Influencer marketing"]),
      SUB("Email & Automation", ["Email marketing", "Newsletter strategy", "Marketing automation", "CRM & lifecycle email"]),
      SUB("Paid Media", ["Google Ads", "Meta Ads", "Paid social strategy", "Retargeting", "Landing pages & CRO"]),
    ]),
    SEC("Analytics & Optimization", "Prove it, then improve it.", [
      SUB("Measurement", ["Google Analytics 4", "Conversion tracking", "Dashboards & reporting", "Attribution models"]),
      SUB("Experimentation", ["A/B testing", "CRO fundamentals", "Growth loops", "Iteration frameworks"]),
    ]),
    SEC("Tools & Career", "The marketer's toolbox and growth path.", [
      SUB("Marketing Stack", ["Marketing tools", "CRM basics (HubSpot)", "Design tools (Canva)", "AI tools for marketing"]),
      B_SOFT,
      SUB("Career & Certifications", ["Google certifications", "HubSpot Academy", "Meta Blueprint", "Marketing portfolio"]),
    ]),
  ],

  seo: [
    SEC("Foundations", "How search engines decide what ranks.", [
      SUB("Search Fundamentals", ["How search engines work", "SERP features", "Search intent", "E-E-A-T & helpful content"]),
      SUB("Foundations", ["Keyword research", "Competitor analysis", "Content gap analysis", "SEO analytics basics"]),
    ]),
    SEC("On-Page SEO", "Optimize what you control.", [
      SUB("On-Page", ["Title tags & meta", "Content optimization", "Internal linking", "URL structure", "Schema & structured data"]),
      SUB("Content SEO", ["Content strategy", "Topical authority", "Content briefs", "E-commerce SEO"]),
    ]),
    SEC("Technical SEO", "Make sites crawlable and fast.", [
      SUB("Technical", ["Crawlability & indexing", "Site speed & Core Web Vitals", "Mobile & Core Web Vitals", "Sitemaps & robots", "Core Web Vitals"]),
      SUB("Tools", ["Google Search Console", "Ahrefs / Semrush", "Screaming Frog", "GA4 integration"]),
    ]),
    SEC("Off-Page & Authority", "Build trust and links.", [
      SUB("Link Building", ["Link building", "Digital PR", "Guest posting", "Authority & trust"]),
      SUB("Local & International", ["Local SEO", "International SEO", "Multi-language hreflang"]),
    ]),
    SEC("Career & Portfolio", "Prove your skills.", [
      SUB("Portfolio", ["A full site audit", "A ranking case study", "A keyword strategy", "An SEO playbook"], true),
      B_SOFT,
      SUB("Certifications", ["Google SEO courses", "Semrush Academy", "Ahrefs Academy"]),
    ]),
  ],

  "content-writer": [
    SEC("Foundations", "Writing craft and research.", [
      SUB("Writing Fundamentals", ["Writing basics", "Storytelling", "Editing & proofreading", "Voice & tone", "Grammar mastery"]),
      SUB("Research", ["Research skills", "Topic selection", "Fact-checking", "Interviewing sources"]),
    ]),
    SEC("Content Craft", "The formats that pay.", [
      SUB("Core Formats", ["Blog posts & articles", "Listicles & guides", "Case studies", "Whitepapers", "Newsletters"]),
      SUB("SEO Writing", ["SEO writing", "Keyword integration", "Content briefs", "Optimizing for readers"]),
    ]),
    SEC("Professional Writing", "Work like a professional.", [
      SUB("Client Work", ["Content strategy", "Client communication", "Deadlines & deliverables", "Style guides"]),
      SUB("Platforms", ["WordPress", "Google Docs", "CMS basics", "AI writing tools (responsibly)"]),
    ]),
    SEC("Career & Portfolio", "Build your writing career.", [
      SUB("Portfolio", ["A portfolio site", "Published samples", "A niche you own", "Guest posts"], true),
      B_SOFT,
    ]),
  ],

  copywriting: [
    SEC("Foundations", "Persuasion and psychology.", [
      SUB("Copy Fundamentals", ["Copywriting", "Persuasion psychology", "Value propositions", "Voice & brand tone"]),
      SUB("The Toolkit", ["Headlines & hooks", "Benefits vs features", "Calls to action", "Storytelling in copy"]),
    ]),
    SEC("Core Formats", "The copy that sells.", [
      SUB("Long-form", ["Sales pages", "Landing pages", "Email sequences", "Case studies"]),
      SUB("Short-form", ["Ads & social copy", "Product descriptions", "Push & SMS", "Packaging copy"]),
    ]),
    SEC("Direct Response", "The craft that pays top dollar.", [
      SUB("Direct Response", ["Direct response copywriting", "Funnels & offers", "Objection handling", "Testing & iteration"]),
    ]),
    SEC("Career & Portfolio", "From writer to revenue driver.", [
      SUB("Portfolio", ["5+ sample landing pages", "An email funnel", "A swipe file", "A niche specialization"], true),
      B_SOFT,
    ]),
  ],

  "video-editing": [
    SEC("Foundations", "Story first, then software.", [
      SUB("Storytelling", ["Story structure", "Pacing & rhythm", "Shot types & coverage", "Emotional arc"]),
      SUB("Tooling", ["DaVinci Resolve", "Premiere Pro", "Project organization", "Import & export settings"]),
    ]),
    SEC("Editing Craft", "The skills that make cuts invisible.", [
      SUB("Core Editing", ["Cutting & trimming", "Transitions", "Multi-cam editing", "Audio editing & mixing"]),
      SUB("Post-Production", ["Color grading", "Motion graphics basics", "Titles & captions", "Sound design"]),
    ]),
    SEC("Formats & Clients", "Work across the industry.", [
      SUB("Formats", ["YouTube editing", "Short-form (Reels/TikTok)", "Commercials", "Documentaries & films"]),
      SUB("Client Work", ["Client briefs", "Revisions & feedback", "Deliverables", "Freelancing basics"]),
    ]),
    SEC("Portfolio & Career", "Show your cuts.", [
      SUB("Portfolio", ["A showreel", "3–5 demo edits", "A vertical-content set", "A full video project"], true),
      B_SOFT,
    ]),
  ],

  "motion-graphics": [
    SEC("Foundations", "Design and animation fundamentals.", [
      SUB("Design Basics", ["Design principles", "Composition & color", "Typography in motion", "Storyboarding"]),
      SUB("Animation Basics", ["Keyframes & easing", "Timing & rhythm", "12 principles of animation", "After Effects basics"]),
    ]),
    SEC("Core Craft", "Make things move beautifully.", [
      SUB("After Effects", ["Shape & text animation", "Masks & mattes", "Expressions basics", "3D in AE"]),
      SUB("Motion Craft", ["Logo animation", "Kinetic typography", "Explainer videos", "UI animation"]),
    ]),
    SEC("Tools & Production", "The professional pipeline.", [
      SUB("Extended Tools", ["Cinema 4D basics", "Premiere Pro", "Lottie & web animation", "Sound design"]),
      SUB("Production", ["Client briefs", "Style frames", "Deliverables", "File management"]),
    ]),
    SEC("Portfolio & Career", "Show your movement.", [
      SUB("Portfolio", ["Showreel", "Case studies", "Style exploration", "Personal projects"], true),
      B_SOFT,
    ]),
  ],

  "3d-art": [
    SEC("Foundations", "Art fundamentals meet 3D software.", [
      SUB("Art Fundamentals", ["Art fundamentals", "Color & light theory", "Composition", "Anatomy & form"]),
      SUB("3D Basics", ["Blender basics", "Modeling fundamentals", "UV unwrapping", "Texturing basics"]),
    ]),
    SEC("Modeling & Sculpting", "Build the forms.", [
      SUB("Modeling", ["Hard-surface modeling", "Sculpting (ZBrush)", "Retopology", "PBR materials"]),
      SUB("Texturing", ["Substance Painter", "Texture maps", "Baking", "Material creation"]),
    ]),
    SEC("Look Development", "Light it, render it.", [
      SUB("Lighting & Rendering", ["3-point lighting", "HDRI & studio lighting", "Rendering (Cycles/Arnold)", "Post-processing"]),
      SUB("Animation", ["Rigging basics", "Animation principles", "Character animation", "Crowd & particle basics"], true),
    ]),
    SEC("Portfolio & Career", "Land the gig.", [
      SUB("Portfolio", ["A hero asset with breakdowns", "An environment scene", "A stylized set", "A turnaround"], true),
      SUB("Career Paths", ["Game art", "Film & VFX", "Product viz", "Freelance platforms"]),
      B_SOFT,
    ]),
  ],

  photography: [
    SEC("Foundations", "Master your camera and the fundamentals.", [
      SUB("Camera Basics", ["Exposure triangle", "Aperture & depth of field", "Shutter speed & motion", "ISO & noise", "Lenses & focal length"]),
      SUB("Composition", ["Composition rules", "Light & shadow", "Color & mood", "Perspective"]),
    ]),
    SEC("Shooting Craft", "Shoot with intention.", [
      SUB("Genres", ["Portrait photography", "Product photography", "Event photography", "Landscape & travel"]),
      SUB("Lighting", ["Natural light", "Off-camera flash", "Studio lighting", "Golden hour & conditions"]),
    ]),
    SEC("Editing & Business", "Finish and sell your work.", [
      SUB("Post-Processing", ["Lightroom", "Photoshop retouching", "Color grading", "File management & backup"]),
      SUB("Business", ["Client work", "Pricing & packages", "Contracts & releases", "Marketing your work"]),
    ]),
    SEC("Portfolio & Career", "Show your eye.", [
      SUB("Portfolio", ["A themed portfolio", "A client session end-to-end", "A lighting study", "An online presence"], true),
      B_SOFT,
    ]),
  ],

  cinematography: [
    SEC("Foundations", "Camera, lenses and visual language.", [
      SUB("Camera & Lenses", ["Camera systems", "Lenses & coverage", "Exposure & ISO", "Frame rates & shutter"]),
      SUB("Visual Language", ["Shot sizes & angles", "Movement & blocking", "Color & mood", "Visual storytelling"]),
    ]),
    SEC("Lighting", "Paint with light.", [
      SUB("Lighting Craft", ["Three-point lighting", "Practical lighting", "Natural & available light", "Lighting for skin tones"]),
    ]),
    SEC("Production", "Work on real sets.", [
      SUB("On Set", ["Camera department", "Directing collaboration", "Grip & rigging", "DIT & workflow"]),
      SUB("Post", ["Color grading (DaVinci)", "Look development", "VFX supervision basics", "Deliverables"]),
    ]),
    SEC("Portfolio & Career", "Reels that book jobs.", [
      SUB("Portfolio", ["A short film as DP", "A lighting breakdown reel", "A commercial spot", "A music video"], true),
      B_SOFT,
    ]),
  ],

  "social-media": [
    SEC("Foundations", "The social landscape.", [
      SUB("Social Fundamentals", ["Social media marketing", "Platform ecosystems", "Audience building", "Brand voice on social"]),
      SUB("Strategy", ["Content strategy", "Content calendars", "Campaign planning", "Competitor analysis"]),
    ]),
    SEC("Platform Mastery", "Win on each platform.", [
      SUB("Platforms", ["Instagram & Threads", "TikTok", "LinkedIn", "YouTube & Shorts", "X & communities"]),
      SUB("Content Craft", ["Short-form video", "Reels & trends", "Visual design (Canva)", "Copy for social"]),
    ]),
    SEC("Community & Paid", "Grow and convert.", [
      SUB("Community", ["Community management", "Engagement & DM funnels", "UGC & creators", "Crisis management"]),
      SUB("Paid Social", ["Meta Ads", "TikTok Ads", "Boosting vs ads", "Retargeting"]),
    ]),
    SEC("Analytics & Career", "Measure and grow your career.", [
      SUB("Analytics", ["Platform analytics", "Social reporting", "Attribution basics", "A/B testing content"]),
      B_SOFT,
      SUB("Certifications", ["Meta Blueprint", "HubSpot Social Media", "Google Analytics"]),
    ]),
  ],

  hr: [
    SEC("Foundations", "The HR landscape.", [
      SUB("HR Fundamentals", ["HR fundamentals", "Employment lifecycle", "Labor law basics", "HR policies & compliance", "HRIS basics"]),
      SUB("Business Partnership", ["Business acumen", "Workforce planning", "HR metrics & analytics", "Employee experience"]),
    ]),
    SEC("Talent & Development", "People in, people up.", [
      SUB("Recruitment", ["Recruiting", "Sourcing & interviewing", "Onboarding", "Employer branding"]),
      SUB("Development", ["Performance management", "Learning & development", "Career paths", "Succession planning"]),
    ]),
    SEC("Operations & Relations", "Run HR day to day.", [
      SUB("HR Ops", ["Payroll & benefits", "Compensation basics", "HR operations", "HRIS administration"]),
      SUB("Employee Relations", ["Employee relations", "Conflict resolution", "Engagement surveys", "Wellbeing & culture"]),
    ]),
    SEC("Career & Certifications", "Professionalize.", [
      SUB("Certifications", ["SHRM-CP", "PHR", "HRCI", "People analytics courses"]),
      B_SOFT,
    ]),
  ],

  recruiter: [
    SEC("Foundations", "Talent and the hiring market.", [
      SUB("Recruiting Fundamentals", ["Recruiting", "The hiring process", "Job descriptions", "Candidate experience"]),
      SUB("Sourcing", ["Sourcing", "Boolean search", "LinkedIn Recruiter", "Pipeline building"]),
    ]),
    SEC("Screening & Closing", "From first touch to offer.", [
      SUB("Screening", ["Phone screens", "Structured interviews", "Assessment design", "Feedback loops"]),
      SUB("Closing", ["Offer management", "Negotiation", "Hiring manager partnership", "Hiring metrics"]),
    ]),
    SEC("Specialization & Career", "Go niche, go deep.", [
      SUB("Specialties", ["Tech recruiting", "Executive search", "Agency vs in-house", "RPO"]),
      SUB("Career", ["Recruiting metrics", "ATS mastery", "Personal brand", "Recruiting certifications"]),
      B_SOFT,
    ]),
  ],

  accountant: [
    SEC("Foundations", "The language of business.", [
      SUB("Accounting Fundamentals", ["Accounting basics", "Double-entry bookkeeping", "Journal & ledger", "Trial balance & adjustments"]),
      SUB("Statements", ["Financial statements", "Income statement", "Balance sheet", "Cash flow statement"]),
    ]),
    SEC("Core Accounting", "The day-to-day craft.", [
      SUB("Operations", ["Accounts receivable & payable", "Payroll accounting", "Bank reconciliation", "Closing the books"]),
      SUB("Systems", ["Excel for accounting", "QuickBooks / Tally", "ERP accounting modules", "Internal controls"]),
    ]),
    SEC("Tax & Compliance", "Stay legal, save money.", [
      SUB("Tax", ["Tax fundamentals", "Income tax basics", "GST/VAT basics", "Tax planning"]),
      SUB("Compliance", ["Audit basics", "Accounting standards (GAAP/IFRS)", "Statutory compliance", "Corporate filings"]),
    ]),
    SEC("Career & Certifications", "The professional track.", [
      SUB("Certifications", ["CPA", "CMA", "ACCA", "CA (India)"]),
      B_SOFT,
    ]),
  ],

  "financial-analyst": [
    SEC("Foundations", "Accounting and Excel fluency.", [
      SUB("Foundations", ["Accounting basics", "Financial statements", "Excel for finance", "Business math"]),
      SUB("Markets", ["Capital markets", "Corporate finance", "Macroeconomics basics", "Industry analysis"]),
    ]),
    SEC("Analysis & Modeling", "The analyst's craft.", [
      SUB("Financial Analysis", ["Ratio analysis", "Variance analysis", "Forecasting", "Valuation basics"]),
      SUB("Modeling", ["Financial modeling", "Three-statement models", "Sensitivity & scenarios", "Model hygiene"]),
    ]),
    SEC("Reporting & Decision Support", "Drive decisions.", [
      SUB("Reporting", ["Management reporting", "KPI dashboards", "Budgeting & planning (FP&A)", "Investor materials"]),
      SUB("Tools", ["Power BI", "SQL for analysts", "Advanced Excel", "Python basics", "Bloomberg basics"]),
    ]),
    SEC("Career & Certifications", "The analyst track.", [
      SUB("Certifications", ["CFA", "FMVA", "FP&A certs", "Financial modeling courses"]),
      B_SOFT,
    ]),
  ],

  "investment-banking": [
    SEC("Foundations", "Excel, accounting and markets.", [
      SUB("Fundamentals", ["Accounting mastery", "Excel mastery", "Financial statements", "Capital markets & M&A"]),
      SUB("Valuation", ["Valuation methods", "DCF modeling", "Comparable companies", "Precedent transactions"]),
    ]),
    SEC("Deal Skills", "The banker's craft.", [
      SUB("Modeling & Materials", ["LBO modeling", "Merger models", "Pitch books", "Memoranda (CIM)"]),
      SUB("Deal Process", ["M&A process", "Due diligence", "Deal structuring", "Closing & integration"]),
    ]),
    SEC("Career & Craft", "Break in, stay in.", [
      SUB("Breaking In", ["Resume & recruiting", "Networking", "Technical interviews", "Case interviews"]),
      SUB("Career Tracks", ["M&A", "Leveraged finance", "Equity capital markets", "Restructuring"]),
      B_SOFT,
    ]),
  ],

  lawyer: [
    SEC("Foundations", "Legal thinking and the profession.", [
      SUB("Legal Fundamentals", ["Legal systems", "Constitutional basics", "Contracts law", "Tort & liability"]),
      SUB("Skills", ["Legal research", "Case reading", "Legal writing", "Mooting & advocacy"]),
    ]),
    SEC("Core Practice", "The disciplines of law.", [
      SUB("Core Areas", ["Corporate law", "Criminal law", "Civil litigation", "Family law", "Property law"]),
      SUB("Drafting", ["Contract drafting", "Pleadings & filings", "Opinions & memos", "Negotiation"]),
    ]),
    SEC("Practice & Career", "Practice law professionally.", [
      SUB("Practice", ["Client management", "Court procedure", "Ethics & responsibility", "Law firm operations"]),
      SUB("Career Paths", ["Firm vs in-house", "Judiciary (courts)", "Public interest", "Legal tech"]),
      B_SOFT,
      SUB("Preparation", ["Bar exam preparation", "Internships & clerkships", "Specialization selection"]),
    ]),
  ],

  teacher: [
    SEC("Foundations", "The craft of teaching.", [
      SUB("Teaching Fundamentals", ["Teaching", "Learning theory", "Lesson planning", "Classroom management"]),
      SUB("Subject Mastery", ["Subject specialization", "Curriculum standards", "Instructional design", "Differentiation"]),
    ]),
    SEC("Classroom Practice", "Teach every learner.", [
      SUB("Instruction", ["Active learning strategies", "Questioning techniques", "Project-based learning", "Technology in class"]),
      SUB("Assessment", ["Assessment design", "Formative & summative", "Feedback that works", "Grading & reporting"]),
    ]),
    SEC("Career & Certification", "The professional teacher.", [
      SUB("Certifications", ["Teaching license", "TEFL / TESOL", "CTET (India)", "Subject credentials"]),
      SUB("Career Paths", ["K-12 teacher", "EdTech", "Curriculum designer", "Teacher leadership"]),
      B_SOFT,
    ]),
  ],

  professor: [
    SEC("Foundations", "The academic track.", [
      SUB("Academic Foundations", ["Graduate study path", "Research methods", "Academic writing", "Literature review"]),
      SUB("Teaching", ["University teaching", "Course design", "Mentoring students", "Assessment in higher ed"]),
    ]),
    SEC("Research", "Produce knowledge.", [
      SUB("Research Craft", ["Research design", "Statistical methods", "Publishing", "Conferences & networking"]),
      SUB("Funding", ["Grant writing", "Research proposals", "Lab management", "Collaborations"]),
    ]),
    SEC("Career & Tenure", "The academic career.", [
      SUB("Career Tracks", ["PhD → postdoc → faculty", "Tenure track", "Teaching-focused roles", "Industry research"]),
      B_SOFT,
    ]),
  ],

  doctor: [
    SEC("Foundations", "Pre-med and the basics of medicine.", [
      SUB("Pre-Medical", ["Biology & chemistry", "Physics basics", "MCAT/NEET preparation", "Study discipline"]),
      SUB("Medical Fundamentals", ["Human anatomy", "Physiology", "Biochemistry", "Microbiology & immunology"]),
    ]),
    SEC("Clinical Training", "From theory to bedside.", [
      SUB("Clinical Sciences", ["Pathology", "Pharmacology", "Internal medicine", "Surgery basics", "Pediatrics"]),
      SUB("Clinical Skills", ["History taking", "Physical examination", "Diagnostic reasoning", "Procedures & skills"]),
    ]),
    SEC("Residency & Practice", "The doctor's path.", [
      SUB("Residency", ["Internship & residency", "Rotations", "Board exams", "Specialization choice"]),
      SUB("Practice", ["Patient communication", "Medical ethics", "Health systems", "Telemedicine & tech"]),
      B_SOFT,
    ]),
  ],

  nurse: [
    SEC("Foundations", "Nursing science.", [
      SUB("Foundations", ["Nursing fundamentals", "Anatomy & physiology", "Pharmacology basics", "Medical terminology"]),
      SUB("Clinical Basics", ["Vital signs & assessment", "Infection control", "Patient safety", "Documentation"]),
    ]),
    SEC("Clinical Skills", "Care in action.", [
      SUB("Core Nursing", ["Medication administration", "Wound care", "IV therapy", "Emergency response (BLS/ACLS)"]),
      SUB("Patient Care", ["Care planning", "Patient education", "Family communication", "Cultural competence"]),
    ]),
    SEC("Career & Specialization", "Grow your nursing career.", [
      SUB("Career Paths", ["Medical-surgical", "ICU", "Pediatrics", "Nurse practitioner"]),
      SUB("Certifications", ["NCLEX", "Specialty certifications", "Advanced degrees (BSN/MSN)"]),
      B_SOFT,
    ]),
  ],

  pharmacist: [
    SEC("Foundations", "Pharmaceutical science.", [
      SUB("Foundations", ["Chemistry & organic chem", "Biology & physiology", "Biochemistry", "Pharmaceutical math"]),
      SUB("Pharmacy Science", ["Pharmacology", "Pharmacokinetics", "Pharmaceutics", "Therapeutics"]),
    ]),
    SEC("Clinical Pharmacy", "Patient-centered care.", [
      SUB("Clinical Skills", ["Drug interactions", "Dosage & monitoring", "Patient counseling", "Medication therapy management"]),
      SUB("Practice Settings", ["Community pharmacy", "Hospital pharmacy", "Clinical pharmacy", "Industry roles"]),
    ]),
    SEC("Career & Licensure", "The professional track.", [
      SUB("Licensure", ["PharmD", "Licensure exam", "Residency options", "Board certifications"]),
      B_SOFT,
    ]),
  ],

  "civil-engineer": [
    SEC("Foundations", "The engineering fundamentals.", [
      SUB("Core Sciences", ["Physics & mechanics", "Mathematics", "Engineering drawing", "Materials science"]),
      SUB("Civil Fundamentals", ["Engineering mechanics", "Strength of materials", "Surveying", "Fluid mechanics"]),
    ]),
    SEC("Core Civil Engineering", "The disciplines.", [
      SUB("Structures", ["Structural analysis", "RCC & steel design", "Design of structures", "Foundations"]),
      SUB("Infrastructure", ["Transportation engineering", "Geotechnical engineering", "Water resources", "Environmental engineering"]),
    ]),
    SEC("Professional Practice", "Build safely.", [
      SUB("Design & Tools", ["AutoCAD", "Revit & BIM", "STAAD Pro", "Construction management"]),
      SUB("Practice", ["Site engineering", "Estimation & costing", "Quality & safety", "Standards & codes"]),
    ]),
    SEC("Career & Licensure", "The professional engineer.", [
      SUB("Certifications", ["Professional Engineer (PE)", "Green building (LEED)", "Project management (PMP)"]),
      B_SOFT,
    ]),
  ],

  "mechanical-engineer": [
    SEC("Foundations", "The mechanical engineer's base.", [
      SUB("Core Sciences", ["Physics & mechanics", "Mathematics", "Thermodynamics basics", "Engineering drawing"]),
      SUB("Mechanical Core", ["Engineering mechanics", "Strength of materials", "Fluid mechanics", "Materials & manufacturing"]),
    ]),
    SEC("Core Disciplines", "The specializations.", [
      SUB("Design & Analysis", ["Machine design", "Kinematics & dynamics", "FEA & simulation", "CAD modeling"]),
      SUB("Systems", ["Thermodynamics", "Heat transfer", "HVAC systems", "Mechatronics basics"]),
    ]),
    SEC("Tools & Practice", "Design and build.", [
      SUB("Tools", ["SolidWorks", "AutoCAD", "MATLAB", "ANSYS", "CNC & prototyping"]),
      SUB("Practice", ["Manufacturing processes", "Quality control", "Project engineering", "Standards & tolerances"]),
    ]),
    SEC("Career & Licensure", "The professional track.", [
      SUB("Certifications", ["Professional Engineer (PE)", "Six Sigma", "CAD certifications"]),
      B_SOFT,
    ]),
  ],

  "electrical-engineer": [
    SEC("Foundations", "The electrical engineer's base.", [
      SUB("Core Sciences", ["Physics (electricity & magnetism)", "Mathematics", "Circuit theory", "Digital logic"]),
      SUB("Electrical Core", ["Electrical circuits", "Electromagnetics", "Signals & systems", "Control theory"]),
    ]),
    SEC("Core Disciplines", "The specializations.", [
      SUB("Power", ["Power systems", "Power electronics", "Machines & drives", "Renewable energy"]),
      SUB("Electronics", ["Analog electronics", "Digital electronics", "Microprocessors", "Embedded systems"]),
    ]),
    SEC("Tools & Practice", "Design and build.", [
      SUB("Tools", ["LTspice / Multisim", "MATLAB / Simulink", "PCB design (KiCad)", "PLC & SCADA"]),
      SUB("Practice", ["Electrical codes & standards", "Safety & protection", "Testing & commissioning", "Project engineering"]),
    ]),
    SEC("Career & Licensure", "The professional track.", [
      SUB("Certifications", ["Professional Engineer (PE)", "FE exam", "Specialized certifications"]),
      B_SOFT,
    ]),
  ],

  architect: [
    SEC("Foundations", "Design and building science.", [
      SUB("Design Foundations", ["Design fundamentals", "History of architecture", "Drawing & representation", "Spatial thinking"]),
      SUB("Building Science", ["Building materials", "Structures for architects", "Environmental systems", "Building codes"]),
    ]),
    SEC("Design Studio", "The architect's craft.", [
      SUB("Studio Work", ["Concept design", "Schematic design", "Design development", "Design critiques"]),
      SUB("Tools", ["Revit & BIM", "AutoCAD", "SketchUp", "Rhino & rendering"]),
    ]),
    SEC("Professional Practice", "From drawings to buildings.", [
      SUB("Practice", ["Construction documents", "Specifications", "Construction administration", "Client & consultants"]),
      SUB("Advanced", ["Sustainable design", "Urban design", "Interior architecture", "Landscape integration"]),
    ]),
    SEC("Career & Licensure", "The architect's path.", [
      SUB("Licensure", ["Architect license (ARE)", "NCARB", "Internship (AXP)"]),
      B_SOFT,
    ]),
  ],

  "interior-design": [
    SEC("Foundations", "Design principles and space.", [
      SUB("Design Fundamentals", ["Design principles", "Color & materials", "Typography & art", "Spatial planning"]),
      SUB("Tools", ["SketchUp", "AutoCAD", "Photoshop", "Room & lighting planning"]),
    ]),
    SEC("Core Design", "The interior designer's craft.", [
      SUB("Design Skills", ["Space planning", "Lighting design", "Furniture & FF&E", "Material & finishes selection"]),
      SUB("Styles & Clients", ["Design styles", "Mood boards", "Client presentations", "Budgeting & procurement"]),
    ]),
    SEC("Career & Portfolio", "Build your practice.", [
      SUB("Portfolio", ["3 concept + layout projects", "A 3D visualization", "A renovation case study"], true),
      SUB("Certifications", ["NCIDQ", "Interior design diploma", "Specialized training"]),
      B_SOFT,
    ]),
  ],

  "fashion-design": [
    SEC("Foundations", "Design and construction basics.", [
      SUB("Design Fundamentals", ["Fashion illustration", "Color & textiles", "Design principles", "Trend forecasting"]),
      SUB("Construction", ["Sewing basics", "Pattern making", "Draping", "Garment construction"]),
    ]),
    SEC("Design Process", "From sketch to collection.", [
      SUB("Collection Development", ["Concept & mood boards", "Design development", "Fabric & sourcing", "Sampling & fittings"]),
      SUB("Tools", ["Illustrator & Photoshop", "CLO 3D", "Tech packs", "Costing"]),
    ]),
    SEC("Career & Industry", "The fashion business.", [
      SUB("Industry", ["Fashion merchandising", "Brand & retail", "Production & manufacturing", "Sustainable fashion"]),
      SUB("Portfolio", ["A 5-look collection", "A textile study", "A fashion illustration series", "A lookbook"], true),
      B_SOFT,
    ]),
  ],

  chef: [
    SEC("Foundations", "Kitchen fundamentals.", [
      SUB("Kitchen Basics", ["Knife skills", "Food safety & hygiene", "Mise en place", "Kitchen organization"]),
      SUB("Culinary Fundamentals", ["Cooking methods", "Stocks & sauces", "Cuts & preparations", "Taste & seasoning"]),
    ]),
    SEC("Culinary Craft", "The chef's skills.", [
      SUB("Cuisines & Techniques", ["Regional cuisines", "Baking & pastry", "Plating & presentation", "Menu engineering"]),
      SUB("Specialties", ["Pastry & desserts", "Grill & butchery", "Vegetarian & plant-based", "Garde manger"], true),
    ]),
    SEC("Kitchen Leadership", "Run the kitchen.", [
      SUB("Management", ["Kitchen management", "Food costing & budgets", "Inventory & ordering", "Staff training"]),
      SUB("Career", ["Line cook → chef de partie", "Sous chef", "Executive chef", "Food entrepreneurship"]),
      B_SOFT,
    ]),
  ],

  "hotel-management": [
    SEC("Foundations", "Hospitality fundamentals.", [
      SUB("Hospitality Basics", ["Hospitality industry", "Guest service standards", "Hotel operations", "Etiquette & professionalism"]),
      SUB("Front Office", ["Front office operations", "Reservations & check-in", "Guest relations", "Property management systems (Opera)"]),
    ]),
    SEC("Operations", "Run the property.", [
      SUB("Departments", ["Housekeeping management", "Food & beverage", "Events & banquets", "Facilities & maintenance"]),
      SUB("Commercial", ["Revenue management", "Sales & marketing", "Rate & inventory strategy", "Financial management"]),
    ]),
    SEC("Career & Growth", "The hospitality career.", [
      SUB("Career Paths", ["Front office manager", "Revenue manager", "F&B director", "General manager"]),
      SUB("Certifications", ["Hospitality diploma", "Revenue management courses", "CHA (Certified Hotel Administrator)"]),
      B_SOFT,
    ]),
  ],

  entrepreneur: [
    SEC("Foundations", "The founder mindset.", [
      SUB("Ideation", ["Problem discovery", "Idea validation", "Market research", "Competitor analysis"]),
      SUB("Foundations", ["Business models", "Unit economics", "Founder psychology", "Risk & resilience"]),
    ]),
    SEC("Building", "Turn the idea into a product.", [
      SUB("Product", ["MVP development", "Customer discovery", "Product-market fit", "Iteration loops"]),
      SUB("No-Code & Tech", ["No-code tools", "AI tools for founders", "Websites & landing pages", "Automation"]),
    ]),
    SEC("Growing", "Revenue and scale.", [
      SUB("Go-To-Market", ["Marketing for founders", "Sales & pitches", "Distribution channels", "Brand building"]),
      SUB("Finance & Legal", ["Pricing & margins", "Funding (bootstrapping → VC)", "Legal & incorporation", "Hiring & teams"]),
    ]),
    SEC("Scaling & Career", "From founder to leader.", [
      SUB("Scaling", ["Operations at scale", "Leadership & delegation", "Systems & processes", "Exit strategies"]),
      B_SOFT,
    ]),
  ],

  "business-consultant": [
    SEC("Foundations", "The consulting toolkit.", [
      SUB("Consulting Fundamentals", ["Management consulting", "Structured thinking (MECE)", "Problem solving", "Hypothesis-driven approach"]),
      SUB("Analytics", ["Excel for consultants", "Data analysis", "Financial basics", "Industry research"]),
    ]),
    SEC("Core Consulting", "The consultant's craft.", [
      SUB("Analysis", ["Market analysis", "Financial analysis", "Process analysis", "Benchmarking"]),
      SUB("Communication", ["Storytelling & slides", "Presentations", "Client workshops", "Executive communication"]),
    ]),
    SEC("Specializations & Career", "The consulting path.", [
      SUB("Specializations", ["Strategy consulting", "Operations consulting", "Financial consulting", "Tech & digital consulting"]),
      SUB("Career", ["Case interviews", "Consulting frameworks", "Boutique vs big firms", "Exit opportunities"]),
      B_SOFT,
    ]),
  ],

  sales: [
    SEC("Foundations", "The sales mindset and process.", [
      SUB("Sales Fundamentals", ["Sales fundamentals", "The sales process", "Sales psychology", "Pipeline management"]),
      SUB("Skills", ["Prospecting", "Discovery calls", "Value selling", "Objection handling"]),
    ]),
    SEC("The Craft", "Close deals.", [
      SUB("Engagement", ["Product demos", "Proposals & quotes", "Negotiation", "Closing techniques"]),
      SUB("Account Management", ["Account management", "Upselling & cross-selling", "Customer success basics", "Renewals"]),
    ]),
    SEC("Tools & Career", "Scale your sales career.", [
      SUB("Tools", ["CRM (Salesforce/HubSpot)", "Sales enablement", "LinkedIn Sales Navigator", "Prospecting tools"]),
      SUB("Career", ["SDR → AE → enterprise", "Sales leadership", "Sales metrics & quotas", "Compensation structures"]),
      B_SOFT,
    ]),
  ],

  "supply-chain": [
    SEC("Foundations", "The supply chain landscape.", [
      SUB("Fundamentals", ["Supply chain fundamentals", "The end-to-end chain", "Demand & supply", "Supply chain strategy"]),
      SUB("Operations", ["Procurement", "Logistics & distribution", "Inventory management", "Warehousing"]),
    ]),
    SEC("Core Skills", "Optimize the chain.", [
      SUB("Analytics", ["Demand forecasting", "Inventory optimization", "Supply chain analytics", "Cost reduction"]),
      SUB("Planning", ["Production planning", "Transportation planning", "Network design", "S&OP process"]),
    ]),
    SEC("Technology & Career", "Modern supply chains.", [
      SUB("Technology", ["ERP systems", "TMS & WMS", "Supply chain visibility", "AI in supply chain"]),
      SUB("Certifications", ["CSCP (APICS)", "CIPS", "Six Sigma", "Lean"]),
      B_SOFT,
    ]),
  ],

  "project-manager": [
    SEC("Foundations", "The PM discipline.", [
      SUB("PM Fundamentals", ["Project management", "Project lifecycle", "Scope & requirements", "Stakeholders & communication"]),
      SUB("Planning", ["Scheduling", "Estimation", "Budgeting", "Risk management"]),
    ]),
    SEC("Execution & Delivery", "Get it done.", [
      SUB("Execution", ["Task tracking", "Team coordination", "Quality & change control", "Status reporting"]),
      SUB("Agile", ["Agile & Scrum", "Sprints & ceremonies", "Kanban", "Scaling agile"]),
    ]),
    SEC("Tools & Career", "The professional PM.", [
      SUB("Tools", ["Jira", "MS Project", "Asana / Trello", "Confluence"]),
      SUB("Certifications", ["PMP", "PRINCE2", "Google Project Management", "Scrum Master"]),
      B_SOFT,
      SUB("Career Paths", ["IT PM", "Construction PM", "Program manager", "PMO lead"]),
    ]),
  ],

  operations: [
    SEC("Foundations", "Operations fundamentals.", [
      SUB("Operations Basics", ["Operations management", "Process design", "Workflow analysis", "KPI & metrics"]),
      SUB("Leadership", ["Team leadership", "Budget management", "Vendor management", "Operational excellence"]),
    ]),
    SEC("Core Operations", "Run the business.", [
      SUB("Processes", ["Process improvement", "Quality management", "Capacity planning", "Inventory & logistics"]),
      SUB("Analytics", ["Operational analytics", "Dashboards & reporting", "Cost analysis", "Forecasting"]),
    ]),
    SEC("Career & Certifications", "The ops professional.", [
      SUB("Certifications", ["Six Sigma", "Lean certification", "Operations courses", "MBA (optional)"]),
      B_SOFT,
    ]),
  ],

  psychologist: [
    SEC("Foundations", "The science of mind and behavior.", [
      SUB("Psychology Fundamentals", ["Psychology basics", "Cognitive psychology", "Developmental psychology", "Social psychology"]),
      SUB("Research", ["Research methods", "Statistics for psychology", "Ethics in research", "Critical thinking"]),
    ]),
    SEC("Clinical & Applied", "The practitioner's path.", [
      SUB("Clinical", ["Abnormal psychology", "Psychological assessment", "Therapy approaches", "Psychopathology"]),
      SUB("Applied", ["Counseling skills", "Organizational psychology", "Health psychology", "Neuropsychology basics"]),
    ]),
    SEC("Career & Licensure", "The psychology career.", [
      SUB("Career Paths", ["Clinical psychologist", "Counselor", "I-O psychologist", "Researcher"]),
      SUB("Licensure", ["Graduate degrees", "Licensure exams", "Supervised practice", "Specialization"]),
      B_SOFT,
    ]),
  ],

  "research-scientist": [
    SEC("Foundations", "The scientific method.", [
      SUB("Scientific Fundamentals", ["Scientific method", "Domain fundamentals", "Literature review", "Research ethics"]),
      SUB("Methods", ["Experimental design", "Statistics & analysis", "Lab techniques", "Scientific writing"]),
    ]),
    SEC("Research Craft", "Produce knowledge.", [
      SUB("Research", ["Hypothesis testing", "Data collection", "Data analysis (Python/R)", "Reproducibility"]),
      SUB("Communication", ["Paper writing", "Presentations", "Peer review", "Collaboration"]),
    ]),
    SEC("Career & Funding", "The research career.", [
      SUB("Career Paths", ["Academic research", "Industry R&D", "Government labs", "Data science research"]),
      SUB("Funding", ["Grant writing", "Proposals", "Lab leadership", "Mentoring"]),
      B_SOFT,
    ]),
  ],

  journalist: [
    SEC("Foundations", "The journalist's craft.", [
      SUB("Writing & Reporting", ["Journalism basics", "News writing", "Interviewing", "Fact-checking & verification"]),
      SUB("Ethics & Law", ["Journalism ethics", "Media law", "Sources & attribution", "Objectivity & bias"]),
    ]),
    SEC("Reporting Skills", "The beats and formats.", [
      SUB("Beats", ["Investigative journalism", "Business journalism", "Politics & policy", "Technology journalism"]),
      SUB("Formats", ["Digital journalism", "Broadcast journalism", "Long-form features", "Data journalism"]),
    ]),
    SEC("Career & Portfolio", "The journalist's path.", [
      SUB("Portfolio", ["10 published clips", "A beat specialization", "A data-driven story", "A personal blog"], true),
      SUB("Career", ["Newsroom roles", "Freelancing", "Media organizations", "Media startups"]),
      B_SOFT,
    ]),
  ],

  pr: [
    SEC("Foundations", "Reputation and media.", [
      SUB("PR Fundamentals", ["Public relations", "Media relations", "Storytelling & messaging", "Brand reputation"]),
      SUB("Skills", ["Press releases", "Pitching", "Media monitoring", "Crisis communication"]),
    ]),
    SEC("Core PR", "The practitioner's craft.", [
      SUB("Practice", ["Media lists & outreach", "Press kits", "Events & launches", "Influencer relations"]),
      SUB("Digital PR", ["Social listening", "Digital PR & SEO", "Analytics & measurement", "Content PR"]),
    ]),
    SEC("Career & Specialization", "The PR career.", [
      SUB("Specializations", ["Corporate communications", "Crisis PR", "Tech PR", "Public affairs"]),
      SUB("Certifications", ["PRSA certifications", "Media relations courses", "Crisis management certs"]),
      B_SOFT,
    ]),
  ],

};
