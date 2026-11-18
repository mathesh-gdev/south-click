'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/ui/toast';
import { sound } from '@/lib/sound';
import { UserRole } from '@/types';

export function useKeyboardShortcuts() {
  const router = useRouter();
  const { switchRole } = useApp();
  const { showToast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Never intercept when user is typing in form inputs
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      // Modifier keys check - don't interfere with Ctrl/Cmd browser shortcuts
      if (e.metaKey || e.ctrlKey || e.altKey) {
        return;
      }

      const key = e.key.toLowerCase();

      // Number keys 1-4 for instant persona switching
      const personaMap: Record<string, { role: UserRole; name: string }> = {
        '1': { role: 'founder', name: 'Dhushyandh S. (Founder)' },
        '2': { role: 'editor', name: 'Arun Vignesh (Senior Video Editor)' },
        '3': { role: 'designer', name: 'Priya Sharma (Lead Designer)' },
        '4': { role: 'smm', name: 'Karthik N. (Social Media)' },
      };

      if (personaMap[key]) {
        e.preventDefault();
        const persona = personaMap[key];
        switchRole(persona.role);
        sound.playSwitch();
        showToast('Persona Switched', `Viewing as ${persona.name}`, 'info');
        return;
      }

      // Navigation shortcuts
      switch (key) {
        case 'd':
          e.preventDefault();
          sound.playSwitch();
          router.push('/dashboard');
          break;
        case 'p':
          e.preventDefault();
          sound.playSwitch();
          router.push('/payouts');
          break;
        case 't':
          e.preventDefault();
          sound.playSwitch();
          router.push('/tasks');
          break;
        case 'c':
          e.preventDefault();
          sound.playSwitch();
          router.push('/chat');
          break;
        case 'm':
          e.preventDefault();
          const newState = sound.toggleSound();
          showToast(
            newState ? 'Audio Effects On' : 'Audio Effects Muted',
            newState ? 'Micro-chimes enabled' : 'All UI sound feedback silenced',
            'info'
          );
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, switchRole, showToast]);
}
