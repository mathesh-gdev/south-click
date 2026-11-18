'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { MobileAppShell } from '@/components/layout/MobileAppShell';
import { PageTransition, StaggerContainer, StaggerItem } from '@/components/ui/page-transition';
import { AnimatedCard } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/ui/toast';
import {
  User,
  ShieldCheck,
  Building2,
  CreditCard,
  Users,
  FileCheck,
  FileText,
  Sliders,
  Sparkles,
  ChevronRight,
  ExternalLink,
  LogOut,
  RefreshCw,
  Smartphone,
  CheckCircle2,
} from 'lucide-react';

export default function MorePage() {
  const { currentUser, currentRole, resetDemoData } = useApp();
  const { showToast } = useToast();

  const menuSections = [
    {
      title: 'Agency Operations Hub',
      items: [
        {
          title: 'Clients & Brand CRM',
          subtitle: 'Active retainers, client POCs & project budgets',
          href: '/clients',
          icon: Building2,
          badge: '3 Retainers',
        },
        {
          title: 'Payouts & UPI Ledger',
          subtitle: 'RazorpayX, base fees & turnaround speed bonuses',
          href: '/payouts',
          icon: CreditCard,
          badge: '₹14,500 Paid',
        },
        {
          title: 'Team & Talent Roster',
          subtitle: 'Freelancers, pending applicants & contracts',
          href: '/team',
          icon: Users,
          badge: '4 Active',
        },
        {
          title: 'Audit Logs & Settings',
          subtitle: 'Immutable activity tracking & performance point rates',
          href: '/audit',
          icon: Sliders,
        },
      ],
    },
    {
      title: 'Freelancer Tools',
      items: [
        {
          title: 'KYC & Bank Verification',
          subtitle: 'Masked Aadhaar, PAN & UPI VPA verification',
          href: '/kyc',
          icon: ShieldCheck,
          badge: 'Verified',
        },
        {
          title: 'Public Application Form',
          subtitle: 'Shareable link for new editors & designers to apply',
          href: '/apply',
          icon: FileText,
          external: true,
        },
      ],
    },
  ];

  return (
    <MobileAppShell title="More & Settings" hideFab>
      <PageTransition className="max-w-5xl mx-auto pb-6">
        {/* Responsive 2-Column Grid on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Left Column: Profile & Speed Bonus Rules */}
          <div className="flex flex-col gap-4">
            {/* Profile Card */}
            <AnimatedCard className="p-5 flex flex-col gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <Avatar
                    src={currentUser.avatar_url}
                    alt={currentUser.full_name}
                    fallback={currentUser.full_name.slice(0, 2)}
                    size="xl"
                    className="ring-2 ring-[#168a3a]/20"
                  />
                  <span className="absolute bottom-0 right-0 size-3.5 bg-[#168a3a] rounded-full ring-2 ring-white dark:ring-zinc-900" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h2 className="font-bold text-base text-zinc-900 dark:text-zinc-100 truncate">
                      {currentUser.full_name}
                    </h2>
                    <CheckCircle2 className="size-4 text-[#168a3a] shrink-0" />
                  </div>
                  <p className="text-xs text-zinc-500 truncate">{currentUser.email}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Badge variant="default" className="text-[10px] uppercase font-bold tracking-wider py-0">
                      {currentUser.role}
                    </Badge>
                    <span className="text-xs text-zinc-500 font-medium tabular-nums">
                      {currentUser.phone || '+91 98765 43210'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Stats Strip */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-center">
                <div>
                  <p className="text-[10px] text-zinc-400 font-medium uppercase">Role</p>
                  <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 capitalize mt-0.5">
                    {currentRole}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-400 font-medium uppercase">KYC Status</p>
                  <p className="text-xs font-bold text-[#168a3a] dark:text-emerald-400 mt-0.5">
                    Verified
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-400 font-medium uppercase">Payouts</p>
                  <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">
                    UPI Instant
                  </p>
                </div>
              </div>
            </AnimatedCard>

            {/* Speed Bonus Formula Reference Card */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.15 }}
              className="bg-[#eaf7ee] dark:bg-emerald-950/40 rounded-2xl p-5 border border-[#168a3a]/25 shadow-xs flex flex-col gap-2.5"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-[#168a3a]" />
                <h3 className="font-bold text-xs text-[#0f6b2d] dark:text-emerald-300">
                  Turnaround Speed Bonus Rules
                </h3>
              </div>
              <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Delivering approved cuts quickly earns bonus rupees automatically added to the payout ledger:
              </p>
              <div className="grid grid-cols-2 gap-2 mt-1 text-xs">
                <div className="bg-white/85 dark:bg-zinc-900/80 rounded-xl p-3 border border-[#168a3a]/15">
                  <span className="font-bold text-[#168a3a] dark:text-emerald-400">&lt; 2 Hours</span>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium mt-0.5">
                    500 pts (+₹250 bonus)
                  </p>
                </div>
                <div className="bg-white/85 dark:bg-zinc-900/80 rounded-xl p-3 border border-[#168a3a]/15">
                  <span className="font-bold text-[#168a3a] dark:text-emerald-400">2 – 3 Hours</span>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium mt-0.5">
                    400 pts (+₹200 bonus)
                  </p>
                </div>
                <div className="bg-white/85 dark:bg-zinc-900/80 rounded-xl p-3 border border-[#168a3a]/15">
                  <span className="font-bold text-[#168a3a] dark:text-emerald-400">3 – 4 Hours</span>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium mt-0.5">
                    300 pts (+₹150 bonus)
                  </p>
                </div>
                <div className="bg-white/85 dark:bg-zinc-900/80 rounded-xl p-3 border border-[#168a3a]/15">
                  <span className="font-bold text-zinc-600 dark:text-zinc-400">4 – 5 Hours</span>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium mt-0.5">
                    200 pts (+₹100 bonus)
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Menu Sections & Build Info */}
          <div className="flex flex-col gap-4">
            {menuSections.map((section, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1">
                  {section.title}
                </h3>

                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 divide-y divide-zinc-100 dark:divide-zinc-800 overflow-hidden shadow-xs">
                  {section.items.map((item, itemIdx) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={itemIdx}
                        href={item.href}
                        className="flex items-center justify-between p-3.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="size-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 shrink-0">
                            <Icon className="size-4 text-[#168a3a]" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-xs text-zinc-900 dark:text-zinc-100 truncate">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-zinc-500 truncate">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          {item.badge && (
                            <Badge variant="default" className="text-[10px] py-0">
                              {item.badge}
                            </Badge>
                          )}
                          <ChevronRight className="size-4 text-zinc-400" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Device & Build Info */}
            <AnimatedCard className="p-4 text-center flex flex-col gap-1.5">
              <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-500 font-medium">
                <Smartphone className="size-3.5 text-[#168a3a]" />
                <span>Responsive Web & Capacitor Android Ready</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Package ID: <code className="text-zinc-600 dark:text-zinc-300 font-mono">com.southclick.agency</code>
              </p>
              <p className="text-[11px] text-zinc-400">
                South Click OS v1.0.0 • Production Build
              </p>
            </AnimatedCard>

            {/* Reset Demo State & Exit Options */}
            <div className="flex flex-col gap-2.5">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  resetDemoData();
                  showToast('Demo State Reset', 'Restored pristine South Click agency seed data.', 'info');
                }}
                className="w-full font-bold border-zinc-200 dark:border-zinc-800"
              >
                <RefreshCw className="size-4" data-icon="inline-start" />
                <span>Reset Demo State (Pristine Data)</span>
              </Button>

              <Link href="/">
                <Button variant="secondary" size="lg" className="w-full font-bold">
                  <LogOut className="size-4" data-icon="inline-start" />
                  <span>Switch Role or Exit to Landing</span>
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </PageTransition>
    </MobileAppShell>
  );
}
