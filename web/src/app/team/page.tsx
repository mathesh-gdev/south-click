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
import { Avatar } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/toast';
import {
  Users,
  Search,
  Star,
  CheckCircle2,
  XCircle,
  Plus,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export default function TeamPage() {
  const { profiles, applications, approveApplication, rejectApplication, toggleSuspendFreelancer } = useApp();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'roster' | 'applications'>('roster');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const freelancers = profiles.filter((p) => p.role !== 'founder');

  const filteredFreelancers = freelancers.filter((f) => {
    if (roleFilter !== 'all' && f.role !== roleFilter) return false;
    if (search && !f.full_name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleToggleSuspend = (id: string, name: string, isSuspended: boolean) => {
    toggleSuspendFreelancer(id);
    showToast(
      isSuspended ? `Reactivated ${name}` : `Suspended ${name}`,
      isSuspended ? 'Talent can now accept assigned tasks.' : 'Talent access temporarily paused.',
      isSuspended ? 'success' : 'info'
    );
  };

  const handleApprove = (id: string, name: string) => {
    approveApplication(id);
    showToast('Application Approved', `${name} has been added to the active talent roster.`, 'success');
  };

  const handleReject = (id: string, name: string) => {
    rejectApplication(id);
    showToast('Application Rejected', `${name}'s application has been archived.`, 'info');
  };

  return (
    <MobileAppShell title="Team">
      <PageTransition className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-1">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Operations
            </span>
            <h1 className="font-extrabold text-lg md:text-2xl text-zinc-900 dark:text-zinc-50 leading-tight">
              Team & Talent
            </h1>
          </div>
          <Link href="/apply">
            <Button size="sm" className="rounded-full shadow-xs">
              <Plus className="size-4" data-icon="inline-start" />
              <span>Invite Talent</span>
            </Button>
          </Link>
        </div>

        {/* Segmented Mode Switcher with animated sliding pill */}
        <div className="p-1 bg-zinc-200/70 dark:bg-zinc-800/80 rounded-xl flex items-center text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('roster')}
            className={`relative flex-1 py-2 font-bold rounded-lg transition-colors cursor-pointer select-none text-center ${
              activeTab === 'roster'
                ? 'text-zinc-900 dark:text-zinc-100'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
            }`}
          >
            {activeTab === 'roster' && (
              <motion.div
                layoutId="team-segmented-tab"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                className="absolute inset-0 rounded-lg bg-white dark:bg-zinc-900 shadow-xs -z-10"
              />
            )}
            <span>Talent Roster ({freelancers.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('applications')}
            className={`relative flex-1 py-2 font-bold rounded-lg transition-colors cursor-pointer select-none text-center ${
              activeTab === 'applications'
                ? 'text-zinc-900 dark:text-zinc-100'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
            }`}
          >
            {activeTab === 'applications' && (
              <motion.div
                layoutId="team-segmented-tab"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                className="absolute inset-0 rounded-lg bg-white dark:bg-zinc-900 shadow-xs -z-10"
              />
            )}
            <span>Applications ({applications.length})</span>
          </button>
        </div>

        {activeTab === 'roster' ? (
          <div className="flex flex-col gap-4">
            {/* Role Filter Chips */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
              {[
                { id: 'all', label: 'All Talent' },
                { id: 'editor', label: 'Editors (Video)' },
                { id: 'designer', label: 'Designers' },
                { id: 'smm', label: 'SMM' },
              ].map((tab) => {
                const active = roleFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setRoleFilter(tab.id)}
                    className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer select-none ${
                      active
                        ? 'text-white font-bold'
                        : 'text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50'
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="team-role-filter-tab"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        className="absolute inset-0 rounded-full bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 -z-10 shadow-2xs"
                      />
                    )}
                    <span className={active ? 'dark:text-zinc-900' : ''}>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Talent Cards */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFreelancers.map((talent) => (
                <StaggerItem key={talent.id}>
                  <AnimatedCard className="p-5 flex flex-col justify-between gap-3 h-full">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={talent.avatar_url}
                          alt={talent.full_name}
                          fallback={talent.full_name.slice(0, 2)}
                          size="lg"
                          className="ring-2 ring-[#168a3a]/15"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                              {talent.full_name}
                            </h3>
                            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center">
                              4.9<Star className="size-3 fill-current ml-0.5" />
                            </span>
                          </div>
                          <div className="text-xs text-zinc-500 capitalize">
                            {talent.role} • {talent.location}
                          </div>
                        </div>
                      </div>

                      <Badge
                        variant={talent.status === 'active' ? 'default' : 'destructive'}
                        className="text-[10px]"
                      >
                        {talent.status === 'active' ? 'Active' : 'Suspended'}
                      </Badge>
                    </div>

                    {/* Skills tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {talent.specialized_categories.map((cat, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-md"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() =>
                          handleToggleSuspend(talent.id, talent.full_name, talent.status === 'suspended')
                        }
                        className="text-xs text-zinc-500 hover:text-rose-600 font-medium transition-colors cursor-pointer"
                      >
                        {talent.status === 'active' ? 'Suspend Access' : 'Reactivate Access'}
                      </button>

                      <Link href="/projects/new">
                        <Button size="sm" className="h-8 text-xs font-bold">
                          <span>Assign Task</span>
                          <ArrowRight className="size-3.5" data-icon="inline-end" />
                        </Button>
                      </Link>
                    </div>
                  </AnimatedCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        ) : (
          /* Applications Tab */
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {applications.map((app) => (
              <StaggerItem key={app.id}>
                <AnimatedCard className="p-5 flex flex-col justify-between gap-3 h-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                        {app.full_name}
                      </h3>
                      <div className="text-xs text-zinc-500 capitalize">
                        {app.role} Applicant • {app.location}
                      </div>
                    </div>
                    <Badge
                      variant={
                        app.status === 'approved'
                          ? 'success'
                          : app.status === 'rejected'
                          ? 'destructive'
                          : 'warning'
                      }
                      className="text-[10px] capitalize"
                    >
                      {app.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {app.bio}
                  </p>

                  <div className="text-xs text-zinc-600 dark:text-zinc-400 flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800">
                    <span>Experience: {app.experience_years}</span>
                    <a
                      href={app.portfolio_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#168a3a] dark:text-emerald-400 font-bold flex items-center gap-1 hover:underline"
                    >
                      <span>Portfolio</span>
                      <ExternalLink className="size-3" />
                    </a>
                  </div>

                  {app.status === 'pending' && (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleReject(app.id, app.full_name)}
                      >
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleApprove(app.id, app.full_name)}
                      >
                        Approve & Activate
                      </Button>
                    </div>
                  )}
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </PageTransition>
    </MobileAppShell>
  );
}
