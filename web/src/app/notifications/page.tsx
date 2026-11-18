'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { MobileAppShell } from '@/components/layout/MobileAppShell';
import { PageTransition, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';
import { AnimatedCard } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { useApp } from '@/context/AppContext';
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  Sparkles,
  CreditCard,
  FileCheck,
  RefreshCw,
  Trash2,
} from 'lucide-react';

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const { showToast } = useToast();
  const [activeFilter, setActiveFilter] = useState<'all' | 'task' | 'submission' | 'revision' | 'payment'>('all');

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === 'all') return true;
    return n.type === activeFilter;
  });

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <CreditCard className="size-5 text-[#168a3a]" />;
      case 'submission':
        return <FileCheck className="size-5 text-sky-600" />;
      case 'approval':
        return <CheckCircle2 className="size-5 text-[#168a3a]" />;
      case 'revision':
        return <AlertCircle className="size-5 text-amber-600" />;
      case 'system':
      default:
        return <Bell className="size-5 text-zinc-600" />;
    }
  };

  const getTargetRoute = (notif: typeof notifications[0]) => {
    if (notif.type === 'payment') return '/payouts';
    if (notif.type === 'submission') return '/projects';
    if (notif.type === 'revision') return '/tasks';
    if (notif.type === 'approval') return '/payouts';
    return '/dashboard';
  };

  const handleMarkAllRead = () => {
    markAllNotificationsRead();
    showToast('All notifications marked as read', undefined, 'success');
  };

  return (
    <MobileAppShell title="Notifications" showBack hideFab>
      <PageTransition className="max-w-5xl mx-auto">
        {/* Top Header Row with Unread Pill & Mark All Read */}
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2.5">
            <h1 className="font-extrabold text-lg md:text-2xl text-zinc-900 dark:text-zinc-50 tracking-tight">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <Badge variant="default" className="text-xs">
                {unreadCount} Unread
              </Badge>
            )}
          </div>

          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllRead}
              className="text-[#168a3a] dark:text-emerald-400 font-semibold text-xs"
            >
              Mark all as read
            </Button>
          )}
        </div>

        {/* Filter Chips Bar with animated layoutId */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'all', label: `All (${notifications.length})` },
            { id: 'submission', label: 'Submissions' },
            { id: 'payment', label: 'Payments' },
            { id: 'revision', label: 'Revisions' },
          ].map((chip) => {
            const active = activeFilter === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => setActiveFilter(chip.id as any)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer select-none ${
                  active
                    ? 'text-white font-bold'
                    : 'text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="notif-filter-tab"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className="absolute inset-0 rounded-full bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 -z-10 shadow-2xs"
                  />
                )}
                <span className={active ? 'dark:text-zinc-900' : ''}>{chip.label}</span>
              </button>
            );
          })}
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-12 text-center">
            <div className="size-14 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 mx-auto flex items-center justify-center mb-3">
              <Bell className="size-7" />
            </div>
            <p className="text-base font-bold text-zinc-800 dark:text-zinc-200">All caught up!</p>
            <p className="text-xs text-zinc-500 mt-1">No notifications in this category right now.</p>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredNotifications.map((notif) => {
              const route = getTargetRoute(notif);
              return (
                <StaggerItem key={notif.id}>
                  <AnimatedCard
                    onClick={() => markNotificationRead(notif.id)}
                    className={`p-4 cursor-pointer flex flex-col justify-between gap-3 ${
                      !notif.is_read
                        ? 'border-[#168a3a]/40 bg-[#f8fdf9] dark:bg-emerald-950/20'
                        : ''
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`size-10 rounded-full flex items-center justify-center shrink-0 ${
                          !notif.is_read
                            ? 'bg-[#eaf7ee] dark:bg-emerald-950'
                            : 'bg-zinc-100 dark:bg-zinc-800'
                        }`}
                      >
                        {getIcon(notif.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-xs text-zinc-900 dark:text-zinc-100 truncate">
                            {notif.title}
                          </p>
                          <span className="text-[10px] text-zinc-400 shrink-0 ml-2">
                            {new Date(notif.created_at).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>

                        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                          {notif.message}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                      <Link
                        href={route}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#168a3a] dark:text-emerald-400 hover:underline"
                      >
                        <span>Open details</span>
                        <ArrowRight className="size-3" />
                      </Link>

                      {!notif.is_read && (
                        <span className="size-2 rounded-full bg-[#168a3a]" />
                      )}
                    </div>
                  </AnimatedCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}
      </PageTransition>
    </MobileAppShell>
  );
}
