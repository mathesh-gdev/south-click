'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { useApp } from '@/context/AppContext';
import { MobileAppShell } from '@/components/layout/MobileAppShell';
import { PageTransition } from '@/components/ui/page-transition';
import { AnimatedCard } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import { Plus, Trash2, Calendar, Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function NewProjectPage() {
  const router = useRouter();
  const { profiles, createProject, createTask } = useApp();
  const { showToast } = useToast();

  const [projectName, setProjectName] = useState('Zomato Diwali Reel Campaign');
  const [clientName, setClientName] = useState('Zomato India (Retainer)');
  const [campaignType, setCampaignType] = useState('reels');
  const [budget, setBudget] = useState('45000');
  const [priority, setPriority] = useState<'urgent' | 'high' | 'normal'>('high');
  const [deadline, setDeadline] = useState('2026-11-24T18:00');
  const [isLaunching, setIsLaunching] = useState(false);
  
  // Tasks list inside the project builder
  const [taskList, setTaskList] = useState([
    { name: 'Reel 01 - Festive Sweets Hook', role: 'editor', assigned_to: 'user_editor', fee: '500' },
    { name: 'Story Poster 01 - Flash Sale', role: 'designer', assigned_to: 'user_designer', fee: '350' },
  ]);

  const addTaskRow = () => {
    setTaskList([...taskList, { name: 'New Task', role: 'editor', assigned_to: 'user_editor', fee: '400' }]);
  };

  const removeTaskRow = (idx: number) => {
    setTaskList(taskList.filter((_, i) => i !== idx));
  };

  const handleLaunch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLaunching(true);

    setTimeout(() => {
      const newProj = createProject({
        name: projectName,
        client_name: clientName,
        project_type: campaignType,
        budget: Number(budget),
        priority,
        deadline,
      });

      taskList.forEach((t) => {
        createTask({
          project_id: newProj.id,
          project_name: newProj.name,
          client_name: newProj.client_name,
          name: t.name,
          role_required: t.role as any,
          assigned_to: t.assigned_to,
          base_fee: Number(t.fee),
        });
      });

      setIsLaunching(false);
      showToast('Campaign Launched!', `${projectName} created with ${taskList.length} dispatched tasks.`, 'success');
      router.push('/dashboard');
    }, 600);
  };

  return (
    <MobileAppShell title="New Project" showBack hideBottomNav hideFab>
      <PageTransition className="max-w-3xl mx-auto">
        <form onSubmit={handleLaunch} className="flex flex-col gap-4">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-1">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Project Builder
              </span>
              <h1 className="font-extrabold text-lg md:text-2xl text-zinc-900 dark:text-zinc-50 leading-tight">
                Launch Campaign & Tasks
              </h1>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="text-zinc-500 hover:text-zinc-800"
            >
              Cancel
            </Button>
          </div>

          {/* Section 1: Overview */}
          <AnimatedCard className="p-5 flex flex-col gap-3.5">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              1. Project Overview
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Campaign Title
              </label>
              <Input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Client Brand
              </label>
              <Input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Budget (₹ INR)
                </label>
                <Input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="font-mono"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="flex h-11 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#168a3a]"
                >
                  <option value="urgent">Urgent</option>
                  <option value="high">High Priority</option>
                  <option value="normal">Normal</option>
                </select>
              </div>
            </div>
          </AnimatedCard>

          {/* Section 2: Task Breakdown & Talent Assignment */}
          <AnimatedCard className="p-5 flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                2. Tasks & Talent ({taskList.length})
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTaskRow}
                className="h-8 text-xs font-bold"
              >
                <Plus className="size-3.5" data-icon="inline-start" />
                <span>Add Task</span>
              </Button>
            </div>

            <div className="flex flex-col gap-2.5">
              {taskList.map((task, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl flex flex-col gap-2.5"
                >
                  <div className="flex justify-between items-center gap-2">
                    <Input
                      type="text"
                      value={task.name}
                      onChange={(e) => {
                        const next = [...taskList];
                        next[idx].name = e.target.value;
                        setTaskList(next);
                      }}
                      className="font-bold text-xs h-9 bg-white dark:bg-zinc-900 flex-1"
                    />
                    {taskList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTaskRow(idx)}
                        className="text-zinc-400 hover:text-rose-500 p-1.5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">
                        Assigned Talent
                      </label>
                      <select
                        value={task.assigned_to}
                        onChange={(e) => {
                          const next = [...taskList];
                          next[idx].assigned_to = e.target.value;
                          setTaskList(next);
                        }}
                        className="h-9 w-full rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-2 text-xs text-zinc-900 dark:text-zinc-100"
                      >
                        {profiles
                          .filter((p) => p.role !== 'founder')
                          .map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.full_name} ({p.role})
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">
                        Base Fee (₹)
                      </label>
                      <Input
                        type="number"
                        value={task.fee}
                        onChange={(e) => {
                          const next = [...taskList];
                          next[idx].fee = e.target.value;
                          setTaskList(next);
                        }}
                        className="h-9 font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div className="text-[11px] text-[#168a3a] dark:text-emerald-400 font-medium flex items-center gap-1.5">
                    <Sparkles className="size-3.5" />
                    <span>Eligible for speed bonuses up to ₹250 (500 pts) on fast delivery.</span>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedCard>

          {/* Launch Button */}
          <Button
            type="submit"
            size="lg"
            isLoading={isLaunching}
            className="w-full font-bold"
          >
            Launch Project & Dispatch Tasks
          </Button>

        </form>
      </PageTransition>
    </MobileAppShell>
  );
}
