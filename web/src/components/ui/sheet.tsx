"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  side?: "bottom" | "right";
}

export function Sheet({
  open,
  onOpenChange,
  children,
  title,
  description,
  side = "bottom",
}: SheetProps) {
  // Prevent body scroll when open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Panel */}
          <motion.div
            initial={
              side === "bottom"
                ? { y: "100%", opacity: 0.8 }
                : { x: "100%", opacity: 0.8 }
            }
            animate={
              side === "bottom"
                ? { y: 0, opacity: 1 }
                : { x: 0, opacity: 1 }
            }
            exit={
              side === "bottom"
                ? { y: "100%", opacity: 0 }
                : { x: "100%", opacity: 0 }
            }
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className={cn(
              "relative z-50 w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col",
              side === "bottom"
                ? "max-h-[90vh] rounded-t-3xl border-t sm:rounded-2xl sm:max-w-xl sm:border"
                : "h-full max-w-md ml-auto border-l"
            )}
          >
            {/* Grab handle for bottom sheet */}
            {side === "bottom" && (
              <div className="flex justify-center pt-3 pb-1 sm:hidden">
                <div className="h-1.5 w-12 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex flex-col gap-0.5">
                {title && (
                  <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="size-9 rounded-full inline-flex items-center justify-center text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="size-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>

            {/* Content */}
            <div className="p-5 overflow-y-auto max-h-[calc(90vh-80px)]">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
