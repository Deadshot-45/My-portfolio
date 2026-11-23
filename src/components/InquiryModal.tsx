'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Copy, Check } from 'lucide-react';
import { InquiryFormData, ThemeMode } from '../types/index';
import { USER_PROFILE } from '../data/portfolioData';
import { formatInquiryMailto } from '../utils/portfolioUtils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProjectTitle?: string;
  theme?: ThemeMode;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  defaultProjectTitle,
  theme = 'dark',
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    projectType: defaultProjectTitle || 'Full-Stack Web Application',
    budgetRange: 'Flexible ($5k - $15k)',
    timeline: 'Standard (2 - 4 weeks)',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const isDark = theme === 'dark';

  const projectTypes = [
    'Full-Stack Web Application',
    'Real-Time Chat / Socket.io System',
    'Enterprise Role-Based CRM',
    'MERN / Next.js Development',
    'Frontend Core Web Vitals Optimization',
  ];

  const timelines = [
    'Immediate / Urgent',
    'Standard (2 - 4 weeks)',
    'Next Quarter',
    'Exploratory Discussion',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const mailtoUrl = formatInquiryMailto({
      name: formData.name,
      email: formData.email,
      projectType: formData.projectType,
      timeline: formData.timeline,
      message: formData.message,
      recipient: USER_PROFILE.email,
    });

    window.open(mailtoUrl, '_blank');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(USER_PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent
        className={`w-[calc(100%-1.5rem)] sm:max-w-2xl p-5 sm:p-8 rounded-3xl border shadow-2xl max-h-[calc(100dvh-2.5rem)] min-h-0 overflow-y-auto overscroll-contain no-scrollbar ${
          isDark
            ? 'bg-zinc-950/95 border-white/10 text-white backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.7)]'
            : 'bg-white/95 border-zinc-200/80 text-zinc-950 backdrop-blur-xl shadow-2xl'
        }`}
      >
        {!submitted ? (
          <div>
            {/* Header */}
            <DialogHeader className="mb-8 space-y-1.5 text-left">
              <DialogTitle
                className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                  isDark ? 'text-white' : 'text-zinc-950'
                }`}
              >
                Start A Conversation.
              </DialogTitle>
              <DialogDescription
                className={`text-xs sm:text-sm mt-1.5 ${
                  isDark ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                Reaching out regarding a full-time role, contract, or architecture consultation.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Focus Area */}
              <div>
                <label
                  className={`block text-xs font-mono font-semibold mb-2 ${
                    isDark ? 'text-zinc-300' : 'text-zinc-700'
                  }`}
                >
                  Focus Area / Role Type:
                </label>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setFormData({ ...formData, projectType: type })}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border cursor-pointer ${
                        formData.projectType === type
                          ? isDark
                            ? 'bg-white text-black border-white font-bold'
                            : 'bg-zinc-950 text-white border-zinc-950 font-bold'
                          : isDark
                          ? 'bg-zinc-800/50 text-zinc-300 border-zinc-700 hover:border-zinc-500'
                          : 'bg-zinc-100 text-zinc-700 border-zinc-300 hover:border-zinc-400'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <label
                  className={`block text-xs font-mono font-semibold mb-2 ${
                    isDark ? 'text-zinc-300' : 'text-zinc-700'
                  }`}
                >
                  Timeline:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {timelines.map((timeline) => (
                    <button
                      type="button"
                      key={timeline}
                      onClick={() => setFormData({ ...formData, timeline })}
                      className={`p-2.5 rounded-xl text-xs text-center border transition-all cursor-pointer ${
                        formData.timeline === timeline
                          ? isDark
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-500 font-bold'
                          : isDark
                          ? 'bg-zinc-800/40 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                          : 'bg-zinc-100 text-zinc-600 border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      {timeline}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-xs font-mono font-semibold mb-1.5 ${
                      isDark ? 'text-zinc-300' : 'text-zinc-700'
                    }`}
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                      isDark
                        ? 'bg-zinc-800/60 border-zinc-700 text-white placeholder-zinc-500 focus:border-white'
                        : 'bg-zinc-50 border-zinc-300 text-zinc-950 placeholder-zinc-400 focus:border-zinc-950'
                    }`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-xs font-mono font-semibold mb-1.5 ${
                      isDark ? 'text-zinc-300' : 'text-zinc-700'
                    }`}
                  >
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                      isDark
                        ? 'bg-zinc-800/60 border-zinc-700 text-white placeholder-zinc-500 focus:border-white'
                        : 'bg-zinc-50 border-zinc-300 text-zinc-950 placeholder-zinc-400 focus:border-zinc-950'
                    }`}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  className={`block text-xs font-mono font-semibold mb-1.5 ${
                    isDark ? 'text-zinc-300' : 'text-zinc-700'
                  }`}
                >
                  Project or Role Brief *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about what you are building, team requirements, or key goals..."
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none transition-all ${
                    isDark
                      ? 'bg-zinc-800/60 border-zinc-700 text-white placeholder-zinc-500 focus:border-white'
                      : 'bg-zinc-50 border-zinc-300 text-zinc-950 placeholder-zinc-400 focus:border-zinc-950'
                  }`}
                />
              </div>

              {/* Submit Button & Direct Email */}
              <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3.5 pt-5 pb-6 sm:pb-2 border-t border-zinc-800/50">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`text-xs font-mono flex items-center justify-center sm:justify-start gap-2 transition-colors cursor-pointer py-2 px-2.5 rounded-lg border ${
                    isDark
                      ? 'border-zinc-800/80 bg-zinc-900/60 text-zinc-300 hover:text-white hover:border-zinc-700'
                      : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:text-zinc-950 hover:border-zinc-300'
                  }`}
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  )}
                  <span className="whitespace-nowrap">
                    {copied ? 'Email copied!' : `Copy: ${USER_PROFILE.email}`}
                  </span>
                </button>

                <button
                  type="submit"
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm active:scale-95 transition-all shadow-md cursor-pointer w-full sm:w-auto shrink-0 ${
                    isDark
                      ? 'bg-white hover:bg-zinc-200 text-black'
                      : 'bg-zinc-950 hover:bg-zinc-800 text-white'
                  }`}
                >
                  <span className="whitespace-nowrap">Send via Email</span>
                  <Send className="w-3.5 h-3.5 shrink-0" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <DialogTitle
              className={`text-2xl font-extrabold mb-2 ${isDark ? 'text-white' : 'text-zinc-950'}`}
            >
              Draft Prepared!
            </DialogTitle>
            <DialogDescription
              className={`text-sm max-w-md mx-auto mb-6 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}
            >
              Your email client should have opened with the formatted inquiry. You can also write directly to{' '}
              <strong>{USER_PROFILE.email}</strong>.
            </DialogDescription>
            <button
              type="button"
              onClick={onClose}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold font-mono border transition-all cursor-pointer ${
                isDark ? 'bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700' : 'bg-zinc-100 border-zinc-300 text-zinc-950 hover:bg-zinc-200'
              }`}
            >
              Close Window
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
