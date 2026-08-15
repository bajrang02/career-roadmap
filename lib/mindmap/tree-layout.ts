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
  scale: number;
  opacity: number;
  isFocused: boolean;
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
const SECTION_GAP = 36;

// Compact (mobile) spacing — slightly tighter so the whole map fits on small
// screens while pinch-zoom still reveals readable text. Mirrors the desktop
// slimmer-leaf tuning: smaller leaves + a tighter row floor mean expanded
// branches stack more per viewport on phones (touch targets stay well above
// the 48px minimum).
const COMPACT_H_GAP = 52;
const COMPACT_V_STEP = 72;

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
  interview: 180,
  achievement: 240,
  choice: 240,
};

// Mobile variant: narrower cards that still fit most of a 375px phone while
// leaving room to pan.
const COMPACT_NODE_W: Record<NodeType, number> = {
  career: 360,
  section: 350,
  subsection: 340,
  topic: 340,
  concept: 340,
  projects: 350,
  project: 340,
  optional: 340,
  advanced: 340,
  interview: 340,
  achievement: 350,
  choice: 350,
};

// Base height for a single-line title (44–56px, per the compact redesign).
// Career keeps the most presence for its % pill; two-line labels add +16 via
// estimateHeight.
const NODE_H: Record<NodeType, number> = {
  career: 56,
  section: 56,
  subsection: 46,
  topic: 46,
  concept: 44,
  projects: 46,
  project: 46,
  optional: 46,
  advanced: 46,
  interview: 40,
  achievement: 40,
  choice: 40,
};

// Mobile heights — same slim single-row cards, trimmed leaves (career/section
// keep their anchor presence) so expanded branches fit more on phones.
const COMPACT_NODE_H: Record<NodeType, number> = {
  career: 86,
  section: 78,
  subsection: 70,
  topic: 70,
  concept: 66,
  projects: 74,
  project: 70,
  optional: 66,
  advanced: 66,
  interview: 66,
  achievement: 74,
  choice: 74,
};

export function estimateWidth(type: NodeType, compact = false, widthOverride?: number) {
  const map = compact ? COMPACT_NODE_W : NODE_W;
  return widthOverride ?? map[type] ?? (compact ? 180 : 220);
}

export function estimateHeight(type: NodeType, label: string, compact = false, nodeData?: RoadmapNode, choices?: Record<string, string>, widthOverride?: number) {
  const baseMap = compact ? COMPACT_NODE_H : NODE_H;
  const widthMap = compact ? COMPACT_NODE_W : NODE_W;
  const base = baseMap[type] ?? (compact ? 44 : 48);
  const width = widthOverride ?? widthMap[type] ?? 220;
  const charsPerLine = Math.max(10, Math.floor((width - 24) / 7.2));
  const lines = Math.min(MAX_LINES, Math.max(1, Math.ceil(label.length / charsPerLine)));
  // compact titles are 18-20px -> ~24px per wrapped line
  const lineHeight = compact ? 24 : 16;
  let h = base + (lines - 1) * lineHeight;

  if (type === "choice" && nodeData && choices) {
    if (!choices[nodeData.id]) {
      // Unselected: needs height for radio button list
      const optionCount = nodeData.options?.length ?? 0;
      h += optionCount * 36 + 12; // ~36px per option + padding
    } else {
      // Selected: needs slight height for "Change" button if we put it on a new line,
      // but if it's inline, maybe no extra height needed. Let's add 20px just in case.
      h += 20;
    }
  }

  return h;
}

export function getActiveChildren(node: RoadmapNode, choices?: Record<string, string>) {
  if (node.type === "choice") {
    if (choices && choices[node.id]) {
      return (node.options || node.children || []).filter((c) => c.id === choices[node.id]);
    }
    return [];
  }
  return node.children ?? [];
}

export function getAllChildren(node: RoadmapNode) {
  return [...(node.children ?? []), ...(node.options ?? [])];
}

// Returns the visible tree (children pruned by collapsed set) as plain data.
export function visibleTree(root: RoadmapNode, collapsed: Set<string>, choices?: Record<string, string>, seen = new Set<string>()): RoadmapNode {
  seen.add(root.id);
  const clone: RoadmapNode = {
    ...root,
    children: getActiveChildren(root, choices)
      .filter((c) => c && !collapsed.has(root.id) && !seen.has(c.id))
      .map((c) => visibleTree(c, collapsed, choices, new Set(seen))),
  };
  return clone;
}

export function collectNodeIds(root: RoadmapNode, choices?: Record<string, string>, out: string[] = [], seen = new Set<string>()) {
  if (seen.has(root.id)) return out;
  seen.add(root.id);
  out.push(root.id);
  for (const c of getActiveChildren(root, choices)) collectNodeIds(c, choices, out, seen);
  return out;
}

