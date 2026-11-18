"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: "success" | "error" | "info";
}

interface ToastContextValue {
  showToast: (title: string, description?: string, type?: "success" | "error" | "info") => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const showToast = React.useCallback(
    (title: string, description?: string, type: "success" | "error" | "info" = "success") => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, description, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    []
  );

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-lg text-zinc-900 dark:text-zinc-100"
            >
              <div className="shrink-0 pt-0.5">
                {toast.type === "success" && (
                  <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
                )}
                {toast.type === "error" && (
                  <AlertCircle className="size-4 text-rose-600 dark:text-rose-400" />
                )}
                {toast.type === "info" && (
                  <Info className="size-4 text-sky-600 dark:text-sky-400" />
                )}
              </div>
              <div className="flex-1 flex flex-col gap-0.5 text-left">
                <p className="text-xs font-semibold leading-tight">{toast.title}</p>
                {toast.description && (
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    {toast.description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="shrink-0 size-5 text-zinc-400 hover:text-zinc-600 cursor-pointer"
              >
                <X className="size-3.5" />
                <span className="sr-only">Close</span>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
