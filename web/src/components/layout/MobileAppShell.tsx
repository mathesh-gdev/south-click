'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import { useToast } from '@/components/ui/toast';
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  MessageSquare,
  MoreHorizontal,
  Bell,
  ChevronDown,
  Plus,
  Sparkles,
  CheckCircle2,
  Video,
  Palette,
  Share2,
  CreditCard,
  Building2,
  Sliders,
  ShieldCheck,
  ArrowLeft,
  LogOut,
  Check,
  Volume2,
  VolumeX,
  RotateCcw,
} from 'lucide-react';
import { sound } from '@/lib/sound';

interface MobileAppShellProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  hideBottomNav?: boolean;
  hideFab?: boolean;
  onFabClick?: () => void;
}

export function MobileAppShell({
  children,
  title,
  showBack,
  onBack,
  hideBottomNav,
  hideFab,
  onFabClick,
}: MobileAppShellProps) {
  const { currentRole, currentUser, switchRole, notifications, resetDemoData } = useApp();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();

  React.useEffect(() => {
    setSoundEnabled(sound.isEnabled());
  }, []);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const roleLabels: Record<
    UserRole,
    { title: string; subtitle: string; icon: React.ComponentType<{ className?: string }> }
  > = {
    founder: { title: 'Founder', subtitle: 'Agency Owner', icon: Sparkles },
    editor: { title: 'Editor', subtitle: 'Video & Reels', icon: Video },
    designer: { title: 'Designer', subtitle: 'Graphics & Brand', icon: Palette },
    smm: { title: 'SMM', subtitle: 'Social Media', icon: Share2 },
  };

  const currentRoleInfo = roleLabels[currentRole];
  const RoleIcon = currentRoleInfo.icon;

  const handleRoleSelect = (role: UserRole) => {
    switchRole(role);
    setRoleMenuOpen(false);
    showToast(`Switched persona to ${roleLabels[role].title}`, 'Interface and permissions updated.');
    router.push('/dashboard');
  };

  // Mobile Bottom Navigation Tabs (5 items)
  const mobileNavItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Projects', href: '/projects', icon: FolderKanban },
    {
      label: currentRole === 'founder' ? 'Team' : 'My Tasks',
      href: currentRole === 'founder' ? '/team' : '/tasks',
      icon: Users,
    },
    { label: 'Chat', href: '/chat', icon: MessageSquare, badge: 2 },
    { label: 'More', href: '/more', icon: MoreHorizontal },
  ];

  // Desktop Left Sidebar Navigation Links
  const desktopNavItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, section: 'Core' },
    { label: 'Projects & Campaigns', href: '/projects', icon: FolderKanban, section: 'Core' },
    {
      label: currentRole === 'founder' ? 'Team Talent Roster' : 'My Assigned Tasks',
      href: currentRole === 'founder' ? '/team' : '/tasks',
      icon: Users,
      section: 'Core',
    },
    { label: 'Team Chat & Files', href: '/chat', icon: MessageSquare, badge: 2, section: 'Core' },
    { label: 'Payouts & UPI Ledger', href: '/payouts', icon: CreditCard, section: 'Finance' },
    { label: 'Clients & Brand CRM', href: '/clients', icon: Building2, section: 'Operations' },
    { label: 'KYC & Bank Verification', href: '/kyc', icon: ShieldCheck, section: 'Operations' },
    { label: 'Audit Logs & Settings', href: '/audit', icon: Sliders, section: 'System' },
  ];

  return (
    <div className="min-h-screen bg-[#f8faf9] dark:bg-[#09090b] flex flex-col md:flex-row text-zinc-900 dark:text-zinc-100 selection:bg-[#eaf7ee] selection:text-[#0f6b2d]">
      
      {/* ========================================================================= */}
      {/* DESKTOP PERMANENT NAVIGATION SIDEBAR (md:flex)                            */}
      {/* ========================================================================= */}
      <aside className="hidden md:flex md:w-64 lg:w-72 md:flex-col fixed inset-y-0 left-0 z-40 bg-white dark:bg-zinc-900 border-r border-zinc-200/90 dark:border-zinc-800 shadow-xs">
        
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ duration: 0.15 }}
              className="size-8 rounded-lg bg-[#168a3a] text-white flex items-center justify-center font-bold text-sm shadow-xs"
            >
              SC
            </motion.div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-tight text-zinc-900 dark:text-zinc-50">
                  South Click
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#eaf7ee] text-[#0f6b2d] dark:bg-emerald-950/60 dark:text-emerald-300 border border-[#168a3a]/20">
                  OS
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 font-medium">Agency Operating System</p>
            </div>
          </Link>
        </div>

        {/* 1-Tap Demo Role Switcher Dropdown */}
        <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5 px-1">
            Current Demo Persona
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200/90 dark:border-zinc-700/80 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="size-7 rounded-lg bg-[#eaf7ee] text-[#168a3a] dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center shrink-0">
                  <RoleIcon className="size-4" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                    {currentRoleInfo.title}
                  </p>
                  <p className="text-[10px] text-zinc-500 truncate">{currentRoleInfo.subtitle}</p>
                </div>
              </div>
              <ChevronDown
                className={`size-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                  roleMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {roleMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setRoleMenuOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute left-0 right-0 mt-2 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 py-1.5 z-50 overflow-hidden"
                  >
                    <div className="px-3 py-1.5 border-b border-zinc-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      Switch Role (1-Tap Demo)
                    </div>
                    {(['founder', 'editor', 'designer', 'smm'] as UserRole[]).map((r) => {
                      const item = roleLabels[r];
                      const Icon = item.icon;
                      const active = currentRole === r;
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => handleRoleSelect(r)}
                          className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#eaf7ee] text-[#0f6b2d] dark:bg-emerald-950/60 dark:text-emerald-300 font-semibold'
                              : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="size-4 text-[#168a3a] shrink-0" />
                            <div>
                              <div className="font-semibold text-xs">{item.title}</div>
                              <div className="text-[10px] text-zinc-500">{item.subtitle}</div>
                            </div>
                          </div>
                          {active && <Check className="size-4 text-[#168a3a] shrink-0" />}
                        </button>
                      );
                    })}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Sidebar Navigation Links */}
        <nav className="flex-1 px-3 py-3 flex flex-col gap-1 overflow-y-auto no-scrollbar">
          {desktopNavItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  active
                    ? 'text-[#0f6b2d] dark:text-emerald-300 font-bold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="desktop-active-nav"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    className="absolute inset-0 rounded-xl bg-[#eaf7ee] dark:bg-emerald-950/50 border border-[#168a3a]/25 shadow-2xs -z-10"
                  />
                )}
                <div className="flex items-center gap-3">
                  <Icon
                    className={`size-4 shrink-0 ${
                      active ? 'text-[#168a3a]' : 'text-zinc-500 dark:text-zinc-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-[#168a3a] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div className="p-3 border-t border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-2xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                currentUser.avatar_url ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
              }
              alt={currentUser.full_name}
              className="size-9 rounded-full object-cover ring-2 ring-[#168a3a]/20"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                  {currentUser.full_name}
                </p>
                <CheckCircle2 className="size-3.5 text-[#168a3a] shrink-0" />
              </div>
              <p className="text-[10px] text-zinc-500 truncate capitalize">
                {currentUser.role} • Active
              </p>
            </div>
            <Link
              href="/"
              title="Exit / Switch Demo"
              className="size-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <LogOut className="size-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN CONTENT CANVAS (Responsive Desktop & Mobile Container)               */}
      {/* ========================================================================= */}
      <div className="flex-1 md:pl-64 lg:pl-72 flex flex-col min-h-screen w-full">
        
        {/* ========================================================================= */}
        {/* DESKTOP TOP HEADER (md:flex)                                             */}
        {/* ========================================================================= */}
        <header className="hidden md:flex h-16 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-zinc-200/90 dark:border-zinc-800 px-6 lg:px-8 items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            {showBack && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onBack || (() => router.back())}
                className="size-8 rounded-lg flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <ArrowLeft className="size-4" />
              </motion.button>
            )}
            <h1 className="font-extrabold text-base text-zinc-900 dark:text-zinc-100 tracking-tight">
              {title || (pathname === '/dashboard' ? 'Overview' : pathname.replace('/', '').toUpperCase())}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Action Button */}
            {currentRole === 'founder' ? (
              <Link href="/projects/new">
                <motion.div
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-1.5 bg-[#168a3a] hover:bg-[#0f6b2d] text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Plus className="size-4" />
                  <span>New Project</span>
                </motion.div>
              </Link>
            ) : (
              <Link href="/tasks">
                <motion.div
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-1.5 bg-[#168a3a] hover:bg-[#0f6b2d] text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <FolderKanban className="size-4" />
                  <span>My Tasks</span>
                </motion.div>
              </Link>
            )}

            {/* Reset Demo State Button */}
            <button
              type="button"
              onClick={() => {
                resetDemoData();
                showToast('Demo State Reset', 'Restored pristine South Click agency seed data.', 'info');
              }}
              title="Reset Demo State"
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="size-3.5 text-[#168a3a]" />
              <span className="text-[11px]">Reset State</span>
            </button>

            {/* Audio Effects Toggle Button */}
            <button
              type="button"
              onClick={() => {
                const next = sound.toggleSound();
                setSoundEnabled(next);
                showToast(next ? 'Audio Effects On' : 'Audio Effects Muted', next ? 'Micro-chimes enabled (M)' : 'UI sounds silenced (M)', 'info');
              }}
              title={soundEnabled ? 'Mute Audio Effects (M)' : 'Enable Audio Effects (M)'}
              className="size-9 rounded-xl flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 transition-all cursor-pointer"
            >
              {soundEnabled ? (
                <Volume2 className="size-4 text-[#168a3a]" />
              ) : (
                <VolumeX className="size-4 text-zinc-400" />
              )}
            </button>

            {/* Notifications Bell */}
            <Link href="/notifications">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative size-9 rounded-xl flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 transition-all cursor-pointer"
              >
                <Bell className="size-4 text-zinc-700 dark:text-zinc-300" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 size-4 rounded-full bg-[#168a3a] text-white text-[9px] font-bold flex items-center justify-center border-2 border-white dark:border-zinc-900">
                    {unreadCount}
                  </span>
                )}
              </motion.div>
            </Link>

            {/* User Profile Chip */}
            <Link
              href="/more"
              className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 transition-all"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  currentUser.avatar_url ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
                }
                alt={currentUser.full_name}
                className="size-7 rounded-full object-cover ring-1 ring-[#168a3a]/30"
              />
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                {currentUser.full_name}
              </span>
            </Link>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* MOBILE TOP APP BAR (flex md:hidden - NO HARDCODED PHONE STATUS BAR)        */}
        {/* ========================================================================= */}
        <header className="flex md:hidden sticky top-0 z-40 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-4 h-15 items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 shadow-2xs">
          <div className="flex items-center gap-2">
            {showBack ? (
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={onBack || (() => router.back())}
                className="size-9 rounded-full flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <ArrowLeft className="size-5" />
              </motion.button>
            ) : (
              <Link href="/dashboard" className="flex items-center gap-1.5">
                <div className="size-7 rounded-lg bg-[#168a3a] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  SC
                </div>
                <span className="font-extrabold text-sm tracking-tight text-[#168a3a]">South Click</span>
              </Link>
            )}

            {/* Mobile 1-Tap Role Switcher Pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-1 bg-[#eaf7ee] hover:bg-[#d8f2df] dark:bg-emerald-950/60 dark:text-emerald-300 px-2.5 py-1 rounded-full text-xs font-semibold text-[#0f6b2d] border border-[#168a3a]/20 transition-all active:scale-95 cursor-pointer"
              >
                <RoleIcon className="size-3.5 text-[#168a3a]" />
                <span>{currentRoleInfo.title}</span>
                <ChevronDown className="size-3 opacity-70" />
              </button>

              <AnimatePresence>
                {roleMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setRoleMenuOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 mt-2 w-52 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 py-1.5 z-50 overflow-hidden"
                    >
                      <div className="px-3 py-1.5 border-b border-zinc-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        Switch Role (1-Tap Demo)
                      </div>
                      {(['founder', 'editor', 'designer', 'smm'] as UserRole[]).map((r) => {
                        const item = roleLabels[r];
                        const Icon = item.icon;
                        const active = currentRole === r;
                        return (
                          <button
                            key={r}
                            type="button"
                            onClick={() => handleRoleSelect(r)}
                            className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                              active
                                ? 'bg-[#eaf7ee] text-[#0f6b2d] dark:bg-emerald-950/60 dark:text-emerald-300 font-semibold'
                                : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Icon className="size-4 text-[#168a3a] shrink-0" />
                              <div>
                                <div className="font-semibold text-xs leading-tight">{item.title}</div>
                                <div className="text-[10px] text-zinc-500">{item.subtitle}</div>
                              </div>
                            </div>
                            {active && <CheckCircle2 className="size-4 text-[#168a3a] shrink-0" />}
                          </button>
                        );
                      })}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Action Icons: Sound, Notifications & Profile */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                const next = sound.toggleSound();
                setSoundEnabled(next);
                showToast(next ? 'Audio Effects On' : 'Audio Effects Muted', next ? 'Micro-chimes enabled' : 'UI sounds silenced', 'info');
              }}
              title={soundEnabled ? 'Mute Audio Effects' : 'Enable Audio Effects'}
              className="size-8 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 transition-all"
            >
              {soundEnabled ? (
                <Volume2 className="size-4 text-[#168a3a]" />
              ) : (
                <VolumeX className="size-4 text-zinc-400" />
              )}
            </button>

            <Link
              href="/notifications"
              className="relative size-8 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 transition-all"
            >
              <Bell className="size-4 text-zinc-700 dark:text-zinc-300" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 size-3.5 rounded-full bg-[#168a3a] text-white text-[8px] font-bold flex items-center justify-center border border-white dark:border-zinc-900">
                  {unreadCount}
                </span>
              )}
            </Link>

            <Link
              href="/more"
              className="size-7 rounded-full overflow-hidden ring-1.5 ring-[#168a3a]/30 shadow-2xs"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  currentUser.avatar_url ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
                }
                alt={currentUser.full_name}
                className="size-full object-cover"
              />
            </Link>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* RESPONSIVE CONTENT AREA                                                   */}
        {/* ========================================================================= */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pb-24 md:pb-8">
          {children}
        </main>

        {/* Contextual Floating Action Button (FAB - Visible on Mobile only) */}
        {!hideFab && (
          <div className="fixed md:hidden bottom-20 right-4 z-40">
            <motion.button
              whileTap={{ scale: 0.9, rotate: 45 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.15 }}
              onClick={
                onFabClick ||
                (() => {
                  if (currentRole === 'founder') {
                    router.push('/projects/new');
                  } else {
                    router.push('/tasks');
                  }
                })
              }
              aria-label="Action"
              className="size-13 rounded-full bg-[#168a3a] text-white shadow-xl flex items-center justify-center hover:bg-[#0f6b2d] transition-colors ring-4 ring-[#f8faf9] dark:ring-[#09090b] cursor-pointer"
            >
              <Plus className="size-6 text-white" strokeWidth={2.5} />
            </motion.button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5-TAB MOBILE BOTTOM NAVIGATION BAR (flex md:hidden)                       */}
        {/* ========================================================================= */}
        {!hideBottomNav && (
          <nav className="flex md:hidden fixed bottom-0 left-0 w-full z-40 justify-around items-center h-16 px-2 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-t border-zinc-200/90 dark:border-zinc-800 shadow-lg">
            {mobileNavItems.map((tab) => {
              const active =
                pathname === tab.href ||
                (tab.href !== '/dashboard' && pathname.startsWith(tab.href));
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.label}
                  href={tab.href}
                  className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors ${
                    active
                      ? 'text-[#168a3a] font-bold'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="mobile-active-tab-glow"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      className="absolute inset-0 bg-[#eaf7ee] dark:bg-emerald-950/50 rounded-xl -z-10"
                    />
                  )}
                  <motion.div
                    animate={active ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    <Icon className="size-5" />
                    {tab.badge && (
                      <span className="absolute -top-1 -right-2 bg-[#168a3a] text-white text-[9px] font-bold size-3.5 rounded-full flex items-center justify-center">
                        {tab.badge}
                      </span>
                    )}
                  </motion.div>
                  <span className="text-[10px] mt-0.5 tracking-tight font-medium">
                    {tab.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        )}

      </div>
    </div>
  );
}
