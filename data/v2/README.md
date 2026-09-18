# CareerRoadmaps v2 — Curriculum Database

A comprehensive, research-backed career-learning dataset for engineering, technology, software, AI, cybersecurity, cloud/DevOps, electronics, and design careers.

## Overview

This dataset powers a professional CareerRoadmaps application where a student can choose a career or skill and explore a deep, logically structured learning path from fundamentals to professional competency.

**Dataset Statistics:**

| Metric | Count |
|--------|-------|
| Career Domains | 15 |
| Career Roadmaps | 20 |
| Skill Roadmaps | 13 |
| Total Learning Nodes | 2,810 |
| Maximum Depth | 4 levels |
| Certifications | 20+ |
| Cross-domain Contamination | 0 |
| Duplicate IDs | 0 |
| Overall Status | ✅ PASS |

---

## Directory Structure

```
data/v2/
├── taxonomy.json              # Domain taxonomy and skill categories
├── generate-v2.mjs            # Main generation pipeline
├── build-validation.mjs       # Validation report builder
├── README.md                  # This file
│
├── source/                    # Human-editable source data
│   ├── careers-v2.json        # All career roadmap definitions
│   ├── skills-v2.json         # All skill roadmap definitions
│   ├── resources-v2.json      # Learning resources by topic
│   ├── practice-v2.json       # Practice activities by topic
│   ├── projects-v2.json       # Project definitions by topic
│   ├── certifications-v2.json # Verified certifications
│   └── sources-v2.json        # Research methodology & sources
│
├── generated/                 # Auto-generated outputs
│   ├── index.json             # Master index of all roadmaps
│   ├── search-index.json      # Search index for the app
│   ├── career-domains.json    # Domain counts
│   ├── skill-categories.json  # Skill category counts
│   ├── certifications.json    # Certifications data
│   ├── <slug>.json            # Full roadmap data (each career/skill)
│   └── <slug>.details.json    # Node details (lazy-loaded)
│
└── deliverables/              # Final 10 dataset deliverables
    ├── careers.json
    ├── skills.json
    ├── taxonomy.json
    ├── resources.json
    ├── practice.json
    ├── projects.json
    ├── certifications.json
    ├── sources.json
    ├── validation-report.json
    └── (README.md — this file, copied here)
```

---

## Schema

### Career Roadmap (`careers-v2.json` entry)

```json
{
  "slug": "software-engineer",
  "title": "Software Engineer",
  "tagline": "Build the future with code",
  "description": "...",
  "icon": "💻",
  "color": "#1d4ed8",
  "category": "it",
  "domain": "Software & Computing",
  "industry": "Software Development",
  "difficulty": "Intermediate",
  "duration": "12-18 months",
  "durationHours": 550,
  "salary": "$90k – $170k+",
  "demand": "Very High",
  "demandLevel": 5,
  "prerequisites": ["Basic computer literacy", "High school math"],
  "tools": ["Git", "VS Code", "Docker", "Linux"],
  "certifications": ["AWS Certified Cloud Practitioner"],
  "softSkills": ["Communication", "Problem Solving", "Teamwork"],
  "portfolioProjects": ["Full-Stack Web App", "REST API", "Open Source Contribution"],
  "specializations": ["Frontend", "Backend", "Mobile", "Cloud", "AI/ML"],
  "sections": [
    {
      "title": "Programming Foundations",
      "topics": ["Variable Types", "Control Flow", "Functions"],
      "subtopics": {
        "Variable Types": ["Integers", "Strings", "Booleans", "Arrays"],
        "Functions": ["Parameters", "Return Values", "Scope", "Closures"]
      }
    }
  ],
  "knowledgeBase": { ... },
  "rootResources": [ ... ]
}
```

### Skill Roadmap (`skills-v2.json` entry)

```json
{
  "slug": "python",
  "title": "Python",
  "icon": "🐍",
  "color": "#3776AB",
  "skillCategory": "Programming Languages",
  "difficulty": "Beginner",
  "duration": "3-6 months",
  "durationHours": 180,
  "description": "...",
  "tagline": "...",
  "sections": [ ... ],
  "knowledgeBase": { ... },
  "roles": ["Backend Developer", "Data Scientist", "ML Engineer"],
  "tools": ["Python 3.12+", "pip", "virtualenv", "VS Code"],
  "certifications": ["PCEP", "PCAP"]
}
```

