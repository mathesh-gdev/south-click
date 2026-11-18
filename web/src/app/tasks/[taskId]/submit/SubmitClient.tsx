'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { useApp } from '@/context/AppContext';
import { MobileAppShell } from '@/components/layout/MobileAppShell';
import { PageTransition } from '@/components/ui/page-transition';
import { AnimatedCard, Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/toast';
import { Video, Upload, CheckCircle2, Sparkles, FileText, ArrowLeft, ShieldCheck } from 'lucide-react';

function SubmitContent() {
  const params = useParams();
  const router = useRouter();
  const { tasks, submissions, submitDeliverable } = useApp();
  const { showToast } = useToast();

  const taskId = (params?.taskId as string) || 'tsk_01';
  const task = tasks.find((t) => t.id === taskId) || tasks[0];
  const existingSubmissions = submissions.filter((s) => s.task_id === taskId);
  const nextVersion = existingSubmissions.length + 1;

  const [fileName, setFileName] = useState('greencart_reel_v2_final_cut.mp4');
  const [fileSize, setFileSize] = useState(248629104);
  const [changelog, setChangelog] = useState(
    '1. Lowered background music volume by 3dB during voiceover at 0:08s. 2. Added motion blur on the fruit splash transition. 3. Replaced end logo with new 4K transparent PNG.'
  );
  const [qcChecked, setQcChecked] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      submitDeliverable(taskId, {
        name: fileName,
        url: `https://storage.googleapis.com/southclick-assets/${fileName}`,
        size: fileSize,
        notes: changelog,
      });
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Deliverable V' + nextVersion + ' Uploaded', 'Queued for Founder QC review.');
    }, 600);
  };

  return (
    <MobileAppShell title="Submit Work" showBack hideBottomNav hideFab>
      <PageTransition className="max-w-4xl mx-auto">
        {/* Header Title */}
        <div className="flex items-center justify-between pb-1">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Submission Workflow
            </span>
            <h1 className="font-extrabold text-lg md:text-2xl text-zinc-900 dark:text-zinc-50 leading-tight">
              Submit Master Deliverable
            </h1>
          </div>
          <Badge variant="secondary" className="font-mono text-xs">
            #{task.id}
          </Badge>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="p-8 md:p-12 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-center flex flex-col items-center gap-4 shadow-xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 15, stiffness: 300, delay: 0.1 }}
              className="size-16 rounded-full bg-[#eaf7ee] text-[#168a3a] dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center shadow-xs"
            >
              <CheckCircle2 className="size-9" />
            </motion.div>
            <div className="flex flex-col gap-1">
              <h2 className="font-extrabold text-xl text-zinc-900 dark:text-zinc-50">
                Deliverable V{nextVersion} Submitted!
              </h2>
              <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md mx-auto">
                Your video cut has been uploaded and queued for Founder QC signoff. Your turnaround speed has been verified by the server.
              </p>
            </div>
            <div className="pt-3">
              <Button onClick={() => router.push('/dashboard')} size="lg">
                Back to Dashboard
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Task Context & Speed Bonus Status */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <AnimatedCard className="p-5 flex flex-col gap-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Assigned Deliverable
                </span>
                <div className="text-xs font-semibold text-zinc-500">{task.project_name}</div>
                <h2 className="font-bold text-base text-zinc-900 dark:text-zinc-50 leading-snug">
                  {task.name}
                </h2>
                
                <div className="flex items-center justify-between text-xs pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500">Base Task Fee:</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
                    ₹{task.base_fee}
                  </span>
                </div>

                <div className="p-3.5 bg-[#eaf7ee] dark:bg-emerald-950/50 border border-[#168a3a]/25 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#0f6b2d] dark:text-emerald-300 font-semibold">
                    <Sparkles className="size-4 text-[#168a3a]" />
                    <span>Turnaround Speed Bonus</span>
                  </div>
                  <Badge variant="default" className="font-bold py-0.5">
                    +₹250 Eligible
                  </Badge>
                </div>
              </AnimatedCard>

              {/* Version History Callout */}
              <div className="bg-zinc-50 dark:bg-zinc-800/60 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 flex flex-col gap-1.5">
                <div className="font-bold text-zinc-800 dark:text-zinc-200">
                  Immutable Version Control
                </div>
                <p className="text-[11px] leading-relaxed">
                  Submitting will create <strong className="text-zinc-800 dark:text-zinc-200">Version V{nextVersion}</strong>. Previous versions and notes remain preserved forever for agency quality records.
                </p>
              </div>
            </div>

            {/* Right Column: File Dropzone & Changelog Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                {/* File Dropzone */}
                <AnimatedCard className="p-6 border-2 border-dashed border-[#168a3a]/40 bg-[#fbfdfb] dark:bg-zinc-900 text-center flex flex-col items-center gap-3">
                  <div className="size-14 rounded-full bg-[#eaf7ee] dark:bg-emerald-950 text-[#168a3a] flex items-center justify-center">
                    <Video className="size-7" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      {fileName}
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5">
                      MP4 Video • 248.6 MB (1080x1920 9:16)
                    </div>
                  </div>

                  {/* Upload Progress Bar */}
                  <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="bg-[#168a3a] h-1.5 rounded-full"
                    />
                  </div>
                  <div className="text-xs font-bold text-[#168a3a] flex items-center justify-center gap-1">
                    <CheckCircle2 className="size-4" />
                    <span>Upload Complete • Ready for QC Review</span>
                  </div>
                </AnimatedCard>

                {/* Editor Changelog Textarea */}
                <AnimatedCard className="p-5 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                      Editor Changelog & Revision Notes
                    </label>
                    <span className="text-[10px] text-zinc-400 tabular-nums">
                      {changelog.length}/500
                    </span>
                  </div>
                  <Textarea
                    value={changelog}
                    onChange={(e) => setChangelog(e.target.value)}
                    rows={4}
                    required
                  />
                </AnimatedCard>

                {/* Quality Checklist */}
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200/80 dark:border-zinc-800 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="qc"
                    checked={qcChecked}
                    onChange={(e) => setQcChecked(e.target.checked)}
                    className="mt-1 size-4 rounded border-zinc-300 text-[#168a3a] focus:ring-[#168a3a] cursor-pointer"
                    required
                  />
                  <label htmlFor="qc" className="text-xs text-zinc-600 dark:text-zinc-300 leading-snug cursor-pointer select-none">
                    I verify that color grading, audio normalization (-14 LUFS), and 9:16 safe zones are strictly tested.
                  </label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full"
                >
                  <Upload className="size-4" data-icon="inline-start" />
                  <span>Submit Deliverable V{nextVersion} for QC Review</span>
                </Button>
              </form>
            </div>

          </div>
        )}
      </PageTransition>
    </MobileAppShell>
  );
}

export function SubmitClient() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-xs text-zinc-500">Loading submission form...</div>}>
      <SubmitContent />
    </Suspense>
  );
}