export function collectLearnableIds(root: RoadmapNode, choices?: Record<string, string>, out: string[] = [], seen = new Set<string>()) {
  if (seen.has(root.id)) return out;
  seen.add(root.id);
  if (!["section", "subsection", "projects", "choice"].includes(root.type)) out.push(root.id);
  for (const c of getActiveChildren(root, choices)) collectLearnableIds(c, choices, out, seen);
  return out;
}

export function findNode(root: RoadmapNode, id: string, seen = new Set<string>()): RoadmapNode | null {
  if (seen.has(root.id)) return null;
  seen.add(root.id);
  if (root.id === id) return root;
  for (const c of getAllChildren(root)) {
    const found = findNode(c, id, seen);
    if (found) return found;
  }
  return null;
}

export function pathToNode(root: RoadmapNode, id: string): RoadmapNode[] {
  const seen = new Set<string>();
  const walk = (node: RoadmapNode, trail: RoadmapNode[]): RoadmapNode[] | null => {
    if (seen.has(node.id)) return null;
    seen.add(node.id);
    const next = [...trail, node];
    if (node.id === id) return next;
    for (const c of getAllChildren(node)) {
      const found = walk(c, next);
      if (found) return found;
    }
    return null;
  };
  return walk(root, []) ?? [];
}

export interface LayoutResult {
  nodes: LayoutNode[];
  edges: { source: LayoutNode; target: LayoutNode; d: string; isActive?: boolean }[];
  width: number;
  height: number;
}

