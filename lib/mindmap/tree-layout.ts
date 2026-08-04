import { hierarchy, tree as d3tree } from "d3-hierarchy";
import type { NodeType, RoadmapNode } from "../types";

export interface LayoutNode {
  id: string;
  label: string;
  type: NodeType;
  x: number;
  y: number;
  w: number;
  h: number;
  depth: number;
  parent: LayoutNode | null;
  children: LayoutNode[];
  data: RoadmapNode;
  /** number of children on the ORIGINAL (unpruned) node — used to show expand
   *  controls even when the node is collapsed and its children are pruned. */
  childCount: number;
}

// Visual hierarchy spacing: roadmap.sh-style compact density. Nodes are slim
// (44–56px) single-row cards, so V_STEP only needs to clear the tallest node
// (career ≈ 56px) with a ~16–22px sibling gap. Sections (depth 1) get extra
// breathing room via a post-layout pass (see computeLayout).
const H_GAP = 56; // horizontal gap between depth columns (left→right flow)
const V_STEP = 68; // vertical space between sibling rows (≈48px node + ~20px gap)
const MAX_LINES = 2; // labels wrap to at most 2 lines (matches line-clamp-2)

// Extra vertical gap inserted between consecutive top-level section subtrees
// so sections read as distinct groups (≈30–40px total between sections).
const SECTION_GAP = 34;

// Compact (mobile) spacing — slightly tighter so the whole map fits on small
// screens while pinch-zoom still reveals readable text.
const COMPACT_H_GAP = 40;
const COMPACT_V_STEP = 64;

// Compact cards sized for the slim single-row layout: a type icon, the title
// (truncating past ~2 lines) and the chevron. No touch action row anymore —
// every action lives in the details panel — so cards can be genuinely narrow.
const NODE_W: Record<NodeType, number> = {
  career: 288,
  section: 258,
  subsection: 234,
  topic: 224,
  concept: 214,
  projects: 238,
  project: 230,
  optional: 220,
  advanced: 220,
  interview: 220,
  achievement: 244,
};

// Mobile variant: narrower cards that still fit most of a 375px phone while
// leaving room to pan.
const COMPACT_NODE_W: Record<NodeType, number> = {
  career: 232,
  section: 208,
  subsection: 190,
  topic: 184,
  concept: 176,
  projects: 194,
  project: 188,
  optional: 182,
  advanced: 182,
  interview: 182,
  achievement: 204,
};

// Base height for a single-line title (44–56px, per the compact redesign).
// Career keeps the most presence for its % pill; two-line labels add +16 via
// estimateHeight.
const NODE_H: Record<NodeType, number> = {
  career: 56,
  section: 52,
  subsection: 50,
  topic: 48,
  concept: 46,
  projects: 50,
  project: 48,
  optional: 46,
  advanced: 46,
  interview: 46,
  achievement: 50,
};

// Mobile heights — same slim single-row cards; only slightly shorter.
const COMPACT_NODE_H: Record<NodeType, number> = {
  career: 54,
  section: 50,
  subsection: 48,
  topic: 46,
  concept: 44,
  projects: 48,
  project: 46,
  optional: 44,
  advanced: 44,
  interview: 44,
  achievement: 48,
};

export function estimateWidth(type: NodeType, compact = false) {
  const map = compact ? COMPACT_NODE_W : NODE_W;
  return map[type] ?? (compact ? 180 : 220);
}

export function estimateHeight(type: NodeType, label: string, compact = false) {
  const baseMap = compact ? COMPACT_NODE_H : NODE_H;
  const widthMap = compact ? COMPACT_NODE_W : NODE_W;
  const base = baseMap[type] ?? (compact ? 44 : 48);
  const width = widthMap[type] ?? 220;
  const charsPerLine = Math.max(10, Math.floor((width - 24) / 7.2));
  const lines = Math.min(MAX_LINES, Math.max(1, Math.ceil(label.length / charsPerLine)));
  // compact titles are 14–15px → ~16px per wrapped line
  return base + (lines - 1) * 16;
}

