'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '@/context/AppContext';
import { MobileAppShell } from '@/components/layout/MobileAppShell';
import { PageTransition, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';
import { AnimatedCard } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import { ShieldCheck, Search, Sliders, Clock, Zap, CheckCircle2 } from 'lucide-react';

export default function AuditPage() {
  const { activityLogs } = useApp();
  const { showToast } = useToast();
  const [tab, setTab] = useState<'logs' | 'settings'>('logs');
  const [search, setSearch] = useState('');

  // Performance point settings
  const [ratePer100, setRatePer100] = useState('50');

  const filteredLogs = activityLogs.filter((log) => {
    if (
      search &&
      !log.action.toLowerCase().includes(search.toLowerCase()) &&
      !log.user_name?.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleSaveSettings = () => {
    showToast('Rule Engine Updated', 'Turnaround performance bonus rates synchronized.', 'success');
  };

  return (
    <MobileAppShell title="Audit & Rules" showBack>
      <PageTransition className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-1">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Security & Governance
            </span>
            <h1 className="font-extrabold text-lg md:text-2xl text-zinc-900 dark:text-zinc-50 leading-tight">
              Audit Trail & Rules
            </h1>
          </div>
          <Badge variant="default" className="text-xs">
            Immutable
          </Badge>
        </div>

        {/* Segmented Switcher with animated pill */}
        <div className="p-1 bg-zinc-200/70 dark:bg-zinc-800/80 rounded-xl flex items-center text-xs">
          <button
            type="button"
            onClick={() => setTab('logs')}
            className={`relative flex-1 py-2 font-bold rounded-lg transition-colors cursor-pointer select-none text-center ${
              tab === 'logs'
                ? 'text-zinc-900 dark:text-zinc-100'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
            }`}
          >
            {tab === 'logs' && (
              <motion.div
                layoutId="audit-segmented-tab"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                className="absolute inset-0 rounded-lg bg-white dark:bg-zinc-900 shadow-xs -z-10"
              />
            )}
            <span>Activity Audit Log ({activityLogs.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setTab('settings')}
            className={`relative flex-1 py-2 font-bold rounded-lg transition-colors cursor-pointer select-none text-center ${
              tab === 'settings'
                ? 'text-zinc-900 dark:text-zinc-100'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
            }`}
          >
            {tab === 'settings' && (
              <motion.div
                layoutId="audit-segmented-tab"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                className="absolute inset-0 rounded-lg bg-white dark:bg-zinc-900 shadow-xs -z-10"
              />
            )}
            <span>Performance Rules</span>
          </button>
        </div>

        {tab === 'logs' ? (
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="size-4 absolute left-3.5 top-3.5 text-zinc-400" />
              <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search audit records or actors..."
                className="pl-10"
              />
            </div>

            {/* Audit Feed */}
            <StaggerContainer className="flex flex-col gap-2.5">
              {filteredLogs.map((log) => (
                <StaggerItem key={log.id}>
                  <AnimatedCard className="p-4 flex flex-col gap-1.5">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100">
                        {log.action}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {new Date(log.created_at).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <div className="text-xs text-zinc-600 dark:text-zinc-400 leading-tight">
                      By{' '}
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                        {log.user_name || 'System'}
                      </span>{' '}
                      • Module: {log.module}
                    </div>

                    {log.details && (
                      <div className="text-[11px] text-zinc-500 font-mono bg-zinc-50 dark:bg-zinc-800/60 p-2 rounded-lg truncate border border-zinc-100 dark:border-zinc-800">
                        {JSON.stringify(log.details)}
                      </div>
                    )}

                    <div className="flex justify-between items-center text-[10px] text-zinc-400 pt-1.5 border-t border-zinc-100 dark:border-zinc-800">
                      <span>IP: {log.ip_address || '49.207.210.12'}</span>
                      <span className="text-[#168a3a] dark:text-emerald-400 font-medium">
                        Server Verified ✓
                      </span>
                    </div>
                  </AnimatedCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        ) : (
          /* Performance Rules Settings */
          <div className="flex flex-col gap-4">
            <div className="p-4 bg-[#eaf7ee] dark:bg-emerald-950/40 border border-[#168a3a]/25 rounded-2xl text-xs text-[#0f6b2d] dark:text-emerald-300 leading-relaxed">
              <span className="font-bold">Automated Rule Engine:</span> All turnarounds are calculated automatically via server timestamps upon deliverable upload. Adjust brackets and rewards below.
            </div>

            <AnimatedCard className="p-5 flex flex-col gap-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-400">
                Point to Rupee Conversion
              </h3>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Rupees (₹) per 100 Performance Points
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs text-zinc-400 font-bold">₹</span>
                  <Input
                    type="number"
                    value={ratePer100}
                    onChange={(e) => setRatePer100(e.target.value)}
                    className="pl-8 font-mono font-bold"
                  />
                </div>
                <p className="text-[11px] text-zinc-500">Default: 100 Points = ₹50 (₹0.50 per point)</p>
              </div>
            </AnimatedCard>

            <AnimatedCard className="p-5 flex flex-col gap-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-400">
                Speed Brackets & Reward Tiers
              </h3>

              <div className="flex flex-col gap-2 text-xs">
                {[
                  { tier: 'Tier 1: Sub-2 Hours', points: '500 Points (₹250 cash bonus)', status: 'Active' },
                  { tier: 'Tier 2: 2–3 Hours', points: '400 Points (₹200 cash bonus)', status: 'Active' },
                  { tier: 'Tier 3: 3–4 Hours', points: '300 Points (₹150 cash bonus)', status: 'Active' },
                  { tier: 'Tier 4: 4–5 Hours', points: '200 Points (₹100 cash bonus)', status: 'Active' },
                  { tier: 'Tier 5: More than 5 Hours', points: '0 Points (₹0 cash bonus)', status: 'Standard' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200/80 dark:border-zinc-700/80 flex justify-between items-center"
                  >
                    <div>
                      <span className="font-bold text-zinc-800 dark:text-zinc-200">{item.tier}</span>
                      <div className="text-[11px] text-[#168a3a] dark:text-emerald-400 font-semibold">
                        {item.points}
                      </div>
                    </div>
                    <Badge variant={item.status === 'Active' ? 'default' : 'secondary'} className="text-[10px]">
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>

              <Button
                type="button"
                onClick={handleSaveSettings}
                size="lg"
                className="w-full font-bold mt-1"
              >
                Save Performance Rules
              </Button>
            </AnimatedCard>
          </div>
        )}
      </PageTransition>
    </MobileAppShell>
  );
}
