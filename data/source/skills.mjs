// ─────────────────────────────────────────────────────────────────────────────
// Skill catalog — every individual skill / technology / tool with metadata.
// `categories` may include several category ids so a skill is browsable under
// each of them (e.g. JavaScript under Programming Languages + Web Development).
// `template` selects the skeleton builder in skill-skeletons.mjs; `topics`
// carries the skill-specific topics merged into that template.
// ─────────────────────────────────────────────────────────────────────────────
import { SKILL_CATEGORIES, SKILL_CATEGORY_MAP } from "./skills-categories.mjs";
import { LANGUAGE_SKILLS } from "./skills-languages.mjs";
import { WEB_SKILLS } from "./skills-web.mjs";
import { BACKEND_SKILLS } from "./skills-backend.mjs";
import { DATA_SKILLS } from "./skills-data.mjs";
import { DATABASE_SKILLS } from "./skills-databases.mjs";
import { DEVOPS_SKILLS } from "./skills-devops.mjs";
import { SECURITY_SKILLS } from "./skills-security.mjs";
import { ENGINEERING_SKILLS } from "./skills-engineering.mjs";
import { DESIGN_SKILLS } from "./skills-design.mjs";
import { OFFICE_SKILLS } from "./skills-office.mjs";

export const SKILLS = [
  ...LANGUAGE_SKILLS,
  ...WEB_SKILLS,
  ...BACKEND_SKILLS,
  ...DATA_SKILLS,
  ...DATABASE_SKILLS,
  ...DEVOPS_SKILLS,
  ...SECURITY_SKILLS,
  ...ENGINEERING_SKILLS,
  ...DESIGN_SKILLS,
  ...OFFICE_SKILLS,
];

export { SKILL_CATEGORIES, SKILL_CATEGORY_MAP };