// Returns the visible tree (children pruned by collapsed set) as plain data.
export function visibleTree(root: RoadmapNode, collapsed: Set<string>): RoadmapNode {
  const clone: RoadmapNode = {
    ...root,
    children: (root.children ?? [])
      .filter((c) => !collapsed.has(root.id) && c)
      .map((c) => visibleTree(c, collapsed)),
  };
  return clone;
}

export function collectNodeIds(root: RoadmapNode, out: string[] = []) {
  out.push(root.id);
  for (const c of root.children ?? []) collectNodeIds(c, out);
  return out;
}

export function collectLearnableIds(root: RoadmapNode, out: string[] = []) {
  if (!["section", "subsection", "projects"].includes(root.type)) out.push(root.id);
  for (const c of root.children ?? []) collectLearnableIds(c, out);
  return out;
}

export function findNode(root: RoadmapNode, id: string): RoadmapNode | null {
  if (root.id === id) return root;
  for (const c of root.children ?? []) {
    const found = findNode(c, id);
    if (found) return found;
  }
  return null;
}

export function pathToNode(root: RoadmapNode, id: string): RoadmapNode[] {
  const walk = (node: RoadmapNode, trail: RoadmapNode[]): RoadmapNode[] | null => {
    const next = [...trail, node];
    if (node.id === id) return next;
    for (const c of node.children ?? []) {
      const found = walk(c, next);
      if (found) return found;
    }
    return null;
  };
  return walk(root, []) ?? [];
}

export interface LayoutResult {
  nodes: LayoutNode[];
  edges: { source: LayoutNode; target: LayoutNode; d: string }[];
  width: number;
  height: number;
}

