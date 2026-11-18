import * as React from "react";
import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-lg bg-zinc-200 dark:bg-zinc-800",
        className
      )}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-4 w-12 rounded-md" />
      </div>
      <Skeleton className="h-6 w-3/4 rounded-md mt-1" />
      <Skeleton className="h-4 w-1/2 rounded-md" />
      <div className="flex items-center gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800 mt-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="flex flex-col gap-1 flex-1">
          <Skeleton className="h-3 w-28 rounded-md" />
          <Skeleton className="h-3 w-16 rounded-md" />
        </div>
        <Skeleton className="h-8 w-20 rounded-lg" />
      </div>
    </div>
  );
}
