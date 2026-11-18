'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '@/context/AppContext';
import { MobileAppShell } from '@/components/layout/MobileAppShell';
import { PageTransition, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';
import { AnimatedCard, Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton, CardSkeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/toast';
import {
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  Download,
  Calendar,
  Sparkles,
  ArrowRight,
  Zap,
  Users,
  FolderKanban,
  RotateCw,
} from 'lucide-react';

export default function DashboardPage() {
  const { currentRole, currentUser, projects, tasks } = useApp();
  const router = useRouter();
  const { showToast } = useToast();

  const [activeFilter, setActiveFilter] = useState<'all' | 'progress' | 'review' | 'revisions' | 'completed'>('all');
  const [timerSeconds, setTimerSeconds] = useState(6320); // 1h 45m 20s
  const [isLoading, setIsLoading] = useState(true);

  // Initial simulated sleek loading transition (250ms)
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 260);
    return () => clearTimeout(t);
  }, [currentRole]);

  // Live timer tick for active task turnaround simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (totalSec: number) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'progress') return p.status === 'active';
    if (activeFilter === 'review') return p.status === 'on_hold';
    if (activeFilter === 'completed') return p.status === 'completed';
    return true;
  });

  return (
    <MobileAppShell>
      <PageTransition>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-4"
            >
              <div className="flex justify-between items-center">
                <Skeleton className="h-7 w-48 rounded-lg" />
                <Skeleton className="h-6 w-28 rounded-full" />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-28 rounded-2xl" />
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                {[1, 2, 3].map((i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            </motion.div>
          ) : currentRole === 'founder' ? (
            /* ========================================================================= */
            /* FOUNDER EXECUTIVE COMMAND CENTER (Screen 1)                                */
            /* ========================================================================= */
            <motion.div
              key="founder"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-5"
            >
              {/* Header Title & Date */}
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Executive Cockpit
                  </span>
                  <h1 className="font-extrabold text-xl md:text-2xl text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
                    Today&apos;s Dispatch
                  </h1>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#168a3a] bg-[#eaf7ee] dark:bg-emerald-950/60 dark:text-emerald-300 px-3 py-1.5 rounded-full border border-[#168a3a]/20 shadow-2xs">
                  <Calendar className="size-3.5" />
                  <span>Nov 17, 2026</span>
                </div>
              </div>

              {/* Top KPI Metrics 2x2 Bento Grid on Mobile / 4 Columns on Desktop */}
              <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                <StaggerItem>
                  <AnimatedCard className="p-4 flex flex-col justify-between h-full">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-medium text-zinc-500">Pipeline Vol.</span>
                      <span className="text-xs font-bold text-[#168a3a]">₹</span>
                    </div>
                    <div className="mt-3">
                      <div className="text-xl md:text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                        ₹<AnimatedNumber value={1245000} format={(v) => (v / 100000).toFixed(2) + 'L'} />
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-[#168a3a] mt-1">
                        <TrendingUp className="size-3.5" />
                        <span>+18.4% this mo</span>
                      </div>
                    </div>
                  </AnimatedCard>
                </StaggerItem>

                <StaggerItem>
                  <AnimatedCard className="p-4 flex flex-col justify-between h-full">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-medium text-zinc-500">Active Squads</span>
                      <Users className="size-4 text-zinc-400" />
                    </div>
                    <div className="mt-3">
                      <div className="text-xl md:text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">
                        <AnimatedNumber value={6} /> Squads
                      </div>
                      <div className="text-[11px] text-zinc-500 mt-1 font-medium">Video • Motion • SMM</div>
                    </div>
                  </AnimatedCard>
                </StaggerItem>

                <StaggerItem>
                  <Link href="/review/tsk_01" className="block h-full">
                    <AnimatedCard className="p-4 flex flex-col justify-between h-full border-amber-300/80 dark:border-amber-700/60 hover:border-amber-400 group">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-medium text-zinc-500">Pending Review</span>
                        <span className="size-2 rounded-full bg-amber-500" />
                      </div>
                      <div className="mt-3">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl md:text-2xl font-extrabold text-amber-600 dark:text-amber-400">
                            3 Cuts
                          </span>
                          <Badge variant="warning" className="px-1.5 py-0 text-[10px]">
                            Action
                          </Badge>
                        </div>
                        <div className="text-[11px] text-zinc-500 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mt-1 font-medium">
                          Awaiting QC signoff →
                        </div>
                      </div>
                    </AnimatedCard>
                  </Link>
                </StaggerItem>

                <StaggerItem>
                  <Link href="/payouts" className="block h-full">
                    <AnimatedCard className="p-4 flex flex-col justify-between h-full hover:border-[#168a3a] group">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-medium text-zinc-500">UPI Payouts</span>
                        <Badge variant="default" className="text-[10px] uppercase font-bold py-0">
                          RazorpayX
                        </Badge>
                      </div>
                      <div className="mt-3">
                        <div className="text-xl md:text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tabular-nums">
                          ₹<AnimatedNumber value={42800} format={(v) => (v / 1000).toFixed(1) + 'k'} />
                        </div>
                        <div className="text-[11px] text-zinc-500 group-hover:text-[#168a3a] transition-colors mt-1 font-medium">
                          4 invoices queued →
                        </div>
                      </div>
                    </AnimatedCard>
                  </Link>
                </StaggerItem>
              </StaggerContainer>

              {/* Quick Action Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                <Link href="/projects/new">
                  <Button size="sm" className="rounded-full shadow-xs">
                    <Sparkles className="size-3.5" data-icon="inline-start" />
                    <span>+ New Project</span>
                  </Button>
                </Link>
                <Link href="/review/tsk_01">
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Play className="size-3.5 fill-current" data-icon="inline-start" />
                    <span>Review Cuts (3)</span>
                  </Button>
                </Link>
                <Link href="/team">
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Users className="size-3.5" data-icon="inline-start" />
                    <span>Talent Roster (28)</span>
                  </Button>
                </Link>
              </div>

              {/* Segmented Filter Control with animated layoutId */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {[
                  { id: 'all', label: 'All Projects', count: projects.length },
                  { id: 'progress', label: 'In Progress', count: 3 },
                  { id: 'review', label: 'In Review', count: 1 },
                  { id: 'revisions', label: 'Revisions', count: 1 },
                  { id: 'completed', label: 'Completed', count: 1 },
                ].map((tab) => {
                  const active = activeFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveFilter(tab.id as any)}
                      className={`relative shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer select-none ${
                        active
                          ? 'text-white font-bold'
                          : 'text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50'
                      }`}
                    >
                      {active && (
                        <motion.div
                          layoutId="dashboard-project-filter"
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                          className="absolute inset-0 rounded-full bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 -z-10 shadow-xs"
                        />
                      )}
                      <span className={active ? 'dark:text-zinc-900' : ''}>{tab.label}</span>
                      <span
                        className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full ${
                          active
                            ? 'bg-zinc-700 text-white dark:bg-zinc-300 dark:text-zinc-900'
                            : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800'
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Project Feed Cards (1 col mobile, 2 col tablet, 3 col desktop) */}
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProjects.map((project) => (
                  <StaggerItem key={project.id}>
                    <AnimatedCard className="p-5 flex flex-col justify-between gap-3 h-full">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
                            <span>{project.client_name}</span>
                            <span>•</span>
                            <span className="font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
                              ₹{project.budget.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 mt-1 leading-snug">
                            {project.name}
                          </h3>
                        </div>
                        <Badge
                          variant={project.status === 'completed' ? 'secondary' : 'default'}
                        >
                          {project.status === 'completed' ? 'Completed' : 'In Production'}
                        </Badge>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 text-[11px] text-zinc-600 dark:text-zinc-300 font-medium">
                        <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-md">Reel (9:16)</span>
                        <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-md">3 Cuts</span>
                        <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-md">Deadline: Nov 24</span>
                      </div>

                      {/* Milestone Progress Bar with animated width */}
                      <div className="bg-zinc-50 dark:bg-zinc-800/60 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 flex flex-col gap-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 truncate">
                            {project.status === 'completed'
                              ? 'Delivered & Approved'
                              : 'Cut V2 Exported • Awaiting Founder Signoff'}
                          </span>
                          <span className="font-bold text-[#168a3a] tabular-nums">
                            {project.status === 'completed' ? '100%' : '66%'}
                          </span>
                        </div>
                        <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: project.status === 'completed' ? '100%' : '66%' }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="bg-[#168a3a] h-1.5 rounded-full"
                          />
                        </div>
                      </div>

                      {/* Footer Assigned Talent & Action */}
                      <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center gap-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                            alt="Editor"
                            className="size-7 rounded-full object-cover ring-1 ring-zinc-300 dark:ring-zinc-700"
                          />
                          <div>
                            <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                              Arun V.
                            </div>
                            <div className="text-[10px] text-zinc-500">Senior Editor • 4.9★</div>
                          </div>
                        </div>

                        <Link href="/review/tsk_01">
                          <Button size="sm" className="h-8 px-3 rounded-lg text-xs">
                            <Play className="size-3 fill-current" data-icon="inline-start" />
                            <span>Review Cut V2</span>
                          </Button>
                        </Link>
                      </div>
                    </AnimatedCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </motion.div>
          ) : (
            /* ========================================================================= */
            /* FREELANCER / EDITOR PERSONAL WORKSPACE (Screen 2)                          */
            /* ========================================================================= */
            <motion.div
              key="freelancer"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-5"
            >
              {/* Greeting */}
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Creative Workspace
                  </span>
                  <h1 className="font-extrabold text-xl md:text-2xl text-zinc-900 dark:text-zinc-50 leading-tight">
                    Hi, {currentUser.full_name} 👋
                  </h1>
                </div>
                <Badge variant="default" className="text-xs capitalize px-3 py-1">
                  {currentUser.role}
                </Badge>
              </div>

              {/* Top Row: Earnings Card & Active Task Countdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Forest Green Gradient Earnings Card */}
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="p-5 rounded-2xl bg-gradient-to-br from-[#168a3a] to-[#0f6b2d] text-white shadow-md flex flex-col justify-between gap-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-white/80 text-xs font-medium">Total Earned This Month</span>
                      <div className="text-3xl font-black tabular-nums tracking-tight mt-1">
                        ₹<AnimatedNumber value={28500} />
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-white/80 text-[10px] uppercase font-bold tracking-wider">
                        Pending Payout
                      </span>
                      <div className="text-base font-bold tabular-nums text-emerald-200 mt-1">
                        ₹<AnimatedNumber value={14200} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/20 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <Zap className="size-4 text-amber-300 fill-amber-300" />
                      <span className="font-semibold text-white/90">1,200 Speed Points</span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-100 bg-white/15 px-2.5 py-0.5 rounded-full border border-white/10">
                      +₹600 Bonus Earned
                    </span>
                  </div>
                </motion.div>

                {/* Active Priority Task Hero Widget */}
                <AnimatedCard className="p-5 flex flex-col justify-between gap-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                        <span className="size-1.5 rounded-full bg-amber-500" />
                        <span>Current Active Task</span>
                      </div>
                      <h2 className="font-bold text-base text-zinc-900 dark:text-zinc-100 mt-1 leading-snug">
                        GreenCart Reel 01 - Revision 2
                      </h2>
                    </div>
                    <Badge variant="default" className="text-xs">
                      Base Fee: ₹500
                    </Badge>
                  </div>

                  {/* Live Server Turnaround Timer */}
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-100 dark:border-zinc-800 flex flex-col gap-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-500 dark:text-zinc-400 font-medium">Turnaround Timer (Server Synced)</span>
                      <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
                        {formatTimer(timerSeconds)}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#168a3a] dark:text-emerald-400 font-semibold flex items-center gap-1.5 mt-0.5">
                      <Sparkles className="size-3.5 shrink-0" />
                      <span>Submit within 14 mins to secure 500 Performance Points (₹250 bonus)!</span>
                    </div>
                  </div>

                  {/* Dual CTAs */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        showToast(
                          'Downloading 4K Raw Assets',
                          'Download initiated: greencart_reel_raw_broll_v2.zip (1.2 GB)',
                          'info'
                        )
                      }
                      className="w-full"
                    >
                      <Download className="size-3.5" data-icon="inline-start" />
                      <span>Raw Assets</span>
                    </Button>

                    <Link href="/tasks/tsk_01/submit" className="w-full">
                      <Button size="sm" className="w-full">
                        <span>Submit Cut V2</span>
                        <ArrowRight className="size-3.5" data-icon="inline-end" />
                      </Button>
                    </Link>
                  </div>
                </AnimatedCard>
              </div>

              {/* Assigned Tasks Feed */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Your Assigned Tasks</h2>
                  <Link href="/tasks" className="text-xs font-semibold text-[#168a3a] hover:underline">
                    View All ({tasks.length})
                  </Link>
                </div>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {tasks.map((task) => (
                    <StaggerItem key={task.id}>
                      <AnimatedCard className="p-4 flex flex-col justify-between gap-3 h-full">
                        <div>
                          <div className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                            {task.name}
                          </div>
                          <div className="text-xs text-zinc-500 mt-1">
                            {task.project_name} • Fee: <span className="font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">₹{task.base_fee}</span>
                          </div>
                        </div>
                        <Link
                          href={task.status === 'approved' ? '/review/tsk_01' : `/tasks/${task.id}/submit`}
                          className="w-full"
                        >
                          <Button
                            variant={task.status === 'approved' ? 'subtle' : 'secondary'}
                            size="sm"
                            className="w-full text-xs font-bold"
                          >
                            {task.status === 'approved' ? 'Approved (₹750 Paid) ✓' : 'Submit Work →'}
                          </Button>
                        </Link>
                      </AnimatedCard>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </PageTransition>
    </MobileAppShell>
  );
}