### Generated Output (per roadmap)

```json
{
  "meta": {
    "slug": "...",
    "title": "...",
    "kind": "career|skill",
    "category": "...",
    "domain": "...",
    "icon": "...",
    "color": "...",
    "difficulty": "...",
    "duration": "...",
    "durationHours": 0,
    "salary": "...",
    "demand": "...",
    "demandLevel": 0,
    "prerequisites": [],
    "certifications": [],
    "tools": [],
    "softSkills": [],
    "portfolioIdeas": [],
    "specializations": [],
    "examMeta": null
  },
  "stats": {
    "totalNodes": 0,
    "sections": 0,
    "subsections": 0,
    "topics": 0,
    "concepts": 0,
    "projects": 0,
    "advanced": 0,
    "learnable": 0,
    "estimatedHours": 0,
    "keywords": []
  },
  "root": {
    "id": "...",
    "label": "Software Engineer",
    "type": "career",
    "details": { ... },
    "children": [
      {
        "id": "...",
        "label": "Programming Foundations",
        "type": "section",
        "details": { ... },
        "children": [ ... ]
      }
    ]
  }
}
```

### Node Types

| Type | Description |
|------|-------------|
| `career` | Root node for a career roadmap |
| `section` | Top-level section (e.g., "Programming Foundations") |
| `subsection` | Grouping within a section |
| `topic` | A specific topic to learn |
| `concept` | Detailed concept within a topic |
| `choice` | Pick-one-of-many branching point |
| `advanced` | Advanced/specialization content |
| `achievement` | Milestone marker (e.g., "🎓 Career Ready") |

### Node Details

Every node includes:

```json
{
  "description": "What this topic covers",
  "overview": {
    "whatIsIt": "Definition",
    "whyMatters": "Relevance to the career",
    "youWillLearn": ["Objective 1", "Objective 2"],
    "whereUsed": ["Context 1", "Context 2"],
    "prerequisites": ["What you need first"],
    "outcome": "What you'll be able to do after"
  },
  "whyLearn": "Motivation",
  "prerequisites": [],
  "objectives": [],
  "difficulty": "Beginner|Intermediate|Advanced",
  "estimatedTime": "4-8 hours",
  "resources": [{ "title": "...", "url": "...", "kind": "...", "isOfficial": true }],
  "practice": [{ "title": "...", "platform": "...", "url": "..." }],
  "projects": [{ "title": "...", "difficulty": "...", "duration": "..." }],
  "interviewQuestions": ["Question 1", "Question 2"],
  "careerRelevance": "How this applies to the career",
  "commonMistakes": ["Mistake 1"],
  "tips": ["Tip 1"],
  "nextTopics": ["Next topic to learn"],
  "optional": false,
  "certIds": []
}
```

---

## Source Methodology

### Evidence Hierarchy

| Tier | Source Type | Trust Level |
|------|------------|-------------|
| Tier 1 | Government (O*NET, BLS), Accreditation (ABET, AICTE), Official Docs, Professional Societies (IEEE, ACM), Universities | Highest |
| Tier 2 | Industry organizations, Established training platforms | High |
| Tier 3 | GitHub repos, Community roadmaps, Blogs | Moderate |

### Research Process

1. **Occupational Data**: O*NET, BLS for job requirements, skills, salary, outlook
2. **Curriculum Standards**: ABET, AICTE, ACM/IEEE CS curriculum guidelines
3. **Professional Bodies**: IEEE, ACM, ASME, ASCE, AIChE for domain knowledge areas
4. **Official Documentation**: Python, Java, React, AWS, Docker, etc. for technology topics
5. **University Curricula**: Undergraduate/graduate programs for topic structure
6. **Industry Analysis**: Job postings, tech stacks, competency frameworks

All content is original — no blocks of copyrighted text are reproduced. Facts are extracted, cross-checked across sources, and synthesized into original curriculum structures.

### Source Files

- `sources-v2.json` contains all researched sources with:
  - Name, URL, tier, type, access date, relevance, notes
  - Methodology description
  - Cross-referencing notes

---

## Validation Rules

### Technical Validation

