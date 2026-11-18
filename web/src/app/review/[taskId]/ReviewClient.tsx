'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '@/context/AppContext';
import { MobileAppShell } from '@/components/layout/MobileAppShell';
import { PageTransition } from '@/components/ui/page-transition';
import { AnimatedCard, Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/toast';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowLeft,
  Volume2,
  Maximize2,
  Check,
  Share2,
} from 'lucide-react';
import { sound } from '@/lib/sound';

function ReviewContent() {
  const params = useParams();
  const router = useRouter();
  const { tasks, submissions, approveDeliverable, requestRevision } = useApp();
  const { showToast } = useToast();

  const taskId = (params?.taskId as string) || 'tsk_01';
  const task = tasks.find((t) => t.id === taskId) || tasks[0];
  const taskSubmissions = submissions.filter((s) => s.task_id === taskId);
  const activeSub = taskSubmissions[0] || {
    version_number: 2,
    uploader_name: 'Arun Vignesh',
    notes: 'Cut V2: Lowered BGM by 3dB, added motion blur splash, updated 4K transparent logo.',
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSeconds, setPlaybackSeconds] = useState(24);
  const [activeVersionTab, setActiveVersionTab] = useState<number>(activeSub.version_number || 2);
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [revisionNotes, setRevisionNotes] = useState('Please lower background music volume slightly during the voiceover.');
  const [isApproving, setIsApproving] = useState(false);

  // Playback timer simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackSeconds((prev) => (prev >= 45 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleApprove = () => {
    setIsApproving(true);
    approveDeliverable(taskId);
    showToast(
      'Deliverable Approved!',
      `₹250 Speed Bonus verified and ₹${task.base_fee + 250} payment queued.`,
      'success'
    );
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  const handleSendRevision = () => {
    requestRevision(taskId, revisionNotes);
    setShowRevisionModal(false);
    showToast('Revision Request Sent', 'Freelancer notified with timestamped feedback.', 'info');
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  const handleCopyReviewLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      sound.playCopy();
      showToast('Client Review Link Copied', 'Direct QC review link copied to clipboard.', 'success');
    }
  };

  const scrubberPercentage = (playbackSeconds / 45) * 100;

  return (
    <MobileAppShell title="QC Review" showBack hideBottomNav hideFab>
      <PageTransition className="max-w-5xl mx-auto">
        {/* Header Title */}
        <div className="flex items-center justify-between pb-1">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Quality Control Gate
            </span>
            <h1 className="font-extrabold text-lg md:text-2xl text-zinc-900 dark:text-zinc-50 leading-tight">
              Review Deliverable Cut
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyReviewLink}
              className="h-8 gap-1.5 text-xs border-zinc-200 dark:border-zinc-800"
            >
              <Share2 className="size-3.5" data-icon="inline-start" />
              <span className="hidden sm:inline">Copy Review Link</span>
              <span className="sm:hidden">Share</span>
            </Button>
            <Badge variant="default" className="text-xs px-3 py-1">
              Stage 7 QC
            </Badge>
          </div>
        </div>

        {/* Responsive Dual Column Review Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: 9:16 Vertical Reel Player */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[9/14] max-w-[380px] mx-auto lg:max-w-none bg-zinc-950 rounded-2xl overflow-hidden shadow-xl border border-zinc-800 flex flex-col justify-between p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80"
                alt="Reel Preview"
                className="absolute inset-0 size-full object-cover opacity-85 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/50" />

              {/* Top Player Badges */}
              <div className="relative z-10 flex justify-between items-center text-white">
                <span className="text-[10px] font-bold bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                  Cut V{activeVersionTab} (1080x1920)
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => showToast('Audio Muted/Unmuted', 'Audio levels balanced at -3dB', 'info')}
                    className="p-1.5 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                  >
                    <Volume2 className="size-4 text-white/90" />
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast('Fullscreen mode', 'Press Esc to exit', 'info')}
                    className="p-1.5 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                  >
                    <Maximize2 className="size-4 text-white/90" />
                  </button>
                </div>
              </div>

              {/* Center Play / Pause Animated Icon Button */}
              <div className="relative z-10 flex justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="size-16 rounded-full bg-white/35 backdrop-blur-md hover:bg-white/50 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/30 shadow-lg"
                >
                  {isPlaying ? (
                    <Pause className="size-7 fill-current" />
                  ) : (
                    <Play className="size-7 fill-current ml-1" />
                  )}
                </motion.button>
              </div>

              {/* Bottom Video Scrubber */}
              <div className="relative z-10 flex flex-col gap-1.5 text-white">
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-300">
                  <span className="tabular-nums">00:{playbackSeconds.toString().padStart(2, '0')}</span>
                  <span>00:45</span>
                </div>
                <div className="w-full bg-white/25 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    className="bg-[#168a3a] h-1.5 rounded-full"
                    style={{ width: `${scrubberPercentage}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Performance Calculation, Version History, Approval Actions */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Turnaround & Speed Bonus Calculation Card */}
            <AnimatedCard className="p-5 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Turnaround Performance
                  </span>
                  <div className="font-bold text-base text-zinc-900 dark:text-zinc-50 mt-0.5">
                    {task.name}
                  </div>
                  <div className="text-xs text-zinc-500 mt-0.5">Submitted by Arun Vignesh</div>
                </div>
                <Badge variant="default" className="text-xs px-2.5 py-1">
                  Verified 1h 48m
                </Badge>
              </div>

              <div className="p-4 bg-[#eaf7ee] dark:bg-emerald-950/50 border border-[#168a3a]/25 rounded-xl flex flex-col gap-2 text-xs">
                <div className="flex justify-between items-center font-bold text-[#0f6b2d] dark:text-emerald-300">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="size-3.5 text-[#168a3a]" />
                    Speed Bonus Achieved (Sub-2hr)
                  </span>
                  <span className="tabular-nums">+500 Points (₹250)</span>
                </div>
                <div className="flex justify-between items-center text-zinc-600 dark:text-zinc-400 text-xs pt-1.5 border-t border-[#168a3a]/15">
                  <span>Base Task Fee:</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200 tabular-nums">
                    ₹{task.base_fee}
                  </span>
                </div>
                <div className="flex justify-between items-center text-zinc-900 dark:text-zinc-100 font-extrabold pt-1">
                  <span className="text-sm">Total Payable upon Approval:</span>
                  <span className="text-[#168a3a] dark:text-emerald-400 tabular-nums font-black text-lg">
                    ₹{task.base_fee + 250}
                  </span>
                </div>
              </div>
            </AnimatedCard>

            {/* Version History Tabs */}
            <AnimatedCard className="p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  Unlimited Version History
                </span>
                <div className="flex gap-1.5">
                  {[
                    { v: 2, label: 'V2 (Latest)' },
                    { v: 1, label: 'V1 (Draft)' },
                  ].map((ver) => (
                    <button
                      key={ver.v}
                      type="button"
                      onClick={() => setActiveVersionTab(ver.v)}
                      className={`relative px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        activeVersionTab === ver.v
                          ? 'bg-[#168a3a] text-white shadow-xs'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200'
                      }`}
                    >
                      {ver.label}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800/60 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 leading-relaxed">
                {activeVersionTab === 2
                  ? 'Cut V2: Lowered BGM by 3dB, added motion blur splash, updated 4K transparent logo.'
                  : 'Cut V1: Initial rough cut draft. Synchronized beats to first 3 fruit cuts.'}
              </p>
            </AnimatedCard>

            {/* Dual Action Bar */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowRevisionModal(true)}
                className="w-full border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-950/40"
              >
                <RotateCcw className="size-4" data-icon="inline-start" />
                <span>Request Revision</span>
              </Button>

              <Button
                size="lg"
                onClick={handleApprove}
                isLoading={isApproving}
                className="w-full"
              >
                <CheckCircle2 className="size-4" data-icon="inline-start" />
                <span>Approve & Release (₹{task.base_fee + 250})</span>
              </Button>
            </div>

          </div>
        </div>

        {/* Revision Feedback Sheet Modal */}
        <Sheet
          open={showRevisionModal}
          onOpenChange={setShowRevisionModal}
          title="Request Deliverable Revision"
          description="Specify clear instructions for the talent. All previous cuts remain preserved permanently."
        >
          <div className="flex flex-col gap-4">
            <Textarea
              value={revisionNotes}
              onChange={(e) => setRevisionNotes(e.target.value)}
              rows={4}
              placeholder="E.g. Lower audio at 00:15, speed up clip transition..."
            />

            <div className="flex gap-2 justify-end">
              <Button
                variant="secondary"
                onClick={() => setShowRevisionModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleSendRevision}
              >
                Send Feedback
              </Button>
            </div>
          </div>
        </Sheet>
      </PageTransition>
    </MobileAppShell>
  );
}

export function ReviewClient() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-xs text-zinc-500">Loading QC Review...</div>}>
      <ReviewContent />
    </Suspense>
  );
}
