"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border border-zinc-200/80 bg-white dark:bg-zinc-900/90 dark:border-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-xs transition-all",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

export const AnimatedCard = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.99 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    className={cn(
      "rounded-2xl border border-zinc-200/80 bg-white dark:bg-zinc-900/90 dark:border-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-xs hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-shadow",
      className
    )}
    {...props}
  />
));
AnimatedCard.displayName = "AnimatedCard";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1.5 p-5 md:p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-base md:text-lg font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-100",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs md:text-sm text-zinc-500 dark:text-zinc-400", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-5 md:p-6 pt-0 md:pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-5 md:p-6 pt-0 md:pt-0 gap-2", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";
