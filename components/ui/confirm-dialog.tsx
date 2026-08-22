"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: React.ReactNode;
  /** label of the button that performs the action */
  confirmLabel?: string;
  cancelLabel?: string;
  /** `danger` paints the confirm button red — use for irreversible actions */
  tone?: "danger" | "default";
  onConfirm: () => void;
}

/**
 * A small, focused confirmation step for irreversible actions (wiping local
 * progress, overwriting a backup, regenerating a schedule). Radix Dialog gives
 * us the focus trap, Escape handling and scroll lock for free; the cancel
 * button is auto-focused so a stray Enter never destroys anything.
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "danger",
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <span
            className={cn(
              "mb-1 flex h-11 w-11 items-center justify-center rounded-xl",
              tone === "danger"
                ? "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400"
                : "bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400"
            )}
            aria-hidden="true"
          >
            <AlertTriangle className="h-5 w-5" />
          </span>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription asChild>
            <div className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {description}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-5">
          <Button variant="outline" size="sm" autoFocus onClick={() => onOpenChange(false)}>
            {cancelLabel}
          </Button>
          <Button
            variant={tone === "danger" ? "danger" : "default"}
            size="sm"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