| Rule | Description |
|------|-------------|
| Valid JSON | All files parse as valid JSON |
| Unique IDs | Every node has a globally unique ID |
| Unique Slugs | Every roadmap has a unique slug |
| No Circular Hierarchy | No node references itself or its descendants |
| No Orphan Nodes | Every node is reachable from a root |
| No Malformed Fields | All required fields present and correctly typed |

### Curriculum Validation

| Rule | Description |
|------|-------------|
| Correct Topics | Topics match the career domain |
| Correct Subtopics | Subtopics are meaningful children of their parent |
| Logical Order | Topics progress from fundamentals to advanced |
| Career Relevance | All topics apply to the stated career |
| Skill Relevance | All skills match the career's requirements |
| Sufficient Depth | At least 3 meaningful levels where appropriate |
| Practical Application | Each major topic has practice activities |
| Current Technologies | Technologies listed are currently in use |
| Authoritative Sources | Topics backed by Tier 1-2 sources |
| No Cross-Domain Contamination | No web topics in mechanical roadmaps, etc. |

### Contamination Rules

The validator checks for impossible topic placements:

- **Mechanical/Civil/Chemical/Electrical**: No web framework topics (React, Angular, Node.js, etc.)
- **Software/Frontend/Backend**: No physical engineering topics (stress analysis, thermal, CAD)
- **Cross-checks run per career slug** against known bad patterns

---

## How to Add a Career

### 1. Add entry to `data/v2/source/careers-v2.json`

```json
{
  "slug": "my-new-career",
  "title": "My New Career",
  "tagline": "Short tagline",
  "description": "Detailed description...",
  "icon": "🔧",
  "color": "#hexcolor",
  "category": "it",
  "domain": "Software & Computing",
  "industry": "Industry Name",
  "difficulty": "Intermediate",
  "duration": "6-12 months",
  "durationHours": 400,
  "salary": "$80k-$140k",
  "demand": "High",
  "demandLevel": 4,
  "prerequisites": ["Prerequisite 1"],
  "tools": ["Tool 1", "Tool 2"],
  "certifications": ["Cert 1"],
  "softSkills": ["Communication"],
  "portfolioProjects": ["Project 1", "Project 2"],
  "specializations": ["Specialization 1"],
  "sections": [
    {
      "title": "Section Title",
      "topics": ["Topic 1", "Topic 2"],
      "subtopics": {
        "Topic 1": ["Subtopic 1a", "Subtopic 1b"]
      }
    }
  ],
  "knowledgeBase": {
    "topic-1-slug": {
      "description": "...",
      "whatIsIt": "...",
      "whyMatters": "...",
      "prerequisites": [],
      "objectives": [],
      "resources": [],
      "practice": [],
      "projects": []
    }
  },
  "rootResources": []
}
```

### 2. Ensure domain exists in `taxonomy.json`

If the career belongs to a new domain, add it to `taxonomy.json` under `domains`.

### 3. Run the generator

```bash
cd data/v2
node generate-v2.mjs
```

### 4. Validate

```bash
node build-validation.mjs
```

### 5. Check contamination

The validation script automatically checks for cross-domain contamination. Fix any issues flagged.

---

## How to Add a Skill

### 1. Add entry to `data/v2/source/skills-v2.json`

```json
{
  "slug": "my-skill",
  "title": "My Skill",
  "icon": "🛠️",
  "color": "#hexcolor",
  "skillCategory": "Category Name",
  "difficulty": "Beginner",
  "duration": "2-4 months",
  "durationHours": 100,
  "description": "...",
  "tagline": "...",
  "sections": [ ... ],
  "knowledgeBase": { ... },
  "roles": ["Role 1", "Role 2"],
  "tools": ["Tool 1"],
  "certifications": ["Cert 1"]
}
```

### 2. Ensure skill category exists in `taxonomy.json`

Add to `skillCategories` if new.

### 3. Run generator and validate

Same as career workflow above.

---

## How to Add a Topic

### 1. Within an existing career/skill

Add to the `sections` array of the career/skill entry:

```json
{
  "title": "New Topic Section",
  "topics": ["Topic A", "Topic B"],
  "subtopics": {
    "Topic A": ["Concept A1", "Concept A2"],
    "Topic B": ["Concept B1"]
  }
}
```

