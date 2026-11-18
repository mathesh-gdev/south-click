'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '@/context/AppContext';
import { MobileAppShell } from '@/components/layout/MobileAppShell';
import { PageTransition, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';
import { AnimatedCard } from '@/components/ui/card';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { CheckCircle2, Clock, Zap, ArrowDownRight, Download, CreditCard, Sparkles } from 'lucide-react';

export default function PayoutsPage() {
  const { payments, disbursePayment, currentRole } = useApp();
  const { showToast } = useToast();
  const [filter, setFilter] = useState<'all' | 'pending' | 'paid'>('all');
  const [payingId, setPayingId] = useState<string | null>(null);

  const totalPaid = payments.filter((p) => p.status === 'paid').reduce((acc, p) => acc + p.total_amount, 0);
  const pendingAmount = payments.filter((p) => p.status === 'pending').reduce((acc, p) => acc + p.total_amount, 0);
  const totalBonuses = payments.reduce((acc, p) => acc + p.performance_reward, 0);

  const filteredPayments = payments.filter((p) => {
    if (filter === 'pending') return p.status === 'pending';
    if (filter === 'paid') return p.status === 'paid';
    return true;
  });

  const handlePay = (id: string, amount: number, name: string) => {
    setPayingId(id);
    setTimeout(() => {
      disbursePayment(id, 'upi');
      setPayingId(null);
      showToast(
        'Payout Disbursed via UPI',
        `₹${amount.toLocaleString('en-IN')} successfully sent to ${name}. UTR generated.`,
        'success'
      );
    }, 700);
  };

  return (
    <MobileAppShell title="Payouts Ledger" showBack>
      <PageTransition className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-1">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Financial Ledger
            </span>
            <h1 className="font-extrabold text-lg md:text-2xl text-zinc-900 dark:text-zinc-50 leading-tight">
              Payouts & Earnings
            </h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              showToast(
                'CSV Export Queued',
                'south_click_payouts_ledger_nov2026.csv downloaded.',
                'info'
              )
            }
            className="rounded-full shadow-2xs"
          >
            <Download className="size-3.5" data-icon="inline-start" />
            <span>Export CSV</span>
          </Button>
        </div>

        {/* Financial KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <AnimatedCard className="p-5 flex flex-col justify-between">
            <span className="text-xs font-medium text-zinc-500">Total Paid Out</span>
            <div className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-50 tabular-nums mt-1.5">
              ₹<AnimatedNumber value={totalPaid} />
            </div>
            <div className="text-xs text-[#168a3a] font-bold mt-1">Verified via UPI/IMPS</div>
          </AnimatedCard>

          <AnimatedCard className="p-5 flex flex-col justify-between border-amber-300 dark:border-amber-700/60">
            <span className="text-xs font-medium text-zinc-500">Pending Disbursal</span>
            <div className="text-2xl md:text-3xl font-black text-amber-600 dark:text-amber-400 tabular-nums mt-1.5">
              ₹<AnimatedNumber value={pendingAmount} />
            </div>
            <div className="text-xs text-amber-700 dark:text-amber-400 font-semibold mt-1">
              {payments.filter((p) => p.status === 'pending').length} tasks queued for payment
            </div>
          </AnimatedCard>
        </div>

        {/* Speed Bonuses Callout */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.15 }}
          className="p-4 bg-[#eaf7ee] dark:bg-emerald-950/50 border border-[#168a3a]/25 rounded-2xl flex items-center justify-between text-xs"
        >
          <div className="flex items-center gap-2 text-[#0f6b2d] dark:text-emerald-300 font-bold">
            <Zap className="size-4 text-[#168a3a]" />
            <span>Speed Bonuses Distributed This Month</span>
          </div>
          <span className="font-extrabold text-[#168a3a] dark:text-emerald-400 tabular-nums text-sm">
            ₹<AnimatedNumber value={totalBonuses} />
          </span>
        </motion.div>

        {/* Status Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'pending', label: 'Pending Payout' },
            { id: 'paid', label: 'Paid & Settled' },
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
                    layoutId="payouts-filter-tab"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className="absolute inset-0 rounded-full bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 -z-10 shadow-2xs"
                  />
                )}
                <span className={active ? 'dark:text-zinc-900' : ''}>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Payout Items Feed */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPayments.map((item) => (
            <StaggerItem key={item.id}>
              <AnimatedCard className="p-5 flex flex-col justify-between gap-3 h-full">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                      {item.team_member_name}
                    </h3>
                    <div className="text-xs text-zinc-500 mt-0.5">{item.task_name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-zinc-900 dark:text-zinc-50 tabular-nums">
                      ₹{item.total_amount.toLocaleString('en-IN')}
                    </div>
                    <Badge
                      variant={item.status === 'paid' ? 'success' : 'warning'}
                      className="text-[10px] uppercase font-bold py-0 mt-0.5"
                    >
                      {item.status}
                    </Badge>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-xs text-zinc-600 dark:text-zinc-400">
                  <span>Base: <strong className="text-zinc-800 dark:text-zinc-200">₹{item.base_fee}</strong></span>
                  <span>+</span>
                  <span>Bonus: <strong className="text-[#168a3a] dark:text-emerald-400">₹{item.performance_reward}</strong></span>
                  <span>=</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">Total: ₹{item.total_amount}</span>
                </div>

                {item.status === 'paid' ? (
                  <div className="text-xs text-zinc-500 flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <span className="flex items-center gap-1.5 text-[#168a3a] dark:text-emerald-400 font-semibold">
                      <CheckCircle2 className="size-4" />
                      <span>Disbursed via UPI</span>
                    </span>
                    <span className="font-mono text-zinc-400 text-[11px]">
                      UTR: {item.transaction_id || '431902847192'}
                    </span>
                  </div>
                ) : (
                  <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-zinc-500">Destination: HDFC UPI</span>
                    <Button
                      size="sm"
                      isLoading={payingId === item.id}
                      onClick={() => handlePay(item.id, item.total_amount, item.team_member_name || 'Freelancer')}
                      className="px-3"
                    >
                      Disburse ₹{item.total_amount}
                    </Button>
                  </div>
                )}
              </AnimatedCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </PageTransition>
    </MobileAppShell>
  );
}
