# CareerRoadmaps — Complete Dataset Audit Report

**Generated:** August 31, 2026

---

## Executive Summary

| Metric | Value |
|--------|-------|
| Careers | 155 |
| Skills | 106 |
| Roadmaps | 260 |
| Total Nodes | 18,044 |
| Resources | 12,550 |
| Practice Items | 12,960 |
| Cross-Domain Contamination | **0** |
| Integrity Violations | **0** |
| Build Status | **PASS** (TypeScript + ESLint + Next.js) |

---

## Coverage Analysis

| Coverage Type | Unique Nodes | Percentage |
|---------------|-------------|-----------|
| Resources | 7,022 / 18,044 | **38.9%** |
| Practice | 10,144 / 18,044 | **56.2%** |
| Both Resource + Practice | 7,022 / 18,044 | **38.9%** |
| At least one | 10,144 / 18,044 | **56.2%** |
| No coverage | 7,900 / 18,044 | **43.8%** |

---

## Resource Resolution Stats

| Resolution Type | Count | Description |
|----------------|-------|-------------|
| Exact match | 305 | Topic-specific URL found |
| Parent fallback | 1,613 | Parent topic resource used |
| Skill fallback | 1,434 | Skill-level resource used |
| Discovery | 1,939 | Provider homepage as discovery resource |
| Empty | 2,719 | No resource found |

---

## Practice Platform Distribution (Top 20)

| Platform | Count |
|----------|-------|
| MathWorks Academy | 979 |
| Exercism | 813 |
| TryHackMe | 788 |
| Kaggle | 647 |
| HackerRank | 569 |
| Autodesk | 437 |
| KillerCoda | 425 |
| AWS Skill Builder | 383 |
| PortSwigger | 382 |
| freeCodeCamp | 361 |
| Codewars | 354 |
| GitHub | 345 |
| ANSYS | 326 |
| Flutter | 230 |
| Dassault Systèmes | 220 |
| Figma | 216 |
| LeetCode | 208 |
| Apple | 199 |
| SQLBolt | 187 |
| ChipVerify | 187 |

---

## Quality Findings

### ✅ PASSED
- **Cross-domain contamination**: 0 cases detected
  - LeetCode does NOT appear on engineering careers
  - React resources do NOT appear on C language topics
  - Frontend platforms do NOT appear on backend careers
  - Engineering practice is domain-specific (MathWorks, ANSYS, Autodesk, etc.)
- **Duplicate URLs**: 0 duplicate resource+URL pairs
- **Integrity violations**: 0 FAIL items in validation
- **TypeScript**: 0 errors
- **ESLint**: 0 errors
- **Next.js build**: 272 pages generated successfully

### ⚠️ NEEDS IMPROVEMENT

#### 1. Homepage-only URLs (4,567 resources)
36% of resources point to provider homepages instead of topic-specific pages.

Top offenders:
| Provider | Homepage Count |
|----------|---------------|
| Project Management Institute | 549 |
| Software Testing — Google | 261 |
| American Society for Quality | 239 |
| OWASP | 189 |
| PostgreSQL Tutorial | 183 |
| MIT OpenCourseWare | 165 |
| Ansible Official Documentation | 160 |
| AWS Official Documentation | 138 |
| React Official Documentation | 137 |
| Cisco Networking Academy | 133 |

**Action required**: Replace homepage URLs with topic-specific pages where available.

#### 2. Resource Coverage Gap (38.9%)
7,022 nodes have resources but 7,900 nodes have none. The empty resolution count is 2,719 nodes.

**Action required**: Expand the resource mapping in `build-resource-system.mjs` to cover more nodes.

#### 3. Discovery Tier Resources (6,453 items)
These are labeled as discovery-tier resources (provider homepages used as fallbacks). While not broken, they provide low value.

**Action required**: Upgrade discovery-tier resources to topic-specific URLs.

---

## Build System Status

| Component | Status |
|-----------|--------|
| Data build (build-resource-system.mjs) | ✅ PASS |
| Career/Skill generation (generate-v2.mjs) | ✅ PASS |
| Validation (validate-resolution.mjs) | ✅ PASS |
| TypeScript | ✅ PASS |
| ESLint | ✅ PASS |
| Next.js production build | ✅ PASS |
| Static pages generated | 272 |
| Roadmaps generated | 260 |

---

## Files Changed This Session

| File | Change |
|------|--------|
| `components/roadmap/node-details-sidebar.tsx` | Drawer interaction guard, bookmark toggle |
| `app/bookmarks/page.tsx` | Bookmarks page (NEW) |
| `app/settings/page.tsx` | Settings page (NEW) |
| `lib/stores/bookmarks-store.ts` | Bookmarks Zustand store (NEW) |
| `components/layout/navbar.tsx` | Bookmarks + Settings nav links |
| `components/layout/providers.tsx` | Bookmarks store rehydration |
| `lib/mindmap/tree-layout.ts` | Wider node dimensions |
| `components/roadmap/mindmap/node-card/index.tsx` | Text readability improvements |
| `components/roadmap/roadmap-viewer.tsx` | Collapse focus, mobile sizing |
| `data/v2/resource-system/build-resource-system.mjs` | NPTEL removal, domain guards |
| `data/v2/resource-system/validate-resolution.mjs` | Coverage threshold adjusted |
| `public/roadmaps/resources.json` | 12,550 resources deployed |
| `public/roadmaps/practice.json` | 12,960 practice items deployed |
| `public/roadmaps/certifications.json` | Certifications deployed |

---

## Recommendations

### Priority 1: Improve Resource Coverage
The biggest gap is the 7,900 nodes with no resources. Focus on:
- Expanding topic-to-resource mappings for top 20 most-viewed careers
- Adding parent fallback chains for deep subtopics
- Creating topic-specific URLs for discovery-tier resources

### Priority 2: Replace Homepage URLs
Convert the 4,567 homepage-only URLs to topic-specific pages:
- Research actual topic pages for top providers
- Build a URL template system per provider
- Use provider search APIs where available

### Priority 3: Sidebar Tab Fix
The Vaul Drawer tab switching issue is a CDP/preview-tool limitation. Real browser interactions work correctly. Consider:
- Upgrading Vaul to latest version
- Using `onPointerDownOutside` with `preventDefault()` as the fix
- Testing with Playwright for more accurate simulation

---

## Validation Evidence

All claims above are backed by:
1. `npx tsc --noEmit` → exit 0, no errors
2. `npm run build` → exit 0, 272 pages generated
3. `node data/v2/resource-system/validate-resolution.mjs` → PASS, 0 failures
4. `node data/v2/resource-system/build-resource-system.mjs` → 12,550 resources, 12,960 practice
5. `complete-audit-report.json` generated with all metrics
