"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  layoutId?: string;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

export function Tabs({
  value,
  onValueChange,
  defaultValue,
  children,
  className,
  layoutId = "active-tab-indicator",
}: {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  children: React.ReactNode;
  className?: string;
  layoutId?: string;
}) {
  const [currentValue, setCurrentValue] = React.useState(
    value || defaultValue || ""
  );

  const activeValue = value !== undefined ? value : currentValue;

  const handleValueChange = React.useCallback(
    (newVal: string) => {
      if (value === undefined) {
        setCurrentValue(newVal);
      }
      onValueChange?.(newVal);
    },
    [value, onValueChange]
  );

  return (
    <TabsContext.Provider
      value={{
        value: activeValue,
        onValueChange: handleValueChange,
        layoutId,
      }}
    >
      <div className={cn("flex flex-col gap-4", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex h-11 items-center justify-start rounded-xl bg-zinc-100 p-1 text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-700/80 overflow-x-auto no-scrollbar",
        className
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  className,
  children,
  badge,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
  badge?: React.ReactNode;
}) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("TabsTrigger must be used within Tabs");

  const isActive = ctx.value === value;

  return (
    <button
      role="tab"
      type="button"
      aria-selected={isActive}
      onClick={() => ctx.onValueChange(value)}
      className={cn(
        "relative inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs md:text-sm font-medium transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#168a3a] disabled:pointer-events-none disabled:opacity-50 z-10 gap-2",
        isActive
          ? "text-zinc-900 dark:text-zinc-50 font-semibold"
          : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200",
        className
      )}
    >
      {isActive && (
        <motion.div
          layoutId={ctx.layoutId}
          transition={{ type: "spring", stiffness: 450, damping: 35 }}
          className="absolute inset-0 rounded-lg bg-white dark:bg-zinc-900 shadow-xs border border-zinc-200/70 dark:border-zinc-700/80 -z-10"
        />
      )}
      <span>{children}</span>
      {badge}
    </button>
  );
}

export function TabsContent({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("TabsContent must be used within Tabs");

  if (ctx.value !== value) return null;

  return (
    <motion.div
      role="tabpanel"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={cn("outline-none", className)}
    >
      {children}
    </motion.div>
  );
}