### 2. Add knowledge base entry

```json
"knowledgeBase": {
  "topic-a": {
    "description": "Detailed description of Topic A",
    "whatIsIt": "Clear definition",
    "whyMatters": "Why this matters for the career",
    "prerequisites": ["Previous topic"],
    "objectives": ["Learn X", "Apply Y"],
    "resources": [
      { "title": "Resource Title", "url": "https://...", "kind": "docs" }
    ],
    "practice": [
      { "title": "Practice Activity", "platform": "Platform Name", "url": "https://..." }
    ],
    "projects": [
      { "title": "Project Name", "difficulty": "Intermediate", "duration": "4 hours" }
    ]
  }
}
```

### 3. Add shared resources

For topics shared across careers, add to `resources-v2.json`:

```json
{
  "topic-slug": [
    { "title": "...", "url": "...", "kind": "docs" }
  ]
}
```

---

## How to Validate New Data

### Automated Validation

```bash
cd data/v2
node generate-v2.mjs && node build-validation.mjs
```

### Manual Checklist

Before adding new content, verify:

1. **Topic accuracy**: Is the topic real and relevant to this career?
2. **Ordering**: Does it come after its prerequisites?
3. **Depth**: Are there enough subtopics to be meaningful?
4. **Resources**: Are at least 2 resources linked (preferably 1 official)?
5. **Practice**: Is there at least 1 practice activity for major topics?
6. **No contamination**: Does the topic belong in this domain?
7. **Current**: Is the technology/concept still in active use?

### Quality Bar

Every topic must pass:

- ✅ Represents a real concept, skill, workflow, tool, or standard
- ✅ Has a clear description explaining what it is and why it matters
- ✅ Connects to at least one prerequisite and one follow-up
- ✅ Includes at least one resource
- ✅ Is placed in the correct domain (no contamination)
- ✅ Is at the appropriate depth level

---

## Taxonomy

### Career Domains (15)

| ID | Domain | Icon | Roadmap Count |
|----|--------|------|---------------|
| A | Software & Computing | 💻 | 5 |
| B | AI & Data | 🤖 | 3 |
| C | Cybersecurity | 🔒 | 2 |
| D | Cloud/DevOps/Infrastructure | ☁️ | 2 |
| E | Electrical/Electronics/Hardware | ⚡ | 1 |
| F | Mechanical Engineering | ⚙️ | 1 |
| G | Civil/Construction/Infrastructure | 🏗️ | 1 |
| H | Chemical/Process | 🧪 | 1 |
| I | Agricultural/Biological | 🌾 | 0 |
| J | Aerospace/Aviation | ✈️ | 1 |
| K | Industrial/Systems/Manufacturing | 🏭 | 1 |
| L | Materials/Metallurgy/Mining | 🔬 | 1 |
| M | Environmental/Energy/Sustainability | 🌱 | 1 |
| N | Biomedical/Bioengineering | 🏥 | 1 |
| O | Design/Technical Design | 🎨 | 0 |

### Skill Categories (12)

| Category | Skills |
|----------|--------|
| Programming Languages | Python, JavaScript |
| Web Development | React |
| Data | SQL |
| AI/ML | Machine Learning |
| Cloud | AWS, Docker, Kubernetes |
| DevOps | Git, Linux |
| Engineering Software | MATLAB |
| Cybersecurity | — |
| Mobile | — |
| Database | — |
| Design | — |
| Other | — |

---

## Update Methodology

### When to Update

- New major technology versions (Python 4, React 19, etc.)
- New industry certifications
- Changes in job market demand
- New career paths emerging (e.g., AI Agent Engineer)
- Accuracy corrections from community feedback

### Update Process

1. Research changes using the evidence hierarchy
2. Update source files in `data/v2/source/`
3. Run `node generate-v2.mjs` to regenerate
4. Run `node build-validation.mjs` to verify
5. Review contamination report
6. Test in the application

### Versioning

- Dataset version tracked in `sources-v2.json` → `version` field
- Each update increments the version
- `generated/index.json` → `lastUpdated` tracks generation date

---

## License

This dataset is original content created for the CareerRoadmaps application.
Topic structures and curriculum designs are based on publicly available educational standards
and occupational data, synthesized into original form.
