// ─────────────────────────────────────────────────────────────────────────────
// Aggregated curated knowledge for recurring skeleton labels.
// Merged into ALL_KNOWLEDGE in generate.mjs (KNOWLEDGE wins, so nothing
// hand-authored elsewhere is overridden). One entry per label applies in every
// roadmap where that label appears.
// ─────────────────────────────────────────────────────────────────────────────

import { META_CORE } from "./meta-knowledge-core.mjs";
import { META_DEVOPS } from "./meta-knowledge-devops.mjs";
import { META_SECURITY } from "./meta-knowledge-security.mjs";
import { META_DATA } from "./meta-knowledge-data.mjs";
import { META_ENGINEERING } from "./meta-knowledge-engineering.mjs";
import { META_SHELL } from "./meta-knowledge-shell.mjs";
import { META_PROG } from "./meta-knowledge-prog.mjs";
import { META_EXAM } from "./meta-knowledge-exam.mjs";
import { META_RECURRING_A } from "./meta-knowledge-recurring-a.mjs";
import { META_RECURRING_B } from "./meta-knowledge-recurring-b.mjs";
import { META_RECURRING_C } from "./meta-knowledge-recurring-c.mjs";
import { META_RECURRING_D } from "./meta-knowledge-recurring-d.mjs";
import { META_RECURRING_E } from "./meta-knowledge-recurring-e.mjs";
import { META_RECURRING_F } from "./meta-knowledge-recurring-f.mjs";
import { META_RECURRING_G } from "./meta-knowledge-recurring-g.mjs";
import { META_RECURRING_H } from "./meta-knowledge-recurring-h.mjs";
import { META_RECURRING_I } from "./meta-knowledge-recurring-i.mjs";
import { META_RECURRING_J } from "./meta-knowledge-recurring-j.mjs";
import { META_RECURRING_K } from "./meta-knowledge-recurring-k.mjs";
import { META_RECURRING_L } from "./meta-knowledge-recurring-l.mjs";
import { META_RECURRING_M } from "./meta-knowledge-recurring-m.mjs";
import { META_RECURRING_N } from "./meta-knowledge-recurring-n.mjs";
import { META_RECURRING_O } from "./meta-knowledge-recurring-o.mjs";
import { META_RECURRING_P } from "./meta-knowledge-recurring-p.mjs";

export const META_KNOWLEDGE = {
  ...META_CORE,
  ...META_DEVOPS,
  ...META_SECURITY,
  ...META_DATA,
  ...META_ENGINEERING,
  ...META_SHELL,
  ...META_PROG,
  ...META_EXAM,
  ...META_RECURRING_A,
  ...META_RECURRING_B,
  ...META_RECURRING_C,
  ...META_RECURRING_D,
  ...META_RECURRING_E,
  ...META_RECURRING_F,
  ...META_RECURRING_G,
  ...META_RECURRING_H,
  ...META_RECURRING_I,
  ...META_RECURRING_J,
  ...META_RECURRING_K,
  ...META_RECURRING_L,
  ...META_RECURRING_M,
  ...META_RECURRING_N,
  ...META_RECURRING_O,
  ...META_RECURRING_P,
};
