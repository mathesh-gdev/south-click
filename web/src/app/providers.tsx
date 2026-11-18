'use client';

import React from 'react';
import { AppProvider } from '@/context/AppContext';
import { ToastProvider } from '@/components/ui/toast';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

function KeyboardShortcutsListener() {
  useKeyboardShortcuts();
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <ToastProvider>
        <KeyboardShortcutsListener />
        {children}
      </ToastProvider>
    </AppProvider>
  );
}
