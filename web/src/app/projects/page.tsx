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
import { Input } from '@/components/ui/input';
import { Plus, Search, FolderKanban, Calendar, ArrowRight, Play, CheckCircle2 } from 'lucide-react';

export default function ProjectsPage() {
  const { projects, currentRole } = useApp();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [search, setSearch] = useState('');

  const filtered = projects.filter((p) => {
    if (filter === 'active' && p.status !== 'active') return false;
    if (filter === 'completed' && p.status !== 'completed') return false;
    if (
      search &&
      !p.name.toLowerCase().includes(search.toLowerCase()) &&
      !p.client_name.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <MobileAppShell title="Projects">
      <PageTransition className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-1">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Campaigns</span>
            <h1 className="font-extrabold text-lg md:text-2xl text-zinc-900 dark:text-zinc-50 leading-tight">
              Agency Projects
            </h1>
          </div>
          {currentRole === 'founder' && (
            <Link href="/projects/new">
              <Button size="sm" className="rounded-full shadow-xs">
                <Plus className="size-4" data-icon="inline-start" />
                <span>New Project</span>
              </Button>
            </Link>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="size-4 absolute left-3.5 top-3.5 text-zinc-400" />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects or brand clients..."
            className="pl-10"
          />
        </div>

        {/* Filter Pills with animated layoutId */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'all', label: 'All Projects', count: projects.length },
            { id: 'active', label: 'In Progress', count: projects.filter((p) => p.status === 'active').length },
            { id: 'completed', label: 'Completed', count: projects.filter((p) => p.status === 'completed').length },
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
                    layoutId="projects-filter-tab"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className="absolute inset-0 rounded-full bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 -z-10 shadow-2xs"
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

        {/* Projects List */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <StaggerItem key={project.id}>
              <AnimatedCard className="p-5 flex flex-col justify-between gap-3 h-full">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs font-semibold text-zinc-500">{project.client_name}</div>
                    <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 mt-0.5">
                      {project.name}
                    </h3>
                  </div>
                  <Badge variant="secondary" className="font-bold tabular-nums">
                    ₹{project.budget.toLocaleString('en-IN')}
                  </Badge>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-100 dark:border-zinc-800 flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[11px] font-medium text-zinc-500">Timeline</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                      {new Date(project.created_at).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                      })}{' '}
                      - Nov 28
                    </span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: project.status === 'completed' ? '100%' : '66%' }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      className="bg-[#168a3a] h-1.5 rounded-full"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <Badge
                    variant={project.status === 'completed' ? 'success' : 'default'}
                    className="text-[10px]"
                  >
                    {project.status === 'completed' ? 'Delivered' : 'In Production'}
                  </Badge>

                  <Link href="/review/tsk_01">
                    <Button size="sm" variant="outline" className="h-8 text-xs">
                      <span>View Tasks</span>
                      <ArrowRight className="size-3.5" data-icon="inline-end" />
                    </Button>
                  </Link>
                </div>
              </AnimatedCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </PageTransition>
    </MobileAppShell>
  );
}
