import type { NodeType, RoadmapNode } from "@/lib/types";

/** Actions dispatched up to the roadmap viewer (they touch global state).
 *  Since the hover toolbar moved into the details panel, the compact card
 *  only ever dispatches "complete" (the checkbox). Everything else —
 *  bookmark, copy-link, subtree completion — lives in the sidebar now. */
export type NodeAction = "complete";

export interface NodeCardProps {
  id: string;
  label: string;
  type: NodeType;
  x: number;
  y: number;
  w: number;
  h: number;
  scale?: number;
  hasChildren: boolean;
  collapsed: boolean;
  selected: boolean;
  focused: boolean;
  /** strong fade for hover-path dimming (unrelated branches on hover) */
  dimmed: boolean;
  /** gentle fade when another node is selected (everything off the learning path) */
  faded: boolean;
  /** light-blue ring for the most recently visited node (context memory) */
  recent: boolean;
  completed: boolean;
  locked: boolean;
  searchHit: boolean;
  bookmarked: boolean;
  /** play a brief flash ring (search result jump) */
  flash: boolean;
  /** whether this node is mounting for the first time (fade in) vs re-entering the viewport */
  mountAnimated: boolean;
  /** per-node subtree completion percent (0–100) — shown as a slim bar */
  pct: number;
  /** total learnable nodes in this subtree — shown with pct as “3/10” */
  learnableCount: number;
  /** full node payload — description, difficulty, time, resources, projects */
  data: RoadmapNode;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
  onHover: (id: string | null) => void;
  onAction: (action: NodeAction, id: string) => void;
}
