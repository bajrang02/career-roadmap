"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon,
  title,
  desc,
  action,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-col items-center gap-3 py-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
        <Icon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
      </span>
      <div>
        <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">{desc}</p>
      </div>
      {action && (
        <Link href={action.href} className={cn(buttonVariants())}>
          {action.label}
        </Link>
      )}
    </div>
  );
}
