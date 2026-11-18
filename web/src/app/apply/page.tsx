'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { AnimatedCard } from '@/components/ui/card';
import { useToast } from '@/components/ui/toast';
import { Video, Palette, Share2, CheckCircle2, ArrowLeft, Upload, Sparkles } from 'lucide-react';

export default function ApplyPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [selectedRole, setSelectedRole] = useState<'editor' | 'designer' | 'smm'>('editor');
  const [fullName, setFullName] = useState('Kavya Ramesh');
  const [phone, setPhone] = useState('+91 98450 12345');
  const [whatsapp, setWhatsapp] = useState('+91 98450 12345');
  const [email, setEmail] = useState('kavya.edits@gmail.com');
  const [city, setCity] = useState('Bengaluru, Karnataka');
  const [experience, setExperience] = useState('3+ Years');
  const [portfolio, setPortfolio] = useState('https://behance.net/kavya_edits');
  const [instagram, setInstagram] = useState('@kavya_cuts');
  const [bio, setBio] = useState('Specialized in fast-paced 9:16 reels and motion typography with 50+ delivered brand campaigns.');
  const [selectedTools, setSelectedTools] = useState<string[]>(['Premiere Pro', 'DaVinci Resolve', 'After Effects']);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toolsList = ['Premiere Pro', 'DaVinci Resolve', 'After Effects', 'CapCut', 'Photoshop', 'Final Cut Pro', 'Figma', 'Canva'];

  const toggleTool = (tool: string) => {
    if (selectedTools.includes(tool)) {
      setSelectedTools(selectedTools.filter((t) => t !== tool));
    } else {
      setSelectedTools([...selectedTools, tool]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Application Submitted!', 'Our creative leads will review your portfolio cuts.');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] dark:bg-[#09090b] py-6 sm:py-12 px-4 sm:px-6 lg:px-8 text-zinc-900 dark:text-zinc-100 selection:bg-[#eaf7ee] selection:text-[#0f6b2d]">
      
      {/* Container */}
      <div className="max-w-3xl mx-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 px-3.5 py-2 rounded-xl shadow-2xs transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Home</span>
          </Link>

          <Badge variant="default" className="text-xs px-3 py-1 gap-1.5">
            <Sparkles className="size-3.5" />
            <span>South Click Talent Network</span>
          </Badge>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/90 dark:border-zinc-800 shadow-xl overflow-hidden p-6 sm:p-10 flex flex-col gap-6"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Join the Agency
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight mt-0.5">
              Freelancer & Creator Application
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
              Apply to join South Click&apos;s roster of video editors, graphic designers, and social media managers. Work on premium brand retainers with guaranteed speed bonuses and instant UPI disbursals.
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="p-8 bg-[#fbfdfb] dark:bg-zinc-900 rounded-2xl border border-[#168a3a]/30 text-center flex flex-col items-center gap-4"
            >
              <div className="size-16 rounded-full bg-[#eaf7ee] text-[#168a3a] dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center">
                <CheckCircle2 className="size-9" />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="font-extrabold text-lg text-zinc-900 dark:text-zinc-50">
                  Application Submitted!
                </h2>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md mx-auto">
                  Thank you, {fullName}. Your portfolio and creative background have been submitted to Dhushyandh and our creative leads. We will review your cuts and reach out via WhatsApp (+91).
                </p>
              </div>
              <div className="pt-2">
                <Button onClick={() => router.push('/')} size="lg">
                  Return to Home
                </Button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {/* Role Selection */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  Select Your Primary Role
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'editor', title: 'Video Editor', desc: '9:16 Reels & YouTube Cuts', icon: Video },
                    { id: 'designer', title: 'Graphic Designer', desc: 'Carousels & Social Creatives', icon: Palette },
                    { id: 'smm', title: 'Social Media Mgr', desc: 'Content & Campaign Calendars', icon: Share2 },
                  ].map((role) => {
                    const active = selectedRole === role.id;
                    const Icon = role.icon;
                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => setSelectedRole(role.id as any)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          active
                            ? 'bg-[#eaf7ee] dark:bg-emerald-950/50 border-[#168a3a] text-[#0f6b2d] dark:text-emerald-300 shadow-2xs'
                            : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50'
                        }`}
                      >
                        <Icon className={`size-5 mb-2 ${active ? 'text-[#168a3a]' : 'text-zinc-500'}`} />
                        <div className="font-bold text-xs">{role.title}</div>
                        <div className="text-[11px] text-zinc-500 mt-0.5 leading-tight">{role.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Personal & Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Full Name</label>
                  <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Email Address</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">WhatsApp Phone (+91)</label>
                  <Input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Location (City, State)</label>
                  <Input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Portfolio & Social Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Portfolio or Google Drive Link
                  </label>
                  <Input
                    type="url"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    placeholder="https://drive.google.com/..."
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Instagram Handle / Link</label>
                  <Input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="@yourhandle"
                  />
                </div>
              </div>

              {/* Experience Years */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Professional Experience</label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="flex h-11 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#168a3a]"
                >
                  <option value="1-2 Years">1 – 2 Years (Junior / Emerging Creator)</option>
                  <option value="3+ Years">3+ Years (Mid-Level Creator)</option>
                  <option value="5+ Years">5+ Years (Senior Lead Creator)</option>
                </select>
              </div>

              {/* Software Tools Tag Cloud */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Software & Tools You Use
                </label>
                <div className="flex flex-wrap gap-2">
                  {toolsList.map((tool) => {
                    const isSelected = selectedTools.includes(tool);
                    return (
                      <button
                        key={tool}
                        type="button"
                        onClick={() => toggleTool(tool)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer select-none active:scale-95 ${
                          isSelected
                            ? 'bg-[#168a3a] text-white shadow-2xs'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200'
                        }`}
                      >
                        {tool} {isSelected ? '✓' : '+'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Short Bio */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Brief Introduction & Past Brand Work
                </label>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  required
                />
              </div>

              {/* Submit CTA */}
              <Button
                type="submit"
                size="lg"
                isLoading={isSubmitting}
                className="w-full font-bold"
              >
                Submit Freelancer Application
              </Button>

            </form>
          )}

        </motion.div>

      </div>

    </div>
  );
}