export function computeLayout(
  root: RoadmapNode,
  collapsed: Set<string>,
  compact = false,
  selectedId: string | null = null,
  choices?: Record<string, string>,
  /** viewport width (px) — used to size compact cards so they never exceed the
   *  narrowest supported phone (320px). Falls back to the fixed compact width. */
  containerWidth?: number
): LayoutResult {
  const hGap = compact ? COMPACT_H_GAP : H_GAP;
  const vStep = compact ? COMPACT_V_STEP : V_STEP;
  // On phones the card width tracks the viewport (capped at the designed max)
  // so a 320px screen never clips node content, while wider phones get roomier
  // cards. Desktop keeps its fixed widths regardless of the container.
  const compactW = compact
    ? Math.max(260, Math.min(340, (containerWidth ?? 375) - 40))
    : 0;
  // children count from the ORIGINAL tree (visibleTree prunes collapsed nodes,
  // which would otherwise hide expand controls and shrink their height)
  const childCount = new Map<string, number>();
  const countSeen = new Set<string>();
  const countChildren = (n: RoadmapNode) => {
    if (countSeen.has(n.id)) return;
    countSeen.add(n.id);
    const active = getActiveChildren(n, choices);
    childCount.set(n.id, active.length);
    for (const c of active) countChildren(c);
  };
  countChildren(root);

  const tree = visibleTree(root, collapsed, choices);

  const activePath = selectedId ? pathToNode(tree, selectedId) : [];
  const activeParent = activePath.length > 1 ? activePath[activePath.length - 2] : null;

  const activePathIds = new Set(activePath.map(n => n.id));

  const h = hierarchy<RoadmapNode>(tree, (n) => n.children ?? []);
  h.each((d) => {
    let scale = 1.0;
    let opacity = 1.0;
    let isFocused = false;

    if (selectedId) {
      if (d.data.id === selectedId) {
        scale = 1.12;
        isFocused = true;
      } else if (d.parent?.data.id === selectedId) {
        scale = 1.08; // children
        isFocused = true;
      } else if (d.parent?.parent?.data.id === selectedId) {
        scale = 1.0; // grandchildren
        isFocused = true;
      } else if (activeParent?.id === d.data.id) {
        scale = 1.0; // parent
        isFocused = true;
      } else if (d.parent?.data.id === activeParent?.id) {
        scale = 1.0; // Siblings of current node
        opacity = 0.45;
      } else {
        scale = 0.9;
      }

      if (!activePathIds.has(d.data.id) && !isFocused && d.parent?.data.id !== activeParent?.id) {
        opacity = 0.35; // Unrelated branches
      }
    }

    const nodeData = d as unknown as { _scale: number, _w: number, _h: number, _opacity: number, _isFocused: boolean };
    nodeData._scale = scale;
    nodeData._opacity = opacity;
    nodeData._isFocused = isFocused;
    // We leave _w and _h unscaled so the layout box represents the unscaled bounds,
    // and we inject the scale into the gap spacing directly.
    nodeData._w = compactW ? estimateWidth(d.data.type, true, compactW) : estimateWidth(d.data.type, false);
    nodeData._h = compactW
      ? estimateHeight(d.data.type, d.data.label, true, d.data, choices, compactW)
      : estimateHeight(d.data.type, d.data.label, false, d.data, choices);
  });

  // Left-to-right tidy tree.
  // d3 tree: d.x = sibling separation coordinate, d.y = depth.
  const lay = d3tree<RoadmapNode>()
    .nodeSize([vStep, 1])
    .separation((a, b) => {
      const sa = a as unknown as { _scale: number; _h: number };
      const sb = b as unknown as { _scale: number; _h: number };
      const hA = sa._h * (sa._scale || 1.0);
      const hB = sb._h * (sb._scale || 1.0);
      const padding = a.parent === b.parent ? 16 : 40;
      return ((hA + hB) / 2 + padding) / vStep;
    });
  const rootLayout = lay(h);

  // Compute organic parent-relative horizontal positions instead of rigid depth columns.
  // This prevents unrelated branches from shifting when the active branch expands.
  rootLayout.eachBefore((d) => {
    const node = d as unknown as { _scale?: number, _w?: number, _x: number };
    const parentNode = d.parent ? (d.parent as unknown as { _scale?: number, _w?: number, _x: number }) : null;
    
    if (!parentNode) {
      node._x = 0;
    } else {
      const sa = parentNode._scale || 1.0;
      const sb = node._scale || 1.0;
      // scale the horizontal gap, plus add the parent's base width
      // wait, the visual scale expands the node outward from its center by scale factor.
      // So the space needed is actually scaled w. We approximate by scaling the whole jump.
      const jump = (parentNode._w || 0) * sa + hGap * ((sa + sb) / 2);
      node._x = (parentNode._x || 0) + jump;
    }
  });

  const xs: number[] = [];
  rootLayout.each((d) => {
    const h = (d as unknown as { _h: number })._h || 0;
    xs.push(d.x - h / 2);
  });
  const minX = Math.min(...xs);

  const nodes: LayoutNode[] = [];
  const byId = new Map<string, LayoutNode>();
  rootLayout.each((d) => {
    const data = d.data;
    const h = (d as unknown as { _h: number })._h || 0;
    const ln: LayoutNode = {
      id: data.id,
      label: data.label,
      type: data.type,
      x: (d as unknown as { _x: number })._x,
      y: d.x - h / 2 - minX,
      w: (d as unknown as { _w: number })._w,
      h: (d as unknown as { _h: number })._h,
      scale: (d as unknown as { _scale?: number })._scale || 1.0,
      opacity: (d as unknown as { _opacity?: number })._opacity ?? 1.0,
      isFocused: (d as unknown as { _isFocused?: boolean })._isFocused ?? false,
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
    const isActive = activePathIds.has(ln.id) || ln.parent.id === selectedId;
    edges.push({
      source: ln.parent,
      target: ln,
      d: `M ${x1} ${y1} C ${x1 + c} ${y1}, ${x2 - c} ${y2}, ${x2} ${y2}`,
      isActive,
    });
  }

  // recompute the canvas size from the final (post-shift) node extents
  const minY = Math.min(...nodes.map((n) => n.y));
  const maxY = Math.max(...nodes.map((n) => n.y + n.h));
  const totalH = Math.max(0, maxY - minY);
  const totalW = Math.max(0, ...nodes.map((n) => n.x + n.w * n.scale));

  return { nodes, edges, width: totalW, height: totalH };
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

export function computeFocusBounds(layout: LayoutResult, selectedId: string | null) {
  if (!selectedId) {
    return {
      x: 0,
      y: 0,
      width: layout.width,
      height: layout.height,
    };
  }

  const nodesToInclude = new Set<string>();
  
  // Find selected node
  const selectedNode = layout.nodes.find(n => n.id === selectedId);
  if (!selectedNode) {
    return { x: 0, y: 0, width: layout.width, height: layout.height };
  }

  // Include Current Node
  nodesToInclude.add(selectedNode.id);

  // Include Parent
  if (selectedNode.parent) {
    nodesToInclude.add(selectedNode.parent.id);
  }

  // Include Children
  for (const child of selectedNode.children) {
    nodesToInclude.add(child.id);
    // Include Grandchildren
    for (const grandChild of child.children) {
      nodesToInclude.add(grandChild.id);
    }
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const n of layout.nodes) {
    if (nodesToInclude.has(n.id)) {
      const scaledW = n.w * n.scale;
      const scaledH = n.h * n.scale;
      // Coordinates need to factor in scale which is centered.
      // n.x and n.y represent the top-left of the unscaled box.
      // The box is scaled around its center (n.x + n.w/2, n.y + n.h/2).
      const cx = n.x + n.w / 2;
      const cy = n.y + n.h / 2;
      
      const nx1 = cx - scaledW / 2;
      const ny1 = cy - scaledH / 2;
      const nx2 = cx + scaledW / 2;
      const ny2 = cy + scaledH / 2;

      if (nx1 < minX) minX = nx1;
      if (ny1 < minY) minY = ny1;
      if (nx2 > maxX) maxX = nx2;
      if (ny2 > maxY) maxY = ny2;
    }
  }

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}
