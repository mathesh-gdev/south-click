"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  children?: React.ReactNode;
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive"
    | "subtle";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
      default:
        "bg-[#168a3a] text-white hover:bg-[#0f6b2d] active:bg-[#0d5926] shadow-sm border border-emerald-600/30",
      secondary:
        "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 active:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700",
      outline:
        "bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 shadow-xs",
      ghost:
        "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100",
      destructive:
        "bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-sm border border-rose-500/30",
      subtle:
        "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50",
    };

    const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
      default: "h-11 px-4 py-2 text-sm rounded-xl",
      sm: "h-9 px-3 text-xs rounded-lg",
      lg: "h-12 px-6 text-base rounded-xl font-medium",
      icon: "h-11 w-11 p-0 rounded-xl",
    };

    const isDisabled = disabled || isLoading;

    return (
      <motion.button
        ref={ref}
        whileTap={!isDisabled ? { scale: 0.97 } : undefined}
        whileHover={!isDisabled ? { y: -1 } : undefined}
        transition={{ duration: 0.15, ease: "easeOut" }}
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#168a3a] focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none gap-2",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading && (
          <Loader2
            className="w-4 h-4 animate-spin text-current shrink-0"
            data-icon="inline-start"
          />
        )}
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
