'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AnimatedCard } from '@/components/ui/card';
import { Mail, Lock, Eye, EyeOff, Sparkles, Video, Building2, ArrowLeft, Check } from 'lucide-react';

export default function LoginPage() {
  const { switchRole } = useApp();
  const router = useRouter();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('founder@southclick.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState<UserRole>('founder');

  const handleDemoSelect = (role: UserRole, demoEmail: string) => {
    setSelectedDemo(role);
    setEmail(demoEmail);
    switchRole(role);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    switchRole(selectedDemo);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] dark:bg-[#09090b] flex flex-col justify-center items-center p-4 sm:p-6 text-zinc-900 dark:text-zinc-100 selection:bg-[#eaf7ee] selection:text-[#0f6b2d]">
      
      {/* Back Button */}
      <div className="w-full max-w-md mb-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Authentication Card */}
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/90 dark:border-zinc-800 shadow-xl overflow-hidden"
      >
        {/* Header */}
        <header className="px-6 pt-8 pb-5 text-center bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 flex flex-col items-center">
          <div className="size-12 rounded-2xl bg-[#168a3a] text-white flex items-center justify-center font-extrabold text-lg shadow-xs mb-3">
            SC
          </div>
          <h1 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            South Click
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">Digital Marketing Agency Operating System</p>

          {/* Sign In / Sign Up Segmented Control */}
          <div className="mt-4 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center w-full">
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer select-none ${
                mode === 'signin'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer select-none ${
                mode === 'signup'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              Register
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-6 flex flex-col gap-5">
          
          {/* Quick Demo Switcher Strip */}
          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/80 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-500 px-0.5">
              <span>Quick Demo Role Fill</span>
              <Badge variant="default" className="text-[10px] py-0">1-Click</Badge>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoSelect('founder', 'founder@southclick.com')}
                className={`p-2.5 rounded-xl border text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                  selectedDemo === 'founder'
                    ? 'bg-[#eaf7ee] dark:bg-emerald-950/50 border-[#168a3a] text-[#0f6b2d] dark:text-emerald-300 font-bold'
                    : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-[#168a3a]" />
                  <span>Founder</span>
                </div>
                {selectedDemo === 'founder' && <Check className="size-3.5 text-[#168a3a]" />}
              </button>

              <button
                type="button"
                onClick={() => handleDemoSelect('editor', 'arun.editor@gmail.com')}
                className={`p-2.5 rounded-xl border text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                  selectedDemo === 'editor'
                    ? 'bg-[#eaf7ee] dark:bg-emerald-950/50 border-[#168a3a] text-[#0f6b2d] dark:text-emerald-300 font-bold'
                    : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Video className="size-3.5 text-zinc-700 dark:text-zinc-300" />
                  <span>Editor</span>
                </div>
                {selectedDemo === 'editor' && <Check className="size-3.5 text-[#168a3a]" />}
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="size-4 absolute left-3.5 top-3.5 text-zinc-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  placeholder="name@southclick.com"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Password
                </label>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-[11px] text-[#168a3a] dark:text-emerald-400 hover:underline"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="size-4 absolute left-3.5 top-3.5 text-zinc-400" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full font-bold mt-1">
              Sign In to Agency OS
            </Button>
          </form>

          {/* Talent Application Link */}
          <div className="pt-2 text-center border-t border-zinc-100 dark:border-zinc-800">
            <span className="text-xs text-zinc-500">Want to join South Click? </span>
            <Link
              href="/apply"
              className="text-xs font-bold text-[#168a3a] dark:text-emerald-400 hover:underline"
            >
              Apply as Freelancer
            </Link>
          </div>

        </div>

      </motion.div>

      <p className="text-[11px] text-zinc-400 mt-4">
        Protected by Supabase Auth with Row Level Security (RLS)
      </p>

    </div>
  );
}
