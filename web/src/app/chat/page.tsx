'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { MobileAppShell } from '@/components/layout/MobileAppShell';
import { PageTransition } from '@/components/ui/page-transition';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { useApp } from '@/context/AppContext';
import {
  Send,
  Paperclip,
  CheckCheck,
  Video,
  FileText,
  Play,
  ArrowRight,
  Sparkles,
  PhoneCall,
  MoreVertical,
  Users,
} from 'lucide-react';

export default function ChatPage() {
  const { currentUser, currentRole, profiles, messages, sendMessage, tasks } = useApp();
  const { showToast } = useToast();

  const contacts = profiles.filter((p) => p.id !== currentUser.id);
  const [selectedContactId, setSelectedContactId] = useState<string>(
    contacts[0]?.id || 'user_editor'
  );
  const [inputText, setInputText] = useState('');

  const selectedContact = profiles.find((p) => p.id === selectedContactId) || contacts[0];

  const activeTask =
    tasks.find((t) => t.assigned_to === selectedContact?.id && t.status !== 'approved') ||
    tasks[0];

  const conversation = messages.filter(
    (m) =>
      (m.sender_id === currentUser.id && m.recipient_id === selectedContact?.id) ||
      (m.sender_id === selectedContact?.id && m.recipient_id === currentUser.id) ||
      (!m.recipient_id && m.sender_id === selectedContact?.id)
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage(selectedContact.id, inputText.trim());
    setInputText('');
  };

  const sendQuickReply = (text: string) => {
    sendMessage(selectedContact.id, text);
    showToast('Sent quick reply', text, 'info');
  };

  return (
    <MobileAppShell title="Team Chat" hideFab>
      <PageTransition>
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/90 dark:border-zinc-800 shadow-md overflow-hidden flex flex-col md:flex-row h-[calc(100vh-120px)] md:h-[calc(100vh-140px)]">
          
          {/* ========================================================================= */}
          {/* DESKTOP CONTACTS SIDEBAR (hidden on mobile, visible md:flex)              */}
          {/* ========================================================================= */}
          <div className="hidden md:flex md:w-72 lg:w-80 flex-col border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="size-4 text-zinc-500" />
                <h2 className="font-bold text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Conversations
                </h2>
              </div>
              <Badge variant="default" className="text-[10px]">
                {contacts.length} Active
              </Badge>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800/80">
              {contacts.map((c) => {
                const active = selectedContact?.id === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedContactId(c.id)}
                    className={`w-full p-4 flex items-center gap-3 text-left transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#eaf7ee] dark:bg-emerald-950/40 border-r-4 border-[#168a3a]'
                        : 'hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    <div className="relative">
                      <Avatar
                        src={c.avatar_url}
                        alt={c.full_name}
                        fallback={c.full_name.slice(0, 2)}
                        size="default"
                      />
                      <span className="absolute bottom-0 right-0 size-2.5 bg-[#168a3a] rounded-full ring-2 ring-white dark:ring-zinc-900" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-xs truncate ${
                            active
                              ? 'font-bold text-[#0f6b2d] dark:text-emerald-300'
                              : 'font-semibold text-zinc-900 dark:text-zinc-100'
                          }`}
                        >
                          {c.full_name}
                        </p>
                        <span className="text-[9px] uppercase font-bold text-zinc-400">
                          {c.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 truncate mt-0.5">
                        {c.location || 'Remote India'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* ACTIVE CHAT CANVAS (Mobile Full / Desktop Right Pane)                     */}
          {/* ========================================================================= */}
          <div className="flex-1 flex flex-col h-full bg-[#fcfdfc] dark:bg-zinc-950">
            
            {/* Chat Header */}
            <div className="p-3.5 px-4 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shadow-2xs z-10">
              <div className="flex items-center gap-3 min-w-0">
                <Avatar
                  src={selectedContact?.avatar_url}
                  alt={selectedContact?.full_name}
                  fallback={selectedContact?.full_name.slice(0, 2)}
                  size="default"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h2 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 truncate">
                      {selectedContact?.full_name}
                    </h2>
                    <span className="text-[10px] text-[#168a3a] dark:text-emerald-400 font-bold bg-[#eaf7ee] dark:bg-emerald-950 px-1.5 py-0.2 rounded-full">
                      ● Active
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 truncate capitalize">
                    {selectedContact?.role} • Project Channel
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    showToast(
                      'Direct Call Feature',
                      'Connected to Razorpay / Twilio WebRTC bridge.',
                      'info'
                    )
                  }
                  className="size-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <PhoneCall className="size-4" />
                </button>
              </div>
            </div>

            {/* Context Header: Active Task Bar */}
            {activeTask && (
              <div className="bg-[#eaf7ee] dark:bg-emerald-950/40 border-b border-[#168a3a]/20 px-4 py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <Sparkles className="size-4 text-[#168a3a] shrink-0" />
                  <div className="truncate">
                    <span className="font-bold text-[#0f6b2d] dark:text-emerald-300">
                      Active Sprint:
                    </span>{' '}
                    <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                      {activeTask.name}
                    </span>
                  </div>
                </div>

                <Link
                  href={
                    currentRole === 'founder'
                      ? `/review/${activeTask.id}`
                      : `/tasks/${activeTask.id}/submit`
                  }
                >
                  <Button size="sm" className="h-7 text-xs font-bold rounded-lg px-2.5">
                    <span>{currentRole === 'founder' ? 'QC Review' : 'Submit Cut'}</span>
                    <ArrowRight className="size-3" data-icon="inline-end" />
                  </Button>
                </Link>
              </div>
            )}

            {/* Chat Messages Stream */}
            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
              <div className="flex justify-center my-1">
                <span className="bg-zinc-200/70 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[10px] font-semibold px-3 py-1 rounded-full">
                  Today • Encrypted Project Channel
                </span>
              </div>

              {conversation.length === 0 ? (
                <div className="text-center py-12 text-zinc-400">
                  <p className="text-sm font-medium">
                    No messages yet with {selectedContact?.full_name}
                  </p>
                  <p className="text-xs mt-1">Start the conversation below.</p>
                </div>
              ) : (
                conversation.map((msg) => {
                  const isMe = msg.sender_id === currentUser.id;
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.15 }}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} gap-1`}
                    >
                      <div
                        className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-3.5 shadow-xs text-xs leading-relaxed ${
                          isMe
                            ? 'bg-[#168a3a] text-white rounded-tr-none'
                            : 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-tl-none'
                        }`}
                      >
                        {!isMe && (
                          <p className="text-[10px] font-bold text-[#168a3a] dark:text-emerald-400 mb-1">
                            {msg.sender_name}
                          </p>
                        )}
                        <p className="whitespace-pre-wrap">{msg.message_text}</p>

                        {/* Attachments preview */}
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className="mt-2 flex flex-col gap-1.5 pt-2 border-t border-white/20 dark:border-zinc-800">
                            {msg.attachments.map((att, idx) => (
                              <div
                                key={idx}
                                className={`p-2.5 rounded-xl flex items-center gap-2.5 ${
                                  isMe
                                    ? 'bg-black/15'
                                    : 'bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700'
                                }`}
                              >
                                <div className="size-10 rounded-lg bg-zinc-800 text-white flex items-center justify-center shrink-0">
                                  {att.type === 'video' ? (
                                    <Play className="size-4 fill-white" />
                                  ) : (
                                    <FileText className="size-4" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p
                                    className={`text-[11px] font-bold truncate ${
                                      isMe ? 'text-white' : 'text-zinc-900 dark:text-zinc-100'
                                    }`}
                                  >
                                    {att.name}
                                  </p>
                                  <p
                                    className={`text-[10px] ${
                                      isMe ? 'text-white/80' : 'text-zinc-500'
                                    }`}
                                  >
                                    {att.size || 'Attachment file'}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1 px-1">
                        <span className="text-[9px] text-zinc-400">
                          {new Date(msg.created_at).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        {isMe && <CheckCheck className="size-3.5 text-[#168a3a]" />}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar bg-white/70 dark:bg-zinc-900/70 border-t border-zinc-100 dark:border-zinc-800">
              {[
                'Footage Drive link uploaded',
                'Please review V1 cut',
                'Changes done, checking export',
                'Approved, releasing UPI payout ⚡',
              ].map((quick, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => sendQuickReply(quick)}
                  className="shrink-0 text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 px-3 py-1 rounded-full transition-colors cursor-pointer select-none active:scale-95"
                >
                  {quick}
                </button>
              ))}
            </div>

            {/* Message Input Box */}
            <form
              onSubmit={handleSend}
              className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 px-4 py-3 flex items-center gap-2.5 z-20"
            >
              <button
                type="button"
                onClick={() => {
                  sendMessage(
                    selectedContact.id,
                    'Attached updated color-grade reference cut for approval.',
                    [
                      {
                        name: 'Color_Grade_Ref_02.mp4',
                        url: 'https://sample.vod/ref.mp4',
                        size: '28 MB',
                        type: 'video',
                      },
                    ]
                  );
                  showToast('Asset Attached', 'Color_Grade_Ref_02.mp4 sent in chat.');
                }}
                className="size-10 rounded-xl flex items-center justify-center text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Attach Deliverable"
              >
                <Paperclip className="size-4" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Message ${selectedContact?.full_name.split(' ')[0]}...`}
                className="flex-1 bg-zinc-100 dark:bg-zinc-800 border-none rounded-xl px-4 py-2.5 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#168a3a]"
              />

              <Button
                type="submit"
                size="icon"
                disabled={!inputText.trim()}
                className="rounded-xl size-10"
              >
                <Send className="size-4" />
              </Button>
            </form>

          </div>

        </div>
      </PageTransition>
    </MobileAppShell>
  );
}
