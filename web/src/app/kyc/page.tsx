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
import { ShieldCheck, Lock, Upload, CheckCircle2, AlertCircle } from 'lucide-react';

export default function KycPage() {
  const router = useRouter();
  const { currentUser } = useApp();
  const { showToast } = useToast();

  const [aadhaarMasked, setAadhaarMasked] = useState('XXXX-XXXX-4921');
  const [panNumber, setPanNumber] = useState('ABCDE1234F');
  const [bankHolder, setBankHolder] = useState(currentUser.full_name);
  const [bankName, setBankName] = useState('HDFC Bank Ltd.');
  const [accountNo, setAccountNo] = useState('50100492817291');
  const [ifsc, setIfsc] = useState('HDFC0001234');
  const [upiId, setUpiId] = useState('arun.editor@okhdfcbank');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('KYC Submitted', 'Identity and bank details queued for verification.', 'success');
    }, 500);
  };

  return (
    <MobileAppShell title="Account KYC" showBack hideBottomNav hideFab>
      <PageTransition className="max-w-2xl mx-auto">
        {/* Progress & Status */}
        <div className="flex items-center justify-between pb-1">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Step 2 of 3</span>
            <h1 className="font-extrabold text-lg md:text-2xl text-zinc-900 dark:text-zinc-50 leading-tight">
              Identity & Bank Verification
            </h1>
          </div>
          <Badge variant="default" className="text-xs">
            KYC Required
          </Badge>
        </div>

        {/* Security Notice */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.15 }}
          className="p-4 bg-[#eaf7ee] dark:bg-emerald-950/40 border border-[#168a3a]/25 rounded-2xl flex items-start gap-3"
        >
          <ShieldCheck className="size-5 text-[#168a3a] shrink-0 mt-0.5" />
          <div className="text-xs text-[#0f6b2d] dark:text-emerald-300 leading-relaxed">
            <span className="font-bold">256-Bit Encrypted Data:</span> In compliance with agency security guardrails, your Aadhaar, PAN, and bank accounts are locked via Row Level Security (RLS) and accessible only to the Founder for payouts.
          </div>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="p-8 md:p-12 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-center flex flex-col items-center gap-4 shadow-xl"
          >
            <div className="size-16 rounded-full bg-[#eaf7ee] text-[#168a3a] dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center">
              <CheckCircle2 className="size-9" />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-extrabold text-xl text-zinc-900 dark:text-zinc-50">
                KYC Documents Submitted!
              </h2>
              <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md mx-auto">
                Your identity documents and bank payout destination have been queued for Founder verification. Verification usually takes under 2 hours.
              </p>
            </div>
            <div className="pt-2 w-full max-w-xs">
              <Button onClick={() => router.push('/dashboard')} size="lg" className="w-full">
                Continue to Dashboard
              </Button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Section 1: Government Identity */}
            <AnimatedCard className="p-5 flex flex-col gap-3.5">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                1. Government Identity (KYC)
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Masked Aadhaar Number
                </label>
                <Input
                  type="text"
                  value={aadhaarMasked}
                  onChange={(e) => setAadhaarMasked(e.target.value)}
                  className="font-mono"
                  required
                />
              </div>

              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Upload className="size-4 text-zinc-400" />
                  <span className="text-zinc-600 dark:text-zinc-400 font-medium">aadhaar_masked_doc.pdf</span>
                </div>
                <Badge variant="default" className="text-[10px]">Attached</Badge>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Permanent Account Number (PAN)
                </label>
                <Input
                  type="text"
                  value={panNumber}
                  onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                  className="font-mono uppercase"
                  required
                />
              </div>
            </AnimatedCard>

            {/* Section 2: Bank Payouts */}
            <AnimatedCard className="p-5 flex flex-col gap-3.5">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                2. Bank Payout & UPI Destination
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Account Holder Name
                </label>
                <Input
                  type="text"
                  value={bankHolder}
                  onChange={(e) => setBankHolder(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Bank Name
                  </label>
                  <Input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    IFSC Code
                  </label>
                  <Input
                    type="text"
                    value={ifsc}
                    onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                    className="font-mono uppercase"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Account Number
                </label>
                <Input
                  type="text"
                  value={accountNo}
                  onChange={(e) => setAccountNo(e.target.value)}
                  className="font-mono"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    UPI ID (Instant Payouts)
                  </label>
                  <Badge variant="default" className="text-[10px] py-0">Recommended</Badge>
                </div>
                <Input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="font-mono"
                  required
                />
              </div>
            </AnimatedCard>

            <Button
              type="submit"
              size="lg"
              isLoading={isSubmitting}
              className="w-full font-bold"
            >
              Submit for Founder Verification
            </Button>
          </form>
        )}
      </PageTransition>
    </MobileAppShell>
  );
}
