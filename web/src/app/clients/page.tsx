'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { MobileAppShell } from '@/components/layout/MobileAppShell';
import { PageTransition, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';
import { AnimatedCard } from '@/components/ui/card';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import { Building2, Plus, Search, Phone, FileText, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ClientsPage() {
  const [search, setSearch] = useState('');
  const { showToast } = useToast();

  const clients = [
    {
      id: 'c1',
      name: 'Madras Coffee House',
      contact: 'Rajesh Mehta (CMO)',
      phone: '+91 98401 44551',
      plan: '₹85,000 / month',
      active_campaign: 'Cold Brew Video Campaign (66% completed)',
      receivables: 0,
      paid_status: 'Paid on Nov 1',
    },
    {
      id: 'c2',
      name: 'Vayu Electric Mobility',
      contact: 'Ananya Roy (Brand Lead)',
      phone: '+91 98330 11992',
      plan: '₹1,25,000 / month',
      active_campaign: 'Urban Commuter YouTube Series (35% completed)',
      receivables: 62500,
      paid_status: 'Inv #SC-2026-89 Due',
    },
    {
      id: 'c3',
      name: 'Ananya Silks',
      contact: 'Siddharth Nair (Creative Dir)',
      phone: '+91 97400 33221',
      plan: '₹65,000 / month',
      active_campaign: 'Festive Kanchipuram Creatives (100% Completed)',
      receivables: 0,
      paid_status: 'Settled',
    },
    {
      id: 'c4',
      name: 'Zeno Health & Wellness',
      contact: 'Dr. Vivek Swaminathan (Founder)',
      phone: '+91 98412 66778',
      plan: '₹55,000 / month',
      active_campaign: 'Herbal Hydration Reels (Active)',
      receivables: 0,
      paid_status: 'Paid on Nov 14',
    },
  ];

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.contact.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MobileAppShell title="Clients CRM" showBack>
      <PageTransition className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-1">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Accounts & CRM
            </span>
            <h1 className="font-extrabold text-lg md:text-2xl text-zinc-900 dark:text-zinc-50 leading-tight">
              Brand Retainers
            </h1>
          </div>
          <Button
            size="sm"
            onClick={() => showToast('New Client Modal', 'Add new enterprise brand retainer.', 'info')}
            className="rounded-full shadow-xs"
          >
            <Plus className="size-4" data-icon="inline-start" />
            <span>New Brand</span>
          </Button>
        </div>

        {/* Executive Billing KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <AnimatedCard className="p-5 flex flex-col justify-between">
            <span className="text-xs font-medium text-zinc-500">Monthly Retainers</span>
            <div className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-50 tabular-nums mt-1.5">
              ₹<AnimatedNumber value={485000} />
            </div>
            <div className="text-xs text-[#168a3a] font-bold mt-1">8 Active Brand Retainers</div>
          </AnimatedCard>

          <AnimatedCard className="p-5 flex flex-col justify-between border-amber-300 dark:border-amber-700/60">
            <span className="text-xs font-medium text-zinc-500">Pending Receivables</span>
            <div className="text-2xl md:text-3xl font-black text-amber-600 dark:text-amber-400 tabular-nums mt-1.5">
              ₹<AnimatedNumber value={42500} />
            </div>
            <div className="text-xs text-amber-700 dark:text-amber-400 font-semibold mt-1">
              1 invoice overdue
            </div>
          </AnimatedCard>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="size-4 absolute left-3.5 top-3.5 text-zinc-400" />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search brand clients or contacts..."
            className="pl-10"
          />
        </div>

        {/* Clients Feed */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <StaggerItem key={c.id}>
              <AnimatedCard className="p-5 flex flex-col justify-between gap-3.5 h-full">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                      {c.name}
                    </h3>
                    <div className="text-xs text-zinc-500 mt-0.5">
                      {c.contact} • {c.phone}
                    </div>
                  </div>
                  <Badge variant="secondary" className="font-bold tabular-nums">
                    {c.plan}
                  </Badge>
                </div>

                {/* Active Campaign */}
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-100 dark:border-zinc-800 text-xs flex flex-col gap-1">
                  <span className="text-zinc-500 dark:text-zinc-400 text-[10px] uppercase font-bold">
                    Active Sprint:
                  </span>
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">
                    {c.active_campaign}
                  </span>
                </div>

                {/* Receivables Status & Actions */}
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <div>
                    {c.receivables > 0 ? (
                      <Badge variant="warning" className="flex items-center gap-1 font-bold">
                        <AlertCircle className="size-3" />
                        <span>{c.paid_status}</span>
                      </Badge>
                    ) : (
                      <Badge variant="success" className="flex items-center gap-1 font-bold">
                        <CheckCircle2 className="size-3" />
                        <span>{c.paid_status}</span>
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Link href="/chat">
                      <Button variant="secondary" size="sm" className="h-8 text-xs font-semibold px-2.5">
                        Chat
                      </Button>
                    </Link>
                    <Link href="/projects">
                      <Button size="sm" className="h-8 text-xs font-bold px-3">
                        Campaigns
                      </Button>
                    </Link>
                  </div>
                </div>
              </AnimatedCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </PageTransition>
    </MobileAppShell>
  );
}
