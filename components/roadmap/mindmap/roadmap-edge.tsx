"use client";

import { memo } from "react";
import { motion } from "framer-motion";

interface RoadmapEdgeProps {
  d: string;
  active: boolean;
  dimmed: boolean;
  index: number;
}

/**
 * A single smooth bezier connector between a parent node and a child node.
 * - Draws in with a pathLength animation on mount (new branches).
 * - Smoothly morphs to its new path when the layout re-balances.
 * - Theme-aware: colors come from CSS vars (--edge / --edge-active) so light
 *   and dark mode each get a tuned connector without re-rendering edges.
 * - Dims/activates via CSS `strokeOpacity` transitions (no JS animation per
 *   hover), so sweeping across a big roadmap never triggers hundreds of
 *   concurrent framer-motion tweens.
 * - Memoized so pan/zoom (which don't change `d`) never re-render edges.
 */
function RoadmapEdgeInner({ d, active, dimmed, index }: RoadmapEdgeProps) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={active ? "var(--edge-active)" : "var(--edge)"}
      strokeWidth={active ? 2 : 1.25}
      strokeLinecap="round"
      // `d` must be present in BOTH initial and animate: framer-motion renders
      // the SVG path attribute from `initial` on mount, so leaving it out
      // momentarily sets d="undefined" (browser console errors).
      initial={{ pathLength: 0, d }}
      animate={{ pathLength: 1, d }}
      transition={{
        d: { duration: 0.35, ease: "easeInOut" },
        pathLength: { duration: 0.45, delay: Math.min(index * 0.004, 0.6), ease: "easeOut" },
      }}
      style={{
        strokeOpacity: dimmed ? 0.12 : active ? 1 : 0.45,
        transition: "stroke-opacity 0.25s ease",
        filter: active ? "drop-shadow(0 1px 2px var(--edge-glow))" : undefined,
      }}
    />
  );
}

export const RoadmapEdge = memo(RoadmapEdgeInner);