export function computeLayout(root: RoadmapNode, collapsed: Set<string>, compact = false): LayoutResult {
  const hGap = compact ? COMPACT_H_GAP : H_GAP;
  const vStep = compact ? COMPACT_V_STEP : V_STEP;
  // children count from the ORIGINAL tree (visibleTree prunes collapsed nodes,
  // which would otherwise hide expand controls and shrink their height)
  const childCount = new Map<string, number>();
  const countChildren = (n: RoadmapNode) => {
    childCount.set(n.id, n.children?.length ?? 0);
    for (const c of n.children ?? []) countChildren(c);
  };
  countChildren(root);

  const tree = visibleTree(root, collapsed);

  const h = hierarchy<RoadmapNode>(tree, (n) => n.children ?? []);
  h.each((d) => {
    (d as unknown as { _w: number })._w = estimateWidth(d.data.type, compact);
    (d as unknown as { _h: number })._h = estimateHeight(d.data.type, d.data.label, compact);
  });

  // Left-to-right tidy tree.
  // d3 tree: d.x = sibling separation coordinate, d.y = depth.
  // nodeSize([V_STEP, 1]) scales separation by V_STEP → vertical axis;
  // horizontal axis comes from per-depth column offsets below.
  const lay = d3tree<RoadmapNode>().nodeSize([vStep, 1]);
  const rootLayout = lay(h);

  // per-depth max width → cumulative x offsets (equal spacing per level)
  const maxW = new Map<number, number>();
  rootLayout.each((d) => {
    maxW.set(d.depth, Math.max(maxW.get(d.depth) ?? 0, (d as unknown as { _w: number })._w));
  });
  const depthOrder = Array.from(maxW.keys()).sort((a, b) => a - b);
  const xOffset = new Map<number, number>();
  let acc = 0;
  for (const depth of depthOrder) {
    xOffset.set(depth, acc);
    acc += (maxW.get(depth) ?? 0) + hGap;
  }
  const totalWidth = acc - hGap;

  // vertical positions come from the d3 separation coordinate; normalize so
  // the topmost node sits at y=0 (canvas height is recomputed from the final
  // node boxes after the section-spacing pass below).
  const xs: number[] = [];
  rootLayout.each((d) => xs.push(d.x));
  const minX = Math.min(...xs);

  const nodes: LayoutNode[] = [];
  const byId = new Map<string, LayoutNode>();
  rootLayout.each((d) => {
    const data = d.data;
    const ln: LayoutNode = {
      id: data.id,
      label: data.label,
      type: data.type,
      x: xOffset.get(d.depth) ?? 0,
      y: d.x - minX,
      w: (d as unknown as { _w: number })._w,
      h: (d as unknown as { _h: number })._h,
      depth: d.depth,
      parent: null,
      children: [],
      data,
      childCount: childCount.get(data.id) ?? 0,
    };
    byId.set(ln.id, ln);
    nodes.push(ln);
  });
  rootLayout.each((d) => {
    const ln = byId.get(d.data.id);
    if (!ln || !d.parent) return;
    ln.parent = byId.get(d.parent.data.id) ?? null;
    ln.parent?.children.push(ln);
  });

  // Extra breathing room between top-level sections: after the tidy tree has
  // packed everything at V_STEP, push each section's whole subtree down so the
  // vertical gap between consecutive section groups lands in the 30–40px range.
  const depth1 = nodes.filter((n) => n.depth === 1).sort((a, b) => a.y - b.y);
  if (depth1.length > 1) {
    const bounds = new Map<string, { min: number; max: number }>();
    for (const n of nodes) {
      let sec: LayoutNode | null = n;
      while (sec && sec.depth > 1) sec = sec.parent;
      if (!sec || sec.depth !== 1) continue;
      const b = bounds.get(sec.id) ?? { min: Infinity, max: -Infinity };
      if (n.y < b.min) b.min = n.y;
      if (n.y + n.h > b.max) b.max = n.y + n.h;
      bounds.set(sec.id, b);
    }
    const shiftBy = new Map<string, number>();
    let cumulative = 0;
    let prevMax = -Infinity;
    for (const s of depth1) {
      const b = bounds.get(s.id)!;
      const top = b.min + cumulative;
      if (prevMax !== -Infinity && top - prevMax < SECTION_GAP) {
        cumulative += SECTION_GAP - (top - prevMax);
      }
      shiftBy.set(s.id, cumulative);
      prevMax = Math.max(prevMax, b.max + cumulative);
    }
    for (const n of nodes) {
      let sec: LayoutNode | null = n;
      while (sec && sec.depth > 1) sec = sec.parent;
      if (sec && sec.depth === 1) {
        const sh = shiftBy.get(sec.id) ?? 0;
        if (sh) n.y += sh;
      }
    }
  }

  // edges (smooth uniform bezier, left → right) — control points pulled to
  // ~45% of the horizontal run so every connector shares one curvature.
  const edges: LayoutResult["edges"] = [];
  for (const ln of nodes) {
    if (!ln.parent) continue;
    const x1 = ln.parent.x + ln.parent.w;
    const y1 = ln.parent.y + ln.parent.h / 2;
    const x2 = ln.x;
    const y2 = ln.y + ln.h / 2;
    const dx = x2 - x1;
    const c = Math.min(dx * 0.45, 96);
    edges.push({
      source: ln.parent,
      target: ln,
      d: `M ${x1} ${y1} C ${x1 + c} ${y1}, ${x2 - c} ${y2}, ${x2} ${y2}`,
    });
  }

  // recompute the canvas size from the final (post-shift) node extents
  const minY = Math.min(...nodes.map((n) => n.y));
  const maxY = Math.max(...nodes.map((n) => n.y + n.h));
  const totalH = Math.max(0, maxY - minY);

  return { nodes, edges, width: totalWidth, height: totalH };
}

// DFS-order list of visible nodes (for keyboard navigation)
export function dfsOrder(layout: LayoutResult): LayoutNode[] {
  const out: LayoutNode[] = [];
  const stack = [...layout.nodes.filter((n) => n.depth === 0)];
  const seen = new Set<string>();
  while (stack.length) {
    const n = stack.pop()!;
    if (seen.has(n.id)) continue;
    seen.add(n.id);
    out.push(n);
    for (let i = n.children.length - 1; i >= 0; i--) stack.push(n.children[i]);
  }
  return out;
}
