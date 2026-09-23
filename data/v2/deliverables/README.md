# CareerRoadmaps v3 — Resource, Practice & Certification System

## Overview

This dataset provides verified, topic-specific learning resources, practice activities and certifications mapped to every curriculum node across 155 careers and 106 skills.

## Deliverables

| File | Description | Count |
|------|-------------|-------|
| resources.json | Topic-specific learning resources | 16814 |
| practice.json | Domain-appropriate practice activities | 19303 |
| certifications.json | Real, verified certifications | 63 |
| resource-platforms.json | Verified resource platform registry | 76 |
| practice-platforms.json | Domain-appropriate practice platform mapping | Object |
| certification-providers.json | Real certification providers | 29 |
| source-registry.json | Source tracking & verification | 374 |
| curriculum.json | Curriculum reference summary | — |
| validation-report.json | Quality & coverage report | — |
| README.md | This file | — |

## Resolution Logic

When a user opens a topic:

1. **Exact match** — Topic-specific resource found (919 cases)
2. **Parent fallback** — Nearest parent topic resource (4119 cases)
3. **Skill fallback** — Skill-level resource (1774 cases)
4. **Discovery** — Keyword-gated domain/discovery resource (61 cases)

The UI displays the appropriate label for each scope level.

## Quality Rules

- ✅ Direct URLs preferred over search results
- ✅ Official documentation prioritized (Tier 1)
- ✅ Platform relevance maintained (no LeetCode for CAD topics)
- ✅ Engineering careers use engineering-specific resources
- ✅ Cybersecurity careers use security-specific labs
- ✅ Real certifications only (no fabricated credentials)
- ✅ Free vs paid clearly distinguished
- ✅ Parent fallback explicitly labelled
- ✅ No fabricated URLs
- ✅ No unrelated practice platforms

## Certification Labels

- "Free preparation — paid exam" for exams with free prep
- "Paid" for paid certifications
- "Free" for truly free credentials
- "No expiration" for lifetime credentials

## Updating

1. Add resources to topic-specific databases in build-resource-system.mjs
2. Run: node data/v2/resource-system/build-resource-system.mjs
3. Verify resolution report
4. Check validation-report.json for coverage gaps
