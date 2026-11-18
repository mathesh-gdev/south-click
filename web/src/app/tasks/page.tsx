'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useApp } from '@/context/AppContext';
import { MobileAppShell } from '@/components/layout/MobileAppShell';
import { PageTransition, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';
import { AnimatedCard } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, Play, ArrowRight, AlertCircle } from 'lucide-react';

export default function TasksPage() {
  const { tasks, currentRole, currentUser } = useApp();
  const [filter, setFilter] = useState<'all' | 'active' | 'approved'>('all');

  const visibleTasks = tasks.filter((t) => {
    // If freelancer, only show their own tasks
    if (currentRole !== 'founder' && t.assigned_to !== currentUser.id) {
      return false;
    }
    if (filter === 'active' && t.status === 'approved') return false;
    if (filter === 'approved' && t.status !== 'approved') return false;
    return true;
  });

  return (
    <MobileAppShell title="Tasks">
      <PageTransition className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-1">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Assignments
            </span>
            <h1 className="font-extrabold text-lg md:text-2xl text-zinc-900 dark:text-zinc-50 leading-tight">
              {currentRole === 'founder' ? 'All Agency Tasks' : 'My Assigned Work'}
            </h1>
          </div>
          <Badge variant="default" className="text-xs px-3 py-1">
            {visibleTasks.length} Tasks
          </Badge>
        </div>

        {/* Filter Chips with animated layoutId */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'all', label: 'All Tasks' },
            { id: 'active', label: 'In Progress / Review' },
            { id: 'approved', label: 'Approved & Completed' },
          ].map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as any)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer select-none ${
                  active
                    ? 'text-white font-bold'
                    : 'text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="tasks-filter-tab"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className="absolute inset-0 rounded-full bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 -z-10 shadow-2xs"
                  />
                )}
                <span className={active ? 'dark:text-zinc-900' : ''}>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Task Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleTasks.map((task) => (
            <StaggerItem key={task.id}>
              <AnimatedCard className="p-5 flex flex-col justify-between gap-3 h-full">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs font-semibold text-zinc-500">{task.project_name}</div>
                    <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 mt-0.5">
                      {task.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
                      ₹{task.base_fee}
                    </div>
                    {task.performance_reward > 0 && (
                      <div className="text-[10px] font-bold text-[#168a3a] dark:text-emerald-400">
                        +₹{task.performance_reward} Bonus
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {task.description}
                </p>

                {/* Status Indicator */}
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-3.5 text-zinc-400" />
                    <span className="text-zinc-600 dark:text-zinc-400 font-medium">Status:</span>
                    <span
                      className={`font-bold capitalize ${
                        task.status === 'approved'
                          ? 'text-[#168a3a] dark:text-emerald-400'
                          : 'text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                  {task.status === 'approved' ? (
                    <span className="text-[11px] font-bold text-[#168a3a] dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="size-3.5" />
                      <span>QC Passed</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                      V2 Uploaded
                    </span>
                  )}
                </div>

                {/* Action button */}
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                  {currentRole === 'founder' ? (
                    <Link href={`/review/${task.id}`} className="w-full">
                      <Button size="sm" className="w-full text-xs">
                        <Play className="size-3 fill-current" data-icon="inline-start" />
                        <span>QC Review Cut V2</span>
                      </Button>
                    </Link>
                  ) : (
                    <Link
                      href={task.status === 'approved' ? `/review/${task.id}` : `/tasks/${task.id}/submit`}
                      className="w-full"
                    >
                      <Button
                        size="sm"
                        variant={task.status === 'approved' ? 'outline' : 'default'}
                        className="w-full text-xs"
                      >
                        <span>{task.status === 'approved' ? 'View Approved Cut' : 'Submit Cut V2'}</span>
                        <ArrowRight className="size-3.5" data-icon="inline-end" />
                      </Button>
                    </Link>
                  )}
                </div>
              </AnimatedCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </PageTransition>
    </MobileAppShell>
  );
}
