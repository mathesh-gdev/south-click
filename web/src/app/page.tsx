'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AnimatedCard } from '@/components/ui/card';
import {
  Sparkles,
  Video,
  Palette,
  Share2,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function HomePage() {
  const { switchRole } = useApp();
  const router = useRouter();

  const handleQuickDemo = (role: UserRole) => {
    switchRole(role);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 selection:bg-[#eaf7ee] selection:text-[#0f6b2d] flex flex-col justify-between">
      
      {/* ========================================================================= */}
      {/* RESPONSIVE TOP NAV BAR                                                    */}
      {/* ========================================================================= */}
      <header className="w-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-zinc-200/90 dark:border-zinc-800 sticky top-0 z-40 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ duration: 0.15 }}
              className="size-9 rounded-xl bg-[#168a3a] text-white flex items-center justify-center font-extrabold text-sm shadow-xs"
            >
              SC
            </motion.div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-zinc-900 dark:text-zinc-50">
                  South Click
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#eaf7ee] text-[#0f6b2d] dark:bg-emerald-950/60 dark:text-emerald-300 border border-[#168a3a]/20">
                  OS
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 font-medium hidden sm:block">
                Digital Marketing Agency Team OS
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link href="/apply">
              <Button variant="subtle" size="sm" className="rounded-xl">
                Apply as Talent →
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm" className="rounded-xl shadow-xs">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* HERO SECTION                                                              */}
      {/* ========================================================================= */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-14 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Headline & 1-Tap Demo Switcher */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex flex-col gap-3"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaf7ee] dark:bg-emerald-950/60 border border-[#168a3a]/20 text-xs font-bold text-[#0f6b2d] dark:text-emerald-300 w-fit">
                <Sparkles className="size-3.5 text-[#168a3a]" />
                <span>Responsive Web & Native Android Application</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
                The Operating System for Elite Creative Agencies
              </h1>

              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                Manage video editors, graphic designers, and social media managers with automated speed bonuses, unlimited version control, quality control signoffs, and instant UPI payouts.
              </p>
            </motion.div>

            {/* 1-Tap Interactive Demo Selector Card */}
            <AnimatedCard className="p-5 md:p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Instant Access
                  </span>
                  <h2 className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100">
                    1-Tap Live Demo Personas
                  </h2>
                </div>
                <Badge variant="default" className="text-[10px]">
                  Zero Login Required
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Founder */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => handleQuickDemo('founder')}
                  className="p-3.5 rounded-xl border border-zinc-200/90 dark:border-zinc-800 hover:border-[#168a3a] dark:hover:border-emerald-600 bg-[#fcfdfc] dark:bg-zinc-800/50 hover:bg-[#eaf7ee]/30 dark:hover:bg-emerald-950/20 text-left flex items-center justify-between transition-colors group cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-10 rounded-xl bg-[#168a3a] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                      <Sparkles className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-zinc-900 dark:text-zinc-100 group-hover:text-[#168a3a]">
                        Founder Command
                      </div>
                      <div className="text-[11px] text-zinc-500 truncate">
                        ₹12.45L pipeline • QC reviews
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="size-4 text-zinc-400 group-hover:text-[#168a3a] transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
                </motion.button>

                {/* Video Editor */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => handleQuickDemo('editor')}
                  className="p-3.5 rounded-xl border border-zinc-200/90 dark:border-zinc-800 hover:border-[#168a3a] dark:hover:border-emerald-600 bg-[#fcfdfc] dark:bg-zinc-800/50 hover:bg-[#eaf7ee]/30 dark:hover:bg-emerald-950/20 text-left flex items-center justify-between transition-colors group cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                      <Video className="size-5 text-emerald-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-zinc-900 dark:text-zinc-100 group-hover:text-[#168a3a]">
                        Senior Video Editor
                      </div>
                      <div className="text-[11px] text-zinc-500 truncate">
                        Speed bonus timer • V1..Vn cuts
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="size-4 text-zinc-400 group-hover:text-[#168a3a] transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
                </motion.button>

                {/* Graphic Designer */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => handleQuickDemo('designer')}
                  className="p-3.5 rounded-xl border border-zinc-200/90 dark:border-zinc-800 hover:border-[#168a3a] dark:hover:border-emerald-600 bg-[#fcfdfc] dark:bg-zinc-800/50 hover:bg-[#eaf7ee]/30 dark:hover:bg-emerald-950/20 text-left flex items-center justify-between transition-colors group cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-10 rounded-xl bg-zinc-800 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                      <Palette className="size-5 text-amber-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-zinc-900 dark:text-zinc-100 group-hover:text-[#168a3a]">
                        Graphic Designer
                      </div>
                      <div className="text-[11px] text-zinc-500 truncate">
                        Posters • Carousels • Creative
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="size-4 text-zinc-400 group-hover:text-[#168a3a] transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
                </motion.button>

                {/* SMM */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => handleQuickDemo('smm')}
                  className="p-3.5 rounded-xl border border-zinc-200/90 dark:border-zinc-800 hover:border-[#168a3a] dark:hover:border-emerald-600 bg-[#fcfdfc] dark:bg-zinc-800/50 hover:bg-[#eaf7ee]/30 dark:hover:bg-emerald-950/20 text-left flex items-center justify-between transition-colors group cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-10 rounded-xl bg-zinc-800 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                      <Share2 className="size-5 text-sky-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-zinc-900 dark:text-zinc-100 group-hover:text-[#168a3a]">
                        Social Media Manager
                      </div>
                      <div className="text-[11px] text-zinc-500 truncate">
                        Calendars • Analytics • Retainers
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="size-4 text-zinc-400 group-hover:text-[#168a3a] transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
                </motion.button>

              </div>
            </AnimatedCard>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <AnimatedCard className="p-3.5 flex flex-col gap-1">
                <Zap className="size-4 text-[#168a3a]" />
                <p className="font-bold text-xs text-zinc-900 dark:text-zinc-100">Speed Bonuses</p>
                <p className="text-[11px] text-zinc-500">Sub-2h = +₹250 bonus</p>
              </AnimatedCard>

              <AnimatedCard className="p-3.5 flex flex-col gap-1">
                <Clock className="size-4 text-[#168a3a]" />
                <p className="font-bold text-xs text-zinc-900 dark:text-zinc-100">Version History</p>
                <p className="text-[11px] text-zinc-500">Unlimited V1..Vn logs</p>
              </AnimatedCard>

              <AnimatedCard className="p-3.5 flex flex-col gap-1">
                <TrendingUp className="size-4 text-[#168a3a]" />
                <p className="font-bold text-xs text-zinc-900 dark:text-zinc-100">Instant UPI</p>
                <p className="text-[11px] text-zinc-500">RazorpayX UTR ledger</p>
              </AnimatedCard>

              <AnimatedCard className="p-3.5 flex flex-col gap-1">
                <ShieldCheck className="size-4 text-[#168a3a]" />
                <p className="font-bold text-xs text-zinc-900 dark:text-zinc-100">KYC & RLS</p>
                <p className="text-[11px] text-zinc-500">Masked Aadhaar & PAN</p>
              </AnimatedCard>
            </div>

          </div>

          {/* Right Column: Live Interactive Preview Widget */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            <AnimatedCard className="p-6 flex flex-col gap-4 shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-[#168a3a]" />
                  <span className="font-bold text-xs text-zinc-800 dark:text-zinc-200">
                    Live Operating Preview
                  </span>
                </div>
                <Badge variant="default" className="text-[10px]">
                  Active Sprint
                </Badge>
              </div>

              {/* Active Task Sample */}
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 flex flex-col gap-2.5">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-300 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                      In Production • V2
                    </span>
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 mt-1">
                      GreenCart Organic Launch (Reel 01)
                    </h3>
                  </div>
                  <span className="font-mono font-bold text-xs text-zinc-800 dark:text-zinc-200 tabular-nums">
                    01:45:20
                  </span>
                </div>

                <div className="p-3 bg-[#eaf7ee] dark:bg-emerald-950/50 border border-[#168a3a]/25 rounded-xl flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0f6b2d] dark:text-emerald-300">
                    Eligible Speed Bonus:
                  </span>
                  <span className="font-black text-[#168a3a] dark:text-emerald-400 tabular-nums">
                    +₹250 (500 pts)
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-1">
                <Button
                  size="lg"
                  onClick={() => handleQuickDemo('founder')}
                  className="w-full font-bold"
                >
                  <span>Launch Founder Command Center</span>
                  <ArrowRight className="size-4" data-icon="inline-end" />
                </Button>

                <Link href="/login" className="w-full">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full font-semibold"
                  >
                    <Lock className="size-3.5" data-icon="inline-start" />
                    <span>Sign In with Credentials</span>
                  </Button>
                </Link>
              </div>

              <div className="text-center text-[11px] text-zinc-400 pt-1">
                Tested on Chrome, Safari, Android APK & PWA
              </div>
            </AnimatedCard>

          </div>

        </div>
      </main>

      {/* ========================================================================= */}
      {/* MINIMALIST FOOTER                                                         */}
      {/* ========================================================================= */}
      <footer className="w-full border-t border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-2">
          <p>© 2026 South Click Digital Marketing Agency OS. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px] font-medium">
            <Link href="/apply" className="hover:text-[#168a3a]">Talent Application</Link>
            <span>•</span>
            <Link href="/login" className="hover:text-[#168a3a]">Agency Login</Link>
            <span>•</span>
            <span className="text-zinc-400">Bengaluru, India</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
