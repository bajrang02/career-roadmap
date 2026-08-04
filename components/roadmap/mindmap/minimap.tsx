"use client";

import { useMemo, useRef } from "react";
import type { LayoutResult } from "@/lib/mindmap/tree-layout";
import type { Viewport } from "./mindmap-canvas";

export function Minimap({
  layout,
  viewport,
  containerSize,
  selectedId,
  onJump,
}: {
  layout: LayoutResult;
  viewport: Viewport;
  containerSize: { w: number; h: number };
  selectedId: string | null;
  onJump: (v: Viewport) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const MAP_W = 172;
  const MAP_H = 112;

  const scale = useMemo(() => {
    const s = Math.min(MAP_W / Math.max(layout.width, 1), MAP_H / Math.max(layout.height, 1));
    return Math.min(s, 1);
  }, [layout.width, layout.height]);

  const offsetX = (MAP_W - layout.width * scale) / 2;
  const offsetY = (MAP_H - layout.height * scale) / 2;

  const viewW = (containerSize.w / viewport.k) * scale;
  const viewH = (containerSize.h / viewport.k) * scale;
  const viewX = offsetX + (-viewport.x / viewport.k) * scale;
  const viewY = offsetY + (-viewport.y / viewport.k) * scale;

  const jumpTo = (clientX: number, clientY: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((clientX - rect.left - viewW / 2 - offsetX) / scale) * viewport.k + viewport.x;
    const y = ((clientY - rect.top - viewH / 2 - offsetY) / scale) * viewport.k + viewport.y;
    onJump({ ...viewport, x, y });
  };

  const colorFor = (type: string) => {
    switch (type) {
      case "career": return "#2563eb";
      case "section": return "#f59e0b";
      case "subsection": return "#94a3b8";
      case "topic": return "#64748b";
      case "project":
      case "projects": return "#10b981";
      case "achievement": return "#059669";
      case "optional": return "#8b5cf6";
      case "advanced": return "#f97316";
      case "interview": return "#6366f1";
      default: return "#cbd5e1";
    }
  };

  return (
    <div
      ref={ref}
      className="pointer-events-auto relative hidden overflow-hidden rounded-xl border border-slate-200 bg-white/95 shadow-xl sm:block dark:border-slate-700 dark:bg-slate-800/95"
      style={{ width: MAP_W, height: MAP_H }}
      onPointerDown={(e) => {
        e.stopPropagation();
        jumpTo(e.clientX, e.clientY);
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (e.buttons === 1) jumpTo(e.clientX, e.clientY);
      }}
      role="navigation"
      aria-label="Mini map"
    >
      <svg width={MAP_W} height={MAP_H} className="h-full w-full">
        {layout.nodes.map((n) => (
          <rect
            key={n.id}
            x={offsetX + n.x * scale}
            y={offsetY + n.y * scale}
            width={Math.max(2.5, n.w * scale)}
            height={Math.max(2, n.h * scale)}
            rx={1.2}
            fill={colorFor(n.type)}
            opacity={n.type === "concept" ? 0.6 : 0.9}
          />
        ))}
        <rect
          x={viewX}
          y={viewY}
          width={Math.max(8, viewW)}
          height={Math.max(6, viewH)}
          fill="none"
          stroke="#2563eb"
          strokeWidth={1.5}
          rx={3}
          className="pointer-events-none"
        />
        {/* selected node indicator */}
        {(() => {
          const sel = layout.nodes.find((n) => n.id === selectedId);
          if (!sel) return null;
          return (
            <rect
              x={offsetX + sel.x * scale - 2}
              y={offsetY + sel.y * scale - 2}
              width={Math.max(6, sel.w * scale + 4)}
              height={Math.max(5, sel.h * scale + 4)}
              fill="none"
              stroke="#f59e0b"
              strokeWidth={2}
              rx={3}
              className="pointer-events-none"
            />
          );
        })()}
      </svg>
      <span className="pointer-events-none absolute bottom-1 right-1.5 font-mono text-[10px] text-slate-500 dark:text-slate-400">
        {Math.round(viewport.k * 100)}%
      </span>
    </div>
  );
}
