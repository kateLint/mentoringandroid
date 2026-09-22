"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Sparkles, Smartphone } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      {/* Top Announcement Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-android-dark to-slate-900 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span>Limited 1:1 mentoring appointments open for this month.</span>
        <Link
          href="/#booking"
          className="underline hover:text-emerald-400 font-semibold inline-flex items-center gap-1 ml-1"
        >
          See session <ArrowRight className="w-3 h-3 inline" />
        </Link>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-android-green to-emerald-600 flex items-center justify-center text-slate-950 font-bold shadow-md group-hover:scale-105 transition-transform">
              <Smartphone className="w-5 h-5 text-slate-950" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight leading-tight">
                AndroidEngineers<span className="text-emerald-600 dark:text-emerald-400">.1on1</span>
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase">
                Career & Architecture
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (>= 1280px) */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <Link
              href="/#how-it-works"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2 whitespace-nowrap"
            >
              How it works
            </Link>
            <Link
              href="/#curriculum"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2 whitespace-nowrap"
            >
              Session plan
            </Link>
            <Link
              href="/#mentor"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2 whitespace-nowrap"
            >
              Your mentor
            </Link>
            <Link
              href="/resources"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2 whitespace-nowrap"
            >
              Guides & Sheets
            </Link>
            <Link
              href="/simulator"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2 text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Simulator</span>
            </Link>
            <Link
              href="/assessment"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2 text-emerald-700 dark:text-emerald-400 font-bold whitespace-nowrap"
            >
              Diagnostic Quiz
            </Link>
            <Link
              href="/#faq"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-2 whitespace-nowrap"
            >
              FAQ
            </Link>
          </nav>

          {/* Desktop Right Action (>= 1280px) */}
          <div className="hidden xl:flex items-center gap-3 flex-shrink-0">
            <ThemeToggle />
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-5 py-2.5 min-h-[48px] rounded-xl bg-slate-900 dark:bg-emerald-600 text-white font-semibold text-sm shadow-md hover:bg-emerald-600 hover:shadow-glow transition-all duration-200 group whitespace-nowrap"
            >
              <span>Book a session</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile & Tablet Controls (< 1280px) */}
          <div className="flex xl:hidden items-center gap-2 flex-shrink-0">
            <ThemeToggle />
            <Link
              href="/book"
              className="px-4 py-2.5 min-h-[48px] rounded-xl bg-emerald-600 text-white text-xs sm:text-sm font-bold shadow-sm flex items-center justify-center whitespace-nowrap"
            >
              Book
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-w-[48px] min-h-[48px] flex items-center justify-center shadow-2xs transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900 dark:text-white" /> : <Menu className="w-6 h-6 text-slate-900 dark:text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Slide-down Drawer Menu (< 1280px) */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/98 dark:bg-slate-900/98 border-b border-slate-200 dark:border-slate-800 px-4 pt-4 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top duration-150">
          <nav className="flex flex-col space-y-1">
            <Link
              href="/simulator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-indigo-700 dark:text-indigo-400 font-bold bg-indigo-50/60 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-950/70 flex items-center justify-between text-base"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                Architecture Simulator
              </span>
              <ArrowRight className="w-4 h-4 text-indigo-400" />
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-base"
            >
              How it works
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/#curriculum"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-slate-800 font-medium hover:bg-slate-50 flex items-center justify-between text-base"
            >
              Session plan (90 min)
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/#mentor"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-slate-800 font-medium hover:bg-slate-50 flex items-center justify-between text-base"
            >
              Your mentor
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/resources"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-slate-800 font-medium hover:bg-slate-50 flex items-center justify-between text-base"
            >
              Architecture Guides & Questions
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/assessment"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-emerald-800 font-bold bg-emerald-50/60 hover:bg-emerald-100 flex items-center justify-between text-base"
            >
              Career Diagnostic Quiz
              <ArrowRight className="w-4 h-4 text-emerald-600" />
            </Link>
            <Link
              href="/#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-slate-800 font-medium hover:bg-slate-50 flex items-center justify-between text-base"
            >
              Reviews & Outcomes
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-slate-800 font-medium hover:bg-slate-50 flex items-center justify-between text-base"
            >
              FAQ
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </nav>
          <div className="pt-2">
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl bg-slate-900 text-white font-bold text-center shadow-lg hover:bg-emerald-600 transition-colors"
            >
              Book your session now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
